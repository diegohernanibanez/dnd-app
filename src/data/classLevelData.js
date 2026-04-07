// Fuente: Manual del Jugador D&D 2024 — Cap. 3: Clases
// Tablas de rasgos por nivel, niveles de ASI y subclase para las 12 clases.

const ASI = {
  nombre: 'Mejora de característica',
  desc: 'Sube dos puntuaciones de característica en 1 punto cada una, o elige una dote.',
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
  desc: 'Obtienes un don épico de tu elección.',
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
        { nombre: 'Defensa sin armadura', desc: 'Mientras no lleves armadura alguna, tu clase de armadura base será igual a 10 más tus modificadores por Destreza y Constitución. Obtienes este beneficio aunque lleves un escudo.' },
        { nombre: 'Furia', desc: 'Puedes imbuirte de un poder primigenio llamado furia como acción adicional si no llevas armadura pesada. Mientras estés enfurecido: Resistencia al daño contundente, cortante y perforante. Daño por furia: bonificador al daño en ataques que usen la Fuerza (según tabla). Ventaja en pruebas de Fuerza y tiradas de salvación de Fuerza. No puedes mantener la concentración ni lanzar conjuros. La furia dura hasta el final de tu siguiente turno; se prolonga atacando a un enemigo, forzando una salvación o usando una acción adicional. Puedes mantener una furia hasta 10 minutos. Recuperas un uso en descanso corto y todos en descanso largo.' },
        { nombre: 'Maestría con armas', desc: 'Tu entrenamiento con armas te permite utilizar las propiedades de maestría con dos tipos de armas cuerpo a cuerpo sencillas o marciales de tu elección. Tras finalizar un descanso largo, puedes llevar a cabo ejercicios con armas y cambiar una de dichas elecciones. Cuando alcances ciertos niveles de bárbaro, adquirirás la capacidad de usar las propiedades de maestría con más tipos de armas.' },
      ],
      2: [
        { nombre: 'Ataque temerario', desc: 'Puedes abandonar por completo tu defensa para atacar con una mayor fiereza. Cuando vayas a realizar la primera tirada de ataque de tu turno, puedes decidir atacar temerariamente. Si lo haces, tendrás ventaja en las tiradas de ataque que utilicen la Fuerza hasta el principio de tu siguiente turno, pero las tiradas de ataque contra ti también tendrán ventaja durante ese tiempo.' },
        { nombre: 'Sentir el peligro', desc: 'Eres capaz de percibir de forma casi sobrenatural cuándo las cosas no son como deberían. Gracias a ello, se te da bien evitar el peligro. Tienes ventaja en las tiradas de salvación de Destreza salvo que tengas el estado de incapacitado.' },
      ],
      3: [
        subclaseElegir('camino del bárbaro'),
        { nombre: 'Conocimiento primigenio', desc: 'Ganas competencia en otra habilidad de tu elección de la lista de habilidades disponibles para los bárbaros en el nivel 1. Además, mientras estés enfurecido, puedes canalizar el poder primigenio: siempre que hagas una prueba de característica con Acrobacias, Intimidación, Percepción, Sigilo o Supervivencia, podrás hacerla como una prueba de Fuerza incluso si normalmente utiliza otra característica.' },
        { nombre: 'Furias', desc: 'Aumentan a 3 usos.' },
      ],
      4: [ASI],
      5: [
        { nombre: 'Ataque adicional', desc: 'Cuando lleves a cabo la acción de atacar en tu turno, podrás hacer dos ataques en lugar de uno.' },
        { nombre: 'Movimiento rápido', desc: 'Tu velocidad aumenta en 3 m si no llevas armadura pesada.' },
      ],
      6: [
        subclaseRasgo(),
        { nombre: 'Furias', desc: 'Aumentan a 4 usos.' },
      ],
      7: [
        { nombre: 'Instinto salvaje', desc: 'Tus instintos están tan afinados que tienes ventaja en las tiradas de iniciativa.' },
        { nombre: 'Salto instintivo', desc: 'Como parte de la acción adicional para dejarte llevar por la furia, puedes moverte hasta la mitad de tu velocidad.' },
      ],
      8: [ASI],
      9: [
        { nombre: 'Golpe brutal', desc: 'Si utilizas Ataque temerario, puedes renunciar a cualquier ventaja en una tirada de ataque basada en la Fuerza en tu turno. La tirada elegida no debe tener desventaja. Si acierta, el objetivo sufre 1d10 de daño adicional del mismo tipo que inflija el arma o ataque sin armas y puedes causar un efecto de Golpe brutal: Golpe enérgico (el objetivo es empujado 4,5 m en línea recta; luego puedes moverte hasta la mitad de tu velocidad hacia él sin provocar ataques de oportunidad) o Golpe ralentizador (la velocidad del objetivo se reduce en 4,5 m hasta el principio de tu siguiente turno; un objetivo solo puede sufrir un golpe ralentizador cada vez).' },
      ],
      10: [subclaseRasgo()],
      11: [
        { nombre: 'Furia implacable', desc: 'Tu furia te permite seguir luchando incluso tras sufrir heridas graves. Si tus puntos de golpe se reducen a 0 mientras estás enfurecido, pero no mueres inmediatamente, puedes hacer una tirada de salvación de Constitución con CD 10. Si la superas, tus puntos de golpe pasarán a ser una cantidad igual al doble de tu nivel de bárbaro. Siempre que uses este rasgo después de la primera vez, la CD aumenta en 5. Tras finalizar un descanso corto o largo, la CD vuelve a ser 10.' },
      ],
      12: [
        ASI,
        { nombre: 'Furias', desc: 'Aumentan a 5 usos.' },
      ],
      13: [
        { nombre: 'Golpe brutal mejorado', desc: 'Has perfeccionado tus formas de atacar con fiereza. Entre las opciones de Golpe brutal se encuentran ahora los siguientes efectos: Golpe abrumador (el objetivo tiene desventaja en la siguiente tirada de salvación que haga y no puede llevar a cabo ataques de oportunidad hasta el principio de tu siguiente turno) y Golpe desgarrador (antes del principio de tu siguiente turno, la próxima tirada de ataque de otra criatura contra el objetivo obtiene +5; una tirada solo puede obtener un bonificador de un golpe desgarrador).' },
      ],
      14: [subclaseRasgo()],
      15: [
        { nombre: 'Furia persistente', desc: 'Cuando tires iniciativa, puedes recuperar todos los usos gastados de la furia. Tras recuperar los usos de esta manera, no podrás volver a hacerlo hasta que finalices un descanso largo. Además, tu furia es tan intensa que ahora dura 10 minutos sin necesidad de hacer nada para prolongarla. Tu furia termina antes si recibes el estado de inconsciente (no solo el de incapacitado) o te pones una armadura pesada.' },
      ],
      16: [
        ASI,
        { nombre: 'Furias', desc: 'El bonificador de daño por furia sube a +4.' },
      ],
      17: [
        { nombre: 'Golpe brutal mejorado', desc: 'El daño adicional de tu Golpe brutal aumenta a 2d10. Además, puedes utilizar dos efectos diferentes de Golpe brutal siempre que uses tu rasgo Golpe brutal.' },
        { nombre: 'Furias', desc: 'Aumentan a 6 usos.' },
      ],
      18: [
        { nombre: 'Poderío indómito', desc: 'Si tu resultado en una prueba de Fuerza o una tirada de salvación de Fuerza es inferior a tu puntuación de Fuerza, puedes usar esa puntuación en lugar del resultado.' },
      ],
      19: [donEpico],
      20: [
        { nombre: 'Campeón primordial', desc: 'Encarnas un poder primigenio. Tus puntuaciones de Fuerza y Constitución aumentan en 4, hasta un máximo de 25.' },
      ],
    },
  },

  // ── BARDO ───────────────────────────────────────────────────────
  bardo: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Inspiración bárdica', desc: 'Puedes recurrir a tus palabras, música o danza para inspirar de forma sobrenatural a los demás. Como acción adicional, puedes inspirar a otra criatura a 18 m o menos que te pueda ver u oír; obtiene uno de tus dados de Inspiración bárdica (d6). Una sola vez durante la siguiente hora, cuando falle una prueba con d20, podrá tirar el dado y sumar el resultado. Usos iguales a tu modificador por Carisma (mínimo 1); recuperas todos tras descanso largo. El dado sube a d8 en nivel 5, d10 en nivel 10 y d12 en nivel 15.' },
        { nombre: 'Lanzamiento de conjuros', desc: 'Has aprendido a lanzar conjuros mediante tus artes bárdicas. Conoces 2 trucos de la lista de bardo. Preparas conjuros de nivel 1 y superiores de la lista de bardo (4 en nivel 1); el número aumenta según la tabla de tu clase. Cada vez que subas un nivel de bardo, puedes sustituir un conjuro por otro de la lista. Aptitud mágica: Carisma. Puedes utilizar un instrumento musical como canalizador. Espacios de conjuro se recuperan en descanso largo.' },
      ],
      2: [
        { nombre: 'Aprendiz de mucho', desc: 'Puedes sumar la mitad de tu bonificador por competencia (redondeando hacia abajo) a cualquier prueba de característica que hagas que utilice una habilidad en la que no seas competente y que no use de otro modo tu bonificador por competencia.' },
        { nombre: 'Pericia', desc: 'Ganas pericia en dos de tus competencias en habilidades de tu elección. En el nivel 9 de bardo ganas pericia en otras dos competencias de tu elección.' },
      ],
      3: [subclaseElegir('colegio bárdico')],
      4: [ASI],
      5: [
        { nombre: 'Fuente de inspiración', desc: 'Ahora recuperas todos los usos de Inspiración bárdica tras finalizar un descanso corto o largo. Además, puedes gastar un espacio de conjuro (no requiere acción) para recuperar un uso gastado de Inspiración bárdica.' },
      ],
      6: [subclaseRasgo()],
      7: [
        { nombre: 'Contraencantamiento', desc: 'Puedes emplear notas musicales o palabras de poder para interrumpir los efectos que afectan a la mente. Si tú o una criatura a 9 m o menos falláis una tirada de salvación contra un efecto que aplique el estado de asustado o hechizado, puedes llevar a cabo una reacción para que se repita la tirada de salvación con ventaja.' },
      ],
      8: [ASI],
      9: [
        { nombre: 'Pericia', desc: 'Ganas pericia en otras dos competencias en habilidades de tu elección.' },
      ],
      10: [
        { nombre: 'Secretos mágicos', desc: 'Has aprendido secretos de diversas tradiciones mágicas. Cada vez que alcances un nivel de bardo y aumente la cantidad de conjuros preparados, podrás elegir cualquiera de los nuevos conjuros de entre las listas de bardo, clérigo, druida y mago. Los conjuros elegidos contarán como conjuros de bardo para ti. Además, cuando sustituyas un conjuro preparado, podrás hacerlo con un conjuro de esas listas.' },
      ],
      11: [{ nombre: 'Conjuros de nivel 6', desc: 'Desbloqueas espacios de conjuro de nivel 6.' }],
      12: [ASI],
      13: [{ nombre: 'Conjuros de nivel 7', desc: 'Desbloqueas espacios de conjuro de nivel 7.' }],
      14: [subclaseRasgo()],
      15: [{ nombre: 'Dado bárdico d12', desc: 'El dado de Inspiración bárdica sube a d12.' }],
      16: [ASI],
      17: [{ nombre: 'Conjuros de nivel 9', desc: 'Desbloqueas espacios de conjuro de nivel 9.' }],
      18: [
        { nombre: 'Inspiración superior', desc: 'Cuando tires iniciativa, recuperarás usos gastados de Inspiración bárdica hasta que tengas dos, si tuvieras menos de esta cifra.' },
      ],
      19: [donEpico],
      20: [
        { nombre: 'Palabras de creación', desc: 'Ahora dominas dos de las palabras de creación: las palabras de la vida y de la muerte. Siempre tienes preparados palabra de poder: sanar y palabra de poder: matar. Cuando lances uno de estos conjuros, podrás hacer objetivo a una segunda criatura si esta se encuentra a 3 m o menos del primer objetivo.' },
      ],
    },
  },

  // ── BRUJO ───────────────────────────────────────────────────────
  brujo: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Invocaciones sobrenaturales', desc: 'Has desenterrado invocaciones sobrenaturales, fragmentos de conocimiento prohibido que te imbuyen de una capacidad mágica perpetua. Obtienes una invocación de tu elección (como Pacto del grimorio). Cada vez que subas un nivel de brujo, puedes sustituir una invocación por otra para la que cumplas las condiciones. Obtienes más invocaciones en los niveles 3, 5, 7 y 9.' },
        { nombre: 'Magia del pacto', desc: 'Has sellado un pacto con una entidad misteriosa para obtener poderes mágicos. Conoces 2 trucos de brujo. Preparas conjuros de la lista de brujo (2 en nivel 1). Todos tus espacios de Magia del pacto son del mismo nivel (el más alto disponible) y se recuperan en descanso corto o largo. Aptitud mágica: Carisma. Puedes usar un canalizador arcano como canalizador mágico.' },
      ],
      2: [
        { nombre: 'Astucia mágica', desc: 'Puedes llevar a cabo un rito esotérico durante 1 minuto. Al terminarlo, recuperas una cantidad de espacios de Magia del pacto utilizados igual o inferior a la mitad de tu máximo (redondeando hacia arriba). Una vez por descanso largo.' },
      ],
      3: [
        subclaseElegir('patrón sobrenatural'),
      ],
      4: [ASI],
      6: [subclaseRasgo()],
      8: [ASI],
      9: [
        { nombre: 'Contactar patrón', desc: 'Ahora puedes comunicarte directamente con tu patrón, ya que siempre tienes el conjuro contactar con otro plano preparado. Con este rasgo, puedes lanzar el conjuro sin gastar un espacio para contactar con tu patrón y superas automáticamente la tirada de salvación. Una vez por descanso largo de esta forma.' },
      ],
      10: [subclaseRasgo()],
      11: [
        { nombre: 'Arcanum místico (nivel 6)', desc: 'Tu patrón te recompensa con un secreto mágico denominado arcanum. Escoge un conjuro de brujo de nivel 6. Puedes lanzarlo una vez sin gastar un espacio de conjuro; debes finalizar un descanso largo antes de volver a lanzarlo así. Obtendrás más conjuros de arcanum en niveles 13 (nivel 7), 15 (nivel 8) y 17 (nivel 9). Recuperas todos los usos tras descanso largo. Al subir nivel, puedes sustituir un arcanum por otro del mismo nivel.' },
      ],
      12: [ASI],
      13: [
        { nombre: 'Arcanum místico (nivel 7)', desc: 'Igual que el Arcanum de nivel 6, pero para un conjuro de brujo de nivel 7.' },
      ],
      14: [subclaseRasgo()],
      15: [
        { nombre: 'Arcanum místico (nivel 8)', desc: 'Igual que el Arcanum de nivel 6, pero para un conjuro de brujo de nivel 8.' },
      ],
      16: [ASI],
      17: [
        { nombre: 'Arcanum místico (nivel 9)', desc: 'Igual que el Arcanum de nivel 6, pero para un conjuro de brujo de nivel 9.' },
      ],
      19: [donEpico],
      20: [
        { nombre: 'Maestro sobrenatural', desc: 'Cuando empleas tu rasgo Astucia mágica, recuperas todos los espacios de conjuro utilizados de Magia del pacto.' },
      ],
    },
  },

  // ── CLÉRIGO ─────────────────────────────────────────────────────
  clerigo: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Lanzamiento de conjuros', desc: 'Has aprendido a lanzar conjuros gracias a la oración y la meditación. Conoces 3 trucos de clérigo (al subir de nivel, puedes sustituir uno; trucos adicionales en niveles 4 y 10). Preparas conjuros de la lista completa de clérigo (4 en nivel 1); el número aumenta según la tabla. Tras descanso largo puedes cambiar los preparados. Los espacios se recuperan en descanso largo. Aptitud mágica: Sabiduría. Puedes usar un símbolo sagrado como canalizador.' },
        { nombre: 'Orden divina', desc: 'Te has consagrado a una función sacra, a tu elección. Protector — ganas competencia con armas marciales y entrenamiento con armaduras pesadas. Taumaturgo — conoces un truco de clérigo adicional y tu conexión mística te proporciona un bonificador a las pruebas de Inteligencia (Conocimiento arcano y Religión) igual a tu mod. SAB (mínimo +1).' },
      ],
      2: [
        { nombre: 'Canalizar divinidad', desc: 'Puedes canalizar energía divina directamente de los Planos Exteriores. 2 usos; recuperas 1 uso en descanso corto, todos en descanso largo (usos adicionales en niveles superiores). Chispa divina — acción de magia: dirige tu símbolo sagrado a una criatura visible a 9 m. Tira 1d8 + mod. SAB; puedes curar PG iguales al resultado o forzar una salvación de CON: si falla, sufre daño necrótico o radiante (a tu elección) igual al resultado; la mitad si supera. Dado extra en niv. 7 (2d8), 13 (3d8) y 18 (4d8). Expulsar muertos vivientes — acción de magia: cada muerto viviente de tu elección a 9 m debe superar SAB contra tu CD o tendrá los estados de asustado e incapacitado 1 minuto; tratará de alejarse de ti. Termina antes si sufre daño, si tú quedas incapacitado o mueres.' },
      ],
      3: [
        subclaseElegir('dominio divino'),
      ],
      4: [ASI],
      5: [
        { nombre: 'Abrasar muertos vivientes', desc: 'Cuando utilices Expulsar muertos vivientes, puedes tirar una cantidad de d8 igual a tu mod. SAB (mínimo 1d8) y sumar los resultados. Todos los muertos vivientes que fallen la salvación contra ese uso sufrirán daño radiante igual al resultado total. Este daño no pone fin al efecto de expulsión.' },
      ],
      6: [
        subclaseRasgo(),
        { nombre: 'Canalizar divinidad', desc: 'Ahora tienes 3 usos.' },
      ],
      7: [
        { nombre: 'Golpes benditos', desc: 'Te imbuyes de poder divino en la batalla. Elige una opción permanente: Golpe divino — una vez por turno, al acertar con una tirada de ataque con un arma, el objetivo sufre 1d8 de daño necrótico o radiante adicional (a tu elección). Lanzamiento potente — sumas tu mod. SAB al daño que causas con cualquier truco de clérigo.' },
      ],
      8: [ASI],
      10: [
        { nombre: 'Intercesión divina', desc: 'Puedes recurrir a tu deidad o panteón para que intervenga en tu nombre. Como acción de magia, elige cualquier conjuro de clérigo de nivel 5 o inferior que no requiera reacción. Como parte de la misma acción, lánzalo sin gastar un espacio de conjuro ni componentes materiales. Una vez por descanso largo.' },
      ],
      12: [ASI],
      14: [
        { nombre: 'Golpes benditos mejorados', desc: 'Tu opción de Golpes benditos se vuelve más poderosa. Golpe divino → el daño adicional sube a 2d8. Lanzamiento potente → al lanzar un truco de clérigo y causar daño a una criatura, puedes conceder PG temporales iguales a 2 × mod. SAB a ti o a una criatura a 18 m o menos.' },
      ],
      16: [ASI],
      17: [
        subclaseRasgo(),
      ],
      18: [
        { nombre: 'Canalizar divinidad', desc: 'Ahora tienes 4 usos.' },
      ],
      19: [donEpico],
      20: [
        { nombre: 'Intercesión divina mayor', desc: 'Cuando uses Intercesión divina, puedes elegir deseo al seleccionar un conjuro. Si lo haces, no podrás volver a usar Intercesión divina hasta finalizar 2d4 descansos largos.' },
      ],
    },
  },

  // ── DRUIDA ──────────────────────────────────────────────────────
  druida: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Lanzamiento de conjuros', desc: 'Has aprendido a lanzar conjuros estudiando las fuerzas místicas de la naturaleza. Conoces 2 trucos de druida (al subir de nivel, puedes sustituir uno; trucos adicionales en niveles 4 y 10). Preparas conjuros de la lista completa de druida (4 en nivel 1); el número aumenta según la tabla. Tras descanso largo puedes cambiar los preparados. Los espacios se recuperan en descanso largo. Aptitud mágica: Sabiduría. Puedes usar un canalizador druídico.' },
        { nombre: 'Druídico', desc: 'Sabes druídico, el idioma secreto de los druidas. Al aprender esta lengua antigua accediste a la magia para comunicarte con los animales, por lo que siempre tienes hablar con los animales preparado. Puedes dejar mensajes ocultos en druídico; quien lo conozca los detectará, los demás deben superar INT (Investigación) CD 15.' },
        { nombre: 'Orden primigenia', desc: 'Te has consagrado a una función sacra, a tu elección. Guardián — ganas competencia con armas marciales y entrenamiento con armaduras medias. Naturalista — conoces un truco de druida adicional y tu conexión mística te proporciona un bonificador a tus pruebas de Inteligencia (Conocimiento arcano y Naturaleza) igual a tu mod. SAB (mínimo +1).' },
      ],
      2: [
        { nombre: 'Compañero salvaje', desc: 'Puedes invocar un espíritu de la naturaleza que adopta la forma de un animal. Acción de magia: gasta un espacio de conjuro o un uso de Forma salvaje para lanzar encontrar familiar sin componentes materiales. El familiar es un feérico y desaparece al finalizar un descanso largo.' },
        { nombre: 'Forma salvaje', desc: 'El poder de la naturaleza te permite transformarte en un animal. Acción adicional: adoptas una forma de bestia conocida (empiezas con 4 formas, FD máx. ¼, sin vuelo; escala a 6 formas y FD ½ en niv. 4, y FD 1 con vuelo en niv. 8). Obtienes PG temporales = nivel de druida. Dura horas = mitad de tu nivel de druida; termina antes si usas Forma salvaje de nuevo, quedas incapacitado o mueres. 2 usos; recuperas 1 en descanso corto, todos en descanso largo.' },
      ],
      3: [subclaseElegir('círculo druídico')],
      4: [
        ASI,
        { nombre: 'Forma salvaje mejorada', desc: 'Tus formas conocidas aumentan a 6 y el FD máximo pasa a ½ (todavía sin velocidad volando).' },
      ],
      5: [
        { nombre: 'Resurgimiento salvaje', desc: 'Una vez en cada uno de tus turnos, si no te quedan usos de Forma salvaje, puedes obtener un uso gastando un espacio de conjuro (no requiere acción). Además, puedes gastar un uso de Forma salvaje (no requiere acción) para obtener un espacio de conjuro de nivel 1; una vez por descanso largo.' },
      ],
      6: [subclaseRasgo()],
      7: [
        { nombre: 'Furia elemental', desc: 'El poder de los elementos fluye por ti. Elige una opción permanente: Golpe primordial — una vez por turno, al acertar con un arma o ataque de bestia en Forma salvaje, el objetivo sufre 1d8 de daño de frío, fuego, relámpago o trueno adicional (a tu elección). Lanzamiento potente — sumas tu mod. SAB al daño que causas con cualquier truco de druida.' },
      ],
      8: [
        ASI,
        { nombre: 'Forma salvaje mejorada', desc: 'Tus formas de bestia tienen ahora FD máx. 1 y pueden tener velocidad volando.' },
      ],
      10: [subclaseRasgo()],
      12: [ASI],
      14: [subclaseRasgo()],
      15: [
        { nombre: 'Furia elemental mejorada', desc: 'La opción elegida para Furia elemental se vuelve más poderosa. Golpe primordial → el daño adicional sube a 2d8. Lanzamiento potente → cuando lances un truco de druida con alcance de 3 m o más, su alcance aumenta en 90 m.' },
      ],
      16: [ASI],
      18: [
        { nombre: 'Conjurar como bestia', desc: 'Mientras utilices Forma salvaje, puedes lanzar conjuros en forma de bestia, salvo cualquier conjuro que tenga un componente material con coste especificado o que se consuma como parte del conjuro.' },
      ],
      19: [donEpico],
      20: [
        { nombre: 'Archidruida', desc: 'La vitalidad de la naturaleza florece en ti. Forma salvaje perenne — al tirar iniciativa sin usos de Forma salvaje, recuperas uno automáticamente. Mago de la naturaleza — convierte usos no gastados de Forma salvaje en un espacio de conjuro sin acción (cada uso aporta 2 niveles de conjuro); una vez por descanso largo. Longevidad — por cada diez años que pasan, tu cuerpo envejece solo uno.' },
      ],
    },
  },

  // ── EXPLORADOR ──────────────────────────────────────────────────
  explorador: {
    nivelSubclase: 3,
    nivelesASI: [4, 8, 12, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Enemigo predilecto', desc: 'Siempre tienes el conjuro marca del cazador preparado. Puedes lanzarlo dos veces sin gastar un espacio de conjuro y recuperas todos los usos tras finalizar un descanso largo. La cantidad de lanzamientos gratuitos aumenta según la columna «Enemigo predilecto» de la tabla de clase.' },
        { nombre: 'Maestría con armas', desc: 'Tu entrenamiento con armas te permite utilizar las propiedades de maestría con dos tipos de armas de tu elección con las que tengas competencia. Tras finalizar un descanso largo, puedes cambiar los tipos elegidos.' },
        { nombre: 'Lanzamiento de conjuros', desc: 'Has aprendido a canalizar la esencia mágica de la naturaleza para lanzar conjuros. Preparas conjuros de la lista de explorador (2 de nivel 1 para empezar); el número aumenta según la tabla. Tras descanso largo puedes sustituir un conjuro preparado. Los espacios se recuperan en descanso largo (semilanzador). Aptitud mágica: Sabiduría. Puedes usar un canalizador druídico.' },
      ],
      2: [
        { nombre: 'Estilo de combate', desc: 'Obtienes una dote de estilo de combate de tu elección. Como alternativa puedes elegir Guerrero druídico: aprendes 2 trucos de druida (Sabiduría como aptitud mágica; cuentan como conjuros de explorador; puedes sustituir uno al subir de nivel).' },
        { nombre: 'Explorador hábil', desc: 'Tus viajes te proporcionan beneficios. Idiomas: conoces dos idiomas adicionales de tu elección. Pericia: ganas pericia en una competencia de habilidad que ya tengas.' },
      ],
      3: [subclaseElegir('conclave de explorador')],
      4: [ASI],
      5: [
        { nombre: 'Ataque adicional', desc: 'Cuando lleves a cabo la acción de atacar en tu turno, podrás hacer dos ataques en lugar de uno.' },
      ],
      6: [
        { nombre: 'Errante', desc: 'Tu velocidad aumenta en 3 m si no llevas armadura pesada. También tienes una velocidad nadando y una velocidad trepando iguales a tu velocidad.' },
      ],
      7: [subclaseRasgo()],
      8: [ASI],
      9: [
        { nombre: 'Pericia', desc: 'Escoge dos de tus competencias en habilidades con las que no tengas pericia. Ganas pericia en esas habilidades.' },
      ],
      10: [
        { nombre: 'Infatigable', desc: 'Las fuerzas primigenias te ayudan en tus viajes. PG temporales: como acción de magia, te otorgas 1d8 + mod. SAB PG temporales (mín. 1); usos = mod. SAB (mín. 1), se recuperan en descanso largo. Disminuir cansancio: tras finalizar un descanso corto, tu nivel de cansancio se reduce en 1.' },
      ],
      11: [subclaseRasgo()],
      12: [ASI],
      13: [
        { nombre: 'Cazador persistente', desc: 'Sufrir daño no rompe tu concentración en marca del cazador.' },
      ],
      14: [
        { nombre: 'Velo de la naturaleza', desc: 'Invocas espíritus de la naturaleza para esconderte mágicamente. Como acción adicional, te otorgas el estado de invisible hasta el final de tu siguiente turno. Usos = mod. SAB (mín. 1); se recuperan en descanso largo.' },
      ],
      15: [subclaseRasgo()],
      16: [ASI],
      17: [
        { nombre: 'Cazador preciso', desc: 'Tienes ventaja en las tiradas de ataque contra la criatura que tenga tu marca del cazador sobre ella.' },
      ],
      18: [
        { nombre: 'Sentidos salvajes', desc: 'Tu conexión con las fuerzas de la naturaleza te otorga visión ciega hasta 9 m.' },
      ],
      19: [donEpico],
      20: [
        { nombre: 'Azote de enemigos', desc: 'El dado de daño de tu marca del cazador es un d10 en lugar de un d6.' },
      ],
    },
  },

  // ── GUERRERO ────────────────────────────────────────────────────
  guerrero: {
    nivelSubclase: 3,
    nivelesASI: [4, 6, 8, 12, 14, 16],
    rasgosNivel: {
      1: [
        { nombre: 'Estilo de combate', desc: 'Has pulido tu destreza marcial y obtienes una dote de estilo de combate de tu elección. Se recomienda Defensa. Cada vez que subas un nivel de guerrero, puedes sustituir la dote elegida por otra.' },
        { nombre: 'Maestría con armas', desc: 'Tu entrenamiento te permite utilizar las propiedades de maestría con tres tipos de armas sencillas o marciales de tu elección. Tras descanso largo puedes cambiar una elección. El número de armas aumenta según la columna «Maestría con armas» de la tabla: 4 (niv. 4), 5 (niv. 10), 6 (niv. 16).' },
        { nombre: 'Tomar aliento', desc: 'Posees una pequeña reserva de resistencia física y mental. Como acción adicional, recuperas 1d10 + tu nivel de guerrero PG. 2 usos; recuperas 1 en descanso corto, todos en descanso largo. Usos adicionales según la tabla: 3 (niv. 4), 4 (niv. 10).' },
      ],
      2: [
        { nombre: 'Acción súbita', desc: 'Puedes superar tus límites normales durante un instante. En tu turno, llevas a cabo una acción más salvo la acción de magia. Se recupera en descanso corto o largo. A partir de nivel 17 puedes usarlo dos veces antes de descansar, pero solo una vez por turno.' },
        { nombre: 'Mente táctica', desc: 'Tienes facilidad para la estrategia dentro y fuera del campo de batalla. Cuando falles una prueba de característica, puedes gastar un uso de Tomar aliento: en vez de recuperar PG, tiras 1d10 y lo sumas a la prueba (podría convertir un fallo en éxito). Si sigues sin superar la prueba, el uso no se gasta.' },
      ],
      3: [subclaseElegir('arquetipo marcial')],
      4: [
        ASI,
        { nombre: 'Maestría con armas', desc: 'Aumenta a 4 armas.' },
        { nombre: 'Tomar aliento', desc: 'Aumenta a 3 usos.' },
      ],
      5: [
        { nombre: 'Ataque adicional', desc: 'Cuando lleves a cabo la acción de atacar en tu turno, podrás hacer dos ataques en lugar de uno.' },
        { nombre: 'Desplazamiento táctico', desc: 'Cuando uses tu rasgo Tomar aliento con una acción adicional, podrás moverte hasta la mitad de tu velocidad sin provocar ataques de oportunidad.' },
      ],
      6: [ASI],
      7: [subclaseRasgo()],
      8: [ASI],
      9: [
        { nombre: 'Indómito', desc: 'Si fallas una tirada de salvación, puedes repetirla con un bonificador igual a tu nivel de guerrero (debes quedarte con el nuevo resultado). Una vez por descanso largo. Aumenta a 2 usos (niv. 13) y 3 usos (niv. 17).' },
        { nombre: 'Maestro táctico', desc: 'Cuando ataques usando un arma con la que puedas utilizar su propiedad de maestría, puedes sustituir la propiedad para ese ataque por la de debilitar, empujar o ralentizar.' },
      ],
      10: [
        subclaseRasgo(),
        { nombre: 'Maestría con armas', desc: 'Aumenta a 5 armas.' },
        { nombre: 'Tomar aliento', desc: 'Aumenta a 4 usos.' },
      ],
      11: [
        { nombre: 'Dos ataques adicionales', desc: 'Cuando lleves a cabo la acción de atacar en tu turno, podrás hacer tres ataques en lugar de uno.' },
      ],
      12: [ASI],
      13: [
        { nombre: 'Ataques estudiados', desc: 'Estudias a tus adversarios y aprendes con cada ataque. Si haces una tirada de ataque contra una criatura y fallas, tendrás ventaja en tu siguiente tirada de ataque contra esa criatura antes del final de tu siguiente turno.' },
        { nombre: 'Indómito', desc: 'Aumenta a 2 usos.' },
      ],
      14: [ASI],
      15: [subclaseRasgo()],
      16: [
        ASI,
        { nombre: 'Maestría con armas', desc: 'Aumenta a 6 armas.' },
      ],
      17: [
        { nombre: 'Acción súbita', desc: 'Aumenta a 2 usos (pero solo una vez por turno).' },
        { nombre: 'Indómito', desc: 'Aumenta a 3 usos.' },
      ],
      18: [subclaseRasgo()],
      19: [donEpico],
      20: [
        { nombre: 'Tres ataques adicionales', desc: 'Cuando lleves a cabo la acción de atacar en tu turno, podrás hacer cuatro ataques en lugar de uno.' },
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
