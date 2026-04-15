// Fuente: Manual del Jugador D&D 2024 - Capítulo 2: Crear un personaje (Paso 5: Equipo)
// Capítulo 5 para listas de objetos de referencia

// ── Packs de equipo estándar (Cap. 5) ────────────────────────────────

export const PACKS = {
  explorador: {
    nombre: 'Pack de explorador',
    contenido: [
      'Mochila', 'Saco de dormir', 'Ración de viaje (10 días)',
      'Cantimplora', 'Yesca y eslabón', 'Hacha pequeña',
      'Cuerdas de cáñamo (15 m)', 'Antorcha (10)',
    ],
  },
  explorador_dungeonero: {
    nombre: 'Pack de dungeonero',
    contenido: [
      'Mochila', 'Palanca', 'Martillo de carpintero', 'Estacas de madera (10)',
      'Linterna sorda', 'Aceite (5 frascos)', 'Ración de viaje (5 días)',
      'Cuerda de cáñamo (15 m)',
    ],
  },
  sacerdote: {
    nombre: 'Pack de sacerdote',
    contenido: [
      'Mochila', 'Manta', 'Vela (10)', 'Caja de cerámica (para carbón)',
      'Vestido de misa', 'Ración de viaje (2 días)', 'Agua bendita',
    ],
  },
  diplomatico: {
    nombre: 'Pack de diplomático',
    contenido: [
      'Baúl', 'Ropa fina', 'Tinta y pluma (5)', 'Pergamino (5 hojas)',
      'Lacre y sello', 'Ropa de cama', 'Espejo de acero',
    ],
  },
  escolar: {
    nombre: 'Pack de erudito',
    contenido: [
      'Mochila', 'Libro de conocimiento', 'Tinta y pluma',
      'Pergamino (10 hojas)', 'Bolsa de arena', 'Cuchillo pequeño',
    ],
  },
  ladrón: {
    nombre: 'Pack de ladrón',
    contenido: [
      'Mochila', 'Palanca', 'Cuerda de seda (15 m)', 'Ropa oscura',
      'Gafas de visión nocturna', 'Bolsa de bolas de hierro',
      'Ración de viaje (5 días)',
    ],
  },
}

// ── Equipo por clase (PHB 2024, Cap. 2) ─────────────────────────────
// opcionA: equipo completo (lista de objetos)
// opcionB: piezas de oro para comprar lo que quieras

export const EQUIPO_POR_CLASE = {
  barbaro: {
    opcionA: [
      'Hacha grande (Arma marcial)',
      'Hacha de mano ×4',
      'Pack de explorador',
      'Escudo',
    ],
    opcionB: 75,
  },
  bardo: {
    opcionA: [
      'Estoque (Arma marcial)',
      'Pack de diplomático',
      'Laúd (instrumento musical)',
      'Armadura de cuero',
      'Daga',
    ],
    opcionB: 125,
  },
  brujo: {
    opcionA: [
      'Ballesta ligera + 20 virotes',
      'Foco arcano',
      'Pack de dungeonero',
      'Armadura de cuero',
      'Daga ×2',
    ],
    opcionB: 100,
  },
  clerigo: {
    opcionA: [
      'Maza (Arma simple)',
      'Cota de malla',
      'Ballesta ligera + 20 virotes',
      'Pack de sacerdote',
      'Escudo',
      'Símbolo sagrado',
    ],
    opcionB: 110,
  },
  druida: {
    opcionA: [
      'Escudo de madera',
      'Cimitarra (Arma marcial)',
      'Armadura de cuero',
      'Pack de explorador',
      'Foco druídico',
    ],
    opcionB: 50,
  },
  explorador: {
    opcionA: [
      'Cota de escamas',
      'Espada corta (Arma marcial)',
      'Pack de dungeonero',
      'Arco largo + 20 flechas',
    ],
    opcionB: 150,
  },
  guerrero: {
    opcionA: [
      'Cota de mallas',
      'Arma marcial cuerpo a cuerpo (a elegir) + Escudo',
      'Ballesta ligera + 20 virotes',
      'Pack de dungeonero',
    ],
    opcionB: 175,
  },
  hechicero: {
    opcionA: [
      'Ballesta ligera + 20 virotes',
      'Foco arcano',
      'Pack de dungeonero',
      'Daga ×2',
    ],
    opcionB: 50,
  },
  mago: {
    opcionA: [
      'Bastón (Arma simple)',
      'Foco arcano',
      'Pack de erudito',
      'Libro de conjuros',
    ],
    opcionB: 110,
  },
  monje: {
    opcionA: [
      'Espada corta (Arma marcial)',
      'Pack de dungeonero',
      'Dardo ×10',
    ],
    opcionB: 50,
  },
  paladin: {
    opcionA: [
      'Arma marcial cuerpo a cuerpo (a elegir) + Escudo',
      'Cota de mallas',
      'Pack de sacerdote',
      'Símbolo sagrado',
    ],
    opcionB: 150,
  },
  picaro: {
    opcionA: [
      'Estoque (Arma marcial)',
      'Arco corto + 20 flechas',
      'Pack de ladrón',
      'Armadura de cuero',
      'Daga ×2',
      'Herramientas de ladrón',
    ],
    opcionB: 100,
  },
}

// ── Equipo por trasfondo (PHB 2024, Cap. 4) ──────────────────────────
// opcionA: equipo específico del trasfondo
// opcionB: 50 po para comprar equipo libremente (igual para todos los trasfondos)

export const EQUIPO_POR_TRASFONDO = {
  acolito: {
    opcionA: [
      'Símbolo sagrado', 'Libro de plegarias o rueda de plegarias',
      'Incienso (5 barras)', 'Vestimentas', 'Ropa de viaje comunes', '15 po',
    ],
    opcionB: 50,
  },
  animador: {
    opcionA: [
      'Instrumento musical (a elegir)', 'Carta de recomendación de un mecenas',
      'Disfraz', 'Ropa de viaje comunes', '15 po',
    ],
    opcionB: 50,
  },
  artesano: {
    opcionA: [
      'Herramientas de artesano (a elegir)', 'Carta de presentación del gremio',
      'Ropa de viaje comunes', '15 po',
    ],
    opcionB: 50,
  },
  campesino: {
    opcionA: [
      'Pala', 'Olla de hierro', 'Herramientas de carpintero',
      'Ropa de viaje comunes', '10 po',
    ],
    opcionB: 50,
  },
  charlatan: {
    opcionA: [
      'Dados cargados o baraja marcada', 'Conjunto de disfraces',
      'Útiles para falsificar', 'Ropa fina', '15 po',
    ],
    opcionB: 50,
  },
  comerciante: {
    opcionA: [
      'Herramientas de navegante', 'Balanza comercial', 'Ropa fina', '25 po',
    ],
    opcionB: 50,
  },
  criminal: {
    opcionA: [
      'Palanca', 'Herramientas de ladrón', 'Ropa oscura con capucha', '15 po',
    ],
    opcionB: 50,
  },
  ermitano: {
    opcionA: [
      'Útiles de herborista', 'Diario de meditación',
      'Ropa de viaje comunes', '5 po',
    ],
    opcionB: 50,
  },
  erudito: {
    opcionA: [
      'Libro de conocimiento (campo a elegir)', 'Tinta y pluma',
      'Pergamino (5 hojas)', 'Ropa de viaje comunes', '10 po',
    ],
    opcionB: 50,
  },
  guerrero: {
    opcionA: [
      'Trofeo de un enemigo vencido', 'Ropa de viaje comunes', '10 po',
    ],
    opcionB: 50,
  },
  guia: {
    opcionA: [
      'Herramientas de cartógrafo', 'Mapa de la región conocida',
      'Ropa de viaje comunes', '10 po',
    ],
    opcionB: 50,
  },
  marinero: {
    opcionA: [
      'Soga de seda (15 m)', 'Talismán de la suerte', 'Ropa de viaje comunes', '10 po',
    ],
    opcionB: 50,
  },
  noble: {
    opcionA: [
      'Ropa fina', 'Anillo con el escudo familiar',
      'Pergamino de abolengo', '25 po',
    ],
    opcionB: 50,
  },
  soldado: {
    opcionA: [
      'Insignia de rango', 'Trofeo de batalla', 'Naipes o dados',
      'Ropa de viaje comunes', '10 po',
    ],
    opcionB: 50,
  },
  vagabundo: {
    opcionA: [
      'Navaja pequeña', 'Plano de la ciudad en la que creciste',
      'Recuerdo de los padres', 'Ropa de viaje comunes', '10 po',
    ],
    opcionB: 50,
  },
}


// ── Packs de equipo estándar (Cap. 5) ────────────────────────────────

export const MONEDAS_KEYS = ['PC', 'PP', 'PE', 'PO', 'PA']

const MONEDA_LABEL_TO_KEY = {
  pc: 'PC',
  pp: 'PP',
  pe: 'PE',
  po: 'PO',
  pa: 'PA',
}

export function crearMonedasVacias() {
  return { PC: 0, PP: 0, PE: 0, PO: 0, PA: 0 }
}

export function sumarMonedas(base = crearMonedasVacias(), extra = crearMonedasVacias()) {
  const out = { ...crearMonedasVacias(), ...base }
  for (const key of MONEDAS_KEYS) out[key] = (out[key] ?? 0) + (extra[key] ?? 0)
  return out
}

export function restarMonedas(base = crearMonedasVacias(), resta = crearMonedasVacias()) {
  const out = { ...crearMonedasVacias(), ...base }
  for (const key of MONEDAS_KEYS) out[key] = (out[key] ?? 0) - (resta[key] ?? 0)
  return out
}

export function extraerMonedasDeTexto(texto = '') {
  const out = crearMonedasVacias()
  for (const match of String(texto).matchAll(/(\d+)\s*(pc|pp|pe|po|pa)\b/gi)) {
    const cantidad = Number(match[1])
    const key = MONEDA_LABEL_TO_KEY[match[2].toLowerCase()]
    if (!Number.isNaN(cantidad) && key) out[key] += cantidad
  }
  return out
}

export function textoEsSoloMonedas(texto = '') {
  const sinMonedas = String(texto)
    .replace(/\d+\s*(pc|pp|pe|po|pa)\b/gi, '')
    .replace(/[,+/()\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return sinMonedas.length === 0
}

export function getMonedasInicialesDesdeEquipo({ claseId, trasfondoId, equipo } = {}) {
  const monedas = crearMonedasVacias()
  const eqClase = claseId ? EQUIPO_POR_CLASE[claseId] : null
  const eqTrasfondo = trasfondoId ? EQUIPO_POR_TRASFONDO[trasfondoId] : null

  if (equipo?.opcionClase === 'A' && eqClase?.opcionA) {
    for (const item of eqClase.opcionA) {
      if (textoEsSoloMonedas(item)) Object.assign(monedas, sumarMonedas(monedas, extraerMonedasDeTexto(item)))
    }
  } else if (equipo?.opcionClase === 'B' && eqClase?.opcionB) {
    monedas.PO += Number(eqClase.opcionB) || 0
  }

  if (equipo?.opcionTrasfondo === 'A' && eqTrasfondo?.opcionA) {
    for (const item of eqTrasfondo.opcionA) {
      if (textoEsSoloMonedas(item)) Object.assign(monedas, sumarMonedas(monedas, extraerMonedasDeTexto(item)))
    }
  } else if (equipo?.opcionTrasfondo === 'B' && eqTrasfondo?.opcionB) {
    monedas.PO += Number(eqTrasfondo.opcionB) || 0
  }

  return monedas
}

