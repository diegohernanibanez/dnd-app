import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_DIR = join(__dirname, 'db')
const INDEX_FILE = join(DB_DIR, '_index.json')

if (!existsSync(DB_DIR)) mkdirSync(DB_DIR, { recursive: true })
if (!existsSync(INDEX_FILE)) writeFileSync(INDEX_FILE, '[]', 'utf-8')

function leerIndex() {
  try { return JSON.parse(readFileSync(INDEX_FILE, 'utf-8')) }
  catch { return [] }
}

function guardarIndex(index) {
  writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2), 'utf-8')
}

const app = express()
app.use(cors())
app.use(express.json({ limit: '5mb' }))

// Listar personajes
app.get('/api/personajes', (_req, res) => {
  res.json(leerIndex())
})

// Obtener un personaje
app.get('/api/personajes/:id', (req, res) => {
  const file = join(DB_DIR, `${req.params.id}.json`)
  if (!existsSync(file)) return res.status(404).json({ error: 'No encontrado' })
  res.json(JSON.parse(readFileSync(file, 'utf-8')))
})

// Guardar (crear o actualizar)
app.put('/api/personajes/:id', (req, res) => {
  const { id } = req.params
  const ahora = new Date().toISOString()
  const data = { ...req.body, id, fechaModificacion: ahora, fechaCreacion: req.body.fechaCreacion || ahora }

  writeFileSync(join(DB_DIR, `${id}.json`), JSON.stringify(data, null, 2), 'utf-8')

  const index = leerIndex()
  const meta = {
    id,
    nombre: data.descripcion?.nombre || 'Sin nombre',
    clase: data.claseSeleccionada || null,
    nivel: data.nivel || 1,
    fechaCreacion: data.fechaCreacion,
    fechaModificacion: ahora,
  }
  const idx = index.findIndex(e => e.id === id)
  if (idx >= 0) index[idx] = meta
  else index.unshift(meta)
  guardarIndex(index)

  res.json({ id })
})

// Eliminar
app.delete('/api/personajes/:id', (req, res) => {
  const file = join(DB_DIR, `${req.params.id}.json`)
  if (existsSync(file)) unlinkSync(file)
  const index = leerIndex().filter(e => e.id !== req.params.id)
  guardarIndex(index)
  res.json({ ok: true })
})

const PORT = 3001
app.listen(PORT, () => console.log(`📁 API servidor corriendo en http://localhost:${PORT}`))
