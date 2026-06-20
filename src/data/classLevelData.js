// Fuente: Manual del Jugador D&D 2024 — Cap. 3: Clases
// Tablas de rasgos por nivel, niveles de ASI y subclase para las 12 clases.

const ASI = {
  nombre: 'Mejora de característica',
  desc: 'Eliges una dote: la de Mejora de característica (sube puntuaciones) u otra para la que cumplas los requisitos. Se repite en los niveles 8, 12 y 16.',
  esASI: true,
}

const subclaseRasgo = (nombre = 'Rasgo de subclase') => ({
  nombre,
  desc: 'Obtienes un rasgo de tu subclase elegida.',
  esRasgoSubclase: true,
})

const subclaseElegir = (tipo) => ({
  nombre: 'Subclase',
  desc: `Elige tu ${tipo}. Tu elección determina los rasgos adicionales que obtienes a los niveles 3, 6, 10 y 14 (o los especificados por la subclase).`,
  esSubclase: true,
})

const donEpico = {
  nombre: 'Don Épico',
  desc: 'Eliges una dote de la categoría «don épico» (u otra para la que cumplas los requisitos).',
  esASI: true,
  esDonEpico: true,
}

// ────────────────────────────────────────────────────────────────────
export const NIVEL_DATOS = {

  // ── BÁRBARO ─────────────────────────────────────────────────────
  barbaro: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Defensa sin armadura', pagina: 51, desc: 'Sin armadura, tu CA base es 10 + tu modificador por Destreza + tu modificador por Constitución. Puedes llevar escudo igualmente.' },
        { nombre: 'Furia', pagina: 51, desc: 'Acción adicional para enfurecerte (no con armadura pesada). Mientras dura: resistencia al daño contundente, cortante y perforante; bonificador al daño de tus ataques de Fuerza (sube por nivel); ventaja en pruebas y salvaciones de Fuerza; no puedes concentrarte ni lanzar conjuros. Dura hasta el final de tu próximo turno; la prolongas (hasta 10 minutos) si atacas, fuerzas una salvación o usas una acción adicional. Varios usos según tu nivel; recuperas uno en descanso corto y todos en descanso largo.' },
        { nombre: 'Maestría con armas', pagina: 51, desc: 'Puedes aplicar la propiedad de maestría de 2 tipos de armas cuerpo a cuerpo (sencillas o marciales). El número de armas aumenta con el nivel. Puedes cambiar una elección tras un descanso largo.' },
      ],
      2: [
        { nombre: 'Ataque temerario', pagina: 52, desc: 'En tu primer ataque del turno puedes atacar temerariamente: ventaja en tus ataques de Fuerza hasta tu próximo turno, pero los ataques contra ti también tienen ventaja durante ese tiempo.' },
        { nombre: 'Sentir el peligro', pagina: 52, desc: 'Ventaja en las tiradas de salvación de Destreza, salvo que estés incapacitado.' },
      ],
      3: [
        { nombre: 'Conocimiento primigenio', pagina: 52, desc: 'Ganas competencia en otra habilidad de la lista de bárbaro. Además, mientras estés enfurecido puedes usar Fuerza en lugar de la característica normal para pruebas de Acrobacias, Intimidación, Percepción, Sigilo o Supervivencia.' },
        { nombre: 'Subclase de bárbaro', pagina: 52, desc: 'Eliges tu senda de bárbaro (Árbol del Mundo, Berserker, Corazón Salvaje o Fanático). A partir de aquí obtienes sus rasgos según tu nivel de bárbaro.', esSubclase: true },
      ],
      4: [ASI],
      5: [
        { nombre: 'Ataque adicional', pagina: 52, desc: 'Atacas dos veces en lugar de una al usar la acción de atacar.' },
        { nombre: 'Movimiento rápido', pagina: 52, desc: 'Tu velocidad aumenta 3 m si no llevas armadura pesada.' },
      ],
      6: [subclaseRasgo()],
      7: [
        { nombre: 'Instinto salvaje', pagina: 52, desc: 'Ventaja en las tiradas de iniciativa.' },
        { nombre: 'Salto instintivo', pagina: 53, desc: 'Al enfurecerte (acción adicional) puedes moverte hasta la mitad de tu velocidad.' },
      ],
      8: [ASI],
      9: [
        { nombre: 'Golpe brutal', pagina: 53, desc: 'Si usas Ataque temerario, puedes renunciar a la ventaja de un ataque de Fuerza; si acierta, causa 1d10 de daño extra y aplicas un efecto a elegir: empujar al objetivo 4,5 m en línea recta (y avanzar hacia él sin provocar ataques de oportunidad) o reducir su velocidad 4,5 m hasta tu próximo turno.' },
      ],
      10: [subclaseRasgo()],
      11: [
        { nombre: 'Furia implacable', pagina: 53, desc: 'Si caes a 0 PG mientras estás enfurecido y no mueres, una salvación de Constitución CD 10 te deja con PG iguales al doble de tu nivel de bárbaro. La CD sube +5 por cada uso adicional y vuelve a 10 tras un descanso corto o largo.' },
      ],
      12: [ASI],
      13: [
        { nombre: 'Golpe brutal mejorado', pagina: 53, desc: 'Golpe brutal gana dos opciones más: dar desventaja en la próxima salvación del objetivo (y bloquear sus ataques de oportunidad), o conceder +5 al próximo ataque de un aliado contra ese objetivo.' },
      ],
      14: [subclaseRasgo()],
      15: [
        { nombre: 'Furia persistente', pagina: 53, desc: 'Al tirar iniciativa puedes recuperar todos los usos de furia (una vez por descanso largo). Además, tu furia dura 10 minutos sin necesidad de prolongarla; solo termina si quedas inconsciente o te pones armadura pesada.' },
      ],
      16: [ASI],
      17: [
        { nombre: 'Golpe brutal mejorado', pagina: 53, desc: 'El daño extra de Golpe brutal sube a 2d10 y puedes aplicar dos efectos diferentes a la vez.' },
      ],
      18: [
        { nombre: 'Poderío indómito', pagina: 53, desc: 'Si tu resultado en una prueba o salvación de Fuerza es menor que tu puntuación de Fuerza, usas la puntuación en su lugar.' },
      ],
      19: [donEpico],
      20: [
        { nombre: 'Campeón primordial', pagina: 53, desc: 'Tu Fuerza y tu Constitución aumentan +4 (hasta un máximo de 25).' },
      ],
    },
  },

  // ── BARDO ───────────────────────────────────────────────────────
  bardo: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Inspiración bárdica', pagina: 59, desc: 'Acción adicional: das un dado de Inspiración bárdica (d6) a una criatura a 18 m que te vea u oiga (máx. uno por criatura). Durante la siguiente hora, cuando falle una prueba con d20, puede tirar el dado y sumarlo (el dado se gasta al tirarlo). Usos iguales a tu modificador por Carisma (mínimo 1); se recuperan en descanso largo. El dado sube a d8 (nivel 5), d10 (nivel 10) y d12 (nivel 15).' },
        { nombre: 'Lanzamiento de conjuros', pagina: 59, desc: 'Lanzas conjuros de la lista de bardo (aptitud Carisma; canalizador: un instrumento musical). Empiezas con 2 trucos (más en niveles 4 y 10) y preparas conjuros de nivel 1+ según la tabla. Puedes cambiar trucos/preparados al subir de nivel.' },
      ],
      2: [
        { nombre: 'Aprendiz de mucho', pagina: 60, desc: 'Sumas la mitad de tu bonificador por competencia (redondeando hacia abajo) a las pruebas de característica que usen una habilidad en la que no seas competente y que no usen ya tu competencia.' },
        { nombre: 'Pericia', pagina: 60, desc: 'Ganas pericia (doble competencia) en dos de tus habilidades. Ganas otras dos en el nivel 9.' },
      ],
      3: [
        { nombre: 'Subclase de bardo', pagina: 60, desc: 'Eliges tu colegio de bardo (Danza, Conocimiento, Glamour o Valor). A partir de aquí obtienes sus rasgos según tu nivel de bardo.', esSubclase: true },
      ],
      4: [ASI],
      5: [
        { nombre: 'Fuente de inspiración', pagina: 61, desc: 'Recuperas todos los usos de Inspiración bárdica también en descanso corto. Además, puedes gastar un espacio de conjuro (sin acción) para recuperar un uso.' },
      ],
      6: [subclaseRasgo()],
      7: [
        { nombre: 'Contraencantamiento', pagina: 61, desc: 'Si tú o una criatura a 9 m falláis una salvación contra un efecto de asustado o hechizado, reacción para repetir esa salvación con ventaja.' },
      ],
      8: [ASI],
      9: [
        { nombre: 'Pericia', pagina: 60, desc: 'Ganas pericia en otras dos de tus habilidades (segunda concesión de Pericia).' },
      ],
      10: [
        { nombre: 'Secretos mágicos', pagina: 61, desc: 'Cuando subas de nivel y aumente tu número de conjuros preparados, los nuevos pueden salir también de las listas de clérigo, druida y mago (cuentan como conjuros de bardo). También puedes sustituir preparados por conjuros de esas listas.' },
      ],
      12: [ASI],
      14: [subclaseRasgo()],
      16: [ASI],
      18: [
        { nombre: 'Inspiración superior', pagina: 61, desc: 'Al tirar iniciativa, recuperas usos de Inspiración bárdica hasta tener dos (si tuvieras menos).' },
      ],
      19: [donEpico],
      20: [
        { nombre: 'Palabras de creación', pagina: 61, desc: 'Siempre tienes preparados palabra de poder: sanar y palabra de poder: matar. Al lanzar cualquiera de los dos, puedes afectar a una segunda criatura que esté a 3 m del primer objetivo.' },
      ],
    },
  },

  // ── BRUJO ───────────────────────────────────────────────────────
  brujo: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Invocaciones sobrenaturales', pagina: 69, desc: 'Obtienes 1 invocación a elegir (algunas tienen requisito de nivel u otra invocación). Ganas más al subir de nivel: 3 (nivel 2), 5 (5), 6 (7), 7 (9), 8 (11), 9 (14) y 10 (17). Puedes sustituir una invocación al subir de nivel. El listado completo está en «Opciones de invocación sobrenatural».' },
        { nombre: 'Magia del pacto', pagina: 69, desc: 'Lanzas conjuros de la lista de brujo (aptitud Carisma; canalizador: un canalizador arcano). Conoces 2 trucos (más en niveles 4 y 10) y preparas conjuros según la tabla. Tus espacios de conjuro son todos del nivel más alto disponible y se recuperan también en descanso corto.' },
      ],
      2: [
        { nombre: 'Astucia mágica', pagina: 70, desc: 'Rito de 1 minuto que recupera espacios de Magia del pacto hasta la mitad de tu máximo (redondeando hacia arriba). Una vez por descanso largo.' },
      ],
      3: [
        { nombre: 'Subclase de brujo', pagina: 70, desc: 'Eliges tu patrón (Celestial, Feérico, Infernal o Primigenio). A partir de aquí obtienes sus rasgos según tu nivel de brujo.', esSubclase: true },
      ],
      4: [ASI],
      6: [subclaseRasgo()],
      8: [ASI],
      9: [
        { nombre: 'Contactar patrón', pagina: 71, desc: 'Siempre tienes preparado contactar con otro plano y puedes lanzarlo sin espacio para hablar con tu patrón (superas la salvación automáticamente). Una vez por descanso largo de esta forma.' },
      ],
      10: [subclaseRasgo()],
      11: [
        { nombre: 'Arcanum místico', pagina: 71, desc: 'Eliges un conjuro de brujo de nivel 6 que puedes lanzar una vez sin espacio (recarga en descanso largo). Sumas otro conjuro a esta reserva en los niveles 13 (nivel 7), 15 (nivel 8) y 17 (nivel 9). Puedes cambiar un arcanum por otro del mismo nivel al subir de nivel.' },
      ],
      12: [ASI],
      13: [
        { nombre: 'Arcanum místico (conjuro de nivel 7)', pagina: 71, desc: 'Sumas un conjuro de brujo de nivel 7 a tu Arcanum místico (ver el rasgo del nivel 11).' },
      ],
      14: [subclaseRasgo()],
      15: [
        { nombre: 'Arcanum místico (conjuro de nivel 8)', pagina: 71, desc: 'Sumas un conjuro de brujo de nivel 8 a tu Arcanum místico (ver el rasgo del nivel 11).' },
      ],
      16: [ASI],
      17: [
        { nombre: 'Arcanum místico (conjuro de nivel 9)', pagina: 71, desc: 'Sumas un conjuro de brujo de nivel 9 a tu Arcanum místico (ver el rasgo del nivel 11).' },
      ],
      19: [donEpico],
      20: [
        { nombre: 'Maestro sobrenatural', pagina: 71, desc: 'Al usar Astucia mágica, recuperas todos los espacios de Magia del pacto gastados.' },
      ],
    },
  },

  // ── CLÉRIGO ─────────────────────────────────────────────────────
  clerigo: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Lanzamiento de conjuros', pagina: 81, desc: 'Lanzas conjuros de la lista de clérigo (aptitud Sabiduría; canalizador: un símbolo sagrado). Conoces 3 trucos (más en niveles 4 y 10) y preparas conjuros de nivel 1+ según la tabla. Puedes cambiar trucos al subir de nivel y los preparados tras un descanso largo.' },
        { nombre: 'Orden divina', pagina: 82, desc: 'Eliges una función sacra. Protector: competencia con armas marciales y entrenamiento con armaduras pesadas. Taumaturgo: un truco extra de clérigo y un bonificador a las pruebas de Inteligencia (Conocimiento arcano y Religión) = tu modificador por Sabiduría (mínimo +1).' },
      ],
      2: [
        { nombre: 'Canalizar divinidad', pagina: 82, desc: 'Energía divina con dos efectos iniciales (eliges al usarlo); CD igual a tu CD de salvación de conjuros. Chispa divina (acción de magia: 1d8 + Sabiduría a una criatura a 9 m, para curar o forzar una salvación de Constitución por daño necrótico/radiante; sube a 2d8/3d8/4d8 en niveles 7/13/18). Expulsar muertos vivientes (acción de magia: los muertos vivientes a 9 m hacen salvación de Sabiduría o quedan asustados e incapacitados 1 minuto, alejándose de ti). 2 usos (3 en nivel 6, 4 en el 18); recuperas 1 en descanso corto y todos en largo.' },
      ],
      3: [
        { nombre: 'Subclase de clérigo', pagina: 83, desc: 'Eliges tu dominio (Guerra, Luz, Vida o Engaño). A partir de aquí obtienes sus rasgos según tu nivel de clérigo (3, 6 y 17).', esSubclase: true },
      ],
      4: [ASI],
      5: [
        { nombre: 'Abrasar muertos vivientes', pagina: 83, desc: 'Al usar Expulsar muertos vivientes, los que fallen la salvación sufren daño radiante igual a la suma de tu modificador por Sabiduría en d8 (mínimo 1d8). No termina la expulsión.' },
      ],
      6: [subclaseRasgo()],
      7: [
        { nombre: 'Golpes benditos', pagina: 83, desc: 'Eliges una opción permanente: Golpe divino (una vez por turno, al acertar con un arma, +1d8 de daño necrótico o radiante) o Lanzamiento potente (sumas tu modificador por Sabiduría al daño de tus trucos de clérigo).' },
      ],
      8: [ASI],
      10: [
        { nombre: 'Intercesión divina', pagina: 83, desc: 'Acción de magia: lanzas un conjuro de clérigo de nivel 5 o menor (que no requiera reacción) sin gastar espacio ni componentes materiales. Una vez por descanso largo.' },
      ],
      12: [ASI],
      14: [
        { nombre: 'Golpes benditos mejorados', pagina: 83, desc: 'Mejora tu opción de Golpes benditos. Golpe divino: el daño extra sube a 2d8. Lanzamiento potente: al dañar con un truco de clérigo, das PG temporales = el doble de tu modificador por Sabiduría a ti o a una criatura a 18 m.' },
      ],
      16: [ASI],
      17: [subclaseRasgo()],
      19: [donEpico],
      20: [
        { nombre: 'Intercesión divina mayor', pagina: 83, desc: 'Tu Intercesión divina puede elegir el conjuro deseo; si lo haces, no vuelves a usar Intercesión divina hasta finalizar 2d4 descansos largos.' },
      ],
    },
  },

  // ── DRUIDA ──────────────────────────────────────────────────────
  druida: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Lanzamiento de conjuros', pagina: 91, desc: 'Lanzas conjuros de la lista de druida (aptitud Sabiduría; canalizador: un canalizador druídico). Conoces 2 trucos (más en niveles 4 y 10) y preparas conjuros de nivel 1+ según la tabla. Puedes cambiar trucos al subir de nivel y los preparados tras un descanso largo.' },
        { nombre: 'Druídico', pagina: 92, desc: 'Conoces el idioma secreto druídico y siempre tienes preparado hablar con los animales. Puedes dejar mensajes ocultos en druídico: quien lo conozca los detecta; los demás deben superar una prueba de Inteligencia (Investigación) CD 15 para verlos (y no pueden descifrarlos sin magia).' },
        { nombre: 'Orden primigenia', pagina: 92, desc: 'Eliges una función sacra. Guardián: competencia con armas marciales y entrenamiento con armaduras medias. Naturalista: un truco extra de druida y un bonificador a las pruebas de Inteligencia (Conocimiento arcano y Naturaleza) = tu modificador por Sabiduría (mínimo +1).' },
      ],
      2: [
        { nombre: 'Compañero salvaje', pagina: 92, desc: 'Acción de magia: gastas un espacio de conjuro o un uso de Forma salvaje para lanzar encontrar familiar sin componentes; el familiar es un feérico y desaparece al terminar un descanso largo.' },
        { nombre: 'Forma salvaje', pagina: 92, desc: 'Acción adicional: te transformas en una bestia que conozcas (empiezas con 4 formas, valor de desafío máximo ¼ y sin vuelo). Obtienes PG temporales = tu nivel de druida; dura horas = la mitad de tu nivel. 2 usos (más en niveles superiores); recuperas 1 en descanso corto y todos en descanso largo. Las formas y su valor de desafío mejoran con el nivel.' },
      ],
      3: [
        { nombre: 'Subclase de druida', pagina: 93, desc: 'Eliges tu círculo druídico (Luna, Tierra, Estrellas o Mar). A partir de aquí obtienes sus rasgos según tu nivel de druida.', esSubclase: true },
      ],
      4: [
        ASI,
        { nombre: 'Forma salvaje mejorada', pagina: 93, desc: 'Tus formas conocidas suben a 6 y el valor de desafío máximo pasa a ½ (todavía sin velocidad volando).' },
      ],
      5: [
        { nombre: 'Resurgimiento salvaje', pagina: 93, desc: 'Una vez por turno, si no te quedan usos de Forma salvaje, recuperas uno gastando un espacio de conjuro (sin acción). Además, puedes gastar un uso de Forma salvaje para obtener un espacio de conjuro de nivel 1 (una vez por descanso largo).' },
      ],
      6: [subclaseRasgo()],
      7: [
        { nombre: 'Furia elemental', pagina: 93, desc: 'Eliges una opción permanente: Golpe primordial (una vez por turno, al acertar con un arma o ataque de bestia, +1d8 de daño de frío, fuego, relámpago o trueno) o Lanzamiento potente (sumas tu modificador por Sabiduría al daño de tus trucos de druida).' },
      ],
      8: [
        ASI,
        { nombre: 'Forma salvaje mejorada', pagina: 93, desc: 'Tus formas de bestia pasan a valor de desafío máximo 1 y pueden tener velocidad volando.' },
      ],
      10: [subclaseRasgo()],
      12: [ASI],
      14: [subclaseRasgo()],
      15: [
        { nombre: 'Furia elemental mejorada', pagina: 93, desc: 'Mejora tu opción de Furia elemental. Golpe primordial: el daño extra sube a 2d8. Lanzamiento potente: tus trucos de druida con alcance ≥3 m ganan +90 m de alcance.' },
      ],
      16: [ASI],
      18: [
        { nombre: 'Conjurar como bestia', pagina: 93, desc: 'Puedes lanzar conjuros mientras usas Forma salvaje, salvo los que requieran un componente material con coste o que se consuma.' },
      ],
      19: [donEpico],
      20: [
        { nombre: 'Archidruida', pagina: 94, desc: 'Al tirar iniciativa sin usos de Forma salvaje, recuperas uno. Puedes convertir usos no gastados de Forma salvaje en un espacio de conjuro (cada uso vale 2 niveles de conjuro). Además, envejeces mucho más lento.' },
      ],
    },
  },

  // ── EXPLORADOR ──────────────────────────────────────────────────
  explorador: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Lanzamiento de conjuros', pagina: 103, desc: 'Canalizas la magia de la naturaleza como semilanzador. Preparas conjuros de la lista de explorador (empiezas con 2 de nivel 1; el total sube según la tabla) y los lanzas con tus espacios, que se recuperan en descanso largo. Tras un descanso largo puedes sustituir un conjuro preparado. Aptitud mágica: Sabiduría; puedes usar un canalizador druídico.' },
        { nombre: 'Enemigo predilecto', pagina: 103, desc: 'Siempre tienes preparado marca del cazador y puedes lanzarlo sin gastar espacio cierto número de veces por descanso largo (sube según la tabla de clase).' },
        { nombre: 'Maestría con armas', pagina: 104, desc: 'Puedes usar la propiedad de maestría de dos tipos de armas con los que tengas competencia. Tras un descanso largo puedes cambiar esa elección.' },
      ],
      2: [
        { nombre: 'Estilo de combate', pagina: 104, desc: 'Obtienes una dote de estilo de combate. Alternativa Guerrero druídico: aprendes 2 trucos de druida que cuentan como conjuros de explorador (aptitud Sabiduría) y puedes sustituir uno al subir de nivel.' },
        { nombre: 'Explorador hábil', pagina: 104, desc: 'Conoces dos idiomas adicionales y ganas pericia en una habilidad en la que ya tengas competencia.' },
      ],
      3: [{ nombre: 'Subclase de explorador', pagina: 104, desc: 'Eliges tu subclase (Acechador en la Penumbra, Cazador, Errante Feérico o Señor de las Bestias). A partir de aquí obtienes sus rasgos según tu nivel de explorador.', esSubclase: true }],
      4: [ASI],
      5: [
        { nombre: 'Ataque adicional', pagina: 104, desc: 'Cuando realizas la acción de atacar, haces dos ataques en lugar de uno.' },
      ],
      6: [
        { nombre: 'Errante', pagina: 104, desc: 'Si no llevas armadura pesada, tu velocidad aumenta 3 m. Además obtienes velocidad de nado y de escalada iguales a tu velocidad a pie.' },
      ],
      7: [subclaseRasgo()],
      8: [ASI],
      9: [
        { nombre: 'Pericia', pagina: 104, desc: 'Ganas pericia en dos habilidades en las que tengas competencia pero no pericia.' },
      ],
      10: [
        { nombre: 'Infatigable', pagina: 105, desc: 'PG temporales: como acción de magia te das 1d8 + modificador por Sabiduría PG temporales (mín. 1); usos = modificador por Sabiduría (mín. 1), recargan en descanso largo. Además, al terminar un descanso corto reduces tu cansancio en 1.' },
      ],
      11: [subclaseRasgo()],
      12: [ASI],
      13: [
        { nombre: 'Cazador persistente', pagina: 105, desc: 'Recibir daño no rompe tu concentración en marca del cazador.' },
      ],
      14: [
        { nombre: 'Velo de la naturaleza', pagina: 105, desc: 'Acción adicional: te vuelves invisible hasta el final de tu siguiente turno. Usos = modificador por Sabiduría (mín. 1); recargan en descanso largo.' },
      ],
      15: [subclaseRasgo()],
      16: [ASI],
      17: [
        { nombre: 'Cazador preciso', pagina: 105, desc: 'Tienes ventaja en los ataques contra la criatura que lleve tu marca del cazador.' },
      ],
      18: [
        { nombre: 'Sentidos salvajes', pagina: 105, desc: 'Obtienes visión ciega hasta 9 m.' },
      ],
      19: [donEpico],
      20: [
        { nombre: 'Azote de enemigos', pagina: 105, desc: 'El dado de daño de tu marca del cazador pasa de d6 a d10.' },
      ],
    },
  },

  // ── GUERRERO ────────────────────────────────────────────────────
  guerrero: {
    nivelSubclase: 3,
    nivelesASI: [4, 6, 8, 12, 14, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Estilo de combate', pagina: 113, desc: 'Obtienes una dote de estilo de combate. Cada vez que subas un nivel de guerrero puedes cambiarla por otra dote de estilo de combate.' },
        { nombre: 'Maestría con armas', pagina: 113, desc: 'Puedes usar la propiedad de maestría de tres tipos de armas sencillas o marciales con los que tengas competencia. Tras un descanso largo puedes cambiar una elección. El total sube según la tabla: 4 (niv. 4), 5 (niv. 10), 6 (niv. 16).' },
        { nombre: 'Tomar aliento', pagina: 113, desc: 'Acción adicional: recuperas 1d10 + tu nivel de guerrero PG. 2 usos; recuperas 1 en descanso corto y todos en descanso largo. Usos según la tabla: 3 (niv. 4), 4 (niv. 10).' },
      ],
      2: [
        { nombre: 'Acción súbita', pagina: 113, desc: 'En tu turno realizas una acción extra (salvo la acción de magia). Se recupera en descanso corto o largo. Desde el nivel 17 puedes usarla dos veces por descanso, pero solo una vez por turno.' },
        { nombre: 'Mente táctica', pagina: 113, desc: 'Cuando falles una prueba de característica, puedes gastar un uso de Tomar aliento para tirar 1d10 y sumarlo a la prueba (en vez de recuperar PG). Si aun así fallas, el uso no se gasta.' },
      ],
      3: [{ nombre: 'Subclase de guerrero', pagina: 114, desc: 'Eliges tu subclase (Caballero Arcano, Campeón, Guerrero Psiónico o Maestro del Combate). A partir de aquí obtienes sus rasgos según tu nivel de guerrero.', esSubclase: true }],
      4: [
        ASI,
        { nombre: 'Maestría con armas', pagina: 113, desc: 'Aumenta a 4 armas.' },
        { nombre: 'Tomar aliento', pagina: 113, desc: 'Aumenta a 3 usos.' },
      ],
      5: [
        { nombre: 'Ataque adicional', pagina: 114, desc: 'Cuando realizas la acción de atacar, haces dos ataques en lugar de uno.' },
        { nombre: 'Desplazamiento táctico', pagina: 114, desc: 'Cuando uses Tomar aliento con una acción adicional, puedes moverte hasta la mitad de tu velocidad sin provocar ataques de oportunidad.' },
      ],
      6: [ASI],
      7: [subclaseRasgo()],
      8: [ASI],
      9: [
        { nombre: 'Indómito', pagina: 114, desc: 'Si fallas una salvación, puedes repetirla con un bonificador igual a tu nivel de guerrero (te quedas el nuevo resultado). 1 uso por descanso largo; sube a 2 (niv. 13) y 3 (niv. 17).' },
        { nombre: 'Maestro táctico', pagina: 115, desc: 'Al atacar con un arma cuya propiedad de maestría puedas usar, puedes sustituir esa propiedad por debilitar, empujar o ralentizar para ese ataque.' },
      ],
      10: [
        subclaseRasgo(),
        { nombre: 'Maestría con armas', pagina: 113, desc: 'Aumenta a 5 armas.' },
        { nombre: 'Tomar aliento', pagina: 113, desc: 'Aumenta a 4 usos.' },
      ],
      11: [
        { nombre: 'Dos ataques adicionales', pagina: 115, desc: 'Cuando realizas la acción de atacar, haces tres ataques en lugar de uno.' },
      ],
      12: [ASI],
      13: [
        { nombre: 'Ataques estudiados', pagina: 115, desc: 'Si fallas un ataque contra una criatura, tienes ventaja en tu siguiente ataque contra ella antes del final de tu siguiente turno.' },
        { nombre: 'Indómito', pagina: 114, desc: 'Aumenta a 2 usos.' },
      ],
      14: [ASI],
      15: [subclaseRasgo()],
      16: [
        ASI,
        { nombre: 'Maestría con armas', pagina: 113, desc: 'Aumenta a 6 armas.' },
      ],
      17: [
        { nombre: 'Acción súbita', pagina: 113, desc: 'Aumenta a 2 usos (solo una vez por turno).' },
        { nombre: 'Indómito', pagina: 114, desc: 'Aumenta a 3 usos.' },
      ],
      18: [subclaseRasgo()],
      19: [donEpico],
      20: [
        { nombre: 'Tres ataques adicionales', pagina: 115, desc: 'Cuando realizas la acción de atacar, haces cuatro ataques en lugar de uno.' },
      ],
    },
  },

  // ── HECHICERO ───────────────────────────────────────────────────
  hechicero: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Lanzamiento de conjuros', desc: 'Recurres a tu magia innata para lanzar conjuros. Aptitud mágica: Carisma. 4 trucos de hechicero (ganas otro en nivel 4 y nivel 10); preparas conjuros de la lista de hechicero según la tabla (2 en nivel 1). Al subir de nivel, puedes sustituir un conjuro. Los espacios se recuperan en descanso largo. Puedes usar un canalizador arcano.' },
        { nombre: 'Hechicería innata', desc: 'Un suceso de tu pasado dejó una marca indeleble en ti. Como acción adicional, desatas esa magia durante 1 minuto: la CD de tus conjuros de hechicero aumenta en 1, y tienes ventaja en las tiradas de ataque de tus conjuros de hechicero. 2 usos; recuperas todos tras descanso largo.' },
      ],
      2: [
        { nombre: 'Fuente de magia', desc: 'Puedes acceder a una abundante fuente de magia interior, representada por puntos de hechicería (= tu nivel de hechicero, mín. 2). Puedes convertir un espacio de conjuro en puntos (= nivel del espacio, sin acción) o gastar puntos para crear un espacio como acción adicional (Nv1 = 2 pts, Nv2 = 3, Nv3 = 5, Nv4 = 6, Nv5 = 7; máximo nivel 5). Los espacios creados desaparecen tras descanso largo. Los puntos se recuperan tras descanso largo.' },
        { nombre: 'Metamagia', desc: 'Como la magia fluye desde tu interior, puedes alterar tus conjuros. Aprendes 2 opciones de metamagia (Acelerado, Buscador, Cuidadoso, Distante, Extendido, Gemelo, Intensificado, Potenciado, Sutil, Transmutado). Solo una opción por conjuro salvo se indique lo contrario. Al subir nivel puedes sustituir una. Obtienes 2 más en nivel 10 y 2 más en nivel 17.' },
      ],
      3: [subclaseElegir('origen de hechicería')],
      4: [ASI],
      5: [
        { nombre: 'Recuperación mágica', desc: 'Tras finalizar un descanso corto, puedes recuperar una cantidad de puntos de hechicería igual o inferior a la mitad de tu nivel de hechicero (redondeando hacia abajo). Una vez hasta el siguiente descanso largo.' },
      ],
      6: [subclaseRasgo()],
      7: [
        { nombre: 'Encarnación mágica', desc: 'Si no te quedan usos de Hechicería innata, puedes usarla gastando 2 puntos de hechicería al emplear la acción adicional para activarla. Además, mientras Hechicería innata esté activa, puedes usar hasta dos opciones de metamagia en cada conjuro que lances.' },
      ],
      8: [ASI],
      9: [],
      10: [
        { nombre: 'Metamagia', desc: 'Aprendes 2 opciones adicionales de metamagia (total 4).' },
      ],
      11: [],
      12: [ASI],
      13: [],
      14: [subclaseRasgo()],
      15: [],
      16: [ASI],
      17: [
        { nombre: 'Metamagia', desc: 'Aprendes 2 opciones adicionales de metamagia (total 6).' },
      ],
      18: [subclaseRasgo()],
      19: [donEpico],
      20: [
        { nombre: 'Apoteosis arcana', desc: 'Mientras tengas activo el rasgo Hechicería innata, puedes usar una opción de metamagia en cada uno de tus turnos sin gastar puntos de hechicería en ella.' },
      ],
    },
  },

  // ── MAGO ────────────────────────────────────────────────────────
  mago: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Lanzamiento de conjuros', desc: 'Como estudiante de magia arcana, lanzas conjuros. Aptitud mágica: Inteligencia. 3 trucos de mago (ganas otro en nivel 4 y nivel 10); tras descanso largo puedes sustituir un truco. Tu libro de conjuros contiene 6 conjuros de mago de nivel 1 (+2 cada vez que subes de nivel). Preparas conjuros de tu grimorio según la tabla (4 en nivel 1); puedes cambiarlos tras descanso largo. Los espacios se recuperan en descanso largo. Puedes usar un canalizador arcano o tu libro de conjuros.' },
        { nombre: 'Adepto en rituales', desc: 'Puedes lanzar de forma ritual cualquier conjuro de mago que figure en tu libro de conjuros y esté marcado como «ritual», sin necesidad de tenerlo preparado. Debes leerlo del libro para lanzarlo de esta forma.' },
        { nombre: 'Recuperación arcana', desc: 'Tras finalizar un descanso corto, puedes recuperar espacios de conjuro gastados cuya suma de niveles sea ≤ la mitad de tu nivel de mago (redondeando hacia arriba). Ningún espacio puede ser de nivel 6 o superior. Una vez hasta el siguiente descanso largo.' },
      ],
      2: [
        { nombre: 'Académico', desc: 'Te has especializado en otro campo de estudio. Elige una habilidad en la que tengas competencia: Conocimiento arcano, Historia, Investigación, Medicina, Naturaleza o Religión. Ganas pericia en la habilidad elegida.' },
      ],
      3: [subclaseElegir('tradición arcana')],
      4: [ASI],
      5: [
        { nombre: 'Memorizar conjuro', desc: 'Tras finalizar un descanso corto, puedes estudiar tu libro de conjuros y sustituir un conjuro de mago de nivel 1 o superior que tengas preparado por otro de nivel 1 o superior del libro.' },
      ],
      6: [subclaseRasgo()],
      7: [],
      8: [ASI],
      9: [],
      10: [subclaseRasgo()],
      11: [],
      12: [ASI],
      13: [],
      14: [subclaseRasgo()],
      15: [],
      16: [ASI],
      17: [],
      18: [
        { nombre: 'Maestría sobre conjuros', desc: 'Elige un conjuro de nivel 1 y otro de nivel 2 de tu libro con tiempo de lanzamiento de una acción. Siempre los tienes preparados y puedes lanzarlos a su nivel más bajo sin gastar espacio. Para lanzarlos a nivel superior, gasta un espacio. Tras descanso largo, puedes sustituir uno por otro del libro del mismo nivel.' },
      ],
      19: [donEpico],
      20: [
        { nombre: 'Conjuros característicos', desc: 'Escoge dos conjuros de nivel 3 de tu libro como conjuros característicos. Siempre los tienes preparados y puedes lanzar cada uno una vez a nivel 3 sin gastar espacio (se recupera tras descanso corto o largo). Para lanzarlos a nivel superior, gasta un espacio.' },
      ],
    },
  },

  // ── MONJE ───────────────────────────────────────────────────────
  monje: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Artes marciales', desc: 'Con armas de monje (armas cuerpo a cuerpo sencillas o marciales Ligeras) y ataques sin armas, sin armadura ni escudo: puedes usar DES en lugar de FUE para tiradas de ataque y daño (y para agarre/empujón). Dado de artes marciales: d6. Puedes hacer un ataque sin armas como acción adicional (Ataque sin armas adicional).' },
        { nombre: 'Defensa sin armadura', desc: 'Mientras no llevas armadura ni escudo: CA base = 10 + mod. DES + mod. SAB.' },
      ],
      2: [
        { nombre: 'Concentración de monje', desc: 'Tienes puntos de concentración = tu nivel de monje. Se recuperan en descanso corto o largo. CD = 8 + mod. SAB + bonif. competencia. Opciones: Defensa paciente — destrabarte como acción adicional (o 1 pto: destrabarte + esquivar). Paso del viento — correr como acción adicional (o 1 pto: destrabarte + correr y duplicar saltos). Ráfaga de golpes — gasta 1 pto: 2 ataques sin armas como acción adicional.' },
        { nombre: 'Metabolismo asombroso', desc: 'Al tirar iniciativa, puedes recuperar todos los puntos de concentración gastados y curar PV = tu nivel de monje + una tirada de tu dado de Artes marciales. Una vez por descanso largo.' },
        { nombre: 'Movimiento sin armadura', desc: 'Tu velocidad aumenta +3 m sin armadura ni escudo. Esta bonificación aumenta con el nivel según la tabla (hasta +9 m al nivel 18).' },
      ],
      3: [
        subclaseElegir('tradición monástica'),
        { nombre: 'Desviar ataques', desc: 'Reacción cuando un ataque que incluya daño contundente, cortante o perforante te acierte: reduce el daño total en 1d10 + mod. DES + nivel de monje. Si lo reduces a 0, puedes gastar 1 punto de concentración para redirigir la energía: elige una criatura (1,5 m si fue cuerpo a cuerpo; 18 m si fue a distancia), debe superar una salvación de Destreza o sufre 2 tiradas de tu dado AM + mod. DES del mismo tipo de daño.' },
      ],
      4: [
        ASI,
        { nombre: 'Caída lenta', desc: 'Reacción cuando caigas: reduces el daño de caída en 5 × tu nivel de monje.' },
      ],
      5: [
        { nombre: 'Ataque adicional', desc: 'Cuando lleves a cabo la acción de atacar en tu turno, podrás hacer dos ataques en lugar de uno.' },
        { nombre: 'Golpe aturdidor',desc: 'Una vez por turno al acertar con arma de monje o ataque sin armas, puedes gastar 1 punto de concentración: el objetivo hace una salvación de Constitución. Si falla: queda aturdido hasta el inicio de tu siguiente turno. Si supera: su velocidad se reduce a la mitad hasta el inicio de tu siguiente turno y la siguiente tirada de ataque contra él antes de ese momento tiene ventaja.' },
        { nombre: 'Dado de artes marciales', desc: 'Sube a d8.' },
      ],
      6: [
        subclaseRasgo(),
        { nombre: 'Golpes potenciados', desc: 'Siempre que inflijas daño con tu ataque sin armas, puedes elegir entre causar daño de fuerza o su tipo de daño normal.' },
      ],
      7: [
        { nombre: 'Evasión', desc: 'Cuando sufras un efecto que te permita hacer una salvación de Destreza para sufrir solo la mitad del daño, no recibes daño si la superas y solo la mitad si la fallas. No funciona si estás incapacitado.' },
      ],
      8: [ASI],
      9: [
        { nombre: 'Movimiento acrobático', desc: 'Mientras no lleves armadura ni escudo, puedes moverte por superficies verticales y sobre líquidos sin caerte.' },
      ],
      10: [
        subclaseRasgo(),
        { nombre: 'Autorrestablecimiento', desc: 'Por fuerza de voluntad puedes eliminar uno de los siguientes estados al final de cada uno de tus turnos: asustado, envenenado o hechizado. Además, privarte de comida y bebida no te aplica niveles de cansancio.' },
        { nombre: 'Concentración agudizada', desc: 'Mejoras a las opciones básicas: Defensa paciente (gastar 1 pto ganas PV temporales = 2 tiradas de tu dado AM); Paso del viento (gastar 1 pto permite llevar contigo a una criatura voluntaria Grande o menor a 1,5 m hasta el final del turno sin provocar ataques de oportunidad); Ráfaga de golpes (gastar 1 pto = 3 ataques sin armas en lugar de 2).' },
      ],
      11: [
        subclaseRasgo(),
        { nombre: 'Dado de artes marciales', desc: 'Sube a d10.' },
      ],
      12: [ASI],
      13: [
        { nombre: 'Desviar energía', desc: 'Ahora puedes usar Desviar ataques contra ataques que causen cualquier tipo de daño, no solo contundente, cortante o perforante.' },
      ],
      14: [
        { nombre: 'Superviviente disciplinado', desc: 'Ganas competencia en todas las tiradas de salvación. Además, cuando hagas una tirada de salvación y falles, puedes gastar 1 punto de concentración para repetirla (debes usar el nuevo resultado).' },
      ],
      15: [
        { nombre: 'Concentración perfecta', desc: 'Cuando tires iniciativa y no uses Metabolismo asombroso, si te quedan 3 o menos puntos de concentración, recuperas puntos hasta tener 4.' },
      ],
      16: [ASI],
      17: [
        subclaseRasgo(),
        { nombre: 'Dado de artes marciales', desc: 'Sube a d12.' },
      ],
      18: [
        { nombre: 'Defensa superior', desc: 'Al principio de tu turno, puedes gastar 3 puntos de concentración para protegerte del daño durante 1 minuto o hasta que quedes incapacitado. Durante ese tiempo tienes resistencia a todo el daño excepto al de fuerza.' },
      ],
      19: [donEpico],
      20: [
        { nombre: 'Cuerpo y mente', desc: 'Has llevado tu cuerpo y mente a otro nivel. Tus puntuaciones de Destreza y Sabiduría aumentan en 4, hasta un máximo de 25.', aplicaStats: { Destreza: 4, Sabiduría: 4 }, maxStat: 25 },
      ],
    },
  },

  // ── PALADÍN ─────────────────────────────────────────────────────
  paladin: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Imponer las manos', desc: 'Reserva de curación = 5 × nivel de paladín (se rellena en descanso largo). Como acción adicional, tocas a una criatura y restauras PV de la reserva. También puedes gastar 5 ptos para eliminar el estado envenenado (sin restaurar PV con esos ptos).' },
        { nombre: 'Lanzamiento de conjuros', desc: 'Aptitud mágica: Carisma. Sin trucos (salvo Guerrero bendito). Preparas conjuros de la lista de paladín según la tabla (2 en nivel 1). Eliges qué conjuros preparar; puedes cambiarlos tras un descanso largo. Los conjuros de juramento de tu subclase siempre están preparados y no cuentan para tu límite. Los espacios se recuperan en descanso largo (semilanzador). Puedes usar un símbolo sagrado como canalizador.' },
        { nombre: 'Maestría con armas', desc: 'Puedes usar las propiedades de maestría con 2 tipos de armas de tu elección con las que tengas competencia. Puedes cambiar las armas elegidas tras descanso largo.' },
      ],
      2: [
        { nombre: 'Castigo de paladín', desc: 'Siempre tienes el conjuro castigo divino preparado. Puedes lanzarlo sin gastar un espacio de conjuro, pero debes finalizar un descanso largo antes de poder volver a lanzarlo de este modo.' },
        { nombre: 'Estilo de combate', desc: 'Obtienes una dote de estilo de combate de tu elección. Opción exclusiva: Guerrero bendito — aprendes 2 trucos de clérigo de tu elección (se recomiendan guía y llama sagrada). Cuentan como conjuros de paladín; CAR es tu aptitud mágica. Puedes sustituir uno al subir de nivel de paladín.' },
      ],
      3: [
        subclaseElegir('juramento sagrado'),
        { nombre: 'Canalizar divinidad', desc: '2 usos; recuperas 1 en descanso corto y todos en descanso largo. Efecto base: Sentidos divinos — acción adicional: durante 10 min detectas celestiales, infernales y muertos vivientes a 18 m (percibes su tipo) y objetos/lugares consagrados o profanados. Tu juramento te otorga efectos adicionales.' },
      ],
      4: [ASI],
      5: [
        { nombre: 'Ataque adicional', desc: 'Cuando lleves a cabo la acción de atacar en tu turno, podrás hacer dos ataques en lugar de uno.' },
        { nombre: 'Corcel fiel', desc: 'Puedes invocar la ayuda de un corcel sobrenatural. Siempre tienes el conjuro hallar corcel preparado. Puedes lanzarlo una vez sin gastar un espacio de conjuro; recuperas la capacidad tras finalizar un descanso largo.' },
      ],
      6: [
        { nombre: 'Aura de protección', desc: 'Emanación de 3 m centrada en ti (inactiva si estás incapacitado). Tú y tus aliados dentro del aura sumáis tu mod. CAR (mín. +1) a las tiradas de salvación. A niv. 18 aumenta a 9 m.' },
      ],
      7: [subclaseRasgo()],
      8: [ASI],
      9: [
        { nombre: 'Abjurar de los enemigos', desc: 'Acción de magia: gasta un uso de Canalizar divinidad. Mostrando tu símbolo sagrado, un número de criaturas visibles a 18 m = tu mod. CAR (mín. 1) deben superar una salvación de SAB o quedan asustadas 1 min (o hasta recibir daño). Mientras asustadas, solo pueden hacer una cosa en su turno: moverse, una acción o una acción adicional.' },
      ],
      10: [
        { nombre: 'Aura de coraje', desc: 'Tú y tus aliados dentro de tu Aura de protección tenéis inmunidad al estado asustado. Si un aliado asustado entra en el aura, ese estado no tiene efecto mientras esté dentro.' },
      ],
      11: [
        { nombre: 'Golpes radiantes', desc: 'Tus golpes tienen un poder sobrenatural. Cuando aciertes a un objetivo con una tirada de ataque usando un arma cuerpo a cuerpo o un ataque sin armas, el objetivo recibe 1d8 de daño radiante adicional. Además, obtienes un tercer uso de Canalizar divinidad.' },
      ],
      12: [ASI],
      13: [],
      14: [
        { nombre: 'Toque reparador', desc: 'Al usar Imponer las manos, también puedes eliminar estados de la criatura: asustado, aturdido, cegado, ensordecido, hechizado o paralizado. Gasta 5 ptos de la reserva por cada estado eliminado (sin restaurar PV con esos ptos).' },
      ],
      15: [subclaseRasgo()],
      16: [ASI],
      17: [],
      18: [
        { nombre: 'Expansión de aura', desc: 'Tu Aura de protección es ahora una emanación de 9 m.' },
      ],
      19: [donEpico],
      20: [subclaseRasgo()],
    },
  },

  // ── PÍCARO ──────────────────────────────────────────────────────
  picaro: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 10, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Ataque furtivo', desc: 'Una vez por turno, al acertar con un arma sutil o a distancia: infliges 1d6 de daño adicional si tienes ventaja en la tirada O si un aliado no incapacitado está a 1,5 m del objetivo (sin desventaja). El daño sube con el nivel según la tabla.' },
        { nombre: 'Jerga de ladrones', desc: 'Conoces la jerga de ladrones y otro idioma de tu elección. Puedes usar la jerga para ocultar mensajes en escritura aparentemente inocente.' },
        { nombre: 'Maestría con armas', desc: 'Puedes usar las propiedades de maestría con 2 tipos de armas de tu elección con las que tengas competencia. Puedes cambiarlas tras descanso largo.' },
        { nombre: 'Pericia', desc: 'Ganas pericia en dos de tus competencias en habilidades de tu elección (se recomiendan Juego de manos y Sigilo). En el nivel 6 ganas pericia en otras dos.' },
      ],
      2: [
        { nombre: 'Acción astuta', desc: 'En tu turno puedes llevar a cabo una de las siguientes acciones como acción adicional: correr, destrabarse o esconderse.' },
      ],
      3: [
        subclaseElegir('arquetipo pícaro'),
        { nombre: 'Puntería certera', desc: 'Como acción adicional, te concedes ventaja en tu siguiente tirada de ataque del turno actual. Solo puedes usar este rasgo si no te has movido durante este turno y, después de usarlo, tu velocidad es 0 hasta el final del turno.' },
      ],
      4: [ASI],
      5: [
        { nombre: 'Esquiva asombrosa', desc: 'Reacción cuando un atacante que puedas ver te acierte: reduces a la mitad el daño que te causa ese ataque (redondeando hacia abajo).' },
        { nombre: 'Golpe astuto', desc: 'Al infligir daño de Ataque furtivo, puedes renunciar a dados para añadir un efecto. CD = 8 + mod. DES + bonif. competencia. Retirada (1d6) — te mueves hasta la mitad de tu velocidad sin provocar ataques de oportunidad. Tropiezo (1d6) — objetivo Grande o menor hace salvación de DES o queda derribado. Veneno (1d6) — objetivo hace salvación de CON o queda envenenado 1 min (requiere útiles de envenenador).' },
      ],
      6: [
        { nombre: 'Pericia', desc: 'Ganas pericia en otras dos competencias en habilidades de tu elección.' },
      ],
      7: [
        { nombre: 'Evasión', desc: 'Cuando sufras un efecto que te permita hacer una salvación de Destreza para sufrir solo la mitad del daño, no recibes daño si la superas y solo la mitad si la fallas. No funciona si estás incapacitado.' },
        { nombre: 'Talentos fiables', desc: 'Cuando hagas una prueba de característica que use una de tus competencias en habilidades o con herramientas, puedes sustituir un resultado de 9 o menos en el d20 por un 10.' },
      ],
      8: [ASI],
      9: [subclaseRasgo()],
      10: [ASI],
      11: [
        { nombre: 'Golpe astuto mejorado', desc: 'Puedes usar hasta dos efectos de Golpe astuto cuando inflijas daño de Ataque furtivo, pagando el coste en dados por cada efecto.' },
      ],
      12: [ASI],
      13: [subclaseRasgo()],
      14: [
        { nombre: 'Golpes taimados', desc: 'Nuevas opciones de Golpe astuto: Confundir (2d6) — objetivo hace salvación de CON o solo puede hacer una cosa en su próximo turno (moverse, una acción o acción adicional). Noquear (6d6) — objetivo hace salvación de CON o queda inconsciente 1 min (o hasta recibir daño; repite salvación al final de cada turno). Ofuscar (3d6) — objetivo hace salvación de DES o queda cegado hasta el final de su siguiente turno.' },
      ],
      15: [
        { nombre: 'Mente escurridiza', desc: 'Tu mente astuta es excepcionalmente difícil de controlar. Ganas competencia en las tiradas de salvación de Sabiduría y Carisma.' },
      ],
      16: [ASI],
      17: [subclaseRasgo()],
      18: [
        { nombre: 'Elusivo', desc: 'Ninguna tirada de ataque contra ti tendrá ventaja a menos que tengas el estado de incapacitado.' },
      ],
      19: [donEpico],
      20: [
        { nombre: 'Golpe de suerte', desc: 'Si fallas una prueba con d20, puedes convertir el resultado de la tirada en un 20. Cuando uses este rasgo, no podrás volver a hacerlo hasta que finalices un descanso corto o largo.' },
      ],
    },
  },
}
