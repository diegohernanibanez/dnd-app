// Fuente: Manual del Jugador D&D 2024 — Capítulo 5: Dotes

// ── Efectos posibles en una dote ────────────────────────────────────
// efectos: array de objetos { tipo, ... }
//   { tipo: 'stat', stat: 'Fuerza', valor: 1 }          — bonus fijo a una stat
//   { tipo: 'stat-elegir', opciones: ['Fuerza','Destreza'], valor: 1 } — el jugador elige stat
//   { tipo: 'stat-asi' }                                 — +2 a una o +1/+1 a dos (Mejora de característica)
//   { tipo: 'skill-elegir', cantidad: 1, pool: [...] }   — elige N habilidades del pool
//   { tipo: 'skill-fijo', habilidades: [...] }           — competencia fija
//   { tipo: 'save-elegir' }                              — elige una stat para competencia en salvación
//   { tipo: 'pericia-elegir', pool: [...] }              — elige una habilidad para ganar pericia
//   { tipo: 'pg-extra', formula: '2xNivel' }             — PG adicionales
//   { tipo: 'texto', desc: '...' }                       — beneficio sin efecto mecánico interactivo

// ── Categorías ────────────────────────────────────────────────────────
export const CATEGORIAS_DOTE = {
  ORIGEN:         'Origen',
  GENERAL:        'General',
  ESTILO_COMBATE: 'Estilo de combate',
  DON_EPICO:      'Don épico',
}

// ── Dotes de Origen ───────────────────────────────────────────────────
export const DOTES_ORIGEN = [
  {
    id: 'afortunado',
    nombre: 'Afortunado',
    categoria: CATEGORIAS_DOTE.ORIGEN,
    requisitos: [],
    descripcion: 'Tienes puntos de suerte igual a tu bonificador por competencia. Gástalos para otorgarte ventaja en una prueba d20, o imponer desventaja en una tirada de ataque contra ti. Se recuperan con descanso largo.',
    efectos: [
      { tipo: 'texto', desc: 'Puntos de suerte = bon. competencia (1/desc. largo cada uso). Ventaja en prueba d20 propia (1 punto) o desventaja en ataque vs ti (1 punto).' },
    ],
  },
  {
    id: 'alerta',
    nombre: 'Alerta',
    categoria: CATEGORIAS_DOTE.ORIGEN,
    requisitos: [],
    descripcion: 'Competencia en iniciativa (suma bon. competencia a la tirada). Tras tirar iniciativa puedes intercambiarla con un aliado dispuesto.',
    efectos: [
      { tipo: 'texto', desc: 'Competencia en iniciativa (suma bon. competencia). Intercambio de iniciativa con aliado justo después de tirar.' },
    ],
  },
  {
    id: 'atacante-salvaje',
    nombre: 'Atacante salvaje',
    categoria: CATEGORIAS_DOTE.ORIGEN,
    requisitos: [],
    descripcion: 'Una vez por turno, cuando aciertes a un objetivo con un arma, puedes tirar dos veces los dados de daño del arma y usar el resultado que prefieras.',
    efectos: [
      { tipo: 'texto', desc: '1/turno: al acertar con arma, tira dados de daño dos veces y quédate con el mejor.' },
    ],
  },
  {
    id: 'duro',
    nombre: 'Duro',
    categoria: CATEGORIAS_DOTE.ORIGEN,
    requisitos: [],
    descripcion: 'Tus PG máximos aumentan en el doble de tu nivel al adquirir esta dote y +2 por cada nivel posterior.',
    efectos: [
      { tipo: 'pg-extra', formula: '2xNivel' },
    ],
  },
  {
    id: 'fabricante',
    nombre: 'Fabricante',
    categoria: CATEGORIAS_DOTE.ORIGEN,
    requisitos: [],
    descripcion: 'Ganas competencia con tres herramientas de artesano a elegir. 20% de descuento en objetos no mágicos. Tras descanso largo puedes fabricar un objeto de la tabla según las herramientas que poseas.',
    efectos: [
      { tipo: 'texto', desc: '3 herramientas de artesano a elegir. 20% descuento en objetos no mágicos. Fabricación rápida 1/desc. largo.' },
    ],
  },
  {
    id: 'habilidoso',
    nombre: 'Habilidoso',
    categoria: CATEGORIAS_DOTE.ORIGEN,
    requisitos: [],
    repetible: true,
    descripcion: 'Ganas competencia en cualquier combinación de tres habilidades o herramientas que elijas.',
    efectos: [
      { tipo: 'skill-elegir', cantidad: 3, pool: 'todas' },
    ],
  },
  {
    id: 'iniciado-en-la-magia',
    nombre: 'Iniciado en la magia',
    categoria: CATEGORIAS_DOTE.ORIGEN,
    requisitos: [],
    repetible: true,
    descripcion: 'Aprendes 2 trucos y 1 conjuro de nv.1 de la lista de clérigo, druida o mago (elige la lista). La aptitud mágica es INT, SAB o CAR (elige al tomar la dote). Repetible eligiendo lista distinta.',
    efectos: [
      { tipo: 'texto', desc: '2 trucos + 1 conjuro nv.1 de la lista elegida (clérigo/druida/mago). Aptitud: INT/SAB/CAR a elegir. Se implementará al añadir hechizos.' },
    ],
  },
  {
    id: 'maton-de-taberna',
    nombre: 'Matón de taberna',
    categoria: CATEGORIAS_DOTE.ORIGEN,
    requisitos: [],
    descripcion: 'Ataque sin armas mejorado (1d4+FUE contundente). Puedes repetir tiradas de 1 en daño sin armas. Competencia con armas improvisadas. Empujar 1,5 m al acertar sin armas (1/turno).',
    efectos: [
      { tipo: 'texto', desc: 'Daño sin armas: 1d4+FUE. Repetir 1s en dados de daño sin armas. Competencia armas improvisadas. Empujar 1,5m al acertar sin armas (1/turno).' },
    ],
  },
  {
    id: 'musico',
    nombre: 'Músico',
    categoria: CATEGORIAS_DOTE.ORIGEN,
    requisitos: [],
    descripcion: 'Competencia con tres instrumentos musicales a elegir. Tras descanso corto o largo puedes tocar una canción inspiradora dando inspiración heroica a aliados (cantidad = bon. competencia).',
    efectos: [
      { tipo: 'texto', desc: '3 instrumentos musicales a elegir. Canción alentadora 1/descanso: inspiración heroica a bon. competencia aliados.' },
    ],
  },
  {
    id: 'sanador',
    nombre: 'Sanador',
    categoria: CATEGORIAS_DOTE.ORIGEN,
    requisitos: [],
    descripcion: 'Con útiles de sanador (1 uso), tratas a criatura a 1,5 m: gasta uno de sus dados de golpe, lo tira y recupera ese resultado + bon. competencia. Puedes repetir tiradas de 1 en curación.',
    efectos: [
      { tipo: 'texto', desc: 'Médico de batalla: acción, útiles de sanador (1 uso) → criatura recupera 1 dado de golpe + bon. competencia PG. Repetir 1s en dados de curación.' },
    ],
  },
];

// ── Dotes Generales ───────────────────────────────────────────────────
export const DOTES_GENERALES = [
  {
    id: 'acechador',
    nombre: 'Acechador',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min', stat: 'Destreza', valor: 13 }],
    descripcion: '+1 DES. Visión ciega 3 m. Ventaja en Sigilo (Destreza) al esconderte en combate. Si atacas escondido y fallas, no revelas tu posición.',
    efectos: [
      { tipo: 'stat', stat: 'Destreza', valor: 1 },
      { tipo: 'texto', desc: 'Visión ciega 3 m. Ventaja en Sigilo al esconderte en combate. Fallar ataque escondido no revela posición.' },
    ],
  },
  {
    id: 'actor',
    nombre: 'Actor',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min', stat: 'Carisma', valor: 13 }],
    descripcion: '+1 CAR. Suplantación: ventaja en Engaño e Interpretación para hacerse pasar por otro. Imitación de sonidos y habla de otras criaturas (CD 8+CAR+comp para detectarla).',
    efectos: [
      { tipo: 'stat', stat: 'Carisma', valor: 1 },
      { tipo: 'texto', desc: 'Suplantación: ventaja en Engaño/Interpretación al imitar a alguien. Imitación de sonidos/habla (CD 8+CAR+comp para detectar).' },
    ],
  },
  {
    id: 'apresador',
    nombre: 'Apresador',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min-o', stats: ['Fuerza', 'Destreza'], valor: 13 }],
    descripcion: '+1 FUE o DES. Golpear y agarrar (1/turno, sin armas). Ventaja al atacar a criatura agarrada. Mover criatura agarrada (mismo tamaño o menor) sin coste de movimiento extra.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza'], valor: 1 },
      { tipo: 'texto', desc: 'Golpear+agarrar (1/turno, sin armas). Ventaja atacando agarrado. Mover agarrado sin mov. extra.' },
    ],
  },
  {
    id: 'atacante-a-la-carga',
    nombre: 'Atacante a la carga',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min-o', stats: ['Fuerza', 'Destreza'], valor: 13 }],
    descripcion: '+1 FUE o DES. Carrera mejorada (+3 m). Si te mueves ≥3 m hacia objetivo y le aciertas en CaC: +1d8 daño o empujar 3 m (1/turno).',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza'], valor: 1 },
      { tipo: 'texto', desc: 'Carrera mejorada (+3 m). Ataque con carga (mov. ≥3 m en línea recta + acertar CaC): +1d8 daño o empujar 3m (1/turno).' },
    ],
  },
  {
    id: 'atleta',
    nombre: 'Atleta',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min-o', stats: ['Fuerza', 'Destreza'], valor: 13 }],
    descripcion: '+1 FUE o DES. Velocidad trepando = velocidad. Levantarse del suelo cuesta solo 1,5 m. Salto con carrerilla tras mover solo 1,5 m.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza'], valor: 1 },
      { tipo: 'texto', desc: 'Velocidad trepando = velocidad. Levantarse: 1,5 m. Salto con carrerilla tras 1,5 m.' },
    ],
  },
  {
    id: 'azote-de-magos',
    nombre: 'Azote de magos',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 FUE o DES. Anticoncentración: si dañas a un concentrado, tiene desventaja en su salvación. Mente robusta: si fallas salvación de INT/SAB/CAR, puedes superarla 1/desc. corto.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza'], valor: 1 },
      { tipo: 'texto', desc: 'Anticoncentración: desventaja en salvación vs concentración al recibir daño. Mente robusta: superar 1 salvación INT/SAB/CAR fallida (1/desc. corto).' },
    ],
  },
  {
    id: 'centinela',
    nombre: 'Centinela',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min-o', stats: ['Fuerza', 'Destreza'], valor: 13 }],
    descripcion: '+1 FUE o DES. Guardián: ataque de oportunidad cuando criatura a 1,5 m se destraba o acierta a otro. Detener: al acertar con ataque de oportunidad, velocidad del objetivo = 0 hasta fin del turno.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza'], valor: 1 },
      { tipo: 'texto', desc: 'Guardián: AO cuando criatura adyacente se destraba o acierta a otro. Detener: AO reduce vel.=0 resto del turno.' },
    ],
  },
  {
    id: 'chef',
    nombre: 'Chef',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 CON o SAB. Útiles de cocinero. Comida reconstituyente (desc. corto: criaturas que gasten dado de golpe +1d8 PG). Tentempié tonificante (1h/desc. largo: bon. competencia unidades de PG temporales = bon. competencia).',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Constitución', 'Sabiduría'], valor: 1 },
      { tipo: 'texto', desc: 'Útiles de cocinero. Comida reconstituyente (desc. corto: +1d8 PG si gastan dado de golpe). Tentempié (bon. comp unidades de PG temp = bon. comp).' },
    ],
  },
  {
    id: 'combatiente-con-dos-armas',
    nombre: 'Combatiente con dos armas',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min-o', stats: ['Fuerza', 'Destreza'], valor: 13 }],
    descripcion: '+1 FUE o DES. Manejo doble mejorado: ataque extra con arma ligera en acc. adicional, sin sumar mod. de característica al daño (salvo negativo). Desenvainar 2 armas no a dos manos a la vez.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza'], valor: 1 },
      { tipo: 'texto', desc: 'Manejo doble mejorado: ataque extra adicional con arma ligera (sin mod. car al daño salvo negativo). Desenvainar 2 armas simultáneamente.' },
    ],
  },
  {
    id: 'combatiente-montado',
    nombre: 'Combatiente montado',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 FUE, DES o SAB. Golpe montado: ventaja atacando criaturas de menor tamaño a 1,5 m de montura. Esquivar de un salto: montura no daño si supera salvación DES. Girar brusco: redirigir ataque a ti en lugar de a montura.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza', 'Sabiduría'], valor: 1 },
      { tipo: 'texto', desc: 'Golpe montado: ventaja vs criaturas menores. Esquivar de un salto (montura). Girar brusco: redirigir ataque a ti.' },
    ],
  },
  {
    id: 'duelista-defensivo',
    nombre: 'Duelista defensivo',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min', stat: 'Destreza', valor: 13 }],
    descripcion: '+1 DES. Parada: si empuñas un arma sutil y te impactan en CaC, reacción para sumar bon. competencia a tu CA hasta el inicio de tu siguiente turno.',
    efectos: [
      { tipo: 'stat', stat: 'Destreza', valor: 1 },
      { tipo: 'texto', desc: 'Parada: reacción al recibir impacto CaC con arma sutil → +bon. comp a CA hasta inicio de tu siguiente turno.' },
    ],
  },
  {
    id: 'entrenamiento-con-armas-marciales',
    nombre: 'Entrenamiento con armas marciales',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 FUE o DES. Obtienes competencia con armas marciales.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza'], valor: 1 },
      { tipo: 'texto', desc: 'Competencia con armas marciales.' },
    ],
  },
  {
    id: 'envenenador',
    nombre: 'Envenenador',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 DES o INT. Veneno potente (ignora resistencia al veneno). Competencia con útiles de envenenador. Preparar veneno (1h, 50 po: bon. comp dosis; acc. adicional para aplicar).',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Destreza', 'Inteligencia'], valor: 1 },
      { tipo: 'texto', desc: 'Veneno potente: ignora resistencia al daño de veneno. Competencia útiles envenenador. Preparar veneno: 1h/50po → bon.comp dosis (1d8+CD veneno).' },
    ],
  },
  {
    id: 'experto-en-ballestas',
    nombre: 'Experto en ballestas',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min', stat: 'Destreza', valor: 13 }],
    descripcion: '+1 DES. Ignorar recarga en ballestas. Disparar CaC sin desventaja. Manejo doble: sumar mod. DES al daño del ataque extra con ballesta ligera.',
    efectos: [
      { tipo: 'stat', stat: 'Destreza', valor: 1 },
      { tipo: 'texto', desc: 'Ignorar recarga (ballestas). Disparar CaC sin desventaja. Sumar mod. DES al ataque extra ligero con ballesta.' },
    ],
  },
  {
    id: 'experto-en-habilidades',
    nombre: 'Experto en habilidades',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 a una característica a elegir. Competencia en una habilidad a elegir. Pericia en una habilidad en la que ya tengas competencia (sin pericia).',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza','Destreza','Constitución','Inteligencia','Sabiduría','Carisma'], valor: 1 },
      { tipo: 'skill-elegir', cantidad: 1, pool: 'todas' },
      { tipo: 'pericia-elegir', pool: 'competencias' },
    ],
  },
  {
    id: 'influencia-feerica',
    nombre: 'Influencia féerica',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 INT, SAB o CAR. Magia feérica: un conjuro de adivinación o encantamiento nv.1 siempre preparado + paso brumoso; ambos 1/desc. largo sin espacio, también con espacios disponibles.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Inteligencia', 'Sabiduría', 'Carisma'], valor: 1 },
      { tipo: 'texto', desc: 'Conjuro nv.1 (adivinación/encantamiento) + paso brumoso preparados. 1/desc. largo cada uno sin espacio. Aptitud: característica aumentada.' },
    ],
  },
  {
    id: 'influencia-sombria',
    nombre: 'Influencia sombría',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 INT, SAB o CAR. Magia de las sombras: un conjuro de ilusionismo o nigromancia nv.1 siempre preparado + invisibilidad; ambos 1/desc. largo sin espacio.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Inteligencia', 'Sabiduría', 'Carisma'], valor: 1 },
      { tipo: 'texto', desc: 'Conjuro nv.1 (ilusionismo/nigromancia) + invisibilidad preparados. 1/desc. largo cada uno sin espacio. Aptitud: característica aumentada.' },
    ],
  },
  {
    id: 'lanzador-en-combate',
    nombre: 'Lanzador en combate',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'rasgo', rasgo: 'lanzamiento-de-conjuros' }],
    descripcion: '+1 INT, SAB o CAR. Ventaja en salvaciones de CON para mantener concentración. Conjuro reactivo: al provocar AO, puedes lanzar un conjuro (1 acción, un objetivo) en lugar del AO. Componentes somáticos con manos ocupadas.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Inteligencia', 'Sabiduría', 'Carisma'], valor: 1 },
      { tipo: 'texto', desc: 'Ventaja en salvaciones CON para concentración. Conjuro reactivo en lugar de AO. Componentes somáticos con manos ocupadas.' },
    ],
  },
  {
    id: 'lanzador-preciso',
    nombre: 'Lanzador preciso',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'rasgo', rasgo: 'lanzamiento-de-conjuros' }],
    descripcion: '+1 INT, SAB o CAR. Ataques de conjuro ignoran cobertura media y tres cuartos. Lanzar conjuros CaC sin desventaja. Alcance de conjuros de ataque +18 m.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Inteligencia', 'Sabiduría', 'Carisma'], valor: 1 },
      { tipo: 'texto', desc: 'Ataques de conjuro ignoran cobertura media/tres cuartos. Sin desventaja lanzando CaC. Alcance de ataque +18 m.' },
    ],
  },
  {
    id: 'lanzador-ritual',
    nombre: 'Lanzador ritual',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min-o', stats: ['Inteligencia','Sabiduría','Carisma'], valor: 13 }],
    descripcion: '+1 INT, SAB o CAR. Conjuros rituales nv.1 de lista (bon. comp cantidad). Ritual rápido 1/desc. largo (tiempo normal en vez de 10 min extra).',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Inteligencia', 'Sabiduría', 'Carisma'], valor: 1 },
      { tipo: 'texto', desc: 'Bon. comp conjuros rituales nv.1 preparados permanentemente. Ritual rápido 1/desc. largo.' },
    ],
  },
  {
    id: 'lider-inspirador',
    nombre: 'Líder inspirador',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min-o', stats: ['Sabiduría','Carisma'], valor: 13 }],
    descripcion: '+1 SAB o CAR. Interpretación fortalecedora: tras desc. corto/largo, hasta 6 aliados a 9 m ganan PG temporales = nivel de personaje + mod. de la característica aumentada.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Sabiduría', 'Carisma'], valor: 1 },
      { tipo: 'texto', desc: 'Interpretación fortalecedora: 1/descanso → hasta 6 aliados ganan PG temp = nivel + mod. aumentado.' },
    ],
  },
  {
    id: 'ligeramente-acorazado',
    nombre: 'Ligeramente acorazado',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 FUE o DES. Obtienes entrenamiento con armaduras ligeras y escudos.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza'], valor: 1 },
      { tipo: 'texto', desc: 'Entrenamiento con armaduras ligeras y escudos.' },
    ],
  },
  {
    id: 'maestro-de-armas',
    nombre: 'Maestro de armas',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 FUE o DES. Propiedad de maestría con un tipo de arma (sencilla o marcial) en la que tengas competencia. Puedes cambiar la elección tras descanso largo.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza'], valor: 1 },
      { tipo: 'texto', desc: 'Propiedad de maestría con 1 tipo de arma de tu competencia (cambiable tras desc. largo).' },
    ],
  },
  {
    id: 'maestro-en-armaduras-medias',
    nombre: 'Maestro en armaduras medias',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'entrenamiento', entrenamiento: 'armaduras-medias' }],
    descripcion: '+1 FUE o DES. Portador diestro: si llevas armadura media y DES ≥ 16, sumas 3 en lugar de 2 a la CA.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza'], valor: 1 },
      { tipo: 'texto', desc: 'Portador diestro: armadura media + DES≥16 → +3 a CA (en vez de +2).' },
    ],
  },
  {
    id: 'maestro-en-armaduras-pesadas',
    nombre: 'Maestro en armaduras pesadas',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'entrenamiento', entrenamiento: 'armaduras-pesadas' }],
    descripcion: '+1 CON o FUE. Reducción de daño: cuando te impactan con armadura pesada, reduces daño contundente/cortante/perforante = bon. competencia.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Constitución', 'Fuerza'], valor: 1 },
      { tipo: 'texto', desc: 'Reducción de daño (contund./cort./perf.) = bon. comp al recibir impacto con armadura pesada.' },
    ],
  },
  {
    id: 'maestro-en-armas-de-asta',
    nombre: 'Maestro en armas de asta',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min-o', stats: ['Fuerza', 'Destreza'], valor: 13 }],
    descripcion: '+1 DES o FUE. Golpe con asta (acc. adicional tras atacar con bastón/lanza/gran alcance+pesada: d4 contundente). Golpe reactivo: reacción al entrar en alcance.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Destreza', 'Fuerza'], valor: 1 },
      { tipo: 'texto', desc: 'Golpe con asta: acc. adicional tras atacar, d4 contundente. Golpe reactivo: reacción al entrar en alcance.' },
    ],
  },
  {
    id: 'maestro-en-armas-pesadas',
    nombre: 'Maestro en armas pesadas',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min', stat: 'Fuerza', valor: 13 }],
    descripcion: '+1 FUE. Maestría con armas pesadas: daño extra = bon. competencia al golpear. Avasallar: acc. adicional extra tras crítico o reducir a 0 PG con arma CaC.',
    efectos: [
      { tipo: 'stat', stat: 'Fuerza', valor: 1 },
      { tipo: 'texto', desc: 'Daño extra pesada = bon. comp. Avasallar: ataque adicional tras crítico o reducir a 0 PG.' },
    ],
  },
  {
    id: 'maestro-en-escudos',
    nombre: 'Maestro en escudos',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'entrenamiento', entrenamiento: 'escudos' }],
    descripcion: '+1 FUE. Golpe con escudo: tras acertar en CaC, golpea con escudo (salvación FUE o derribar/empujar, 1/turno). Interponer escudo: reacción para no recibir daño si superas salvación DES con escudo.',
    efectos: [
      { tipo: 'stat', stat: 'Fuerza', valor: 1 },
      { tipo: 'texto', desc: 'Golpe con escudo: salvación FUE vs derribar/empujar 1,5m (1/turno). Interponer escudo: reacción → 0 daño si superas salv. DES.' },
    ],
  },
  {
    id: 'mejora-de-caracteristica',
    nombre: 'Mejora de característica',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    repetible: true,
    descripcion: 'Aumenta en 2 una característica elegida, o en 1 dos características elegidas. Máximo 20.',
    efectos: [
      { tipo: 'stat-asi' },
    ],
  },
  {
    id: 'mente-aguda',
    nombre: 'Mente aguda',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min', stat: 'Inteligencia', valor: 13 }],
    descripcion: '+1 INT. Sabiduría popular: competencia (o pericia si ya tienes comp.) en Conocimiento arcano, Historia, Investigación, Naturaleza o Religión (elige 1). Estudio rápido como acción adicional.',
    efectos: [
      { tipo: 'stat', stat: 'Inteligencia', valor: 1 },
      { tipo: 'skill-o-pericia-elegir', pool: ['Conocimiento arcano','Historia','Investigación','Naturaleza','Religión'] },
      { tipo: 'texto', desc: 'Estudio rápido como acción adicional.' },
    ],
  },
  {
    id: 'moderadamente-acorazado',
    nombre: 'Moderadamente acorazado',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'entrenamiento', entrenamiento: 'armaduras-ligeras' }],
    descripcion: '+1 FUE o DES. Obtienes entrenamiento con armaduras medias.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza'], valor: 1 },
      { tipo: 'texto', desc: 'Entrenamiento con armaduras medias.' },
    ],
  },
  {
    id: 'muy-acorazado',
    nombre: 'Muy acorazado',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'entrenamiento', entrenamiento: 'armaduras-medias' }],
    descripcion: '+1 CON o FUE. Obtienes entrenamiento con armaduras pesadas.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Constitución', 'Fuerza'], valor: 1 },
      { tipo: 'texto', desc: 'Entrenamiento con armaduras pesadas.' },
    ],
  },
  {
    id: 'observador',
    nombre: 'Observador',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min-o', stats: ['Inteligencia', 'Sabiduría'], valor: 13 }],
    descripcion: '+1 INT o SAB. Observador perspicaz: competencia (o pericia si ya tienes comp.) en Investigación, Percepción o Perspicacia (elige 1). Búsqueda rápida como acción adicional.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Inteligencia', 'Sabiduría'], valor: 1 },
      { tipo: 'skill-o-pericia-elegir', pool: ['Investigación','Percepción','Perspicacia'] },
      { tipo: 'texto', desc: 'Búsqueda rápida como acción adicional.' },
    ],
  },
  {
    id: 'perforador',
    nombre: 'Perforador',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 FUE o DES. Horadar: 1/turno, al acertar con daño perforante, puedes repetir un dado de daño. Crítico potenciado: en crítico perforante, tira 1 dado de daño adicional.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza'], valor: 1 },
      { tipo: 'texto', desc: 'Horadar: 1/turno retira un dado de daño perforante. Crítico potenciado perforante: +1 dado de daño.' },
    ],
  },
  {
    id: 'rebanador',
    nombre: 'Rebanador',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 FUE o DES. Lacerar: 1/turno, al acertar con daño cortante, reduce velocidad del objetivo 3 m hasta inicio de tu siguiente turno. Crítico potenciado: en crítico cortante, el objetivo tiene desventaja en ataques hasta inicio de tu siguiente turno.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza'], valor: 1 },
      { tipo: 'texto', desc: 'Lacerar: 1/turno, daño cortante → vel. -3m hasta tu siguiente turno. Crítico cortante: desventaja en ataques enemigos hasta tu siguiente turno.' },
    ],
  },
  {
    id: 'resiliente',
    nombre: 'Resiliente',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: 'Elige una característica en la que no tengas competencia en tiradas de salvación: +1 a esa característica y ganas competencia en esas salvaciones.',
    efectos: [
      { tipo: 'resiliente' },
    ],
  },
  {
    id: 'resistente',
    nombre: 'Resistente',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 CON. Desafiar a la muerte: ventaja en tiradas de salvación contra muerte. Recuperación rápida: acc. adicional, gasta 1 dado de golpe y recupera PG.',
    efectos: [
      { tipo: 'stat', stat: 'Constitución', valor: 1 },
      { tipo: 'texto', desc: 'Desafiar a la muerte: ventaja en tiradas vs muerte. Recuperación rápida: acc. adic. → gastar 1 dado de golpe y recuperar PG.' },
    ],
  },
  {
    id: 'telepatico',
    nombre: 'Telepático',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 INT, SAB o CAR. Habla telepática a 18 m (en idioma conocido). Detectar pensamientos siempre preparado; 1/desc. largo sin espacio, también con espacios disponibles.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Inteligencia', 'Sabiduría', 'Carisma'], valor: 1 },
      { tipo: 'texto', desc: 'Habla telepática 18 m. Detectar pensamientos preparado (1/desc. largo sin espacio). Aptitud: característica aumentada.' },
    ],
  },
  {
    id: 'telequinetico',
    nombre: 'Telequinético',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 INT, SAB o CAR. Mano de mago modificada (invisible, sin comp. verbales/somáticos, alcance +9 m). Empellón telequinético (acc. adic.): empujar criatura 9 m (salvación FUE).',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Inteligencia', 'Sabiduría', 'Carisma'], valor: 1 },
      { tipo: 'texto', desc: 'Mano de mago modificada (invisible, sin comp., alcance +9m). Empellón telequinético: acc. adic. → empujar criatura 1,5m (salv. FUE).' },
    ],
  },
  {
    id: 'tirador-de-primera',
    nombre: 'Tirador de primera',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min', stat: 'Destreza', valor: 13 }],
    descripcion: '+1 DES. Sortear la cobertura en ataques a distancia. Disparar CaC sin desventaja. Tiros lejanos: sin desventaja en alcance largo.',
    efectos: [
      { tipo: 'stat', stat: 'Destreza', valor: 1 },
      { tipo: 'texto', desc: 'Sortear cobertura media/tres cuartos con armas. Disparar CaC sin desventaja. Sin desventaja en alcance largo.' },
    ],
  },
  {
    id: 'triturador',
    nombre: 'Triturador',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }],
    descripcion: '+1 FUE o CON. Empujar: 1/turno al acertar con daño contundente, mover objetivo 1,5 m. Crítico potenciado contundente: ventaja en ataques contra ese objetivo hasta inicio de tu siguiente turno.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Constitución'], valor: 1 },
      { tipo: 'texto', desc: 'Empujar 1,5m 1/turno (daño contundente). Crítico contundente: ventaja en ataques vs objetivo hasta tu siguiente turno.' },
    ],
  },
  {
    id: 'veloz',
    nombre: 'Veloz',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'stat-min-o', stats: ['Destreza', 'Constitución'], valor: 13 }],
    descripcion: '+1 DES o CON. Velocidad +3 m. Al correr, terreno difícil no cuesta extra. Movimiento ágil: ataques de oportunidad contra ti tienen desventaja.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Destreza', 'Constitución'], valor: 1 },
      { tipo: 'texto', desc: 'Velocidad +3 m. Correr sin penalización en terreno difícil. Ataques de oportunidad vs ti con desventaja.' },
    ],
  },
  {
    id: 'versado-en-un-elemento',
    nombre: 'Versado en un elemento',
    categoria: CATEGORIAS_DOTE.GENERAL,
    requisitos: [{ tipo: 'nivel', valor: 4 }, { tipo: 'rasgo', rasgo: 'lanzamiento-de-conjuros' }],
    repetible: true,
    descripcion: '+1 INT, SAB o CAR. Elige un tipo de daño (ácido, frío, fuego, relámpago o trueno): los conjuros ignoran resistencia a ese tipo y los 1s en dados de ese tipo se tratan como 2. Repetible eligiendo tipo distinto.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Inteligencia', 'Sabiduría', 'Carisma'], valor: 1 },
      { tipo: 'texto', desc: 'Dominio de la energía: elige ácido/frío/fuego/relámpago/trueno → conjuros ignoran resistencia + 1s se tratan como 2 en dados de ese tipo.' },
    ],
  },
];

// ── Dotes de Estilo de Combate ────────────────────────────────────────
export const DOTES_ESTILO_COMBATE = [
  {
    id: 'combate-con-armas-a-dos-manos',
    nombre: 'Combate con armas a dos manos',
    categoria: CATEGORIAS_DOTE.ESTILO_COMBATE,
    requisitos: [{ tipo: 'rasgo', rasgo: 'estilo-de-combate' }],
    descripcion: 'Al tirar daño con arma a dos manos o versátil (ambas manos), tratar cualquier 1 o 2 en los dados como 3.',
    efectos: [{ tipo: 'texto', desc: 'Dados de daño (a dos manos/versátil): 1s y 2s se tratan como 3.' }],
  },
  {
    id: 'combate-con-armas-arrojadizas',
    nombre: 'Combate con armas arrojadizas',
    categoria: CATEGORIAS_DOTE.ESTILO_COMBATE,
    requisitos: [{ tipo: 'rasgo', rasgo: 'estilo-de-combate' }],
    descripcion: '+2 a las tiradas de daño de ataques a distancia con armas arrojadizas.',
    efectos: [{ tipo: 'texto', desc: '+2 daño en ataques a distancia con armas arrojadizas.' }],
  },
  {
    id: 'combate-con-dos-armas',
    nombre: 'Combate con dos armas',
    categoria: CATEGORIAS_DOTE.ESTILO_COMBATE,
    requisitos: [{ tipo: 'rasgo', rasgo: 'estilo-de-combate' }],
    descripcion: 'Al hacer el ataque extra de la propiedad "ligera", puedes sumar tu modificador de característica al daño.',
    efectos: [{ tipo: 'texto', desc: 'Ataque extra "ligera": sumar mod. de característica al daño.' }],
  },
  {
    id: 'combate-sin-armas',
    nombre: 'Combate sin armas',
    categoria: CATEGORIAS_DOTE.ESTILO_COMBATE,
    requisitos: [{ tipo: 'rasgo', rasgo: 'estilo-de-combate' }],
    descripcion: 'Daño sin armas: 1d6+FUE (1d8 si manos libres). Al inicio de tu turno: 1d4 contundente a criatura que tengas agarrada.',
    efectos: [{ tipo: 'texto', desc: 'Daño sin armas: 1d6+FUE (1d8 manos libres). 1d4 contundente/turno a agarrado.' }],
  },
  {
    id: 'defensa-combate',
    nombre: 'Defensa',
    categoria: CATEGORIAS_DOTE.ESTILO_COMBATE,
    requisitos: [{ tipo: 'rasgo', rasgo: 'estilo-de-combate' }],
    descripcion: '+1 a la clase de armadura mientras lleves armadura.',
    efectos: [{ tipo: 'texto', desc: '+1 CA mientras lleves armadura.' }],
  },
  {
    id: 'duelo',
    nombre: 'Duelo',
    categoria: CATEGORIAS_DOTE.ESTILO_COMBATE,
    requisitos: [{ tipo: 'rasgo', rasgo: 'estilo-de-combate' }],
    descripcion: '+2 a tiradas de daño con arma CaC una mano cuando la otra mano está vacía.',
    efectos: [{ tipo: 'texto', desc: '+2 daño con arma CaC una mano (otra mano vacía).' }],
  },
  {
    id: 'intercepcion',
    nombre: 'Intercepción',
    categoria: CATEGORIAS_DOTE.ESTILO_COMBATE,
    requisitos: [{ tipo: 'rasgo', rasgo: 'estilo-de-combate' }],
    descripcion: 'Reacción: cuando criatura visible ataca a aliado a 1,5 m, reduce el daño en 1d10 + bon. competencia (necesitas escudo o arma).',
    efectos: [{ tipo: 'texto', desc: 'Reacción: reducir daño a aliado adyacente en 1d10 + bon. comp (con escudo o arma).' }],
  },
  {
    id: 'lucha-a-ciegas',
    nombre: 'Lucha a ciegas',
    categoria: CATEGORIAS_DOTE.ESTILO_COMBATE,
    requisitos: [{ tipo: 'rasgo', rasgo: 'estilo-de-combate' }],
    descripcion: 'Tienes visión ciega hasta 3 m.',
    efectos: [{ tipo: 'texto', desc: 'Visión ciega 3 m.' }],
  },
  {
    id: 'proteccion-combate',
    nombre: 'Protección',
    categoria: CATEGORIAS_DOTE.ESTILO_COMBATE,
    requisitos: [{ tipo: 'rasgo', rasgo: 'estilo-de-combate' }],
    descripcion: 'Reacción con escudo: imponer desventaja al ataque de una criatura visible contra un aliado a 1,5 m (y al resto hasta tu siguiente turno mientras estés a 1,5 m).',
    efectos: [{ tipo: 'texto', desc: 'Reacción (escudo): desventaja en ataques vs aliado adyacente hasta tu siguiente turno.' }],
  },
  {
    id: 'tiro-con-arco',
    nombre: 'Tiro con arco',
    categoria: CATEGORIAS_DOTE.ESTILO_COMBATE,
    requisitos: [{ tipo: 'rasgo', rasgo: 'estilo-de-combate' }],
    descripcion: '+2 a tiradas de ataque con armas a distancia.',
    efectos: [{ tipo: 'texto', desc: '+2 a tiradas de ataque con armas a distancia.' }],
  },
];

// ── Dotes de Don Épico ───────────────────────────────────────────────
export const DOTES_DON_EPICO = [
  {
    id: 'don-fortaleza',
    nombre: 'Don de la fortaleza',
    categoria: CATEGORIAS_DOTE.DON_EPICO,
    requisitos: [{ tipo: 'nivel', valor: 19 }],
    descripcion: '+1 any (hasta 30). PG máximos +40. Al recuperar PG, recuperas PG adicionales = mod. CON (1/turno).',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza','Destreza','Constitución','Inteligencia','Sabiduría','Carisma'], valor: 1, maximo: 30 },
      { tipo: 'texto', desc: 'PG máx +40. Recuperar PG adicionales = mod. CON (1/turno).' },
    ],
  },
  {
    id: 'don-habilidad',
    nombre: 'Don de la habilidad',
    categoria: CATEGORIAS_DOTE.DON_EPICO,
    requisitos: [{ tipo: 'nivel', valor: 19 }],
    descripcion: '+1 any (hasta 30). Competencia en todas las habilidades. Pericia en una habilidad en la que no tengas pericia.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza','Destreza','Constitución','Inteligencia','Sabiduría','Carisma'], valor: 1, maximo: 30 },
      { tipo: 'skill-fijo', habilidades: 'todas' },
      { tipo: 'pericia-elegir', pool: 'competencias' },
    ],
  },
  {
    id: 'don-pericia-combate',
    nombre: 'Don de la pericia en combate',
    categoria: CATEGORIAS_DOTE.DON_EPICO,
    requisitos: [{ tipo: 'nivel', valor: 19 }],
    descripcion: '+1 any (hasta 30). Precisión sin igual: cuando falles una tirada de ataque, puedes acertarla (1/turno).',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza','Destreza','Constitución','Inteligencia','Sabiduría','Carisma'], valor: 1, maximo: 30 },
      { tipo: 'texto', desc: 'Precisión sin igual: acertar una tirada de ataque fallida (1/turno).' },
    ],
  },
  {
    id: 'don-recuperacion',
    nombre: 'Don de la recuperación',
    categoria: CATEGORIAS_DOTE.DON_EPICO,
    requisitos: [{ tipo: 'nivel', valor: 19 }],
    descripcion: '+1 any (hasta 30). Última defensa: al ir a 0 PG, puedes quedarte con 1 PG y recuperar la mitad de PG máximos (1/desc. largo). Reserva 10d10: acc. adic. para recuperar PG.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza','Destreza','Constitución','Inteligencia','Sabiduría','Carisma'], valor: 1, maximo: 30 },
      { tipo: 'texto', desc: 'Última defensa 1/desc. largo. Reserva 10d10 para recuperar PG (acc. adic.).' },
    ],
  },
  {
    id: 'don-resistencia-energias',
    nombre: 'Don de la resistencia a energías',
    categoria: CATEGORIAS_DOTE.DON_EPICO,
    requisitos: [{ tipo: 'nivel', valor: 19 }],
    descripcion: '+1 any (hasta 30). Resistencia a 2 tipos de daño elegidos (ácido, frío, fuego, necrótico, psíquico, radiante, relámpago, trueno o veneno). Redirigir energía: reacción para enviar ese daño a otro.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza','Destreza','Constitución','Inteligencia','Sabiduría','Carisma'], valor: 1, maximo: 30 },
      { tipo: 'texto', desc: 'Resistencia a 2 tipos daño elegidos (cambiables tras desc. largo). Redirigir energía: reacción → 2d12+mod.CON a otro objetivo.' },
    ],
  },
  {
    id: 'don-velocidad',
    nombre: 'Don de la velocidad',
    categoria: CATEGORIAS_DOTE.DON_EPICO,
    requisitos: [{ tipo: 'nivel', valor: 19 }],
    descripcion: '+1 any (hasta 30). Artista escapista: acc. adic. para destrabarse (también pone fin al estado agarrado). Celeridad: velocidad +9 m.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza','Destreza','Constitución','Inteligencia','Sabiduría','Carisma'], valor: 1, maximo: 30 },
      { tipo: 'texto', desc: 'Artista escapista: acc. adic. para destrabarse. Celeridad: +9 m velocidad.' },
    ],
  },
  {
    id: 'don-vision-verdadera',
    nombre: 'Don de la visión verdadera',
    categoria: CATEGORIAS_DOTE.DON_EPICO,
    requisitos: [{ tipo: 'nivel', valor: 19 }],
    descripcion: '+1 any (hasta 30). Visión verdadera 18 m. En zona de luz tenue u oscuridad: acc. adic. para volverse invisible hasta realizar una acción/acc. adic./reacción.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza','Destreza','Constitución','Inteligencia','Sabiduría','Carisma'], valor: 1, maximo: 30 },
      { tipo: 'texto', desc: 'Visión verdadera 18 m. Invisible en luz tenue/oscuridad (acc. adic., termina al actuar).' },
    ],
  },
  {
    id: 'don-ataque-imparable',
    nombre: 'Don del ataque imparable',
    categoria: CATEGORIAS_DOTE.DON_EPICO,
    requisitos: [{ tipo: 'nivel', valor: 19 }],
    descripcion: '+1 FUE o DES (hasta 30). Daño contundente/cortante/perforante siempre ignora resistencia. Golpe arrollador: en crítico (20 natural), daño adicional = puntuación de la característica aumentada.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza', 'Destreza'], valor: 1, maximo: 30 },
      { tipo: 'texto', desc: 'Daño físico ignora resistencia. Golpe arrollador: crítico → daño adicional = puntuación característica aumentada.' },
    ],
  },
  {
    id: 'don-destino',
    nombre: 'Don del destino',
    categoria: CATEGORIAS_DOTE.DON_EPICO,
    requisitos: [{ tipo: 'nivel', valor: 19 }],
    descripcion: '+1 any (hasta 30). Mejorar el destino: cuando tú u otro a 18 m supere o falle un d20, puedes tirar 2d4 y aplicarlos como bono o penalizador (1/iniciativa o desc. corto/largo).',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza','Destreza','Constitución','Inteligencia','Sabiduría','Carisma'], valor: 1, maximo: 30 },
      { tipo: 'texto', desc: 'Mejorar el destino: ±2d4 en cualquier d20 tuyo o aliado (1/iniciativa o desc. corto/largo).' },
    ],
  },
  {
    id: 'don-espiritu-noche',
    nombre: 'Don del espíritu de la noche',
    categoria: CATEGORIAS_DOTE.DON_EPICO,
    requisitos: [{ tipo: 'nivel', valor: 19 }],
    descripcion: '+1 any (hasta 30). En luz tenue/oscuridad: invisible como acc. adic. (termina al actuar). Forma sombría: resistencia a todo el daño excepto psíquico y radiante.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza','Destreza','Constitución','Inteligencia','Sabiduría','Carisma'], valor: 1, maximo: 30 },
      { tipo: 'texto', desc: 'Invisible en luz tenue/oscuridad (acc. adic., termina al actuar). Forma sombría: resistencia a todo excepto psíquico/radiante.' },
    ],
  },
  {
    id: 'don-recuerdo-conjuros',
    nombre: 'Don del recuerdo de conjuros',
    categoria: CATEGORIAS_DOTE.DON_EPICO,
    requisitos: [{ tipo: 'nivel', valor: 19 }, { tipo: 'rasgo', rasgo: 'lanzamiento-de-conjuros' }],
    descripcion: '+1 INT, SAB o CAR (hasta 30). Lanzamiento gratuito: al lanzar conjuro nv.1-4, tira 1d4; si el resultado = nivel del espacio, no se gasta.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Inteligencia', 'Sabiduría', 'Carisma'], valor: 1, maximo: 30 },
      { tipo: 'texto', desc: 'Lanzamiento gratuito: al lanzar conjuro nv.1-4 con espacio, tira 1d4; si = nivel del espacio, no se gasta.' },
    ],
  },
  {
    id: 'don-viaje-dimensional',
    nombre: 'Don del viaje dimensional',
    categoria: CATEGORIAS_DOTE.DON_EPICO,
    requisitos: [{ tipo: 'nivel', valor: 19 }],
    descripcion: '+1 any (hasta 30). Pasos desplazadores: inmediatamente después de atacar o lanzar conjuro, teletransportarse hasta 9 m a espacio visible.',
    efectos: [
      { tipo: 'stat-elegir', opciones: ['Fuerza','Destreza','Constitución','Inteligencia','Sabiduría','Carisma'], valor: 1, maximo: 30 },
      { tipo: 'texto', desc: 'Pasos desplazadores: teletransporte 9 m tras atacar o lanzar conjuro.' },
    ],
  },
];

// ── Exportar todo junto ──────────────────────────────────────────────
export const TODAS_LAS_DOTES = [
  ...DOTES_ORIGEN,
  ...DOTES_GENERALES,
  ...DOTES_ESTILO_COMBATE,
  ...DOTES_DON_EPICO,
];

export function getDoteById(id) {
  return TODAS_LAS_DOTES.find(d => d.id === id) ?? null;
}

export function getDotesPorCategoria(categoria) {
  return TODAS_LAS_DOTES.filter(d => d.categoria === categoria);
}

// ── Mapping de entrenamiento ─────────────────────────────────────────
const ENTRENAMIENTO_MAPA = {
  'armaduras-ligeras':  'Ligeras',
  'armaduras-medias':   'Medias',
  'armaduras-pesadas':  'Pesadas',
  'escudos':            'Escudos',
};

// Clases que tienen Estilo de combate y desde qué nivel lo obtienen
const CLASES_ESTILO_COMBATE = { guerrero: 1, paladin: 2, explorador: 2 };

/**
 * Verifica si el personaje cumple los requisitos para elegir una dote.
 * @param {object} dote
 * @param {{ nivel: number, puntuaciones: object, clase: object|null }} param1
 * @returns {{ cumple: boolean, razon: string|null }}
 */
export function cumpleRequisitos(dote, { nivel = 1, puntuaciones = {}, clase = null } = {}) {
  for (const req of (dote.requisitos ?? [])) {
    if (req.tipo === 'nivel') {
      if (nivel < req.valor)
        return { cumple: false, razon: `Requiere nivel ${req.valor}` };
    }

    if (req.tipo === 'stat-min') {
      if ((puntuaciones[req.stat] ?? 0) < req.valor)
        return { cumple: false, razon: `Requiere ${req.stat} ${req.valor}+` };
    }

    if (req.tipo === 'stat-min-o') {
      const cumpleAlguna = req.stats.some(s => (puntuaciones[s] ?? 0) >= req.valor);
      if (!cumpleAlguna)
        return { cumple: false, razon: `Requiere ${req.stats.join(' o ')} ${req.valor}+` };
    }

    if (req.tipo === 'entrenamiento') {
      const tipo = ENTRENAMIENTO_MAPA[req.entrenamiento] ?? req.entrenamiento;
      if (!clase?.entrenamientoArmaduras?.includes(tipo))
        return { cumple: false, razon: `Requiere entrenamiento con ${tipo}` };
    }

    if (req.tipo === 'rasgo') {
      if (req.rasgo === 'lanzamiento-de-conjuros') {
        if (!clase?.magia)
          return { cumple: false, razon: 'Requiere lanzamiento de conjuros' };
      }
      if (req.rasgo === 'estilo-de-combate') {
        const minNivel = CLASES_ESTILO_COMBATE[clase?.id];
        if (!minNivel || nivel < minNivel)
          return { cumple: false, razon: 'Requiere rasgo Estilo de combate' };
      }
    }
  }
  return { cumple: true, razon: null };
}
