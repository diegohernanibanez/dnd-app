-- ══════════════════════════════════════════════════════════════════════════
-- Migración 002: Schema completo D&D 2024
-- Tablas de referencia (reglas del juego) + tablas de personaje normalizadas
-- ══════════════════════════════════════════════════════════════════════════


-- ── 1. TABLAS DE REFERENCIA (datos del juego, inmutables) ──────────────

CREATE TABLE IF NOT EXISTS clases (
  id                                TEXT PRIMARY KEY,
  nombre                            TEXT NOT NULL,
  descripcion                       TEXT,
  caracteristica_principal          TEXT[],
  dado_golpe                        TEXT,
  tirads_salvacion                  TEXT[],
  entrenamiento_armaduras           TEXT[],
  competencias_habilidades_elegir   INTEGER DEFAULT 2,
  competencias_habilidades_opciones TEXT[]
);

CREATE TABLE IF NOT EXISTS subclases (
  id          TEXT PRIMARY KEY,
  clase_id    TEXT REFERENCES clases(id) ON DELETE CASCADE,
  nombre      TEXT NOT NULL,
  descripcion TEXT
);

CREATE TABLE IF NOT EXISTS rasgos_clase (
  id                  SERIAL PRIMARY KEY,
  clase_id            TEXT REFERENCES clases(id) ON DELETE CASCADE,
  subclase_id         TEXT REFERENCES subclases(id) ON DELETE CASCADE,
  nivel               INTEGER NOT NULL,
  nombre              TEXT NOT NULL,
  descripcion         TEXT,
  es_asi              BOOLEAN DEFAULT FALSE,
  es_subclase         BOOLEAN DEFAULT FALSE,
  es_rasgo_subclase   BOOLEAN DEFAULT FALSE,
  es_don_epico        BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS trasfondos (
  id                          TEXT PRIMARY KEY,
  nombre                      TEXT NOT NULL,
  descripcion                 TEXT,
  puntuaciones_caracteristica TEXT[],
  dote_id                     TEXT,
  competencias_habilidades    TEXT[],
  competencia_herramienta     TEXT
);

CREATE TABLE IF NOT EXISTS especies (
  id                        TEXT PRIMARY KEY,
  nombre                    TEXT NOT NULL,
  descripcion               TEXT,
  tamano                    TEXT,
  velocidad                 TEXT,
  pg_por_nivel_bonus        INTEGER DEFAULT 0,
  rasgos_destacados         TEXT[],
  tiene_linajes             BOOLEAN DEFAULT FALSE,
  tiene_sentidos_agudos     BOOLEAN DEFAULT FALSE,
  opciones_sentidos_agudos  TEXT[]
);

CREATE TABLE IF NOT EXISTS linajes (
  id          TEXT NOT NULL,
  especie_id  TEXT REFERENCES especies(id) ON DELETE CASCADE,
  nombre      TEXT NOT NULL,
  descripcion TEXT,
  tipo_dano   TEXT,
  PRIMARY KEY (id, especie_id)
);

CREATE TABLE IF NOT EXISTS dotes (
  id              TEXT PRIMARY KEY,
  nombre          TEXT NOT NULL,
  categoria       TEXT NOT NULL,
  descripcion     TEXT,
  requisito_nivel INTEGER,
  repetible       BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS conjuros (
  nombre              TEXT PRIMARY KEY,
  nivel               INTEGER NOT NULL,
  escuela             TEXT,
  clases              TEXT[],
  tiempo_lanzamiento  TEXT,
  alcance             TEXT,
  componentes         TEXT,
  duracion            TEXT,
  descripcion         TEXT
);

CREATE TABLE IF NOT EXISTS armas (
  nombre        TEXT PRIMARY KEY,
  tipo          TEXT,
  caracteristica TEXT,
  dano          TEXT,
  dano_versatil TEXT
);

CREATE TABLE IF NOT EXISTS alineamientos (
  id          TEXT PRIMARY KEY,
  nombre      TEXT NOT NULL,
  abrev       TEXT,
  descripcion TEXT,
  fila        INTEGER,
  col         INTEGER
);

CREATE TABLE IF NOT EXISTS progreso_nivel (
  nivel INTEGER PRIMARY KEY,
  xp    INTEGER,
  bono  INTEGER
);


-- ── 2. MODIFICAR TABLA personajes (reemplazar JSONB por FKs) ──────────

-- Añadir columnas relacionales (nullable para no romper datos existentes)
ALTER TABLE personajes
  ADD COLUMN IF NOT EXISTS clase_id        TEXT REFERENCES clases(id),
  ADD COLUMN IF NOT EXISTS subclase_id     TEXT REFERENCES subclases(id),
  ADD COLUMN IF NOT EXISTS trasfondo_id    TEXT REFERENCES trasfondos(id),
  ADD COLUMN IF NOT EXISTS especie_id      TEXT REFERENCES especies(id),
  ADD COLUMN IF NOT EXISTS linaje_id       TEXT,
  ADD COLUMN IF NOT EXISTS alineamiento_id TEXT REFERENCES alineamientos(id),
  ADD COLUMN IF NOT EXISTS eleccion_nivel1 TEXT;

-- Eliminar columnas legacy
ALTER TABLE personajes
  DROP COLUMN IF EXISTS clase,
  DROP COLUMN IF EXISTS datos;


-- ── 3. TABLAS RELACIONADAS DEL PERSONAJE ──────────────────────────────

-- Puntuaciones de característica, PG, tiradas de muerte
CREATE TABLE IF NOT EXISTS personaje_stats (
  personaje_id  TEXT PRIMARY KEY REFERENCES personajes(id) ON DELETE CASCADE,
  fuerza        INTEGER,
  destreza      INTEGER,
  constitucion  INTEGER,
  inteligencia  INTEGER,
  sabiduria     INTEGER,
  carisma       INTEGER,
  pg_actuales   INTEGER DEFAULT 0,
  pg_temporales INTEGER DEFAULT 0,
  muerte_exitos INTEGER DEFAULT 0,
  muerte_fallos INTEGER DEFAULT 0
);

-- Monedas
CREATE TABLE IF NOT EXISTS personaje_monedas (
  personaje_id TEXT PRIMARY KEY REFERENCES personajes(id) ON DELETE CASCADE,
  pc           INTEGER DEFAULT 0,
  pp           INTEGER DEFAULT 0,
  pe           INTEGER DEFAULT 0,
  po           INTEGER DEFAULT 0,
  pa           INTEGER DEFAULT 0
);

-- Campos de texto: descripción, personalidad, hoja 2
CREATE TABLE IF NOT EXISTS personaje_descripcion (
  personaje_id       TEXT PRIMARY KEY REFERENCES personajes(id) ON DELETE CASCADE,
  apariencia         JSONB DEFAULT '{}',
  rasgos             TEXT DEFAULT '',
  ideal              TEXT DEFAULT '',
  vinculo            TEXT DEFAULT '',
  defecto            TEXT DEFAULT '',
  historia           TEXT DEFAULT '',
  aliados            TEXT DEFAULT '',
  org_nombre         TEXT DEFAULT '',
  rasgos_adicionales TEXT DEFAULT '',
  tesoro             TEXT DEFAULT '',
  desc_apariencia    TEXT DEFAULT ''
);

-- Overrides del modo edición (CA, velocidad, etc.)
CREATE TABLE IF NOT EXISTS personaje_overrides (
  personaje_id            TEXT PRIMARY KEY REFERENCES personajes(id) ON DELETE CASCADE,
  ca                      INTEGER,
  velocidad               INTEGER,
  iniciativa              INTEGER,
  bonificador_competencia INTEGER,
  percepcion_pasiva       INTEGER
);

-- Configuración miscelánea (elecciones de creación, equipo, etc.)
CREATE TABLE IF NOT EXISTS personaje_config (
  personaje_id            TEXT PRIMARY KEY REFERENCES personajes(id) ON DELETE CASCADE,
  habilidades_clase       TEXT[]  DEFAULT '{}',
  bonus_trasfondo_modo    TEXT,
  bonus_trasfondo_stats   JSONB   DEFAULT '{}',
  idiomas                 TEXT[]  DEFAULT '{"Común"}',
  habilidad_diestro       TEXT,
  habilidad_sentidos      TEXT,
  habilidades_habilidoso  TEXT[]  DEFAULT '{}',
  pg_ganancia_por_nivel   JSONB   DEFAULT '{}',
  equipo_opcion_clase     TEXT,
  equipo_opcion_trasfondo TEXT,
  oro_disponible          NUMERIC DEFAULT 0,
  bagatela                TEXT,
  monedas_auto            JSONB   DEFAULT '{}',
  ataques_hoja_config     JSONB   DEFAULT '{}',
  ataques_ocultos         TEXT[]  DEFAULT '{}',
  items_ocultos           TEXT[]  DEFAULT '{}'
);

-- Conjuros conocidos / grimorio / preparados
CREATE TABLE IF NOT EXISTS personaje_conjuros (
  personaje_id   TEXT REFERENCES personajes(id) ON DELETE CASCADE,
  conjuro_nombre TEXT NOT NULL,
  en_grimorio    BOOLEAN DEFAULT FALSE,
  preparado      BOOLEAN DEFAULT FALSE,
  es_truco       BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (personaje_id, conjuro_nombre)
);

-- Espacios de conjuro usados por nivel
CREATE TABLE IF NOT EXISTS personaje_espacios_conjuro (
  personaje_id TEXT    REFERENCES personajes(id) ON DELETE CASCADE,
  nivel        INTEGER NOT NULL,
  usados       INTEGER DEFAULT 0,
  PRIMARY KEY (personaje_id, nivel)
);

-- Objetos en el inventario (extras de equipo)
CREATE TABLE IF NOT EXISTS personaje_inventario (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  personaje_id TEXT REFERENCES personajes(id) ON DELETE CASCADE,
  item         JSONB NOT NULL   -- string o { nombre, cantidad, ... }
);

-- Ataques personalizados (armasCustom)
CREATE TABLE IF NOT EXISTS personaje_ataques (
  id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  personaje_id TEXT    REFERENCES personajes(id) ON DELETE CASCADE,
  nombre       TEXT    NOT NULL,
  bonif_ataque TEXT,
  dano         TEXT,
  tipo_dano    TEXT,
  es_custom    BOOLEAN DEFAULT TRUE
);


-- ── 4. RPC: guardar personaje completo (upsert atómico) ───────────────

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
    NULLIF(p_datos->'descripcion'->>'trasfondoId',           ''),
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

  -- ── Overrides ────────────────────────────────────────────────────
  INSERT INTO personaje_overrides (
    personaje_id, ca, velocidad, iniciativa, bonificador_competencia, percepcion_pasiva
  ) VALUES (
    v_id,
    (p_datos->'personajeOverrides'->>'ca')::INTEGER,
    (p_datos->'personajeOverrides'->>'velocidad')::INTEGER,
    (p_datos->'personajeOverrides'->>'iniciativa')::INTEGER,
    (p_datos->'personajeOverrides'->>'bonificadorCompetencia')::INTEGER,
    (p_datos->'personajeOverrides'->>'percepcionPasiva')::INTEGER
  )
  ON CONFLICT (personaje_id) DO UPDATE SET
    ca                      = EXCLUDED.ca,
    velocidad               = EXCLUDED.velocidad,
    iniciativa              = EXCLUDED.iniciativa,
    bonificador_competencia = EXCLUDED.bonificador_competencia,
    percepcion_pasiva       = EXCLUDED.percepcion_pasiva;

  -- ── Config ───────────────────────────────────────────────────────
  INSERT INTO personaje_config (
    personaje_id,
    habilidades_clase, bonus_trasfondo_modo, bonus_trasfondo_stats,
    idiomas, habilidad_diestro, habilidad_sentidos, habilidades_habilidoso,
    pg_ganancia_por_nivel, equipo_opcion_clase, equipo_opcion_trasfondo,
    oro_disponible, bagatela, monedas_auto,
    ataques_hoja_config, ataques_ocultos, items_ocultos
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
    ARRAY(SELECT jsonb_array_elements_text(COALESCE(p_datos->'itemsOcultos',   '[]')))
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
    items_ocultos           = EXCLUDED.items_ocultos;

  -- ── Conjuros (delete + insert) ───────────────────────────────────
  DELETE FROM personaje_conjuros WHERE personaje_id = v_id;

  -- Trucos
  INSERT INTO personaje_conjuros (personaje_id, conjuro_nombre, es_truco)
  SELECT v_id, elem, TRUE
  FROM jsonb_array_elements_text(COALESCE(p_datos->'trucosSeleccionados', '[]')) AS elem
  ON CONFLICT DO NOTHING;

  -- Grimorio (mago)
  INSERT INTO personaje_conjuros (personaje_id, conjuro_nombre, en_grimorio)
  SELECT v_id, elem, TRUE
  FROM jsonb_array_elements_text(COALESCE(p_datos->'grimorioConjuros', '[]')) AS elem
  ON CONFLICT (personaje_id, conjuro_nombre) DO UPDATE SET en_grimorio = TRUE;

  -- Preparados / conocidos
  INSERT INTO personaje_conjuros (personaje_id, conjuro_nombre, preparado)
  SELECT v_id, elem, TRUE
  FROM jsonb_array_elements_text(COALESCE(p_datos->'conjurosSeleccionados', '[]')) AS elem
  ON CONFLICT (personaje_id, conjuro_nombre) DO UPDATE SET preparado = TRUE;

  -- ── Espacios de conjuro (delete + insert) ────────────────────────
  DELETE FROM personaje_espacios_conjuro WHERE personaje_id = v_id;
  INSERT INTO personaje_espacios_conjuro (personaje_id, nivel, usados)
  SELECT v_id, (kv.key)::INTEGER, (kv.value)::INTEGER
  FROM jsonb_each_text(COALESCE(p_datos->'espaciosUsados', '{}')) AS kv;

  -- ── Inventario extras (delete + insert) ──────────────────────────
  DELETE FROM personaje_inventario WHERE personaje_id = v_id;
  INSERT INTO personaje_inventario (personaje_id, item)
  SELECT v_id, elem
  FROM jsonb_array_elements(COALESCE(p_datos->'equipo'->'extras', '[]')) AS elem;

  -- ── Ataques custom (delete + insert) ─────────────────────────────
  DELETE FROM personaje_ataques WHERE personaje_id = v_id;
  INSERT INTO personaje_ataques (personaje_id, nombre, bonif_ataque, dano, tipo_dano)
  SELECT
    v_id,
    a->>'nombre',
    a->>'bonif',
    a->>'dano',
    a->>'tipoDano'
  FROM jsonb_array_elements(COALESCE(p_datos->'armasCustom', '[]')) AS a;

  RETURN v_id;
END;
$$;


-- ── 5. RPC: cargar personaje completo (reconstruye el estado JS) ──────

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
      SELECT COALESCE(jsonb_object_agg(nivel::TEXT, usados), '{}')
      FROM personaje_espacios_conjuro
      WHERE personaje_id = p_id
    ),

    'armasCustom', (
      SELECT COALESCE(jsonb_agg(jsonb_build_object(
        'id',      id::TEXT,
        'nombre',  nombre,
        'bonif',   bonif_ataque,
        'dano',    dano,
        'tipoDano', tipo_dano
      ) ORDER BY id), '[]'::jsonb)
      FROM personaje_ataques
      WHERE personaje_id = p_id
    ),

    'ataquesHojaConfig',  COALESCE(v_co.ataques_hoja_config,  '{}'),
    'ataquesOcultos',     COALESCE(to_jsonb(v_co.ataques_ocultos),  '[]'::jsonb),
    'itemsOcultos',       COALESCE(to_jsonb(v_co.items_ocultos),    '[]'::jsonb),
    'pgGananciaPorNivel', COALESCE(v_co.pg_ganancia_por_nivel, '{}'),
    'personajeOverrides', jsonb_build_object(
      'ca',                     v_ov.ca,
      'velocidad',              v_ov.velocidad,
      'iniciativa',             v_ov.iniciativa,
      'bonificadorCompetencia', v_ov.bonificador_competencia,
      'percepcionPasiva',       v_ov.percepcion_pasiva
    )
  );
END;
$$;


-- ── 6. RLS para todas las tablas nuevas ───────────────────────────────

-- Tablas de referencia: solo lectura pública
DO $$ DECLARE t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'clases','subclases','rasgos_clase','trasfondos','especies','linajes',
    'dotes','conjuros','armas','alineamientos','progreso_nivel'
  ]) LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS "public_read" ON %I', t);
    EXECUTE format('CREATE POLICY "public_read" ON %I FOR SELECT USING (true)', t);
  END LOOP;
END $$;

-- Tablas de personaje: acceso completo anónimo (sin auth por ahora)
DO $$ DECLARE t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'personaje_stats','personaje_monedas','personaje_descripcion','personaje_overrides',
    'personaje_config','personaje_conjuros','personaje_espacios_conjuro',
    'personaje_inventario','personaje_ataques'
  ]) LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS "allow_all_anon" ON %I', t);
    EXECUTE format('CREATE POLICY "allow_all_anon" ON %I FOR ALL USING (true) WITH CHECK (true)', t);
  END LOOP;
END $$;
