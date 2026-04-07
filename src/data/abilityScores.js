// Fuente: Manual del Jugador D&D 2024 - Capítulo 2: Crear un personaje - Paso 3

export const CARACTERISTICAS = ['Fuerza', 'Destreza', 'Constitución', 'Inteligencia', 'Sabiduría', 'Carisma'];

export const CONJUNTO_ESTANDAR = [15, 14, 13, 12, 10, 8];

// Coste en puntos (27 puntos disponibles, puntuaciones de 8 a 15)
export const COSTE_PUNTOS = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
export const PUNTOS_TOTALES = 27;

// Conjunto estándar por clase (tabla del manual)
export const CONJUNTO_POR_CLASE = {
  barbaro:    { Fuerza: 15, Destreza: 13, Constitución: 14, Inteligencia: 10, Sabiduría: 12, Carisma: 8 },
  bardo:      { Fuerza: 8,  Destreza: 14, Constitución: 12, Inteligencia: 13, Sabiduría: 10, Carisma: 15 },
  brujo:      { Fuerza: 8,  Destreza: 14, Constitución: 13, Inteligencia: 12, Sabiduría: 10, Carisma: 15 },
  clerigo:    { Fuerza: 14, Destreza: 8,  Constitución: 13, Inteligencia: 10, Sabiduría: 15, Carisma: 12 },
  druida:     { Fuerza: 8,  Destreza: 12, Constitución: 14, Inteligencia: 13, Sabiduría: 15, Carisma: 10 },
  explorador: { Fuerza: 12, Destreza: 15, Constitución: 13, Inteligencia: 8,  Sabiduría: 14, Carisma: 10 },
  guerrero:   { Fuerza: 15, Destreza: 14, Constitución: 13, Inteligencia: 8,  Sabiduría: 10, Carisma: 12 },
  hechicero:  { Fuerza: 10, Destreza: 13, Constitución: 14, Inteligencia: 8,  Sabiduría: 12, Carisma: 15 },
  mago:       { Fuerza: 8,  Destreza: 12, Constitución: 13, Inteligencia: 15, Sabiduría: 14, Carisma: 10 },
  monje:      { Fuerza: 12, Destreza: 15, Constitución: 13, Inteligencia: 10, Sabiduría: 14, Carisma: 8 },
  paladin:    { Fuerza: 15, Destreza: 10, Constitución: 13, Inteligencia: 8,  Sabiduría: 12, Carisma: 14 },
  picaro:     { Fuerza: 12, Destreza: 15, Constitución: 13, Inteligencia: 14, Sabiduría: 10, Carisma: 8 },
};

// Calcula el modificador de característica
export const calcModificador = (puntuacion) => Math.floor((puntuacion - 10) / 2);

export const formatModificador = (mod) => (mod >= 0 ? `+${mod}` : `${mod}`);

// Tirada 4d6 descartando el menor
export const tirar4d6 = () => {
  const dados = Array.from({ length: 4 }, () => Math.ceil(Math.random() * 6));
  dados.sort((a, b) => a - b);
  return dados.slice(1).reduce((s, d) => s + d, 0);
};

export const generarPuntuacionesAleatorias = () =>
  Array.from({ length: 6 }, tirar4d6).sort((a, b) => b - a);
