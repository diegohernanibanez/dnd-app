// Fuente: Manual del Jugador D&D 2024 - Motor de cálculo del personaje
// Referencia: Caps. 1, 2, 3, 4 — pp. 34-35 (hoja de personaje)

import { EQUIPO_POR_CLASE, EQUIPO_POR_TRASFONDO, getMonedasInicialesDesdeEquipo, textoEsSoloMonedas } from './equipment'
import { BAGATELAS } from './bagatelas'
import { resolverArma } from './weapons'
import { getClaseById } from './classes'
import { TRASFONDOS, ESPECIES } from './origins'
import { calcModificador } from './abilityScores'
import { getBonoCompetencia, getPGMax, getXPSiguienteNivel, getXPNivelActual } from './levelProgression'
import { getDoteById } from './dotes'
import { TIPO_MAGIA, TIPO_PREPARACION, getEspaciosConjuro, getTrucosMax, getConjurosPreparadosMax, getNivelMaxConjuro, getGrimorioMax, getConjurosSubclase } from './spellSlots'

// ── Constantes ───────────────────────────────────────────────────────

export const CARACTERISTICAS_ABBREV = {
  Fuerza: 'FUE', Destreza: 'DES', Constitución: 'CON',
  Inteligencia: 'INT', Sabiduría: 'SAB', Carisma: 'CAR',
}

export const CARACTERISTICAS_ORDER = [
  'Fuerza', 'Destreza', 'Constitución', 'Inteligencia', 'Sabiduría', 'Carisma',
]

// 18 habilidades (PHB 2024) — orden alfabético español
export const HABILIDADES = {
  'Acrobacias':          'Destreza',
  'Atletismo':           'Fuerza',
  'Conocimiento arcano': 'Inteligencia',
  'Engaño':              'Carisma',
  'Historia':            'Inteligencia',
  'Interpretación':      'Carisma',
  'Intimidación':        'Carisma',
  'Investigación':       'Inteligencia',
  'Juego de manos':      'Destreza',
  'Medicina':            'Sabiduría',
  'Naturaleza':          'Inteligencia',
  'Percepción':          'Sabiduría',
  'Perspicacia':         'Sabiduría',
  'Persuasión':          'Carisma',
  'Religión':            'Inteligencia',
  'Sigilo':              'Destreza',
  'Supervivencia':       'Sabiduría',
  'Trato con animales':  'Sabiduría',
}

export const HABILIDADES_LISTA = Object.keys(HABILIDADES)

function normalizeText(s = '') {
  return String(s)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function textoDaMaestriaArmas(texto = '') {
  const t = normalizeText(texto)
  if (!t) return false
  const mencionaArmadura = t.includes('armadura') || t.includes('escudo')
  const mencionaArma = t.includes('arma') || t.includes('armas')
  const mencionaMaestria = t.includes('maestria') || t.includes('propiedad de maestria') || t.includes('propiedades de maestria')
  const casoMaestroArmas = t.includes('maestro de armas') || t.includes('maestro en armas')
  return !mencionaArmadura && ((mencionaArma && mencionaMaestria) || casoMaestroArmas)
}

export const ALINEAMIENTOS_NOMBRE = {
  'legal-bueno':    'Legal Bueno',
  'neutral-bueno':  'Neutral Bueno',
  'caotico-bueno':  'Caótico Bueno',
  'legal-neutral':  'Legal Neutral',
  'neutral':        'Neutral',
  'caotico-neutral':'Caótico Neutral',
  'legal-malvado':  'Legal Malvado',
  'neutral-malvado':'Neutral Malvado',
  'caotico-malvado':'Caótico Malvado',
}

const DADO_GOLPE_NUM = { d6: 6, d8: 8, d10: 10, d12: 12 }

// Aptitud mágica (característica) por clase — PHB 2024
const APTITUD_MAGICA = {
  bardo:      'Carisma',
  brujo:      'Carisma',
  clerigo:    'Sabiduría',
  druida:     'Sabiduría',
  explorador: 'Sabiduría',
  hechicero:  'Carisma',
  mago:       'Inteligencia',
  paladin:    'Carisma',
}

// ── Motor principal ──────────────────────────────────────────────────

/**
 * Calcula el personaje completo con todos los valores derivados.
 *
 * @param {object} params
 * @param {string|null}  params.claseId            — id de clase (Step 1)
 * @param {string|null}  params.trasfondoId         — id de trasfondo (Step 2)
 * @param {string|null}  params.especieId           — id de especie (Step 2)
 * @param {object}       params.puntuacionesBase    — { Fuerza: N|null, ... } sin bonus
 * @param {object}       params.bonusTrasfondo      — { modo, stats: { Fuerza: 2, ... } }
 * @param {string[]}     params.habilidadesClase    — habilidades elegidas de clase
 * @param {string[]}     params.idiomas             — idiomas elegidos (Step 2)
 * @param {object}       params.descripcion         — { nombre, alineamiento, apariencia, personalidad }
 * @returns {object} personaje calculado
 */
export function calcularPersonaje({
  claseId,
  subclaseId,
  trasfondoId,
  especieId,
  linajeId,
  habilidadDiestro,
  habilidadSentidos,
  habilidadesHabilidoso,
  puntuacionesBase,
  bonusTrasfondo,
  bonusASI,
  dotesElegidos,
  dotesLibres,
  habilidadesClase,
  idiomas,
  descripcion,
  equipo,
  eleccionNivel1,
  nivel = 1,
  pgGananciaPorNivel = {},
  itemOcultos = [],
  ataquesOcultos = [],
}) {
  const clase     = getClaseById(claseId) ?? null
  const trasfondo = TRASFONDOS.find(t => t.id === trasfondoId) ?? null
  const especieBase = ESPECIES.find(e => e.id === especieId) ?? null
  const linaje    = especieBase?.linajes?.find(l => l.id === linajeId) ?? null
  const especie   = especieBase ? { ...especieBase, linajeSel: linaje } : null

  // ── Puntuaciones finales (base + bonus trasfondo + ASI) ──
  const bonusStats = bonusTrasfondo?.stats ?? {}

  // Sum all ASI bonuses chosen by the player, only for levels already reached
  const allASIBonus = {}
  for (const [lvl, levelBonuses] of Object.entries(bonusASI ?? {})) {
    if (Number(lvl) > nivel) continue
    for (const [stat, amt] of Object.entries(levelBonuses)) {
      allASIBonus[stat] = (allASIBonus[stat] ?? 0) + amt
    }
  }

  // Normalize dotesLibres (backward compat: can be string[] or object[])
  const normalizedDotesLibres = (dotesLibres ?? []).map(d =>
    typeof d === 'string' ? { doteId: d } : d
  )

  const dotesObtenidas = (() => {
    const out = []
    for (const [lvl, doteData] of Object.entries(dotesElegidos ?? {})) {
      if (Number(lvl) > nivel || !doteData?.doteId) continue
      const d = getDoteById(doteData.doteId)
      if (d) out.push(d)
    }
    for (const doteData of normalizedDotesLibres) {
      const d = getDoteById(doteData?.doteId)
      if (d) out.push(d)
    }
    return out
  })()

  const maestriaArmas = (() => {
    const fuentes = []

    const rasgosClase = []
    for (let n = 1; n <= nivel; n++) {
      const rasgos = clase?.rasgosNivel?.[n] ?? []
      for (const r of rasgos) rasgosClase.push(r)
    }

    const subclaseActiva = clase?.subclases?.find(s => s.id === subclaseId) ?? null
    const rasgosSubclase = []
    if (subclaseActiva?.rasgosNivel) {
      for (const [n, rasgos] of Object.entries(subclaseActiva.rasgosNivel)) {
        if (Number(n) > nivel) continue
        for (const r of rasgos) rasgosSubclase.push(r)
      }
    }

    for (const r of [...rasgosClase, ...rasgosSubclase]) {
      const nombre = r?.nombre ?? ''
      const desc = r?.desc ?? ''
      if (textoDaMaestriaArmas(nombre) || textoDaMaestriaArmas(desc)) {
        fuentes.push({ tipo: 'rasgo', nombre: nombre || 'Rasgo sin nombre' })
      }
    }

    for (const d of dotesObtenidas) {
      const nombre = d?.nombre ?? ''
      const descripcion = d?.descripcion ?? ''
      let match = textoDaMaestriaArmas(nombre) || textoDaMaestriaArmas(descripcion)
      if (!match && Array.isArray(d?.efectos)) {
        match = d.efectos.some(e => textoDaMaestriaArmas(e?.desc ?? ''))
      }
      if (match) {
        fuentes.push({ tipo: 'dote', nombre: nombre || d?.id || 'Dote' })
      }
    }

    const dedup = []
    const seen = new Set()
    for (const f of fuentes) {
      const key = `${f.tipo}:${f.nombre}`
      if (seen.has(key)) continue
      seen.add(key)
      dedup.push(f)
    }

    return {
      tiene: dedup.length > 0,
      fuentes: dedup,
    }
  })()

  // Sum stat bonuses from dotes chosen at ASI levels
  const dotesStatBonus = {}
  for (const [lvl, doteData] of Object.entries(dotesElegidos ?? {})) {
    if (Number(lvl) > nivel || !doteData?.doteId) continue
    const dote = getDoteById(doteData.doteId)
    if (!dote) continue
    for (const efecto of dote.efectos) {
      if (efecto.tipo === 'stat') {
        dotesStatBonus[efecto.stat] = (dotesStatBonus[efecto.stat] ?? 0) + efecto.valor
      } else if (efecto.tipo === 'stat-elegir' && doteData.statElegido) {
        dotesStatBonus[doteData.statElegido] = (dotesStatBonus[doteData.statElegido] ?? 0) + efecto.valor
      } else if (efecto.tipo === 'resiliente' && doteData.statElegido) {
        dotesStatBonus[doteData.statElegido] = (dotesStatBonus[doteData.statElegido] ?? 0) + 1
      }
    }
  }

  // Sum stat bonuses from free feats (dotesLibres)
  for (const doteData of normalizedDotesLibres) {
    if (!doteData?.doteId) continue
    const dote = getDoteById(doteData.doteId)
    if (!dote) continue
    for (const efecto of dote.efectos) {
      if (efecto.tipo === 'stat') {
        dotesStatBonus[efecto.stat] = (dotesStatBonus[efecto.stat] ?? 0) + efecto.valor
      } else if (efecto.tipo === 'stat-elegir' && doteData.statElegido) {
        dotesStatBonus[doteData.statElegido] = (dotesStatBonus[doteData.statElegido] ?? 0) + efecto.valor
      } else if (efecto.tipo === 'resiliente' && doteData.statElegido) {
        dotesStatBonus[doteData.statElegido] = (dotesStatBonus[doteData.statElegido] ?? 0) + 1
      }
    }
  }

  const puntuaciones = {}
  for (const car of CARACTERISTICAS_ORDER) {
    const base  = puntuacionesBase?.[car] ?? null
    const bonus = (bonusStats[car] ?? 0) + (allASIBonus[car] ?? 0) + (dotesStatBonus[car] ?? 0)
    // Cap at 20 (standard D&D rule — only class features like Cuerpo y mente can exceed this)
    puntuaciones[car] = base != null ? Math.min(base + bonus, 20) : null
  }

  // Apply automatic stat boosts from class features (e.g. Monje lv20 "Cuerpo y mente")
  // These use their own maxStat cap (may exceed 20)
  if (clase?.rasgosNivel) {
    for (let n = 1; n <= nivel; n++) {
      for (const r of clase.rasgosNivel[n] ?? []) {
        if (r.aplicaStats) {
          for (const [stat, amt] of Object.entries(r.aplicaStats)) {
            if (puntuaciones[stat] != null) {
              puntuaciones[stat] = Math.min(puntuaciones[stat] + amt, r.maxStat ?? 20)
            }
          }
        }
      }
    }
  }

  // ── Modificadores ──
  const mods = {}
  for (const car of CARACTERISTICAS_ORDER) {
    mods[car] = puntuaciones[car] != null ? calcModificador(puntuaciones[car]) : null
  }

  const BONO = getBonoCompetencia(nivel)

  // ── Competencias ──
  const competenciasHabilidad = new Set([
    ...(trasfondo?.competenciasHabilidades ?? []),
    ...(habilidadesClase ?? []),
    ...(habilidadDiestro  ? [habilidadDiestro]  : []),
    ...(habilidadSentidos ? [habilidadSentidos] : []),
    ...(habilidadesHabilidoso ?? []),
  ])
  const competenciasSalvacion = new Set(clase?.tiradasSalvacion ?? [])
  const pericias = new Set()  // expertise: double proficiency bonus

  // Process dotes' skill/save/resiliente/pericia effects
  for (const [lvl, doteData] of Object.entries(dotesElegidos ?? {})) {
    if (Number(lvl) > nivel || !doteData?.doteId) continue
    const dote = getDoteById(doteData.doteId)
    if (!dote) continue
    for (const efecto of dote.efectos) {
      if (efecto.tipo === 'skill-elegir') {
        if (efecto.pool === 'todas') {
          ;(doteData.skillsElegidos ?? []).forEach(s => competenciasHabilidad.add(s))
        }
      }
      if (efecto.tipo === 'skill-fijo') {
        if (efecto.habilidades === 'todas') {
          HABILIDADES_LISTA.forEach(h => competenciasHabilidad.add(h))
        } else {
          ;(efecto.habilidades ?? []).forEach(h => competenciasHabilidad.add(h))
        }
      }
      if (efecto.tipo === 'skill-o-pericia-elegir') {
        const sk = doteData.skillOPericiaElegido
        if (sk) {
          if (competenciasHabilidad.has(sk)) {
            pericias.add(sk)
          } else {
            competenciasHabilidad.add(sk)
          }
        }
      }
      if (efecto.tipo === 'pericia-elegir') {
        ;(doteData.periciasElegidas ?? []).forEach(p => pericias.add(p))
      }
      if (efecto.tipo === 'resiliente' && doteData.statElegido) {
        competenciasSalvacion.add(doteData.statElegido)
      }
    }
  }

  // Process dotesLibres skill/save/pericia effects
  for (const doteData of normalizedDotesLibres) {
    if (!doteData?.doteId) continue
    const dote = getDoteById(doteData.doteId)
    if (!dote) continue
    for (const efecto of dote.efectos) {
      if (efecto.tipo === 'skill-elegir') {
        if (efecto.pool === 'todas') {
          ;(doteData.skillsElegidos ?? []).forEach(s => competenciasHabilidad.add(s))
        }
      }
      if (efecto.tipo === 'skill-fijo') {
        if (efecto.habilidades === 'todas') {
          HABILIDADES_LISTA.forEach(h => competenciasHabilidad.add(h))
        } else {
          ;(efecto.habilidades ?? []).forEach(h => competenciasHabilidad.add(h))
        }
      }
      if (efecto.tipo === 'skill-o-pericia-elegir') {
        const sk = doteData.skillOPericiaElegido
        if (sk) {
          if (competenciasHabilidad.has(sk)) {
            pericias.add(sk)
          } else {
            competenciasHabilidad.add(sk)
          }
        }
      }
      if (efecto.tipo === 'pericia-elegir') {
        ;(doteData.periciasElegidas ?? []).forEach(p => pericias.add(p))
      }
      if (efecto.tipo === 'resiliente' && doteData.statElegido) {
        competenciasSalvacion.add(doteData.statElegido)
      }
    }
  }

  // ── Tiradas de salvación ──
  const tiradasSalvacion = {}
  for (const car of CARACTERISTICAS_ORDER) {
    const mod       = mods[car]
    const competente = competenciasSalvacion.has(car)
    tiradasSalvacion[car] = {
      total:       mod != null ? mod + (competente ? BONO : 0) : null,
      competencia: competente,
    }
  }

  // ── Habilidades ──
  const habilidades = {}
  for (const [hab, car] of Object.entries(HABILIDADES)) {
    const mod       = mods[car]
    const competente = competenciasHabilidad.has(hab)
    const pericia   = pericias.has(hab)
    habilidades[hab] = {
      total:       mod != null ? mod + (pericia ? BONO * 2 : competente ? BONO : 0) : null,
      competencia: competente || pericia,
      pericia,
      caracteristica: car,
    }
  }

  // ── Combate ──
  const desMod = mods['Destreza']     ?? 0
  const conMod = mods['Constitución'] ?? 0
  const sabMod = mods['Sabiduría']    ?? 0
  const carMod = mods['Carisma']      ?? 0

  // Clase armadura base según clase/subclase (Defensa sin armadura u otras fórmulas)
  let ca = 10 + desMod  // default sin armadura
  if (claseId === 'barbaro') {
    // Defensa sin armadura: 10 + DES + CON (escudo permitido)
    ca = 10 + desMod + conMod
  } else if (claseId === 'monje') {
    // Defensa sin armadura: 10 + DES + SAB (sin escudo)
    ca = 10 + desMod + sabMod
  } else if (
    (claseId === 'hechicero' && subclaseId === 'draconico' && nivel >= 3) ||
    (claseId === 'bardo'     && subclaseId === 'danza'     && nivel >= 3)
  ) {
    // Resistencia dracónica / Juego de pies deslumbrante: 10 + DES + CAR (sin armadura)
    ca = 10 + desMod + carMod
  }

  // Bonus de la elección de nivel 1 (p. ej. Estilo de combate: Defensa → +1 CA con armadura)
  const caEleccionBonus = clase?.eleccionNivel1?.opciones
    ?.find(o => o.id === eleccionNivel1)?.beneficios?.caBonus ?? 0
  ca += caEleccionBonus
  const iniciativa  = desMod
  const velocidad   = especie?.velocidad ?? '9 m'

  // PG: nivel 1 = máximo del dado + CON; niveles 2+ suman valor fijo + CON por nivel
  const dadoGolpe = clase?.dadoGolpe ?? 'd8'
  const pgBase = getPGMax(nivel, dadoGolpe, conMod, pgGananciaPorNivel)
  const pgBonusEspecie = (especie?.pgPorNivelBonus ?? 0) * nivel
  const pgMax = pgBase + pgBonusEspecie
  const itemOcultosSet = new Set(itemOcultos ?? [])
  const ataquesOcultosSet = new Set(ataquesOcultos ?? [])

  // ── Percepción pasiva ──
  const percepcionTotal  = habilidades['Percepción']?.total
  const percepcionPasiva = 10 + (percepcionTotal ?? sabMod)

  return {
    // Identidad
    nombre:      descripcion?.nombre ?? '',
    clase,
    nivel,
    trasfondo,
    especie,
    alineamiento: descripcion?.alineamiento
      ? (ALINEAMIENTOS_NOMBRE[descripcion.alineamiento] ?? descripcion.alineamiento)
      : null,

    // Progresión
    bonificadorCompetencia: BONO,
    xpNivelActual:    getXPNivelActual(nivel),
    xpSiguienteNivel: getXPSiguienteNivel(nivel),

    // Puntuaciones
    puntuaciones,
    puntuacionesBase: puntuacionesBase ?? {},
    bonusTrasfondo:   bonusStats,
    modificadores:    mods,

    // Combate
    ca,
    iniciativa,
    velocidad,
    pgMax,
    dadosGolpe: `${nivel}${dadoGolpe}`,

    // Competencias
    habilidadesCompetencia:       [...competenciasHabilidad],
    habilidadesPericias:          [...pericias],
    tiradasSalvacionCompetencia:  [...competenciasSalvacion],
    tiradasSalvacion,
    habilidades,
    percepcionPasiva,

    // Narrativa
    idiomas:           idiomas ?? [],
    apariencia:        descripcion?.apariencia ?? {},
    personalidad:      descripcion?.personalidad ?? {},
    dote:              trasfondo?.dote ?? null,
    habilidadDiestro:       habilidadDiestro  ?? null,
    habilidadSentidos:      habilidadSentidos ?? null,
    habilidadesHabilidoso:  habilidadesHabilidoso ?? [],
    equipo:            equipo ?? { opcionClase: null, opcionTrasfondo: null, oroDisponible: 0, extras: [] },
    monedasEquipoInicial: getMonedasInicialesDesdeEquipo({ claseId, trasfondoId, equipo }),

    // Equipo resuelto (lista de ítems para mostrar en la planilla)
    equipoResuelto: (() => {
      const items = []
      const eqClase     = claseId     ? EQUIPO_POR_CLASE[claseId]         : null
      const eqTrasfondo = trasfondoId ? EQUIPO_POR_TRASFONDO[trasfondoId] : null
      let idx = 0

      const pushItem = (texto, fuente) => {
        if (textoEsSoloMonedas(texto)) return
        const key = `${fuente}:${idx}:${texto}`
        idx += 1
        if (itemOcultosSet.has(key)) return
        items.push({ key, texto, fuente })
      }

      if (equipo?.opcionClase === 'A' && eqClase?.opcionA) {
        eqClase.opcionA.forEach(i => pushItem(i, clase?.nombre ?? 'Clase'))
      }
      if (equipo?.opcionTrasfondo === 'A' && eqTrasfondo?.opcionA) {
        eqTrasfondo.opcionA.forEach(i => pushItem(i, trasfondo?.nombre ?? 'Trasfondo'))
      }
      if (equipo?.extras?.length) {
        equipo.extras.forEach(i => pushItem(i, 'Extra'))
      }
      if (equipo?.bagatela != null) {
        pushItem(BAGATELAS[equipo.bagatela], 'Bagatela')
      }
      return items
    })(),

    // Competencias texto
    competenciasArmaduras: (() => {
      const base = [...(clase?.entrenamientoArmaduras ?? [])]
      if (claseId === 'clerigo' && eleccionNivel1 === 'protector' && !base.includes('Pesadas')) base.push('Pesadas')
      if (claseId === 'druida'  && eleccionNivel1 === 'guardian'  && !base.includes('Medias')) base.push('Medias')
      return base
    })(),
    competenciasHerramientas: trasfondo ? [trasfondo.competenciaHerramienta].filter(Boolean) : [],

    // Elección de nivel 1
    eleccionNivel1: eleccionNivel1 ?? null,
    eleccionNivel1Nombre: (() => {
      if (!clase?.eleccionNivel1 || !eleccionNivel1) return null
      return clase.eleccionNivel1.opciones.find(o => o.id === eleccionNivel1)?.nombre ?? null
    })(),

    // Ataques auto-calculados desde el equipo resuelto
    ataques: (() => {
      const eqClase     = claseId     ? EQUIPO_POR_CLASE[claseId]         : null
      const eqTrasfondo = trasfondoId ? EQUIPO_POR_TRASFONDO[trasfondoId] : null
      const fuentes = []
      let idx = 0
      const pushFuente = (texto, fuente) => {
        const itemKey = `${fuente}:${idx}:${texto}`
        idx += 1
        if (itemOcultosSet.has(itemKey)) return
        fuentes.push({ texto, fuente, itemKey })
      }
      if (equipo?.opcionClase === 'A' && eqClase?.opcionA) {
        eqClase.opcionA.forEach(t => pushFuente(t, clase?.nombre ?? 'Clase'))
      }
      if (equipo?.opcionTrasfondo === 'A' && eqTrasfondo?.opcionA) {
        eqTrasfondo.opcionA.forEach(t => pushFuente(t, trasfondo?.nombre ?? 'Trasfondo'))
      }
      if (equipo?.extras?.length) {
        equipo.extras.forEach(t => pushFuente(t, 'Extra'))
      }

      const fueMod = mods['Fuerza']    ?? 0
      const desMod = mods['Destreza']  ?? 0
      const lista  = []

      for (const f of fuentes) {
        const arma = resolverArma(f.texto)
        if (!arma) continue

        let mod
        if (arma.caracteristica === 'finura') {
          mod = Math.max(fueMod, desMod)
        } else if (arma.caracteristica === 'Destreza') {
          mod = desMod
        } else {
          mod = fueMod
        }
        const bonAtaque = mod + BONO
        const key = `auto:${f.itemKey}:${arma.nombre}`
        if (ataquesOcultosSet.has(key)) continue
        lista.push({
          key,
          fuente: f.fuente,
          itemKey: f.itemKey,
          nombre:    arma.nombre,
          bonAtaque,
          daño:      `${arma.daño}${arma.daño2 ? ` (versatil: ${arma.daño2})` : ''}`,
          tipo:      arma.tipo,
          caracteristica: arma.caracteristica,
          propiedades: arma.propiedades ?? [],
          maestria: arma.maestria ?? null,
        })
      }
      return lista
    })(),

    // Lanzamiento de conjuros (solo clases lanzadoras)
    conjuros: (() => {
      const aptitudCar = APTITUD_MAGICA[claseId]
      if (!aptitudCar) return null
      const aptMod = mods[aptitudCar] ?? 0
      const tipoMagia = TIPO_MAGIA[claseId] ?? null
      const tipoPrepara = TIPO_PREPARACION[claseId] ?? 'tabla'
      return {
        caracteristica:    aptitudCar,
        modificador:       aptMod,
        cdSalvacion:       8 + aptMod + BONO,
        bonAtaque:         aptMod + BONO,
        tipo:              tipoMagia,
        tipoPreparacion:   tipoPrepara,
        espacios:          getEspaciosConjuro(claseId, nivel),
        trucosMax:         getTrucosMax(claseId, nivel),
        preparadosMax:     getConjurosPreparadosMax(claseId, nivel),
        nivelMaxConjuro:   getNivelMaxConjuro(claseId, nivel),
        grimorioMax:       tipoPrepara === 'grimorio' ? getGrimorioMax(nivel) : 0,
        siemprePreparados: (() => {
          const lista = subclaseId ? getConjurosSubclase(claseId, subclaseId, nivel) : []
          // Agregar conjuros de linaje de especie (p.ej. elfo altivo, drow, tiefling, gnomo)
          if (linaje?.conjuros) {
            for (const c of linaje.conjuros) {
              if (nivel >= c.nivel && c.nombre) lista.push(c.nombre)
            }
          }
          return lista
        })(),
      }
    })(),

    // Rasgos de clase acumulados hasta el nivel actual
    rasgosClase: (() => {
      if (!clase?.rasgosNivel) return []
      const lista = []
      for (let n = 1; n <= nivel; n++) {
        const rasgos = clase.rasgosNivel[n] ?? []
        rasgos.forEach(r => lista.push({ ...r, nivelObtenido: n }))
      }
      return lista
    })(),

    maestriaArmas,

    // Metadatos para UI de planilla
    _claseHabilidadesElegir:   clase?.competenciasHabilidades?.elegir   ?? 0,
    _claseHabilidadesOpciones: clase?.competenciasHabilidades?.opciones ?? [],
    _habilidadesClaseElegidas: habilidadesClase ?? [],
  }
}
