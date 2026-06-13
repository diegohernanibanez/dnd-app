import { CLASES, getClaseById } from '../data/classes'
import './MulticlassPanel.css'

const ICONOS_CLASE = {
  barbaro: '⚔️', bardo: '🎵', brujo: '🔮', clerigo: '✨',
  druida: '🌿', explorador: '🏹', guerrero: '🛡️', hechicero: '🌟',
  mago: '📚', monje: '👊', paladin: '⚜️', picaro: '🗡️',
}

const NIVEL_MAX = 20

// Requisito de multiclase (PHB 2024, pág. 44): para optar a una clase necesitas ≥13 en su
// característica principal. Algunas clases exigen dos (modo 'and': monje, paladín, explorador),
// otras admiten una de dos (modo 'or': guerrero). El manual también exige cumplir el requisito
// de tus clases actuales, no solo el de la nueva.
function cumpleRequisito(clase, puntuaciones) {
  const req = clase?.requisitoMulticlase
  const cars = req?.caracteristicas ?? clase?.caracteristicaPrincipal ?? []
  if (!cars.length) return true
  const ok = (c) => (puntuaciones?.[c] ?? 0) >= 13
  return req?.modo === 'or' ? cars.some(ok) : cars.every(ok)
}

// Texto del requisito para tooltips (p. ej. "Fuerza y Carisma ≥13" o "Fuerza o Destreza ≥13").
function textoRequisito(clase) {
  const req = clase?.requisitoMulticlase
  const cars = req?.caracteristicas ?? clase?.caracteristicaPrincipal ?? []
  if (!cars.length) return ''
  const sep = req?.modo === 'or' ? ' o ' : ' y '
  return `${cars.join(sep)} ≥13`
}

/**
 * Asignación de niveles por clase (multiclase guiada por el subir de nivel).
 * Cada nivel del personaje se asigna a una clase concreta: subes el nivel de una clase con ▲,
 * lo bajas con ▼, o le das el próximo nivel a una clase nueva con "+ Multiclase". El nivel total
 * del personaje es la suma de los niveles de todas sus clases (tope 20).
 */
export default function MulticlassPanel({
  clasePrimariaId,
  nivelPrimaria = 1,
  onNivelPrimariaCambiar,
  clasesSecundarias = [],
  onCambiar,
  puntuaciones = {},
}) {
  if (!clasePrimariaId) return null

  const clasePrimaria = getClaseById(clasePrimariaId)
  const primariaCumple = cumpleRequisito(clasePrimaria, puntuaciones)

  const nivelTotal = nivelPrimaria + clasesSecundarias.reduce((s, c) => s + (c.nivel || 0), 0)
  const puedeSubir = nivelTotal < NIVEL_MAX

  const usados = new Set([clasePrimariaId, ...clasesSecundarias.map(c => c.claseId)])
  const disponibles = CLASES.filter(c => !usados.has(c.id))

  // ── Mutaciones ──
  const setSecundaria = (idx, cambios) =>
    onCambiar(clasesSecundarias.map((c, i) => i === idx ? { ...c, ...cambios } : c))

  const subirPrimaria = () => puedeSubir && onNivelPrimariaCambiar?.(nivelPrimaria + 1)
  const bajarPrimaria = () => nivelPrimaria > 1 && onNivelPrimariaCambiar?.(nivelPrimaria - 1)

  const subirSecundaria = (idx) => puedeSubir && setSecundaria(idx, { nivel: clasesSecundarias[idx].nivel + 1 })
  const bajarSecundaria = (idx) => {
    const actual = clasesSecundarias[idx].nivel
    if (actual <= 1) {
      // Quitar la clase cuando se baja desde nivel 1 (deja de tener niveles asignados)
      onCambiar(clasesSecundarias.filter((_, i) => i !== idx))
    } else {
      setSecundaria(idx, { nivel: actual - 1 })
    }
  }

  // "+ Multiclase": el próximo nivel del personaje va a una clase nueva (entra en nivel 1)
  const multiclasearA = (claseId) => {
    if (!claseId || !puedeSubir) return
    onCambiar([...clasesSecundarias, { claseId, subclaseId: null, nivel: 1 }])
  }

  // ── Render de una fila de clase (función, no componente, para no remontar) ──
  const renderFila = ({ key, claseId, nivel, subclaseId, esPrimaria, onSubir, onBajar, onSub, onQuitar }) => {
    const clase = getClaseById(claseId)
    if (!clase) return null
    const ok = esPrimaria || cumpleRequisito(clase, puntuaciones)
    const tieneSubclase = nivel >= (clase.nivelSubclase ?? 3) && clase.subclases?.length > 0
    return (
      <li key={key} className={`mc-row${esPrimaria ? ' mc-row--primaria' : ''}`}>
        <span className="mc-row__icono" aria-hidden="true">{ICONOS_CLASE[claseId]}</span>
        <span className="mc-row__nombre">
          {clase.nombre}
          {esPrimaria && <em className="mc-row__tag">primaria</em>}
        </span>

        <div className="mc-row__nivel">
          <button type="button" className="mc-step mc-step--down" onClick={onBajar}
            disabled={esPrimaria ? nivel <= 1 : false}
            title={esPrimaria ? 'Bajar un nivel de esta clase' : (nivel <= 1 ? 'Quitar esta clase' : 'Bajar un nivel de esta clase')}>−</button>
          <span className="mc-row__nivel-val" title="Niveles en esta clase">Niv. {nivel}</span>
          <button type="button" className="mc-step mc-step--up" onClick={onSubir}
            disabled={!puedeSubir} title={puedeSubir ? 'Subir un nivel a esta clase' : 'Nivel total máximo (20)'}>+</button>
        </div>

        {tieneSubclase && (
          <label className="mc-row__field">
            Subclase
            <select value={subclaseId ?? ''} onChange={e => onSub(e.target.value || null)}>
              <option value="">— elegir —</option>
              {clase.subclases.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
            </select>
          </label>
        )}

        {!ok && (
          <span className="mc-row__warn" title={`El manual pide ${textoRequisito(clase)} para multiclasear a ${clase.nombre}.`}>⚠️ Requisito</span>
        )}

        {onQuitar && (
          <button type="button" className="mc-row__del" onClick={onQuitar} title="Quitar la clase entera">✕</button>
        )}
      </li>
    )
  }

  return (
    <div className="mc-panel">
      <div className="mc-panel__head">
        <h3 className="mc-panel__title">
          ⚗️ Niveles por clase
          <span className="mc-panel__total">Nivel total {nivelTotal}/{NIVEL_MAX}</span>
        </h3>
        <p className="mc-panel__desc">
          Cada nivel del personaje se asigna a una clase. Sube el nivel de una clase con <strong>+</strong>,
          bájalo con <strong>−</strong>, o dale el próximo nivel a una clase nueva con “Multiclase”. El
          bonificador por competencia, los PG y los espacios de conjuro se calculan con el nivel total.
        </p>
      </div>

      {clasesSecundarias.length > 0 && !primariaCumple && (
        <p className="mc-panel__req-primaria" title={`Tu clase primaria ${clasePrimaria?.nombre} requiere ${textoRequisito(clasePrimaria)}.`}>
          ⚠️ Para multiclasear también debes cumplir el requisito de tu clase primaria
          ({clasePrimaria?.nombre}: {textoRequisito(clasePrimaria)}).
        </p>
      )}

      <ul className="mc-list">
        {renderFila({
          key: 'primaria',
          claseId: clasePrimariaId,
          nivel: nivelPrimaria,
          subclaseId: null,
          esPrimaria: true,
          onSubir: subirPrimaria,
          onBajar: bajarPrimaria,
        })}
        {clasesSecundarias.map((sec, idx) => renderFila({
          key: idx,
          claseId: sec.claseId,
          nivel: sec.nivel,
          subclaseId: sec.subclaseId,
          onSubir: () => subirSecundaria(idx),
          onBajar: () => bajarSecundaria(idx),
          onSub: (v) => setSecundaria(idx, { subclaseId: v }),
          onQuitar: () => onCambiar(clasesSecundarias.filter((_, i) => i !== idx)),
        }))}
      </ul>

      {disponibles.length > 0 && (
        <div className="mc-add">
          <select
            className="mc-add__select"
            value=""
            disabled={!puedeSubir}
            onChange={e => multiclasearA(e.target.value)}
            title={puedeSubir ? 'Dar el próximo nivel a una clase nueva' : 'Nivel total máximo (20)'}
          >
            <option value="">+ Multiclase: dar el próximo nivel a una clase nueva…</option>
            {disponibles.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
