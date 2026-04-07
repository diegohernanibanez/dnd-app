// Servicio de almacenamiento — guarda JSON en carpeta db/ del proyecto vía API

const API = '/api/personajes'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

// ── CRUD ─────────────────────────────────────────────────────────────

export async function listarPersonajes() {
  const res = await fetch(API)
  return res.ok ? res.json() : []
}

export async function cargarPersonaje(id) {
  const res = await fetch(`${API}/${id}`)
  return res.ok ? res.json() : null
}

export async function guardarPersonaje(data) {
  const id = data.id || generateId()
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, id }),
  })
  const json = await res.json()
  return json.id
}

export async function eliminarPersonaje(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' })
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
    equipo: { opcionClase: null, opcionTrasfondo: null, oroDisponible: 0, extras: [], bagatela: null },
    hoja2: {
      historia: '',
      aliados: '',
      orgNombre: '',
      rasgosAdicionales: '',
      tesoro: '',
      descApariencia: '',
    },
    monedas: { PC: 0, PP: 0, PE: 0, PO: 0, PA: 0 },
    pgActuales: null,
    pgTemporales: 0,
    muerte: { exitos: 0, fallos: 0 },
    trucosSeleccionados: [],
    grimorioConjuros: [],
    conjurosSeleccionados: [],
    espaciosUsados: {},
    armasCustom: [],
  }
}
