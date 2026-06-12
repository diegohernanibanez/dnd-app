-- ════════════════════════════════════════════════════════════════════
-- 003 — Fase 1.2: cerrar gaps de persistencia de la hoja editable
--
-- Corrige (ver FASE1-INVENTARIO.md):
--   1. bonusASI / dotesElegidos / dotesLibres / xpNivelActual /
--      dadosGolpeGastados / pgMaxPersonalizado no se guardaban en BD
--   2. inspiración heroica y sintonización con objetos mágicos (nuevos)
--   3. BUG: espaciosUsados['pacto'] (brujo) rompía upsert_personaje
--      porque personaje_espacios_conjuro.nivel era INTEGER
--   4. BUG: armasCustom perdía casi todos sus campos (nombres JSON
--      no coincidían) → ahora se guarda el objeto completo en JSONB
--   5. Overrides profundos (habilidades.X.total, conjuros.cdSalvacion…)
--      no cabían en las 5 columnas fijas → columna JSONB `valores`
--   6. El trasfondo se leía solo de descripcion.trasfondoId (podía ser
--      null aunque origen.trasfondo estuviera elegido)
-- ════════════════════════════════════════════════════════════════════

-- ── 1. Columnas nuevas en personaje_config ────────────────────────────
ALTER TABLE personaje_config
  ADD COLUMN IF NOT EXISTS bonus_asi            JSONB   DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS dotes_elegidos       JSONB   DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS dotes_libres         JSONB   DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS dados_golpe_gastados INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS pg_max_personalizado INTEGER,
  ADD COLUMN IF NOT EXISTS xp_nivel_actual      INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS inspiracion          BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS sintonizaciones      JSONB   DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS escudo_equipado      BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS competencias_override JSONB  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS conjuros_hoja_config JSONB   DEFAULT '{}';

-- ── 2. Espacios de conjuro: clave TEXT (soporta 'pacto' del brujo) ────
ALTER TABLE personaje_espacios_conjuro
  ALTER COLUMN nivel TYPE TEXT USING nivel::TEXT;

-- ── 3. Ataques custom: objeto completo ────────────────────────────────
ALTER TABLE personaje_ataques
  ADD COLUMN IF NOT EXISTS datos JSONB;

-- ── 4. Overrides como JSONB (paths profundos) ─────────────────────────
ALTER TABLE personaje_overrides
  ADD COLUMN IF NOT EXISTS valores JSONB DEFAULT '{}';

-- Backfill: migrar los overrides existentes de columnas → JSONB
UPDATE personaje_overrides
SET valores = jsonb_strip_nulls(jsonb_build_object(
  'ca',                     ca,
  'velocidad',              velocidad,
  'iniciativa',             iniciativa,
  'bonificadorCompetencia', bonificador_competencia,
  'percepcionPasiva',       percepcion_pasiva
))
WHERE COALESCE(valores, '{}'::jsonb) = '{}'::jsonb;


-- ── 5. RPC: guardar personaje completo ────────────────────────────────
CREATE OR REPLACE FUNCTION upsert_personaje(p_datos JSONB)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id TEXT;
BEGIN
  v_id := p_datos->>'id';
  IF v_id IS NULL OR v_id = '' THEN
    RAISE EXCEPTION 'El personaje debe tener un id';
  END IF;

  -- ── Personaje principal ──────────────────────────────────────────
  INSERT INTO personajes (
    id, nombre, nivel,
    clase_id, subclase_id, trasfondo_id, especie_id, linaje_id, alineamiento_id,
    eleccion_nivel1, fecha_creacion
  ) VALUES (
    v_id,
    COALESCE(NULLIF(p_datos->'descripcion'->>'nombre', ''), 'Sin nombre'),
    COALESCE((p_datos->>'nivel')::INTEGER, 1),
    NULLIF(p_datos->>'claseSeleccionada',                    ''),
    NULLIF(p_datos->>'subclaseSeleccionada',                 ''),
    COALESCE(
      NULLIF(p_datos->'origen'->>'trasfondo',      ''),
      NULLIF(p_datos->'descripcion'->>'trasfondoId', '')
    ),
    NULLIF(p_datos->'origen'->>'especie',                    ''),
    NULLIF(p_datos->'origen'->>'linaje',                     ''),
    NULLIF(p_datos->'descripcion'->>'alineamiento',          ''),
    NULLIF(p_datos->>'eleccionNivel1',                       ''),
    COALESCE(NULLIF(p_datos->>'fechaCreacion', '')::TIMESTAMPTZ, NOW())
  )
  ON CONFLICT (id) DO UPDATE SET
    nombre          = EXCLUDED.nombre,
    nivel           = EXCLUDED.nivel,
    clase_id        = EXCLUDED.clase_id,
    subclase_id     = EXCLUDED.subclase_id,
    trasfondo_id    = EXCLUDED.trasfondo_id,
    especie_id      = EXCLUDED.especie_id,
    linaje_id       = EXCLUDED.linaje_id,
    alineamiento_id = EXCLUDED.alineamiento_id,
    eleccion_nivel1 = EXCLUDED.eleccion_nivel1;

  -- ── Stats ────────────────────────────────────────────────────────
  INSERT INTO personaje_stats (
    personaje_id, fuerza, destreza, constitucion, inteligencia, sabiduria, carisma,
    pg_actuales, pg_temporales, muerte_exitos, muerte_fallos
  ) VALUES (
    v_id,
    (p_datos->'puntuaciones'->>'Fuerza')::INTEGER,
    (p_datos->'puntuaciones'->>'Destreza')::INTEGER,
    (p_datos->'puntuaciones'->>'Constitución')::INTEGER,
    (p_datos->'puntuaciones'->>'Inteligencia')::INTEGER,
    (p_datos->'puntuaciones'->>'Sabiduría')::INTEGER,
    (p_datos->'puntuaciones'->>'Carisma')::INTEGER,
    COALESCE((p_datos->>'pgActuales')::INTEGER,         0),
    COALESCE((p_datos->>'pgTemporales')::INTEGER,       0),
    COALESCE((p_datos->'muerte'->>'exitos')::INTEGER,   0),
    COALESCE((p_datos->'muerte'->>'fallos')::INTEGER,   0)
  )
  ON CONFLICT (personaje_id) DO UPDATE SET
    fuerza        = EXCLUDED.fuerza,
    destreza      = EXCLUDED.destreza,
    constitucion  = EXCLUDED.constitucion,
    inteligencia  = EXCLUDED.inteligencia,
    sabiduria     = EXCLUDED.sabiduria,
    carisma       = EXCLUDED.carisma,
    pg_actuales   = EXCLUDED.pg_actuales,
    pg_temporales = EXCLUDED.pg_temporales,
    muerte_exitos = EXCLUDED.muerte_exitos,
    muerte_fallos = EXCLUDED.muerte_fallos;

  -- ── Monedas ──────────────────────────────────────────────────────
  INSERT INTO personaje_monedas (personaje_id, pc, pp, pe, po, pa)
  VALUES (
    v_id,
    COALESCE((p_datos->'monedas'->>'PC')::INTEGER, 0),
    COALESCE((p_datos->'monedas'->>'PP')::INTEGER, 0),
    COALESCE((p_datos->'monedas'->>'PE')::INTEGER, 0),
    COALESCE((p_datos->'monedas'->>'PO')::INTEGER, 0),
    COALESCE((p_datos->'monedas'->>'PA')::INTEGER, 0)
  )
  ON CONFLICT (personaje_id) DO UPDATE SET
    pc = EXCLUDED.pc, pp = EXCLUDED.pp, pe = EXCLUDED.pe,
    po = EXCLUDED.po, pa = EXCLUDED.pa;

  -- ── Descripción ──────────────────────────────────────────────────
  INSERT INTO personaje_descripcion (
    personaje_id, apariencia, rasgos, ideal, vinculo, defecto,
    historia, aliados, org_nombre, rasgos_adicionales, tesoro, desc_apariencia
  ) VALUES (
    v_id,
    COALESCE(p_datos->'descripcion'->'apariencia', '{}'),
    COALESCE(p_datos->'descripcion'->'personalidad'->>'rasgos',  ''),
    COALESCE(p_datos->'descripcion'->'personalidad'->>'ideal',   ''),
    COALESCE(p_datos->'descripcion'->'personalidad'->>'vinculo', ''),
    COALESCE(p_datos->'descripcion'->'personalidad'->>'defecto', ''),
    COALESCE(p_datos->'hoja2'->>'historia',           ''),
    COALESCE(p_datos->'hoja2'->>'aliados',            ''),
    COALESCE(p_datos->'hoja2'->>'orgNombre',          ''),
    COALESCE(p_datos->'hoja2'->>'rasgosAdicionales',  ''),
    COALESCE(p_datos->'hoja2'->>'tesoro',             ''),
    COALESCE(p_datos->'hoja2'->>'descApariencia',     '')
  )
  ON CONFLICT (personaje_id) DO UPDATE SET
    apariencia         = EXCLUDED.apariencia,
    rasgos             = EXCLUDED.rasgos,
    ideal              = EXCLUDED.ideal,
    vinculo            = EXCLUDED.vinculo,
    defecto            = EXCLUDED.defecto,
    historia           = EXCLUDED.historia,
    aliados            = EXCLUDED.aliados,
    org_nombre         = EXCLUDED.org_nombre,
    rasgos_adicionales = EXCLUDED.rasgos_adicionales,
    tesoro             = EXCLUDED.tesoro,
    desc_apariencia    = EXCLUDED.desc_apariencia;

  -- ── Overrides (objeto completo en JSONB; las columnas legacy
  --    quedan en NULL para no servir datos viejos) ──────────────────
  INSERT INTO personaje_overrides (personaje_id, valores)
  VALUES (v_id, COALESCE(p_datos->'personajeOverrides', '{}'))
  ON CONFLICT (personaje_id) DO UPDATE SET
    valores                 = EXCLUDED.valores,
    ca                      = NULL,
    velocidad               = NULL,
    iniciativa              = NULL,
    bonificador_competencia = NULL,
    percepcion_pasiva       = NULL;

  -- ── Config ───────────────────────────────────────────────────────
  INSERT INTO personaje_config (
    personaje_id,
    habilidades_clase, bonus_trasfondo_modo, bonus_trasfondo_stats,
    idiomas, habilidad_diestro, habilidad_sentidos, habilidades_habilidoso,
    pg_ganancia_por_nivel, equipo_opcion_clase, equipo_opcion_trasfondo,
    oro_disponible, bagatela, monedas_auto,
    ataques_hoja_config, ataques_ocultos, items_ocultos,
    bonus_asi, dotes_elegidos, dotes_libres,
    dados_golpe_gastados, pg_max_personalizado, xp_nivel_actual,
    inspiracion, sintonizaciones,
    escudo_equipado, competencias_override, conjuros_hoja_config
  ) VALUES (
    v_id,
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_datos->'habilidadesClase', '[]'))),
    p_datos->'bonusTrasfondo'->>'modo',
    COALESCE(p_datos->'bonusTrasfondo'->'stats', '{}'),
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_datos->'origen'->'idiomas', '["Común"]'))),
    NULLIF(p_datos->'origen'->>'habilidadDiestro',   ''),
    NULLIF(p_datos->'origen'->>'habilidadSentidos',  ''),
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_datos->'origen'->'habilidadesHabilidoso', '[]'))),
    COALESCE(p_datos->'pgGananciaPorNivel', '{}'),
    NULLIF(p_datos->'equipo'->>'opcionClase',      ''),
    NULLIF(p_datos->'equipo'->>'opcionTrasfondo',  ''),
    COALESCE((p_datos->'equipo'->>'oroDisponible')::NUMERIC, 0),
    NULLIF(p_datos->'equipo'->>'bagatela', ''),
    COALESCE(p_datos->'equipo'->'monedasAuto', '{}'),
    COALESCE(p_datos->'ataquesHojaConfig', '{}'),
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_datos->'ataquesOcultos', '[]'))),
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_datos->'itemsOcultos',   '[]'))),
    COALESCE(p_datos->'bonusASI',      '{}'),
    COALESCE(p_datos->'dotesElegidos', '{}'),
    COALESCE(p_datos->'dotesLibres',   '[]'),
    COALESCE((p_datos->>'dadosGolpeGastados')::INTEGER, 0),
    (p_datos->>'pgMaxPersonalizado')::INTEGER,
    COALESCE((p_datos->>'xpNivelActual')::INTEGER, 0),
    COALESCE((p_datos->>'inspiracion')::BOOLEAN, FALSE),
    COALESCE(p_datos->'sintonizaciones', '[]'),
    COALESCE((p_datos->>'escudoEquipado')::BOOLEAN, FALSE),
    COALESCE(p_datos->'competenciasOverride', '{}'),
    COALESCE(p_datos->'conjurosHojaConfig', '{}')
  )
  ON CONFLICT (personaje_id) DO UPDATE SET
    habilidades_clase       = EXCLUDED.habilidades_clase,
    bonus_trasfondo_modo    = EXCLUDED.bonus_trasfondo_modo,
    bonus_trasfondo_stats   = EXCLUDED.bonus_trasfondo_stats,
    idiomas                 = EXCLUDED.idiomas,
    habilidad_diestro       = EXCLUDED.habilidad_diestro,
    habilidad_sentidos      = EXCLUDED.habilidad_sentidos,
    habilidades_habilidoso  = EXCLUDED.habilidades_habilidoso,
    pg_ganancia_por_nivel   = EXCLUDED.pg_ganancia_por_nivel,
    equipo_opcion_clase     = EXCLUDED.equipo_opcion_clase,
    equipo_opcion_trasfondo = EXCLUDED.equipo_opcion_trasfondo,
    oro_disponible          = EXCLUDED.oro_disponible,
    bagatela                = EXCLUDED.bagatela,
    monedas_auto            = EXCLUDED.monedas_auto,
    ataques_hoja_config     = EXCLUDED.ataques_hoja_config,
    ataques_ocultos         = EXCLUDED.ataques_ocultos,
    items_ocultos           = EXCLUDED.items_ocultos,
    bonus_asi               = EXCLUDED.bonus_asi,
    dotes_elegidos          = EXCLUDED.dotes_elegidos,
    dotes_libres            = EXCLUDED.dotes_libres,
    dados_golpe_gastados    = EXCLUDED.dados_golpe_gastados,
    pg_max_personalizado    = EXCLUDED.pg_max_personalizado,
    xp_nivel_actual         = EXCLUDED.xp_nivel_actual,
    inspiracion             = EXCLUDED.inspiracion,
    sintonizaciones         = EXCLUDED.sintonizaciones,
    escudo_equipado         = EXCLUDED.escudo_equipado,
    competencias_override   = EXCLUDED.competencias_override,
    conjuros_hoja_config    = EXCLUDED.conjuros_hoja_config;

  -- ── Conjuros (delete + insert) ───────────────────────────────────
  DELETE FROM personaje_conjuros WHERE personaje_id = v_id;

  INSERT INTO personaje_conjuros (personaje_id, conjuro_nombre, es_truco)
  SELECT v_id, elem, TRUE
  FROM jsonb_array_elements_text(COALESCE(p_datos->'trucosSeleccionados', '[]')) AS elem
  ON CONFLICT DO NOTHING;

  INSERT INTO personaje_conjuros (personaje_id, conjuro_nombre, en_grimorio)
  SELECT v_id, elem, TRUE
  FROM jsonb_array_elements_text(COALESCE(p_datos->'grimorioConjuros', '[]')) AS elem
  ON CONFLICT (personaje_id, conjuro_nombre) DO UPDATE SET en_grimorio = TRUE;

  INSERT INTO personaje_conjuros (personaje_id, conjuro_nombre, preparado)
  SELECT v_id, elem, TRUE
  FROM jsonb_array_elements_text(COALESCE(p_datos->'conjurosSeleccionados', '[]')) AS elem
  ON CONFLICT (personaje_id, conjuro_nombre) DO UPDATE SET preparado = TRUE;

  -- ── Espacios de conjuro (clave TEXT: '1'…'9' o 'pacto') ──────────
  DELETE FROM personaje_espacios_conjuro WHERE personaje_id = v_id;
  INSERT INTO personaje_espacios_conjuro (personaje_id, nivel, usados)
  SELECT v_id, kv.key, (kv.value)::INTEGER
  FROM jsonb_each_text(COALESCE(p_datos->'espaciosUsados', '{}')) AS kv;

  -- ── Inventario extras (delete + insert) ──────────────────────────
  DELETE FROM personaje_inventario WHERE personaje_id = v_id;
  INSERT INTO personaje_inventario (personaje_id, item)
  SELECT v_id, elem
  FROM jsonb_array_elements(COALESCE(p_datos->'equipo'->'extras', '[]')) AS elem;

  -- ── Ataques custom: objeto completo en `datos` ───────────────────
  DELETE FROM personaje_ataques WHERE personaje_id = v_id;
  INSERT INTO personaje_ataques (personaje_id, nombre, bonif_ataque, dano, tipo_dano, datos)
  SELECT
    v_id,
    COALESCE(NULLIF(a->>'nombre', ''), 'Ataque'),
    a->>'bonAtaque',
    a->>'daño',
    a->>'tipoDanio',
    a
  FROM jsonb_array_elements(COALESCE(p_datos->'armasCustom', '[]')) AS a;

  RETURN v_id;
END;
$$;


-- ── 6. RPC: cargar personaje completo ─────────────────────────────────
CREATE OR REPLACE FUNCTION cargar_personaje_completo(p_id TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_p  personajes%ROWTYPE;
  v_st personaje_stats%ROWTYPE;
  v_mo personaje_monedas%ROWTYPE;
  v_de personaje_descripcion%ROWTYPE;
  v_ov personaje_overrides%ROWTYPE;
  v_co personaje_config%ROWTYPE;
BEGIN
  SELECT * INTO v_p  FROM personajes            WHERE id           = p_id;
  IF NOT FOUND THEN RETURN NULL; END IF;

  SELECT * INTO v_st FROM personaje_stats       WHERE personaje_id = p_id;
  SELECT * INTO v_mo FROM personaje_monedas     WHERE personaje_id = p_id;
  SELECT * INTO v_de FROM personaje_descripcion WHERE personaje_id = p_id;
  SELECT * INTO v_ov FROM personaje_overrides   WHERE personaje_id = p_id;
  SELECT * INTO v_co FROM personaje_config      WHERE personaje_id = p_id;

  RETURN jsonb_build_object(
    'id',                   v_p.id,
    'nivel',                v_p.nivel,
    'claseSeleccionada',    v_p.clase_id,
    'subclaseSeleccionada', v_p.subclase_id,
    'eleccionNivel1',       v_p.eleccion_nivel1,
    'fechaCreacion',        v_p.fecha_creacion,
    'fechaModificacion',    v_p.fecha_modificacion,

    'puntuaciones', jsonb_build_object(
      'Fuerza',        v_st.fuerza,
      'Destreza',      v_st.destreza,
      'Constitución',  v_st.constitucion,
      'Inteligencia',  v_st.inteligencia,
      'Sabiduría',     v_st.sabiduria,
      'Carisma',       v_st.carisma
    ),
    'pgActuales',   COALESCE(v_st.pg_actuales,   0),
    'pgTemporales', COALESCE(v_st.pg_temporales, 0),
    'muerte', jsonb_build_object(
      'exitos', COALESCE(v_st.muerte_exitos, 0),
      'fallos', COALESCE(v_st.muerte_fallos, 0)
    ),

    'monedas', jsonb_build_object(
      'PC', COALESCE(v_mo.pc, 0),
      'PP', COALESCE(v_mo.pp, 0),
      'PE', COALESCE(v_mo.pe, 0),
      'PO', COALESCE(v_mo.po, 0),
      'PA', COALESCE(v_mo.pa, 0)
    ),

    'origen', jsonb_build_object(
      'trasfondo',             v_p.trasfondo_id,
      'especie',               v_p.especie_id,
      'linaje',                v_p.linaje_id,
      'idiomas',               COALESCE(to_jsonb(v_co.idiomas), '["Común"]'::jsonb),
      'habilidadDiestro',      v_co.habilidad_diestro,
      'habilidadSentidos',     v_co.habilidad_sentidos,
      'habilidadesHabilidoso', COALESCE(to_jsonb(v_co.habilidades_habilidoso), '[]'::jsonb)
    ),

    'descripcion', jsonb_build_object(
      'nombre',      v_p.nombre,
      'alineamiento', v_p.alineamiento_id,
      'trasfondoId', v_p.trasfondo_id,
      'apariencia',  COALESCE(v_de.apariencia, '{}'),
      'personalidad', jsonb_build_object(
        'rasgos',  COALESCE(v_de.rasgos,  ''),
        'ideal',   COALESCE(v_de.ideal,   ''),
        'vinculo', COALESCE(v_de.vinculo, ''),
        'defecto', COALESCE(v_de.defecto, '')
      )
    ),

    'hoja2', jsonb_build_object(
      'historia',          COALESCE(v_de.historia,           ''),
      'aliados',           COALESCE(v_de.aliados,            ''),
      'orgNombre',         COALESCE(v_de.org_nombre,         ''),
      'rasgosAdicionales', COALESCE(v_de.rasgos_adicionales, ''),
      'tesoro',            COALESCE(v_de.tesoro,             ''),
      'descApariencia',    COALESCE(v_de.desc_apariencia,    '')
    ),

    'habilidadesClase', COALESCE(to_jsonb(v_co.habilidades_clase), '[]'::jsonb),
    'bonusTrasfondo', jsonb_build_object(
      'modo',  v_co.bonus_trasfondo_modo,
      'stats', COALESCE(v_co.bonus_trasfondo_stats, '{}')
    ),
    'equipo', jsonb_build_object(
      'opcionClase',     v_co.equipo_opcion_clase,
      'opcionTrasfondo', v_co.equipo_opcion_trasfondo,
      'oroDisponible',   COALESCE(v_co.oro_disponible, 0),
      'bagatela',        v_co.bagatela,
      'monedasAuto',     COALESCE(v_co.monedas_auto, '{}'),
      'extras', (
        SELECT COALESCE(jsonb_agg(item ORDER BY id), '[]'::jsonb)
        FROM personaje_inventario
        WHERE personaje_id = p_id
      )
    ),

    'trucosSeleccionados', (
      SELECT COALESCE(jsonb_agg(conjuro_nombre), '[]'::jsonb)
      FROM personaje_conjuros
      WHERE personaje_id = p_id AND es_truco
    ),
    'grimorioConjuros', (
      SELECT COALESCE(jsonb_agg(conjuro_nombre), '[]'::jsonb)
      FROM personaje_conjuros
      WHERE personaje_id = p_id AND en_grimorio
    ),
    'conjurosSeleccionados', (
      SELECT COALESCE(jsonb_agg(conjuro_nombre), '[]'::jsonb)
      FROM personaje_conjuros
      WHERE personaje_id = p_id AND preparado
    ),
    'espaciosUsados', (
      SELECT COALESCE(jsonb_object_agg(nivel, usados), '{}')
      FROM personaje_espacios_conjuro
      WHERE personaje_id = p_id
    ),

    'armasCustom', (
      SELECT COALESCE(jsonb_agg(
        COALESCE(datos, jsonb_build_object(
          'id',       id::TEXT,
          'custom',   TRUE,
          'nombre',   nombre,
          'bonAtaque', bonif_ataque,
          'daño',     dano,
          'tipoDanio', tipo_dano
        )) ORDER BY id
      ), '[]'::jsonb)
      FROM personaje_ataques
      WHERE personaje_id = p_id
    ),

    'ataquesHojaConfig',  COALESCE(v_co.ataques_hoja_config,  '{}'),
    'ataquesOcultos',     COALESCE(to_jsonb(v_co.ataques_ocultos),  '[]'::jsonb),
    'itemsOcultos',       COALESCE(to_jsonb(v_co.items_ocultos),    '[]'::jsonb),
    'pgGananciaPorNivel', COALESCE(v_co.pg_ganancia_por_nivel, '{}'),

    'bonusASI',           COALESCE(v_co.bonus_asi,      '{}'),
    'dotesElegidos',      COALESCE(v_co.dotes_elegidos, '{}'),
    'dotesLibres',        COALESCE(v_co.dotes_libres,   '[]'),
    'dadosGolpeGastados', COALESCE(v_co.dados_golpe_gastados, 0),
    'pgMaxPersonalizado', v_co.pg_max_personalizado,
    'xpNivelActual',      COALESCE(v_co.xp_nivel_actual, 0),
    'inspiracion',        COALESCE(v_co.inspiracion, FALSE),
    'sintonizaciones',    COALESCE(v_co.sintonizaciones, '[]'),
    'escudoEquipado',     COALESCE(v_co.escudo_equipado, FALSE),
    'competenciasOverride', COALESCE(v_co.competencias_override, '{}'),
    'conjurosHojaConfig', COALESCE(v_co.conjuros_hoja_config, '{}'),

    'personajeOverrides', COALESCE(
      v_ov.valores,
      jsonb_strip_nulls(jsonb_build_object(
        'ca',                     v_ov.ca,
        'velocidad',              v_ov.velocidad,
        'iniciativa',             v_ov.iniciativa,
        'bonificadorCompetencia', v_ov.bonificador_competencia,
        'percepcionPasiva',       v_ov.percepcion_pasiva
      )),
      '{}'::jsonb
    )
  );
END;
$$;
