// Servicio de almacenamiento
// Primario: localStorage (inmediato, funciona offline)
// Secundario: Supabase (sincronización en background)

import { supabase } from './supabase.js'

const STORAGE_PREFIX = 'dnd_personaje_'
const INDEX_KEY = 'dnd_personajes_index'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function getIndex() {
  try {
    return JSON.parse(localStorage.getItem(INDEX_KEY)) || []
  } catch {
    return []
  }
}

function saveIndex(index) {
  localStorage.setItem(INDEX_KEY, JSON.stringify(index))
}

// ── CRUD ─────────────────────────────────────────────────────────────

export function listarPersonajes() {
  return getIndex()
}

export function cargarPersonaje(id) {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${id}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export async function guardarPersonaje(data) {
  const id = data.id || generateId()
  const ahora = new Date().toISOString()
  const personaje = { ...data, id, fechaModificacion: ahora }
  if (!personaje.fechaCreacion) personaje.fechaCreacion = ahora

  // 1. localStorage primero (inmediato)
  localStorage.setItem(`${STORAGE_PREFIX}${id}`, JSON.stringify(personaje))

  const index = getIndex()
  const meta = {
    id,
    nombre: data.descripcion?.nombre || 'Sin nombre',
    clase: data.claseSeleccionada || null,
    nivel: data.nivel || 1,
    fechaCreacion: personaje.fechaCreacion,
    fechaModificacion: ahora,
  }
  const pos = index.findIndex(p => p.id === id)
  if (pos >= 0) index[pos] = meta
  else index.push(meta)
  saveIndex(index)

  // 2. Supabase en background (no bloquea el guardado local)
  if (supabase) {
    supabase
      .from('personajes')
      .upsert({
        id,
        nombre: meta.nombre,
        clase: meta.clase,
        nivel: meta.nivel,
        datos: personaje,
        fecha_creacion: personaje.fechaCreacion,
      })
      .then(({ error }) => {
        if (error) console.warn('[Supabase] Error al guardar:', error.message)
      })
  }

  return id
}

export function eliminarPersonaje(id) {
  localStorage.removeItem(`${STORAGE_PREFIX}${id}`)
  saveIndex(getIndex().filter(p => p.id !== id))

  if (supabase) {
    supabase
      .from('personajes')
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) console.warn('[Supabase] Error al eliminar:', error.message)
      })
  }
}

// ── Sincronización desde Supabase al cargar la app ───────────────────
// Trae personajes remotos que no estén en localStorage
export async function sincronizarDesdeSupabase() {
  if (!supabase) return

  try {
    const { data, error } = await supabase
      .from('personajes')
      .select('id, nombre, clase, nivel, datos, fecha_creacion, fecha_modificacion')
      .order('fecha_modificacion', { ascending: false })

    if (error) {
      console.warn('[Supabase] Error al sincronizar:', error.message)
      return
    }

    if (!data?.length) return

    const index = getIndex()
    let changed = false

    for (const row of data) {
      const localRaw = localStorage.getItem(`${STORAGE_PREFIX}${row.id}`)
      const localData = localRaw ? JSON.parse(localRaw) : null

      // Si no existe localmente, o la versión remota es más nueva → guardar local
      const remoteMs = new Date(row.fecha_modificacion).getTime()
      const localMs = localData ? new Date(localData.fechaModificacion || 0).getTime() : 0

      if (!localData || remoteMs > localMs) {
        localStorage.setItem(`${STORAGE_PREFIX}${row.id}`, JSON.stringify(row.datos))
        changed = true

        const meta = {
          id: row.id,
          nombre: row.nombre,
          clase: row.clase,
          nivel: row.nivel,
          fechaCreacion: row.fecha_creacion,
          fechaModificacion: row.fecha_modificacion,
        }
        const pos = index.findIndex(p => p.id === row.id)
        if (pos >= 0) index[pos] = meta
        else index.push(meta)
      }
    }

    if (changed) saveIndex(index)
  } catch (e) {
    console.warn('[Supabase] Error inesperado en sincronización:', e)
  }
}

// ── Exportar / Importar JSON ─────────────────────────────────────────

export function exportarPersonaje(data) {
  const nombre = data.descripcion?.nombre || 'personaje'
  const nombreArchivo = `${nombre.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ ]/g, '_')}.json`
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nombreArchivo
  a.click()
  URL.revokeObjectURL(url)
}

export function importarPersonaje(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (!data || typeof data !== 'object') {
          reject(new Error('El archivo no contiene datos de personaje válidos'))
          return
        }
        const nuevoId = generateId()
        resolve({ ...data, id: nuevoId, fechaCreacion: new Date().toISOString() })
      } catch {
        reject(new Error('El archivo no es un JSON válido'))
      }
    }
    reader.onerror = () => reject(new Error('Error leyendo el archivo'))
    reader.readAsText(file)
  })
}

// ── Estado inicial vacío ─────────────────────────────────────────────

export function crearEstadoInicial(CARACTERISTICAS) {
  return {
    id: null,
    nivel: 1,
    claseSeleccionada: null,
    eleccionNivel1: null,
    subclaseSeleccionada: null,
    origen: { trasfondo: null, especie: null, idiomas: ['Común'], linaje: null, habilidadDiestro: null, habilidadSentidos: null, habilidadesHabilidoso: [] },
    puntuaciones: Object.fromEntries(CARACTERISTICAS.map(c => [c, null])),
    bonusTrasfondo: { modo: null, stats: {} },
    habilidadesClase: [],
    descripcion: {
      nombre: '',
      alineamiento: null,
      apariencia: {},
      personalidad: { rasgos: '', ideal: '', vinculo: '', defecto: '' },
      trasfondoId: null,
    },
    equipo: { opcionClase: null, opcionTrasfondo: null, oroDisponible: 0, extras: [], bagatela: null, monedasAuto: { PC: 0, PP: 0, PE: 0, PO: 0, PA: 0 } },
    hoja2: {
      historia: '',
      aliados: '',
      orgNombre: '',
      rasgosAdicionales: '',
      tesoro: '',
      descApariencia: '',
    },
    monedas: { PC: 0, PP: 0, PE: 0, PO: 0, PA: 0 },
    pgActuales: 0,
    pgTemporales: 0,
    muerte: { exitos: 0, fallos: 0 },
    trucosSeleccionados: [],
    grimorioConjuros: [],
    conjurosSeleccionados: [],
    espaciosUsados: {},
    armasCustom: [],
    ataquesHojaConfig: {},
    ataquesOcultos: [],
    itemsOcultos: [],
    pgGananciaPorNivel: {},
    personajeOverrides: {},
  }
}
