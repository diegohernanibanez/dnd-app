import { PROGRESO_NIVEL, getBonoCompetencia } from '../data/levelProgression'
import './LevelSelector.css'

const RANGOS = [
  { label: 'Novato (1-4)',    min: 1,  max: 4 },
  { label: 'Aventurero (5-10)', min: 5, max: 10 },
  { label: 'Héroe (11-16)',   min: 11, max: 16 },
  { label: 'Leyenda (17-20)', min: 17, max: 20 },
]

export default function LevelSelector({ nivel, onCambiar, nivelesASI }) {
  const bono = getBonoCompetencia(nivel)
  const fila = PROGRESO_NIVEL[nivel - 1]
  const siguiente = PROGRESO_NIVEL[nivel]
  const esASI = nivelesASI?.includes(nivel)

  return (
    <div className="level-selector">
      <div className="level-selector__inner">
        <span className="level-selector__label">Nivel</span>

        <div className="level-selector__btns">
          {Array.from({ length: 20 }, (_, i) => i + 1).map(n => {
            const rango = RANGOS.find(r => n >= r.min && n <= r.max)
            const esASIBtn = nivelesASI?.includes(n)
            return (
              <button
                key={n}
                className={`level-btn ${n === nivel ? 'level-btn--active' : ''} level-btn--t${RANGOS.indexOf(rango) + 1} ${esASIBtn ? 'level-btn--asi' : ''}`}
                onClick={() => onCambiar(n)}
                title={`Nivel ${n}${esASIBtn ? ' ★ ASI' : ''} — ${n < 20 ? `${PROGRESO_NIVEL[n].xp.toLocaleString('es')} XP` : 'Máximo'}`}
                type="button"
              >{n}</button>
            )
          })}
        </div>

        <div className="level-selector__stats">
          {esASI && (
            <div className="level-stat level-stat--asi">
              <span className="level-stat__val">★</span>
              <span className="level-stat__key">ASI</span>
            </div>
          )}
          <div className="level-stat">
            <span className="level-stat__val">+{bono}</span>
            <span className="level-stat__key">Comp.</span>
          </div>
          <div className="level-stat">
            <span className="level-stat__val">{fila?.xp.toLocaleString('es') ?? '—'}</span>
            <span className="level-stat__key">XP actual</span>
          </div>
          {siguiente && (
            <div className="level-stat">
              <span className="level-stat__val">{siguiente.xp.toLocaleString('es')}</span>
              <span className="level-stat__key">XP sig. niv.</span>
            </div>
          )}
          {!siguiente && (
            <div className="level-stat level-stat--max">
              <span className="level-stat__val">★</span>
              <span className="level-stat__key">Nivel máx.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
