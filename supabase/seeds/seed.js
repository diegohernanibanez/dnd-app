/**
 * Seeder de datos de referencia D&D 2024 → Supabase
 *
 * Uso:
 *   npm run db:seed
 *
 * Variables de entorno requeridas (.env.local):
 *   VITE_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   ← obtenelo en Supabase > Settings > API
 *
 * El service role key bypasea RLS y puede escribir en las tablas de referencia.
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

// ── Datos de referencia ─────────────────────────────────────────────────
import { CLASES } from '../../src/data/classes.js'
import { NIVEL_DATOS } from '../../src/data/classLevelData.js'
import { TRASFONDOS, ESPECIES } from '../../src/data/origins.js'
import { DOTES_ORIGEN, DOTES_GENERALES, CATEGORIAS_DOTE } from '../../src/data/dotes.js'
import { CONJUROS } from '../../src/data/spells.js'
import { ARMAS } from '../../src/data/weapons.js'
import { ALINEAMIENTOS } from '../../src/data/description.js'
import { PROGRESO_NIVEL } from '../../src/data/levelProgression.js'

// ── Cliente Supabase (service role) ────────────────────────────────────
const supabaseUrl = process.env.VITE_SUPABASE_URL
const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  console.error('❌  Faltan variables de entorno: VITE_SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY')
  console.error('   Agregá SUPABASE_SERVICE_ROLE_KEY en tu .env.local')
  process.exit(1)
}

const sb = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ── Helpers ─────────────────────────────────────────────────────────────

async function upsertBatch(tabla, rows, { chunkSize = 100, logNombre } = {}) {
  if (!rows.length) return
  const nombre = logNombre ?? tabla
  let total = 0
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize)
    const { error } = await sb.from(tabla).upsert(chunk)
    if (error) {
      console.error(`❌  ${nombre} (chunk ${i}–${i + chunk.length}):`, error.message)
      throw error
    }
    total += chunk.length
  }
  console.log(`  ✓  ${nombre}: ${total} filas`)
}

// ── Clases + Subclases + Rasgos ─────────────────────────────────────────

async function seedClases() {
  console.log('\n📚 Clases, subclases y rasgos…')

  const claseRows = CLASES.map(c => ({
    id:                                c.id,
    nombre:                            c.nombre,
    descripcion:                       c.descripcion ?? null,
    caracteristica_principal:          c.caracteristicaPrincipal ?? [],
    dado_golpe:                        c.dadoGolpe ?? null,
    tirads_salvacion:                  c.tiradasSalvacion ?? [],
    entrenamiento_armaduras:           c.entrenamientoArmaduras ?? [],
    competencias_habilidades_elegir:   c.competenciasHabilidades?.elegir ?? 2,
    competencias_habilidades_opciones: c.competenciasHabilidades?.opciones ?? [],
  }))
  await upsertBatch('clases', claseRows, { logNombre: 'clases' })

  const subclaseRows = []
  const rasgoClaseRows = []

  for (const clase of CLASES) {
    // Subclases de la clase
    for (const sc of (clase.subclases ?? [])) {
      subclaseRows.push({
        id:          sc.id,
        clase_id:    clase.id,
        nombre:      sc.nombre,
        descripcion: sc.desc ?? null,
      })

      // Rasgos de subclase por nivel
      for (const [nivelStr, rasgos] of Object.entries(sc.rasgosNivel ?? {})) {
        for (const r of rasgos) {
          rasgoClaseRows.push({
            clase_id:           clase.id,
            subclase_id:        sc.id,
            nivel:              parseInt(nivelStr, 10),
            nombre:             r.nombre,
            descripcion:        r.desc ?? null,
            es_asi:             r.esASI        ?? false,
            es_subclase:        r.esSubclase   ?? false,
            es_rasgo_subclase:  r.esRasgoSubclase ?? false,
            es_don_epico:       r.esDonEpico   ?? false,
          })
        }
      }
    }

    // Rasgos de nivel de la clase (desde NIVEL_DATOS)
    const nivelDatos = NIVEL_DATOS[clase.id]
    if (nivelDatos) {
      for (const [nivelStr, rasgos] of Object.entries(nivelDatos.rasgosNivel ?? {})) {
        for (const r of rasgos) {
          rasgoClaseRows.push({
            clase_id:          clase.id,
            subclase_id:       null,
            nivel:             parseInt(nivelStr, 10),
            nombre:            r.nombre  ?? 'Rasgo',
            descripcion:       r.desc    ?? null,
            es_asi:            r.esASI         ?? false,
            es_subclase:       r.esSubclase    ?? false,
            es_rasgo_subclase: r.esRasgoSubclase ?? false,
            es_don_epico:      r.esDonEpico    ?? false,
          })
        }
      }
    }
  }

  await upsertBatch('subclases',   subclaseRows,   { logNombre: 'subclases' })
  await upsertBatch('rasgos_clase', rasgoClaseRows, { logNombre: 'rasgos_clase' })
}

// ── Trasfondos ─────────────────────────────────────────────────────────

async function seedTrasfondos() {
  console.log('\n📚 Trasfondos…')
  const rows = TRASFONDOS.map(t => ({
    id:                          t.id,
    nombre:                      t.nombre,
    descripcion:                 t.descripcion ?? null,
    puntuaciones_caracteristica: t.puntuacionesCaracteristica ?? [],
    dote_id:                     t.doteId ?? null,
    competencias_habilidades:    t.competenciasHabilidades ?? [],
    competencia_herramienta:     t.competenciaHerramienta ?? null,
  }))
  await upsertBatch('trasfondos', rows)
}

// ── Especies + Linajes ──────────────────────────────────────────────────

async function seedEspecies() {
  console.log('\n📚 Especies y linajes…')

  const especieRows = ESPECIES.map(e => ({
    id:                       e.id,
    nombre:                   e.nombre,
    descripcion:              e.descripcion ?? null,
    tamano:                   e.tamano ?? null,
    velocidad:                e.velocidad ?? null,
    pg_por_nivel_bonus:       e.pgPorNivelBonus ?? 0,
    rasgos_destacados:        e.rasgosDestacados ?? [],
    tiene_linajes:            !!(e.linajes?.length),
    tiene_sentidos_agudos:    e.tieneSentidosAgudos ?? false,
    opciones_sentidos_agudos: e.opcionesSentidosAgudos ?? [],
  }))
  await upsertBatch('especies', especieRows)

  const linajeRows = []
  for (const e of ESPECIES) {
    for (const l of (e.linajes ?? [])) {
      linajeRows.push({
        id:          l.id,
        especie_id:  e.id,
        nombre:      l.nombre,
        descripcion: l.desc ?? null,
        tipo_dano:   l.tipoDano ?? null,
      })
    }
  }
  await upsertBatch('linajes', linajeRows, { logNombre: 'linajes' })
}

// ── Dotes ───────────────────────────────────────────────────────────────

async function seedDotes() {
  console.log('\n📚 Dotes…')
  const todasLasDotes = [...DOTES_ORIGEN, ...(DOTES_GENERALES ?? [])]

  const rows = todasLasDotes.map(d => ({
    id:              d.id,
    nombre:          d.nombre,
    categoria:       d.categoria ?? CATEGORIAS_DOTE.ORIGEN,
    descripcion:     d.descripcion ?? null,
    requisito_nivel: d.requisitos?.find(r => r.tipo === 'nivel')?.valor ?? null,
    repetible:       d.repetible ?? false,
  }))
  await upsertBatch('dotes', rows)
}

// ── Conjuros ────────────────────────────────────────────────────────────

async function seedConjuros() {
  console.log('\n📚 Conjuros…')
  const rows = Object.entries(CONJUROS).map(([nombre, c]) => ({
    nombre,
    nivel:              c.nivel,
    escuela:            c.escuela ?? null,
    clases:             c.clases  ?? [],
    tiempo_lanzamiento: c.tiempoLanzamiento ?? null,
    alcance:            c.alcance     ?? null,
    componentes:        c.componentes ?? null,
    duracion:           c.duracion    ?? null,
    descripcion:        c.descripcion ?? null,
  }))
  await upsertBatch('conjuros', rows, { chunkSize: 50 })
}

// ── Armas ───────────────────────────────────────────────────────────────

async function seedArmas() {
  console.log('\n📚 Armas…')
  const rows = Object.entries(ARMAS).map(([nombre, a]) => ({
    nombre,
    tipo:          a.tipo          ?? null,
    caracteristica: a.caracteristica ?? null,
    dano:          a.daño          ?? null,
    dano_versatil: a.daño2         ?? null,
  }))
  await upsertBatch('armas', rows)
}

// ── Alineamientos ───────────────────────────────────────────────────────

async function seedAlineamientos() {
  console.log('\n📚 Alineamientos…')
  const rows = ALINEAMIENTOS.map(a => ({
    id:          a.id,
    nombre:      a.nombre,
    abrev:       a.abrev ?? null,
    descripcion: a.descripcion ?? null,
    fila:        a.fila ?? null,
    col:         a.col  ?? null,
  }))
  await upsertBatch('alineamientos', rows)
}

// ── Progreso de nivel ───────────────────────────────────────────────────

async function seedProgresoNivel() {
  console.log('\n📚 Progreso de nivel…')
  const rows = PROGRESO_NIVEL.map(p => ({
    nivel: p.nivel,
    xp:    p.xp,
    bono:  p.bono,
  }))
  await upsertBatch('progreso_nivel', rows, { logNombre: 'progreso_nivel' })
}

// ── Main ────────────────────────────────────────────────────────────────

async function main() {
  console.log('🎲 Iniciando seed de datos D&D 2024 → Supabase…')
  console.log(`   URL: ${supabaseUrl}`)

  try {
    await seedClases()
    await seedTrasfondos()
    await seedEspecies()
    await seedDotes()
    await seedConjuros()
    await seedArmas()
    await seedAlineamientos()
    await seedProgresoNivel()

    console.log('\n✅  Seed completado exitosamente.')
  } catch (err) {
    console.error('\n❌  Seed falló:', err.message)
    process.exit(1)
  }
}

main()
