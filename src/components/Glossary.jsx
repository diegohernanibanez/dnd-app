import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { CONJUROS } from '../data/spells'
import { CLASES } from '../data/classes'
import { ARMAS, PROPIEDADES_ARMA_DESC, MAESTRIAS_ARMA_DESC } from '../data/weapons'
import { DOTES_ORIGEN, DOTES_GENERALES, DOTES_ESTILO_COMBATE, DOTES_DON_EPICO, CATEGORIAS_DOTE } from '../data/dotes'
import { TRASFONDOS, ESPECIES } from '../data/origins'
import { PACKS } from '../data/equipment'
import { ALINEAMIENTOS } from '../data/description'
import { BAGATELAS } from '../data/bagatelas'
import TextoTruncado from './TextoTruncado'
import './Glossary.css'

const CATEGORIAS = [
  { id: 'conjuros', label: 'Conjuros', icon: '✨' },
  { id: 'clases', label: 'Clases', icon: '⚔️' },
  { id: 'armas', label: 'Armas', icon: '🗡️' },
  { id: 'dotes', label: 'Dotes', icon: '🎯' },
  { id: 'trasfondos', label: 'Trasfondos', icon: '📜' },
  { id: 'especies', label: 'Especies', icon: '🧝' },
  { id: 'equipo', label: 'Equipo', icon: '🎒' },
  { id: 'alineamientos', label: 'Alinea.', icon: '⚖️' },
  { id: 'bagatelas', label: 'Bagatelas', icon: '🎲' },
]

const ESCUELAS = ['Abjuración', 'Adivinación', 'Conjuración', 'Encantamiento', 'Evocación', 'Ilusionismo', 'Nigromancia', 'Transmutación']
const NIVELES_CONJURO = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const CLASES_CONJURO = ['bardo', 'brujo', 'clérigo', 'druida', 'explorador', 'guerrero', 'hechicero', 'mago', 'monje', 'paladín', 'pícaro']

const normalizarTexto = (texto = '') => texto
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()

// ── Section: Conjuros ──
function SeccionConjuros({ busqueda }) {
  const [expanded, setExpanded] = useState(null)
  const [filtroNivel, setFiltroNivel] = useState('')
  const [filtroEscuela, setFiltroEscuela] = useState('')
  const [filtroClase, setFiltroClase] = useState('')

  const conjurosArr = useMemo(() =>
    Object.entries(CONJUROS).map(([nombre, data]) => ({ nombre, ...data })),
    []
  )

  const filtrados = useMemo(() => {
    let arr = conjurosArr
    if (busqueda) {
      const q = busqueda.toLowerCase()
      arr = arr.filter(c => c.nombre.toLowerCase().includes(q))
    }
    if (filtroNivel !== '') arr = arr.filter(c => c.nivel === Number(filtroNivel))
    if (filtroEscuela) arr = arr.filter(c => c.escuela === filtroEscuela)
    if (filtroClase) {
      const claseFiltrada = normalizarTexto(filtroClase)
      arr = arr.filter(c => c.clases.some(clase => normalizarTexto(clase) === claseFiltrada))
    }
    return arr
  }, [conjurosArr, busqueda, filtroNivel, filtroEscuela, filtroClase])

  return (
    <>
      <div className="glossary-filters">
        <label className="glossary-filter">
          <select value={filtroNivel} onChange={e => setFiltroNivel(e.target.value)}>
            <option value="">Nivel</option>
            {NIVELES_CONJURO.map(n => <option key={n} value={n}>{n === 0 ? 'Truco' : `Nv ${n}`}</option>)}
          </select>
        </label>
        <label className="glossary-filter">
          <select value={filtroEscuela} onChange={e => setFiltroEscuela(e.target.value)}>
            <option value="">Escuela</option>
            {ESCUELAS.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </label>
        <label className="glossary-filter">
          <select value={filtroClase} onChange={e => setFiltroClase(e.target.value)}>
            <option value="">Clase</option>
            {CLASES_CONJURO.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </label>
      </div>
      <div className="glossary-count">{filtrados.length} conjuros</div>
      <ul className="glossary-list">
        {filtrados.map(c => (
          <li key={c.nombre} className={`glossary-item ${expanded === c.nombre ? 'expanded' : ''}`}>
            <button className="glossary-item-header" onClick={() => setExpanded(expanded === c.nombre ? null : c.nombre)}>
              <span className="glossary-item-name">{c.nombre}</span>
              <span className="glossary-item-badge">{c.nivel === 0 ? 'Truco' : `Nv ${c.nivel}`}</span>
              <span className="glossary-item-badge">{c.escuela}</span>
              <span className="glossary-item-arrow">▶</span>
            </button>
            {expanded === c.nombre && (
              <div className="glossary-detail">
                <div className="glossary-detail-row"><span className="glossary-detail-label">Clases</span><span className="glossary-detail-value">{c.clases.join(', ')}</span></div>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Lanzamiento</span><span className="glossary-detail-value">{c.tiempoLanzamiento}</span></div>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Alcance</span><span className="glossary-detail-value">{c.alcance}</span></div>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Componentes</span><span className="glossary-detail-value">{c.componentes}</span></div>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Duración</span><span className="glossary-detail-value">{c.duracion}</span></div>
                <div className="glossary-detail-desc">{c.descripcion}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

// ── Section: Clases ──
function SeccionClases({ busqueda }) {
  const [expanded, setExpanded] = useState(null)
  const [subExpanded, setSubExpanded] = useState(null)

  const filtradas = useMemo(() => {
    if (!busqueda) return CLASES
    const q = busqueda.toLowerCase()
    return CLASES.filter(c =>
      c.nombre.toLowerCase().includes(q) ||
      c.subclases?.some(s => s.nombre.toLowerCase().includes(q))
    )
  }, [busqueda])

  return (
    <>
      <div className="glossary-count">{filtradas.length} clases</div>
      <ul className="glossary-list">
        {filtradas.map(c => (
          <li key={c.id} className={`glossary-item ${expanded === c.id ? 'expanded' : ''}`}>
            <button className="glossary-item-header" onClick={() => { setExpanded(expanded === c.id ? null : c.id); setSubExpanded(null) }}>
              <span className="glossary-item-name">{c.nombre}</span>
              <span className="glossary-item-badge">{c.dadoGolpe}</span>
              <span className="glossary-item-arrow">▶</span>
            </button>
            {expanded === c.id && (
              <div className="glossary-detail">
                <p style={{ marginBottom: 8 }}>{c.descripcion}</p>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Dado de golpe</span><span className="glossary-detail-value">{c.dadoGolpe}</span></div>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Caract. principal</span><span className="glossary-detail-value">{c.caracteristicaPrincipal?.join(', ')}</span></div>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Salvaciones</span><span className="glossary-detail-value">{c.tiradasSalvacion?.join(', ')}</span></div>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Armaduras</span><span className="glossary-detail-value">{c.entrenamientoArmaduras?.join(', ')}</span></div>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Habilidades</span><span className="glossary-detail-value">Elige {c.competenciasHabilidades?.elegir} de: {c.competenciasHabilidades?.opciones?.join(', ')}</span></div>

                {c.rasgosNivel && (
                  <div className="glossary-detail-section">
                    <h4>Rasgos por nivel</h4>
                    <div className="glossary-traits">
                      {Object.entries(c.rasgosNivel).map(([nv, rasgos]) => (
                        <div key={nv} className="glossary-level-group">
                          <div className="glossary-level-label">Nivel {nv}</div>
                          {rasgos.map((r, i) => (
                            <div key={i} className="glossary-trait">
                              <div className="glossary-trait-name">{r.nombre}</div>
                              <TextoTruncado texto={r.desc} className="glossary-trait-desc" />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {c.subclases?.length > 0 && (
                  <div className="glossary-detail-section">
                    <h4>Subclases</h4>
                    {c.subclases.map(s => (
                      <div key={s.id} className="glossary-item" style={{ border: 'none', borderTop: `1px solid var(--border)` }}>
                        <button className="glossary-item-header" onClick={() => setSubExpanded(subExpanded === s.id ? null : s.id)} style={{ paddingLeft: 0 }}>
                          <span className="glossary-item-name">{s.nombre}</span>
                          <span className="glossary-item-arrow" style={{ transform: subExpanded === s.id ? 'rotate(90deg)' : '' }}>▶</span>
                        </button>
                        {subExpanded === s.id && (
                          <div>
                            <p style={{ fontSize: 13, marginBottom: 8 }}>{s.desc}</p>
                            {s.rasgosNivel && Object.entries(s.rasgosNivel).map(([nv, rasgos]) => (
                              <div key={nv} className="glossary-level-group">
                                <div className="glossary-level-label">Nivel {nv}</div>
                                {rasgos.map((r, i) => (
                                  <div key={i} className="glossary-trait">
                                    <div className="glossary-trait-name">{r.nombre}</div>
                                    <TextoTruncado texto={r.desc} className="glossary-trait-desc" />
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

// ── Section: Armas ──
function SeccionArmas({ busqueda }) {
  const armasArr = useMemo(() =>
    Object.entries(ARMAS).map(([nombre, data]) => ({ nombre, ...data })),
    []
  )

  const filtradas = useMemo(() => {
    if (!busqueda) return armasArr
    const q = busqueda.toLowerCase()
    return armasArr.filter(a => a.nombre.toLowerCase().includes(q))
  }, [armasArr, busqueda])

  const propiedadesArma = useMemo(() => Object.entries(PROPIEDADES_ARMA_DESC), [])
  const maestriasArma = useMemo(() => Object.entries(MAESTRIAS_ARMA_DESC), [])

  return (
    <>
      <div className="glossary-count">{filtradas.length} armas</div>
      <table className="glossary-table">
        <thead>
          <tr>
            <th>Arma</th>
            <th>Tipo</th>
            <th>Caract.</th>
            <th>Daño</th>
          </tr>
        </thead>
        <tbody>
          {filtradas.map(a => (
            <tr key={a.nombre}>
              <td style={{ fontWeight: 500, color: 'var(--text-h)' }}>{a.nombre}</td>
              <td>{a.tipo === 'cac' ? 'Cuerpo a cuerpo' : 'A distancia'}</td>
              <td>{a.caracteristica}</td>
              <td>{a.daño}{a.daño2 ? ` / ${a.daño2}` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="glossary-detail-section glossary-weapons-terms">
        <h4>Propiedades de arma</h4>
        <ul className="glossary-terms-list">
          {propiedadesArma.map(([id, desc]) => (
            <li key={id} className="glossary-terms-item">
              <span className="glossary-terms-name">{id}</span>
              <span className="glossary-terms-desc">{desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="glossary-detail-section glossary-weapons-terms">
        <h4>Propiedades de maestría</h4>
        <ul className="glossary-terms-list">
          {maestriasArma.map(([id, desc]) => (
            <li key={id} className="glossary-terms-item">
              <span className="glossary-terms-name">{id}</span>
              <span className="glossary-terms-desc">{desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

// ── Section: Dotes ──
function SeccionDotes({ busqueda }) {
  const [expanded, setExpanded] = useState(null)
  const [filtroCat, setFiltroCat] = useState('')

  const grupos = useMemo(() => [
    { id: 'origen', label: CATEGORIAS_DOTE.ORIGEN, dotes: DOTES_ORIGEN },
    { id: 'general', label: CATEGORIAS_DOTE.GENERAL, dotes: DOTES_GENERALES },
    { id: 'combate', label: CATEGORIAS_DOTE.ESTILO_COMBATE, dotes: DOTES_ESTILO_COMBATE },
    { id: 'epico', label: CATEGORIAS_DOTE.DON_EPICO, dotes: DOTES_DON_EPICO },
  ], [])

  const filtradas = useMemo(() => {
    let result = filtroCat ? grupos.filter(g => g.id === filtroCat) : grupos
    if (busqueda) {
      const q = busqueda.toLowerCase()
      result = result.map(g => ({
        ...g,
        dotes: g.dotes.filter(d => d.nombre.toLowerCase().includes(q) || d.descripcion?.toLowerCase().includes(q))
      })).filter(g => g.dotes.length > 0)
    }
    return result
  }, [grupos, busqueda, filtroCat])

  const total = filtradas.reduce((s, g) => s + g.dotes.length, 0)

  return (
    <>
      <div className="glossary-filters">
        <label className="glossary-filter">
          <select value={filtroCat} onChange={e => setFiltroCat(e.target.value)}>
            <option value="">Todas las categorías</option>
            {grupos.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
        </label>
      </div>
      <div className="glossary-count">{total} dotes</div>
      {filtradas.map(g => (
        <div key={g.id}>
          <div className="glossary-pack-name">{g.label} ({g.dotes.length})</div>
          <ul className="glossary-list">
            {g.dotes.map(d => (
              <li key={d.id} className={`glossary-item ${expanded === d.id ? 'expanded' : ''}`}>
                <button className="glossary-item-header" onClick={() => setExpanded(expanded === d.id ? null : d.id)}>
                  <span className="glossary-item-name">{d.nombre}</span>
                  <span className="glossary-item-arrow">▶</span>
                </button>
                {expanded === d.id && (
                  <div className="glossary-detail">
                    {d.requisitos?.length > 0 && (
                      <div className="glossary-detail-row">
                        <span className="glossary-detail-label">Requisitos</span>
                        <span className="glossary-detail-value">{d.requisitos.map(r => r.valor || r.desc || `${r.tipo}: ${r.stat || r.rasgo || r.nivel || ''}`).join(', ')}</span>
                      </div>
                    )}
                    <div className="glossary-detail-desc">{d.descripcion}</div>
                    {d.efectos?.length > 0 && (
                      <div className="glossary-detail-section">
                        <h4>Efectos</h4>
                        {d.efectos.map((e, i) => (
                          <div key={i} className="glossary-trait">
                            <TextoTruncado texto={e.desc || `${e.tipo}: ${e.stat || ''} ${e.valor || ''}`} className="glossary-trait-desc" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

// ── Section: Trasfondos ──
function SeccionTrasfondos({ busqueda }) {
  const [expanded, setExpanded] = useState(null)

  const filtrados = useMemo(() => {
    if (!busqueda) return TRASFONDOS
    const q = busqueda.toLowerCase()
    return TRASFONDOS.filter(t => t.nombre.toLowerCase().includes(q))
  }, [busqueda])

  return (
    <>
      <div className="glossary-count">{filtrados.length} trasfondos</div>
      <ul className="glossary-list">
        {filtrados.map(t => (
          <li key={t.id} className={`glossary-item ${expanded === t.id ? 'expanded' : ''}`}>
            <button className="glossary-item-header" onClick={() => setExpanded(expanded === t.id ? null : t.id)}>
              <span className="glossary-item-name">{t.nombre}</span>
              <span className="glossary-item-arrow">▶</span>
            </button>
            {expanded === t.id && (
              <div className="glossary-detail">
                <p style={{ marginBottom: 8 }}>{t.descripcion}</p>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Características</span><span className="glossary-detail-value">{t.puntuacionesCaracteristica?.join(', ')}</span></div>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Dote</span><span className="glossary-detail-value">{t.dote}</span></div>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Habilidades</span><span className="glossary-detail-value">{t.competenciasHabilidades?.join(', ')}</span></div>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Herramienta</span><span className="glossary-detail-value">{t.competenciaHerramienta}</span></div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

// ── Section: Especies ──
function SeccionEspecies({ busqueda }) {
  const [expanded, setExpanded] = useState(null)

  const filtradas = useMemo(() => {
    if (!busqueda) return ESPECIES
    const q = busqueda.toLowerCase()
    return ESPECIES.filter(e => e.nombre.toLowerCase().includes(q))
  }, [busqueda])

  return (
    <>
      <div className="glossary-count">{filtradas.length} especies</div>
      <ul className="glossary-list">
        {filtradas.map(e => (
          <li key={e.id} className={`glossary-item ${expanded === e.id ? 'expanded' : ''}`}>
            <button className="glossary-item-header" onClick={() => setExpanded(expanded === e.id ? null : e.id)}>
              <span className="glossary-item-name">{e.nombre}</span>
              <span className="glossary-item-badge">{e.tamano}</span>
              <span className="glossary-item-arrow">▶</span>
            </button>
            {expanded === e.id && (
              <div className="glossary-detail">
                <p style={{ marginBottom: 8 }}>{e.descripcion}</p>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Tamaño</span><span className="glossary-detail-value">{e.tamano}</span></div>
                <div className="glossary-detail-row"><span className="glossary-detail-label">Velocidad</span><span className="glossary-detail-value">{e.velocidad}</span></div>
                {e.vidaMax && <div className="glossary-detail-row"><span className="glossary-detail-label">Esperanza de vida</span><span className="glossary-detail-value">{e.vidaMax} años</span></div>}
                {e.rasgosDestacados?.length > 0 && (
                  <div className="glossary-detail-section">
                    <h4>Rasgos</h4>
                    {e.rasgosDestacados.map((r, i) => (
                      <div key={i} className="glossary-trait"><TextoTruncado texto={r} className="glossary-trait-desc" /></div>
                    ))}
                  </div>
                )}
                {e.linajes?.length > 0 && (
                  <div className="glossary-detail-section">
                    <h4>Linajes</h4>
                    {e.linajes.map(l => (
                      <div key={l.id} className="glossary-trait">
                        <div className="glossary-trait-name">{l.nombre}</div>
                        <TextoTruncado texto={`${l.desc}${l.tipoDano ? ` (${l.tipoDano})` : ''}`} className="glossary-trait-desc" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

// ── Section: Equipamiento ──
function SeccionEquipo({ busqueda }) {
  const packsArr = useMemo(() =>
    Object.entries(PACKS).map(([id, data]) => ({ id, ...data })),
    []
  )

  const filtrados = useMemo(() => {
    if (!busqueda) return packsArr
    const q = busqueda.toLowerCase()
    return packsArr.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.contenido.some(c => c.toLowerCase().includes(q))
    )
  }, [packsArr, busqueda])

  return (
    <>
      <div className="glossary-count">{filtrados.length} packs de equipo</div>
      {filtrados.map(p => (
        <div key={p.id} className="glossary-pack">
          <div className="glossary-pack-name">{p.nombre}</div>
          <ul className="glossary-pack-items">
            {p.contenido.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      ))}
    </>
  )
}

// ── Section: Alineamientos ──
function SeccionAlineamientos() {
  const [selected, setSelected] = useState(null)
  const grid = useMemo(() => {
    const g = Array.from({ length: 3 }, () => Array(3).fill(null))
    ALINEAMIENTOS.forEach(a => { g[a.fila][a.col] = a })
    return g
  }, [])

  return (
    <div style={{ padding: '0 0 16px' }}>
      <div className="glossary-align-grid">
        {grid.flat().map(a => a && (
          <div key={a.id} className={`glossary-align-cell ${selected === a.id ? 'expanded' : ''}`} onClick={() => setSelected(selected === a.id ? null : a.id)}>
            <div className="glossary-align-abbr">{a.abrev}</div>
            <div className="glossary-align-name">{a.nombre}</div>
          </div>
        ))}
      </div>
      {selected && (() => {
        const a = ALINEAMIENTOS.find(x => x.id === selected)
        return a ? <div className="glossary-detail" style={{ margin: '0 8px' }}><div className="glossary-detail-desc">{a.descripcion}</div></div> : null
      })()}
    </div>
  )
}

// ── Section: Bagatelas ──
function SeccionBagatelas({ busqueda }) {
  const filtradas = useMemo(() => {
    if (!busqueda) return BAGATELAS
    const q = busqueda.toLowerCase()
    return BAGATELAS.filter(b => b.toLowerCase().includes(q))
  }, [busqueda])

  return (
    <>
      <div className="glossary-count">{filtradas.length} bagatelas</div>
      <ul className="glossary-trinket-list">
        {filtradas.map((b, i) => {
          const realIndex = busqueda ? BAGATELAS.indexOf(b) : i
          return (
            <li key={realIndex} className="glossary-trinket">
              <span className="glossary-trinket-num">{realIndex + 1}</span>
              <span>{b}</span>
            </li>
          )
        })}
      </ul>
    </>
  )
}

// ── Main Glossary Component ──
export default function Glossary({ abierto, onCerrar }) {
  const [categoria, setCategoria] = useState('conjuros')
  const [busqueda, setBusqueda] = useState('')
  const searchRef = useRef(null)
  const contentRef = useRef(null)

  // Focus search on open
  useEffect(() => {
    if (abierto && searchRef.current) {
      setTimeout(() => searchRef.current.focus(), 350)
    }
  }, [abierto])

  // Reset search on category change
  useEffect(() => {
    setBusqueda('')
    if (contentRef.current) contentRef.current.scrollTop = 0
  }, [categoria])

  // Close on Escape
  useEffect(() => {
    if (!abierto) return
    const handler = (e) => { if (e.key === 'Escape') onCerrar() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [abierto, onCerrar])

  const renderSeccion = useCallback(() => {
    switch (categoria) {
      case 'conjuros': return <SeccionConjuros busqueda={busqueda} />
      case 'clases': return <SeccionClases busqueda={busqueda} />
      case 'armas': return <SeccionArmas busqueda={busqueda} />
      case 'dotes': return <SeccionDotes busqueda={busqueda} />
      case 'trasfondos': return <SeccionTrasfondos busqueda={busqueda} />
      case 'especies': return <SeccionEspecies busqueda={busqueda} />
      case 'equipo': return <SeccionEquipo busqueda={busqueda} />
      case 'alineamientos': return <SeccionAlineamientos />
      case 'bagatelas': return <SeccionBagatelas busqueda={busqueda} />
      default: return null
    }
  }, [categoria, busqueda])

  return (
    <>
      <div className={`glossary-backdrop ${abierto ? 'open' : ''}`} onClick={onCerrar} />
      <div className={`glossary-panel ${abierto ? 'open' : ''}`}>
        <div className="glossary-header">
          <h2>Glosario</h2>
          <button className="glossary-close" onClick={onCerrar} title="Cerrar">✕</button>
        </div>

        <nav className="glossary-tabs">
          {CATEGORIAS.map(c => (
            <button
              key={c.id}
              className={`glossary-tab ${categoria === c.id ? 'active' : ''}`}
              onClick={() => setCategoria(c.id)}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </nav>

        {categoria !== 'alineamientos' && (
          <div className="glossary-search">
            <input
              ref={searchRef}
              type="text"
              placeholder={`Buscar en ${CATEGORIAS.find(c => c.id === categoria)?.label ?? ''}...`}
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
        )}

        <div className="glossary-content" ref={contentRef}>
          {renderSeccion()}
        </div>
      </div>
    </>
  )
}
