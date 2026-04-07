import { useState, useEffect, useRef } from 'react'
import { listarPersonajes, eliminarPersonaje, exportarPersonaje, importarPersonaje } from '../data/storage'
import './CharacterManager.css'

export default function CharacterManager({
  personajeActualId,
  nombreActual,
  onNuevo,
  onCargar,
  onGuardar,
  onSerializar,
}) {
  const [listaAbierta, setListaAbierta] = useState(false)
  const [confirmEliminar, setConfirmEliminar] = useState(null)
  const [personajes, setPersonajes] = useState([])
  const fileRef = useRef(null)

  // Cargar lista al abrir dropdown
  useEffect(() => {
    if (listaAbierta) {
      listarPersonajes().then(setPersonajes)
    }
  }, [listaAbierta])

  const handleExportar = () => {
    const data = onSerializar()
    if (data) exportarPersonaje(data)
  }

  const handleImportar = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const data = await importarPersonaje(file)
      onCargar(data)
    } catch (err) {
      alert(err.message)
    }
    e.target.value = ''
  }

  const handleEliminar = async (id) => {
    await eliminarPersonaje(id)
    setConfirmEliminar(null)
    setPersonajes(prev => prev.filter(p => p.id !== id))
    if (id === personajeActualId) onNuevo()
  }

  return (
    <div className="cm">
      <div className="cm__left">
        <button className="cm__btn cm__btn--new" onClick={onNuevo} title="Nuevo personaje">
          ＋ Nuevo
        </button>

        <div className="cm__list-wrap">
          <button
            className="cm__btn cm__btn--list"
            onClick={() => setListaAbierta(!listaAbierta)}
          >
            📂 Personajes
          </button>

          {listaAbierta && (
            <div className="cm__dropdown">
              {personajes.length === 0 ? (
                <div className="cm__empty">No hay personajes guardados</div>
              ) : (
                personajes.map(p => (
                  <div
                    key={p.id}
                    className={`cm__item ${p.id === personajeActualId ? 'cm__item--active' : ''}`}
                  >
                    <button
                      className="cm__item-btn"
                      onClick={() => { onCargar(p); setListaAbierta(false) }}
                    >
                      <span className="cm__item-nombre">{p.nombre || 'Sin nombre'}</span>
                      <span className="cm__item-meta">
                        {p.clase ? `${p.clase} Niv.${p.nivel}` : 'Sin clase'}
                      </span>
                    </button>
                    {confirmEliminar === p.id ? (
                      <div className="cm__confirm">
                        <button className="cm__confirm-yes" onClick={() => handleEliminar(p.id)}>Sí</button>
                        <button className="cm__confirm-no" onClick={() => setConfirmEliminar(null)}>No</button>
                      </div>
                    ) : (
                      <button
                        className="cm__item-del"
                        onClick={() => setConfirmEliminar(p.id)}
                        title="Eliminar"
                      >✕</button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="cm__center">
        <span className="cm__current">
          {nombreActual || <em>Sin nombre</em>}
          {personajeActualId && <span className="cm__saved-badge">💾</span>}
        </span>
      </div>

      <div className="cm__right">
        <button className="cm__btn cm__btn--save" onClick={onGuardar} title="Guardar personaje">
          💾 Guardar
        </button>
        <button className="cm__btn cm__btn--export" onClick={handleExportar} title="Exportar JSON">
          ⬇ Exportar
        </button>
        <button className="cm__btn cm__btn--import" onClick={() => fileRef.current?.click()} title="Importar JSON">
          ⬆ Importar
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleImportar}
        />
      </div>
    </div>
  )
}
