// Fuente: Manual del Jugador D&D 2024 — Cap. 2, tabla "Progreso de los personajes" (pág. 36)

// XP requerida para alcanzar cada nivel y bonificador de competencia
export const PROGRESO_NIVEL = [
  { nivel: 1,  xp: 0,       bono: 2 },
  { nivel: 2,  xp: 300,     bono: 2 },
  { nivel: 3,  xp: 900,     bono: 2 },
  { nivel: 4,  xp: 2700,    bono: 2 },
  { nivel: 5,  xp: 6500,    bono: 3 },
  { nivel: 6,  xp: 14000,   bono: 3 },
  { nivel: 7,  xp: 23000,   bono: 3 },
  { nivel: 8,  xp: 34000,   bono: 3 },
  { nivel: 9,  xp: 48000,   bono: 4 },
  { nivel: 10, xp: 64000,   bono: 4 },
  { nivel: 11, xp: 85000,   bono: 4 },
  { nivel: 12, xp: 100000,  bono: 4 },
  { nivel: 13, xp: 120000,  bono: 5 },
  { nivel: 14, xp: 140000,  bono: 5 },
  { nivel: 15, xp: 165000,  bono: 5 },
  { nivel: 16, xp: 195000,  bono: 5 },
  { nivel: 17, xp: 225000,  bono: 6 },
  { nivel: 18, xp: 265000,  bono: 6 },
  { nivel: 19, xp: 305000,  bono: 6 },
  { nivel: 20, xp: 355000,  bono: 6 },
]

// PG fijos (promedio) que se suman a partir del nivel 2 — PHB 2024
// Nivel 1 siempre usa el máximo del dado de golpe
export const PG_FIJO_POR_DADO = {
  d6:  4,   // Hechicero, Mago
  d8:  5,   // Bardo, Brujo, Clérigo, Druida, Monje, Pícaro
  d10: 6,   // Explorador, Guerrero, Paladín
  d12: 7,   // Bárbaro
}

/** Devuelve el bonificador de competencia para un nivel dado. */
export function getBonoCompetencia(nivel) {
  return PROGRESO_NIVEL[Math.min(nivel, 20) - 1]?.bono ?? 2
}

/** Devuelve los PG máximos acumulados para un nivel y modificador de CON dados. */
export function getPGMax(nivel, dadoGolpe, modCon, pgGananciaPorNivel = {}) {
  const dadoNum = parseInt(dadoGolpe.replace('d', ''), 10) || 8
  const fijo    = PG_FIJO_POR_DADO[dadoGolpe] ?? 5
  // Nivel 1: máximo del dado + CON
  let total = dadoNum + modCon

  // Niveles 2+: usar ganancia guardada por nivel (tirada/fijo) o, si no existe, fijo por clase.
  for (let lvl = 2; lvl <= nivel; lvl++) {
    const gananciaGuardada = pgGananciaPorNivel?.[lvl]
    const gananciaNivel = gananciaGuardada != null
      ? gananciaGuardada
      : Math.max(1, fijo + modCon)
    total += gananciaNivel
  }

  return Math.max(nivel, total)  // mínimo 1 PG por nivel
}

/** Devuelve el XP requerido para el siguiente nivel (null si ya es nivel 20). */
export function getXPSiguienteNivel(nivel) {
  const siguiente = PROGRESO_NIVEL[nivel]  // índice = nivel (0-based next)
  return siguiente?.xp ?? null
}

/** Devuelve el XP del nivel actual. */
export function getXPNivelActual(nivel) {
  return PROGRESO_NIVEL[nivel - 1]?.xp ?? 0
}

/** Derivar nivel a partir de XP acumulada. */
export function getNivelDesdeXP(xp) {
  let nivel = 1
  for (const fila of PROGRESO_NIVEL) {
    if (xp >= fila.xp) nivel = fila.nivel
    else break
  }
  return nivel
}
