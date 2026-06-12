import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import ClassSelector from './components/ClassSelector'
import OriginSelector from './components/OriginSelector'
import AbilityScoreGenerator from './components/AbilityScoreGenerator'
import CharacterDescription from './components/CharacterDescription'
import EquipmentSelector from './components/EquipmentSelector'
import CharacterSheet from './components/CharacterSheet'
import LevelSelector from './components/LevelSelector'
import CharacterManager from './components/CharacterManager'
import Glossary from './components/Glossary'
import { CARACTERISTICAS } from './data/abilityScores'
import { calcularPersonaje } from './data/character'
import { CLASES } from './data/classes'
import { crearMonedasVacias, getMonedasInicialesDesdeEquipo, restarMonedas, sumarMonedas } from './data/equipment'
import { guardarPersonaje, cargarPersonaje, listarPersonajes, crearEstadoInicial, sincronizarDesdeSupabase } from './data/storage'
import './App.css'

const PASOS = [
  { id: 1, label: 'Clase' },
  { id: 2, label: 'Origen' },
  { id: 3, label: 'Características' },
  { id: 4, label: 'Descripción' },
  { id: 5, label: 'Equipo' },
  { id: 6, label: 'Hoja' },
]

const ESTADO_VACIO = crearEstadoInicial(CARACTERISTICAS)

function isPlainObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value)
}

function deepMerge(base, override) {
  if (override === undefined) return base
  if (Array.isArray(override)) return override
  if (!isPlainObject(override)) return override

  const baseObj = isPlainObject(base) ? base : {}
  const out = { ...baseObj }
  for (const [key, value] of Object.entries(override)) {
    out[key] = deepMerge(baseObj[key], value)
  }
  return out
}

function StepIndicator({ pasoActual, pasos, onIr, claseSeleccionada }) {
  return (
    <nav className="step-indicator" aria-label="Pasos de creación">
      {pasos.map((paso) => {
        const completado = paso.id < pasoActual
        const activo = paso.id === pasoActual
        const accesible = paso.id === 1 || claseSeleccionada
        return (
          <button
            key={paso.id}
            className={`step-btn ${activo ? 'step-btn--active' : ''} ${completado ? 'step-btn--done' : ''}`}
            onClick={() => accesible && onIr(paso.id)}
            disabled={!accesible}
          >
            <span className="step-btn__num">{completado ? '✓' : paso.id}</span>
            <span className="step-btn__label">{paso.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

function App() {
  const [pasoActual, setPasoActual] = useState(1)
  const [characterId, setCharacterId] = useState(null)
  const [glosarioAbierto, setGlosarioAbierto] = useState(false)
  const [confirmGuardar, setConfirmGuardar] = useState(null) // { idExistente, nombreBase }

  const [tema, setTema] = useState(() => localStorage.getItem('tema') || 'auto')

  useEffect(() => {
    const root = document.documentElement
    if (tema === 'auto') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', tema)
    }
    localStorage.setItem('tema', tema)
  }, [tema])

  function toggleTema() {
    setTema(prev => {
      if (prev === 'auto') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return systemDark ? 'light' : 'dark'
      }
      return 'auto'
    })
  }

  const temaIcono = tema === 'dark' ? '☀️' : tema === 'light' ? '🌙' : '🌓'
  const temaLabel = tema === 'dark' ? 'Modo claro' : tema === 'light' ? 'Modo oscuro' : 'Tema auto'

  // ── Estado principal del personaje ──
  const [nivel, setNivel] = useState(1)
  const [claseSeleccionada, setClaseSeleccionada] = useState(null)
  const [eleccionNivel1, setEleccionNivel1] = useState(null)
  const [subclaseSeleccionada, setSubclaseSeleccionada] = useState(null)
  const [bonusASI, setBonusASI] = useState({})
  const [dotesElegidos, setDotesElegidos] = useState({})
  const [dotesLibres, setDotesLibres] = useState([])
  const [origen, setOrigen] = useState({ trasfondo: null, especie: null, idiomas: ['Común'], linaje: null, habilidadDiestro: null, habilidadSentidos: null, habilidadesHabilidoso: [] })
  const [puntuaciones, setPuntuaciones] = useState(
    Object.fromEntries(CARACTERISTICAS.map((c) => [c, null]))
  )
  const [bonusTrasfondo, setBonusTrasfondo] = useState({ modo: null, stats: {} })
  const [habilidadesClase, setHabilidadesClase] = useState([])
  const [descripcion, setDescripcion] = useState({
    nombre: '',
    alineamiento: null,
    apariencia: {},
    personalidad: { rasgos: '', ideal: '', vinculo: '', defecto: '' },
    trasfondoId: null,
  })
  const [equipo, setEquipo] = useState({ opcionClase: null, opcionTrasfondo: null, oroDisponible: 0, extras: [], bagatela: null, monedasAuto: crearMonedasVacias() })

  // ── Estado extra (hoja de personaje) ──
  const [hoja2, setHoja2] = useState(ESTADO_VACIO.hoja2)
  const [monedas, setMonedas] = useState(ESTADO_VACIO.monedas)
  const [pgActuales, setPgActuales] = useState(0)
  const [pgTemporales, setPgTemporales] = useState(0)
  const [muerte, setMuerte] = useState({ exitos: 0, fallos: 0 })
  const [trucosSeleccionados, setTrucosSeleccionados] = useState([])
  const [grimorioConjuros, setGrimorioConjuros] = useState([])
  const [conjurosSeleccionados, setConjurosSeleccionados] = useState([])
  const [espaciosUsados, setEspaciosUsados] = useState({})
  const [armasCustom, setArmasCustom] = useState([])
  const [ataquesHojaConfig, setAtaquesHojaConfig] = useState({})
  const [ataquesOcultos, setAtaquesOcultos] = useState([])
  const [itemsOcultos, setItemsOcultos] = useState([])
  const [dadosGolpeGastados, setDadosGolpeGastados] = useState(0)
  const [pgMaxPersonalizado, setPgMaxPersonalizado] = useState(null)
  const [xpNivelActual, setXpNivelActual] = useState(0)
  const [inspiracion, setInspiracion] = useState(false)
  const [sintonizaciones, setSintonizaciones] = useState(['', '', ''])
  const [escudoEquipado, setEscudoEquipado] = useState(false)
  const [competenciasOverride, setCompetenciasOverride] = useState({ habilidades: {}, salvaciones: {} })
  const [conjurosHojaConfig, setConjurosHojaConfig] = useState({})
  const [pgGananciaPorNivel, setPgGananciaPorNivel] = useState({})
  const [personajeOverrides, setPersonajeOverrides] = useState({})

  // Sincronizar con Supabase al iniciar la app
  useEffect(() => { sincronizarDesdeSupabase() }, [])

  // Guards para evitar que los useEffect de reset se disparen al cargar un personaje.
  //
  // Estrategia: guardamos el valor recién cargado en un ref. En el effect, si el
  // valor actual COINCIDE con el ref → lo es una carga, NO reseteamos (y NO
  // nulleamos el ref, para que StrictMode pueda correr el effect dos veces sin
  // problema). Solo nulleamos el ref cuando el valor YA NO coincide, lo que
  // significa que el usuario hizo un cambio real → reseteamos y limpiamos el guard.
  const claseCargadaRef     = useRef(null)
  const trasfondoCargadoRef = useRef(null)

  useEffect(() => {
    if (origen.trasfondo === trasfondoCargadoRef.current) return  // carga → skip (no tocar ref)
    trasfondoCargadoRef.current = null   // cambio real → limpiar guard
    setBonusTrasfondo({ modo: null, stats: {} })
  }, [origen.trasfondo])

  useEffect(() => {
    if (claseSeleccionada === claseCargadaRef.current) return     // carga → skip
    // NO nulleamos aquí; lo hace el effect de equipo (que corre después en el mismo ciclo)
    setHabilidadesClase([])
    setEleccionNivel1(null)
    setSubclaseSeleccionada(null)
    setBonusASI({})
    setDotesElegidos({})
    setDotesLibres([])
    setTrucosSeleccionados([])
    setGrimorioConjuros([])
    setConjurosSeleccionados([])
    setEspaciosUsados({})
    setAtaquesHojaConfig({})
    setAtaquesOcultos([])
    setItemsOcultos([])
  }, [claseSeleccionada])

  useEffect(() => {
    if (claseSeleccionada === claseCargadaRef.current) return     // carga → skip
    claseCargadaRef.current = null  // cambio real → limpiar guard (aquí, al final)
    setEquipo(prev => ({
      opcionClase: null,
      opcionTrasfondo: null,
      oroDisponible: 0,
      extras: [],
      bagatela: null,
      monedasAuto: prev?.monedasAuto ?? crearMonedasVacias(),
    }))
  }, [claseSeleccionada])

  useEffect(() => {
    const monedasAutoActuales = equipo?.monedasAuto ?? crearMonedasVacias()
    const monedasAutoSiguientes = getMonedasInicialesDesdeEquipo({
      claseId: claseSeleccionada,
      trasfondoId: origen.trasfondo,
      equipo,
    })

    const sinCambios = JSON.stringify(monedasAutoActuales) === JSON.stringify(monedasAutoSiguientes)
    if (sinCambios) return

    setMonedas(prev => sumarMonedas(restarMonedas(prev ?? crearMonedasVacias(), monedasAutoActuales), monedasAutoSiguientes))
    setEquipo(prev => ({ ...prev, monedasAuto: monedasAutoSiguientes }))
  }, [claseSeleccionada, origen.trasfondo, equipo])

  // ── Serialización ──
  const serializarPersonaje = useCallback(() => ({
    id: characterId,
    nivel,
    claseSeleccionada,
    eleccionNivel1,
    subclaseSeleccionada,
    bonusASI,
    dotesElegidos,
    dotesLibres,
    origen,
    puntuaciones,
    bonusTrasfondo,
    habilidadesClase,
    descripcion,
    equipo,
    hoja2,
    monedas,
    pgActuales,
    pgTemporales,
    muerte,
    trucosSeleccionados,
    grimorioConjuros,
    conjurosSeleccionados,
    espaciosUsados,
    armasCustom,
    ataquesHojaConfig,
    ataquesOcultos,
    itemsOcultos,
    dadosGolpeGastados,
    pgMaxPersonalizado,
    xpNivelActual,
    inspiracion,
    sintonizaciones,
    escudoEquipado,
    competenciasOverride,
    conjurosHojaConfig,
    pgGananciaPorNivel,
    personajeOverrides,
  }), [characterId, nivel, claseSeleccionada, eleccionNivel1, subclaseSeleccionada, bonusASI, dotesElegidos, dotesLibres, origen, puntuaciones, bonusTrasfondo, habilidadesClase, descripcion, equipo, hoja2, monedas, pgActuales, pgTemporales, muerte, trucosSeleccionados, grimorioConjuros, conjurosSeleccionados, espaciosUsados, armasCustom, ataquesHojaConfig, ataquesOcultos, itemsOcultos, dadosGolpeGastados, pgMaxPersonalizado, xpNivelActual, inspiracion, sintonizaciones, escudoEquipado, competenciasOverride, conjurosHojaConfig, pgGananciaPorNivel, personajeOverrides])

  const cargarDesdeData = useCallback((data) => {
    // Guardar los valores que vamos a cargar para que los effects de reset
    // los reconozcan y no borren el estado recién establecido.
    claseCargadaRef.current     = data.claseSeleccionada ?? null
    trasfondoCargadoRef.current = data.origen?.trasfondo ?? null
    setCharacterId(data.id ?? null)
    setNivel(data.nivel ?? 1)
    setClaseSeleccionada(data.claseSeleccionada ?? null)
    setEleccionNivel1(data.eleccionNivel1 ?? null)
    setSubclaseSeleccionada(data.subclaseSeleccionada ?? null)
    setBonusASI(data.bonusASI ?? {})
    setDotesElegidos(data.dotesElegidos ?? {})
    setDotesLibres(data.dotesLibres ?? [])
    setOrigen(data.origen ?? { trasfondo: null, especie: null, idiomas: ['Común'], linaje: null, habilidadDiestro: null, habilidadSentidos: null, habilidadesHabilidoso: [] })
    setPuntuaciones(data.puntuaciones ?? Object.fromEntries(CARACTERISTICAS.map(c => [c, null])))
    setBonusTrasfondo(data.bonusTrasfondo ?? { modo: null, stats: {} })
    setHabilidadesClase(data.habilidadesClase ?? [])
    setDescripcion(data.descripcion ?? ESTADO_VACIO.descripcion)
    setEquipo(data.equipo ?? ESTADO_VACIO.equipo)
    setHoja2(data.hoja2 ?? ESTADO_VACIO.hoja2)
    setMonedas(data.monedas ?? ESTADO_VACIO.monedas)
    setPgActuales(data.pgActuales ?? 0)
    setPgTemporales(data.pgTemporales ?? 0)
    setMuerte(data.muerte ?? { exitos: 0, fallos: 0 })
    setTrucosSeleccionados(data.trucosSeleccionados ?? [])
    setGrimorioConjuros(data.grimorioConjuros ?? [])
    setConjurosSeleccionados(data.conjurosSeleccionados ?? [])
    setEspaciosUsados(data.espaciosUsados ?? {})
    setArmasCustom(data.armasCustom ?? [])
    setAtaquesHojaConfig(data.ataquesHojaConfig ?? {})
    setAtaquesOcultos(data.ataquesOcultos ?? [])
    setItemsOcultos(data.itemsOcultos ?? [])
    setDadosGolpeGastados(data.dadosGolpeGastados ?? 0)
    setPgMaxPersonalizado(data.pgMaxPersonalizado ?? null)
    setXpNivelActual(data.xpNivelActual ?? 0)
    setInspiracion(data.inspiracion ?? false)
    setSintonizaciones(data.sintonizaciones?.length ? data.sintonizaciones : ['', '', ''])
    setEscudoEquipado(data.escudoEquipado ?? false)
    setCompetenciasOverride(data.competenciasOverride ?? { habilidades: {}, salvaciones: {} })
    setConjurosHojaConfig(data.conjurosHojaConfig ?? {})
    setPgGananciaPorNivel(data.pgGananciaPorNivel ?? {})
    setPersonajeOverrides(data.personajeOverrides ?? {})
  }, [])

  // ── Auto-guardado (debounced) ──
  const autoSaveTimer = useRef(null)
  useEffect(() => {
    if (!characterId) return
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(() => {
      guardarPersonaje(serializarPersonaje())
    }, 1000)
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current) }
  }, [characterId, serializarPersonaje])

  // ── Handlers para CharacterManager ──
  const handleNuevo = useCallback(() => {
    cargarDesdeData(ESTADO_VACIO)
    setPasoActual(1)
  }, [cargarDesdeData])

  const handleCargar = useCallback((metaOrData) => {
    let data
    // Si tiene claves de personaje completo (import o data completa), usar directo
    if ('puntuaciones' in metaOrData || 'claseSeleccionada' in metaOrData) {
      data = metaOrData
      guardarPersonaje(data)
    } else {
      // Es metadata del listado, cargar datos completos de localStorage
      data = cargarPersonaje(metaOrData.id)
    }
    if (data) {
      cargarDesdeData(data)
      setPasoActual(6)
    }
  }, [cargarDesdeData])

  const ejecutarGuardar = useCallback(async (idOverride) => {
    const data = serializarPersonaje()
    if (idOverride !== undefined) data.id = idOverride
    const id = await guardarPersonaje(data)
    setCharacterId(id)
  }, [serializarPersonaje])

  const handleGuardar = useCallback(() => {
    const data = serializarPersonaje()
    const nombre = data.descripcion?.nombre?.trim() || ''
    if (!nombre) {
      ejecutarGuardar()
      return
    }
    const lista = listarPersonajes()
    const conflicto = lista.find(p => {
      if (p.id === data.id) return false
      return (p.nombre || '').trim().toLowerCase() === nombre.toLowerCase()
    })
    if (conflicto) {
      setConfirmGuardar({ idExistente: conflicto.id, nombreBase: nombre })
    } else {
      ejecutarGuardar()
    }
  }, [serializarPersonaje, ejecutarGuardar])

  const handleConfirmarReemplazar = useCallback(() => {
    if (!confirmGuardar) return
    ejecutarGuardar(confirmGuardar.idExistente)
    setConfirmGuardar(null)
  }, [confirmGuardar, ejecutarGuardar])

  const handleConfirmarAparte = useCallback(async () => {
    if (!confirmGuardar) return
    const lista = listarPersonajes()
    const base = confirmGuardar.nombreBase
    let nuevoNombre = base
    let i = 1
    while (lista.some(p => (p.nombre || '').trim().toLowerCase() === nuevoNombre.toLowerCase())) {
      nuevoNombre = `${base}_${i}`
      i++
    }
    setDescripcion(d => ({ ...d, nombre: nuevoNombre }))
    // Guardar con nuevo ID (sin data.id para que generateId cree uno nuevo)
    const data = serializarPersonaje()
    data.id = null
    data.descripcion = { ...data.descripcion, nombre: nuevoNombre }
    const id = await guardarPersonaje(data)
    setCharacterId(id)
    setConfirmGuardar(null)
  }, [confirmGuardar, serializarPersonaje])

  // ── Cálculo del personaje ──
  const personajeBase = useMemo(() => {
    const p = calcularPersonaje({
      claseId:          claseSeleccionada,
      subclaseId:       subclaseSeleccionada,
      trasfondoId:      origen.trasfondo,
      especieId:        origen.especie,
      linajeId:         origen.linaje,
      habilidadDiestro: origen.habilidadDiestro,
      habilidadSentidos: origen.habilidadSentidos,
      habilidadesHabilidoso: origen.habilidadesHabilidoso,
      puntuacionesBase: puntuaciones,
      bonusTrasfondo,
      bonusASI,
      dotesElegidos,
      dotesLibres,
      habilidadesClase,
      idiomas:          origen.idiomas,
      descripcion,
      equipo,
      eleccionNivel1,
      nivel,
      pgGananciaPorNivel,
      ataquesOcultos,
      itemOcultos: itemsOcultos,
      escudoEquipado,
      competenciasOverride,
    })
    return { ...p, xpNivelActual }
  }, [claseSeleccionada, subclaseSeleccionada, origen, puntuaciones, bonusTrasfondo, bonusASI, dotesElegidos, dotesLibres, habilidadesClase, descripcion, equipo, eleccionNivel1, nivel, xpNivelActual, pgGananciaPorNivel, ataquesOcultos, itemsOcultos, escudoEquipado, competenciasOverride])

  const personaje = useMemo(() => {
    return deepMerge(personajeBase, personajeOverrides ?? {})
  }, [personajeBase, personajeOverrides])


  // Scroll arriba al cambiar de paso
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pasoActual])

  return (
    <>
      <CharacterManager
        personajeActualId={characterId}
        nombreActual={descripcion.nombre}
        onNuevo={handleNuevo}
        onCargar={handleCargar}
        onGuardar={handleGuardar}
        onSerializar={serializarPersonaje}
      />

      <header id="app-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1>Crear Personaje</h1>
            <p>Dungeons &amp; Dragons 2024 — Manual del Jugador</p>
          </div>
          <div className="header-actions">
            <button className="theme-toggle-btn" onClick={toggleTema} title={temaLabel}>
              <span className="theme-toggle-icon">{temaIcono}</span>
              <span>{temaLabel}</span>
            </button>
            <button className="glossary-open-btn" onClick={() => setGlosarioAbierto(true)}>
              Glosario
            </button>
          </div>
        </div>
      </header>

      <LevelSelector nivel={nivel} onCambiar={setNivel} nivelesASI={CLASES.find(c => c.id === claseSeleccionada)?.nivelesASI} />

      <StepIndicator
        pasoActual={pasoActual}
        pasos={PASOS}
        onIr={setPasoActual}
        claseSeleccionada={claseSeleccionada}
      />

      <main>
        {pasoActual === 1 && (
          <ClassSelector
            claseSeleccionada={claseSeleccionada}
            onSeleccionar={setClaseSeleccionada}
            eleccionNivel1={eleccionNivel1}
            onEleccionNivel1={setEleccionNivel1}
            subclaseSeleccionada={subclaseSeleccionada}
            onSubclaseSeleccionar={setSubclaseSeleccionada}
            nivel={nivel}
          />
        )}
        {pasoActual === 2 && (
          <OriginSelector
            origen={origen}
            onCambiar={setOrigen}
            bonusTrasfondo={bonusTrasfondo}
            onBonusChange={setBonusTrasfondo}
          />
        )}
        {pasoActual === 3 && (
          <AbilityScoreGenerator
            puntuaciones={puntuaciones}
            onCambiar={setPuntuaciones}
            claseId={claseSeleccionada}
            trasfondoId={origen.trasfondo}
            bonusTrasfondo={bonusTrasfondo}
            onBonusChange={setBonusTrasfondo}
            habilidadesClase={habilidadesClase}
            onHabilidadesClaseChange={setHabilidadesClase}
          />
        )}
        {pasoActual === 4 && (
          <CharacterDescription
            descripcion={{ ...descripcion, trasfondoId: origen.trasfondo }}
            onCambiar={setDescripcion}
            puntuaciones={puntuaciones}
          />
        )}
        {pasoActual === 5 && (
          <EquipmentSelector
            claseId={claseSeleccionada}
            trasfondoId={origen.trasfondo}
            equipo={equipo}
            onCambiar={setEquipo}
          />
        )}
        {pasoActual === 6 && (
          <CharacterSheet
            personaje={personaje}
            subclaseSeleccionada={subclaseSeleccionada}
            onSubclaseSeleccionar={setSubclaseSeleccionada}
            bonusASI={bonusASI}
            onBonusASICambiar={setBonusASI}
            dotesElegidos={dotesElegidos}
            onDotesElegidosCambiar={setDotesElegidos}
            dotesLibres={dotesLibres}
            onDotesLibresCambiar={setDotesLibres}
            // Callbacks de edición
            onNombreCambiar={(v) => setDescripcion(d => ({ ...d, nombre: v }))}
            onAlineamientoCambiar={(v) => setDescripcion(d => ({ ...d, alineamiento: v }))}
            onPersonalidadCambiar={(key, v) => setDescripcion(d => ({
              ...d, personalidad: { ...d.personalidad, [key]: v }
            }))}
            onAparienciaCambiar={(key, v) => setDescripcion(d => ({
              ...d, apariencia: { ...d.apariencia, [key]: v }
            }))}
            onNivelCambiar={setNivel}
            nivel={nivel}
            onClaseCambiar={setClaseSeleccionada}
            claseSeleccionada={claseSeleccionada}
            onOrigenCambiar={setOrigen}
            origen={origen}
            onPuntuacionesCambiar={setPuntuaciones}
            puntuacionesBase={puntuaciones}
            onEquipoCambiar={setEquipo}
            equipoState={equipo}
            // Estado de hoja de personaje
            hoja2={hoja2}
            onHoja2Cambiar={setHoja2}
            monedas={monedas}
            onMonedasCambiar={setMonedas}
            pgActuales={pgActuales}
            onPgActualesCambiar={setPgActuales}
            pgTemporales={pgTemporales}
            onPgTemporalesCambiar={setPgTemporales}
            muerte={muerte}
            onMuerteCambiar={setMuerte}
            trucosSeleccionados={trucosSeleccionados}
            onTrucosSeleccionadosCambiar={setTrucosSeleccionados}
            grimorioConjuros={grimorioConjuros}
            onGrimorioCambiar={setGrimorioConjuros}
            conjurosSeleccionados={conjurosSeleccionados}
            onConjurosSeleccionadosCambiar={setConjurosSeleccionados}
            espaciosUsados={espaciosUsados}
            onEspaciosUsadosCambiar={setEspaciosUsados}
            armasCustom={armasCustom}
            onArmasCustomCambiar={setArmasCustom}
            ataquesHojaConfig={ataquesHojaConfig}
            onAtaquesHojaConfigCambiar={setAtaquesHojaConfig}
            ataquesOcultos={ataquesOcultos}
            onAtaquesOcultosCambiar={setAtaquesOcultos}
            itemsOcultos={itemsOcultos}
            onItemsOcultosCambiar={setItemsOcultos}
            dadosGolpeGastados={dadosGolpeGastados}
            onDadosGolpeGastadosCambiar={setDadosGolpeGastados}
            pgMaxPersonalizado={pgMaxPersonalizado}
            onPgMaxPersonalizadoCambiar={setPgMaxPersonalizado}
            onXpNivelActualCambiar={setXpNivelActual}
            inspiracion={inspiracion}
            onInspiracionCambiar={setInspiracion}
            sintonizaciones={sintonizaciones}
            onSintonizacionesCambiar={setSintonizaciones}
            escudoEquipado={escudoEquipado}
            onEscudoCambiar={setEscudoEquipado}
            competenciasOverride={competenciasOverride}
            onCompetenciasOverrideCambiar={setCompetenciasOverride}
            conjurosHojaConfig={conjurosHojaConfig}
            onConjurosHojaConfigCambiar={setConjurosHojaConfig}
            pgGananciaPorNivel={pgGananciaPorNivel}
            onPgGananciaPorNivelCambiar={setPgGananciaPorNivel}
            personajeBase={personajeBase}
            personajeOverrides={personajeOverrides}
            onPersonajeOverridesCambiar={setPersonajeOverrides}
          />
        )}
      </main>

      <div className="nav-actions">
        {pasoActual > 1 && (
          <button className="nav-btn nav-btn--prev" onClick={() => setPasoActual(p => p - 1)}>
            ← Anterior
          </button>
        )}
        {pasoActual < PASOS.length && (
          <button
            className="nav-btn nav-btn--next"
            onClick={() => setPasoActual(p => p + 1)}
            disabled={!claseSeleccionada}
            title={!claseSeleccionada ? 'Primero elige una clase' : ''}
          >
            Siguiente →
          </button>
        )}
      </div>

      <Glossary abierto={glosarioAbierto} onCerrar={() => setGlosarioAbierto(false)} />

      {confirmGuardar && (
        <div className="modal-overlay" onClick={() => setConfirmGuardar(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <p>Ya existe un personaje llamado <strong>{confirmGuardar.nombreBase}</strong>.</p>
            <p>¿Querés reemplazarlo o guardarlo como uno nuevo?</p>
            <div className="modal-actions">
              <button className="modal-btn modal-btn--primary" onClick={handleConfirmarReemplazar}>
                Reemplazar
              </button>
              <button className="modal-btn modal-btn--secondary" onClick={handleConfirmarAparte}>
                Guardar aparte
              </button>
              <button className="modal-btn modal-btn--cancel" onClick={() => setConfirmGuardar(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
