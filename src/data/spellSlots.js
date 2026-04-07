// Fuente: Manual del Jugador 2024 — Tablas de espacios de conjuro por clase y nivel

// ── Tipos de lanzamiento ────────────────────────────────────────────────
export const TIPO_MAGIA = {
  bardo:      'completo',
  clerigo:    'completo',
  druida:     'completo',
  hechicero:  'completo',
  mago:       'completo',
  paladin:    'mitad',
  explorador: 'mitad',
  brujo:      'pacto',
}

// ── Espacios de conjuro para lanzadores COMPLETOS (bardo/clérigo/druida/hechicero/mago)
// Índice 0 = nivel 1 de conjuro, índice 8 = nivel 9
// [Nv1, Nv2, Nv3, Nv4, Nv5, Nv6, Nv7, Nv8, Nv9]
export const ESPACIOS_COMPLETO = {
  1:  [2, 0, 0, 0, 0, 0, 0, 0, 0],
  2:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
  3:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
  4:  [4, 3, 0, 0, 0, 0, 0, 0, 0],
  5:  [4, 3, 2, 0, 0, 0, 0, 0, 0],
  6:  [4, 3, 3, 0, 0, 0, 0, 0, 0],
  7:  [4, 3, 3, 1, 0, 0, 0, 0, 0],
  8:  [4, 3, 3, 2, 0, 0, 0, 0, 0],
  9:  [4, 3, 3, 3, 1, 0, 0, 0, 0],
  10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
  11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
  20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
}

// ── Espacios de conjuro para lanzadores de MITAD (paladín/explorador)
// Solo acceden a niveles 1-5; comienzan a lanzar en nivel de clase 2
export const ESPACIOS_MITAD = {
  1:  [0, 0, 0, 0, 0],
  2:  [2, 0, 0, 0, 0],
  3:  [3, 0, 0, 0, 0],
  4:  [3, 0, 0, 0, 0],
  5:  [4, 2, 0, 0, 0],
  6:  [4, 2, 0, 0, 0],
  7:  [4, 3, 0, 0, 0],
  8:  [4, 3, 0, 0, 0],
  9:  [4, 3, 2, 0, 0],
  10: [4, 3, 2, 0, 0],
  11: [4, 3, 3, 0, 0],
  12: [4, 3, 3, 0, 0],
  13: [4, 3, 3, 1, 0],
  14: [4, 3, 3, 1, 0],
  15: [4, 3, 3, 2, 0],
  16: [4, 3, 3, 2, 0],
  17: [4, 3, 3, 3, 1],
  18: [4, 3, 3, 3, 1],
  19: [4, 3, 3, 3, 2],
  20: [4, 3, 3, 3, 2],
}

// ── Magia del Pacto (Brujo) — slots recuperados en descanso corto/largo
// { cantidad: N, nivel: N }
export const ESPACIOS_PACTO = {
  1:  { cantidad: 1, nivel: 1 },
  2:  { cantidad: 2, nivel: 1 },
  3:  { cantidad: 2, nivel: 2 },
  4:  { cantidad: 2, nivel: 2 },
  5:  { cantidad: 2, nivel: 3 },
  6:  { cantidad: 2, nivel: 3 },
  7:  { cantidad: 2, nivel: 4 },
  8:  { cantidad: 2, nivel: 4 },
  9:  { cantidad: 2, nivel: 5 },
  10: { cantidad: 2, nivel: 5 },
  11: { cantidad: 3, nivel: 5 },
  12: { cantidad: 3, nivel: 5 },
  13: { cantidad: 3, nivel: 5 },
  14: { cantidad: 3, nivel: 5 },
  15: { cantidad: 3, nivel: 5 },
  16: { cantidad: 3, nivel: 5 },
  17: { cantidad: 4, nivel: 5 },
  18: { cantidad: 4, nivel: 5 },
  19: { cantidad: 4, nivel: 5 },
  20: { cantidad: 4, nivel: 5 },
}

// ── Tipo de preparación por clase ─────────────────────────────────────
// lista_completa: conoce TODOS los conjuros de su lista (Clérigo, Druida, Paladín)
// grimorio: aprende conjuros en un libro de conjuros (Mago)
// tabla: elige conjuros preparados directamente de la lista (Bardo, Hechicero, Brujo, Explorador)
export const TIPO_PREPARACION = {
  bardo:      'tabla',
  clerigo:    'lista_completa',
  druida:     'lista_completa',
  hechicero:  'tabla',
  mago:       'grimorio',
  paladin:    'lista_completa',
  explorador: 'tabla',
  brujo:      'tabla',
}

/** Devuelve el tamaño recomendado del grimorio para un mago a un nivel dado.
 *  Nivel 1 = 6 conjuros, +2 por nivel adicional */
export function getGrimorioMax(nivel) {
  return 4 + nivel * 2
}

// ── Trucos conocidos por clase y nivel ─────────────────────────────────
// Explorador y paladín: 0 (salvo subclase especial, que manejamos aparte)
export const TRUCOS_CONOCIDOS = {
  bardo:     { 1:2, 4:3, 10:4 },   // sube en los niveles indicados
  clerigo:   { 1:3, 4:4, 10:5 },
  druida:    { 1:2, 4:3, 10:4 },
  hechicero: { 1:4, 4:5, 10:6 },
  mago:      { 1:3, 4:4, 10:5 },
  brujo:     { 1:2, 4:3, 10:4 },
  explorador:{ 1:0 },
  paladin:   { 1:0 },
}

/** Devuelve cuántos trucos puede conocer una clase a un nivel dado */
export function getTrucosMax(claseId, nivel) {
  const tabla = TRUCOS_CONOCIDOS[claseId]
  if (!tabla) return 0
  let resultado = 0
  for (const [lv, cantidad] of Object.entries(tabla)) {
    if (nivel >= Number(lv)) resultado = cantidad
  }
  return resultado
}

// ── Conjuros preparados máximos ─────────────────────────────────────────
// PHB 2024: TODAS las clases usan tablas fijas (ya no hay fórmula mod+nivel).

/** Tabla de conjuros preparados para BARDO (tabla fija) */
export const PREPARADOS_BARDO = {
  1:4, 2:5, 3:6, 4:7, 5:9, 6:10, 7:11, 8:12, 9:14, 10:15,
  11:16, 12:16, 13:17, 14:17, 15:18, 16:18, 17:19, 18:20, 19:21, 20:22,
}

/** Tabla de conjuros preparados para CLÉRIGO (tabla fija — misma progresión que Bardo) */
export const PREPARADOS_CLERIGO = {
  1:4, 2:5, 3:6, 4:7, 5:9, 6:10, 7:11, 8:12, 9:14, 10:15,
  11:16, 12:16, 13:17, 14:17, 15:18, 16:18, 17:19, 18:20, 19:21, 20:22,
}

/** Tabla de conjuros preparados para DRUIDA (tabla fija — misma progresión que Bardo) */
export const PREPARADOS_DRUIDA = {
  1:4, 2:5, 3:6, 4:7, 5:9, 6:10, 7:11, 8:12, 9:14, 10:15,
  11:16, 12:16, 13:17, 14:17, 15:18, 16:18, 17:19, 18:20, 19:21, 20:22,
}

/** Tabla de conjuros preparados para HECHICERO (tabla fija) */
export const PREPARADOS_HECHICERO = {
  1:2, 2:4, 3:6, 4:7, 5:9, 6:10, 7:11, 8:12, 9:14, 10:15,
  11:16, 12:16, 13:17, 14:17, 15:18, 16:18, 17:19, 18:20, 19:21, 20:22,
}

/** Tabla de conjuros preparados para MAGO (tabla fija — misma progresión que Bardo) */
export const PREPARADOS_MAGO = {
  1:4, 2:5, 3:6, 4:7, 5:9, 6:10, 7:11, 8:12, 9:14, 10:15,
  11:16, 12:16, 13:17, 14:17, 15:18, 16:18, 17:19, 18:20, 19:21, 20:22,
}

/** Tabla de conjuros preparados para BRUJO (tabla fija) */
export const PREPARADOS_BRUJO = {
  1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, 9:10, 10:10,
  11:11, 12:11, 13:12, 14:12, 15:13, 16:13, 17:14, 18:14, 19:15, 20:15,
}

/** Tabla de conjuros preparados para PALADÍN (tabla fija — misma progresión que Brujo) */
export const PREPARADOS_PALADIN = {
  1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, 9:10, 10:10,
  11:11, 12:11, 13:12, 14:12, 15:13, 16:13, 17:14, 18:14, 19:15, 20:15,
}

/** Tabla de conjuros preparados para EXPLORADOR (tabla fija — misma progresión que Brujo) */
export const PREPARADOS_EXPLORADOR = {
  1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, 9:10, 10:10,
  11:11, 12:11, 13:12, 14:12, 15:13, 16:13, 17:14, 18:14, 19:15, 20:15,
}

/**
 * Devuelve el máximo de conjuros preparados según clase y nivel.
 * PHB 2024: todas las clases usan tablas fijas.
 * @param {string} claseId
 * @param {number} nivel
 * @returns {number}
 */
export function getConjurosPreparadosMax(claseId, nivel) {
  switch (claseId) {
    case 'bardo':      return PREPARADOS_BARDO[nivel]      ?? 0
    case 'clerigo':    return PREPARADOS_CLERIGO[nivel]     ?? 0
    case 'druida':     return PREPARADOS_DRUIDA[nivel]      ?? 0
    case 'hechicero':  return PREPARADOS_HECHICERO[nivel]   ?? 0
    case 'mago':       return PREPARADOS_MAGO[nivel]        ?? 0
    case 'brujo':      return PREPARADOS_BRUJO[nivel]       ?? 0
    case 'paladin':    return PREPARADOS_PALADIN[nivel]     ?? 0
    case 'explorador': return PREPARADOS_EXPLORADOR[nivel]  ?? 0
    default:           return 0
  }
}

/**
 * Devuelve los espacios de conjuro disponibles para una clase a un nivel.
 * - Full casters: array[9] (niveles 1-9)
 * - Half casters: array[5] (niveles 1-5)
 * - Brujo: { cantidad, nivel } (pacto)
 * - Otros: null
 */
export function getEspaciosConjuro(claseId, nivel) {
  const tipo = TIPO_MAGIA[claseId]
  if (!tipo) return null
  if (tipo === 'completo') return ESPACIOS_COMPLETO[nivel] ?? null
  if (tipo === 'mitad')    return ESPACIOS_MITAD[nivel]    ?? null
  if (tipo === 'pacto')    return ESPACIOS_PACTO[nivel]    ?? null
  return null
}

/**
 * Devuelve el nivel máximo de conjuro al que puede acceder una clase/nivel.
 */
export function getNivelMaxConjuro(claseId, nivel) {
  const slots = getEspaciosConjuro(claseId, nivel)
  if (!slots) return 0
  if (TIPO_MAGIA[claseId] === 'pacto') return slots.nivel
  for (let i = slots.length - 1; i >= 0; i--) {
    if (slots[i] > 0) return i + 1
  }
  return 0
}

// ── Conjuros extra de subclase (siempre preparados) ─────────────────────
// Mapa: claseId → subclaseId → { nivelClase: [nombres de conjuro] }
// Los conjuros listados se consideran "siempre preparados" y no cuentan
// contra el límite de conjuros preparados del personaje.
// Las claves de subclase coinciden exactamente con los `id` de classes.js.

export const CONJUROS_SUBCLASE = {
  brujo: {
    celestial: {
      3:  ['Auxilio', 'Curar Heridas', 'Llama Sagrada', 'Luz', 'Restablecimiento Menor', 'Saeta Guía'],
      5:  ['Luz del Día', 'Revivir'],
      7:  ['Guardián de la Fe', 'Muro de Fuego'],
      9:  ['Invocar Celestial', 'Restablecimiento Mayor'],
    },
    feerico: {
      3:  ['Calmar Emociones', 'Dormir', 'Fuego Feérico', 'Fuerza Fantasmal', 'Paso Brumoso'],
      5:  ['Crecimiento Vegetal', 'Desplazamiento'],
      7:  ['Dominar Bestia', 'Invisibilidad Mejorada'],
      9:  ['Apariencia', 'Dominar Persona'],
    },
    infernal: {
      3:  ['Manos Ardientes', 'Orden Imperiosa', 'Rayo Abrasador', 'Sugestión'],
      5:  ['Bola de Fuego', 'Nube Apestosa'],
      7:  ['Escudo de Fuego', 'Muro de Fuego'],
      9:  ['Geas', 'Plaga de Insectos'],
    },
    primigenio: {
      3:  ['Detectar Pensamientos', 'Fuerza Fantasmal', 'Risa Horrible de Tasha', 'Susurros Discordantes'],
      5:  ['Clarividencia', 'Hambre de Hadar'],
      7:  ['Confusión', 'Invocar Aberración'],
      9:  ['Alterar los Recuerdos', 'Telequinesis'],
    },
  },

  clerigo: {
    guerra: {
      3:  ['Arma Espiritual', 'Arma Mágica', 'Escudo de Fe', 'Saeta Guía'],
      5:  ['Espíritus Guardianes', 'Manto del Cruzado'],
      7:  ['Escudo de Fuego', 'Libertad de Movimiento'],
      9:  ['Golpe de Viento Acerado', 'Inmovilizar Monstruo'],
    },
    luz: {
      3:  ['Fuego Feérico', 'Manos Ardientes', 'Rayo Abrasador', 'Ver Invisibilidad'],
      5:  ['Bola de Fuego', 'Luz del Día'],
      7:  ['Muro de Fuego', 'Ojo Arcano'],
      9:  ['Escudriñar', 'Golpe Flamígero'],
    },
    vida: {
      3:  ['Auxilio', 'Bendición', 'Curar Heridas', 'Restablecimiento Menor'],
      5:  ['Palabra de Curación en Masa', 'Revivir'],
      7:  ['Aura de Vida', 'Guarda Contra la Muerte'],
      9:  ['Curar Heridas en Masa', 'Restablecimiento Mayor'],
    },
    enganio: {
      3:  ['Disfrazarse', 'Hechizar Persona', 'Invisibilidad', 'Pasar sin Rastro'],
      5:  ['Indetectable', 'Patrón Hipnótico'],
      7:  ['Confusión', 'Puerta Dimensional'],
      9:  ['Alterar los Recuerdos', 'Dominar Persona'],
    },
  },

  druida: {
    luna: {
      3:  ['Curar Heridas', 'Rayo de Luna', 'Voluta Estelar'],
      5:  ['Conjurar Animales'],
      7:  ['Fuente de Luz Lunar'],
      9:  ['Curar Heridas en Masa'],
    },
    // Círculo de la tierra: los conjuros dependen del terreno elegido.
    // Se manejan con subclaves tierra_arido, tierra_polar, etc.
    // El UI debe permitir elegir terreno; luego se busca aquí con la clave compuesta.
    tierra_arido: {
      3:  ['Manos Ardientes', 'Contorno Borroso', 'Descarga de Fuego'],
      5:  ['Bola de Fuego'],
      7:  ['Marchitar'],
      9:  ['Muro de Piedra'],
    },
    tierra_polar: {
      3:  ['Rayo de Escarcha', 'Inmovilizar Persona', 'Nube de Oscurecimiento'],
      5:  ['Tormenta de Aguanieve'],
      7:  ['Tormenta de Hielo'],
      9:  ['Cono de Frío'],
    },
    tierra_templado: {
      3:  ['Dormir', 'Paso Brumoso', 'Agarre Electrizante'],
      5:  ['Relámpago'],
      7:  ['Libertad de Movimiento'],
      9:  ['Paso Arbóreo'],
    },
    tierra_tropical: {
      3:  ['Telaraña', 'Salpicadura Ácida', 'Rayo Nauseabundo'],
      5:  ['Nube Apestosa'],
      7:  ['Polimorfar'],
      9:  ['Plaga de Insectos'],
    },
    mar: {
      3:  ['Hacer Añicos', 'Nube de Oscurecimiento', 'Ola Atronadora', 'Ráfaga de Viento', 'Rayo de Escarcha'],
      5:  ['Relámpago', 'Respirar Bajo el Agua'],
      7:  ['Controlar Agua', 'Tormenta de Hielo'],
      9:  ['Conjurar Elemental', 'Inmovilizar Monstruo'],
    },
  },

  explorador: {
    acechador: {
      3:  ['Disfrazarse'],
      5:  ['Truco de la Cuerda'],
      9:  ['Terror'],
      13: ['Invisibilidad Mejorada'],
      17: ['Apariencia'],
    },
    feerico: {
      3:  ['Hechizar Persona'],
      5:  ['Paso Brumoso'],
      9:  ['Invocar Feérico'],
      13: ['Puerta Dimensional'],
      17: ['Engañar'],
    },
  },

  paladin: {
    entrega: {
      3:  ['Escudo de Fe', 'Protección Contra el Bien y el Mal'],
      5:  ['Auxilio', 'Zona de la Verdad'],
      9:  ['Disipar Magia', 'Señal de Esperanza'],
      13: ['Guardián de la Fe', 'Libertad de Movimiento'],
      17: ['Comunión', 'Golpe Flamígero'],
    },
    gloria: {
      3:  ['Heroísmo', 'Saeta Guía'],
      5:  ['Arma Mágica', 'Potenciar Característica'],
      9:  ['Acelerar', 'Protección Contra Energía'],
      13: ['Compulsión', 'Libertad de Movimiento'],
      17: ['Conocer las Leyendas', 'Presencia Regia de Yolande'],
    },
    antiguos: {
      3:  ['Hablar con los Animales'],   // TODO: Añadir 'Golpe Apresador' a spells.js
      5:  ['Paso Brumoso', 'Rayo de Luna'],
      9:  ['Crecimiento Vegetal', 'Protección Contra Energía'],
      13: ['Piel Pétrea', 'Tormenta de Hielo'],
      17: ['Comunión con la Naturaleza', 'Paso Arbóreo'],
    },
    venganza: {
      3:  ['Marca del Cazador', 'Perdición'],
      5:  ['Inmovilizar Persona', 'Paso Brumoso'],
      9:  ['Acelerar', 'Protección Contra Energía'],
      13: ['Destierro', 'Puerta Dimensional'],
      17: ['Escudriñar', 'Inmovilizar Monstruo'],
    },
  },

  bardo: {
    glamour: {
      3:  ['Hechizar Persona', 'Imagen Múltiple'],
      6:  ['Orden Imperiosa'],
    },
  },
}

/**
 * Devuelve la lista de conjuros extra (siempre preparados) de una subclase
 * para un nivel de personaje dado. Acumula todos los niveles ≤ nivelPersonaje.
 *
 * Para Druida de la Tierra, subclaseId debe ser la clave compuesta
 * (ej. 'tierra_arido') en lugar de solo 'tierra'.
 *
 * @param {string} claseId - Ej: 'clerigo', 'brujo'
 * @param {string} subclaseId - Ej: 'guerra', 'feerico', 'tierra_arido'
 * @param {number} nivelPersonaje
 * @returns {string[]} nombres de conjuros
 */
export function getConjurosSubclase(claseId, subclaseId, nivelPersonaje) {
  const porClase = CONJUROS_SUBCLASE[claseId]
  if (!porClase) return []
  const tabla = porClase[subclaseId]
  if (!tabla) return []
  const resultado = []
  for (const [lv, lista] of Object.entries(tabla)) {
    if (nivelPersonaje >= Number(lv)) {
      resultado.push(...lista)
    }
  }
  return resultado
}
