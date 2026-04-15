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

export const PROPIEDADES_ARMA_DESC = {
  ligera: 'Permite un ataque extra con otra arma ligera en el mismo turno; ese ataque extra no suma modificador al dano salvo que sea negativo.',
  municion: 'Solo puedes atacar a distancia si tienes municion para el arma. Cada ataque consume una unidad.',
  pesada: 'Desventaja con arma pesada si no cumples el minimo de Fuerza (cuerpo a cuerpo) o Destreza (distancia): 13.',
  recarga: 'Solo puedes disparar una unidad de municion por accion, accion adicional o reaccion de ataque.',
  sutil: 'Puedes usar Fuerza o Destreza para ataque y dano, pero debes usar la misma para ambas tiradas.',
  versatil: 'Puede usarse a una o dos manos; entre parentesis se muestra el dano al usarla a dos manos.',
  alcance: 'Aumenta el alcance de ataques cuerpo a cuerpo (normalmente 3 m).',
  arrojadiza: 'Puede lanzarse para hacer un ataque a distancia.',
  dos_manos: 'Requiere dos manos para atacar.',
}

export const MAESTRIAS_ARMA_DESC = {
  debilitar: 'Si aciertas, la criatura tiene desventaja en su proxima tirada de ataque antes del inicio de tu siguiente turno.',
  derribar: 'Si aciertas, la criatura debe superar una salvacion de Constitucion (CD 8 + mod de ataque + competencia) o queda derribada.',
  empujar: 'Si aciertas, puedes empujar a la criatura 3 m en linea recta si es Grande o menor.',
  hender: 'Si aciertas en cuerpo a cuerpo, puedes hacer un ataque extra contra otra criatura a 1,5 m de la primera (una vez por turno).',
  mellar: 'El ataque extra de la propiedad ligera puede hacerse como parte de la accion de Atacar en vez de como accion adicional (una vez por turno).',
  molestar: 'Si aciertas y causas dano, tienes ventaja en tu siguiente tirada de ataque contra esa criatura antes del final de tu siguiente turno.',
  ralentizar: 'Si aciertas y causas dano, reduces su velocidad en 3 m hasta el inicio de tu siguiente turno.',
  rozar: 'Si fallas una tirada de ataque, haces dano igual al modificador de caracteristica usado en la tirada de ataque.',
}

export const TODAS_LAS_PROPIEDADES_ARMA = Object.keys(PROPIEDADES_ARMA_DESC)
export const TODAS_LAS_MAESTRIAS_ARMA = Object.keys(MAESTRIAS_ARMA_DESC)

const METADATA_ARMAS = {
  'Baston':               { propiedades: ['versatil'] },
  'Daga':                 { propiedades: ['ligera', 'sutil', 'arrojadiza'] },
  'Hacha de mano':        { propiedades: ['ligera', 'arrojadiza'] },
  'Jabalina':             { propiedades: ['arrojadiza'] },
  'Lanza':                { propiedades: ['arrojadiza', 'versatil'] },
  'Martillo de luz':      { propiedades: ['ligera', 'arrojadiza'] },
  'Ballesta ligera':      { propiedades: ['municion', 'recarga', 'dos_manos'] },
  'Dardo':                { propiedades: ['sutil', 'arrojadiza'] },
  'Honda':                { propiedades: ['municion'] },
  'Cimitarra':            { propiedades: ['ligera', 'sutil'] },
  'Espada corta':         { propiedades: ['ligera', 'sutil'] },
  'Espada larga':         { propiedades: ['versatil'] },
  'Estoque':              { propiedades: ['sutil'] },
  'Hacha grande':         { propiedades: ['pesada', 'dos_manos'] },
  'Hacha de guerra':      { propiedades: ['versatil'] },
  'Martillo de guerra':   { propiedades: ['versatil'] },
  'Lanza larga':          { propiedades: ['alcance', 'pesada', 'dos_manos'] },
  'Gran espada':          { propiedades: ['pesada', 'dos_manos'] },
  'Alabarda':             { propiedades: ['alcance', 'pesada', 'dos_manos'] },
  'Guadana':              { propiedades: ['pesada', 'dos_manos'] },
  'Lanza de caballeria':  { propiedades: ['alcance'] },
  'Latigo':               { propiedades: ['alcance', 'sutil'] },
  'Pica':                 { propiedades: ['alcance', 'pesada', 'dos_manos'] },
  'Tridente':             { propiedades: ['arrojadiza', 'versatil'] },
  'Arco corto':           { propiedades: ['municion', 'dos_manos'] },
  'Arco largo':           { propiedades: ['municion', 'pesada', 'dos_manos'] },
  'Ballesta de mano':     { propiedades: ['ligera', 'municion', 'recarga'] },
  'Ballesta pesada':      { propiedades: ['municion', 'pesada', 'recarga', 'dos_manos'] },
  'Cerbatana':            { propiedades: ['municion', 'recarga'] },
  'Red':                  { propiedades: ['arrojadiza'] },
}

const MAESTRIA_ARMA_POR_DEFECTO = {
  'Daga': 'mellar',
  'Hacha de mano': 'mellar',
  'Cimitarra': 'mellar',
  'Espada corta': 'mellar',
  'Estoque': 'molestar',
  'Espada larga': 'debilitar',
  'Gran espada': 'rozar',
  'Alabarda': 'hender',
  'Hacha grande': 'hender',
  'Pica': 'empujar',
  'Lanza larga': 'empujar',
  'Tridente': 'debilitar',
  'Martillo de guerra': 'derribar',
  'Hacha de guerra': 'derribar',
  'Ballesta ligera': 'ralentizar',
  'Ballesta pesada': 'debilitar',
  'Arco largo': 'ralentizar',
  'Arco corto': 'debilitar',
}

function normalizeName(text) {
  return text
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function getWeaponMetadata(nombre) {
  const normalized = normalizeName(nombre)
  const base = METADATA_ARMAS[normalized] ?? {}
  return {
    propiedades: [...(base.propiedades ?? [])],
    maestria: base.maestria ?? MAESTRIA_ARMA_POR_DEFECTO[normalized] ?? null,
  }
}

/**
 * Dado un texto de ítem de equipo, retorna el arma correspondiente o null.
 */
export function resolverArma(texto) {
  const t = texto?.trim()
  if (!t) return null
  // Exacto
  if (ARMAS[t]) return { nombre: t, ...ARMAS[t], ...getWeaponMetadata(t) }
  // Alias
  const alias = ARMAS_ALIASES[t]
  if (alias && ARMAS[alias]) return { nombre: alias, ...ARMAS[alias], ...getWeaponMetadata(alias) }
  // Búsqueda parcial (el texto empieza con el nombre del arma)
  for (const nombre of Object.keys(ARMAS)) {
    if (t.startsWith(nombre) || t.includes(nombre)) {
      return { nombre, ...ARMAS[nombre], ...getWeaponMetadata(nombre) }
    }
  }
  return null
}
