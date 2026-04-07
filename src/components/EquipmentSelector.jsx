import { useState, useMemo } from 'react'
import { EQUIPO_POR_CLASE, EQUIPO_POR_TRASFONDO } from '../data/equipment'
import { getClaseById } from '../data/classes'
import { TRASFONDOS } from '../data/origins'
import { BAGATELAS, tirarBagatela } from '../data/bagatelas'
import './EquipmentSelector.css'

export default function EquipmentSelector({ claseId, trasfondoId, equipo, onCambiar }) {
  const clase     = getClaseById(claseId)
  const trasfondo = TRASFONDOS.find(t => t.id === trasfondoId)

  const equipoClase      = claseId     ? EQUIPO_POR_CLASE[claseId]      : null
  const equipoTrasfondo  = trasfondoId ? EQUIPO_POR_TRASFONDO[trasfondoId] : null

  const setOpcionClase     = (op) => onCambiar({ ...equipo, opcionClase: op })
  const setOpcionTrasfondo = (op) => onCambiar({ ...equipo, opcionTrasfondo: op })

  const setBagatela = (idx) => onCambiar({ ...equipo, bagatela: idx })
  const lanzarBagatela = () => setBagatela(tirarBagatela())
  const limpiarBagatela = () => onCambiar({ ...equipo, bagatela: null })

  const [bagatelaMode, setBagatelaMode] = useState('tirar') // 'tirar' | 'elegir'

  // Objetos adicionales (campo libre)
  const [nuevoItem, setNuevoItem] = useState('')
  const addItem = () => {
    const item = nuevoItem.trim()
    if (!item) return
    onCambiar({ ...equipo, extras: [...(equipo.extras ?? []), item] })
    setNuevoItem('')
  }
  const removeExtra = (i) => {
    onCambiar({ ...equipo, extras: (equipo.extras ?? []).filter((_, idx) => idx !== i) })
  }

  // Lista consolidada de todo el equipo
  const listaCompleta = useMemo(() => {
    const items = []
    if (equipo.opcionClase === 'A' && equipoClase?.opcionA) {
      items.push(...equipoClase.opcionA.map(i => ({ texto: i, fuente: clase?.nombre ?? 'Clase' })))
    }
    if (equipo.opcionClase === 'B') {
      items.push({ texto: `${equipoClase?.opcionB ?? 0} po para comprar equipo (clase)`, fuente: clase?.nombre ?? 'Clase' })
    }
    if (equipo.opcionTrasfondo === 'A' && equipoTrasfondo?.opcionA) {
      items.push(...equipoTrasfondo.opcionA.map(i => ({ texto: i, fuente: trasfondo?.nombre ?? 'Trasfondo' })))
    }
    if (equipo.opcionTrasfondo === 'B') {
      items.push({ texto: `${equipoTrasfondo?.opcionB ?? 50} po para comprar equipo (trasfondo)`, fuente: trasfondo?.nombre ?? 'Trasfondo' })
    }
    if (equipo.extras?.length) {
      items.push(...equipo.extras.map(i => ({ texto: i, fuente: 'Añadido' })))
    }
    if (equipo.bagatela != null) {
      items.push({ texto: BAGATELAS[equipo.bagatela], fuente: 'Bagatela' })
    }
    return items
  }, [equipo, equipoClase, equipoTrasfondo, clase, trasfondo])

  return (
    <div className="equip-selector">
      <div className="equip-selector__intro">
        <h2>Elige tu equipo inicial</h2>
        <p>Tu clase y tu trasfondo te proporcionan el equipo con el que comienzas la aventura. En ambos casos podés elegir el equipo específico o una cantidad de oro para comprar libremente.</p>
      </div>

      {/* ── Equipo del trasfondo ── */}
      {equipoTrasfondo ? (
        <section className="equip-section">
          <div className="equip-section__title">
            <span className="equip-badge equip-badge--trasfondo">Trasfondo</span>
            {trasfondo?.nombre ?? 'Trasfondo'} — elige una opción
          </div>
          <div className="equip-opciones">
            <OpcionCard
              activa={equipo.opcionTrasfondo === 'A'}
              onClick={() => setOpcionTrasfondo('A')}
              titulo="Opción A — Equipo específico"
              icono="📦"
            >
              <ul className="equip-list equip-list--opcion">
                {equipoTrasfondo.opcionA.map((item, i) => (
                  <li key={i} className="equip-item">
                    <span className="equip-item__icon">📦</span>{item}
                  </li>
                ))}
              </ul>
            </OpcionCard>
            <OpcionCard
              activa={equipo.opcionTrasfondo === 'B'}
              onClick={() => setOpcionTrasfondo('B')}
              titulo="Opción B — Oro para equiparte"
              icono="💰"
            >
              <div className="equip-oro">
                <span className="equip-oro__num">{equipoTrasfondo.opcionB}</span>
                <span className="equip-oro__label">piezas de oro</span>
              </div>
              <p className="equip-oro__nota">
                Usa este oro para comprar cualquier equipo de la lista del Capítulo 6.
              </p>
            </OpcionCard>
          </div>
        </section>
      ) : (
        <section className="equip-section">
          <div className="equip-section__title equip-section__title--empty">Equipo de trasfondo</div>
          <p className="equip-section__empty">Selecciona un trasfondo en el Paso 2 para ver su equipo.</p>
        </section>
      )}

      {/* ── Equipo de clase ── */}
      {equipoClase ? (
        <section className="equip-section">
          <div className="equip-section__title">
            <span className="equip-badge equip-badge--clase">Clase</span>
            {clase?.nombre ?? 'Clase'} — elige una opción
          </div>
          <div className="equip-opciones">
            <OpcionCard
              activa={equipo.opcionClase === 'A'}
              onClick={() => setOpcionClase('A')}
              titulo="Opción A — Equipo completo"
              icono="⚔️"
            >
              <ul className="equip-list equip-list--opcion">
                {equipoClase.opcionA.map((item, i) => (
                  <li key={i} className="equip-item">
                    <span className="equip-item__icon">⚔️</span>{item}
                  </li>
                ))}
              </ul>
            </OpcionCard>
            <OpcionCard
              activa={equipo.opcionClase === 'B'}
              onClick={() => setOpcionClase('B')}
              titulo="Opción B — Oro para equiparte"
              icono="💰"
            >
              <div className="equip-oro">
                <span className="equip-oro__num">{equipoClase.opcionB}</span>
                <span className="equip-oro__label">piezas de oro</span>
              </div>
              <p className="equip-oro__nota">
                Visita el Capítulo 6 del Manual para ver la lista completa de armas, armaduras y equipo aventurero con su precio.
              </p>
            </OpcionCard>
          </div>
        </section>
      ) : (
        <section className="equip-section">
          <div className="equip-section__title equip-section__title--empty">Equipo de clase</div>
          <p className="equip-section__empty">Selecciona una clase en el Paso 1 para ver su equipo.</p>
        </section>
      )}

      {/* ── Bagatela ── */}
      <section className="equip-section">
        <div className="equip-section__title">
          <span className="equip-badge equip-badge--bagatela">✨ Bagatela</span>
          Objeto misterioso gratuito (opcional)
        </div>
        <p className="equip-section__note">
          Al crear tu personaje, podés tirar 1d100 para obtener una bagatela: un objeto diminuto envuelto en cierto halo de misterio.
        </p>

        {/* Mode toggle */}
        <div className="bagatela-mode-toggle">
          <button
            className={`bagatela-mode-btn ${bagatelaMode === 'tirar' ? 'bagatela-mode-btn--active' : ''}`}
            onClick={() => setBagatelaMode('tirar')}
          >🎲 Tirar dados</button>
          <button
            className={`bagatela-mode-btn ${bagatelaMode === 'elegir' ? 'bagatela-mode-btn--active' : ''}`}
            onClick={() => setBagatelaMode('elegir')}
          >📋 Elegir de la lista</button>
        </div>

        {bagatelaMode === 'tirar' ? (
          equipo.bagatela == null ? (
            <div className="bagatela-empty">
              <button className="bagatela-roll-btn" onClick={lanzarBagatela}>
                🎲 Tirar 1d100
              </button>
            </div>
          ) : (
            <div className="bagatela-resultado">
              <div className="bagatela-card">
                <span className="bagatela-num">d100 → {equipo.bagatela + 1 < 10 ? '0' : ''}{equipo.bagatela + 1}</span>
                <span className="bagatela-texto">{BAGATELAS[equipo.bagatela]}</span>
              </div>
              <div className="bagatela-actions">
                <button className="bagatela-reroll-btn" onClick={lanzarBagatela}>🎲 Volver a tirar</button>
                <button className="bagatela-clear-btn" onClick={limpiarBagatela}>✕ Descartar</button>
              </div>
            </div>
          )
        ) : (
          <div className="bagatela-picker">
            <select
              className="bagatela-select"
              value={equipo.bagatela ?? ''}
              onChange={e => {
                const val = e.target.value
                setBagatela(val === '' ? null : parseInt(val, 10))
              }}
            >
              <option value="">— Elige una bagatela —</option>
              {BAGATELAS.map((texto, i) => (
                <option key={i} value={i}>
                  {String(i + 1).padStart(2, '0')} — {texto}
                </option>
              ))}
            </select>
            {equipo.bagatela != null && (
              <button className="bagatela-clear-btn" onClick={limpiarBagatela}>✕ Descartar</button>
            )}
          </div>
        )}
      </section>

      {/* ── Objetos adicionales ── */}
      <section className="equip-section">
        <div className="equip-section__title">
          <span className="equip-badge equip-badge--extra">Extra</span>
          Objetos adicionales
        </div>
        <p className="equip-section__note">
          Añade cualquier objeto adicional acordado con tu Dungeon Master.
        </p>
        <div className="equip-add-row">
          <input
            className="equip-add-input"
            type="text"
            placeholder="Ej. Amuleto familiar, Mapa antiguo…"
            value={nuevoItem}
            onChange={e => setNuevoItem(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addItem()}
            maxLength={80}
          />
          <button className="equip-add-btn" onClick={addItem}>Añadir</button>
        </div>
        {(equipo.extras ?? []).length > 0 && (
          <ul className="equip-list equip-list--extras">
            {(equipo.extras ?? []).map((item, i) => (
              <li key={i} className="equip-item equip-item--extra">
                <span className="equip-item__icon">✨</span>
                <span className="equip-item__texto">{item}</span>
                <button className="equip-item__del" onClick={() => removeExtra(i)} aria-label="Eliminar">✕</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── Lista consolidada ── */}
      {listaCompleta.length > 0 && (
        <section className="equip-section equip-resumen">
          <div className="equip-section__title">Resumen del equipo inicial</div>
          <div className="equip-resumen__grid">
            {listaCompleta.map((item, i) => (
              <div key={i} className="equip-resumen__item">
                <span className={`equip-resumen__fuente equip-resumen__fuente--${item.fuente === clase?.nombre ? 'clase' : item.fuente === trasfondo?.nombre ? 'trasfondo' : item.fuente === 'Bagatela' ? 'bagatela' : 'extra'}`}>
                  {item.fuente}
                </span>
                <span className="equip-resumen__texto">{item.texto}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function OpcionCard({ activa, onClick, titulo, icono, children }) {
  return (
    <div
      className={`equip-opcion ${activa ? 'equip-opcion--active' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      <div className="equip-opcion__header">
        <span className={`equip-radio ${activa ? 'equip-radio--sel' : ''}`} />
        <strong>{titulo}</strong>
      </div>
      {children}
    </div>
  )
}

