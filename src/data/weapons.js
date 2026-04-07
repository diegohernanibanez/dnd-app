// Fuente: Manual del Jugador D&D 2024 — Capítulo 6 (Equipo): armas
// Propiedades relevantes para el cálculo de ataques en nivel 1

// tipo: 'cac' (cuerpo a cuerpo) | 'dist' (distancia)
// caracteristica: 'Fuerza' | 'Destreza' | 'finura' (mayor de FUE/DES)
// daño: texto del dado + tipo de daño
// daño2: versátil (si aplica)

export const ARMAS = {
  // ── Armas simples cuerpo a cuerpo ──
  'Bastón':               { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d6 contundente',  daño2: '1d8 contundente' },
  'Daga':                 { tipo: 'cac',  caracteristica: 'finura',    daño: '1d4 perforante' },
  'Garrote':              { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d4 contundente' },
  'Hacha de mano':        { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d6 cortante' },
  'Jabalina':             { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d6 perforante' },
  'Lanza':                { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d6 perforante',   daño2: '1d8 perforante' },
  'Maza':                 { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d6 contundente' },
  'Martillo de luz':      { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d4 contundente' },
  'Hoz':                  { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d4 cortante' },

  // ── Armas simples a distancia ──
  'Ballesta ligera':      { tipo: 'dist', caracteristica: 'Destreza',  daño: '1d8 perforante' },
  'Dardo':                { tipo: 'dist', caracteristica: 'finura',    daño: '1d4 perforante' },
  'Honda':                { tipo: 'dist', caracteristica: 'Destreza',  daño: '1d4 contundente' },

  // ── Armas marciales cuerpo a cuerpo ──
  'Cimitarra':            { tipo: 'cac',  caracteristica: 'finura',    daño: '1d6 cortante' },
  'Espada corta':         { tipo: 'cac',  caracteristica: 'finura',    daño: '1d6 perforante' },
  'Espada larga':         { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d8 cortante',     daño2: '1d10 cortante' },
  'Estoque':              { tipo: 'cac',  caracteristica: 'finura',    daño: '1d8 perforante' },
  'Hacha grande':         { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d12 cortante' },
  'Hacha de guerra':      { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d8 cortante',     daño2: '1d10 cortante' },
  'Martillo de guerra':   { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d8 contundente',  daño2: '1d10 contundente' },
  'Mayal':                { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d8 contundente' },
  'Maza de armas':        { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d8 perforante' },
  'Espada bastarda':      { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d10 cortante' },
  'Lanza larga':          { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d10 perforante' },
  'Gran espada':          { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '2d6 cortante' },
  'Alabarda':             { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d10 cortante' },
  'Guadaña':              { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '2d4 cortante' },
  'Lanza de caballería':  { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d12 perforante' },
  'Látigo':               { tipo: 'cac',  caracteristica: 'finura',    daño: '1d4 cortante' },
  'Pica':                 { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d10 perforante' },
  'Tridente':             { tipo: 'cac',  caracteristica: 'Fuerza',    daño: '1d6 perforante',   daño2: '1d8 perforante' },

  // ── Armas marciales a distancia ──
  'Arco corto':           { tipo: 'dist', caracteristica: 'Destreza',  daño: '1d6 perforante' },
  'Arco largo':           { tipo: 'dist', caracteristica: 'Destreza',  daño: '1d8 perforante' },
  'Ballesta de mano':     { tipo: 'dist', caracteristica: 'Destreza',  daño: '1d6 perforante' },
  'Ballesta pesada':      { tipo: 'dist', caracteristica: 'Destreza',  daño: '1d10 perforante' },
  'Cerbatana':            { tipo: 'dist', caracteristica: 'Destreza',  daño: '1 perforante' },
  'Red':                  { tipo: 'dist', caracteristica: 'Destreza',  daño: '—' },
}

// Aliases / nombres alternativos que aparecen en las strings de equipo
export const ARMAS_ALIASES = {
  'Hacha grande (Arma marcial)': 'Hacha grande',
  'Hacha de mano ×4':            'Hacha de mano',
  'Estoque (Arma marcial)':      'Estoque',
  'Maza (Arma simple)':          'Maza',
  'Cimitarra (Arma marcial)':    'Cimitarra',
  'Espada corta (Arma marcial)': 'Espada corta',
  'Bastón (Arma simple)':        'Bastón',
  'Ballesta ligera + 20 virotes':'Ballesta ligera',
  'Arco largo + 20 flechas':     'Arco largo',
  'Arco corto + 20 flechas':     'Arco corto',
  'Daga ×2':                     'Daga',
  'Dardo ×10':                   'Dardo',
}

/**
 * Dado un texto de ítem de equipo, retorna el arma correspondiente o null.
 */
export function resolverArma(texto) {
  const t = texto?.trim()
  if (!t) return null
  // Exacto
  if (ARMAS[t]) return { nombre: t, ...ARMAS[t] }
  // Alias
  const alias = ARMAS_ALIASES[t]
  if (alias && ARMAS[alias]) return { nombre: alias, ...ARMAS[alias] }
  // Búsqueda parcial (el texto empieza con el nombre del arma)
  for (const nombre of Object.keys(ARMAS)) {
    if (t.startsWith(nombre) || t.includes(nombre)) {
      return { nombre, ...ARMAS[nombre] }
    }
  }
  return null
}
