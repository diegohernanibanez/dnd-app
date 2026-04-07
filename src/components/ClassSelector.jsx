import { useState } from 'react';
import { CLASES } from '../data/classes';
import TextoTruncado from './TextoTruncado';
import './ClassSelector.css';

const ICONOS_CLASE = {
  barbaro: '⚔️', bardo: '🎵', brujo: '🔮', clerigo: '✨',
  druida: '🌿', explorador: '🏹', guerrero: '🛡️', hechicero: '🌟',
  mago: '📚', monje: '👊', paladin: '⚜️', picaro: '🗡️',
};

function ClaseCard({ clase, seleccionada, onClick }) {
  return (
    <button
      className={`clase-card ${seleccionada ? 'clase-card--seleccionada' : ''}`}
      onClick={() => onClick(clase.id)}
      aria-pressed={seleccionada}
    >
      <span className="clase-card__icono" aria-hidden="true">{ICONOS_CLASE[clase.id]}</span>
      <div className="clase-card__header">
        <h3 className="clase-card__nombre">{clase.nombre}</h3>
        <span className="clase-card__dado">{clase.dadoGolpe}</span>
      </div>
      <p className="clase-card__descripcion">{clase.descripcion}</p>
      <div className="clase-card__tags">
        {clase.caracteristicaPrincipal.map((c) => (
          <span key={c} className="tag tag--principal">{c}</span>
        ))}
        {clase.magia && <span className="tag tag--magia">Magia</span>}
      </div>
    </button>
  );
}

function RasgoItem({ rasgo }) {
  if (rasgo.esASI) {
    return (
      <li className="rasgo-item rasgo-item--asi">
        <span className="rasgo-badge rasgo-badge--asi">🌟 ASI</span>
        <strong className="rasgo-item__nombre">{rasgo.nombre}.</strong>{' '}
        <TextoTruncado texto={rasgo.desc} className="rasgo-item__desc" />
      </li>
    )
  }
  if (rasgo.esSubclase) {
    return (
      <li className="rasgo-item rasgo-item--subclase">
        <span className="rasgo-badge rasgo-badge--sub">🔱 Subclase</span>
        <strong className="rasgo-item__nombre">{rasgo.nombre}.</strong>{' '}
        <TextoTruncado texto={rasgo.desc} className="rasgo-item__desc" />
      </li>
    )
  }
  if (rasgo.esRasgoSubclase) {
    return (
      <li className="rasgo-item rasgo-item--subclase-rasgo">
        <strong className="rasgo-item__nombre">{rasgo.nombre}.</strong>{' '}
        <TextoTruncado texto={rasgo.desc} className="rasgo-item__desc" />
      </li>
    )
  }
  return (
    <li className="rasgo-item">
      <strong className="rasgo-item__nombre">{rasgo.nombre}.</strong>{' '}
      <TextoTruncado texto={rasgo.desc} className="rasgo-item__desc" />
    </li>
  )
}

function ClaseDetalle({ clase, onCerrar, eleccionNivel1, onEleccionNivel1, nivel, subclaseSeleccionada, onSubclaseSeleccionar }) {
  const [tabActiva, setTabActiva] = useState('rasgos')

  const nivelSubclase = clase.nivelSubclase ?? 3
  const puedeElegirSubclase = nivel >= nivelSubclase
  const scActual = clase.subclases.find(s => s.id === subclaseSeleccionada)

  // Build list of levels up to current nivel
  const nivelesAMostrar = []
  for (let n = 1; n <= Math.min(nivel, 20); n++) {
    const rasgos = clase.rasgosNivel?.[n]
    if (rasgos?.length) nivelesAMostrar.push({ n, rasgos })
  }

  // Expand esRasgoSubclase items with actual subclass rasgos when available
  const expandirRasgos = (n, rasgos) =>
    rasgos.flatMap((r, i) => {
      if (r.esRasgoSubclase && scActual?.rasgosNivel?.[n]?.length) {
        return scActual.rasgosNivel[n].map((sr, j) => ({ ...sr, _key: `sc-${i}-${j}`, esRasgoSubclaseExpanded: true }))
      }
      return [{ ...r, _key: `r-${i}` }]
    })

  const subclaseTabLabel = () => {
    if (subclaseSeleccionada && scActual) return `🔱 ${scActual.nombre}`
    if (puedeElegirSubclase && !subclaseSeleccionada) return '🔱 Subclase ⚠️'
    return '🔱 Subclases'
  }

  return (
    <div className="clase-detalle" role="region" aria-label={`Detalle de ${clase.nombre}`}>
      <div className="clase-detalle__header">
        <span className="clase-detalle__icono" aria-hidden="true">{ICONOS_CLASE[clase.id]}</span>
        <div>
          <h2 className="clase-detalle__nombre">{clase.nombre}</h2>
          <p className="clase-detalle__rol">{clase.rol}</p>
        </div>
        <button className="clase-detalle__cerrar" onClick={onCerrar} aria-label="Cerrar detalle">✕</button>
      </div>

      <p className="clase-detalle__descripcion">{clase.descripcion}</p>

      <div className="clase-detalle__stats">
        <div className="stat">
          <span className="stat__label">Dado de golpe</span>
          <span className="stat__valor stat__valor--grande">{clase.dadoGolpe}</span>
        </div>
        <div className="stat">
          <span className="stat__label">Característica principal</span>
          <span className="stat__valor">{clase.caracteristicaPrincipal.join(' y ')}</span>
        </div>
        <div className="stat">
          <span className="stat__label">Tiradas de salvación</span>
          <span className="stat__valor">{clase.tiradasSalvacion.join(', ')}</span>
        </div>
        <div className="stat">
          <span className="stat__label">Armaduras</span>
          <span className="stat__valor">
            {clase.entrenamientoArmaduras.length > 0 ? clase.entrenamientoArmaduras.join(', ') : 'Ninguna'}
          </span>
        </div>
        <div className="stat">
          <span className="stat__label">Habilidades (elegir {clase.competenciasHabilidades.elegir})</span>
          <span className="stat__valor">
            {clase.competenciasHabilidades.opciones[0] === 'Cualquiera'
              ? 'Cualquiera'
              : clase.competenciasHabilidades.opciones.join(', ')}
          </span>
        </div>
        <div className="stat">
          <span className="stat__label">ASI en niveles</span>
          <span className="stat__valor">{clase.nivelesASI?.join(', ') ?? '4, 8, 12, 16'}</span>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="detalle-tabs">
        <button className={`detalle-tab ${tabActiva === 'rasgos' ? 'detalle-tab--activa' : ''}`}
          onClick={() => setTabActiva('rasgos')}>
          📋 Rasgos (Niv. 1–{Math.min(nivel, 20)})
        </button>
        <button className={`detalle-tab ${tabActiva === 'subclases' ? 'detalle-tab--activa' : ''}`}
          onClick={() => setTabActiva('subclases')}>
          {subclaseTabLabel()}
        </button>
      </div>

      {/* ── Tab: Rasgos por nivel ── */}
      {tabActiva === 'rasgos' && (
        <div className="detalle-tab-contenido">
          {/* Elección de nivel 1 */}
          {clase.eleccionNivel1 && (
            <div className="clase-detalle__eleccion">
              <h4>{clase.eleccionNivel1.nombre}</h4>
              <p className="eleccion-descripcion">{clase.eleccionNivel1.descripcion}</p>
              <div className="eleccion-opciones">
                {clase.eleccionNivel1.opciones.map((op) => (
                  <button
                    key={op.id}
                    className={`eleccion-btn ${eleccionNivel1 === op.id ? 'eleccion-btn--activa' : ''}`}
                    onClick={() => onEleccionNivel1(eleccionNivel1 === op.id ? null : op.id)}
                  >
                    <span className="eleccion-btn__check">{eleccionNivel1 === op.id ? '✔' : '○'}</span>
                    <div className="eleccion-btn__body">
                      <strong className="eleccion-btn__nombre">{op.nombre}</strong>
                      <span className="eleccion-btn__desc">{op.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
              {!eleccionNivel1 && (
                <p className="eleccion-aviso">⚠️ Debes elegir una opción para continuar.</p>
              )}
            </div>
          )}

          {/* Rasgos agrupados por nivel */}
          <div className="rasgos-por-nivel">
            {nivelesAMostrar.map(({ n, rasgos }) => (
              <div key={n} className={`nivel-bloque ${clase.nivelesASI?.includes(n) ? 'nivel-bloque--asi' : ''} ${n === nivelSubclase ? 'nivel-bloque--subclase' : ''}`}>
                <div className="nivel-bloque__header">
                  <span className="nivel-bloque__num">Nivel {n}</span>
                  {clase.nivelesASI?.includes(n) && <span className="nivel-badge nivel-badge--asi">Mejora de característica</span>}
                  {n === nivelSubclase && <span className="nivel-badge nivel-badge--sub">{scActual ? scActual.nombre : 'Elige subclase'}</span>}
                </div>

                <ul className="rasgos-lista">
                  {expandirRasgos(n, rasgos).map((r) => (
                    <RasgoItem key={r._key} rasgo={r} />
                  ))}
                </ul>

                {/* Selector inline en el nivel de subclase */}
                {n === nivelSubclase && (
                  <div className="subclase-inline-picker">
                    {clase.subclases.map((sc) => {
                      const sel = subclaseSeleccionada === sc.id
                      return (
                        <button
                          key={sc.id}
                          className={`subclase-inline-btn ${sel ? 'subclase-inline-btn--activa' : ''}`}
                          onClick={() => onSubclaseSeleccionar(sel ? null : sc.id)}
                        >
                          <span className="subclase-inline-btn__check">{sel ? '✔' : '○'}</span>
                          <div className="subclase-inline-btn__body">
                            <strong>{sc.nombre}</strong>
                            {sc.desc && <span>{sc.desc}</span>}
                          </div>
                        </button>
                      )
                    })}
                    {!subclaseSeleccionada && (
                      <p className="eleccion-aviso" style={{ margin: '8px 12px' }}>⚠️ Debes elegir una subclase.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {nivel < 20 && (
            <p className="nivel-preview-hint">
              💡 Sube el nivel (selector arriba) para ver los rasgos siguientes.
            </p>
          )}
        </div>
      )}

      {/* ── Tab: Subclases ── */}
      {tabActiva === 'subclases' && (
        <div className="detalle-tab-contenido">
          <p className="subclases-intro">
            {puedeElegirSubclase
              ? `Estás en nivel ${nivel}. Elige tu especialización de ${clase.nombre}:`
              : `A nivel ${nivelSubclase} deberás elegir una subclase de ${clase.nombre}.`}
          </p>
          <div className="subclases-grid">
            {clase.subclases.map((sc) => {
              const nombre = typeof sc === 'string' ? sc : sc.nombre
              const id     = typeof sc === 'object' ? sc.id : sc
              const desc   = typeof sc === 'object' ? sc.desc : null
              const sel    = subclaseSeleccionada === id
              return puedeElegirSubclase ? (
                <button
                  key={id}
                  className={`subclase-card subclase-card--btn ${sel ? 'subclase-card--seleccionada' : ''}`}
                  onClick={() => onSubclaseSeleccionar(sel ? null : id)}
                >
                  <div className="subclase-card__top">
                    <strong className="subclase-card__nombre">{nombre}</strong>
                    {sel && <span className="subclase-card__check">✔</span>}
                  </div>
                  {desc && <p className="subclase-card__desc">{desc}</p>}
                  {sc.rasgosNivel && (
                    <ul className="subclase-card__niveles">
                      {Object.keys(sc.rasgosNivel).map(n => (
                        <li key={n}><strong>Niv.{n}:</strong> {sc.rasgosNivel[n].map(r => r.nombre).join(', ')}</li>
                      ))}
                    </ul>
                  )}
                </button>
              ) : (
                <div key={nombre} className="subclase-card">
                  <strong className="subclase-card__nombre">{nombre}</strong>
                  {desc && <p className="subclase-card__desc">{desc}</p>}
                </div>
              )
            })}
          </div>
          {puedeElegirSubclase && !subclaseSeleccionada && (
            <p className="eleccion-aviso" style={{ marginTop: '12px' }}>⚠️ Debes elegir una subclase para continuar.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function ClassSelector({ claseSeleccionada, onSeleccionar, eleccionNivel1, onEleccionNivel1, subclaseSeleccionada, onSubclaseSeleccionar, nivel = 1 }) {
  const [detalleAbierto, setDetalleAbierto] = useState(null);

  const handleCardClick = (id) => {
    if (detalleAbierto === id) {
      setDetalleAbierto(null);
    } else {
      setDetalleAbierto(id);
      onSeleccionar(id);
    }
  };

  const claseDetalle = CLASES.find((c) => c.id === detalleAbierto);

  return (
    <section className="class-selector">
      <div className="class-selector__intro">
        <h2>Paso 1: Elige tu clase</h2>
        <p>
          Cada aventurero pertenece a una clase, que describe su vocación, talentos especiales
          y tácticas preferidas. Selecciona la clase para ver sus detalles y rasgos por nivel.
        </p>
      </div>

      {claseDetalle && (
        <ClaseDetalle
          clase={claseDetalle}
          onCerrar={() => setDetalleAbierto(null)}
          eleccionNivel1={eleccionNivel1}
          onEleccionNivel1={onEleccionNivel1}
          subclaseSeleccionada={subclaseSeleccionada}
          onSubclaseSeleccionar={onSubclaseSeleccionar}
          nivel={nivel}
        />
      )}

      <div className="clase-grid">
        {CLASES.map((clase) => (
          <ClaseCard
            key={clase.id}
            clase={clase}
            seleccionada={claseSeleccionada === clase.id}
            onClick={handleCardClick}
          />
        ))}
      </div>

      {claseSeleccionada && (
        <div className="class-selector__confirmacion">
          <span>✅ Clase seleccionada: <strong>{CLASES.find(c => c.id === claseSeleccionada)?.nombre}</strong></span>
          {(() => {
            const c = CLASES.find(cl => cl.id === claseSeleccionada)
            if (!c?.eleccionNivel1) return null
            const opNombre = c.eleccionNivel1.opciones.find(o => o.id === eleccionNivel1)?.nombre
            return opNombre
              ? <span style={{ marginLeft: '1rem' }}>· {c.eleccionNivel1.nombre}: <strong>{opNombre}</strong></span>
              : <span style={{ marginLeft: '1rem', color: 'var(--color-warning, #cb9b32)' }}>⚠️ Falta elegir {c.eleccionNivel1.nombre}</span>
          })()}
          {nivel >= (CLASES.find(c => c.id === claseSeleccionada)?.nivelSubclase ?? 3) && (
            subclaseSeleccionada
              ? <span style={{ marginLeft: '1rem' }}>· Subclase: <strong>{CLASES.find(c => c.id === claseSeleccionada)?.subclases?.find(s => s.id === subclaseSeleccionada)?.nombre}</strong></span>
              : <span style={{ marginLeft: '1rem', color: 'var(--color-warning, #cb9b32)' }}>⚠️ Falta elegir subclase</span>
          )}
        </div>
      )}
    </section>
  );
}
