import { CLASES, getClaseById } from '../data/classes'
import './MulticlassPanel.css'

const ICONOS_CLASE = {
  barbaro: '⚔️', bardo: '🎵', brujo: '🔮', clerigo: '✨',
  druida: '🌿', explorador: '🏹', guerrero: '🛡️', hechicero: '🌟',
  mago: '📚', monje: '👊', paladin: '⚜️', picaro: '🗡️',
}

// Requisito de multiclase (PHB 2024, pág. 44): puntuación ≥13 en la característica
// principal de la clase. Para clases con dos características principales, basta una.
function cumpleRequisito(clase, puntuaciones) {
  const principales = clase?.caracteristicaPrincipal ?? []
  if (!principales.length) return true
  return principales.some(c => (puntuaciones?.[c] ?? 0) >= 13)
}

export default function MulticlassPanel({
  clasePrimariaId,
  clasesSecundarias = [],
  onCambiar,
  puntuaciones = {},
}) {
  const usados = new Set([clasePrimariaId, ...clasesSecundarias.map(c => c.claseId)])
  const disponibles = CLASES.filter(c => !usados.has(c.id))

  if (!clasePrimariaId) return null

  const añadir = (claseId) => {
    if (!claseId) return
    onCambiar([...clasesSecundarias, { claseId, subclaseId: null, nivel: 1 }])
  }
  const quitar = (idx) => {
    onCambiar(clasesSecundarias.filter((_, i) => i !== idx))
  }
  const actualizar = (idx, cambios) => {
    onCambiar(clasesSecundarias.map((c, i) => i === idx ? { ...c, ...cambios } : c))
  }

  return (
    <div className="mc-panel">
      <div className="mc-panel__head">
        <h3 className="mc-panel__title">⚗️ Multiclase <span className="mc-panel__opt">(opcional)</span></h3>
        <p className="mc-panel__desc">
          Añade niveles en otras clases. El nivel total del personaje (y su bonificador por
          competencia, PG y espacios de conjuro) se calcula con la suma de todas las clases.
        </p>
      </div>

      {clasesSecundarias.length > 0 && (
        <ul className="mc-list">
          {clasesSecundarias.map((sec, idx) => {
            const clase = getClaseById(sec.claseId)
            if (!clase) return null
            const ok = cumpleRequisito(clase, puntuaciones)
            return (
              <li key={idx} className="mc-row">
                <span className="mc-row__icono" aria-hidden="true">{ICONOS_CLASE[sec.claseId]}</span>
                <span className="mc-row__nombre">{clase.nombre}</span>

                <label className="mc-row__field">
                  Nivel
                  <select
                    value={sec.nivel}
                    onChange={e => actualizar(idx, { nivel: Number(e.target.value) })}
                  >
                    {Array.from({ length: 19 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </label>

                {sec.nivel >= 3 && clase.subclases?.length > 0 && (
                  <label className="mc-row__field">
                    Subclase
                    <select
                      value={sec.subclaseId ?? ''}
                      onChange={e => actualizar(idx, { subclaseId: e.target.value || null })}
                    >
                      <option value="">— elegir —</option>
                      {clase.subclases.map(s => (
                        <option key={s.id} value={s.id}>{s.nombre}</option>
                      ))}
                    </select>
                  </label>
                )}

                {!ok && (
                  <span
                    className="mc-row__warn"
                    title={`El manual pide ≥13 en ${clase.caracteristicaPrincipal.join(' o ')} para multiclasear a ${clase.nombre}.`}
                  >⚠️ Requisito</span>
                )}

                <button type="button" className="mc-row__del" onClick={() => quitar(idx)} title="Quitar clase">✕</button>
              </li>
            )
          })}
        </ul>
      )}

      {disponibles.length > 0 && (
        <div className="mc-add">
          <select
            className="mc-add__select"
            value=""
            onChange={e => añadir(e.target.value)}
          >
            <option value="">+ Añadir clase…</option>
            {disponibles.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
