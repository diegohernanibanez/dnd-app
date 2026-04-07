// Fuente: Manual del Jugador D&D 2024 - Capítulo 2: Crear un personaje (Paso 4)

export const ALINEAMIENTOS = [
  {
    id: 'legal-bueno',
    nombre: 'Legal Bueno',
    abrev: 'LB',
    descripcion: 'Actúas con compasión y siempre dentro de lo que dictan la ley y la tradición.',
    fila: 0, col: 0,
  },
  {
    id: 'neutral-bueno',
    nombre: 'Neutral Bueno',
    abrev: 'NB',
    descripcion: 'Haces lo mejor que puedes para ayudar a los demás sin preferencia por el orden o el caos.',
    fila: 0, col: 1,
  },
  {
    id: 'caotico-bueno',
    nombre: 'Caótico Bueno',
    abrev: 'CB',
    descripcion: 'Actúas según tu conciencia sin respetar las expectativas de los demás.',
    fila: 0, col: 2,
  },
  {
    id: 'legal-neutral',
    nombre: 'Legal Neutral',
    abrev: 'LN',
    descripcion: 'Actúas de acuerdo con la ley, la tradición o un código personal sin grandes inclinaciones morales.',
    fila: 1, col: 0,
  },
  {
    id: 'neutral',
    nombre: 'Neutral',
    abrev: 'N',
    descripcion: 'Prefieres evitar cuestiones morales y no tomas partido, siendo pragmático por encima de todo.',
    fila: 1, col: 1,
  },
  {
    id: 'caotico-neutral',
    nombre: 'Caótico Neutral',
    abrev: 'CN',
    descripcion: 'Sigues tus caprichos y valoras tu libertad personal por encima de cualquier otra cosa.',
    fila: 1, col: 2,
  },
  {
    id: 'legal-malvado',
    nombre: 'Legal Malvado',
    abrev: 'LM',
    descripcion: 'Tomas lo que deseas dentro del límite de un código de tradición, lealtad u orden.',
    fila: 2, col: 0,
  },
  {
    id: 'neutral-malvado',
    nombre: 'Neutral Malvado',
    abrev: 'NM',
    descripcion: 'Haces lo que sea necesario para salirte con la tuya sin compasión ni escrúpulos.',
    fila: 2, col: 1,
  },
  {
    id: 'caotico-malvado',
    nombre: 'Caótico Malvado',
    abrev: 'CM',
    descripcion: 'Actúas con violencia arbitraria y destruyes todo lo que está en tu camino.',
    fila: 2, col: 2,
  },
]

// Sugerencias de rasgos de personalidad por trasfondo (Manual del Jugador 2024, Cap. 4)
export const RASGOS_POR_TRASFONDO = {
  acolito: {
    rasgos: [
      'Admiro a un héroe de mi religión y menciono sus proezas en cada conversación.',
      'Me agobio con profundas preguntas filosóficas y teológicas.',
    ],
    ideales: ['Tradición. Las antiguas costumbres deben preservarse y respetarse.'],
    vinculos: ['Dedicaría mi vida al templo que me acogió cuando era niño.'],
    defectos: ['Juzgo con dureza a los que no se atienen a los ideales de mi fe.'],
  },
  animador: {
    rasgos: [
      'Conozco una historia relevante para casi cualquier situación.',
      'Cuando estoy aburrido, empiezo a cantar o tararear.',
    ],
    ideales: ['Creatividad. El mundo necesita más música, historias y arte.'],
    vinculos: ['Un mecenas me ayudó cuando era un artista hambriento y le debo todo.'],
    defectos: ['Me cuesta trabajo aceptar las críticas a mi trabajo.'],
  },
  artesano: {
    rasgos: [
      'Creo en el trabajo duro y no me doy por vencido fácilmente.',
      'Siempre busco la forma más eficiente de hacer cualquier tarea.',
    ],
    ideales: ['Comunidad. Es responsabilidad de los que prosperan alzar a quienes los rodean.'],
    vinculos: ['Mi aprendizaje me inculcó el orgullo por mi trabajo. Nunca haré algo de mala gana.'],
    defectos: ['Nunca me conformo con algo que sea suficientemente bueno.'],
  },
  campesino: {
    rasgos: [
      'La vida dura del campo me hizo ser directo y práctico.',
      'Tengo fe inquebrantable en la gente corriente.',
    ],
    ideales: ['Familia. La tierra, los animales y la familia son lo más importante.'],
    vinculos: ['La tierra es mía; cualquier intento de arrebatármela acabará en violencia.'],
    defectos: ['Soy lento para confiar en quienes no son campesinos o trabajadores.'],
  },
  charlatan: {
    rasgos: [
      'Pienso rápido y hablo más rápido aún.',
      'Sé leer el carácter de alguien con solo mirarlo.',
    ],
    ideales: ['Independencia. Soy un espíritu libre; nadie me dice qué hacer.'],
    vinculos: ['Un amigo de infancia fue víctima de una estafa. Mi cruzada personal es acabar con los estafadores.'],
    defectos: ['No puedo resistirme a una apuesta, aunque las probabilidades estén en mi contra.'],
  },
  comerciante: {
    rasgos: [
      'Regateo con todo, incluso cuando no hace falta.',
      'Soy capaz de encontrar un comprador para cualquier cosa.'],
    ideales: ['Prosperidad. El comercio justo enriquece a todos.'],
    vinculos: ['Mi familia perdió todo su dinero. Lo recuperaré.'],
    defectos: ['Nunca puedo evitar intentar sacar un beneficio de cualquier situación.'],
  },
  criminal: {
    rasgos: [
      'Siempre tengo un plan de escape para cualquier situación.',
      'El dinero que gano fácil se va fácil.'],
    ideales: ['Libertad. Las cadenas deben romperse, sean físicas o sociales.'],
    vinculos: ['Cuido de quienes no pueden cuidarse solos.'],
    defectos: ['Cuando meto la pata, la culpa es siempre de otra persona.'],
  },
  ermitano: {
    rasgos: [
      'Estoy acostumbrado al silencio y encuentro incómodo el ruido social.',
      'Me pertuba la violación de la privacidad ajena, aunque solo sea rumores.'],
    ideales: ['Conocimiento. La iluminación proviene del estudio de uno mismo.'],
    vinculos: ['Busco una verdad que los demás desconocen y que podría cambiar el mundo.'],
    defectos: ['Ahora que he regresado al mundo, me distrae fácilmente la promesa de nuevos conocimientos.'],
  },
  erudito: {
    rasgos: [
      'Cito (o tergiverso) antiguos textos para casi cualquier situación.',
      'Me cuesta mantener la atención en el presente cuando tengo la cabeza en los libros.'],
    ideales: ['Conocimiento. La búsqueda del saber vale cualquier sacrificio.'],
    vinculos: ['La biblioteca donde trabajé es todo para mí. Daría mi vida por protegerla.'],
    defectos: ['Despracio a quienes no tienen formación y les hago saber que son inferiores a mí.'],
  },
  guerrero: {
    rasgos: [
      'Enfrento los problemas directamente; la sutileza es para quienes no saben pelear.',
      'Cuando veo una injusticia, actúo sin pensarlo dos veces.'],
    ideales: ['Fuerza. Los fuertes deben proteger a los débiles.'],
    vinculos: ['Luché junto a personas que no merecen mi lealtad. Pero la tienen de todas formas.'],
    defectos: ['Si no hay pelea a la vista me aburro y meto la pata.'],
  },
  marinero: {
    rasgos: [
      'He visto cosas que harían llorar a otros marineros; tengo estómago de hierro.',
      'Me adapto a cualquier situación sin quejarme.'],
    ideales: ['Respeto. Lo que nos importa en alta mar es la habilidad, no la cuna.'],
    vinculos: ['Mi barco es mi hogar. Haré cualquier cosa por protegerlo.'],
    defectos: ['Seguiría las órdenes de un superior incluso si me llevan al desastre.'],
  },
  noble: {
    rasgos: [
      'Mi educación incluye todo el saber del mundo, y me aseguro de que los demás lo sepan.',
      'Me pongo nervioso cuando no estoy bien vestido.'],
    ideales: ['Responsabilidad. Mis obligaciones con el pueblo deben cumplirse.'],
    vinculos: ['La reputación de mi familia significa más que nada para mí.'],
    defectos: ['Oculto un secreto vergonzoso que podría arruinar a mi familia.'],
  },
  proscrito: {
    rasgos: [
      'Sé cómo sobrevivir en las tierras salvajes mejor que en la ciudad.',
      'Tengo reputación de intimidar a la gente, aunque no siempre es mi intención.'],
    ideales: ['Gloria. Debo ganarme mi lugar en el mundo con hazañas.'],
    vinculos: ['Fui separado de mi familia cuando era joven. Busco reunirme con ellos.'],
    defectos: ['Me violento fácilmente y confío más en la fuerza que en el diálogo.'],
  },
  sabio: {
    rasgos: [
      'Cuando aprendo algo nuevo, me aseguro de que todos a mi alrededor también lo aprendan.',
      'Tengo respuestas para casi todo... o al menos eso creo.'],
    ideales: ['Conocimiento. El conocimiento es poder, y el poder debe usarse responsablemente.'],
    vinculos: ['Un texto antiguo que he estado buscando podría revelar una gran verdad.'],
    defectos: ['Tengo dificultades para admitir cuando no sé algo.'],
  },
  soldado: {
    rasgos: [
      'Sigo mis rutinas de entrenamiento con disciplina, incluso en el campo de batalla.',
      'Respeto mucho la jerarquía y las cadenas de mando.'],
    ideales: ['Deber. Haré lo que me manden mis superiores, con la confianza de que es lo correcto.'],
    vinculos: ['Lucharé por los que no pueden hacerlo por sí mismos.'],
    defectos: ['He cometido un terrible error en batalla que costó vidas. Hago todo lo posible por ocultarlo.'],
  },
  urchin: {
    rasgos: [
      'Me muevo sigilosamente entre la multitud por instinto.',
      'Soy desconfiado con los desconocidos, aunque intento no demostrarlo.'],
    ideales: ['Comunidad. Todos debemos cuidar de los nuestros.'],
    vinculos: ['Mi hermano pequeño depende de mí. Haré cualquier cosa por protegerlo.'],
    defectos: ['El oro me quema en el bolsillo y lo gasto cuanto antes.'],
  },
}

export const CAMPOS_APARIENCIA = [
  { id: 'genero', label: 'Género' },
  { id: 'edad', label: 'Edad' },
  { id: 'altura', label: 'Altura' },
  { id: 'peso', label: 'Peso' },
  { id: 'ojos', label: 'Color de ojos' },
  { id: 'pelo', label: 'Color de pelo' },
  { id: 'piel', label: 'Tono de piel' },
  { id: 'otros', label: 'Otros rasgos' },
]

// Rasgos de personalidad por eje de alineamiento (Manual pág. 40)
export const RASGOS_POR_ALINEAMIENTO_EJE = {
  caotico: ['Engreído', 'Impulsivo', 'Rebelde', 'Egocéntrico'],
  bueno:   ['Compasivo', 'Servicial', 'Honesto', 'Amable'],
  malvado: ['Deshonesto', 'Vengativo', 'Cruel', 'Avaro'],
  legal:   ['Cooperativo', 'Leal', 'Crítico', 'Metódico'],
  neutral: ['Egoísta', 'Indiferente', 'Lacónico', 'Pragmático'],
}

// Mapeo de alineamiento → ejes
export const EJES_POR_ALINEAMIENTO = {
  'legal-bueno':     ['legal',   'bueno'],
  'neutral-bueno':   ['neutral', 'bueno'],
  'caotico-bueno':   ['caotico', 'bueno'],
  'legal-neutral':   ['legal',   'neutral'],
  'neutral':         ['neutral'],
  'caotico-neutral': ['caotico', 'neutral'],
  'legal-malvado':   ['legal',   'malvado'],
  'neutral-malvado': ['neutral', 'malvado'],
  'caotico-malvado': ['caotico', 'malvado'],
}

// Calificativos por puntuación de característica (Manual pág. 39)
// Se muestran cuando la puntuación es alta (≥14) o baja (≤9)
export const CALIFICATIVOS_CARACTERISTICA = {
  Fuerza:       { alta: ['Musculoso', 'Fibroso', 'Protector', 'Directo'],         baja: ['Débil', 'Flaco', 'Apocado', 'Evasivo'] },
  Destreza:     { alta: ['Ágil', 'Dinámico', 'Inquieto', 'Equilibrado'],          baja: ['Nervioso', 'Torpe', 'Indeciso', 'Inseguro'] },
  Constitución: { alta: ['Enérgico', 'Robusto', 'Afable', 'Estable'],             baja: ['Frágil', 'Aprensivo', 'Apático', 'Vulnerable'] },
  Inteligencia: { alta: ['Decidido', 'Lógico', 'Instructivo', 'Curioso'],          baja: ['Tosco', 'Ilógico', 'Ignorante', 'Frívolo'] },
  Sabiduría:    { alta: ['Sereno', 'Considerado', 'Impasible', 'Precavido'],       baja: ['Impulsivo', 'Distraído', 'Ingenuo', 'Descuidado'] },
  Carisma:      { alta: ['Encantador', 'Atrevido', 'Divertido', 'Inspirador'],     baja: ['Pedante', 'Dominante', 'Insensible', 'Frío'] },
}
