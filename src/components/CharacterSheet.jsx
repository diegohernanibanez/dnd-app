import { useState, useEffect, useRef } from 'react'
import {
  HABILIDADES,
  HABILIDADES_LISTA,
  CARACTERISTICAS_ORDER,
  CARACTERISTICAS_ABBREV,
} from '../data/character'
import { CAMPOS_APARIENCIA, ALINEAMIENTOS } from '../data/description'
import { formatModificador } from '../data/abilityScores'
import { CLASES } from '../data/classes'
import { TRASFONDOS, ESPECIES } from '../data/origins'
import { getDoteById, DOTES_GENERALES, DOTES_DON_EPICO, TODAS_LAS_DOTES, cumpleRequisitos } from '../data/dotes'
import { CONJUROS, getTrucoDanioEtiqueta, getTrucoNivel0Info } from '../data/spells'
import './CharacterSheet.css'
import { PG_FIJO_POR_DADO } from '../data/levelProgression'
import { TODAS_LAS_PROPIEDADES_ARMA, PROPIEDADES_ARMA_DESC, TODAS_LAS_MAESTRIAS_ARMA, MAESTRIAS_ARMA_DESC } from '../data/weapons'

// ── Helpers ──────────────────────────────────────────────────────────

const fmtM = (v) => (v != null ? formatModificador(v) : '—')

// ── Sub-componentes comunes ──────────────────────────────────────────

function AbilityBox({ nombre, puntuacion, modificador }) {
  const abrev = CARACTERISTICAS_ABBREV[nombre]
  return (
    <div className="ca-box">
      <span className="ca-box__abrev">{abrev}</span>
      <span className="ca-box__mod">{fmtM(modificador)}</span>
      <span className="ca-box__score">{puntuacion ?? '—'}</span>
    </div>
  )
}

function DotRow({ filled, pericia, label, valor, sub }) {
  return (
    <div className="cs-dot-row">
      <span className={`cs-dot ${pericia ? 'cs-dot--pericia' : filled ? 'cs-dot--on' : ''}`} title={pericia ? 'Pericia' : filled ? 'Competencia' : ''} />
      <span className="cs-dot-val">{fmtM(valor)}</span>
      <span className="cs-dot-label">
        {label}{sub && <em className="cs-dot-sub"> ({sub})</em>}
        {pericia && <em className="cs-dot-pericia-tag"> ★</em>}
      </span>
    </div>
  )
}

function BoxStat({ valor, label, fmt = true }) {
  return (
    <div className="cs-box-stat">
      <div className="cs-box-stat__val">{fmt ? fmtM(valor) : (valor ?? '—')}</div>
      <div className="cs-box-stat__label">{label}</div>
    </div>
  )
}

function SheetSection({ title, children, grow }) {
  return (
    <div className={`cs-sec${grow ? ' cs-sec--grow' : ''}`}>
      <div className="cs-sec__title">{title}</div>
      <div className="cs-sec__body">{children}</div>
    </div>
  )
}

function isPlainObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value)
}

function buildDiff(base, edited) {
  if (Array.isArray(base) || Array.isArray(edited)) {
    return JSON.stringify(base) === JSON.stringify(edited) ? undefined : edited
  }
  if (isPlainObject(base) && isPlainObject(edited)) {
    const keys = new Set([...Object.keys(base), ...Object.keys(edited)])
    const out = {}
    for (const key of keys) {
      if (!(key in edited)) {
        out[key] = null
        continue
      }
      const d = buildDiff(base[key], edited[key])
      if (d !== undefined) out[key] = d
    }
    return Object.keys(out).length ? out : undefined
  }
  return Object.is(base, edited) ? undefined : edited
}

function getDeepPath(obj, path) {
  return path.reduce((o, k) => o?.[k], obj)
}

function setDeepPath(obj, path, value) {
  if (path.length === 0) return value
  const [head, ...tail] = path
  return { ...(isPlainObject(obj) ? obj : {}), [head]: setDeepPath(isPlainObject(obj) ? (obj[head] ?? {}) : {}, tail, value) }
}

function removeDeepPath(obj, path) {
  if (!isPlainObject(obj) || !path.length) return obj ?? {}
  const [head, ...tail] = path
  if (tail.length === 0) {
    const { [head]: _, ...rest } = obj
    return rest
  }
  if (!(head in obj)) return obj
  const nested = removeDeepPath(obj[head], tail)
  if (isPlainObject(nested) && Object.keys(nested).length === 0) {
    const { [head]: _, ...rest } = obj
    return rest
  }
  return { ...obj, [head]: nested }
}

function TraitEntryLine({ nivel, nombre, fuente, nota }) {
  return (
    <div className="cs-traits__entry-line">
      <span className="cs-traits__line">Nivel {nivel} - {nombre} - {fuente}</span>
      {nota ? <span className="cs-traits__note">{nota}</span> : null}
    </div>
  )
}

function TraitDetailToggle({ texto }) {
  const [expandido, setExpandido] = useState(false)
  if (!texto) return null

  return (
    <div className="cs-traits__detail">
      <button
        type="button"
        className="cs-traits__expand-btn"
        onClick={() => setExpandido(v => !v)}
        aria-expanded={expandido}
      >
        {expandido ? '-' : '+'}
      </button>
      {expandido ? <div className="cs-traits__desc">{texto}</div> : null}
    </div>
  )
}

function EditableField({ label, value, onChange, multiline, rows = 3 }) {
  return (
    <div className="cs-field">
      <div className="cs-field__label">{label}</div>
      {multiline
        ? <textarea
            className="cs-field__textarea"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            rows={rows}
          />
        : <input
            className="cs-field__input"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
          />
      }
    </div>
  )
}

// ── Añadir equipo inline (input compacto) ──
function EquipoInlineAdd({ onAñadir }) {
  const [texto, setTexto] = useState('')
  const añadir = () => {
    const t = texto.trim()
    if (!t) return
    onAñadir(t)
    setTexto('')
  }
  return (
    <div className="cs-equipo-add">
      <input
        className="cs-equipo-add__input"
        type="text"
        placeholder="Añadir objeto…"
        value={texto}
        onChange={e => setTexto(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && añadir()}
      />
      <button className="cs-equipo-add__btn" onClick={añadir}>+</button>
    </div>
  )
}

const CARACTERISTICAS_ATAQUE = ['Fuerza', 'Destreza', 'Inteligencia', 'Sabiduría', 'Carisma']
const TIPOS_DANIO_ATAQUE = ['contundente', 'cortante', 'perforante']
const TIPOS_DANIO_COMPLETOS = ['ácido', 'contundente', 'cortante', 'frío', 'fuego', 'fuerza', 'necrótico', 'perforante', 'psíquico', 'radiante', 'relámpago', 'trueno', 'veneno']

function inferirTipoDanio(texto = '') {
  const t = texto.toLowerCase()
  for (const tipo of TIPOS_DANIO_COMPLETOS) {
    if (t.includes(`daño ${tipo}`) || t.includes(`daño de ${tipo}`) || t.includes(tipo)) return tipo
  }
  return null
}

function inferirSalvacionConjuro(texto = '') {
  const t = texto.toLowerCase()
  const mapa = {
    fuerza: 'Fuerza',
    destreza: 'Destreza',
    constitucion: 'Constitución',
    inteligencia: 'Inteligencia',
    sabiduria: 'Sabiduría',
    carisma: 'Carisma',
  }
  const m = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(/tirada de salvacion de\s+(fuerza|destreza|constitucion|inteligencia|sabiduria|carisma)/)
  if (!m) return null
  return mapa[m[1]] ?? null
}

function AtaqueCustomModal({ personaje, inicial, tieneMaestria, onGuardar, onCerrar }) {
  const overlayRef = useRef(null)
  const [nombre, setNombre] = useState(inicial?.nombre ?? '')
  const [tipoAtaque, setTipoAtaque] = useState(inicial?.tipoAtaque ?? inicial?.tipo ?? '')
  const [caracteristica, setCaracteristica] = useState(inicial?.caracteristica ?? '')
  const [usaCompetencia, setUsaCompetencia] = useState(inicial?.usaCompetencia ?? true)
  const [bonoMagico, setBonoMagico] = useState(inicial?.bonoMagico ?? '')
  const [bonoExtra, setBonoExtra] = useState(inicial?.bonoExtra ?? '')
  const [dadoDanio, setDadoDanio] = useState(inicial?.dadoDanio ?? '')
  const [tipoDanio, setTipoDanio] = useState(inicial?.tipoDanio ?? '')
  const [usaModDanio, setUsaModDanio] = useState(inicial?.usaModDanio ?? true)
  const [critRango, setCritRango] = useState(inicial?.critRango ?? '')
  const [alcance, setAlcance] = useState(inicial?.alcance ?? '')
  const [propiedades, setPropiedades] = useState(inicial?.propiedades ?? [])
  const [maestria, setMaestria] = useState(inicial?.maestria ?? '')
  const [usarMaestria, setUsarMaestria] = useState(inicial?.usarMaestria ?? false)
  const [notas, setNotas] = useState(inicial?.notas ?? '')

  const caracteristicaCalculada = caracteristica || 'Fuerza'
  const mod = personaje.modificadores?.[caracteristicaCalculada] ?? 0
  const bonoCompetencia = usaCompetencia ? (personaje.bonificadorCompetencia ?? 0) : 0
  const abrevCar = CARACTERISTICAS_ABBREV[caracteristicaCalculada] ?? caracteristicaCalculada
  const bonAtaque = mod + bonoCompetencia + Number(bonoMagico || 0) + Number(bonoExtra || 0)
  const danoTotal = `${dadoDanio || '1d8'}${usaModDanio ? ` ${mod >= 0 ? '+' : '-'} ${Math.abs(mod)}` : ''} ${tipoDanio || 'dano'}`.trim()
  const danoPreview = `${dadoDanio || '1d8'}${usaModDanio ? ` + ${abrevCar}` : ''} ${tipoDanio || 'dano'}`.trim()

  const toggleProp = (prop) => {
    setPropiedades(prev => prev.includes(prop) ? prev.filter(p => p !== prop) : [...prev, prop])
  }

  const confirmar = () => {
    if (!nombre.trim()) return
    onGuardar({
      id: inicial?.id ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      custom: true,
      nombre: nombre.trim(),
      tipoAtaque: tipoAtaque || 'cac',
      tipo: tipoAtaque || 'cac',
      caracteristica: caracteristica || 'Fuerza',
      usaCompetencia,
      bonoMagico: Number(bonoMagico || 0),
      bonoExtra: Number(bonoExtra || 0),
      dadoDanio: (dadoDanio || '1d8').trim(),
      tipoDanio: (tipoDanio || 'contundente').trim(),
      usaModDanio,
      critRango: Math.max(2, Math.min(20, Number(critRango || 20))),
      alcance: alcance.trim(),
      propiedades,
      maestria: maestria || null,
      usarMaestria: !!(usarMaestria && tieneMaestria && maestria),
      bonAtaque,
      daño: danoTotal,
      notas: notas.trim(),
    })
  }

  return (
    <div className="sc-modal-overlay" ref={overlayRef} onClick={e => e.target === overlayRef.current && onCerrar()} role="dialog" aria-modal="true" aria-label="Configurar ataque">
      <div className="sc-modal" style={{ maxWidth: 860, width: '96vw' }}>
        <div className="sc-modal__header">
          <div>
            <h2 className="sc-modal__titulo">Configurar ataque</h2>
            <p className="sc-modal__subtitulo">Arma, truco o ataque personalizado</p>
          </div>
          <button className="sc-modal__cerrar" onClick={onCerrar} aria-label="Cerrar">✕</button>
        </div>

        <div className="sc-modal__body cs-atk-modal-grid">
          <input className="cs-field__input" placeholder="Nombre del ataque" value={nombre} onChange={e => setNombre(e.target.value)} />
          <select className="cs-field__input" value={tipoAtaque} onChange={e => setTipoAtaque(e.target.value)}>
            <option value="" disabled>Tipo de ataque</option>
            <option value="cac">Cuerpo a cuerpo</option>
            <option value="dist">A distancia</option>
          </select>
          <select className="cs-field__input" value={caracteristica} onChange={e => setCaracteristica(e.target.value)}>
            <option value="" disabled>Característica para atacar</option>
            {CARACTERISTICAS_ATAQUE.map(c => <option key={c} value={c}>{CARACTERISTICAS_ABBREV[c]} ({c})</option>)}
          </select>
          <label className="cs-atk-check"><input type="checkbox" checked={usaCompetencia} onChange={e => setUsaCompetencia(e.target.checked)} /> Competente</label>

          <input className="cs-field__input" type="number" placeholder="Bono mágico" value={bonoMagico} onChange={e => setBonoMagico(e.target.value)} />
          <input className="cs-field__input" type="number" placeholder="Bono extra" value={bonoExtra} onChange={e => setBonoExtra(e.target.value)} />
          <input className="cs-field__input" placeholder="Dado daño (ej: 1d8)" value={dadoDanio} onChange={e => setDadoDanio(e.target.value)} />
          <select className="cs-field__input" value={tipoDanio} onChange={e => setTipoDanio(e.target.value)}>
            <option value="" disabled>Tipo de daño</option>
            {TIPOS_DANIO_ATAQUE.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <label className="cs-atk-check"><input type="checkbox" checked={usaModDanio} onChange={e => setUsaModDanio(e.target.checked)} /> Sumar mod al daño</label>
          <input className="cs-field__input" type="number" min={2} max={20} placeholder="Rango crítico (20)" value={critRango} onChange={e => setCritRango(e.target.value)} />
          <input className="cs-field__input" placeholder="Alcance (ej: 6/18 m)" value={alcance} onChange={e => setAlcance(e.target.value)} />
          <input className="cs-field__input" placeholder="Notas (opcional)" value={notas} onChange={e => setNotas(e.target.value)} />

          <div className="cs-atk-props">
            <div className="cs-atk-props__title">Propiedades</div>
            <div className="cs-atk-props__list">
              {TODAS_LAS_PROPIEDADES_ARMA.map(p => (
                <label key={p} title={PROPIEDADES_ARMA_DESC[p]} className="cs-atk-check cs-atk-check--pill">
                  <input type="checkbox" checked={propiedades.includes(p)} onChange={() => toggleProp(p)} /> {p}
                </label>
              ))}
            </div>
          </div>

          <div className="cs-atk-props">
            <div className="cs-atk-props__title">Maestría</div>
            <select className="cs-field__input" value={maestria} onChange={e => setMaestria(e.target.value)}>
              <option value="">— Sin maestría —</option>
              {TODAS_LAS_MAESTRIAS_ARMA.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <label className="cs-atk-check" title={!tieneMaestria ? 'Necesitas un rasgo de maestría con armas' : ''}>
              <input type="checkbox" checked={usarMaestria} disabled={!tieneMaestria || !maestria} onChange={e => setUsarMaestria(e.target.checked)} />
              Aplicar maestría
            </label>
            {maestria && <small className="cs-atk-help">{MAESTRIAS_ARMA_DESC[maestria]}</small>}
          </div>

          <div className="cs-atk-preview">Ataque: <strong>{bonAtaque >= 0 ? `+${bonAtaque}` : bonAtaque}</strong> · Daño: <strong>{danoPreview}</strong></div>
        </div>

        <div className="sc-modal__footer">
          <button className="sc-modal__btn sc-modal__btn--cancelar" onClick={onCerrar}>Cancelar</button>
          <button className="sc-modal__btn sc-modal__btn--confirmar" onClick={confirmar}>Guardar ataque</button>
        </div>
      </div>
    </div>
  )
}

function AtaqueDetalleModal({ detalle, personaje, onGuardar, onCerrar }) {
  const [descripcion, setDescripcion] = useState(detalle?.descripcion ?? '')
  const [tipoDanio, setTipoDanio] = useState(detalle?.tipoDanio ?? '')
  const [salvacion, setSalvacion] = useState(detalle?.salvacion ?? '')

  const guardar = () => {
    onGuardar({
      descripcion: descripcion.trim(),
      tipoDanio: tipoDanio || null,
      salvacion: salvacion || null,
    })
  }

  return (
    <div className="sc-modal-overlay" role="dialog" aria-modal="true" aria-label="Detalle de ataque">
      <div className="sc-modal" style={{ maxWidth: 760, width: '95vw' }}>
        <div className="sc-modal__header">
          <div>
            <h2 className="sc-modal__titulo">{detalle?.nombre}</h2>
            <p className="sc-modal__subtitulo">Configurable solo para esta hoja del jugador</p>
          </div>
          <button className="sc-modal__cerrar" onClick={onCerrar} aria-label="Cerrar">✕</button>
        </div>

        <div className="sc-modal__body cs-atk-detail-grid">
          <input className="cs-field__input" value={detalle?.ataqueLabel ?? ''} disabled readOnly />
          <input className="cs-field__input" value={detalle?.danioLabel ?? ''} disabled readOnly />

          <select className="cs-field__input" value={tipoDanio} onChange={e => setTipoDanio(e.target.value)}>
            <option value="">Tipo de daño (sin forzar)</option>
            {TIPOS_DANIO_COMPLETOS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select className="cs-field__input" value={salvacion} onChange={e => setSalvacion(e.target.value)}>
            <option value="">Sin tirada de salvación</option>
            {CARACTERISTICAS_ATAQUE.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {salvacion && (
            <div className="cs-atk-preview" style={{ gridColumn: '1 / -1' }}>
              CD de salvación: <strong>{personaje.conjuros?.cdSalvacion ?? '—'} ({CARACTERISTICAS_ABBREV[salvacion] ?? salvacion})</strong>
            </div>
          )}

          <textarea
            className="cs-field__textarea"
            style={{ gridColumn: '1 / -1', minHeight: 140 }}
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            placeholder="Descripción visible en la hoja"
          />
        </div>

        <div className="sc-modal__footer">
          <button className="sc-modal__btn sc-modal__btn--cancelar" onClick={onCerrar}>Cancelar</button>
          <button className="sc-modal__btn sc-modal__btn--confirmar" onClick={guardar}>Guardar</button>
        </div>
      </div>
    </div>
  )
}

// ── Modal de selección de subclase ──────────────────────────────────

function SubclaseModal({ clase, nivelPersonaje, seleccionada, onConfirmar, onCerrar }) {
  const [previa, setPrevia]   = useState(seleccionada)   // selección pendiente dentro del modal
  const [expandida, setExpandida] = useState(seleccionada ?? clase.subclases[0]?.id ?? null)
  const overlayRef = useRef(null)

  // Cierra con Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onCerrar() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCerrar])

  const scExpandida = clase.subclases.find(s => s.id === expandida)

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onCerrar()
  }

  return (
    <div className="sc-modal-overlay" ref={overlayRef} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Elegir subclase">
      <div className="sc-modal">

        {/* Header */}
        <div className="sc-modal__header">
          <div>
            <h2 className="sc-modal__titulo">Elige tu subclase</h2>
            <p className="sc-modal__subtitulo">{clase.nombre} · Nivel {clase.nivelSubclase ?? 3}</p>
          </div>
          <button className="sc-modal__cerrar" onClick={onCerrar} aria-label="Cerrar">✕</button>
        </div>

        <div className="sc-modal__body">

          {/* Columna izquierda: lista de subclases */}
          <div className="sc-modal__lista">
            {clase.subclases.map(sc => {
              const sel      = previa === sc.id
              const expanded = expandida === sc.id
              return (
                <button
                  key={sc.id}
                  className={`sc-opt ${sel ? 'sc-opt--seleccionada' : ''} ${expanded ? 'sc-opt--expandida' : ''}`}
                  onClick={() => { setExpandida(sc.id); setPrevia(sc.id) }}
                >
                  <div className="sc-opt__top">
                    <span className="sc-opt__check">{sel ? '✔' : '○'}</span>
                    <strong className="sc-opt__nombre">{sc.nombre}</strong>
                  </div>
                  {sc.desc && <p className="sc-opt__desc">{sc.desc}</p>}
                </button>
              )
            })}
          </div>

          {/* Columna derecha: rasgos de la subclase expandida */}
          <div className="sc-modal__rasgos">
            {scExpandida ? (
              <>
                <div className="sc-modal__rasgos-header">
                  <span className="sc-feature-tag--sub" style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '10px', background: 'rgba(131, 73, 19, 0.13)', color: '#834913' }}>🔱 Subclase</span>
                  <h3 className="sc-modal__rasgos-titulo">{scExpandida.nombre}</h3>
                </div>
                {scExpandida.rasgosNivel ? (
                  Object.entries(scExpandida.rasgosNivel)
                    .filter(([n]) => Number(n) <= (nivelPersonaje ?? 20))
                    .map(([n, rasgos]) => (
                      <div key={n} className="sc-modal__nivel-bloque">
                        <span className="sc-modal__nivel-badge">Nivel {n}</span>
                        <ul className="sc-modal__rasgos-lista">
                          {rasgos.map((r, i) => (
                            <li key={i} className="sc-modal__rasgo">
                              <strong className="sc-modal__rasgo-nombre">{r.nombre}.</strong>
                              {' '}<span className="sc-modal__rasgo-desc">{r.desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                ) : (
                  <p className="sc-modal__sin-rasgos">Los rasgos de esta subclase aún no están detallados.</p>
                )}
                {scExpandida.rasgosNivel && Object.keys(scExpandida.rasgosNivel).some(n => Number(n) > (nivelPersonaje ?? 1)) && (
                  <p className="sc-modal__futuros">
                    💡 Sube el nivel para desbloquear rasgos de niveles superiores.
                  </p>
                )}
              </>
            ) : (
              <p className="sc-modal__sin-rasgos">Selecciona una subclase para ver sus rasgos.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sc-modal__footer">
          <button
            className="sc-modal__btn sc-modal__btn--cancelar"
            onClick={() => { onConfirmar(null); onCerrar() }}
          >
            Sin subclase
          </button>
          <button
            className="sc-modal__btn sc-modal__btn--confirmar"
            onClick={() => { onConfirmar(previa); onCerrar() }}
            disabled={!previa}
          >
            {previa ? `Elegir ${clase.subclases.find(s => s.id === previa)?.nombre}` : 'Selecciona una opción'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Modal de Mejora de Característica / Dote (ASI) ───────────────────

function ASIModal({ nivel, puntuacionesSinEsteASI, seleccionActual, doteActual,
  competenciasActuales, periciasActuales, salvacionesActuales, claseInfo, onConfirmar, onCerrar }) {
  const overlayRef = useRef(null)

  const getInitialModo = () => {
    if (doteActual?.doteId) return 'dote'
    if (!seleccionActual || !Object.keys(seleccionActual).length) return '+2'
    return Object.keys(seleccionActual).length === 2 ? '+1+1' : '+2'
  }

  const [modo, setModo] = useState(getInitialModo)
  const [selec, setSelec] = useState(seleccionActual && Object.keys(seleccionActual).length ? seleccionActual : {})
  const [busqueda, setBusqueda] = useState('')
  const [doteSelId, setDoteSelId] = useState(doteActual?.doteId ?? null)
  const [statElegido, setStatElegido] = useState(doteActual?.statElegido ?? null)
  const [skillsElegidos, setSkillsElegidos] = useState(doteActual?.skillsElegidos ?? [])
  const [skillOPericiaElegido, setSkillOPericiaElegido] = useState(doteActual?.skillOPericiaElegido ?? null)
  const [periciasElegidas, setPericiasElegidas] = useState(doteActual?.periciasElegidas ?? [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onCerrar() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCerrar])

  const handleModo = (m) => {
    setModo(m)
    setSelec({})
    if (m !== 'dote') { setDoteSelId(null); setStatElegido(null); setSkillsElegidos([]); setSkillOPericiaElegido(null); setPericiasElegidas([]) }
    setBusqueda('')
  }

  // ── ASI handlers ────────────────────────────────────────────────────
  const handleToggle = (stat, atCap) => {
    if (atCap) return
    if (modo === '+2') {
      setSelec(prev => prev[stat] ? {} : { [stat]: 2 })
    } else {
      setSelec(prev => {
        const cur = { ...prev }
        if (cur[stat]) { delete cur[stat] }
        else if (Object.keys(cur).length < 2) { cur[stat] = 1 }
        return cur
      })
    }
  }

  const isCompleteASI = modo === '+2' ? Object.keys(selec).length === 1 : Object.keys(selec).length === 2
  const CAP = 20

  // ── Dote helpers ─────────────────────────────────────────────────────
  const dotesBase = [
    ...DOTES_GENERALES.filter(d => d.id !== 'mejora-de-caracteristica'),
    ...(nivel >= 19 ? DOTES_DON_EPICO : []),
  ]
  const dotesConEstado = dotesBase.map(d => ({
    ...d,
    ...cumpleRequisitos(d, { nivel, puntuaciones: puntuacionesSinEsteASI, clase: claseInfo }),
  }))

  const dotesFiltradas = busqueda.trim()
    ? dotesConEstado.filter(d => d.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    : dotesConEstado

  const doteSelObj = doteSelId ? getDoteById(doteSelId) : null
  const efectoStatElegir = doteSelObj?.efectos?.find(e => e.tipo === 'stat-elegir') ?? null
  const efectoSkillElegir = doteSelObj?.efectos?.find(e => e.tipo === 'skill-elegir') ?? null
  const efectoSkillOPericia = doteSelObj?.efectos?.find(e => e.tipo === 'skill-o-pericia-elegir') ?? null
  const efectoPericiaElegir = doteSelObj?.efectos?.find(e => e.tipo === 'pericia-elegir') ?? null
  const efectoResiliente = doteSelObj?.efectos?.find(e => e.tipo === 'resiliente') ?? null

  // Compute pools
  const skillPoolElegir = efectoSkillElegir
    ? (efectoSkillElegir.pool === 'todas' ? HABILIDADES_LISTA : efectoSkillElegir.pool)
    : []
  const skillPoolOPericia = efectoSkillOPericia?.pool ?? []
  const periciaPool = efectoPericiaElegir
    ? (efectoPericiaElegir.pool === 'competencias' ? (competenciasActuales ?? []) : efectoPericiaElegir.pool)
    : []

  const isCompleteDote = !!doteSelId
    && (!efectoStatElegir || !!statElegido)
    && (!efectoSkillElegir || skillsElegidos.length === efectoSkillElegir.cantidad)
    && (!efectoSkillOPericia || !!skillOPericiaElegido)
    && (!efectoPericiaElegir || periciasElegidas.length >= 1)
    && (!efectoResiliente || !!statElegido)

  // ── Confirm ──────────────────────────────────────────────────────────
  const handleConfirmar = () => {
    if (modo === 'dote') {
      onConfirmar({
        tipo: 'dote',
        doteId: doteSelId,
        statElegido: statElegido ?? null,
        skillsElegidos: skillsElegidos.length ? skillsElegidos : undefined,
        skillOPericiaElegido: skillOPericiaElegido ?? undefined,
        periciasElegidas: periciasElegidas.length ? periciasElegidas : undefined,
      })
    } else {
      onConfirmar({ tipo: 'asi', selec })
    }
    onCerrar()
  }

  const isComplete = modo === 'dote' ? isCompleteDote : isCompleteASI

  return (
    <div
      className="asi-modal-overlay"
      ref={overlayRef}
      onClick={e => e.target === overlayRef.current && onCerrar()}
      role="dialog"
      aria-modal="true"
      aria-label="Mejora de característica o dote"
    >
      <div className="asi-modal">

        {/* Header */}
        <div className="asi-modal__header">
          <div>
            <h2 className="asi-modal__titulo">Mejora de característica</h2>
            <p className="asi-modal__subtitulo">Nivel {nivel} · elige ASI o una dote</p>
          </div>
          <button className="asi-modal__cerrar" onClick={onCerrar} aria-label="Cerrar">✕</button>
        </div>

        {/* Mode selector */}
        <div className="asi-modal__modos">
          <button
            className={`asi-modo-btn ${modo === '+2' ? 'asi-modo-btn--active' : ''}`}
            onClick={() => handleModo('+2')}
          >
            +2 a una característica
          </button>
          <button
            className={`asi-modo-btn ${modo === '+1+1' ? 'asi-modo-btn--active' : ''}`}
            onClick={() => handleModo('+1+1')}
          >
            +1 a dos características
          </button>
          <button
            className={`asi-modo-btn asi-modo-btn--dote ${modo === 'dote' ? 'asi-modo-btn--active' : ''}`}
            onClick={() => handleModo('dote')}
          >
            🎯 Elegir dote
          </button>
        </div>

        {/* ── ASI stat grid ── */}
        {modo !== 'dote' && (
          <div className="asi-stat-grid">
            {CARACTERISTICAS_ORDER.map(stat => {
              const base = puntuacionesSinEsteASI?.[stat] ?? null
              const bonus = selec[stat] ?? 0
              const isSelected = !!selec[stat]
              const needed = modo === '+2' ? 2 : 1
              const atCap = base != null && base + needed > CAP
              const selectionFull = modo === '+1+1' && Object.keys(selec).length >= 2 && !isSelected
              const isDisabled = (atCap && !isSelected) || selectionFull

              return (
                <button
                  key={stat}
                  className={`asi-stat-btn${isSelected ? ' asi-stat-btn--selected' : ''}${isDisabled ? ' asi-stat-btn--disabled' : ''}${atCap && !isSelected ? ' asi-stat-btn--cap' : ''}`}
                  onClick={() => handleToggle(stat, isDisabled)}
                  disabled={isDisabled}
                >
                  <span className="asi-stat-btn__name">{CARACTERISTICAS_ABBREV[stat]}</span>
                  <div className="asi-stat-btn__vals">
                    <span className="asi-stat-btn__base">{base ?? '—'}</span>
                    {bonus > 0 && (
                      <span className="asi-stat-btn__arrow">→ <strong>{Math.min((base ?? 0) + bonus, CAP)}</strong></span>
                    )}
                  </div>
                  {isSelected && <span className="asi-stat-btn__badge">+{bonus}</span>}
                  {atCap && !isSelected && <span className="asi-stat-btn__cap-label">máx</span>}
                </button>
              )
            })}
          </div>
        )}

        {/* ── Dote picker ── */}
        {modo === 'dote' && (
          <div className="asi-dote-picker">
            <input
              className="asi-dote-busqueda"
              type="text"
              placeholder="Buscar dote…"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              autoFocus
            />
            <div className="asi-dote-lista">
              {dotesFiltradas.map(d => (
                <button
                  key={d.id}
                  className={`asi-dote-opcion${doteSelId === d.id ? ' asi-dote-opcion--sel' : ''}${!d.cumple ? ' asi-dote-opcion--bloqueada' : ''}`}
                  disabled={!d.cumple}
                  title={d.razon ?? d.descripcion}
                  onClick={() => { if (!d.cumple) return; setDoteSelId(d.id); setStatElegido(null); setSkillsElegidos([]); setSkillOPericiaElegido(null); setPericiasElegidas([]) }}
                >
                  <div className="asi-dote-opcion__nombre">
                    {d.nombre}
                    {!d.cumple && <span className="asi-dote-opcion__bloq">🔒 {d.razon}</span>}
                  </div>
                  <div className="asi-dote-opcion__desc">{d.descripcion}</div>
                </button>
              ))}
              {dotesFiltradas.length === 0 && (
                <p className="asi-dote-empty">No hay dotes que coincidan.</p>
              )}
            </div>

            {/* Stat picker for stat-elegir dotes */}
            {efectoStatElegir && (
              <div className="asi-dote-stat-elegir">
                <p className="asi-dote-stat-elegir__titulo">
                  Elige la característica que mejora +{efectoStatElegir.valor}:
                </p>
                <div className="asi-dote-stat-elegir__opciones">
                  {efectoStatElegir.opciones.map(stat => (
                    <button
                      key={stat}
                      className={`asi-dote-stat-btn${statElegido === stat ? ' asi-dote-stat-btn--sel' : ''}`}
                      onClick={() => setStatElegido(stat)}
                    >
                      {CARACTERISTICAS_ABBREV[stat]} ({stat})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Resiliente: pick stat for save comp */}
            {efectoResiliente && (
              <div className="asi-dote-stat-elegir">
                <p className="asi-dote-stat-elegir__titulo">
                  Elige característica (+1 stat + competencia en salvación):
                </p>
                <div className="asi-dote-stat-elegir__opciones">
                  {CARACTERISTICAS_ORDER.map(stat => {
                    const yaTieneSave = (salvacionesActuales ?? []).includes(stat)
                    return (
                      <button
                        key={stat}
                        className={`asi-dote-stat-btn${statElegido === stat ? ' asi-dote-stat-btn--sel' : ''}${yaTieneSave ? ' asi-dote-stat-btn--disabled' : ''}`}
                        onClick={() => !yaTieneSave && setStatElegido(stat)}
                        disabled={yaTieneSave}
                        title={yaTieneSave ? 'Ya tienes competencia en esta salvación' : undefined}
                      >
                        {CARACTERISTICAS_ABBREV[stat]}
                        {yaTieneSave && ' ✓'}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Skill elegir: pick N skills */}
            {efectoSkillElegir && (
              <div className="asi-dote-stat-elegir">
                <p className="asi-dote-stat-elegir__titulo">
                  Elige {efectoSkillElegir.cantidad} habilidad{efectoSkillElegir.cantidad > 1 ? 'es' : ''} ({skillsElegidos.length}/{efectoSkillElegir.cantidad}):
                </p>
                <div className="asi-dote-stat-elegir__opciones asi-dote-stat-elegir__opciones--wrap">
                  {skillPoolElegir.map(hab => {
                    const sel = skillsElegidos.includes(hab)
                    const full = skillsElegidos.length >= efectoSkillElegir.cantidad && !sel
                    return (
                      <button
                        key={hab}
                        className={`asi-dote-stat-btn${sel ? ' asi-dote-stat-btn--sel' : ''}${full ? ' asi-dote-stat-btn--disabled' : ''}`}
                        onClick={() => {
                          if (full) return
                          setSkillsElegidos(prev => sel ? prev.filter(s => s !== hab) : [...prev, hab])
                        }}
                        disabled={full}
                      >
                        {hab}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Skill-o-pericia: pick 1 from pool */}
            {efectoSkillOPericia && (
              <div className="asi-dote-stat-elegir">
                <p className="asi-dote-stat-elegir__titulo">
                  Elige habilidad (competencia → pericia si ya la tienes):
                </p>
                <div className="asi-dote-stat-elegir__opciones">
                  {skillPoolOPericia.map(hab => {
                    const tieneComp = (competenciasActuales ?? []).includes(hab)
                    const sel = skillOPericiaElegido === hab
                    return (
                      <button
                        key={hab}
                        className={`asi-dote-stat-btn${sel ? ' asi-dote-stat-btn--sel' : ''}`}
                        onClick={() => setSkillOPericiaElegido(hab)}
                      >
                        {hab}
                        <span style={{ fontSize: '10px', marginLeft: 4, opacity: 0.7 }}>
                          {tieneComp ? '→ Pericia' : '→ Comp.'}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Pericia elegir: pick from competencias */}
            {efectoPericiaElegir && (
              <div className="asi-dote-stat-elegir">
                <p className="asi-dote-stat-elegir__titulo">
                  Elige habilidad para ganar Pericia (ya tienes comp.):
                </p>
                <div className="asi-dote-stat-elegir__opciones asi-dote-stat-elegir__opciones--wrap">
                  {periciaPool.length > 0 ? periciaPool.map(hab => {
                    const sel = periciasElegidas.includes(hab)
                    const yaPericia = (periciasActuales ?? []).includes(hab)
                    return (
                      <button
                        key={hab}
                        className={`asi-dote-stat-btn${sel ? ' asi-dote-stat-btn--sel' : ''}${yaPericia ? ' asi-dote-stat-btn--disabled' : ''}`}
                        onClick={() => {
                          if (yaPericia) return
                          setPericiasElegidas(prev => sel ? prev.filter(p => p !== hab) : [...prev, hab])
                        }}
                        disabled={yaPericia}
                        title={yaPericia ? 'Ya tienes pericia en esta habilidad' : undefined}
                      >
                        {hab}
                      </button>
                    )
                  }) : (
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      Necesitas competencias en habilidades primero.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="asi-modal__footer">
          <button
            className="asi-modal__btn asi-modal__btn--limpiar"
            onClick={() => { onConfirmar(null); onCerrar() }}
          >
            Sin mejora
          </button>
          <button className="asi-modal__btn asi-modal__btn--cancelar" onClick={onCerrar}>
            Cancelar
          </button>
          <button
            className="asi-modal__btn asi-modal__btn--confirmar"
            disabled={!isComplete}
            onClick={handleConfirmar}
          >
            {isComplete
              ? (modo === 'dote' ? `Elegir ${doteSelObj?.nombre ?? ''}` : `Confirmar mejora`)
              : (modo === 'dote' ? 'Selecciona una dote' : 'Selecciona características')}
          </button>
        </div>

      </div>
    </div>
  )
}



// ── Modal para añadir dote libre ────────────────────────────────────
function DoteLibreModal({
  nivel, puntuaciones, claseInfo,
  dotesExistentes,
  competenciasActuales, periciasActuales, salvacionesActuales,
  onConfirmar, onCerrar,
}) {
  const overlayRef = useRef(null)
  const [busqueda, setBusqueda] = useState('')
  const [doteSelId, setDoteSelId] = useState(null)
  const [statElegido, setStatElegido] = useState(null)
  const [skillsElegidos, setSkillsElegidos] = useState([])
  const [skillOPericiaElegido, setSkillOPericiaElegido] = useState(null)
  const [periciasElegidas, setPericiasElegidas] = useState([])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onCerrar() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCerrar])

  const existentesSet = new Set(dotesExistentes ?? [])

  const dotesBase = TODAS_LAS_DOTES.filter(d => d.id !== 'mejora-de-caracteristica')
  const dotesFiltradas = dotesBase
    .filter(d => {
      if (!busqueda.trim()) return true
      return d.nombre.toLowerCase().includes(busqueda.toLowerCase())
    })
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))

  const doteSelObj = doteSelId ? getDoteById(doteSelId) : null
  const yaElegida = doteSelId && !doteSelObj?.repetible && existentesSet.has(doteSelId)

  const efectoStatElegir     = doteSelObj?.efectos?.find(e => e.tipo === 'stat-elegir') ?? null
  const efectoSkillElegir    = doteSelObj?.efectos?.find(e => e.tipo === 'skill-elegir') ?? null
  const efectoSkillOPericia  = doteSelObj?.efectos?.find(e => e.tipo === 'skill-o-pericia-elegir') ?? null
  const efectoPericiaElegir  = doteSelObj?.efectos?.find(e => e.tipo === 'pericia-elegir') ?? null
  const efectoResiliente     = doteSelObj?.efectos?.find(e => e.tipo === 'resiliente') ?? null

  const skillPoolElegir   = efectoSkillElegir
    ? (efectoSkillElegir.pool === 'todas' ? HABILIDADES_LISTA : efectoSkillElegir.pool)
    : []
  const skillPoolOPericia = efectoSkillOPericia?.pool ?? []
  const periciaPool       = efectoPericiaElegir
    ? (efectoPericiaElegir.pool === 'competencias' ? (competenciasActuales ?? []) : efectoPericiaElegir.pool)
    : []

  const isComplete = !!doteSelId && !yaElegida
    && (!efectoStatElegir    || !!statElegido)
    && (!efectoSkillElegir   || skillsElegidos.length === efectoSkillElegir.cantidad)
    && (!efectoSkillOPericia || !!skillOPericiaElegido)
    && (!efectoPericiaElegir || periciasElegidas.length >= 1)
    && (!efectoResiliente    || !!statElegido)

  const handleConfirmar = () => {
    onConfirmar({
      doteId: doteSelId,
      statElegido: statElegido ?? null,
      skillsElegidos: skillsElegidos.length ? skillsElegidos : [],
      skillOPericiaElegido: skillOPericiaElegido ?? null,
      periciasElegidas: periciasElegidas.length ? periciasElegidas : [],
    })
    onCerrar()
  }

  const selectDote = (id) => {
    setDoteSelId(id)
    setStatElegido(null)
    setSkillsElegidos([])
    setSkillOPericiaElegido(null)
    setPericiasElegidas([])
  }

  return (
    <div
      className="asi-modal-overlay"
      ref={overlayRef}
      onClick={e => e.target === overlayRef.current && onCerrar()}
      role="dialog"
      aria-modal="true"
      aria-label="Añadir dote libre"
    >
      <div className="asi-modal">
        <div className="asi-modal__header">
          <div>
            <h2 className="asi-modal__titulo">Añadir dote</h2>
            <p className="asi-modal__subtitulo">Elige una dote para añadir a la hoja</p>
          </div>
          <button className="asi-modal__cerrar" onClick={onCerrar} aria-label="Cerrar">✕</button>
        </div>

        <div className="asi-dote-picker">
          <input
            className="asi-dote-busqueda"
            type="text"
            placeholder="Buscar dote…"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            autoFocus
          />
          <div className="asi-dote-lista">
            {dotesFiltradas.map(d => {
              const duplicada = !d.repetible && existentesSet.has(d.id)
              return (
                <button
                  key={d.id}
                  className={`asi-dote-opcion${doteSelId === d.id ? ' asi-dote-opcion--sel' : ''}${duplicada ? ' asi-dote-opcion--bloqueada' : ''}`}
                  disabled={duplicada}
                  title={duplicada ? 'Ya tienes esta dote' : d.descripcion}
                  onClick={() => !duplicada && selectDote(d.id)}
                >
                  <div className="asi-dote-opcion__nombre">
                    {d.nombre}
                    {duplicada && <span className="asi-dote-opcion__bloq">🔒 Ya elegida</span>}
                  </div>
                  <div className="asi-dote-opcion__desc">{d.descripcion}</div>
                </button>
              )
            })}
            {dotesFiltradas.length === 0 && (
              <p className="asi-dote-empty">No hay dotes que coincidan.</p>
            )}
          </div>

          {efectoStatElegir && (
            <div className="asi-dote-stat-elegir">
              <p className="asi-dote-stat-elegir__titulo">
                Elige la característica que mejora +{efectoStatElegir.valor}:
              </p>
              <div className="asi-dote-stat-elegir__opciones">
                {efectoStatElegir.opciones.map(stat => (
                  <button
                    key={stat}
                    className={`asi-dote-stat-btn${statElegido === stat ? ' asi-dote-stat-btn--sel' : ''}`}
                    onClick={() => setStatElegido(stat)}
                  >
                    {CARACTERISTICAS_ABBREV[stat]} ({stat})
                  </button>
                ))}
              </div>
            </div>
          )}

          {efectoResiliente && (
            <div className="asi-dote-stat-elegir">
              <p className="asi-dote-stat-elegir__titulo">
                Elige característica (+1 stat + competencia en salvación):
              </p>
              <div className="asi-dote-stat-elegir__opciones">
                {CARACTERISTICAS_ORDER.map(stat => {
                  const yaTieneSave = (salvacionesActuales ?? []).includes(stat)
                  return (
                    <button
                      key={stat}
                      className={`asi-dote-stat-btn${statElegido === stat ? ' asi-dote-stat-btn--sel' : ''}${yaTieneSave ? ' asi-dote-stat-btn--disabled' : ''}`}
                      onClick={() => !yaTieneSave && setStatElegido(stat)}
                      disabled={yaTieneSave}
                      title={yaTieneSave ? 'Ya tienes competencia en esta salvación' : undefined}
                    >
                      {CARACTERISTICAS_ABBREV[stat]}{yaTieneSave && ' ✓'}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {efectoSkillElegir && (
            <div className="asi-dote-stat-elegir">
              <p className="asi-dote-stat-elegir__titulo">
                Elige {efectoSkillElegir.cantidad} habilidad{efectoSkillElegir.cantidad > 1 ? 'es' : ''} ({skillsElegidos.length}/{efectoSkillElegir.cantidad}):
              </p>
              <div className="asi-dote-stat-elegir__opciones asi-dote-stat-elegir__opciones--wrap">
                {skillPoolElegir.map(hab => {
                  const sel  = skillsElegidos.includes(hab)
                  const full = skillsElegidos.length >= efectoSkillElegir.cantidad && !sel
                  return (
                    <button
                      key={hab}
                      className={`asi-dote-stat-btn${sel ? ' asi-dote-stat-btn--sel' : ''}${full ? ' asi-dote-stat-btn--disabled' : ''}`}
                      onClick={() => { if (full) return; setSkillsElegidos(prev => sel ? prev.filter(s => s !== hab) : [...prev, hab]) }}
                      disabled={full}
                    >
                      {hab}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {efectoSkillOPericia && (
            <div className="asi-dote-stat-elegir">
              <p className="asi-dote-stat-elegir__titulo">
                Elige habilidad (competencia → pericia si ya la tienes):
              </p>
              <div className="asi-dote-stat-elegir__opciones">
                {skillPoolOPericia.map(hab => {
                  const tieneComp = (competenciasActuales ?? []).includes(hab)
                  const sel = skillOPericiaElegido === hab
                  return (
                    <button
                      key={hab}
                      className={`asi-dote-stat-btn${sel ? ' asi-dote-stat-btn--sel' : ''}`}
                      onClick={() => setSkillOPericiaElegido(hab)}
                    >
                      {hab}
                      <span style={{ fontSize: '10px', marginLeft: 4, opacity: 0.7 }}>
                        {tieneComp ? '→ Pericia' : '→ Comp.'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {efectoPericiaElegir && (
            <div className="asi-dote-stat-elegir">
              <p className="asi-dote-stat-elegir__titulo">
                Elige habilidad para ganar Pericia (ya tienes comp.):
              </p>
              <div className="asi-dote-stat-elegir__opciones asi-dote-stat-elegir__opciones--wrap">
                {periciaPool.length > 0 ? periciaPool.map(hab => {
                  const sel      = periciasElegidas.includes(hab)
                  const yaPericia = (periciasActuales ?? []).includes(hab)
                  return (
                    <button
                      key={hab}
                      className={`asi-dote-stat-btn${sel ? ' asi-dote-stat-btn--sel' : ''}${yaPericia ? ' asi-dote-stat-btn--disabled' : ''}`}
                      onClick={() => { if (yaPericia) return; setPericiasElegidas(prev => sel ? prev.filter(p => p !== hab) : [...prev, hab]) }}
                      disabled={yaPericia}
                      title={yaPericia ? 'Ya tienes pericia en esta habilidad' : undefined}
                    >
                      {hab}
                    </button>
                  )
                }) : (
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Necesitas competencias en habilidades primero.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="asi-modal__footer">
          <button className="asi-modal__btn asi-modal__btn--cancelar" onClick={onCerrar}>
            Cancelar
          </button>
          <button
            className="asi-modal__btn asi-modal__btn--confirmar"
            disabled={!isComplete}
            onClick={handleConfirmar}
          >
            {isComplete
              ? `Añadir ${doteSelObj?.nombre ?? ''}`
              : (doteSelId && !yaElegida ? 'Completa las elecciones' : 'Selecciona una dote')}
          </button>
        </div>
      </div>
    </div>
  )
}


// Skills grouped by ability score (matches the official sheet layout)
const SKILLS_BY_ABILITY = {
  Fuerza:        ['Atletismo'],
  Destreza:      ['Acrobacias', 'Juego de manos', 'Sigilo'],
  Constitución:  [],
  Inteligencia:  ['Conocimiento arcano', 'Historia', 'Investigación', 'Naturaleza', 'Religión'],
  Sabiduría:     ['Medicina', 'Percepción', 'Perspicacia', 'Supervivencia', 'Trato con animales'],
  Carisma:       ['Engaño', 'Interpretación', 'Intimidación', 'Persuasión'],
}

function Hoja1({
  personaje, subclaseSeleccionada, onSubclaseSeleccionar,
  onNombreCambiar, onAlineamientoCambiar, onPersonalidadCambiar,
  onNivelCambiar, nivel, onClaseCambiar, claseSeleccionada,
  onOrigenCambiar, origen, onPuntuacionesCambiar, puntuacionesBase,
  onEquipoCambiar, equipoState,
  monedas, onMonedasCambiar,
  pgActuales, onPgActualesCambiar, pgTemporales, onPgTemporalesCambiar,
  pgMaxPersonalizado, onPgMaxPersonalizadoCambiar,
  muerte, onMuerteCambiar,
  bonusASI, onBonusASICambiar,
  dotesElegidos, onDotesElegidosCambiar,
  dotesLibres, onDotesLibresCambiar,
  armasCustom, onArmasCustomCambiar,
  ataquesHojaConfig, onAtaquesHojaConfigCambiar,
  ataquesOcultos, onAtaquesOcultosCambiar,
  itemsOcultos, onItemsOcultosCambiar,
  trucosSeleccionados,
  dadosGolpeGastados, onDadosGolpeGastadosCambiar,
  onXpNivelActualCambiar,
  pgGananciaPorNivel, onPgGananciaPorNivelCambiar,
}) {
  const [modalSubclase, setModalSubclase] = useState(false)
  const [asiModalNivel, setAsiModalNivel] = useState(null)
  const [ataqueModal, setAtaqueModal] = useState(null)
  const [detalleAtaqueModal, setDetalleAtaqueModal] = useState(null)
  const [modalDoteLibreAbierto, setModalDoteLibreAbierto] = useState(false)
  const [inspiracion, setInspiracion] = useState(false)
  const [pgMetodoAbierto, setPgMetodoAbierto] = useState(false)

  const toggleMuerte = (tipo) => {
    const k = tipo === 'exito' ? 'exitos' : 'fallos'
    onMuerteCambiar(p => ({ ...p, [k]: p[k] >= 3 ? 0 : p[k] + 1 }))
  }

  // Helper to render one ability group (score + save + skills)
  const renderAbilityGroup = (car) => {
    const finalScore = personaje.puntuaciones?.[car] ?? null
    const baseScore  = puntuacionesBase?.[car] ?? null
    const totalBonus = (finalScore ?? 0) - (baseScore ?? 0)
    const save       = personaje.tiradasSalvacion?.[car]
    const skills     = SKILLS_BY_ABILITY[car] ?? []

    return (
      <div key={car} className="ca-group">
        <div className="ca-group__header">{car}</div>
        <div className="ca-group__body">
          <div className="ca-group__score-area">
            <span className="ca-group__mod">{fmtM(personaje.modificadores?.[car])}</span>
            <div className="ca-group__score-row">
              <span className="ca-group__score-label">Puntuación</span>
              <input
                className="ca-group__score-input"
                type="number" min={1} max={30}
                value={finalScore ?? ''}
                onChange={e => {
                  const nf = e.target.value === '' ? null : Math.max(1, Math.min(30, Number(e.target.value)))
                  const nb = nf != null ? nf - totalBonus : null
                  onPuntuacionesCambiar(prev => ({ ...prev, [car]: nb }))
                }}
              />
              {totalBonus !== 0 && (
                <span className="ca-group__bonus">{totalBonus > 0 ? `+${totalBonus}` : totalBonus}</span>
              )}
            </div>
          </div>
          <div className="ca-group__checks">
            <DotRow filled={save?.competencia} valor={save?.total} label="Tirada de salvación" />
            {skills.map(hab => {
              const d = personaje.habilidades?.[hab]
              return (
                <DotRow key={hab} filled={d?.competencia} pericia={d?.pericia} valor={d?.total} label={hab} />
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const dotesPorASI = Object.entries(dotesElegidos ?? {})
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([lvl, data]) => {
      if (!data?.doteId) return null
      const dote = getDoteById(data.doteId)
      if (!dote) return null
      return {
        id: `${data.doteId}-${lvl}`,
        nombre: dote.nombre,
        fuente: `Nivel ${lvl}`,
        detalle: data.statElegido ? `+1 ${CARACTERISTICAS_ABBREV[data.statElegido]}` : '',
      }
    })
    .filter(Boolean)

  const dotesLibresResueltas = (dotesLibres ?? []).map((d, idx) => {
    const doteId = typeof d === 'string' ? d : d.doteId
    const dote   = getDoteById(doteId)
    const data   = typeof d === 'string' ? {} : d
    let detalle  = ''
    if (data.statElegido) detalle = `+1 ${CARACTERISTICAS_ABBREV[data.statElegido] ?? data.statElegido}`
    else if (data.skillsElegidos?.length) detalle = data.skillsElegidos.join(', ')
    else if (data.skillOPericiaElegido) detalle = data.skillOPericiaElegido
    return { idx, id: doteId, nombre: dote?.nombre ?? doteId, detalle }
  })

  const dotesLibresIds = (dotesLibres ?? []).map(d => typeof d === 'string' ? d : d.doteId)
  const dotesLibresSet = new Set(dotesLibresIds)

  const pgMaxEfectivo = pgMaxPersonalizado ?? personaje.pgMax
  const dadoGolpeTipo = personaje.clase?.dadoGolpe ?? 'd8'
  const dadosGolpeTotal = personaje.nivel ?? 1
  const nivelActual = personaje.nivel ?? 1
  const gastadosActuales = dadosGolpeGastados ?? 0
  const dadosGolpeDisponibles = dadosGolpeTotal - gastadosActuales
  const conModActual = personaje.modificadores?.['Constitución'] ?? 0
  const fijoBaseNivel = Math.max(1, (PG_FIJO_POR_DADO[dadoGolpeTipo] ?? 5) + conModActual)
  const gananciaTiradaNivel = pgGananciaPorNivel?.[nivelActual] ?? null
  const metodoPgNivel = gananciaTiradaNivel != null ? 'tirada' : 'fijo'
  const dadoTiradoMostrado = gananciaTiradaNivel != null
    ? Math.max(1, gananciaTiradaNivel - conModActual)
    : null
  const claseActual = personaje.clase
  const nivelSubclase = claseActual?.nivelSubclase ?? 3
  const subclaseDisponible = !!(claseActual?.subclases?.length && nivelActual >= nivelSubclase)
  const subclaseActual = subclaseDisponible
    ? claseActual.subclases.find(s => s.id === subclaseSeleccionada)
    : null
  const asiPendientes = [...new Set(
    (personaje.rasgosClase ?? [])
      .filter(r => r.esASI && !r.esDonEpico && (r.nivelObtenido ?? 0) <= nivelActual)
      .map(r => r.nivelObtenido)
      .filter(lvl => !(bonusASI?.[lvl] || dotesElegidos?.[lvl]))
  )].sort((a, b) => a - b)
  const doteTrasfondoDesc = personaje.trasfondo?.doteId
    ? (getDoteById(personaje.trasfondo.doteId)?.desc ?? '')
    : ''
  const tieneMaestriaArmas = !!personaje.maestriaArmas?.tiene

  const getCfgAtaque = (key) => (ataquesHojaConfig ?? {})[key] ?? {}
  const saveCfgAtaque = (key, patch) => {
    if (!key) return
    onAtaquesHojaConfigCambiar?.(prev => ({ ...prev, [key]: { ...(prev?.[key] ?? {}), ...patch } }))
  }

  return (
    <div className="cs-hoja cs-hoja--1">

      {/* ═══ Cabecera — Hoja de personaje ═══ */}
      <header className="cs-header">

        {/* Fila 1: Nombre del personaje */}
        <div className="cs-header__row1">
          <div className="cs-header__nombre">
            <input
              className="cs-header__nombre-input"
              value={personaje.nombre || ''}
              onChange={e => onNombreCambiar(e.target.value)}
              placeholder="Nombre del personaje"
            />
            <span className="cs-header__nombre-label">Nombre del personaje</span>
          </div>
        </div>

        {/* Fila 2: Identidad (trasfondo, especie, clase, subclase, nivel, XP, alineamiento) */}
        <div className="cs-header__row2">
          <div className="cs-header__meta-item">
            <select className="cs-header__meta-select" value={origen.trasfondo || ''} onChange={e => onOrigenCambiar(prev => ({ ...prev, trasfondo: e.target.value || null }))}>
              <option value="">—</option>
              {TRASFONDOS.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
            </select>
            <span className="cs-header__meta-label">Trasfondo</span>
          </div>
          <div className="cs-header__meta-item">
            <select className="cs-header__meta-select" value={origen.especie || ''} onChange={e => onOrigenCambiar(prev => ({ ...prev, especie: e.target.value || null }))}>
              <option value="">—</option>
              {ESPECIES.map(es => <option key={es.id} value={es.id}>{es.nombre}</option>)}
            </select>
            <span className="cs-header__meta-label">Especie</span>
          </div>
          <div className="cs-header__meta-item">
            <select className="cs-header__meta-select" value={claseSeleccionada || ''} onChange={e => onClaseCambiar(e.target.value || null)}>
              <option value="">—</option>
              {CLASES.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
            <span className="cs-header__meta-label">Clase</span>
          </div>
          <div className="cs-header__meta-item cs-header__meta-item--subclase">
            {(() => {
              const clase = personaje.clase
              if (!clase?.subclases?.length) return <span className="cs-header__meta-val">—</span>
              const nivelSub = clase.nivelSubclase ?? 3
              const scActual = clase.subclases.find(s => s.id === subclaseSeleccionada)
              if ((personaje.nivel ?? 1) < nivelSub) {
                return <span className="cs-header__meta-val cs-header__meta-val--muted">Nivel {nivelSub}</span>
              }
              return (
                <button
                  className={`cs-header__subclase-btn${scActual ? ' cs-header__subclase-btn--elegida' : ' cs-header__subclase-btn--pendiente'}`}
                  onClick={() => setModalSubclase(true)}
                >
                  {scActual ? scActual.nombre : '🔱 Elegir subclase'}
                </button>
              )
            })()}
            <span className="cs-header__meta-label">Subclase</span>
          </div>
          <div className="cs-header__meta-item cs-header__meta-item--narrow">
            <input className="cs-header__meta-input" type="number" min={1} max={20} value={nivel} onChange={e => onNivelCambiar(Math.max(1, Math.min(20, Number(e.target.value) || 1)))} />
            <span className="cs-header__meta-label">Nivel</span>
          </div>
          <div className="cs-header__meta-item cs-header__meta-item--narrow">
            <input className="cs-header__meta-input" type="number" min={0} value={personaje.xpNivelActual ?? 0} onChange={e => onXpNivelActualCambiar(Math.max(0, Number(e.target.value) || 0))} />
            <span className="cs-header__meta-label">Exp.</span>
          </div>
          <div className="cs-header__meta-item">
            <select className="cs-header__meta-select" value={personaje.alineamiento ? (ALINEAMIENTOS.find(a => a.nombre === personaje.alineamiento)?.id ?? '') : ''} onChange={e => onAlineamientoCambiar(e.target.value || null)}>
              <option value="">—</option>
              {ALINEAMIENTOS.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
            </select>
            <span className="cs-header__meta-label">Alineamiento</span>
          </div>
        </div>

        {/* Fila 3: Puntos de golpe (editables) + Dados de golpe */}
        <div className="cs-header__row3">

          {/* Puntos de golpe — todos editables */}
          <div className="cs-header__pg-section">
            <div className="cs-header__pg-top">
              <span />
              <button
                type="button"
                className="cs-header__pg-method-btn"
                onClick={() => nivelActual > 1 && setPgMetodoAbierto(v => !v)}
                aria-expanded={nivelActual > 1 ? pgMetodoAbierto : false}
                title={nivelActual > 1 ? 'Método de PG' : 'Disponible desde nivel 2'}
                disabled={nivelActual <= 1}
              >
                {pgMetodoAbierto ? '−' : '+'}
              </button>
            </div>
            <div className="cs-header__pg-cells">
              <div className="cs-header__pg-cell">
                <input
                  className="cs-header__pg-input"
                  type="number"
                  min={0}
                  value={pgTemporales || 0}
                  onChange={e => onPgTemporalesCambiar(Math.max(0, Number(e.target.value) || 0))}
                />
                <span className="cs-header__pg-label">Temporales</span>
              </div>
              <div className="cs-header__pg-cell cs-header__pg-cell--main">
                <input
                  className="cs-header__pg-input cs-header__pg-input--main"
                  type="number"
                  min={0}
                  value={pgActuales ?? pgMaxEfectivo ?? 0}
                  onChange={e => onPgActualesCambiar(Math.max(0, Number(e.target.value) || 0))}
                />
                <span className="cs-header__pg-label">Actuales</span>
              </div>
              <div className="cs-header__pg-cell">
                <input
                  className="cs-header__pg-input"
                  type="number"
                  min={0}
                  value={pgMaxEfectivo ?? 0}
                  onChange={e => {
                    const val = Math.max(0, Number(e.target.value) || 0)
                    onPgMaxPersonalizadoCambiar(val === (personaje.pgMax ?? 0) ? null : val)
                  }}
                />
                <span className="cs-header__pg-label">Máximo</span>
              </div>
            </div>
            {/* Selector de método de PG (Fijo o Tirada) — solo nivel 2+ */}
            {nivelActual > 1 && pgMetodoAbierto && (
              <div className="cs-header__pg-method">
              <div className="cs-header__pg-method-head">
                <span className="cs-header__pg-method-label">Método niv. {nivelActual}</span>
                <div className="cs-pg-toggle" role="group" aria-label={`Método de PG nivel ${nivelActual}`}>
                  <span className={`cs-pg-toggle__text ${metodoPgNivel === 'fijo' ? 'is-active' : ''}`}>Fijo</span>
                  <label className="cs-pg-toggle__switch">
                    <input
                      type="checkbox"
                      checked={metodoPgNivel === 'tirada'}
                      onChange={(e) => {
                        if (!onPgGananciaPorNivelCambiar) return
                        if (e.target.checked) {
                          const caras = parseInt(String(dadoGolpeTipo).replace('d', ''), 10) || 8
                          const tirada = Math.floor(Math.random() * caras) + 1
                          const ganancia = Math.max(1, tirada + conModActual)
                          onPgGananciaPorNivelCambiar({ ...pgGananciaPorNivel, [nivelActual]: ganancia })
                        } else {
                          const nuevoMapa = { ...(pgGananciaPorNivel ?? {}) }
                          delete nuevoMapa[nivelActual]
                          onPgGananciaPorNivelCambiar(nuevoMapa)
                        }
                      }}
                    />
                    <span className="cs-pg-toggle__slider" />
                  </label>
                  <span className={`cs-pg-toggle__text ${metodoPgNivel === 'tirada' ? 'is-active' : ''}`}>Tirada</span>
                </div>
              </div>

              <div className="cs-header__pg-method-info">
                {metodoPgNivel === 'fijo' ? (
                  <span>Fijo: <strong>{fijoBaseNivel} PG</strong></span>
                ) : (
                  <span>
                    Tirada: <strong>{gananciaTiradaNivel} PG</strong>
                    {dadoTiradoMostrado != null ? ` (dado ${dadoGolpeTipo}: ${dadoTiradoMostrado}${conModActual >= 0 ? ` + ${conModActual}` : ` - ${Math.abs(conModActual)}`})` : ''}
                  </span>
                )}

                {metodoPgNivel === 'tirada' && (
                  <button
                    type="button"
                    className="cs-header__pg-reroll"
                    onClick={() => {
                      if (!onPgGananciaPorNivelCambiar) return
                      const caras = parseInt(String(dadoGolpeTipo).replace('d', ''), 10) || 8
                      const tirada = Math.floor(Math.random() * caras) + 1
                      const ganancia = Math.max(1, tirada + conModActual)
                      onPgGananciaPorNivelCambiar({ ...pgGananciaPorNivel, [nivelActual]: ganancia })
                    }}
                  >
                    Volver a tirar
                  </button>
                )}
              </div>
            </div>
            )}
            <span className="cs-header__section-title">Puntos de golpe</span>
          </div>

          {/* Dados de golpe — gastados y máximos */}
          <div className="cs-header__dg-section">
            <div className="cs-header__dg-content">
              <div className="cs-header__dg-info">
                <span className="cs-header__dg-tipo">{dadoGolpeTipo}</span>
                <span className="cs-header__dg-total">×{dadosGolpeTotal}</span>
              </div>
              <div className="cs-header__dg-tracker">
                <div className="cs-header__dg-bubbles">
                  {Array.from({ length: dadosGolpeTotal }).map((_, i) => {
                    const gastado = i >= dadosGolpeDisponibles
                    return (
                      <button
                        key={i}
                        className={`cs-dg-bubble${gastado ? ' cs-dg-bubble--gastado' : ''}`}
                        title={gastado ? 'Clic para recuperar dado' : 'Clic para gastar dado'}
                        onClick={() => {
                          const nuevoGastados = gastado
                            ? Math.max(0, gastadosActuales - 1)
                            : Math.min(dadosGolpeTotal, gastadosActuales + 1)
                          onDadosGolpeGastadosCambiar(nuevoGastados)
                        }}
                      />
                    )
                  })}
                </div>
                <span className="cs-header__dg-count">{dadosGolpeDisponibles}/{dadosGolpeTotal}</span>
              </div>
            </div>
            <span className="cs-header__section-title">Dados de golpe</span>
          </div>

          {/* Clase de armadura + Salvaciones contra muerte */}
          <div className="cs-header__combat-extra">
            <div className="cs-header__cbox">
              <span className="cs-header__cbox-val">{personaje.ca ?? '—'}</span>
              <span className="cs-header__cbox-label">CA</span>
            </div>
            <div className="cs-header__cbox">
              <div className="cs-header__death">
                <div className="cs-header__death-row">
                  <span>Éxitos</span>
                  {[0, 1, 2].map(i => (
                    <button key={i}
                      className={`cs-muerte__circle cs-muerte__circle--exito ${muerte.exitos > i ? 'cs-muerte__circle--on' : ''}`}
                      onClick={() => toggleMuerte('exito')} />
                  ))}
                </div>
                <div className="cs-header__death-row">
                  <span>Fallos</span>
                  {[0, 1, 2].map(i => (
                    <button key={i}
                      className={`cs-muerte__circle cs-muerte__circle--fallo ${muerte.fallos > i ? 'cs-muerte__circle--on' : ''}`}
                      onClick={() => toggleMuerte('fallo')} />
                  ))}
                </div>
              </div>
              <span className="cs-header__cbox-label">Muerte</span>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ Barra de stats rápidos ═══ */}
      <div className="cs-stats-bar">
        <div className="cs-stats-bar__item">
          <span className="cs-stats-bar__val">{fmtM(personaje.bonificadorCompetencia)}</span>
          <span className="cs-stats-bar__label">Bonif. competencia</span>
        </div>
        <div className="cs-stats-bar__item">
          <span className="cs-stats-bar__val">{fmtM(personaje.iniciativa)}</span>
          <span className="cs-stats-bar__label">Iniciativa</span>
        </div>
        <div className="cs-stats-bar__item">
          <span className="cs-stats-bar__val">{personaje.velocidad ?? '—'}</span>
          <span className="cs-stats-bar__label">Velocidad</span>
        </div>
        <div className="cs-stats-bar__item">
          <span className="cs-stats-bar__val">{personaje.percepcionPasiva ?? '—'}</span>
          <span className="cs-stats-bar__label">Percepción pasiva</span>
        </div>
        <button
          type="button"
          className={`cs-stats-bar__item cs-stats-bar__item--insp${inspiracion ? ' cs-stats-bar__item--insp-on' : ''}`}
          onClick={() => setInspiracion(v => !v)}
          aria-pressed={inspiracion}
          title={inspiracion ? 'Gastar inspiración heroica' : 'Ganar inspiración heroica'}
        >
          <span className="cs-stats-bar__val">{inspiracion ? '★' : '☆'}</span>
          <span className="cs-stats-bar__label">Inspiración heroica</span>
        </button>
      </div>

      {/* ═══ Cuerpo principal ═══ */}
      <div className="cs-body">

        {/* ── Izquierda: Características agrupadas (2 cols) ── */}
        <div className="cs-abilities">
          {/* Columna izq: FUE, DES, CON */}
          <div className="cs-abilities__col">
            {renderAbilityGroup('Fuerza')}
            {renderAbilityGroup('Destreza')}
            {renderAbilityGroup('Constitución')}
          </div>
          {/* Columna der: INT, SAB, CAR */}
          <div className="cs-abilities__col">
            {renderAbilityGroup('Inteligencia')}
            {renderAbilityGroup('Sabiduría')}
            {renderAbilityGroup('Carisma')}
          </div>
        </div>

        {/* ── Derecha: Ataques, Rasgos, Equipo ── */}
        <div className="cs-content">

          {/* Armas y trucos de daño */}
          <SheetSection title="Armas y trucos de daño">
            <div className="cs-attacks">
              <div className="cs-attacks__head">
                <span>Nombre</span><span>Bonif. ato./CD</span><span>Daño y tipo</span><span>Notas</span><span className="cs-attacks__head-actions">Acc.</span>
              </div>

              {/* Armas automáticas (del equipo) */}
              {personaje.ataques?.map((atk, i) => {
                const atkKey = atk.key ?? `auto-fallback-${i}`
                const cfg = getCfgAtaque(atkKey)
                const notasAuto = [
                  atk.tipo === 'dist' ? 'A distancia' : 'Cuerpo a cuerpo',
                  atk.propiedades?.length ? `Propiedades: ${atk.propiedades.join(', ')}` : null,
                  (tieneMaestriaArmas && atk.maestria) ? `Maestría: ${atk.maestria}` : null,
                  atk.fuente ? `Fuente: ${atk.fuente}` : null,
                  cfg.descripcion ? `Desc: ${cfg.descripcion}` : null,
                ].filter(Boolean).join(' · ')
                return (
                  <div key={atk.key ?? `a-${i}`} className="cs-attacks__row cs-attacks__row--data">
                    <span className="cs-attacks__cell">{atk.nombre}</span>
                    <span className="cs-attacks__cell cs-attacks__cell--bon">{atk.bonAtaque >= 0 ? `+${atk.bonAtaque}` : atk.bonAtaque}</span>
                    <span className="cs-attacks__cell">{atk.daño}{cfg.tipoDanio ? ` (${cfg.tipoDanio})` : ''}</span>
                    <span className="cs-attacks__cell cs-attacks__cell--notas">
                      {notasAuto}
                    </span>
                    <span className="cs-attacks__cell cs-attacks__cell--actions">
                      <button
                        className="cs-attacks__del"
                        title="Ver/editar descripción"
                        onClick={() => setDetalleAtaqueModal({
                          key: atkKey,
                          nombre: atk.nombre,
                          ataqueLabel: atk.bonAtaque >= 0 ? `+${atk.bonAtaque}` : `${atk.bonAtaque}`,
                          danioLabel: atk.daño,
                          descripcion: cfg.descripcion ?? notasAuto,
                          tipoDanio: cfg.tipoDanio ?? inferirTipoDanio(atk.daño),
                          salvacion: cfg.salvacion ?? null,
                        })}
                      >i</button>
                      <button
                        className="cs-attacks__del"
                        title="Quitar arma de esta hoja"
                        onClick={() => {
                          if (!atk.key) return
                          if (!(ataquesOcultos ?? []).includes(atk.key)) {
                            onAtaquesOcultosCambiar?.([...(ataquesOcultos ?? []), atk.key])
                          }
                        }}
                      >✕</button>
                    </span>
                  </div>
                )
              })}

              {/* Armas/ataques personalizados */}
              {(armasCustom ?? []).map((atk, i) => (
                <div key={atk.id ?? `c-${i}`} className="cs-attacks__row cs-attacks__row--data cs-attacks__row--custom">
                  {(() => {
                    const key = `custom:${atk.id ?? i}`
                    const cfg = getCfgAtaque(key)
                    return (
                      <>
                  <span className="cs-attacks__cell">{atk.nombre}</span>
                  <span className="cs-attacks__cell cs-attacks__cell--bon">{atk.bonAtaque >= 0 ? `+${atk.bonAtaque}` : atk.bonAtaque}</span>
                  <span className="cs-attacks__cell">{atk.daño}{cfg.tipoDanio ? ` (${cfg.tipoDanio})` : ''}</span>
                  <span className="cs-attacks__cell cs-attacks__cell--notas">
                    {[atk.tipoAtaque === 'dist' ? 'A distancia' : 'Cuerpo a cuerpo', atk.alcance ? `Alcance ${atk.alcance}` : null, atk.propiedades?.length ? `Propiedades: ${atk.propiedades.join(', ')}` : null, (atk.usarMaestria && atk.maestria) ? `Maestría: ${atk.maestria}` : null, (cfg.descripcion ?? atk.notas ?? null)].filter(Boolean).join(' · ')}
                  </span>
                  <span className="cs-attacks__cell cs-attacks__cell--actions">
                    <button className="cs-attacks__del" title="Ver/editar descripción" onClick={() => setDetalleAtaqueModal({
                      key,
                      nombre: atk.nombre,
                      ataqueLabel: atk.bonAtaque >= 0 ? `+${atk.bonAtaque}` : `${atk.bonAtaque}`,
                      danioLabel: atk.daño,
                      descripcion: cfg.descripcion ?? atk.notas ?? '',
                      tipoDanio: cfg.tipoDanio ?? inferirTipoDanio(atk.daño),
                      salvacion: cfg.salvacion ?? null,
                    })}>i</button>
                    <button className="cs-attacks__del" title="Editar" onClick={() => setAtaqueModal({ modo: 'editar', idx: i })}>✎</button>
                    <button
                      className="cs-attacks__del"
                      title="Quitar"
                      onClick={() => onArmasCustomCambiar(prev => prev.filter((_, j) => j !== i))}
                    >✕</button>
                  </span>
                      </>
                    )
                  })()}
                </div>
              ))}

              {/* Trucos de daño seleccionados */}
              {personaje.conjuros && trucosSeleccionados
                .filter(nombre => getTrucoNivel0Info(nombre)?.muestraEnTablaAtaques)
                .map(nombre => {
                  const c = CONJUROS[nombre]
                  const trucoInfo = getTrucoNivel0Info(nombre, c)
                  const key = `truco:${nombre}`
                  const cfg = getCfgAtaque(key)
                  const saveBase = inferirSalvacionConjuro(c.descripcion ?? '')
                  const tipoBase = trucoInfo?.tipoDanio ?? inferirTipoDanio(c.descripcion ?? '')
                  const dadoBase = getTrucoDanioEtiqueta({ ...trucoInfo, tipoDanio: null }, personaje.nivel ?? 1)
                  const salvacionMostrada = cfg.salvacion ?? saveBase
                  const tipoDanioMostrado = cfg.tipoDanio ?? tipoBase
                  const danioTrucoMostrado = [dadoBase, tipoDanioMostrado].filter(Boolean).join(' ')
                  const notasTruco = [
                    cfg.descripcion ? cfg.descripcion : c.escuela,
                    salvacionMostrada ? `Salvación: ${CARACTERISTICAS_ABBREV[salvacionMostrada] ?? salvacionMostrada}` : null,
                  ].filter(Boolean).join(' · ')
                  return (
                    <div key={`t-${nombre}`} className="cs-attacks__row cs-attacks__row--data cs-attacks__row--truco">
                      <span className="cs-attacks__cell">✨ {nombre}</span>
                      <span className="cs-attacks__cell cs-attacks__cell--bon">
                        {`+${personaje.conjuros.bonAtaque}`}
                      </span>
                      <span className="cs-attacks__cell cs-attacks__cell--ver">{danioTrucoMostrado || 'Ver desc.'}</span>
                      <span className="cs-attacks__cell cs-attacks__cell--notas">
                        {notasTruco}
                      </span>
                      <span className="cs-attacks__cell cs-attacks__cell--actions">
                        <button className="cs-attacks__del" title="Ver/editar descripción" onClick={() => setDetalleAtaqueModal({
                          key,
                          nombre: `✨ ${nombre}`,
                          ataqueLabel: `+${personaje.conjuros.bonAtaque}`,
                          danioLabel: danioTrucoMostrado || '—',
                          descripcion: cfg.descripcion ?? c.descripcion ?? '',
                          tipoDanio: tipoDanioMostrado,
                          salvacion: salvacionMostrada,
                        })}>i</button>
                      </span>
                    </div>
                  )
                })}

              {/* Filas vacías si no hay nada */}
              {(!personaje.ataques?.length && !(armasCustom ?? []).length && !trucosSeleccionados?.length) && (
                [0, 1, 2].map(i => (
                  <div key={i} className="cs-attacks__row">
                    <span className="cs-attacks__cell" /><span className="cs-attacks__cell" /><span className="cs-attacks__cell" /><span className="cs-attacks__cell" /><span className="cs-attacks__cell" />
                  </div>
                ))
              )}
            </div>

            {ataqueModal && (
              <AtaqueCustomModal
                personaje={personaje}
                inicial={ataqueModal.modo === 'editar' ? armasCustom?.[ataqueModal.idx] : null}
                tieneMaestria={tieneMaestriaArmas}
                onCerrar={() => setAtaqueModal(null)}
                onGuardar={(atk) => {
                  if (ataqueModal.modo === 'editar') {
                    onArmasCustomCambiar(prev => prev.map((a, idx) => idx === ataqueModal.idx ? atk : a))
                  } else {
                    onArmasCustomCambiar(prev => [...(prev ?? []), atk])
                  }
                  setAtaqueModal(null)
                }}
              />
            )}

            {detalleAtaqueModal && (
              <AtaqueDetalleModal
                detalle={detalleAtaqueModal}
                personaje={personaje}
                onCerrar={() => setDetalleAtaqueModal(null)}
                onGuardar={(patch) => {
                  saveCfgAtaque(detalleAtaqueModal.key, patch)
                  setDetalleAtaqueModal(null)
                }}
              />
            )}

            <button className="cs-attacks__add-btn" onClick={() => setAtaqueModal({ modo: 'nuevo' })}>
              + Añadir ataque
            </button>

            {personaje.conjuros && (
              <div className="cs-spell-stats">
                <div className="cs-spell-stat">
                  <span className="cs-spell-stat__val">{CARACTERISTICAS_ABBREV[personaje.conjuros.caracteristica] ?? '—'}</span>
                  <span className="cs-spell-stat__label">Aptitud mágica</span>
                </div>
                <div className="cs-spell-stat">
                  <span className="cs-spell-stat__val">{personaje.conjuros.cdSalvacion}</span>
                  <span className="cs-spell-stat__label">CD salvación</span>
                </div>
                <div className="cs-spell-stat">
                  <span className="cs-spell-stat__val">+{personaje.conjuros.bonAtaque}</span>
                  <span className="cs-spell-stat__label">Bonif. ataque conjuro</span>
                </div>
              </div>
            )}
          </SheetSection>

          {/* Rasgos de clase */}
          <SheetSection title="Rasgos de clase" grow>
            <div className="cs-traits">

              {/* ── Modals ── */}
              {(() => {
                const clase = personaje.clase
                if (!clase?.subclases?.length) return null
                const nivelSub = clase.nivelSubclase ?? 3
                if ((personaje.nivel ?? 1) < nivelSub) return null
                return modalSubclase ? (
                  <SubclaseModal
                    clase={clase}
                    nivelPersonaje={personaje.nivel}
                    seleccionada={subclaseSeleccionada}
                    onConfirmar={(id) => onSubclaseSeleccionar?.(id)}
                    onCerrar={() => setModalSubclase(false)}
                  />
                ) : null
              })()}

              {asiModalNivel !== null && (() => {
                const sinEsteASI = { ...personaje.puntuaciones }
                const esteASI = bonusASI?.[asiModalNivel] ?? {}
                for (const [stat, amt] of Object.entries(esteASI)) {
                  sinEsteASI[stat] = (sinEsteASI[stat] ?? 0) - amt
                }
                const esteDote = dotesElegidos?.[asiModalNivel]
                if (esteDote?.doteId) {
                  const doteObj = getDoteById(esteDote.doteId)
                  if (doteObj) {
                    for (const ef of doteObj.efectos) {
                      if (ef.tipo === 'stat') sinEsteASI[ef.stat] = (sinEsteASI[ef.stat] ?? 0) - ef.valor
                      if (ef.tipo === 'stat-elegir' && esteDote.statElegido)
                        sinEsteASI[esteDote.statElegido] = (sinEsteASI[esteDote.statElegido] ?? 0) - ef.valor
                      if (ef.tipo === 'resiliente' && esteDote.statElegido)
                        sinEsteASI[esteDote.statElegido] = (sinEsteASI[esteDote.statElegido] ?? 0) - 1
                    }
                  }
                }
                const compSinEste = [...(personaje.habilidadesCompetencia ?? [])]
                const periciasSinEste = [...(personaje.habilidadesPericias ?? [])]
                const salvSinEste = [...(personaje.tiradasSalvacionCompetencia ?? [])]
                return (
                  <ASIModal
                    nivel={asiModalNivel}
                    puntuacionesSinEsteASI={sinEsteASI}
                    seleccionActual={bonusASI?.[asiModalNivel] ?? null}
                    doteActual={dotesElegidos?.[asiModalNivel] ?? null}
                    competenciasActuales={compSinEste}
                    periciasActuales={periciasSinEste}
                    salvacionesActuales={salvSinEste}
                    claseInfo={personaje.clase ?? null}
                    onConfirmar={(resultado) => {
                      if (!resultado) {
                        onBonusASICambiar(prev => { const n = {...prev}; delete n[asiModalNivel]; return n })
                        onDotesElegidosCambiar(prev => { const n = {...prev}; delete n[asiModalNivel]; return n })
                      } else if (resultado.tipo === 'asi') {
                        onBonusASICambiar(prev => ({ ...prev, [asiModalNivel]: resultado.selec }))
                        onDotesElegidosCambiar(prev => { const n = {...prev}; delete n[asiModalNivel]; return n })
                      } else if (resultado.tipo === 'dote') {
                        onDotesElegidosCambiar(prev => ({ ...prev, [asiModalNivel]: {
                          doteId: resultado.doteId,
                          statElegido: resultado.statElegido ?? null,
                          skillsElegidos: resultado.skillsElegidos ?? [],
                          skillOPericiaElegido: resultado.skillOPericiaElegido ?? null,
                          periciasElegidas: resultado.periciasElegidas ?? [],
                        }}))
                        onBonusASICambiar(prev => { const n = {...prev}; delete n[asiModalNivel]; return n })
                      }
                    }}
                    onCerrar={() => setAsiModalNivel(null)}
                  />
                )
              })()}

              <div className="cs-traits__top">
                {(subclaseDisponible && !subclaseActual) || asiPendientes.length > 0 ? (
                  <div className="cs-traits__top-actions">
                    {subclaseDisponible && !subclaseActual && (
                      <button className="cs-traits__action-btn" onClick={() => setModalSubclase(true)}>
                        Elegir subclase
                      </button>
                    )}
                    {asiPendientes.map(nivelASI => (
                      <button key={nivelASI} className="cs-traits__action-btn" onClick={() => setAsiModalNivel(nivelASI)}>
                        Configurar ASI Niv. {nivelASI}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* ── Especie ── */}
              {(personaje.especie?.rasgosDestacados?.length > 0 || personaje.especie?.linajeSel || personaje.habilidadDiestro || personaje.habilidadSentidos) && (
                <div className="cs-traits__group">
                  <div className="cs-traits__group-header">Especie — {personaje.especie?.nombre}</div>

                  {personaje.especie?.rasgosDestacados?.map((r, i) => {
                    const splitIndex = r.indexOf(':')
                    const nombreRasgo = splitIndex > -1 ? r.slice(0, splitIndex).trim() : r
                    const descRasgo = splitIndex > -1 ? r.slice(splitIndex + 1).trim() : ''
                    return (
                      <div key={i} className="cs-traits__entry">
                        <TraitEntryLine
                          nivel={1}
                          nombre={nombreRasgo}
                          fuente={personaje.especie?.nombre ?? 'Especie'}
                        />
                        <TraitDetailToggle texto={descRasgo} />
                      </div>
                    )
                  })}

                  {personaje.habilidadDiestro && (
                    <div className="cs-traits__entry">
                      <TraitEntryLine
                        nivel={1}
                        nombre="Diestro"
                        fuente={personaje.especie?.nombre ?? 'Especie'}
                      />
                      <TraitDetailToggle texto={`Competencia en ${personaje.habilidadDiestro}`} />
                    </div>
                  )}

                  {personaje.habilidadSentidos && (
                    <div className="cs-traits__entry">
                      <TraitEntryLine
                        nivel={1}
                        nombre="Sentidos agudos"
                        fuente={personaje.especie?.nombre ?? 'Especie'}
                      />
                      <TraitDetailToggle texto={`Competencia en ${personaje.habilidadSentidos}`} />
                    </div>
                  )}

                  {personaje.especie?.linajeSel && (
                    <div className="cs-traits__entry">
                      <TraitEntryLine
                        nivel={1}
                        nombre={personaje.especie.linajeSel.nombre}
                        fuente={`Linaje (${personaje.especie?.nombre ?? 'Especie'})`}
                      />
                      <TraitDetailToggle texto={personaje.especie.linajeSel.desc} />
                      {personaje.especie.linajeSel.rasgos?.map((r, i) => (
                        <div key={i} className="cs-traits__subentry">
                          <TraitEntryLine
                            nivel={r.nivel ?? 1}
                            nombre={r.nombre}
                            fuente={personaje.especie.linajeSel.nombre}
                          />
                          <TraitDetailToggle texto={r.desc} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── Trasfondo ── */}
              {personaje.dote && (
                <div className="cs-traits__group">
                  <div className="cs-traits__group-header">Trasfondo — {personaje.trasfondo?.nombre}</div>
                  <div className="cs-traits__entry">
                    <TraitEntryLine
                      nivel={1}
                      nombre={personaje.dote}
                      fuente={personaje.trasfondo?.nombre ?? 'Trasfondo'}
                      nota="Dote"
                    />
                    <TraitDetailToggle texto={doteTrasfondoDesc} />
                  </div>
                </div>
              )}

              {/* ── Clase ── */}
              {personaje.rasgosClase?.length > 0 ? (
                <div className="cs-traits__group">
                  <div className="cs-traits__group-header">Clase — {personaje.clase?.nombre}</div>
                  {personaje.rasgosClase.map((r, i) => {
                    const isRegularASI = r.esASI && !r.esDonEpico
                    const isDonEpico = r.esASI && r.esDonEpico
                    const asiActual = isRegularASI ? (bonusASI?.[r.nivelObtenido] ?? null) : null
                    const doteActualNivel = isRegularASI ? (dotesElegidos?.[r.nivelObtenido] ?? null) : null
                    const doteActualObj = doteActualNivel ? getDoteById(doteActualNivel.doteId) : null
                    const asiResumen = asiActual
                      ? Object.entries(asiActual).map(([s, a]) => `+${a} ${CARACTERISTICAS_ABBREV[s]}`).join(', ')
                      : null
                    const isConfigurado = !!(asiActual || doteActualObj)
                    const nota = isRegularASI ? 'ASI' : isDonEpico ? 'Don Épico' : r.esSubclase ? 'Subclase' : ''

                    return (
                      <div key={i} className="cs-traits__entry">
                        <TraitEntryLine
                          nivel={r.nivelObtenido}
                          nombre={r.nombre}
                          fuente={personaje.clase?.nombre ?? 'Clase'}
                          nota={nota}
                        />
                        <TraitDetailToggle texto={r.desc} />

                        {isRegularASI && (
                          <div className="cs-traits__asi-row">
                            {doteActualObj ? (
                              <span className="cs-traits__asi-summary">
                                {doteActualObj.nombre}
                                {doteActualNivel.statElegido ? ` (+1 ${CARACTERISTICAS_ABBREV[doteActualNivel.statElegido]})` : ''}
                              </span>
                            ) : asiResumen ? (
                              <span className="cs-traits__asi-summary">{asiResumen}</span>
                            ) : null}
                            <button
                              className={`cs-traits__asi-btn${isConfigurado ? ' cs-traits__asi-btn--done' : ''}`}
                              onClick={() => setAsiModalNivel(r.nivelObtenido)}
                            >
                              {isConfigurado ? 'Editar' : 'Configurar'}
                            </button>
                          </div>
                        )}

                        {isDonEpico && (
                          <div className="cs-traits__desc" style={{ fontStyle: 'italic', opacity: 0.6 }}>Próximamente.</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : personaje.clase ? (
                <div className="cs-traits__group">
                  <div className="cs-traits__group-header">Clase — {personaje.clase.nombre}</div>
                  <div className="cs-traits__entry">
                    <TraitEntryLine nivel={1} nombre="Rasgos iniciales" fuente={personaje.clase.nombre} />
                    <TraitDetailToggle texto={`${personaje.clase.dadoGolpe} · ${personaje.clase.rol}`} />
                  </div>
                </div>
              ) : null}

              {/* ── Subclase ── */}
              {(() => {
                const clase = personaje.clase
                if (!clase?.subclases?.length) return null
                const nivelSub = clase.nivelSubclase ?? 3
                if ((personaje.nivel ?? 1) < nivelSub) return null
                const scActual = clase.subclases.find(s => s.id === subclaseSeleccionada)

                return (
                  <div className="cs-traits__group">
                    <div className="cs-traits__group-header">Subclase{scActual ? ` — ${scActual.nombre}` : ''}</div>

                    {!scActual && (
                      <div className="cs-traits__entry">
                        <TraitEntryLine
                          nivel={nivelSub}
                          nombre="Elegir subclase"
                          fuente={clase.nombre}
                          nota="Pendiente"
                        />
                      </div>
                    )}

                    {scActual?.rasgosNivel && Object.entries(scActual.rasgosNivel)
                      .filter(([n]) => Number(n) <= (personaje.nivel ?? 1))
                      .map(([n, rasgos]) => (
                        <div key={n} className="cs-traits__level">
                          {rasgos.map((r, i) => (
                            <div key={i} className="cs-traits__entry">
                              <TraitEntryLine
                                nivel={Number(n)}
                                nombre={r.nombre}
                                fuente={scActual.nombre}
                              />
                              <TraitDetailToggle texto={r.desc} />
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                )
              })()}

              {!personaje.clase && !personaje.dote && !personaje.especie?.rasgosDestacados?.length && (
                <em className="cs-empty">Sin datos aún</em>
              )}
            </div>
          </SheetSection>

          {/* Atributos de especie + Dotes (lado a lado como en la hoja) */}
          <div className="cs-pair cs-pair--gap">
            <SheetSection title="Atributos de especie">
              {(personaje.especie?.rasgosDestacados?.length > 0 || personaje.especie?.linajeSel || personaje.habilidadDiestro || personaje.habilidadSentidos) ? (
                <div className="cs-mini-traits">
                  {personaje.especie?.rasgosDestacados?.map((r, i) => (
                    <div key={i} className="cs-mini-traits__item">{r}</div>
                  ))}
                  {personaje.habilidadDiestro && <div className="cs-mini-traits__item">Diestro: {personaje.habilidadDiestro}</div>}
                  {personaje.habilidadSentidos && <div className="cs-mini-traits__item">Sentidos agudos: {personaje.habilidadSentidos}</div>}
                  {personaje.especie?.linajeSel && (
                    <div className="cs-mini-traits__item">
                      <strong>{personaje.especie.linajeSel.nombre}</strong>
                      {personaje.especie.linajeSel.tipoDano && ` (${personaje.especie.linajeSel.tipoDano})`}
                    </div>
                  )}
                </div>
              ) : <em className="cs-empty">—</em>}
            </SheetSection>
            <SheetSection title="Dotes">
              {modalDoteLibreAbierto && (
                <DoteLibreModal
                  nivel={personaje.nivel}
                  puntuaciones={personaje.puntuaciones}
                  claseInfo={personaje.clase}
                  dotesExistentes={dotesLibresIds}
                  competenciasActuales={personaje.habilidadesCompetencia}
                  periciasActuales={personaje.habilidadesPericias}
                  salvacionesActuales={personaje.tiradasSalvacionCompetencia}
                  onConfirmar={(data) => onDotesLibresCambiar(prev => [...(prev ?? []), data])}
                  onCerrar={() => setModalDoteLibreAbierto(false)}
                />
              )}
              {(personaje.dote || dotesPorASI.length > 0 || dotesLibresResueltas.length > 0) ? (
                <div className="cs-mini-traits">
                  {personaje.dote && (
                    <div className="cs-mini-traits__item"><strong>{personaje.dote}</strong> <em>({personaje.trasfondo?.nombre})</em></div>
                  )}
                  {dotesPorASI.map(d => (
                    <div key={d.id} className="cs-mini-traits__item">
                      <strong>{d.nombre}</strong> <em>({d.fuente}{d.detalle ? ` · ${d.detalle}` : ''})</em>
                    </div>
                  ))}
                  {dotesLibresResueltas.map(d => (
                    <div key={`${d.id}-${d.idx}`} className="cs-mini-traits__item cs-mini-traits__item--editable">
                      <span>
                        <strong>{d.nombre}</strong>
                        {d.detalle && <em> · {d.detalle}</em>}
                        {' '}<em>(Manual)</em>
                      </span>
                      <button
                        className="cs-mini-traits__del"
                        title="Quitar dote"
                        onClick={() => onDotesLibresCambiar(prev => (prev ?? []).filter((_, i) => i !== d.idx))}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ) : <em className="cs-empty">—</em>}

              <div className="cs-dotes-libres-add">
                <button className="cs-attacks__add-btn" onClick={() => setModalDoteLibreAbierto(true)}>
                  + Añadir dote
                </button>
              </div>
            </SheetSection>
          </div>

          {/* Equipo */}
          <SheetSection title="Equipo">
            {personaje.equipoResuelto?.length > 0 && (
              <ul className="cs-equipo">
                {personaje.equipoResuelto.map((item, i) => {
                  const esExtra = item.fuente === 'Extra'
                  return (
                    <li key={item.key ?? i} className="cs-equipo__item">
                      <span className={`cs-equipo__tag cs-equipo__tag--${
                        item.fuente === personaje.clase?.nombre ? 'clase'
                        : item.fuente === personaje.trasfondo?.nombre ? 'trasfondo'
                        : item.fuente === 'Bagatela' ? 'bagatela'
                        : 'extra'
                      }`}>{item.fuente}</span>
                      <span className="cs-equipo__texto">{item.texto}</span>
                      <button
                        className="cs-equipo__del"
                        title="Quitar"
                        onClick={() => {
                          if (esExtra) {
                            const idx = (equipoState.extras ?? []).indexOf(item.texto)
                            if (idx === -1) return
                            onEquipoCambiar(prev => ({
                              ...prev,
                              extras: prev.extras.filter((_, j) => j !== idx),
                            }))
                            return
                          }
                          if (item.key && !(itemsOcultos ?? []).includes(item.key)) {
                            onItemsOcultosCambiar?.([...(itemsOcultos ?? []), item.key])
                          }
                        }}
                      >✕</button>
                    </li>
                  )
                })}
              </ul>
            )}
            {(!personaje.equipoResuelto || personaje.equipoResuelto.length === 0) && (
              <em className="cs-empty">Selecciona equipo en el Paso 5</em>
            )}
            <EquipoInlineAdd onAñadir={(texto) => {
              onEquipoCambiar(prev => ({
                ...prev,
                extras: [...(prev.extras ?? []), texto],
              }))
            }} />
          </SheetSection>
        </div>
      </div>

      {/* ═══ Pie: Competencias + Monedas ═══ */}
      <div className="cs-footer-row">
        <SheetSection title="Entrenamiento y competencias con equipo" grow>
          <div className="cs-prof-text">
            {personaje.competenciasArmaduras?.length > 0 && (
              <p><strong>Armaduras:</strong> {personaje.competenciasArmaduras.join(', ')}</p>
            )}
            {personaje.competenciasArmas?.length > 0 && (
              <p><strong>Armas:</strong> {personaje.competenciasArmas.join(', ')}</p>
            )}
            {personaje.competenciasHerramientas?.length > 0 && (
              <p><strong>Herramientas:</strong> {personaje.competenciasHerramientas.join(', ')}</p>
            )}
            {personaje.idiomas?.length > 0 && (
              <p><strong>Idiomas:</strong> {personaje.idiomas.join(', ')}</p>
            )}
            {!personaje.competenciasArmaduras?.length &&
             !personaje.competenciasHerramientas?.length &&
             !personaje.idiomas?.length && (
              <em className="cs-empty">Sin datos</em>
            )}
          </div>
        </SheetSection>
        <div className="cs-monedas-section">
          <div className="cs-sec__title">Monedas</div>
          <div className="cs-monedas">
            {['PC', 'PP', 'PE', 'PO', 'PA'].map(m => (
              <div key={m} className="cs-moneda">
                <input
                  className="cs-moneda__input"
                  type="number"
                  min={0}
                  value={monedas?.[m] ?? 0}
                  onChange={e => onMonedasCambiar(prev => ({ ...prev, [m]: Math.max(0, Number(e.target.value) || 0) }))}
                />
                <span className="cs-moneda__label">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personalidad (compacto) */}
      <div className="cs-personality-row">
        {[
          { key: 'rasgos',  label: 'Rasgos de personalidad' },
          { key: 'ideal',   label: 'Ideales' },
          { key: 'vinculo', label: 'Vínculos' },
          { key: 'defecto', label: 'Defectos' },
        ].map(({ key, label }) => (
          <div key={key} className="cs-personality-item">
            <textarea
              className="cs-field__textarea cs-field__textarea--personality"
              value={personaje.personalidad?.[key] || ''}
              onChange={e => onPersonalidadCambiar(key, e.target.value)}
              placeholder={`${label}…`}
              rows={2}
            />
            <span className="cs-personality-item__label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Hoja 2 ───────────────────────────────────────────────────────────

function Hoja2({ personaje, hoja2, onHoja2Cambiar, onAparienciaCambiar }) {
  const apariencia = personaje.apariencia ?? {}

  const updateHoja2 = (key, val) => onHoja2Cambiar(prev => ({ ...prev, [key]: val }))

  return (
    <div className="cs-hoja cs-hoja--2">
      <div className="cs-hoja2-grid">

        {/* ── Columna izquierda: retrato + apariencia ── */}
        <div className="cs-hoja2-left">

          {/* Retrato */}
          <div className="cs-portrait">
            <span className="cs-portrait__text">Retrato del personaje</span>
          </div>

          {/* Datos físicos — editables */}
          <div className="cs-sec">
            <div className="cs-sec__title">Apariencia física</div>
            <div className="cs-sec__body">
              <div className="cs-apariencia-grid">
                {CAMPOS_APARIENCIA.filter(c => c.id !== 'otros').map(({ id, label }) => (
                  <div key={id} className="cs-apariencia-item cs-apariencia-item--editable">
                    <input
                      className="cs-apariencia-item__input"
                      value={apariencia[id] || ''}
                      onChange={e => onAparienciaCambiar(id, e.target.value)}
                      placeholder="—"
                    />
                    <span className="cs-apariencia-item__label">{label}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '10px' }}>
                <EditableField
                  label="Descripción de apariencia"
                  value={hoja2.descApariencia}
                  onChange={v => updateHoja2('descApariencia', v)}
                  multiline
                  rows={4}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Columna derecha: historia + aliados + rasgos + tesoro ── */}
        <div className="cs-hoja2-right">

          <div className="cs-sec cs-sec--grow">
            <div className="cs-sec__title">Historia del personaje</div>
            <div className="cs-sec__body">
              <textarea
                className="cs-field__textarea cs-field__textarea--tall"
                value={hoja2.historia}
                onChange={e => updateHoja2('historia', e.target.value)}
                placeholder="Escribe la historia y trasfondo de tu personaje…"
                rows={8}
              />
            </div>
          </div>

          <div className="cs-sec">
            <div className="cs-sec__title">Aliados y organizaciones</div>
            <div className="cs-sec__body cs-aliados">
              <input
                className="cs-field__input"
                placeholder="Nombre de la organización…"
                value={hoja2.orgNombre}
                onChange={e => updateHoja2('orgNombre', e.target.value)}
              />
              <div className="cs-aliados__simbolo">Símbolo</div>
              <textarea
                className="cs-field__textarea"
                placeholder="Describe tus aliados y tu relación con ellos…"
                value={hoja2.aliados}
                onChange={e => updateHoja2('aliados', e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <div className="cs-sec">
            <div className="cs-sec__title">Rasgos y capacidades adicionales</div>
            <div className="cs-sec__body">
              <textarea
                className="cs-field__textarea"
                placeholder="Anota rasgos de clase, dotes, capacidades especiales…"
                value={hoja2.rasgosAdicionales}
                onChange={e => updateHoja2('rasgosAdicionales', e.target.value)}
                rows={5}
              />
            </div>
          </div>

          <div className="cs-sec">
            <div className="cs-sec__title">Tesoro</div>
            <div className="cs-sec__body">
              <textarea
                className="cs-field__textarea"
                placeholder="Objetos de valor, reliquias, notas sobre equipamiento especial…"
                value={hoja2.tesoro}
                onChange={e => updateHoja2('tesoro', e.target.value)}
                rows={4}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Hoja 3: Conjuros ─────────────────────────────────────────────────

const NIVELES_CONJURO = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const ESCUELAS_COLOR = {
  'Abjuración':    '#4a90d9',
  'Adivinación':   '#9b59b6',
  'Conjuración':   '#27ae60',
  'Encantamiento': '#e91e8c',
  'Evocación':     '#e74c3c',
  'Ilusionismo':   '#3498db',
  'Nigromancia':   '#7f8c8d',
  'Transmutación': '#e67e22',
}

function EtiquetaEscuela({ escuela }) {
  const color = ESCUELAS_COLOR[escuela] ?? '#888'
  return (
    <span className="conj-escuela" style={{ '--escuela-color': color }}>
      {escuela}
    </span>
  )
}

function EtiquetaTruco({ info }) {
  if (!info) return null
  return (
    <span className={`conj-truco-tag${info.esDeDanio ? ' conj-truco-tag--danio' : ''}`}>
      {info.esDeDanio ? 'Daño' : 'Utilidad'}
    </span>
  )
}

function MetaTrucoCompacta({ info }) {
  if (!info) return null
  return (
    <span className="conj-truco-meta">
      {info.esDeDanio ? info.resumenCorto : 'Sin daño directo'}
    </span>
  )
}

function ConjuroDetalle({ conjuro, nombre, onCerrar }) {
  if (!conjuro) return null
  const trucoInfo = getTrucoNivel0Info(nombre, conjuro)
  return (
    <div className="conj-detalle-overlay" onClick={onCerrar}>
      <div className="conj-detalle" onClick={e => e.stopPropagation()}>
        <button className="conj-detalle__close" onClick={onCerrar}>✕</button>
        <div className="conj-detalle__head">
          <h3 className="conj-detalle__nombre">{nombre}</h3>
          <div className="conj-detalle__meta">
            <EtiquetaEscuela escuela={conjuro.escuela} />
            <span className="conj-detalle__nivel">
              {conjuro.nivel === 0 ? 'Truco' : `Nivel ${conjuro.nivel}`}
            </span>
            {trucoInfo ? <EtiquetaTruco info={trucoInfo} /> : null}
          </div>
        </div>
        {trucoInfo ? (
          <div className="conj-detalle__cantrip-box">
            <div className="conj-detalle__cantrip-row">
              <span className="conj-detalle__stat-lbl">Clasificación</span>
              <span>{trucoInfo.esDeDanio ? (trucoInfo.modoDanio === 'arma' ? 'Truco de daño con arma' : 'Truco de daño directo') : 'Truco sin daño directo'}</span>
            </div>
            {trucoInfo.esDeDanio ? (
              <>
                <div className="conj-detalle__cantrip-row">
                  <span className="conj-detalle__stat-lbl">Daño</span>
                  <span>{getTrucoDanioEtiqueta(trucoInfo, 1) ?? trucoInfo.resumenDanio ?? 'Ver descripción'}</span>
                </div>
                {trucoInfo.resumenEscalado ? (
                  <div className="conj-detalle__cantrip-row conj-detalle__cantrip-row--stacked">
                    <span className="conj-detalle__stat-lbl">Escalado</span>
                    <span>{trucoInfo.resumenEscalado}</span>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        ) : null}
        <div className="conj-detalle__stats">
          <div className="conj-detalle__stat"><span className="conj-detalle__stat-lbl">Tiempo</span><span>{conjuro.tiempoLanzamiento}</span></div>
          <div className="conj-detalle__stat"><span className="conj-detalle__stat-lbl">Alcance</span><span>{conjuro.alcance}</span></div>
          <div className="conj-detalle__stat"><span className="conj-detalle__stat-lbl">Componentes</span><span>{conjuro.componentes}</span></div>
          <div className="conj-detalle__stat"><span className="conj-detalle__stat-lbl">Duración</span><span>{conjuro.duracion}</span></div>
        </div>
        <p className="conj-detalle__desc">{conjuro.descripcion}</p>
      </div>
    </div>
  )
}

function PickerModal({ titulo, lista, grupos, seleccionados, seleccionadosTodos, max, noLimite, onToggle, onCerrar }) {
  const [busqueda, setBusqueda] = useState('')
  const [detalleNombre, setDetalleNombre] = useState(null)

  const globalTodos = seleccionadosTodos ?? seleccionados
  const busq = busqueda.trim().toLowerCase()

  const renderItem = (nombre) => {
    const c = CONJUROS[nombre]
    const trucoInfo = getTrucoNivel0Info(nombre, c)
    const sel = seleccionados.includes(nombre)
    const lleno = !sel && !noLimite && globalTodos.length >= max
    return (
      <div key={nombre} className={`conj-picker__item${sel ? ' conj-picker__item--sel' : ''}${lleno ? ' conj-picker__item--lleno' : ''}`}>
        <button className="conj-picker__item-btn" disabled={lleno} onClick={() => onToggle(nombre)}>
          <span className={`conj-picker__check${sel ? ' conj-picker__check--on' : ''}`}>{sel ? '✓' : '+'}</span>
          <span className="conj-picker__item-main">
            <span className="conj-picker__item-nombre">{nombre}</span>
            {trucoInfo ? <MetaTrucoCompacta info={trucoInfo} /> : null}
          </span>
          {c && <EtiquetaEscuela escuela={c.escuela} />}
          {trucoInfo ? <EtiquetaTruco info={trucoInfo} /> : null}
        </button>
        <button className="conj-picker__info" onClick={() => setDetalleNombre(nombre)} title="Ver descripción">ℹ</button>
      </div>
    )
  }

  let contenidoLista
  let hayResultados = false

  if (grupos) {
    const gruposEntries = Object.entries(grupos)
    contenidoLista = gruposEntries.map(([grupo, items]) => {
      const filtrados = busq ? items.filter(n => n.toLowerCase().includes(busq)) : items
      if (filtrados.length === 0) return null
      hayResultados = true
      const nivel = Number(grupo)
      return (
        <div key={grupo} className="conj-picker__grupo">
          <div className="conj-picker__grupo-head">{Number.isNaN(nivel) ? grupo : `Nivel ${nivel}`}</div>
          {filtrados.map(renderItem)}
        </div>
      )
    })
  } else {
    const filtrados = busq ? lista.filter(n => n.toLowerCase().includes(busq)) : lista
    hayResultados = filtrados.length > 0
    contenidoLista = filtrados.map(renderItem)
  }

  return (
    <div className="conj-picker-overlay" onClick={onCerrar}>
      <div className="conj-picker" onClick={e => e.stopPropagation()}>
        <div className="conj-picker__head">
          <h3 className="conj-picker__titulo">{titulo}</h3>
          <span className="conj-picker__contador">
            {noLimite ? `${globalTodos.length} conjuros` : `${globalTodos.length}/${max}`}
          </span>
          <button className="conj-picker__close" onClick={onCerrar}>✕</button>
        </div>
        <input
          className="conj-picker__busqueda"
          placeholder="Buscar conjuro…"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          autoFocus
        />
        <div className="conj-picker__lista">
          {contenidoLista}
          {!hayResultados && (
            <p className="conj-picker__empty">No hay conjuros que coincidan.</p>
          )}
        </div>
        {detalleNombre && (
          <ConjuroDetalle
            nombre={detalleNombre}
            conjuro={CONJUROS[detalleNombre]}
            onCerrar={() => setDetalleNombre(null)}
          />
        )}
      </div>
    </div>
  )
}

function Hoja3({ personaje, trucosSeleccionados, onTrucosCambiar, grimorioConjuros, onGrimorioCambiar, conjurosSeleccionados, onConjurosCambiar, espaciosUsados, onEspaciosUsadosCambiar }) {
  const [picker, setPicker] = useState(null) // { tipo: 'truco'|'conjuro'|'grimorio' }
  const [detalleNombre, setDetalleNombre] = useState(null)

  const conj = personaje.conjuros
  if (!conj) {
    return (
      <div className="cs-hoja cs-hoja--3">
        <div className="conj-no-magia">
          <span className="conj-no-magia__icon">🚫</span>
          <p>La clase <strong>{personaje.clase?.nombre ?? 'seleccionada'}</strong> no tiene lanzamiento de conjuros.</p>
        </div>
      </div>
    )
  }

  const claseId = personaje.clase?.id
  const tipoPrep = conj.tipoPreparacion // 'lista_completa' | 'grimorio' | 'tabla'

  // Conjuros siempre preparados (subclase)
  const siemprePrepSet = new Set(conj.siemprePreparados ?? [])
  const siemprePrep = [...siemprePrepSet]
  const siemprePrepPorNivel = {}
  for (const nombre of siemprePrep) {
    const nv = CONJUROS[nombre]?.nivel ?? 0
    if (nv >= 1) {
      ;(siemprePrepPorNivel[nv] ??= []).push(nombre)
    }
  }

  // Filtrar CONJUROS por clase
  const conjurosDeLaClase = Object.entries(CONJUROS)
    .filter(([, c]) => c.clases?.includes(claseId))
    .sort(([a], [b]) => a.localeCompare(b, 'es'))

  const trucosDeLaClase = conjurosDeLaClase.filter(([, c]) => c.nivel === 0).map(([n]) => n)
  const trucosDeDanioDeLaClase = trucosDeLaClase.filter(nombre => getTrucoNivel0Info(nombre)?.esDeDanio)
  const trucosSinDanioDeLaClase = trucosDeLaClase.filter(nombre => !getTrucoNivel0Info(nombre)?.esDeDanio)
  const trucosSeleccionadosDeDanio = trucosSeleccionados.filter(nombre => getTrucoNivel0Info(nombre)?.esDeDanio)
  const trucosSeleccionadosSinDanio = trucosSeleccionados.filter(nombre => !getTrucoNivel0Info(nombre)?.esDeDanio)

  // Conjuros por nivel (1-9), hasta nivelMax
  const nivelMax = conj.nivelMaxConjuro ?? 0
  const conjurosPorNivel = {}
  for (let nv = 1; nv <= nivelMax; nv++) {
    conjurosPorNivel[nv] = conjurosDeLaClase
      .filter(([, c]) => c.nivel === nv)
      .map(([n]) => n)
  }

  // ── Pool de conjuros disponibles para preparar ──
  // lista_completa: TODOS los de la clase → preparar directamente
  // grimorio: solo los del grimorio → preparar desde ahí
  // tabla: elegir preparados directamente de la lista (sin paso intermedio)
  let poolParaPreparar // { nivel: [nombres] }
  let etiquetaPool = ''

  if (tipoPrep === 'lista_completa') {
    poolParaPreparar = conjurosPorNivel
    etiquetaPool = `Acceso a toda la lista de ${personaje.clase?.nombre ?? 'clase'}`
  } else if (tipoPrep === 'grimorio') {
    // Grimorio: solo se puede preparar lo que está en el libro
    const grimPorNivel = {}
    for (let nv = 1; nv <= nivelMax; nv++) {
      grimPorNivel[nv] = grimorioConjuros.filter(n => CONJUROS[n]?.nivel === nv)
    }
    poolParaPreparar = grimPorNivel
    etiquetaPool = `Grimorio: ${grimorioConjuros.length} conjuros (recomendado: ${conj.grimorioMax})`
  } else {
    // tabla: elegir preparados directamente de la lista de clase
    poolParaPreparar = conjurosPorNivel
    etiquetaPool = ''
  }

  // Excluir conjuros siempre-preparados del pool del picker (no deben seleccionarse)
  if (siemprePrepSet.size > 0 && poolParaPreparar) {
    const filtrado = {}
    for (const [nv, lista] of Object.entries(poolParaPreparar)) {
      filtrado[nv] = lista.filter(n => !siemprePrepSet.has(n))
    }
    poolParaPreparar = filtrado
  }

  // Conjuros preparados por nivel
  const preparadosPorNivel = {}
  for (let nv = 1; nv <= 9; nv++) {
    preparadosPorNivel[nv] = conjurosSeleccionados.filter(n => CONJUROS[n]?.nivel === nv)
  }

  // Conjuros del grimorio por nivel (para mostrar en sección)
  const grimorioPorNivel = {}
  if (tipoPrep === 'grimorio') {
    for (let nv = 1; nv <= nivelMax; nv++) {
      grimorioPorNivel[nv] = grimorioConjuros.filter(n => CONJUROS[n]?.nivel === nv)
    }
  }

  const toggleTruco = (nombre) => {
    onTrucosCambiar(prev =>
      prev.includes(nombre) ? prev.filter(n => n !== nombre) : [...prev, nombre]
    )
  }

  const toggleConjuro = (nombre) => {
    onConjurosCambiar(prev =>
      prev.includes(nombre) ? prev.filter(n => n !== nombre) : [...prev, nombre]
    )
  }

  const toggleGrimorio = (nombre) => {
    onGrimorioCambiar(prev => {
      if (prev.includes(nombre)) {
        // Al quitar del grimorio, también quitar de preparados
        onConjurosCambiar(p => p.filter(n => n !== nombre))
        return prev.filter(n => n !== nombre)
      }
      return [...prev, nombre]
    })
  }

  // ── Slot tracking ──────────────────────────────────────────────────
  const toggleSlotUsado = (nivelKey, slotIndex, totalSlots) => {
    onEspaciosUsadosCambiar(prev => {
      const usados = prev[nivelKey] ?? 0
      const estaUsado = slotIndex < usados
      const nuevoUsados = estaUsado ? slotIndex : Math.min(slotIndex + 1, totalSlots)
      return { ...prev, [nivelKey]: nuevoUsados }
    })
  }

  const recuperarTodo = () => onEspaciosUsadosCambiar({})
  const recuperarPacto = () => onEspaciosUsadosCambiar(prev => {
    const copia = { ...prev }
    delete copia['pacto']
    return copia
  })

  const espacios = conj.espacios
  const esPacto = conj.tipo === 'pacto'

  return (
    <div className="cs-hoja cs-hoja--3">

      {/* ── Cabecera conjuros ── */}
      <div className="conj-header">
        <div className="conj-stat">
          <span className="conj-stat__val">{CARACTERISTICAS_ABBREV[conj.caracteristica] ?? '—'}</span>
          <span className="conj-stat__lbl">Aptitud mágica</span>
        </div>
        <div className="conj-stat">
          <span className="conj-stat__val">{conj.cdSalvacion}</span>
          <span className="conj-stat__lbl">CD salvación</span>
        </div>
        <div className="conj-stat">
          <span className="conj-stat__val">+{conj.bonAtaque}</span>
          <span className="conj-stat__lbl">Bon. ataque</span>
        </div>
        {conj.preparadosMax > 0 && (
          <div className={`conj-stat${conjurosSeleccionados.length >= conj.preparadosMax ? ' conj-stat--lleno' : ''}`}>
            <span className="conj-stat__val">{conjurosSeleccionados.length} / {conj.preparadosMax}</span>
            <span className="conj-stat__lbl">Preparados</span>
          </div>
        )}
        {siemprePrep.length > 0 && (
          <div className="conj-stat conj-stat--bonus">
            <span className="conj-stat__val">+{siemprePrep.length}</span>
            <span className="conj-stat__lbl">Subclase</span>
          </div>
        )}
        {esPacto && espacios && (
          <div className="conj-stat conj-stat--pacto">
            <span className="conj-stat__val">{espacios.cantidad} <small>(Nv{espacios.nivel})</small></span>
            <span className="conj-stat__lbl">Espacios del pacto</span>
          </div>
        )}
        <div className="conj-recovery-btns">
          <button className="conj-recovery-btn" onClick={recuperarTodo} title="Recuperar todos los espacios de conjuro">
            🌙 Descanso largo
          </button>
          {esPacto && (
            <button className="conj-recovery-btn conj-recovery-btn--corto" onClick={recuperarPacto} title="Recuperar espacios del pacto">
              ☽ Descanso corto
            </button>
          )}
        </div>
      </div>

      {/* ── Tabla de espacios interactiva (solo no-pacto) ── */}
      {!esPacto && espacios && (
        <div className="conj-espacios-tabla">
          {espacios.map((cant, i) => {
            if (cant === 0) return null
            const nivelKey = i + 1
            const usados = espaciosUsados[nivelKey] ?? 0
            const disponibles = cant - usados
            return (
              <div key={i} className="conj-espacio-col">
                <div className="conj-espacio-col__nivel">Nv {nivelKey}</div>
                <div className="conj-espacio-col__bubbles">
                  {Array.from({ length: cant }).map((_, bi) => {
                    const usado = bi < usados
                    return (
                      <span
                        key={bi}
                        className={`conj-espacio-bubble conj-espacio-bubble--click${usado ? ' conj-espacio-bubble--usado' : ''}`}
                        title={usado ? 'Clic para recuperar' : 'Clic para gastar'}
                        onClick={() => toggleSlotUsado(nivelKey, bi, cant)}
                      />
                    )
                  })}
                </div>
                <div className="conj-espacio-col__cant">
                  <span className={disponibles === 0 ? 'conj-espacio-col__cant--agotado' : ''}>{disponibles}/{cant}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Espacios del pacto interactivos (brujo) */}
      {esPacto && espacios && (
        <div className="conj-espacios-tabla">
          <div className="conj-espacio-col">
            <div className="conj-espacio-col__nivel">Nv {espacios.nivel}</div>
            <div className="conj-espacio-col__bubbles">
              {Array.from({ length: espacios.cantidad }).map((_, bi) => {
                const usado = bi < (espaciosUsados['pacto'] ?? 0)
                return (
                  <span
                    key={bi}
                    className={`conj-espacio-bubble conj-espacio-bubble--click${usado ? ' conj-espacio-bubble--usado' : ''}`}
                    title={usado ? 'Clic para recuperar' : 'Clic para gastar'}
                    onClick={() => toggleSlotUsado('pacto', bi, espacios.cantidad)}
                  />
                )
              })}
            </div>
            <div className="conj-espacio-col__cant">
              <span>{espacios.cantidad - (espaciosUsados['pacto'] ?? 0)}/{espacios.cantidad}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── TRUCOS ── */}
      {conj.trucosMax > 0 && (
        <div className="conj-seccion">
          <div className="conj-seccion__head">
            <span className="conj-seccion__titulo">Trucos</span>
            <span className="conj-seccion__max">{trucosSeleccionados.length} / {conj.trucosMax}</span>
            <button
              className="conj-seccion__btn"
              onClick={() => setPicker({ tipo: 'truco', nivel: 0 })}
            >+ Elegir</button>
          </div>
          <div className="conj-lista">
            {trucosSeleccionados.length === 0 && (
              <span className="conj-lista__vacia">Ningún truco seleccionado</span>
            )}
            {trucosSeleccionadosDeDanio.length > 0 && <div className="conj-subgroup-title">Trucos de daño</div>}
            {trucosSeleccionadosDeDanio.map(nombre => {
              const info = getTrucoNivel0Info(nombre)
              return (
                <div key={nombre} className="conj-item conj-item--truco">
                  <button className="conj-item__info" onClick={() => setDetalleNombre(nombre)}>ℹ</button>
                  <span className="conj-item__main">
                    <span className="conj-item__nombre">{nombre}</span>
                    <MetaTrucoCompacta info={info} />
                  </span>
                  {CONJUROS[nombre] && <EtiquetaEscuela escuela={CONJUROS[nombre].escuela} />}
                  <EtiquetaTruco info={info} />
                  <button className="conj-item__remove" onClick={() => toggleTruco(nombre)} title="Quitar">✕</button>
                </div>
              )
            })}
            {trucosSeleccionadosSinDanio.length > 0 && <div className="conj-subgroup-title">Trucos sin daño</div>}
            {trucosSeleccionadosSinDanio.map(nombre => {
              const info = getTrucoNivel0Info(nombre)
              return (
                <div key={nombre} className="conj-item conj-item--truco">
                  <button className="conj-item__info" onClick={() => setDetalleNombre(nombre)}>ℹ</button>
                  <span className="conj-item__main">
                    <span className="conj-item__nombre">{nombre}</span>
                    <MetaTrucoCompacta info={info} />
                  </span>
                  {CONJUROS[nombre] && <EtiquetaEscuela escuela={CONJUROS[nombre].escuela} />}
                  <EtiquetaTruco info={info} />
                  <button className="conj-item__remove" onClick={() => toggleTruco(nombre)} title="Quitar">✕</button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── INFO POOL + GRIMORIO (solo mago) ── */}
      {tipoPrep === 'lista_completa' && (
        <div className="conj-pool-info">
          <span className="conj-pool-info__icon">📖</span>
          <span className="conj-pool-info__text">{etiquetaPool}</span>
        </div>
      )}

      {tipoPrep === 'grimorio' && (
        <div className="conj-seccion conj-seccion--grimorio">
          <div className="conj-seccion__head">
            <span className="conj-seccion__titulo">📖 Grimorio</span>
            <span className="conj-seccion__max">{grimorioConjuros.length} conjuros <small>(rec. {conj.grimorioMax})</small></span>
            <button
              className="conj-seccion__btn"
              onClick={() => setPicker({ tipo: 'grimorio' })}
            >+ Añadir al grimorio</button>
          </div>
          {NIVELES_CONJURO.filter(nv => nv <= nivelMax).map(nv => {
            const grimNv = grimorioPorNivel[nv] ?? []
            if (grimNv.length === 0) return null
            return (
              <div key={nv} className="conj-grimorio-nivel">
                <span className="conj-grimorio-nivel__head">Nivel {nv}</span>
                <div className="conj-lista">
                  {grimNv.map(nombre => {
                    const estPreparado = conjurosSeleccionados.includes(nombre)
                    return (
                      <div key={nombre} className={`conj-item conj-item--grimorio${estPreparado ? ' conj-item--preparado' : ''}`}>
                        <button className="conj-item__info" onClick={() => setDetalleNombre(nombre)}>ℹ</button>
                        <span className="conj-item__nombre">{nombre}</span>
                        {CONJUROS[nombre] && <EtiquetaEscuela escuela={CONJUROS[nombre].escuela} />}
                        {estPreparado && <span className="conj-item__badge">✦ Prep.</span>}
                        <button className="conj-item__remove" onClick={() => toggleGrimorio(nombre)} title="Quitar del grimorio">✕</button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
          {grimorioConjuros.length === 0 && (
            <div className="conj-lista">
              <span className="conj-lista__vacia">Grimorio vacío — añade conjuros</span>
            </div>
          )}
        </div>
      )}

      {/* ── Botón de preparar conjuros ── */}
      {conj.preparadosMax > 0 && nivelMax > 0 && (
        <div className="conj-preparar-accion">
          <button
            className="conj-seccion__btn conj-preparar-accion__btn"
            onClick={() => setPicker({ tipo: 'conjuro' })}
          >
            {tipoPrep === 'lista_completa'
              ? '⚡ Preparar conjuros'
              : tipoPrep === 'grimorio'
                ? '⚡ Preparar desde grimorio'
                : '+ Elegir conjuros preparados'}
          </button>
          <span className="conj-preparar-accion__count">
            {conjurosSeleccionados.length} / {conj.preparadosMax}
          </span>
        </div>
      )}

      {/* ── CONJUROS PREPARADOS por nivel ── */}
      {NIVELES_CONJURO.filter(nv => nv <= nivelMax).map(nv => {
        const slots = !esPacto && espacios ? (espacios[nv - 1] ?? 0) : (esPacto && espacios?.nivel >= nv ? espacios.cantidad : 0)
        const selNv = preparadosPorNivel[nv] ?? []
        const bonusNv = siemprePrepPorNivel[nv] ?? []
        const disponiblesNv = conjurosPorNivel[nv] ?? []
        const usadosNv = !esPacto ? (espaciosUsados[nv] ?? 0) : (espaciosUsados['pacto'] ?? 0)
        const totalNv = selNv.length + bonusNv.length
        if (disponiblesNv.length === 0 && slots === 0 && bonusNv.length === 0) return null

        return (
          <div key={nv} className="conj-seccion">
            <div className="conj-seccion__head">
              <span className="conj-seccion__titulo">Nivel {nv}</span>
              {slots > 0 && (
                <div className="conj-seccion__slots">
                  {!esPacto && Array.from({ length: slots }).map((_, bi) => (
                    <span key={bi} className={`conj-slot-bubble${bi < usadosNv ? ' conj-slot-bubble--usado' : ''}`} />
                  ))}
                  {esPacto && (
                    <span className="conj-slot-pacto">{slots - usadosNv}/{slots} (Nv{espacios.nivel})</span>
                  )}
                </div>
              )}
              {totalNv > 0 && (
                <span className="conj-seccion__sel">{totalNv} preparado{totalNv !== 1 ? 's' : ''}</span>
              )}
            </div>
            <div className="conj-lista">
              {/* Conjuros siempre preparados (subclase) — no removibles */}
              {bonusNv.map(nombre => (
                <div key={nombre} className="conj-item conj-item--siempre">
                  <button className="conj-item__info" onClick={() => setDetalleNombre(nombre)}>ℹ</button>
                  <span className="conj-item__nombre">{nombre}</span>
                  {CONJUROS[nombre] && <EtiquetaEscuela escuela={CONJUROS[nombre].escuela} />}
                  <span className="conj-item__badge conj-item__badge--sub">🔱 Subclase</span>
                </div>
              ))}
              {/* Conjuros preparados por el jugador */}
              {selNv.map(nombre => (
                <div key={nombre} className="conj-item">
                  <button className="conj-item__info" onClick={() => setDetalleNombre(nombre)}>ℹ</button>
                  <span className="conj-item__nombre">{nombre}</span>
                  {CONJUROS[nombre] && <EtiquetaEscuela escuela={CONJUROS[nombre].escuela} />}
                  <button className="conj-item__remove" onClick={() => toggleConjuro(nombre)} title="Quitar">✕</button>
                </div>
              ))}
              {totalNv === 0 && (
                <span className="conj-lista__vacia">Ningún conjuro de nivel {nv} preparado</span>
              )}
            </div>
          </div>
        )
      })}

      {/* ── Modals ── */}
      {picker?.tipo === 'truco' && (
        <PickerModal
          titulo={`Elegir trucos (máx. ${conj.trucosMax})`}
          grupos={{
            'Trucos de daño': trucosDeDanioDeLaClase,
            'Trucos sin daño': trucosSinDanioDeLaClase,
          }}
          seleccionados={trucosSeleccionados}
          max={conj.trucosMax}
          onToggle={toggleTruco}
          onCerrar={() => setPicker(null)}
        />
      )}
      {picker?.tipo === 'conjuro' && (
        <PickerModal
          titulo={
            tipoPrep === 'lista_completa'
              ? `Preparar conjuros (máx. ${conj.preparadosMax})`
              : tipoPrep === 'grimorio'
                ? `Preparar desde grimorio (máx. ${conj.preparadosMax})`
                : `Elegir conjuros preparados (máx. ${conj.preparadosMax})`
          }
          grupos={poolParaPreparar}
          seleccionados={conjurosSeleccionados}
          max={conj.preparadosMax}
          onToggle={toggleConjuro}
          onCerrar={() => setPicker(null)}
        />
      )}
      {picker?.tipo === 'grimorio' && (
        <PickerModal
          titulo="Añadir al grimorio"
          grupos={conjurosPorNivel}
          seleccionados={grimorioConjuros}
          noLimite
          onToggle={toggleGrimorio}
          onCerrar={() => setPicker(null)}
        />
      )}
      {detalleNombre && (
        <ConjuroDetalle
          nombre={detalleNombre}
          conjuro={CONJUROS[detalleNombre]}
          onCerrar={() => setDetalleNombre(null)}
        />
      )}
    </div>
  )
}

// ── Editor amigable de valores derivados ─────────────────────────────

function EditorAmigable({ personaje, personajeBase, personajeOverrides, onPersonajeOverridesCambiar, onClose }) {
  const [modoAvanzado, setModoAvanzado] = useState(false)
  const [jsonTexto, setJsonTexto] = useState('')
  const [jsonError, setJsonError] = useState('')

  const hayOverrides = Object.keys(personajeOverrides ?? {}).length > 0

  const getVal = (path) => getDeepPath(personaje, path)
  const isOverridden = (path) => getDeepPath(personajeOverrides ?? {}, path) !== undefined

  const handleChange = (path, rawValue) => {
    const parsed = rawValue === '' ? null : (isNaN(Number(rawValue)) ? rawValue : Number(rawValue))
    const baseVal = getDeepPath(personajeBase ?? {}, path)
    const sameAsBase = Object.is(parsed, baseVal) || (parsed == null && baseVal == null)
    const updated = sameAsBase
      ? (removeDeepPath(personajeOverrides ?? {}, path) ?? {})
      : setDeepPath(personajeOverrides ?? {}, path, parsed)
    onPersonajeOverridesCambiar?.(updated)
  }

  const handleReset = (path) => {
    onPersonajeOverridesCambiar?.(removeDeepPath(personajeOverrides ?? {}, path) ?? {})
  }

  const openAdvanced = () => {
    setJsonTexto(JSON.stringify(personaje, null, 2))
    setJsonError('')
    setModoAvanzado(true)
  }

  const guardarJson = () => {
    try {
      const parsed = JSON.parse(jsonTexto)
      const diff = buildDiff(personajeBase ?? {}, parsed) ?? {}
      onPersonajeOverridesCambiar?.(diff)
      setJsonError('')
      setModoAvanzado(false)
    } catch {
      setJsonError('JSON inválido. Revisa comas, llaves y comillas.')
    }
  }

  const renderField = (label, path) => {
    const overridden = isOverridden(path)
    const val = getVal(path)
    const baseVal = getDeepPath(personajeBase ?? {}, path)
    return (
      <div key={path.join('.')} className={`cs-edf${overridden ? ' cs-edf--on' : ''}`}>
        <span className="cs-edf__label">{label}</span>
        <div className="cs-edf__ctrl">
          <input
            className="cs-edf__input"
            type="number"
            value={val ?? ''}
            onChange={e => handleChange(path, e.target.value)}
          />
          {overridden
            ? <button className="cs-edf__reset" onClick={() => handleReset(path)} title="Restaurar valor calculado">×</button>
            : <span className="cs-edf__filler" />
          }
        </div>
        {overridden && baseVal != null && (
          <span className="cs-edf__orig">calc: {baseVal}</span>
        )}
      </div>
    )
  }

  return (
    <div className="sc-modal-overlay" role="dialog" aria-modal="true" aria-label="Editar valores">
      <div className="sc-modal cs-editor-friendly">

        <div className="sc-modal__header">
          <div>
            <h2 className="sc-modal__titulo">Editar valores</h2>
            <p className="sc-modal__subtitulo">
              {modoAvanzado
                ? 'Edita el JSON directamente. Haz clic en "Aplicar" para guardar.'
                : 'Los cambios aplican al instante. × restaura el valor calculado.'}
            </p>
          </div>
          <button className="sc-modal__cerrar" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        {modoAvanzado ? (
          <div className="sc-modal__body" style={{ display: 'block' }}>
            <textarea
              className="cs-editor-json"
              value={jsonTexto}
              onChange={e => setJsonTexto(e.target.value)}
              spellCheck={false}
            />
            {jsonError && <div className="cs-editor-json__error">{jsonError}</div>}
          </div>
        ) : (
          <div className="sc-modal__body cs-edf-body">

            <div className="cs-edf-section">
              <div className="cs-edf-section__title">Combate</div>
              <div className="cs-edf-section__grid">
                {renderField('CA', ['ca'])}
                {renderField('Velocidad (pies)', ['velocidad'])}
                {renderField('Iniciativa', ['iniciativa'])}
                {renderField('Perc. pasiva', ['percepcionPasiva'])}
                {renderField('Bonif. comp.', ['bonificadorCompetencia'])}
              </div>
            </div>

            {personaje.conjuros && (
              <div className="cs-edf-section">
                <div className="cs-edf-section__title">Conjuros</div>
                <div className="cs-edf-section__grid">
                  {renderField('CD salvación', ['conjuros', 'cdSalvacion'])}
                  {renderField('Bonif. ataque', ['conjuros', 'bonAtaque'])}
                </div>
              </div>
            )}

            <div className="cs-edf-section">
              <div className="cs-edf-section__title">Habilidades</div>
              <div className="cs-edf-section__grid">
                {HABILIDADES_LISTA.map(hab => renderField(hab, ['habilidades', hab, 'total']))}
              </div>
            </div>

            <div className="cs-edf-section">
              <div className="cs-edf-section__title">Tiradas de salvación</div>
              <div className="cs-edf-section__grid">
                {CARACTERISTICAS_ORDER.map(stat => renderField(stat, ['tiradasSalvacion', stat, 'total']))}
              </div>
            </div>

          </div>
        )}

        <div className="sc-modal__footer cs-edf-footer">
          <div className="cs-edf-footer__left">
            <button
              className="cs-tab cs-tab--tools"
              onClick={modoAvanzado ? () => setModoAvanzado(false) : openAdvanced}
            >
              {modoAvanzado ? '← Vista amigable' : 'Avanzado (JSON)'}
            </button>
            {hayOverrides && (
              <button
                className="sc-modal__btn sc-modal__btn--cancelar"
                onClick={() => onPersonajeOverridesCambiar?.({})}
              >
                Resetear todo
              </button>
            )}
          </div>
          <div className="cs-edf-footer__right">
            {modoAvanzado && (
              <button className="sc-modal__btn sc-modal__btn--confirmar" onClick={guardarJson}>
                Aplicar JSON
              </button>
            )}
            <button className="sc-modal__btn sc-modal__btn--cancelar" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Componente principal con pestañas ────────────────────────────────

export default function CharacterSheet({
  personaje, subclaseSeleccionada, onSubclaseSeleccionar,
  onNombreCambiar, onAlineamientoCambiar, onPersonalidadCambiar, onAparienciaCambiar,
  onNivelCambiar, nivel, onClaseCambiar, claseSeleccionada,
  onOrigenCambiar, origen, onPuntuacionesCambiar, puntuacionesBase,
  onEquipoCambiar, equipoState,
  hoja2, onHoja2Cambiar,
  monedas, onMonedasCambiar,
  pgActuales, onPgActualesCambiar, pgTemporales, onPgTemporalesCambiar,
  pgMaxPersonalizado, onPgMaxPersonalizadoCambiar,
  muerte, onMuerteCambiar,
  bonusASI, onBonusASICambiar,
  dotesElegidos, onDotesElegidosCambiar,
  dotesLibres, onDotesLibresCambiar,
  trucosSeleccionados, onTrucosSeleccionadosCambiar,
  grimorioConjuros, onGrimorioCambiar,
  conjurosSeleccionados, onConjurosSeleccionadosCambiar,
  espaciosUsados, onEspaciosUsadosCambiar,
  armasCustom, onArmasCustomCambiar,
  ataquesHojaConfig, onAtaquesHojaConfigCambiar,
  ataquesOcultos, onAtaquesOcultosCambiar,
  itemsOcultos, onItemsOcultosCambiar,
  dadosGolpeGastados, onDadosGolpeGastadosCambiar,
  onXpNivelActualCambiar,
  pgGananciaPorNivel, onPgGananciaPorNivelCambiar,
  personajeBase,
  personajeOverrides, onPersonajeOverridesCambiar,
}) {
  const [pestaña, setPestaña] = useState(1)
  const [editorAbierto, setEditorAbierto] = useState(false)
  const tieneMagia = !!personaje.conjuros

  const cambiarPestaña = (n) => {
    setPestaña(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="char-sheet">
      {/* Tabs */}
      <div className="cs-tabs">
        <button
          className={`cs-tab ${pestaña === 1 ? 'cs-tab--active' : ''}`}
          onClick={() => cambiarPestaña(1)}
        >
          <span className="cs-tab__num">1</span>
          Hoja del personaje
        </button>
        <button
          className={`cs-tab ${pestaña === 2 ? 'cs-tab--active' : ''}`}
          onClick={() => cambiarPestaña(2)}
        >
          <span className="cs-tab__num">2</span>
          Historia y trasfondo
        </button>
        <button
          className={`cs-tab ${pestaña === 3 ? 'cs-tab--active' : ''}${!tieneMagia ? ' cs-tab--disabled' : ''}`}
          onClick={() => tieneMagia && cambiarPestaña(3)}
          title={!tieneMagia ? 'Solo disponible para clases con magia' : ''}
        >
          <span className="cs-tab__num">3</span>
          Conjuros
        </button>
        <div className="cs-tabs__actions">
          <button
            className={`cs-tab cs-tab--tools${Object.keys(personajeOverrides ?? {}).length > 0 ? ' cs-tab--tools-active' : ''}`}
            onClick={() => setEditorAbierto(true)}
          >
            {Object.keys(personajeOverrides ?? {}).length > 0 ? `Editar valores (${Object.keys(personajeOverrides).length})` : 'Editar valores'}
          </button>
        </div>
      </div>

      {editorAbierto && (
        <EditorAmigable
          personaje={personaje}
          personajeBase={personajeBase}
          personajeOverrides={personajeOverrides}
          onPersonajeOverridesCambiar={onPersonajeOverridesCambiar}
          onClose={() => setEditorAbierto(false)}
        />
      )}

      {pestaña === 1 && (
        <Hoja1
          personaje={personaje}
          subclaseSeleccionada={subclaseSeleccionada}
          onSubclaseSeleccionar={onSubclaseSeleccionar}
          onNombreCambiar={onNombreCambiar}
          onAlineamientoCambiar={onAlineamientoCambiar}
          onPersonalidadCambiar={onPersonalidadCambiar}
          onNivelCambiar={onNivelCambiar}
          nivel={nivel}
          onClaseCambiar={onClaseCambiar}
          claseSeleccionada={claseSeleccionada}
          onOrigenCambiar={onOrigenCambiar}
          origen={origen}
          onPuntuacionesCambiar={onPuntuacionesCambiar}
          puntuacionesBase={puntuacionesBase}
          onEquipoCambiar={onEquipoCambiar}
          equipoState={equipoState}
          monedas={monedas}
          onMonedasCambiar={onMonedasCambiar}
          pgActuales={pgActuales}
          onPgActualesCambiar={onPgActualesCambiar}
          pgTemporales={pgTemporales}
          onPgTemporalesCambiar={onPgTemporalesCambiar}
          pgMaxPersonalizado={pgMaxPersonalizado}
          onPgMaxPersonalizadoCambiar={onPgMaxPersonalizadoCambiar}
          muerte={muerte}
          onMuerteCambiar={onMuerteCambiar}
          bonusASI={bonusASI}
          onBonusASICambiar={onBonusASICambiar}
          dotesElegidos={dotesElegidos}
          onDotesElegidosCambiar={onDotesElegidosCambiar}
          dotesLibres={dotesLibres}
          onDotesLibresCambiar={onDotesLibresCambiar}
          armasCustom={armasCustom}
          onArmasCustomCambiar={onArmasCustomCambiar}
          ataquesHojaConfig={ataquesHojaConfig}
          onAtaquesHojaConfigCambiar={onAtaquesHojaConfigCambiar}
          ataquesOcultos={ataquesOcultos}
          onAtaquesOcultosCambiar={onAtaquesOcultosCambiar}
          itemsOcultos={itemsOcultos}
          onItemsOcultosCambiar={onItemsOcultosCambiar}
          trucosSeleccionados={trucosSeleccionados}
          dadosGolpeGastados={dadosGolpeGastados}
          onDadosGolpeGastadosCambiar={onDadosGolpeGastadosCambiar}
          onXpNivelActualCambiar={onXpNivelActualCambiar}
          pgGananciaPorNivel={pgGananciaPorNivel}
          onPgGananciaPorNivelCambiar={onPgGananciaPorNivelCambiar}
        />
      )}
      {pestaña === 2 && (
        <Hoja2
          personaje={personaje}
          hoja2={hoja2}
          onHoja2Cambiar={onHoja2Cambiar}
          onAparienciaCambiar={onAparienciaCambiar}
        />
      )}
      {pestaña === 3 && (
        <Hoja3
          personaje={personaje}
          trucosSeleccionados={trucosSeleccionados ?? []}
          onTrucosCambiar={onTrucosSeleccionadosCambiar}
          grimorioConjuros={grimorioConjuros ?? []}
          onGrimorioCambiar={onGrimorioCambiar}
          conjurosSeleccionados={conjurosSeleccionados ?? []}
          onConjurosCambiar={onConjurosSeleccionadosCambiar}
          espaciosUsados={espaciosUsados ?? {}}
          onEspaciosUsadosCambiar={onEspaciosUsadosCambiar}
        />
      )}
    </div>
  )
}
