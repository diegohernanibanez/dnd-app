// Fuente: Manual del Jugador D&D 2024 - Capítulo 3: Clases de personaje

import { NIVEL_DATOS } from './classLevelData'

export const CLASES = [
  {
    id: 'barbaro',
    nombre: 'Bárbaro',
    descripcion: 'Déjate llevar por la furia y entabla combates cuerpo a cuerpo.',
    preferencia: 'Batalla',
    complejidad: 'Media',
    caracteristicaPrincipal: ['Fuerza'],
    requisitoMulticlase: { caracteristicas: ['Fuerza'], modo: 'and' },
    competenciasMulticlase: { armaduras: ['Escudos'], armas: ['Marciales'] },
    dadoGolpe: 'd12',
    tiradasSalvacion: ['Fuerza', 'Constitución'],
    entrenamientoArmaduras: ['Ligeras', 'Medias', 'Escudos'],
    competenciasHabilidades: {
      elegir: 2,
      opciones: ['Atletismo', 'Intimidación', 'Naturaleza', 'Percepción', 'Supervivencia', 'Trato con animales'],
    },
    subclases: [
      {
        id: 'arbol_mundo',
        nombre: 'Senda del Árbol del Mundo',
        desc: 'Los bárbaros que siguen la senda del Árbol del Mundo conectan con el árbol cósmico Yggdrasil a través de su furia. Este árbol crece entre los Planos Exteriores, a los que vincula entre sí además de con el Plano Material. Estos bárbaros recurren a la magia del árbol para obtener vitalidad y como medio de transporte dimensional.',
        rasgosNivel: {
          3: [
            { nombre: 'Vitalidad del árbol', desc: 'Tu furia se nutre de la fuerza vital del Árbol del Mundo. Obtienes los siguientes beneficios:\nOleada de vitalidad. Cuando te enfurezcas, obtendrás una cantidad de puntos de golpe temporales igual a tu nivel de bárbaro.\nFuerza revitalizante. Al principio de cada uno de tus turnos mientras estés enfurecido, puedes elegir a otra criatura a 3 m o menos de ti para que obtenga puntos de golpe temporales. Para determinarlos, tira una cantidad de d6 igual a tu bonificación de daño por furia y suma los resultados. Si algunos de estos puntos de golpe temporales permanecen cuando dejes de estar enfurecido, se desvanecerán.' },
          ],
          6: [
            { nombre: 'Ramas del árbol', desc: 'Cuando una criatura que puedas ver comience su turno a 9 m o menos de ti mientras estás enfurecido, podrás llevar a cabo una reacción para invocar unas ramas espectrales del Árbol del Mundo a su alrededor. El objetivo deberá superar una tirada de salvación de Fuerza (CD 8 más tu modificador por Fuerza y tu bonificador por competencia) o se teletransportará a un espacio sin ocupar que puedas ver a 1,5 m de ti o al espacio sin ocupar más cercano que puedas ver. Después de que el objetivo se teletransporte, puedes reducir su velocidad a 0 hasta el final del turno actual.' },
          ],
          10: [
            { nombre: 'Raíces apaleadoras', desc: 'Durante tu turno, tu alcance es 3 m superior con cualquier arma cuerpo a cuerpo que tenga la propiedad de pesada o versátil, ya que los zarcillos del Árbol del Mundo se prolongan desde tu cuerpo. Cuando aciertes con un arma así en tu turno, podrás activar la propiedad de maestría de derribar o empujar, además de otra propiedad de maestría diferente que utilices con ese arma.' },
          ],
          14: [
            { nombre: 'Viajar por el árbol', desc: 'Cuando te enfureces y como acción adicional mientras estés enfurecido, puedes teletransportarte hasta 18 m a un espacio sin ocupar que puedas ver.\nAsimismo, una vez por furia, puedes aumentar el alcance del teletransporte a 45 m. Si lo haces, también puedes transportar hasta seis criaturas voluntarias que estén a 3 m o menos de ti. Cada criatura se teletransportará a un espacio sin ocupar de tu elección a 3 m o menos de tu espacio de destino.' },
          ],
        },
      },
      {
        id: 'berserker',
        nombre: 'Senda del Berserker',
        desc: 'Los bárbaros que recorren la senda del berserker ponen su furia principalmente al servicio de la violencia. Su senda se asienta en una rabia sin cortapisas y estos bárbaros se embriagan del caos del combate mientras dejan que su furia se apodere de ellos y los fortalezca.',
        rasgosNivel: {
          3: [
            { nombre: 'Frenesí', desc: 'Si utilizas Ataque temerario mientras estás enfurecido, causarás daño adicional al primer objetivo al que aciertes en tu turno con un ataque basado en la Fuerza. Para determinar el daño adicional, tira una cantidad de d6 igual a tu bonificación de daño por furia y suma los resultados. El daño será del mismo tipo que el del arma o ataque sin armas utilizado para el ataque.' },
          ],
          6: [
            { nombre: 'Furia irracional', desc: 'Tienes inmunidad a los estados de asustado y hechizado mientras estés enfurecido. Si estás asustado o hechizado cuando te dejes llevar por la furia, el estado terminará para ti.' },
          ],
          10: [
            { nombre: 'Represalia', desc: 'Cuando recibas daño de una criatura que esté a 1,5 m o menos de ti, puedes llevar a cabo una reacción para hacer un ataque cuerpo a cuerpo contra esa criatura usando un arma o un ataque sin armas.' },
          ],
          14: [
            { nombre: 'Presencia intimidante', desc: 'Como acción adicional, puedes sembrar el terror en los demás con tu mera presencia amenazadora y tu poder primigenio. Cuando lo hagas, todas las criaturas de tu elección situadas en una emanación de 9 m originada en ti deberán hacer una tirada de salvación de Sabiduría (CD 8 más tu modificador por Fuerza y tu bonificador por competencia). Si la fallan, tendrán el estado de asustadas durante 1 minuto. Al final de cada uno de sus turnos, las criaturas asustadas repiten la tirada de salvación y, si tienen éxito, se librarán del efecto.\nCuando uses este rasgo, no podrás volver a hacerlo hasta que finalices un descanso largo, a menos que gastes un uso de tu furia (no requiere acción) para restablecer su uso.' },
          ],
        },
      },
      {
        id: 'corazon_salvaje',
        nombre: 'Senda del Corazón Salvaje',
        desc: 'Los bárbaros que siguen la senda del corazón salvaje sienten afinidad por los animales. Aprenden métodos mágicos de comunicarse con ellos y su furia aumenta su conexión, ya que los imbuye de una fuerza sobrenatural.',
        rasgosNivel: {
          3: [
            { nombre: 'Furia de lo salvaje', desc: 'Tu furia se sirve del poder primigenio de los animales. Cuando te enfurezcas, obtendrás una de las siguientes opciones, a tu elección.\nÁguila. Cuando te enfurezcas, podrás llevar a cabo las acciones de destrabarse y correr como parte de esa acción adicional. Mientras estés enfurecido, puedes usar una acción adicional para llevar a cabo ambas acciones.\nLobo. Mientras estés enfurecido, tus aliados tendrán ventaja en las tiradas de ataque contra cualquiera de tus enemigos que se encuentre a 1,5 m o menos de ti.\nOso. Mientras estés enfurecido, tendrás resistencia a todos los tipos de daño salvo de fuerza, necrótico, psíquico y radiante.' },
            { nombre: 'Portavoz de los animales', desc: 'Puedes lanzar los conjuros hablar con los animales y sentidos de la bestia, pero solo como rituales. La Sabiduría es tu aptitud mágica para lanzarlos.' },
          ],
          6: [
            { nombre: 'Aspecto de lo salvaje', desc: 'Obtienes una de las siguientes opciones, a tu elección. Tras finalizar un descanso largo, puedes cambiar de opción.\nBúho. Tienes visión en la oscuridad hasta 18 m. Si ya posees visión en la oscuridad, su alcance aumenta en 18 m.\nPantera. Tienes una velocidad trepando igual a tu velocidad.\nSalmón. Tienes una velocidad nadando igual a tu velocidad.' },
          ],
          10: [
            { nombre: 'Hablante de la naturaleza', desc: 'Puedes lanzar el conjuro comunión con la naturaleza, pero solo como ritual. La Sabiduría es tu aptitud mágica para lanzarlo.' },
          ],
          14: [
            { nombre: 'Poder de lo salvaje', desc: 'Cuando te enfurezcas, obtendrás una de las siguientes opciones, a tu elección.\nCarnero. Mientras estés enfurecido, podrás hacer que una criatura Grande o más pequeña sufra el estado de derribada si la aciertas con un ataque cuerpo a cuerpo.\nHalcón. Mientras estés enfurecido, tendrás una velocidad volando igual a tu velocidad si no llevas ninguna armadura.\nLeón. Mientras estés enfurecido, cualquier enemigo que esté a 1,5 m o menos de ti tendrá desventaja en las tiradas de ataque contra otros objetivos que no seáis tú u otro bárbaro que tenga esta opción activa.' },
          ],
        },
      },
      {
        id: 'fanatico',
        nombre: 'Senda del Fanático',
        desc: 'Los bárbaros que siguen la senda del fanático reciben beneficios de un dios o panteón. Estos bárbaros experimentan su furia como un episodio eufórico de unión divina que les imbuye de poder. Habitualmente, se alían con sacerdotes y otros seguidores de su dios o panteón.',
        rasgosNivel: {
          3: [
            { nombre: 'Furia divina', desc: 'Puedes canalizar el poder divino hacia tus ataques. En cada uno de tus turnos mientras estés enfurecido, la primera criatura a la que aciertes con un arma o un ataque sin armas sufrirá una cantidad de daño adicional igual a 1d6 más la mitad de tu nivel de bárbaro (redondeando hacia abajo). El daño adicional es necrótico o radiante, que eliges cada vez que lo causas.' },
            { nombre: 'Guerrero de los dioses', desc: 'Una entidad divina ayuda a garantizar que continúes la batalla. Cuentas con una reserva de cuatro d12 que puedes gastar para curarte. Como acción adicional, puedes gastar dados de la reserva, tirarlos y recuperar una cantidad de puntos de golpe igual al resultado total de la tirada. Tu reserva recupera todos los dados gastados tras finalizar un descanso largo.\nEl número máximo de dados de la reserva aumenta en uno cuando alcanzas los niveles 6 (5 dados), 12 (6 dados) y 17 (7 dados) de bárbaro.' },
          ],
          6: [
            { nombre: 'Foco fanático', desc: 'Una vez por furia, si fallas una tirada de salvación, podrás repetirla con un bonificador igual a tu bonificación de daño por furia y deberás utilizar el nuevo resultado.' },
          ],
          10: [
            { nombre: 'Presencia ferviente', desc: 'Como acción adicional, profieres un grito de guerra imbuido de energía divina. Hasta diez criaturas de tu elección que estén a 18 m o menos de ti obtendrán ventaja en las tiradas de ataque y tiradas de salvación hasta el principio de tu siguiente turno.\nCuando uses este rasgo, no podrás volver a hacerlo hasta que finalices un descanso largo, a menos que gastes un uso de tu furia (no requiere acción) para restablecer su uso.' },
          ],
          14: [
            { nombre: 'Furia de los dioses', desc: 'Cuando te enfureces, puedes adoptar la forma de un guerrero divino. Esta forma dura 1 minuto o hasta que tus puntos de golpe se reduzcan a 0. Cuando uses este rasgo, no podrás volver a hacerlo hasta que finalices un descanso largo.\nMientras tengas esta forma, obtendrás los siguientes beneficios:\nResistencia. Tienes resistencia al daño necrótico, psíquico y radiante.\nRevitalización. Cuando los puntos de golpe de una criatura que esté a 9 m o menos de ti fueran a reducirse a 0, puedes llevar a cabo una reacción para gastar un uso de tu furia y hacer que los puntos de golpe del objetivo cambien a una cantidad igual a tu nivel de bárbaro.\nVuelo. Tienes una velocidad volando igual a tu velocidad y puedes levitar.' },
          ],
        },
      },
    ],
    rol: 'Combatiente cuerpo a cuerpo',
    magia: false,
    rasgosNivel1: NIVEL_DATOS.barbaro.rasgosNivel[1],
    ...NIVEL_DATOS.barbaro,
  },
  {
    id: 'bardo',
    nombre: 'Bardo',
    descripcion: 'Lanza conjuros que inspiren y curen a tus aliados o engatusen a tus enemigos.',
    preferencia: 'Actuación',
    complejidad: 'Alta',
    caracteristicaPrincipal: ['Carisma'],
    requisitoMulticlase: { caracteristicas: ['Carisma'], modo: 'and' },
    competenciasMulticlase: { armaduras: ['Ligeras'], habilidadesElegir: 1, herramientas: ['Instrumento musical (a elegir)'] },
    dadoGolpe: 'd8',
    tiradasSalvacion: ['Destreza', 'Carisma'],
    entrenamientoArmaduras: ['Ligeras'],
    competenciasHabilidades: {
      elegir: 3,
      opciones: ['Cualquiera'],
    },
    subclases: [
      {
        id: 'danza',
        nombre: 'Colegio de la Danza',
        desc: 'Los bardos del colegio de la danza saben que las palabras de creación no pueden encerrarse en un discurso o una canción: las palabras se pronuncian a través del desplazamiento de los cuerpos celestes y fluyen por los movimientos de las criaturas menores. Estos bardos practican una forma de permanecer en armonía con la vorágine del cosmos que enfatiza la agilidad, la velocidad y la elegancia.',
        rasgosNivel: {
          3: [
            { nombre: 'Juego de pies deslumbrante', desc: 'Mientras no lleves armadura ni portes un escudo, obtienes los siguientes beneficios.\nVirtuoso de la danza. Tienes ventaja en cualquier prueba de Carisma (Interpretación) que hagas que implique bailar.\nDefensa sin armadura. Tu clase de armadura base es igual a 10 más tus modificadores por Destreza y Carisma.\nAtaques ágiles. Cuando gastes un uso de tu Inspiración bárdica como parte de una acción, una acción adicional o una reacción, puedes realizar un ataque sin armas como parte de esa acción, acción adicional o reacción.\nDaño bárdico. Puedes usar tu Destreza en lugar de tu Fuerza para las tiradas de ataque de tus ataques sin armas. Cuando causas daño con un ataque sin armas, puedes infligir una cantidad de daño contundente igual al resultado de una tirada con tu dado de Inspiración bárdica más tu modificador por Destreza, en lugar del daño normal del ataque. No gastas el dado con esta tirada.' },
          ],
          6: [
            { nombre: 'Juego de pies conjunto', desc: 'Cuando tires iniciativa, puedes gastar un uso de tu Inspiración bárdica si no tienes el estado de incapacitado. Cuando lo hagas, tira tu dado de Inspiración bárdica; tú y todos los aliados que estén a 9 m o menos de ti que puedan verte u oírte ganaréis un bonificador a la iniciativa igual al resultado.' },
            { nombre: 'Movimiento inspirador', desc: 'Cuando un enemigo que puedas ver termine su turno a 1,5 m o menos de ti, puedes llevar a cabo una reacción y gastar un uso de tu Inspiración bárdica para moverte hasta la mitad de tu velocidad. Después, un aliado que elijas que esté a 9 m o menos de ti también podrá moverse hasta la mitad de su velocidad usando su reacción. Los movimientos realizados con este rasgo no provocan ataques de oportunidad.' },
          ],
          14: [
            { nombre: 'Evasión dirigida', desc: 'Cuando sufras un efecto que te permita hacer una tirada de salvación de Destreza para sufrir solo la mitad de daño, no recibes daño alguno si la superas y solo sufres la mitad si la fallas. Si cualquier criatura que esté a 1,5 m de ti hace la misma tirada de salvación de Destreza, puedes compartir este beneficio con ella para la tirada.\nNo puedes usar este rasgo si tienes el estado de incapacitado.' },
          ],
        },
      },
      {
        id: 'conocimiento',
        nombre: 'Colegio del Conocimiento',
        desc: 'Los bardos del colegio del conocimiento recaban conjuros y secretos de diversas fuentes, como tratados intelectuales, ritos místicos y cuentos de campesinos. Los miembros del colegio se reúnen en bibliotecas y universidades para intercambiar sus conocimientos. También se encuentran en festivales o reuniones de Estado, donde pueden sacar a la luz casos de corrupción, desvelar mentiras o reírse de los vanidosos representantes de la autoridad.',
        rasgosNivel: {
          3: [
            { nombre: 'Competencias adicionales', desc: 'Ganas competencia en tres habilidades de tu elección.' },
            { nombre: 'Palabras cortantes', desc: 'Aprendes a usar tu astucia para distraer, confundir y minar la confianza y las aptitudes de los demás de manera sobrenatural. Cuando una criatura que puedas ver a 18 m o menos de ti haga una tirada de daño o tenga éxito en una prueba de característica o una tirada de ataque, puedes llevar a cabo una reacción para gastar un uso de tu Inspiración bárdica; tira tu dado de Inspiración bárdica y resta el número obtenido al resultado de la tirada de la criatura, lo que reducirá el daño o quizá convierta el éxito en un fallo.' },
          ],
          6: [
            { nombre: 'Descubrimientos mágicos', desc: 'Aprendes dos conjuros de tu elección. Estos conjuros pueden proceder de las listas de conjuros de clérigo, druida o mago, o de cualquier combinación de estas (consulta la lista de conjuros en la sección de la clase). Los conjuros que elijas deben ser trucos o conjuros para los que tengas espacios de conjuro, como se muestra en la tabla «Rasgos de bardo».\nSiempre tienes preparados los conjuros elegidos y, cada vez que subas un nivel de bardo, podrás reemplazar uno de los conjuros por otro conjuro que cumpla estos requisitos.' },
          ],
          14: [
            { nombre: 'Habilidad sin parangón', desc: 'Cuando hagas una prueba de característica o una tirada de ataque y falles, podrás gastar un uso de Inspiración bárdica; tira el dado de Inspiración bárdica y suma el resultado al d20, lo que podría convertir un fallo en un éxito. Si fallas la tirada, la Inspiración bárdica no se gasta.' },
          ],
        },
      },
      {
        id: 'glamour',
        nombre: 'Colegio del Glamour',
        desc: 'El colegio del glamour se originó con la magia cautivadora de los Parajes Feéricos. Los bardos que estudian esta magia tejen hilos de belleza y terror en sus canciones e historias y los más poderosos de ellos pueden envolverse en una majestuosidad sobrenatural. Sus actuaciones suscitan el anhelo nostálgico de una inocencia olvidada, evocan los recuerdos inconscientes de temores arraigados y apelan a las emociones incluso de los oyentes más insensibles.',
        rasgosNivel: {
          3: [
            { nombre: 'Magia cautivadora', desc: 'Siempre tienes los conjuros hechizar persona e imagen múltiple preparados.\nAsimismo, inmediatamente después de que lances un conjuro de encantamiento o ilusionismo mediante un espacio de conjuro, podrás hacer que una criatura que puedas ver a 18 m o menos de ti realice una tirada de salvación de Sabiduría contra tu CD de salvación de conjuros. Si la falla, el objetivo tendrá el estado de asustado o hechizado (a tu elección) durante 1 minuto. El objetivo repetirá la tirada de salvación al final de cada uno de sus turnos y, si tiene éxito, se librará del efecto.\nCuando uses este beneficio, no podrás volver a hacerlo hasta que finalices un descanso largo. También puedes restablecer su uso gastando un uso de tu Inspiración bárdica (no requiere acción).' },
            { nombre: 'Manto de inspiración', desc: 'Puedes urdir la magia feérica en una canción o danza que insufle energía a los demás. Como acción adicional, puedes gastar un uso de tu Inspiración bárdica y tirar un dado de Inspiración bárdica. Cuando lo hagas, elige una cantidad de otras criaturas a 18 m o menos de ti, hasta un máximo igual a tu modificador por Carisma (mínimo una criatura). Cada una de esas criaturas obtendrá una cantidad de puntos de golpe temporales igual al doble del resultado del dado de Inspiración bárdica y luego podrá usar su reacción para moverse hasta su velocidad sin provocar ataques de oportunidad.' },
          ],
          6: [
            { nombre: 'Manto de majestad', desc: 'Siempre tienes el conjuro orden imperiosa preparado.\nComo acción adicional, puedes lanzar orden imperiosa sin gastar un espacio de conjuro y adoptar una apariencia sobrenatural durante 1 minuto o hasta que pierdas la concentración. Durante este tiempo, puedes lanzar orden imperiosa como acción adicional sin gastar un espacio de conjuro.\nCualquier criatura a la que hayas hechizado fallará automáticamente su tirada de salvación contra la orden imperiosa que lances con este rasgo.\nCuando uses este rasgo, no podrás volver a hacerlo hasta que finalices un descanso largo. También puedes restablecer su uso gastando un espacio de conjuro de nivel 3 o superior (no requiere acción).' },
          ],
          14: [
            { nombre: 'Majestad inquebrantable', desc: 'Como acción adicional, puedes adoptar un aspecto majestuoso mágico durante 1 minuto o hasta que tengas el estado de incapacitado. Durante ese tiempo, cuando una criatura te acierte con una tirada de ataque por primera vez en un turno, el atacante deberá superar una tirada de salvación de Carisma contra tu CD de salvación de conjuros o el ataque fallará, puesto que la criatura se amedrentará por tu majestuosidad.\nCuando adoptes este aspecto majestuoso, no podrás volver a hacerlo hasta que finalices un descanso corto o largo.' },
          ],
        },
      },
      {
        id: 'valor',
        nombre: 'Colegio del Valor',
        desc: 'Los bardos del colegio del valor son narradores osados cuyos relatos conservan el recuerdo de los grandes héroes del pasado. Estos bardos cantan las hazañas de sus ídolos en salones abovedados o ante un público reunido en torno a refulgentes hogueras. Viajan para presenciar los grandes acontecimientos de primera mano y asegurarse de que su recuerdo no cae en el olvido. Con sus canciones, inspiran a las nuevas generaciones a lograr hitos similares a los de los héroes de antaño.',
        rasgosNivel: {
          3: [
            { nombre: 'Entrenamiento marcial', desc: 'Ganas competencia con armas marciales y entrenamiento con armaduras medias y escudos.\nAdemás, puedes utilizar un arma sencilla o marcial como canalizador mágico para lanzar tus conjuros de bardo.' },
            { nombre: 'Inspiración en combate', desc: 'Puedes emplear tu ingenio para cambiar las tornas de la batalla. Una criatura que tenga uno de tus dados de Inspiración bárdica podrá usarlo para lograr uno de los siguientes efectos.\nDefensa. Cuando una tirada de ataque acierte a la criatura, esta podrá usar su reacción para tirar el dado de Inspiración bárdica y sumar el resultado a su CA contra ese ataque, lo que podría hacer que falle.\nOfensiva. Inmediatamente después de que la criatura acierte a un objetivo con una tirada de ataque, podrá tirar el dado de Inspiración bárdica y sumar el resultado al daño del ataque contra el objetivo.' },
          ],
          6: [
            { nombre: 'Ataque adicional', desc: 'Cuando lleves a cabo la acción de atacar en tu turno, podrás hacer dos ataques en lugar de uno.\nAdemás, podrás lanzar uno de tus trucos que tenga un tiempo de lanzamiento de una acción en vez de realizar uno de esos ataques.' },
          ],
          14: [
            { nombre: 'Magia de batalla', desc: 'Tras lanzar un conjuro que tenga un tiempo de lanzamiento de una acción, podrás hacer un ataque con un arma como acción adicional.' },
          ],
        },
      },
    ],
    rol: 'Lanzador de conjuros de apoyo',
    magia: true,
    rasgosNivel1: NIVEL_DATOS.bardo.rasgosNivel[1],
    ...NIVEL_DATOS.bardo,
  },
  {
    id: 'brujo',
    nombre: 'Brujo',
    descripcion: 'Lanza conjuros procedentes del ocultismo mediante un pacto con un ser poderoso.',
    preferencia: 'Ocultismo',
    complejidad: 'Alta',
    caracteristicaPrincipal: ['Carisma'],
    requisitoMulticlase: { caracteristicas: ['Carisma'], modo: 'and' },
    competenciasMulticlase: { armaduras: ['Ligeras'] },
    dadoGolpe: 'd8',
    tiradasSalvacion: ['Sabiduría', 'Carisma'],
    entrenamientoArmaduras: ['Ligeras'],
    competenciasHabilidades: {
      elegir: 2,
      opciones: ['Conocimiento arcano', 'Engaño', 'Historia', 'Intimidación', 'Investigación', 'Naturaleza', 'Religión'],
    },
    subclases: [
      {
        id: 'celestial',
        nombre: 'Patrón Celestial',
        desc: 'Tu pacto recurre a los Planos Superiores, los reinos de la dicha eterna. Podrías llegar a un acuerdo con un empíreo, un couatl, una esfinge, un unicornio u otro ser de los cielos, o quizá prefieras recurrir a varios seres de este tipo para lograr objetivos comunes con los suyos. Tu pacto te permite experimentar una pizca de la luz sagrada que ilumina el multiverso.',
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del celestial', desc: 'La magia de tu patrón garantiza que siempre tengas ciertos conjuros preparados. Cuando alcances un nivel de brujo especificado en la tabla «Conjuros del celestial», a partir de entonces siempre tendrás preparados los conjuros que se indican.\nNivel de brujo 3: auxilio, curar heridas, llama sagrada, luz, restablecimiento menor, saeta guía.\nNivel de brujo 5: luz del día, revivir.\nNivel de brujo 7: guardián de la fe, muro de fuego.\nNivel de brujo 9: invocar celestial, restablecimiento mayor.' },
            { nombre: 'Luz sanadora', desc: 'Obtienes la facultad de canalizar energía celestial para curar heridas. Tienes una reserva de d6 para alimentar esta sanación. La cantidad de dados de tu reserva es de 1 más tu nivel de brujo.\nComo acción adicional, puedes gastar dados de tu reserva para curarte a ti mismo o a una criatura que puedas ver a 18 m o menos de ti. La cantidad máxima de dados que puedes usar a la vez es igual a tu modificador por Carisma (un dado como mínimo). Tira los dados que gastes y restablece una cantidad de puntos de golpe igual al resultado total de la tirada. Tu reserva recupera todos los dados gastados tras finalizar un descanso largo.' },
          ],
          6: [
            { nombre: 'Alma radiante', desc: 'Tu vínculo con tu patrón te permite servir de canalizador de energía radiante. Tienes resistencia al daño radiante. Una vez por turno, si causas daño radiante o de fuego con un conjuro, puedes sumar tu modificador por Carisma al daño del conjuro contra uno de sus objetivos.' },
          ],
          10: [
            { nombre: 'Resiliencia celestial', desc: 'Obtienes puntos de golpe temporales siempre que uses el rasgo Astucia mágica o finalices un descanso corto o largo. La cantidad obtenida es igual a tu nivel de brujo más tu modificador por Carisma. Además, eliges hasta cinco criaturas que puedas ver cuando obtengas los puntos. Cada una de ellas obtiene una cantidad de puntos de golpe temporales igual a la mitad de tu nivel de brujo más tu modificador por Carisma.' },
          ],
          14: [
            { nombre: 'Venganza ardiente', desc: 'Cuando tú o un aliado a 18 m o menos de ti vayáis a hacer una tirada de salvación contra muerte, puedes emitir energía radiante para salvar a esa criatura. La criatura recupera una cantidad de puntos de golpe igual a la mitad de sus puntos de golpe máximos y puede poner fin a su estado de derribada. Todas las criaturas de tu elección que se encuentren a 9 m o menos de la criatura sufren una cantidad de daño radiante igual a 2d8 más tu modificador por Carisma y tienen el estado de cegadas hasta el final del turno actual.\nCuando uses este rasgo, no podrás volver a hacerlo hasta que finalices un descanso largo.' },
          ],
        },
      },
      {
        id: 'feerico',
        nombre: 'Patrón Feérico',
        desc: 'Tu pacto recurre a la energía de los Parajes Feéricos. Si eliges esta subclase, puedes hacer un trato con un señor feérico, como el Príncipe de la Escarcha; la Reina del Aire y la Oscuridad, gobernante de la Corte Crepuscular; Titania de la Corte del Verano, o sagas muy ancianas. Si no, puedes recurrir a una variedad de feéricos y tejer una red de favores y deudas. Sea quien sea, tu patrón suele resultar caprichoso e inescrutable.',
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del señor feérico', desc: 'La magia de tu patrón garantiza que siempre tengas ciertos conjuros preparados. Cuando alcances un nivel de brujo especificado en la tabla «Conjuros del señor feérico», a partir de entonces siempre tendrás preparados los conjuros que se indican.\nNivel de brujo 3: calmar emociones, dormir, fuego feérico, fuerza fantasmal, paso brumoso.\nNivel de brujo 5: crecimiento vegetal, desplazamiento.\nNivel de brujo 7: dominar bestia, invisibilidad mejorada.\nNivel de brujo 9: apariencia, dominar persona.' },
            { nombre: 'Pasos feéricos', desc: 'Tu patrón te otorga la capacidad de desplazarte entre los límites de los planos. Puedes lanzar paso brumoso sin gastar un espacio de conjuro una cantidad de veces igual a tu modificador por Carisma (mínimo una vez) y recuperas todos los usos tras finalizar un descanso largo.\nAdemás, siempre que lances el conjuro, puedes elegir uno de los siguientes efectos adicionales.\nPaso burlón. Las criaturas a 1,5 m o menos del espacio que hayas abandonado deberán superar una tirada de salvación de Sabiduría contra tu CD de salvación de conjuros o tendrán desventaja en las tiradas de ataque contra criaturas que no seas tú hasta el principio de tu siguiente turno.\nPaso refrescante. Inmediatamente después de teletransportarte, tú o una criatura que puedas ver a 3 m o menos de ti obtenéis 1d10 puntos de golpe temporales.' },
          ],
          6: [
            { nombre: 'Escape brumoso', desc: 'Puedes lanzar paso brumoso como reacción en respuesta a recibir daño.\nAdemás, ahora cuentas con los siguientes efectos entre tus opciones de Pasos feéricos.\nPaso aterrador. Las criaturas a 1,5 m o menos del espacio que hayas abandonado o del espacio en el que aparezcas (a tu elección) deberán superar una tirada de salvación de Sabiduría contra tu CD de salvación de conjuros o sufrirán 2d10 de daño psíquico.\nPaso desvanecedor. Tienes el estado de invisible hasta el principio de tu siguiente turno o hasta justo después de que hagas una tirada de ataque, causes daño o lances un conjuro.' },
          ],
          10: [
            { nombre: 'Defensas seductoras', desc: 'Tu patrón te enseña a proteger tu mente y cuerpo. Eres inmune al estado de hechizado.\nAdemás, inmediatamente después de que una criatura que puedas ver te acierte con una tirada de ataque, puedes usar una reacción para reducir a la mitad el daño que recibes (redondeando hacia abajo) y obligar al atacante a hacer una tirada de salvación de Sabiduría contra tu CD de salvación de conjuros. Si la falla, sufrirá una cantidad de daño psíquico igual al daño que tú recibas. Cuando uses esta reacción, no podrás volver a hacerlo hasta que finalices un descanso largo, a menos que gastes un espacio de conjuro de Magia del pacto (no requiere acción) para restablecer su uso.' },
          ],
          14: [
            { nombre: 'Magia embrujadora', desc: 'Tu patrón te otorga la capacidad de entrelazar tu magia con la teletransportación. Inmediatamente después de lanzar un conjuro de encantamiento o ilusionismo usando una acción y un espacio de conjuro, puedes lanzar paso brumoso como parte de la misma acción y sin gastar otro espacio de conjuro.' },
          ],
        },
      },
      {
        id: 'infernal',
        nombre: 'Patrón Infernal',
        desc: 'Tu pacto recurre a los Planos Inferiores, los reinos de la perdición. Puedes negociar con un señor demoníaco, como Demogorgon u Orcus, con un archidiablo como Asmodeo, o con un diablo de la sima, balor, yugoloth o una saga de la noche especialmente notable. Estos patrones desean la corrupción y la destrucción de todas las cosas (incluyéndote a ti en última instancia) y tu camino se verá definido por la medida en que luchas contra esos deseos.',
        rasgosNivel: {
          3: [
            { nombre: 'Bendición del oscuro', desc: 'Cuando reduzcas a 0 los puntos de golpe de un enemigo, obtienes una cantidad de puntos de golpe temporales igual a tu modificador por Carisma más tu nivel de brujo (mínimo de 1 punto de golpe temporal). También obtienes este beneficio si otra criatura reduce a 0 los puntos de golpe de un enemigo a 3 m o menos de ti.' },
            { nombre: 'Conjuros del infernal', desc: 'La magia de tu patrón garantiza que siempre tengas ciertos conjuros preparados. Cuando alcances un nivel de brujo especificado en la tabla «Conjuros del infernal», a partir de entonces siempre tendrás preparados los conjuros que se indican.\nNivel de brujo 3: manos ardientes, orden imperiosa, rayo abrasador, sugestión.\nNivel de brujo 5: bola de fuego, nube apestosa.\nNivel de brujo 7: escudo de fuego, muro de fuego.\nNivel de brujo 9: geas, plaga de insectos.' },
          ],
          6: [
            { nombre: 'La suerte del oscuro', desc: 'Puedes invocar a tu patrón infernal para alterar el destino a tu favor. Cuando hagas una prueba de característica o una tirada de salvación, puedes utilizar este rasgo para sumar 1d10 a tu tirada. Puedes hacerlo después de ver el resultado de la tirada, pero antes de que ocurran sus efectos.\nPuedes usar este rasgo una cantidad de veces igual a tu modificador por Carisma (mínimo una vez), pero no más de una vez por tirada. Recuperas todos los usos tras finalizar un descanso largo.' },
          ],
          10: [
            { nombre: 'Resistencia infernal', desc: 'Tras finalizar un descanso corto o largo, elige un tipo de daño que no sea el de fuerza. Tienes resistencia a ese tipo de daño hasta que elijas uno distinto con este rasgo.' },
          ],
          14: [
            { nombre: 'Arrastrar por el infierno', desc: 'Una vez por turno, cuando aciertas a una criatura con una tirada de ataque, puedes intentar teletransportar instantáneamente al objetivo a los Planos Inferiores. El objetivo deberá superar una tirada de salvación de Carisma contra tu CD de salvación de conjuros o desaparecerá y se precipitará a través de un paisaje de pesadilla. Si el objetivo no es un infernal, sufrirá 8d10 de daño psíquico y tendrá el estado de incapacitado hasta el final de tu siguiente turno, momento en el que volverá al espacio que ocupaba anteriormente o al espacio sin ocupar más cercano.\nCuando uses este rasgo, no podrás volver a hacerlo hasta que finalices un descanso largo, a menos que gastes un espacio de conjuro de Magia del pacto (no requiere acción) para restablecer su uso.' },
          ],
        },
      },
      {
        id: 'primigenio',
        nombre: 'Patrón Primigenio',
        desc: 'Cuando eliges esta subclase, quizá te ates a un ser indescriptible del Reino Lejano o a un dios antiguo: entidades como Tharizdun, el Dios Encadenado; Zargon, el Ente que Regresa; Hadar, el Hambre Tenebrosa o el Gran Cthulhu, o quizá invoques a varias entidades sin subyugarte a una sola. Sus motivos son incomprensibles y seguramente el Primigenio no sea siquiera consciente de tu existencia, pero los secretos que has descubierto te permiten extraer poder mágico de él.',
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del primigenio', desc: 'La magia de tu patrón garantiza que siempre tengas ciertos conjuros preparados. Cuando alcances un nivel de brujo especificado en la tabla «Conjuros del primigenio», a partir de entonces siempre tendrás preparados los conjuros que se indican.\nNivel de brujo 3: detectar pensamientos, fuerza fantasmal, risa horrible de Tasha, susurros discordantes.\nNivel de brujo 5: clarividencia, hambre de Hadar.\nNivel de brujo 7: confusión, invocar aberración.\nNivel de brujo 9: alterar los recuerdos, telequinesis.' },
            { nombre: 'Conjuros psíquicos', desc: 'Cuando lances un conjuro de brujo que cause daño, puedes cambiar su tipo de daño a psíquico. Además, cuando lances un conjuro de brujo de encantamiento o ilusionismo, puedes hacerlo sin componentes verbales ni somáticos.' },
            { nombre: 'Mente iluminada', desc: 'Puedes establecer una conexión telepática con la mente de otra criatura. Como acción adicional, elige una criatura que puedas ver a 9 m o menos de ti. La criatura elegida y tú podréis comunicaros telepáticamente mientras estéis a una distancia máxima igual a 1,5 km x tu modificador por Carisma (mínimo de 1,5 km). Para entenderos, debéis emplear mentalmente un idioma que ambos conozcáis. La conexión telepática dura un número de minutos igual a tu nivel de brujo. Termina antes de tiempo si usas este rasgo para conectarte con otra criatura.' },
          ],
          6: [
            { nombre: 'Combatiente clarividente', desc: 'Cuando formas un enlace telepático con una criatura usando Mente iluminada, puedes obligar a esa criatura a hacer una tirada de salvación de Sabiduría contra tu CD de salvación de conjuros. Si la falla, la criatura tendrá desventaja en las tiradas de ataque contra ti y tú tendrás ventaja en las tiradas de ataque contra ella hasta que acabe el enlace.\nCuando uses este rasgo, no podrás volver a hacerlo hasta que finalices un descanso corto o largo, a menos que gastes un espacio de conjuro de Magia del pacto (no requiere acción) para restablecer su uso.' },
          ],
          10: [
            { nombre: 'Escudo mental', desc: 'Tus pensamientos no se pueden leer mediante telepatía o cualquier otro medio sin que tú lo permitas. Además, tienes resistencia al daño psíquico y, siempre que una criatura te cause daño psíquico, ella recibirá la misma cantidad de daño que tú.' },
            { nombre: 'Maleficio sobrenatural', desc: 'Tu patrón extraterrenal te concede una poderosa maldición. Siempre tienes el conjuro maleficio preparado. Cuando lanzas maleficio y eliges una característica, el objetivo también tendrá desventaja en las tiradas de salvación de la característica elegida hasta que termine el conjuro.' },
          ],
          14: [
            { nombre: 'Crear siervo', desc: 'Cuando lanzas invocar aberración, puedes modificarlo para que no requiera concentración. La duración pasa a ser 1 minuto y la aberración obtiene puntos de golpe temporales iguales a tu nivel de brujo más tu modificador por Carisma. Además, la primera vez en cada turno que la aberración acierte a una criatura bajo tu maleficio, le infligirá daño psíquico extra igual al daño adicional del conjuro.' },
          ],
        },
      },
    ],
    rol: 'Lanzador de conjuros ocultista',
    magia: true,
    rasgosNivel1: NIVEL_DATOS.brujo.rasgosNivel[1],
    ...NIVEL_DATOS.brujo,
  },
  {
    id: 'clerigo',
    nombre: 'Clérigo',
    descripcion: 'Invoca la magia divina para sanar, levantar la moral y castigar.',
    preferencia: 'Dioses',
    complejidad: 'Media',
    caracteristicaPrincipal: ['Sabiduría'],
    requisitoMulticlase: { caracteristicas: ['Sabiduría'], modo: 'and' },
    competenciasMulticlase: { armaduras: ['Ligeras', 'Medias', 'Escudos'] },
    dadoGolpe: 'd8',
    tiradasSalvacion: ['Sabiduría', 'Carisma'],
    entrenamientoArmaduras: ['Ligeras', 'Medias', 'Escudos'],
    competenciasHabilidades: {
      elegir: 2,
      opciones: ['Historia', 'Medicina', 'Perspicacia', 'Persuasión', 'Religión'],
    },
    subclases: [
      {
        id: 'guerra',
        nombre: 'Dominio de la Guerra',
        desc: 'La guerra se manifiesta de muchas formas. Puede convertir a las personas corrientes en héroes o puede ser desesperada y terrorífica, con actos de crueldad y cobardía capaces de eclipsar los ejemplos de excelencia y coraje. Los clérigos que utilizan la magia del dominio de la guerra destacan en el combate e inspiran a los demás a pelear en buena lid o brindar actos de violencia como si fueran oraciones.',
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del dominio de la guerra', desc: 'Tu conexión con este dominio divino garantiza que siempre tengas ciertos conjuros preparados. Cuando alcances un nivel de clérigo especificado en la tabla «Conjuros del dominio de la guerra», a partir de entonces siempre tendrás preparados los conjuros que se indican.\nNivel de clérigo 3: arma espiritual, arma mágica, escudo de fe, saeta guía.\nNivel de clérigo 5: espíritus guardianes, manto del cruzado.\nNivel de clérigo 7: escudo de fuego, libertad de movimiento.\nNivel de clérigo 9: golpe de viento acerado, inmovilizar monstruo.' },
            { nombre: 'Golpe guiado', desc: 'Cuando tú o una criatura a 9 m o menos de ti falléis una tirada de ataque, podrás gastar un uso de Canalizar divinidad y conceder un bonificador de +10 a la tirada, lo que podría hacer que acierte. Cuando utilices este rasgo para mejorar la tirada de ataque de otra criatura, deberás llevar a cabo una reacción para ello.' },
            { nombre: 'Sacerdote guerrero', desc: 'Como acción adicional, puedes realizar un ataque con un arma o un ataque sin armas. Puedes utilizar esta acción adicional una cantidad de veces igual a tu modificador por Sabiduría (mínimo una vez). Recuperas todos los usos tras finalizar un descanso corto o largo.' },
          ],
          6: [
            { nombre: 'Bendición del dios de la guerra', desc: 'Puedes gastar un uso de Canalizar divinidad para lanzar arma espiritual o escudo de fe en vez de gastar un espacio de conjuro. Cuando lances cualquiera de esos conjuros de esta forma, no requerirá concentración. En su lugar, el conjuro durará 1 minuto, pero terminará antes de tiempo si lanzas el conjuro de nuevo, si tienes el estado incapacitado o si mueres.' },
          ],
          17: [
            { nombre: 'Avatar de la batalla', desc: 'Ganas resistencia al daño contundente, cortante y perforante.' },
          ],
        },
      },
      {
        id: 'luz',
        nombre: 'Dominio de la Luz',
        desc: 'El dominio de la luz se sirve del poder divino para producir fuegos abrasadores y revelaciones. Los clérigos que emplean este poder son almas iluminadas e imbuidas del brillo y el poder de la visión perceptiva de sus deidades, y asumen la misión de ahuyentar la mentira y traer la luz a la oscuridad.',
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del dominio de la luz', desc: 'Tu conexión con este dominio divino garantiza que siempre tengas ciertos conjuros preparados. Cuando alcances un nivel de clérigo especificado en la tabla «Conjuros del dominio de la luz», a partir de entonces siempre tendrás preparados los conjuros que se indican.\nNivel de clérigo 3: fuego feérico, manos ardientes, rayo abrasador, ver invisibilidad.\nNivel de clérigo 5: bola de fuego, luz del día.\nNivel de clérigo 7: muro de fuego, ojo arcano.\nNivel de clérigo 9: escudriñar, golpe flamígero.' },
            { nombre: 'Fulgor protector', desc: 'Cuando una criatura que puedas ver a 9 m o menos de ti haga una tirada de ataque, puedes llevar a cabo una reacción para imponer desventaja a su tirada de ataque haciendo que una luz resplandezca ante ella antes de que acierte o falle.\nPuedes utilizar este rasgo una cantidad de veces igual a tu modificador por Sabiduría (mínimo una vez). Recuperas todos los usos tras finalizar un descanso largo.' },
            { nombre: 'Resplandor del amanecer', desc: 'Como acción de magia, muestras tu símbolo sagrado y gastas un uso de Canalizar divinidad para emitir un destello luminoso en una emanación de 9 m originada en ti. Cualquier oscuridad mágica, como la que crea el conjuro oscuridad, se disipa en esa zona. Asimismo, todas las criaturas de tu elección situadas en esa zona deberán hacer una tirada de salvación de Constitución; sufrirán una cantidad de daño radiante igual a 2d10 más tu nivel de clérigo si la fallan o la mitad del daño si la superan.' },
          ],
          6: [
            { nombre: 'Fulgor protector mejorado', desc: 'Recuperas todos los usos de tu Fulgor protector tras finalizar un descanso corto o largo.\nAdemás, cuando uses tu Fulgor protector, puedes conceder al objetivo del ataque al que reaccionas una cantidad de puntos de golpe temporales igual a 2d6 más tu modificador por Sabiduría.' },
          ],
          17: [
            { nombre: 'Halo de luz', desc: 'Como acción de magia, puedes emitir un aura de luz solar que dura 1 minuto o hasta que la disipes (no requiere acción). Emitirás luz brillante en un radio de 18 m y luz tenue 9 m más allá. Los enemigos situados en la zona de luz brillante tendrán desventaja en las tiradas de salvación contra tu rasgo Resplandor del amanecer o contra cualquier conjuro que cause daño de fuego o radiante.\nPuedes usar este rasgo una cantidad de veces igual a tu modificador por Sabiduría (mínimo una vez) y recuperas todos los usos tras finalizar un descanso largo.' },
          ],
        },
      },
      {
        id: 'vida',
        nombre: 'Dominio de la Vida',
        desc: 'El dominio de la vida se centra en la energía positiva que ayuda a sustentar la vida en el multiverso. Los clérigos que acceden a este dominio son maestros de la curación y emplean la fuerza vital para sanar el sufrimiento.',
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del dominio de la vida', desc: 'Tu conexión con este dominio divino garantiza que siempre tengas ciertos conjuros preparados. Cuando alcances un nivel de clérigo especificado en la tabla «Conjuros del dominio de la vida», a partir de entonces siempre tendrás preparados los conjuros que se indican.\nNivel de clérigo 3: auxilio, bendición, curar heridas, restablecimiento menor.\nNivel de clérigo 5: palabra de curación en masa, revivir.\nNivel de clérigo 7: aura de vida, guarda contra la muerte.\nNivel de clérigo 9: curar heridas en masa, restablecimiento mayor.' },
            { nombre: 'Discípulo de la vida', desc: 'Cuando uses un espacio de conjuro para lanzar un conjuro que haga recuperar puntos de golpe a una criatura, esa criatura recuperará puntos de golpe adicionales en el turno en que lances el conjuro. La cantidad de puntos de golpe adicionales es igual a 2 más el nivel del espacio de conjuro.' },
            { nombre: 'Preservar vida', desc: 'Como acción de magia, muestras tu símbolo sagrado y gastas un uso de Canalizar divinidad para generar una energía curativa capaz de restaurar una cantidad de puntos de golpe igual a cinco veces tu nivel de clérigo. Elige criaturas maltrechas a 9 m o menos de ti (lo que puede incluirte a ti) y divide estos puntos de golpe entre ellas. Este rasgo no puede hacer que una criatura pase a tener más de la mitad de sus puntos de golpe máximos.' },
          ],
          6: [
            { nombre: 'Sanador bendito', desc: 'Los conjuros de curación que lances sobre otros también te sanan a ti. Inmediatamente después de usar un espacio de conjuro para lanzar un conjuro que haga recuperar puntos de golpe a una o varias criaturas que no seas tú, recuperarás una cantidad de puntos de golpe igual a 2 más el nivel del espacio de conjuro.' },
          ],
          17: [
            { nombre: 'Sanación suprema', desc: 'En vez de tirar uno o más dados para hacer que una criatura recupere puntos de golpe con un conjuro o con Canalizar divinidad, no tirarás estos dados para la curación, sino que utilizarás el número más alto de cada dado. Por ejemplo, en lugar de hacer que una criatura recupere 2d6 puntos de golpe, harás que recupere 12.' },
          ],
        },
      },
      {
        id: 'enganio',
        nombre: 'Dominio del Engaño',
        desc: 'El dominio del engaño ofrece la magia de los embustes, las ilusiones y el sigilo. Los clérigos que emplean esta magia son una fuerza que perturba el mundo pinchando a los orgullosos, mofándose de los tiranos, liberando a los cautivos y desdeñando tradiciones vacías. Prefieren el subterfugio y las bromas a la confrontación directa.',
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del dominio del engaño', desc: 'Tu conexión con este dominio divino garantiza que siempre tengas ciertos conjuros preparados. Cuando alcances un nivel de clérigo especificado en la tabla «Conjuros del dominio del engaño», a partir de entonces siempre tendrás preparados los conjuros que se indican.\nNivel de clérigo 3: disfrazarse, hechizar persona, invisibilidad, pasar sin rastro.\nNivel de clérigo 5: indetectable, patrón hipnótico.\nNivel de clérigo 7: confusión, puerta dimensional.\nNivel de clérigo 9: alterar los recuerdos, dominar persona.' },
            { nombre: 'Bendición del embaucador', desc: 'Como acción de magia, puedes escogerte a ti o a una criatura voluntaria a 9 m o menos de ti para que tenga ventaja en las pruebas de Destreza (Sigilo). Esta bendición dura hasta que finalices un descanso largo o hasta que vuelvas a usar este rasgo.' },
            { nombre: 'Invocar duplicidad', desc: 'Como acción adicional, puedes gastar un uso de Canalizar divinidad para crear un duplicado ilusorio perfecto de ti en un espacio sin ocupar que puedas ver a 9 m o menos de ti. La ilusión no es tangible ni ocupa el espacio en el que se encuentra. Dura 1 minuto, pero termina antes de tiempo si la disipas (no requiere acción) o si tienes el estado de incapacitado. La ilusión está animada e imita tus expresiones y gestos. Mientras persista, obtienes los siguientes beneficios:\nDistraer. Cuando tanto tu ilusión como tú estéis a 1,5 m o menos de una criatura que pueda ver la ilusión, tendrás ventaja en las tiradas de ataque contra esa criatura, ya que la ilusión distrae al objetivo.\nLanzar conjuros. Puedes lanzar conjuros como si estuvieras en el espacio de la ilusión, pero debes utilizar tus propios sentidos.\nMover. Como acción adicional, puedes mover la ilusión hasta 9 m a un espacio sin ocupar que puedas ver a 36 m o menos de ti.' },
          ],
          6: [
            { nombre: 'Transposición del embaucador', desc: 'Siempre que utilices una acción adicional para crear o mover la ilusión de Invocar duplicidad, podrás teletransportarte y cambiarle el lugar a la ilusión.' },
          ],
          17: [
            { nombre: 'Duplicidad mejorada', desc: 'La ilusión de Invocar duplicidad se vuelve más poderosa de las siguientes formas:\nDistracción compartida. Cuando tus aliados y tú hagáis tiradas de ataque contra una criatura que se encuentre a 1,5 m o menos de la ilusión, esas tiradas de ataque tendrán ventaja.\nIlusión sanadora. Cuando la ilusión desaparezca, tú o una criatura de tu elección a 1,5 m o menos de ella recuperaréis una cantidad de puntos de golpe igual a tu nivel de clérigo.' },
          ],
        },
      },
    ],
    rol: 'Sanador divino',
    magia: true,
    rasgosNivel1: NIVEL_DATOS.clerigo.rasgosNivel[1],
    ...NIVEL_DATOS.clerigo,
    eleccionNivel1: {
      tipo: 'orden_divina',
      nombre: 'Orden Divina',
      descripcion: 'Como clérigo de nivel 1, eliges tu orden divina: un enfoque en el combate sagrado o en el conocimiento espiritual.',
      opciones: [
        {
          id: 'protector',
          nombre: 'Protector',
          desc: 'Entrenamiento con armas marciales y armaduras pesadas. Te conviertes en un guerrero de tu deidad, capaz de luchar en las primeras filas.',
          beneficios: { armadurasExtra: ['Pesadas'], armasExtra: ['Marciales'] },
        },
        {
          id: 'taumaturgo',
          nombre: 'Taumaturgo',
          desc: 'Aprendes un truco adicional de clérigo. Cuando hagas una prueba de Conocimiento arcano o Religión, puedes añadir tu modificador de Sabiduría a la tirada.',
          beneficios: { trucoExtra: true },
        },
      ],
    },
  },
  {
    id: 'druida',
    nombre: 'Druida',
    descripcion: 'Canaliza la magia de la naturaleza para sanar, cambiar de forma y controlar los elementos.',
    preferencia: 'Naturaleza',
    complejidad: 'Alta',
    caracteristicaPrincipal: ['Sabiduría'],
    requisitoMulticlase: { caracteristicas: ['Sabiduría'], modo: 'and' },
    competenciasMulticlase: { armaduras: ['Ligeras', 'Escudos'] },
    dadoGolpe: 'd8',
    tiradasSalvacion: ['Inteligencia', 'Sabiduría'],
    entrenamientoArmaduras: ['Ligeras', 'Escudos'],
    competenciasHabilidades: {
      elegir: 2,
      opciones: ['Conocimiento arcano', 'Medicina', 'Naturaleza', 'Percepción', 'Perspicacia', 'Religión', 'Supervivencia', 'Trato con animales'],
    },
    subclases: [
      {
        id: 'luna',
        nombre: 'Círculo de la Luna',
        desc: 'Los druidas del círculo de la luna utilizan la magia lunar para transformarse. La naturaleza salvaje recorre las venas de estos druidas.',
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del círculo de la luna', desc: 'Siempre preparados según nivel (y puedes lanzarlos en Forma salvaje): niv.3 → curar heridas, rayo de luna, voluta estelar; niv.5 → conjurar animales; niv.7 → fuente de luz lunar; niv.9 → curar heridas en masa.' },
            { nombre: 'Formas del círculo', desc: 'Al usar Forma salvaje con la magia lunar: FD máx = nivel de druida ÷ 3 (redondeo abajo); CA base = 13 + mod. SAB si supera la CA de la bestia; PG temporales = triple de tu nivel de druida (en lugar del nivel normal).' },
          ],
          6: [
            { nombre: 'Formas del círculo mejoradas', desc: 'En Forma salvaje: Resplandor lunar (todos tus ataques pueden causar su tipo de daño normal o daño radiante, eliges por ataque); Aguante aumentado (sumas mod. SAB a tus tiradas de salvación de CON).' },
          ],
          10: [
            { nombre: 'Paso de la luz lunar', desc: 'Acción adicional: te teletransportas hasta 9 m a espacio sin ocupar visible y tienes ventaja en tu próximo ataque este turno. Usos = mod. SAB (mín. 1); se recuperan en descanso largo. También puedes recuperar usos gastando espacios de conjuro de nivel 2+ (1 uso por espacio, sin acción).' },
          ],
          14: [
            { nombre: 'Forma lunar', desc: 'Dos beneficios: Luz lunar compartida (al usar Paso de la luz lunar puedes teletransportar también a una criatura voluntaria a 3 m de ti, hacia un espacio a 3 m de tu destino); Resplandor lunar mejorado (una vez por turno, al acertar con un ataque en Forma salvaje, causas 2d10 de daño radiante adicional).' },
          ],
        },
      },
      {
        id: 'tierra',
        nombre: 'Círculo de la Tierra',
        desc: 'El círculo de la tierra se compone de místicos y sabios que custodian ritos y conocimientos antiguos, reuniéndose en torno a círculos sagrados de árboles o menhires.',
        rasgosNivel: {
          3: [
            { nombre: 'Ayuda de la tierra', desc: 'Acción de magia: gasta un uso de Forma salvaje y elige un punto a 18 m. En esfera de 3 m: criaturas de tu elección deben pasar CON o sufren 2d6 de daño necrótico (mitad si superan); además una criatura de tu elección recupera 2d6 PG. Escala a 3d6 en niv.10 y 4d6 en niv.14.' },
            { nombre: 'Conjuros del círculo de la tierra', desc: 'En descanso largo elige terreno: Árido (manos ardientes, contorno borroso, descarga de fuego; bola de fuego niv.5; marchitar niv.7; muro de piedra niv.9), Polar (rayo de escarcha, inmovilizar persona, nube de oscurecimiento; tormenta de aguanieve niv.5; tormenta de hielo niv.7; cono de frío niv.9), Templado (dormir, paso brumoso, agarre electrizante; relámpago niv.5; libertad de movimiento niv.7; paso arbóreo niv.9), Tropical (telaraña, salpicadura ácida, rayo nauseabundo; nube apestosa niv.5; polimorfar niv.7; plaga de insectos niv.9).' },
          ],
          6: [
            { nombre: 'Recuperación natural', desc: 'Puedes lanzar un conjuro de Conjuros de círculo de nivel 1+ una vez sin gastar espacio (una vez por descanso largo). Además, en descanso corto, puedes recuperar espacios gastados cuya suma de niveles ≤ mitad de tu nivel de druida (redondeo arriba), sin espacios de nivel 6+. Una vez por descanso largo.' },
          ],
          10: [
            { nombre: 'Protección de la naturaleza', desc: 'Eres inmune al estado envenenado y tienes resistencia a un tipo de daño según tu terreno actual: Árido→fuego, Polar→frío, Templado→relámpago, Tropical→veneno.' },
          ],
          14: [
            { nombre: 'Santuario de la naturaleza', desc: 'Acción de magia: gasta un uso de Forma salvaje para hacer aparecer árboles y enredaderas espectrales en un cubo de 4,5 m a 36 m durante 1 minuto (o hasta que quedes incapacitado). Tú y tus aliados en la zona tenéis cobertura media; tus aliados obtienen la resistencia de Protección de la naturaleza. Acción adicional: mueves el cubo hasta 18 m.' },
          ],
        },
      },
      {
        id: 'estrellas',
        nombre: 'Círculo de las Estrellas',
        desc: 'El círculo de las estrellas lleva estudiando los patrones celestes desde tiempos inmemoriales. Mediante la comprensión de sus secretos, aspiras a acceder a los poderes del cosmos.',
        rasgosNivel: {
          3: [
            { nombre: 'Forma estelar', desc: 'Acción adicional: gasta un uso de Forma salvaje para adoptar forma estelar (mantén tu perfil normal pero emites luz brillante 3 m / tenue 3 m más). Dura 10 min. Elige constelación: Arquero (AA: ataque de conjuro a distancia 18 m → 1d8 + mod. SAB de daño radiante); Cáliz (al lanzar conjuro que cure PG, tú u otra criatura a 9 m recuperáis 1d8 + mod. SAB PG); Dragón (sustituyes resultados de 9 o menos en d20 de pruebas INT/SAB y salvaciones de CON por 10).' },
            { nombre: 'Mapa estelar', desc: 'Objeto Diminuto que actúa como canalizador mágico. Mientras lo sostienes: tienes guía y saeta guía preparados; puedes lanzar saeta guía sin gastar espacio (usos = mod. SAB mín. 1; se recuperan en descanso largo). Si lo pierdes, recrearlo toma 1 hora en descanso corto/largo.' },
          ],
          6: [
            { nombre: 'Presagio cósmico', desc: 'Tras descanso largo, consulta el mapa y tira un dado: si par (Fortuna) → reacción para añadir 1d6 a una prueba de d20 de una criatura visible a 9 m; si impar (Desdicha) → reacción para restar 1d6 a esa tirada. Usos = mod. SAB (mín. 1); se recuperan en descanso largo.' },
          ],
          10: [
            { nombre: 'Constelaciones centelleantes', desc: 'Las constelaciones de Forma estelar mejoran: Arquero y Cáliz pasan de 1d8 a 2d8; Dragón añade velocidad volando 6 m + levitar. Además, al inicio de cada turno en forma estelar, puedes cambiar la constelación activa.' },
          ],
          14: [
            { nombre: 'Colmado de luz estelar', desc: 'Mientras estés en forma estelar, eres parcialmente incorpóreo y tienes resistencia al daño contundente, cortante y perforante.' },
          ],
        },
      },
      {
        id: 'mar',
        nombre: 'Círculo del Mar',
        desc: 'Los druidas del círculo del mar utilizan las fuerzas tempestuosas de los océanos y las tormentas, armonizándose con el flujo y reflujo de las mareas.',
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del círculo del mar', desc: 'Siempre preparados según nivel: niv.3 → hacer añicos, nube de oscurecimiento, ola atronadora, ráfaga de viento, rayo de escarcha; niv.5 → relámpago, respirar bajo el agua; niv.7 → controlar agua, tormenta de hielo; niv.9 → conjurar elemental, inmovilizar monstruo.' },
            { nombre: 'Ira de los mares', desc: 'Acción adicional: gasta un uso de Forma salvaje para generar una emanación de 1,5 m de espuma marina durante 10 min. Al activarla y como AA cada turno siguiente, elige una criatura visible en la emanación: debe pasar CON o sufre daño de frío (tira d6 = mod. SAB, mín. 1) y, si es Grande o menor, es empujada hasta 4,5 m.' },
          ],
          6: [
            { nombre: 'Afinidad acuática', desc: 'La emanación de Ira de los mares aumenta a 3 m. Además, obtienes velocidad nadando = tu velocidad.' },
          ],
          10: [
            { nombre: 'Nacido de la tempestad', desc: 'Mientras Ira de los mares esté activa, obtienes dos beneficios adicionales: Resistencia al daño de frío, relámpago y trueno; Vuelo (velocidad volando = tu velocidad).' },
          ],
          14: [
            { nombre: 'Obsequio oceánico', desc: 'Puedes generar la emanación de Ira de los mares alrededor de una criatura voluntaria a 18 m en lugar de alrededor de ti (usa tu CD y mod. SAB). También puedes rodear a ambos gastando 2 usos de Forma salvaje.' },
          ],
        },
      },
    ],
    rol: 'Lanzador de conjuros de naturaleza',
    magia: true,
    rasgosNivel1: NIVEL_DATOS.druida.rasgosNivel[1],
    ...NIVEL_DATOS.druida,
    eleccionNivel1: {
      tipo: 'orden_primigenia',
      nombre: 'Orden Primigenia',
      descripcion: 'Como druida de nivel 1, debes afiliarte a una orden primigenia que define tu vínculo con la naturaleza.',
      opciones: [
        {
          id: 'guardian',
          nombre: 'Guardián',
          desc: 'Entrenamiento con armas marciales y armaduras medias. Eres un protector de la naturaleza que no teme el combate.',
          beneficios: { armadurasExtra: ['Medias'], armasExtra: ['Marciales'] },
        },
        {
          id: 'naturalista',
          nombre: 'Naturalista',
          desc: 'Aprendes un truco adicional de druida. Cuando hagas una prueba de Naturaleza con Inteligencia, puedes añadir tu modificador de Sabiduría a la tirada.',
          beneficios: { trucoExtra: true },
        },
      ],
    },
  },
  {
    id: 'explorador',
    nombre: 'Explorador',
    descripcion: 'Combina la destreza marcial, la magia de la naturaleza y las habilidades de supervivencia.',
    preferencia: 'Supervivencia',
    complejidad: 'Media',
    caracteristicaPrincipal: ['Destreza', 'Sabiduría'],
    requisitoMulticlase: { caracteristicas: ['Destreza', 'Sabiduría'], modo: 'and' },
    competenciasMulticlase: { armaduras: ['Ligeras', 'Medias', 'Escudos'], armas: ['Marciales'], habilidadesElegir: 1 },
    dadoGolpe: 'd10',
    tiradasSalvacion: ['Fuerza', 'Destreza'],
    entrenamientoArmaduras: ['Ligeras', 'Medias', 'Escudos'],
    competenciasHabilidades: {
      elegir: 3,
      opciones: ['Atletismo', 'Investigación', 'Naturaleza', 'Percepción', 'Perspicacia', 'Sigilo', 'Supervivencia', 'Trato con animales'],
    },
    subclases: [
      {
        id: 'acechador',
        nombre: 'Acechador en la Penumbra',
        desc: 'Los acechadores en la penumbra están familiarizados con los lugares más oscuros y utilizan magia procedente del Páramo Sombrío para combatir a los enemigos que se ocultan en las tinieblas.',
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros de acechador en la penumbra', desc: 'Conjuros siempre preparados según nivel: Lv3 Disfrazarse, Lv5 Truco de la cuerda, Lv9 Terror, Lv13 Invisibilidad mejorada, Lv17 Apariencia.' },
            { nombre: 'Emboscador pavoroso', desc: 'Tres beneficios. Iniciativa: sumas tu mod. SAB a la tirada de iniciativa. Golpe pavoroso: al acertar con un arma, puedes infligir 2d6 de daño psíquico adicional (una vez por turno; usos = mod. SAB, mín. 1; recuperas tras descanso largo). Salto emboscador: en tu primer turno de cada combate, tu velocidad aumenta 3 m hasta el final de ese turno.' },
            { nombre: 'Visión en la umbra', desc: 'Visión en la oscuridad hasta 18 m (o +18 m si ya la tenías). Mientras estés en oscuridad total, tienes el estado invisible frente a criaturas que dependan de visión en la oscuridad para verte.' },
          ],
          7: [
            { nombre: 'Mente de hierro', desc: 'Ganas competencia en tiradas de salvación de Sabiduría. Si ya la tienes, ganas competencia en Inteligencia o Carisma (a tu elección).' },
          ],
          11: [
            { nombre: 'Oleada del acechador', desc: 'El daño psíquico de tu golpe pavoroso aumenta a 2d8. Cuando uses el golpe pavoroso, puedes elegir un efecto adicional: Ataque súbito (ataca a otra criatura a 1,5 m del objetivo) o Terror masivo (el objetivo y criaturas a 3 m fallan TS de SAB o quedan asustadas hasta tu siguiente turno).' },
          ],
          15: [
            { nombre: 'Esquiva de las sombras', desc: 'Cuando una criatura haga una tirada de ataque contra ti, puedes usar una reacción para imponerle desventaja. Luego, tanto si acierta como si no, puedes teletransportarte hasta 9 m a un espacio sin ocupar que puedas ver.' },
          ],
        },
      },
      {
        id: 'cazador',
        nombre: 'Cazador',
        desc: 'Protege la naturaleza y a la gente contra la destrucción. Acechas a tus presas en las tierras salvajes y empleas tus habilidades para proteger contra las fuerzas que buscan destruir.',
        rasgosNivel: {
          3: [
            { nombre: 'El cazador y la presa', desc: 'Elige una opción (puedes cambiarla tras descanso corto/largo): Azote de colosos (cuando aciertas a una criatura que no tiene todos sus PG, inflige 1d8 de daño adicional, una vez por turno) o Destructor de hordas (una vez por turno, puedes hacer un segundo ataque contra una criatura distinta a 1,5 m del objetivo si no la has atacado este turno).' },
            { nombre: 'Sabiduría del cazador', desc: 'Mientras una criatura tenga tu marca del cazador, sabes si tiene inmunidades, resistencias o vulnerabilidades y cuáles son.' },
          ],
          7: [
            { nombre: 'Tácticas defensivas', desc: 'Elige una opción (puedes cambiarla tras descanso corto/largo): Defensa contra ataques múltiples (cuando una criatura te acierta, tiene desventaja en sus demás ataques contra ti ese turno) o Escapar de la horda (los ataques de oportunidad tienen desventaja contra ti).' },
          ],
          11: [
            { nombre: 'El cazador experto y la presa', desc: 'Una vez por turno, cuando inflijas daño a una criatura marcada con marca del cazador, también puedes infligir el daño adicional del conjuro a una criatura distinta que puedas ver a 9 m o menos de la primera.' },
          ],
          15: [
            { nombre: 'Defensa de cazador experto', desc: 'Cuando recibes daño, puedes usar una reacción para concederte resistencia a ese tipo de daño y cualquier otro daño del mismo tipo hasta el final de ese turno.' },
          ],
        },
      },
      {
        id: 'errante_feerico',
        nombre: 'Errante Feérico',
        desc: 'Un aura mística te envuelve gracias a la bendición de los Parajes Feéricos. Tu risa alegre ilumina los corazones de los oprimidos y tu destreza marcial infunde terror a tus enemigos.',
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros de errante feérico', desc: 'Conjuros siempre preparados según nivel: Lv3 Hechizar persona, Lv5 Paso brumoso, Lv9 Invocar feérico, Lv13 Puerta dimensional, Lv17 Engañar. También eliges una dádiva de los Parajes Feéricos (efecto cosmético aleatorio o elegido).' },
            { nombre: 'Glamur sobrenatural', desc: 'Cuando hagas una prueba de Carisma, sumas tu modificador de SAB (mínimo +1). Además, ganas competencia en Engaño, Interpretación o Persuasión (a tu elección).' },
            { nombre: 'Golpes pavorosos', desc: 'Cuando aciertas con un arma, puedes infligir 1d4 de daño psíquico adicional (una vez por turno). Aumenta a 1d6 en nivel 11.' },
          ],
          7: [
            { nombre: 'Giro seductor', desc: 'Ventaja en TS para evitar/terminar los estados asustado o hechizado. Cuando tú u otra criatura a 36 m tenga éxito en esa TS, puedes usar una reacción para obligar a otra criatura a 36 m a hacer una TS de SAB: si la falla, queda asustada o hechizada (a tu elección) 1 minuto (TS al final de cada turno para terminar).' },
          ],
          11: [
            { nombre: 'Refuerzos feéricos', desc: 'Puedes lanzar invocar feérico sin componentes materiales, y una vez gratis por descanso largo sin espacio. Cuando lo lances, puedes modificarlo para que no requiera concentración (duración: 1 minuto).' },
          ],
          15: [
            { nombre: 'Errante brumoso', desc: 'Puedes lanzar paso brumoso sin espacio de conjuro (usos = mod. SAB, mín. 1; recuperas tras descanso largo). Cuando lo lances, puedes traer a una criatura voluntaria a 1,5 m de ti al espacio de destino.' },
          ],
        },
      },
      {
        id: 'bestias',
        nombre: 'Señor de las Bestias',
        desc: 'Un señor de las bestias forma un vínculo místico con un animal especial y recurre a la magia primigenia y a una profunda conexión con el mundo natural.',
        rasgosNivel: {
          3: [
            { nombre: 'Compañero primigenio', desc: 'Invocas mágicamente una bestia primigenia. Elige un perfil: bestia de los mares, de tierra firme o del cielo. La bestia actúa en tu turno: se mueve y reacciona sola, pero solo hace la acción de esquivar salvo que uses una acción adicional para ordenarle otra acción (o sacrifiques un ataque para ordenarle golpe de bestia). Tras descanso largo, puedes invocar una bestia diferente. Si muere, puedes gastar una acción de magia + espacio de conjuro para revivirla.' },
          ],
          7: [
            { nombre: 'Entrenamiento excepcional', desc: 'Cuando uses una acción adicional para ordenarle a la bestia una acción, también puede usar su acción adicional para ayudar, correr, destrabarse o esquivar. Además, cuando acierta, puedes elegir que inflija daño de fuerza en lugar de su tipo normal.' },
          ],
          11: [
            { nombre: 'Furia bestial', desc: 'Cuando le ordenes a la bestia que realice la acción de golpe de bestia, puede usarla dos veces. Además, la primera vez por turno que acierte a una criatura marcada con marca del cazador, inflige daño de fuerza adicional igual al daño adicional del conjuro.' },
          ],
          15: [
            { nombre: 'Compartir conjuros', desc: 'Cuando lances un conjuro que te haga objetivo a ti, puedes hacer que también afecte a tu bestia primigenia si se encuentra a 9 m o menos de ti.' },
          ],
        },
      },
    ],
    rol: 'Combatiente y rastreador versátil',
    magia: true,
    rasgosNivel1: NIVEL_DATOS.explorador.rasgosNivel[1],
    ...NIVEL_DATOS.explorador,
  },
  {
    id: 'guerrero',
    nombre: 'Guerrero',
    descripcion: 'Domina todas las armas y armaduras con maestría marcial sin igual.',
    preferencia: 'Armas',
    complejidad: 'Baja',
    caracteristicaPrincipal: ['Fuerza', 'Destreza'],
    requisitoMulticlase: { caracteristicas: ['Fuerza', 'Destreza'], modo: 'or' },
    competenciasMulticlase: { armaduras: ['Ligeras', 'Medias', 'Escudos'], armas: ['Marciales'] },
    dadoGolpe: 'd10',
    tiradasSalvacion: ['Fuerza', 'Constitución'],
    entrenamientoArmaduras: ['Ligeras', 'Medias', 'Pesadas', 'Escudos'],
    competenciasHabilidades: {
      elegir: 2,
      opciones: ['Acrobacias', 'Atletismo', 'Historia', 'Intimidación', 'Percepción', 'Perspicacia', 'Persuasión', 'Supervivencia', 'Trato con animales'],
    },
    subclases: [
      {
        id: 'caballero_arcano',
        nombre: 'Caballero Arcano',
        desc: 'Los caballeros arcanos combinan la maestría marcial típica de los guerreros con el estudio minucioso de la magia. Sus conjuros complementan y amplían sus habilidades de combate.',
        rasgosNivel: {
          3: [
            { nombre: 'Lanzamiento de conjuros', desc: 'Conoces 2 trucos de la lista de mago (+1 en nivel 10). Preparas 3 conjuros de mago de nivel 1 para empezar; el total crece según la tabla. Al subir de nivel puedes sustituir un conjuro. Aptitud mágica: Inteligencia. Puedes usar un canalizador arcano.' },
            { nombre: 'Vínculo de guerra', desc: 'Aprendes un ritual de 1 hora (puede realizarse en descanso corto) que te vincula mágicamente a un arma. No podrán desarmarte de ella salvo que estés incapacitado. Si está en el mismo plano, puedes invocarla a tu mano como acción adicional. Puedes tener hasta dos armas vinculadas; si te vinculas a una tercera, debes romper el vínculo con una de las otras.' },
          ],
          7: [
            { nombre: 'Magia de guerra', desc: 'Cuando uses la acción de atacar, puedes sustituir uno de los ataques por el lanzamiento de un truco de mago con tiempo de lanzamiento de una acción.' },
          ],
          10: [
            { nombre: 'Golpe sobrenatural', desc: 'Cuando aciertes con un ataque con arma, la criatura tiene desventaja en la siguiente TS contra un conjuro que lances antes del final de tu siguiente turno.' },
          ],
          15: [
            { nombre: 'Carga arcana', desc: 'Cuando uses Acción súbita, puedes teletransportarte hasta 9 m a un espacio sin ocupar que puedas ver (antes o después de la acción adicional).' },
          ],
          18: [
            { nombre: 'Magia de guerra mejorada', desc: 'Cuando uses la acción de atacar, puedes sustituir dos de los ataques por el lanzamiento de un conjuro de mago de nivel 1 o 2 con tiempo de lanzamiento de una acción.' },
          ],
        },
      },
      {
        id: 'campeon',
        nombre: 'Campeón',
        desc: 'Un campeón se centra en desarrollar su destreza marcial en su incansable afán de victoria, combinando entrenamiento riguroso con un estado físico excelente.',
        rasgosNivel: {
          3: [
            { nombre: 'Atleta sobresaliente', desc: 'Tienes ventaja en las tiradas de iniciativa y en las pruebas de Fuerza (Atletismo). Además, justo después de causar un crítico, puedes moverte hasta la mitad de tu velocidad sin provocar ataques de oportunidad.' },
            { nombre: 'Crítico mejorado', desc: 'Tus tiradas de ataque con armas y tus ataques sin armas pueden causar críticos con un resultado de 19 o 20 en el d20.' },
          ],
          7: [
            { nombre: 'Estilo de combate adicional', desc: 'Obtienes otra dote de estilo de combate de tu elección.' },
          ],
          10: [
            { nombre: 'Guerrero heroico', desc: 'Durante un combate, puedes otorgarte inspiración heroica siempre que empieces tu turno sin ella.' },
          ],
          15: [
            { nombre: 'Crítico superior', desc: 'Tus tiradas de ataque con armas y tus ataques sin armas pueden causar críticos con un resultado de 18, 19 o 20 en el d20.' },
          ],
          18: [
            { nombre: 'Superviviente', desc: 'Alcanzas la cumbre de la resistencia en batalla. Desafiar a la muerte: ventaja en tiradas de salvación contra muerte; si sacas 18–20, obtienes el beneficio de sacar 20. Mejoría heroica: al principio de cada turno, recuperas 5 + mod. CON PG si estás maltrecho y tienes al menos 1 PG.' },
          ],
        },
      },
      {
        id: 'psiconico',
        nombre: 'Guerrero Psiónico',
        desc: 'Los guerreros psiónicos despiertan el poder de sus mentes para mejorar sus capacidades físicas. Emplean el poder psiónico para imbuir sus ataques, arremeter con energía telequinética y crear barreras de fuerza mental.',
        rasgosNivel: {
          3: [
            { nombre: 'Poder psiónico', desc: 'Tienes dados de energía psiónica (4d6 en nivel 3; d8 en nivel 5; d10 en nivel 11; d12 en nivel 17; cantidad también escala). Recuperas 1 dado tras descanso corto y todos tras descanso largo. Tres usos: Campo protector (reacción: gasta un dado para reducir daño en resultado + mod. INT); Golpe psiónico (tras acertar, gasta un dado para infligir daño de fuerza = resultado + mod. INT); Movimiento telequinético (acción de magia: mueves objeto/criatura voluntaria hasta 9 m; gratis una vez por descanso corto/largo, o gasta un dado).' },
          ],
          7: [
            { nombre: 'Adepto telequinético', desc: 'Empujón telequinético: cuando inflijas daño con golpe psiónico, el objetivo hace TS de FUE (CD 8 + mod. INT + BC) o queda derribado o se desplaza 3 m. Salto psiónico: acción adicional para obtener velocidad de vuelo = doble de tu velocidad hasta el final del turno (una vez por descanso corto/largo, o gasta un dado).' },
          ],
          10: [
            { nombre: 'Mente robusta', desc: 'Tienes resistencia al daño psíquico. Si comienzas tu turno con el estado asustado o hechizado, puedes gastar un dado de energía psiónica para poner fin a todos esos efectos.' },
          ],
          15: [
            { nombre: 'Bastión de fuerza', desc: 'Como acción adicional, eliges hasta mod. INT criaturas (mín. 1) a 9 m de ti. Cada criatura elegida tiene cobertura media durante 1 minuto o hasta que estés incapacitado. Una vez por descanso largo, o gasta un dado para restablecer el uso.' },
          ],
          18: [
            { nombre: 'Maestro telequinético', desc: 'Siempre tienes preparado el conjuro telequinesis. Puedes lanzarlo sin espacio ni componentes (aptitud: INT) una vez por descanso largo (o gasta un dado). Mientras concentres el conjuro, puedes realizar un ataque con un arma como acción adicional en cada uno de tus turnos.' },
          ],
        },
      },
      {
        id: 'maestro_combate',
        nombre: 'Maestro del Combate',
        desc: 'Los maestros del combate estudian el arte de la batalla y aprenden técnicas marciales transmitidas generación tras generación, combinando habilidades de combate con el estudio académico.',
        rasgosNivel: {
          3: [
            { nombre: 'Estudioso de la guerra', desc: 'Ganas competencia con un tipo de herramientas de artesano de tu elección y con una habilidad de tu elección de la lista de guerrero.' },
            { nombre: 'Supremacía en combate', desc: 'Aprendes 3 maniobras de tu elección (solo una por ataque). 4 dados de supremacía d8; recuperas todos tras descanso corto o largo. CD de maniobra = 8 + mod. FUE o DES + BC. Las maniobras incluyen: Arremetida, Ataque amenazador, Ataque de barrido, Ataque preciso, Ataque provocador, Ataque y derribo, Ataque y desarme, Ataque y distracción, Ataque y empujón, Ataque y maniobra, Cambio de posición ventajoso, Contraataque, Emboscada, Evaluación táctica, Finta, Juego de pies evasivo, Orden de ataque, Parada, Presencia imponente y otros.' },
          ],
          7: [
            { nombre: 'Conoce a tu enemigo', desc: 'Como acción adicional, sabes si una criatura a 9 m tiene inmunidades, resistencias o vulnerabilidades. Una vez por descanso largo, o gasta un dado de supremacía para restablecer el uso.' },
            { nombre: 'Supremacía en combate (7)', desc: 'Aprendes 2 maniobras adicionales y obtienes un 5.º dado de supremacía.' },
          ],
          10: [
            { nombre: 'Supremacía en combate mejorada', desc: 'Tu dado de supremacía se convierte en un d10. Aprendes 2 maniobras adicionales.' },
          ],
          15: [
            { nombre: 'Incansable', desc: 'Una vez por turno, cuando uses una maniobra, puedes tirar 1d8 y usar el resultado en vez de gastar un dado de supremacía.' },
            { nombre: 'Supremacía en combate (15)', desc: 'Aprendes 2 maniobras adicionales y obtienes un 6.º dado de supremacía.' },
          ],
          18: [
            { nombre: 'Supremacía en combate definitiva', desc: 'Tu dado de supremacía se convierte en un d12.' },
          ],
        },
      },
    ],
    rol: 'Combatiente marcial maestro',
    magia: false,
    rasgosNivel1: NIVEL_DATOS.guerrero.rasgosNivel[1],
    ...NIVEL_DATOS.guerrero,
    eleccionNivel1: {
      tipo: 'estilo_combate',
      nombre: 'Estilo de Combate',
      descripcion: 'Has pulido tu destreza marcial y obtienes una dote de estilo de combate de tu elección. Se recomienda Defensa.',
      opciones: [
        { id: 'dos_manos',   nombre: 'Combate con armas a dos manos', desc: 'Cuando tires el daño con un arma cuerpo a cuerpo que empuñas con ambas manos, puedes tratar cualquier 1 o 2 en los dados de daño como un 3 (requiere propiedad a dos manos o versátil).', beneficios: {} },
        { id: 'arrojadizas', nombre: 'Combate con armas arrojadizas', desc: 'Cuando aciertas con un ataque a distancia con un arma arrojadiza, obtienes +2 a la tirada de daño.', beneficios: {} },
        { id: 'dos_armas',   nombre: 'Combate con dos armas',         desc: 'Cuando haces un ataque extra con un arma ligera, puedes sumar tu modificador por característica al daño de ese ataque.', beneficios: {} },
        { id: 'sin_armas',   nombre: 'Combate sin armas',             desc: 'Cuando aciertes con un ataque sin armas, puedes infligir 1d6 + FUE de daño contundente (o 1d8 si no empuñas armas ni escudo).', beneficios: {} },
        { id: 'defensa',     nombre: 'Defensa',                       desc: 'Mientras lleves puesta una armadura ligera, media o pesada, recibes +1 a la clase de armadura.', beneficios: { caBonus: 1 } },
        { id: 'duelo',       nombre: 'Duelo',                         desc: 'Cuando empuñes un arma cuerpo a cuerpo con una mano y ninguna en la otra, recibes +2 a tus tiradas de daño con esa arma.', beneficios: {} },
        { id: 'intercepcion', nombre: 'Intercepción',                 desc: 'Cuando una criatura acierte a otra criatura a 1,5 m de ti, puedes reducir el daño en 1d10 + tu bonificador de competencia (reacción; necesitas escudo o arma).', beneficios: {} },
        { id: 'proteccion',  nombre: 'Protección',                    desc: 'Cuando una criatura que puedas ver ataque a un objetivo a 1,5 m de ti, puedes imponer desventaja a esa tirada de ataque (reacción; necesitas escudo).', beneficios: {} },
        { id: 'tiro_arco',   nombre: 'Tiro con arco',                 desc: 'Recibes +2 a las tiradas de ataque con armas a distancia.', beneficios: {} },
      ],
    },
  },
  {
    id: 'hechicero',
    nombre: 'Hechicero',
    descripcion: 'Usa la magia innata de tu ser para moldear el poder a tu antojo.',
    preferencia: 'Poderes',
    complejidad: 'Alta',
    caracteristicaPrincipal: ['Carisma'],
    requisitoMulticlase: { caracteristicas: ['Carisma'], modo: 'and' },
    competenciasMulticlase: { armaduras: [] },
    dadoGolpe: 'd6',
    tiradasSalvacion: ['Constitución', 'Carisma'],
    entrenamientoArmaduras: [],
    competenciasHabilidades: {
      elegir: 2,
      opciones: ['Conocimiento arcano', 'Engaño', 'Intimidación', 'Perspicacia', 'Persuasión', 'Religión'],
    },
    subclases: [
      {
        id: 'aberrante',
        nombre: 'Hechicería Aberrante',
        desc: 'Una influencia alienígena ha atrapado tu mente, otorgándote poder psiónico. Puedes tocar otras mentes con ese poder y alterar el mundo que te rodea.',
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros psiónicos', desc: 'Siempre tienes preparados conjuros psiónicos según tu nivel: Nv3: Brazos de Hadar, calmar emociones, detectar pensamientos, fragmento mental, susurros discordantes; Nv5: Hambre de Hadar, recado; Nv7: Invocar aberración, tentáculos negros de Evard; Nv9: Enlace telepático de Rary, telequinesis. No cuentan para el límite de preparados.' },
            { nombre: 'Habla telepática', desc: 'Como acción adicional, elige una criatura que puedas ver a 9 m o menos. Podréis comunicaros telepáticamente a una distancia máxima de 1,5 km × tu mod. CAR (mín. 1,5 km), usando mentalmente un idioma que ambos conozcáis. Dura un número de minutos igual a tu nivel de hechicero.' },
          ],
          6: [
            { nombre: 'Defensas psíquicas', desc: 'Tienes resistencia al daño psíquico y ventaja en las tiradas de salvación para evitar o poner fin a los estados de asustado o hechizado.' },
            { nombre: 'Hechicería psiónica', desc: 'Cuando lanzas cualquier conjuro de nivel 1+ de tu rasgo Conjuros psiónicos, puedes hacerlo gastando un espacio de conjuro o una cantidad de puntos de hechicería igual al nivel del conjuro. Si lo lanzas con puntos, no requiere componentes verbales, somáticos ni materiales (salvo las que se consuman o tengan coste).' },
          ],
          14: [
            { nombre: 'Revelación en carne', desc: 'Como acción adicional, gastas 1 o más puntos de hechicería para alterar mágicamente tu cuerpo durante 10 minutos. Por cada punto gastas, eliges un beneficio: Adaptación acuática (velocidad nadando ×2, respirar bajo el agua), Movimiento anélido (cabe por espacios de 2,5 cm, escapar de agarres), Ver lo invisible (ver criaturas invisibles a 18 m), Vuelo brillante (velocidad volando = velocidad, levitar).' },
          ],
          18: [
            { nombre: 'Implosión deformadora', desc: 'Como acción de magia, te teletransportas a un espacio sin ocupar que puedas ver a 36 m. Inmediatamente, cada criatura a 9 m del espacio que abandonaste realiza TS de FUE contra tu CD de conjuros; si falla, sufre 3d10 de daño de fuerza y es arrastrada al espacio abandonado; si supera, solo la mitad del daño. Una vez por descanso largo, o gasta 5 puntos de hechicería para restablecer el uso.' },
          ],
        },
      },
      {
        id: 'salvaje',
        nombre: 'Hechicería de Magia Salvaje',
        desc: 'Tu magia innata proviene de las fuerzas del caos que subyacen en el orden de la creación. La magia bulle en tu interior, esperando manifestarse de formas impredecibles.',
        rasgosNivel: {
          3: [
            { nombre: 'Mareas del caos', desc: 'Puedes manipular el caos para otorgarte ventaja en una prueba con d20 antes de tirar el dado. Una vez que lo hagas, deberás lanzar un conjuro de hechicero con un espacio de conjuro o finalizar un descanso largo para poder usar este rasgo de nuevo. Si lanzas un conjuro con espacio antes del descanso largo, tiras automáticamente en la tabla de Sobrecarga de magia salvaje.' },
            { nombre: 'Sobrecarga de magia salvaje', desc: 'Tu lanzamiento de conjuros puede desencadenar sobrecargas de magia descontrolada. Una vez por turno, puedes tirar 1d20 nada más lanzar un conjuro de hechicero con un espacio de conjuro. Si sacas un 20, tira en la tabla de Sobrecarga de magia salvaje. Si el efecto es un conjuro, será demasiado salvaje para verse afectado por tu metamagia.' },
          ],
          6: [
            { nombre: 'Doblegar la suerte', desc: 'Inmediatamente después de que otra criatura que puedas ver tire para una prueba con d20, puedes usar una reacción y gastar 1 punto de hechicería para tirar 1d4 y aplicar el resultado como bonificador o penalizador (tú eliges) a ese d20.' },
          ],
          14: [
            { nombre: 'Caos controlado', desc: 'Siempre que tires en la tabla de Sobrecarga de magia salvaje, puedes lanzar dos veces y usar el resultado que quieras.' },
          ],
          18: [
            { nombre: 'Sobrecarga domada', desc: 'Inmediatamente después de lanzar un conjuro de hechicero con un espacio, puedes crear un efecto de tu elección de la tabla de Sobrecarga de magia salvaje en lugar de tirar. Puedes elegir cualquier efecto excepto la última fila. Una vez por descanso largo.' },
          ],
        },
      },
      {
        id: 'draconico',
        nombre: 'Hechicería Dracónica',
        desc: 'Tu magia innata proviene de un regalo dracónico. Tal vez un dragón anciano te transfiriera parte de su poder mágico, o hayas absorbido magia de un lugar impregnado con poder dracónico.',
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros dracónicos', desc: 'Siempre tienes preparados conjuros dracónicos según tu nivel: Nv3: Aliento de dragón, alterar el propio aspecto, orbe cromático, orden imperiosa; Nv5: Terror, volar; Nv7: Hechizar monstruo, ojo arcano; Nv9: Conocer las leyendas, invocar dragón. No cuentan para el límite de preparados.' },
            { nombre: 'Resistencia dracónica', desc: 'Tus PG máximos aumentan en 3 y en 1 más por cada nivel de hechicero que subas. Además, mientras no lleves armadura, tu CA base es 10 + mod. DES + mod. CAR.' },
          ],
          6: [
            { nombre: 'Afinidad elemental', desc: 'Elige un tipo de daño: ácido, frío, fuego, relámpago o veneno. Tienes resistencia a ese tipo de daño. Además, cuando lances un conjuro que inflija daño de ese tipo, puedes sumar tu mod. CAR a una tirada de daño del conjuro.' },
          ],
          14: [
            { nombre: 'Alas de dragón', desc: 'Como acción adicional, te crecen alas dracónicas de la espalda que permanecen 1 hora o hasta que las hagas desaparecer (no requiere acción). Mientras dure, tienes velocidad volando de 18 m. Una vez por descanso largo, o gasta 3 puntos de hechicería para restablecer el uso.' },
          ],
          18: [
            { nombre: 'Compañero dragón', desc: 'Puedes lanzar invocar dragón sin componente material. También puedes lanzarlo una vez sin gastar un espacio de conjuro (se recupera tras descanso largo). Puedes modificarlo para que no requiera concentración; si lo haces, su duración es de 1 minuto para ese lanzamiento.' },
          ],
        },
      },
      {
        id: 'mecanica',
        nombre: 'Hechicería Mecánica',
        desc: 'La fuerza cósmica del orden te ha imbuido de magia. Ese poder surge de Mechanus o de un reino similar, un plano modelado enteramente por la eficacia de la mecánica de un reloj.',
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros mecánicos', desc: 'Siempre tienes preparados conjuros mecánicos según tu nivel: Nv3: Alarma, auxilio, protección contra el bien y el mal, restablecimiento menor; Nv5: Disipar magia, protección contra energía; Nv7: Invocar autómata, libertad de movimiento; Nv9: Muro de fuerza, restablecimiento mayor. No cuentan para el límite de preparados.' },
            { nombre: 'Restablecer equilibrio', desc: 'Tu conexión con el orden absoluto te permite ecualizar momentos caóticos. Cuando una criatura que puedas ver a 18 m esté a punto de tirar un d20 con ventaja o desventaja, puedes usar una reacción para impedir que la tirada tenga ventaja o desventaja. Usos = mod. CAR (mín. 1) por descanso largo.' },
          ],
          6: [
            { nombre: 'Bastión de la ley', desc: 'Como acción de magia, gastas de 1 a 5 puntos de hechicería para crear una protección mágica a tu alrededor o alrededor de otra criatura visible a 9 m. La protección consiste en d8 iguales a los puntos gastados; si la criatura recibe daño, puede gastar varios dados, tirarlos y restar el resultado al daño. Dura hasta descanso largo o hasta que vuelvas a usar este rasgo.' },
          ],
          14: [
            { nombre: 'Trance de orden', desc: 'Como acción adicional, entras en un trance durante 1 minuto: las tiradas de ataque contra ti no pueden tener ventaja, y siempre que realices una prueba con d20, puedes sustituir un resultado de 9 o menos por un 10. Una vez por descanso largo, o gasta 5 puntos de hechicería para restablecer el uso.' },
          ],
          18: [
            { nombre: 'Cabalgata mecánica', desc: 'Como acción de magia, invocas espíritus del orden en un cubo de 9 m que se origina en ti. Los espíritus crean estos efectos antes de desvanecerse: Curar (hasta 100 PG repartidos entre criaturas del cubo), Reparar (todos los objetos dañados del cubo se reparan), Disipar (se acaban todos los conjuros de nivel 6 o inferior sobre criaturas/objetos del cubo). Una vez por descanso largo, o gasta 7 puntos de hechicería.' },
          ],
        },
      },
    ],
    rol: 'Lanzador de conjuros innato',
    magia: true,
    rasgosNivel1: NIVEL_DATOS.hechicero.rasgosNivel[1],
    ...NIVEL_DATOS.hechicero,
  },
  {
    id: 'mago',
    nombre: 'Mago',
    descripcion: 'Estudia la magia arcana y domina conjuros para lograr cualquier fin.',
    preferencia: 'Libros de conjuros',
    complejidad: 'Media',
    caracteristicaPrincipal: ['Inteligencia'],
    requisitoMulticlase: { caracteristicas: ['Inteligencia'], modo: 'and' },
    competenciasMulticlase: { armaduras: [] },
    dadoGolpe: 'd6',
    tiradasSalvacion: ['Inteligencia', 'Sabiduría'],
    entrenamientoArmaduras: [],
    competenciasHabilidades: {
      elegir: 2,
      opciones: ['Conocimiento arcano', 'Historia', 'Investigación', 'Medicina', 'Naturaleza', 'Perspicacia', 'Religión'],
    },
    subclases: [
      {
        id: 'abjurador',
        nombre: 'Abjurador',
        desc: 'Tu estudio se centra en conjuros de detención, destierro o protección. Los abjuradores acaban con efectos dañinos, expulsan influencias malignas y defienden a los débiles.',
        rasgosNivel: {
          3: [
            { nombre: 'Experto en abjuración', desc: 'Añades 2 conjuros de abjuración de nivel ≤2 a tu libro sin coste. Cada vez que consigas un nuevo nivel de espacios de conjuro, puedes añadir un conjuro de abjuración a tu libro sin coste (debe ser de un nivel para el que tengas espacios).' },
            { nombre: 'Salvaguarda arcana', desc: 'Al lanzar un conjuro de abjuración con un espacio, puedes crear una salvaguarda sobre ti hasta tu próximo descanso largo. Tiene PG máximos = 2 × tu nivel de mago + mod. INT. Absorbe el daño que recibirías (aplica resistencia/vulnerabilidad antes). Cada vez que lances un conjuro de abjuración con espacio, la salvaguarda recupera PG = 2 × nivel del espacio. También puedes gastar un espacio como acción adicional para restaurarla. Una vez creada, debes descansar largo para volver a formarla.' },
          ],
          6: [
            { nombre: 'Salvaguarda proyectada', desc: 'Cuando una criatura que puedas ver a 9 m o menos reciba daño, puedes usar una reacción para que tu salvaguarda arcana absorba dicho daño. Si se reduce a 0 PG, la criatura protegida recibe el daño restante.' },
          ],
          10: [
            { nombre: 'Rompeconjuros', desc: 'Siempre tienes preparados contrahechizo y disipar magia. Puedes lanzar disipar magia como acción adicional y sumar tu bonificador por competencia a su prueba de característica. Cuando lanzas cualquiera de esos conjuros con un espacio, el espacio no se gasta si el conjuro no consigue neutralizar otro.' },
          ],
          14: [
            { nombre: 'Resistencia a conjuros', desc: 'Tienes ventaja en las tiradas de salvación contra conjuros y posees resistencia contra el daño de conjuros.' },
          ],
        },
      },
      {
        id: 'adivino',
        nombre: 'Adivino',
        desc: 'Quienes buscan una comprensión más clara de su pasado, presente y futuro acuden al consejo de los adivinos. Te esfuerzas por retirar los velos del espacio, el tiempo y la consciencia.',
        rasgosNivel: {
          3: [
            { nombre: 'Experto en adivinación', desc: 'Añades 2 conjuros de adivinación de nivel ≤2 a tu libro sin coste. Cada vez que consigas un nuevo nivel de espacios de conjuro, puedes añadir un conjuro de adivinación a tu libro sin coste (debe ser de un nivel para el que tengas espacios).' },
            { nombre: 'Presagio', desc: 'Tras finalizar un descanso largo, tira 2d20 y anota los resultados. Puedes sustituir cualquier prueba con d20 que hagáis tú o una criatura que puedas ver por uno de los resultados presagiados (antes de la tirada, una vez por turno). Cada resultado solo puede usarse una vez. Los pierdes tras el siguiente descanso largo.' },
          ],
          6: [
            { nombre: 'Adivino avezado', desc: 'Cuando lances un conjuro de adivinación usando un espacio de nivel 2 o superior, recuperas un espacio de conjuro gastado de nivel inferior al gastado (máximo nivel 5).' },
          ],
          10: [
            { nombre: 'El tercer ojo', desc: 'Como acción adicional, elige un beneficio hasta tu próximo descanso corto o largo: Comprensión superior (leer cualquier idioma), Ver invisibilidad (lanzar ver invisibilidad sin espacio), o Visión en la oscuridad (36 m). Una vez por descanso corto o largo.' },
          ],
          14: [
            { nombre: 'Presagio mayor', desc: 'Tiras 3d20 en lugar de 2d20 cuando uses el rasgo Presagio.' },
          ],
        },
      },
      {
        id: 'evocador',
        nombre: 'Evocador',
        desc: 'Haces hincapié en la magia capaz de crear poderosos efectos elementales: frío penetrante, llamas abrasadoras, ácidos corrosivos, truenos reverberantes o violentos relámpagos.',
        rasgosNivel: {
          3: [
            { nombre: 'Experto en evocación', desc: 'Añades 2 conjuros de evocación de nivel ≤2 a tu libro sin coste. Cada vez que consigas un nuevo nivel de espacios de conjuro, puedes añadir un conjuro de evocación a tu libro sin coste (debe ser de un nivel para el que tengas espacios).' },
            { nombre: 'Truco potente', desc: 'Cuando lances un truco a una criatura y falles la tirada de ataque o el objetivo supere la TS, el objetivo recibirá la mitad del daño del truco (si causa alguno), pero no sufrirá ningún otro efecto adicional.' },
          ],
          6: [
            { nombre: 'Esculpir conjuros', desc: 'Cuando lances un conjuro de evocación que afecte a otras criaturas que puedas ver, puedes elegir una cantidad de ellas igual a 1 + el nivel del conjuro. Las criaturas elegidas tienen éxito automáticamente en sus TS contra el conjuro y no reciben daño si normalmente recibirían la mitad al salvar.' },
          ],
          10: [
            { nombre: 'Evocación potenciada', desc: 'Siempre que lances un conjuro de mago de la escuela de evocación, puedes sumar tu modificador por Inteligencia a una tirada de daño del conjuro.' },
          ],
          14: [
            { nombre: 'Sobrecanalizar', desc: 'Cuando lances un conjuro de mago que cause daño usando un espacio de nivel 1–5, puedes infligir el máximo daño posible. La primera vez es gratis; las siguientes sin descanso largo causan 2d12 de daño necrótico por nivel del espacio (ignora resistencia/inmunidad), y aumenta 1d12 por cada uso adicional.' },
          ],
        },
      },
      {
        id: 'ilusionista',
        nombre: 'Ilusionista',
        desc: 'Te especializas en la magia que deslumbra los sentidos o engaña la mente. Tus ilusiones hacen que lo imposible parezca real.',
        rasgosNivel: {
          3: [
            { nombre: 'Experto en ilusionismo', desc: 'Añades 2 conjuros de ilusionismo de nivel ≤2 a tu libro sin coste. Cada vez que consigas un nuevo nivel de espacios de conjuro, puedes añadir un conjuro de ilusionismo a tu libro sin coste (debe ser de un nivel para el que tengas espacios).' },
            { nombre: 'Ilusiones mejoradas', desc: 'Puedes lanzar conjuros de ilusionismo sin componentes verbales. Si un conjuro de ilusionismo tiene alcance de 3 m o más, su alcance aumenta en 18 m. Conoces el truco ilusión menor (si ya lo conoces, aprendes otro truco de mago). Puedes lanzar ilusión menor como acción adicional, creando sonido e imagen en el mismo lanzamiento.' },
          ],
          6: [
            { nombre: 'Criaturas fantasmales', desc: 'Siempre tienes preparados invocar bestia e invocar feérico. Puedes cambiar su escuela a ilusionismo (aspecto espectral). Puedes lanzar la versión de ilusionismo de cada uno sin espacio, pero la criatura tendrá la mitad de PG. Tras lanzar uno así, debes descansar largo para volver a hacerlo de esa forma.' },
          ],
          10: [
            { nombre: 'Yo ilusorio', desc: 'Cuando una criatura te acierte con una tirada de ataque, puedes usar una reacción para interponer un doble ilusorio: el ataque falla automáticamente y la ilusión se disipa. Una vez por descanso corto o largo. También puedes restablecer el uso gastando un espacio de nivel 2+ (no requiere acción).' },
          ],
          14: [
            { nombre: 'Realidad ilusoria', desc: 'Cuando lances un conjuro de ilusionismo con un espacio, puedes elegir un objeto no mágico e inanimado de la ilusión para hacerlo real (acción adicional mientras el conjuro esté activo). El objeto es real durante 1 minuto y no puede causar daño ni aplicar estados.' },
          ],
        },
      },
    ],
    rol: 'Lanzador de conjuros académico',
    magia: true,
    rasgosNivel1: NIVEL_DATOS.mago.rasgosNivel[1],
    ...NIVEL_DATOS.mago,
  },
  {
    id: 'monje',
    nombre: 'Monje',
    descripcion: 'Entra y sal del cuerpo a cuerpo mientras atacas con rapidez y contundencia.',
    preferencia: 'Combate sin armas',
    complejidad: 'Alta',
    caracteristicaPrincipal: ['Destreza', 'Sabiduría'],
    requisitoMulticlase: { caracteristicas: ['Destreza', 'Sabiduría'], modo: 'and' },
    competenciasMulticlase: { armaduras: [] },
    dadoGolpe: 'd8',
    tiradasSalvacion: ['Fuerza', 'Destreza'],
    entrenamientoArmaduras: [],
    competenciasHabilidades: {
      elegir: 2,
      opciones: ['Acrobacias', 'Atletismo', 'Historia', 'Perspicacia', 'Religión', 'Sigilo'],
    },
    subclases: [
      {
        id: 'mano_abierta',
        nombre: 'Guerrero de la Mano Abierta',
        desc: 'Maestro del combate sin armas. Dominas técnicas para derribar, desconcertar y empujar a tus enemigos con cada golpe de Ráfaga de golpes.',
        rasgosNivel: {
          3: [
            { nombre: 'Técnica de la mano abierta', desc: 'Siempre que aciertes a una criatura con un ataque de Ráfaga de golpes, puedes imponerle uno de los siguientes efectos: Derribar (salvación de Destreza o queda derribado), Desconcertar (no puede realizar ataques de oportunidad hasta el inicio de su siguiente turno), Empujar (salvación de Fuerza o es empujado hasta 4,5 m de ti).' },
          ],
          6: [
            { nombre: 'Plenitud de cuerpo', desc: 'Como acción adicional, tiras tu dado de Artes marciales y recuperas PV = resultado + mod. SAB (mín. 1 PV). Puedes usarlo un número de veces igual a tu mod. SAB (mín. 1); recuperas todos los usos tras descanso largo.' },
          ],
          11: [
            { nombre: 'Paso veloz', desc: 'Cuando uses una acción adicional que no sea Paso del viento, puedes usar también Paso del viento inmediatamente después de esa acción adicional.' },
          ],
          17: [
            { nombre: 'Palma estremecedora', desc: 'Al acertar con un ataque sin armas, puedes gastar 4 puntos de concentración para iniciar vibraciones imperceptibles que duran tantos días como tu nivel de monje. Como acción (o renunciando a uno de tus ataques al atacar), pones fin a las vibraciones si estáis en el mismo plano: el objetivo hace una salvación de Constitución; sufre 10d12 de daño de fuerza si falla, o la mitad si supera. Solo puedes tener a una criatura bajo este efecto a la vez. Puedes poner fin a las vibraciones de forma inocua (no requiere acción).' },
          ],
        },
      },
      {
        id: 'misericordia',
        nombre: 'Guerrero de la Misericordia',
        desc: 'Manipulas la fuerza vital de los demás. Eres un médico ambulante que puede sanar aliados y envenenar enemigos con tus toques.',
        rasgosNivel: {
          3: [
            { nombre: 'Instrumentos de misericordia', desc: 'Ganas competencia en Medicina y Perspicacia y con los útiles de herborista.' },
            { nombre: 'Mano de aflicción', desc: 'Una vez por turno al acertar con un ataque sin armas y causar daño, puedes gastar 1 punto de concentración para infligir daño adicional = tirada de dado AM + mod. SAB (daño necrótico).' },
            { nombre: 'Mano de curación', desc: 'Como acción de magia, gastas 1 punto de concentración para tocar a una criatura: recupera PV = tirada de dado AM + mod. SAB. Cuando uses Ráfaga de golpes, puedes sustituir uno de los ataques sin armas por un uso de este rasgo sin gastar un punto de concentración.' },
          ],
          6: [
            { nombre: 'Toque de Galeno', desc: 'Mejoras a tus rasgos de Mano: Mano de aflicción (también inflige el estado envenenado hasta el fin de tu siguiente turno); Mano de curación (también puede eliminar uno de los siguientes estados de la criatura curada: aturdida, cegada, ensordecida, envenenada o paralizada).' },
          ],
          11: [
            { nombre: 'Ráfaga de curación y aflicción', desc: 'Cuando uses Ráfaga de golpes, puedes sustituir cada ataque sin armas por Mano de curación sin gastar puntos de concentración, y puedes usar Mano de aflicción en ataques de Ráfaga sin gastar puntos (pero solo una vez por turno). Estos beneficios tienen un total de usos = mod. SAB (mín. 1) por descanso largo.' },
          ],
          17: [
            { nombre: 'Mano de misericordia suprema', desc: 'Como acción de magia, gastas 5 puntos de concentración para tocar el cadáver de una criatura muerta en las últimas 24 horas: vuelve a la vida con PV = 4d10 + mod. SAB, sin los estados aturdida, cegada, ensordecida, envenenada o paralizada si los tenía al morir. Solo puedes usarlo una vez hasta el siguiente descanso largo.' },
          ],
        },
      },
      {
        id: 'sombra',
        nombre: 'Guerrero de la Sombra',
        desc: 'Recurres al poder del Páramo Sombrío para el sigilo y el subterfugio. Te mueves entre las sombras y puedes envolverte en oscuridad.',
        rasgosNivel: {
          3: [
            { nombre: 'Artes sombrías', desc: 'Tres beneficios: Ilusiones sombrías (conoces el truco Ilusión menor; SAB es tu aptitud mágica); Oscuridad (gastas 1 punto de concentración para lanzar Oscuridad sin componentes; puedes ver dentro; al inicio de cada turno puedes mover la zona hasta 18 m de ti mientras dure); Visión en la oscuridad (18 m; si ya tienes, aumenta en 18 m).' },
          ],
          6: [
            { nombre: 'Paso entre sombras', desc: 'Acción adicional cuando estés completamente en zona de luz tenue u oscuridad: te teletransportas hasta 18 m a un espacio sin ocupar que puedas ver en condiciones de luz tenue u oscuridad. Tienes ventaja en el siguiente ataque cuerpo a cuerpo antes del fin del turno.' },
          ],
          11: [
            { nombre: 'Paso entre sombras mejorado', desc: 'Cuando uses Paso entre sombras, puedes gastar 1 punto de concentración para eliminar el requisito de comenzar y terminar en zona de luz tenue u oscuridad. Como parte de esa acción adicional, puedes hacer un ataque sin armas inmediatamente después de teletransportarte.' },
          ],
          17: [
            { nombre: 'Capa de sombras', desc: 'Acción de magia en zona de luz tenue u oscuridad: gastas 3 puntos de concentración para envolverte en sombras durante 1 minuto o hasta que quedes incapacitado o termines tu turno en luz brillante. Beneficios: Incorporeidad parcial (puedes atravesar espacios ocupados como terreno difícil; si terminas turno en uno, vas al último espacio libre), Invisibilidad, Ráfaga de sombras (puedes usar Ráfaga de golpes sin gastar puntos de concentración).' },
          ],
        },
      },
      {
        id: 'elementos',
        nombre: 'Guerrero de los Elementos',
        desc: 'Canalizas el poder de los Planos Elementales. Controlas momentáneamente la energía elemental para fortalecerte en y fuera del combate.',
        rasgosNivel: {
          3: [
            { nombre: 'Armonía con los elementos', desc: 'Al inicio de tu turno, puedes gastar 1 punto de concentración para imbuirte de energía elemental durante 10 min o hasta que quedes incapacitado. Beneficios mientras activa: Alcance (tus ataques sin armas tienen +3 m de alcance); Golpes elementales (puedes elegir que tu ataque sin armas cause daño de ácido, frío, fuego, relámpago o trueno; además el objetivo hace una salvación de Fuerza o lo mueves hasta 3 m hacia ti o en dirección contraria).' },
            { nombre: 'Manipular los elementos', desc: 'Conoces el conjuro Elementalismo. La Sabiduría es tu aptitud mágica para lanzarlo.' },
          ],
          6: [
            { nombre: 'Explosión elemental', desc: 'Acción de magia: gastas 2 puntos de concentración para detonar energía elemental en una esfera de 6 m de radio centrada en un punto a 36 m o menos de ti. Elige un tipo de daño (ácido, frío, fuego, relámpago o trueno). Todas las criaturas en el área hacen una salvación de Destreza: 3 tiradas de dado AM de daño del tipo elegido si fallan, o la mitad si superan.' },
          ],
          11: [
            { nombre: 'Paso de los elementos', desc: 'Mientras tu Armonía con los elementos esté activa, ganas también una velocidad de natación y una velocidad de vuelo iguales a tu velocidad.' },
          ],
          17: [
            { nombre: 'Paradigma elemental', desc: 'Mientras tu Armonía con los elementos esté activa, también obtienes: Golpes potenciados (una vez por turno al acertar con ataque sin armas, infliges daño adicional = tirada de dado AM del mismo tipo); Paso destructivo (al usar Paso del viento, velocidad +6 m hasta fin del turno; criaturas de tu elección a 1,5 m sufren tirada de dado AM al entrar en su espacio, una vez por turno; elige tipo: ácido, frío, fuego, relámpago o trueno); Resistencia al daño (elige ácido, frío, fuego, relámpago o trueno; puedes cambiar al inicio de cada turno).' },
          ],
        },
      },
    ],
    rol: 'Artista marcial ágil',
    magia: false,
    rasgosNivel1: NIVEL_DATOS.monje.rasgosNivel[1],
    ...NIVEL_DATOS.monje,
  },
  {
    id: 'paladin',
    nombre: 'Paladín',
    descripcion: 'Castiga a los enemigos y protege a los aliados con tu poderío divino y marcial.',
    preferencia: 'Defensa',
    complejidad: 'Media',
    caracteristicaPrincipal: ['Fuerza', 'Carisma'],
    requisitoMulticlase: { caracteristicas: ['Fuerza', 'Carisma'], modo: 'and' },
    competenciasMulticlase: { armaduras: ['Ligeras', 'Medias', 'Escudos'], armas: ['Marciales'] },
    dadoGolpe: 'd10',
    tiradasSalvacion: ['Sabiduría', 'Carisma'],
    entrenamientoArmaduras: ['Ligeras', 'Medias', 'Pesadas', 'Escudos'],
    competenciasHabilidades: {
      elegir: 2,
      opciones: ['Atletismo', 'Intimidación', 'Medicina', 'Perspicacia', 'Persuasión', 'Religión'],
    },
    subclases: [
      {
        id: 'entrega',
        nombre: 'Juramento de Entrega',
        desc: 'Defiende los ideales de la justicia y el orden. Encarnas el ideal del caballero de brillante armadura, te exiges a ti mismo los más altos estándares de conducta y algunos, para bien o para mal, esperan lo mismo del resto del mundo.',
        rasgosNivel: {
          3: [
            { nombre: 'Arma sagrada', desc: 'Al realizar la acción de atacar, puedes gastar un uso de Canalizar divinidad para imbuir de energía positiva un arma cuerpo a cuerpo que sostengas durante 10 min (o hasta que vuelvas a usar este rasgo). Durante ese tiempo: sumas tu mod. CAR (mín. +1) a las tiradas de ataque con esa arma; cada golpe puede causar su daño normal o daño radiante; el arma emite luz brillante en un radio de 6 m y luz tenue 6 m más allá.' },
            { nombre: 'Conjuros del juramento de entrega', desc: 'Siempre preparados según nivel: Lv3: Escudo de fe, Protección contra el bien y el mal; Lv5: Auxilio, Zona de la verdad; Lv9: Disipar magia, Señal de esperanza; Lv13: Guardián de la fe, Libertad de movimiento; Lv17: Comunión, Golpe flamígero.' },
          ],
          7: [
            { nombre: 'Aura de entrega', desc: 'Tú y tus aliados dentro de tu Aura de protección tenéis inmunidad al estado hechizados. Si un aliado hechizado entra en el aura, ese estado no tiene efecto mientras esté dentro.' },
          ],
          15: [
            { nombre: 'Castigo protector', desc: 'Siempre que lances Castigo divino, tú y tus aliados dentro de tu Aura de protección tenéis cobertura media hasta el inicio de tu siguiente turno.' },
          ],
          20: [
            { nombre: 'Halo sagrado', desc: 'Como acción adicional, imbuyes de poder divino tu Aura de protección durante 10 min (no requiere acción para terminar). Una vez por descanso largo; también puedes restablecer el uso gastando un espacio de nivel 5. Beneficios: Daño radiante (enemigos que empiecen su turno dentro sufren daño radiante = mod. CAR + bonif. competencia), Luz solar (el aura está llena de luz brillante del sol), Protección sagrada (ventaja en salvaciones que te obliguen a hacer infernales o muertos vivientes).' },
          ],
        },
      },
      {
        id: 'gloria',
        nombre: 'Juramento de Gloria',
        desc: 'Esfuérzate por alcanzar la cima del heroísmo. Crees que tú y tus compañeros estáis destinados a alcanzar la gloria mediante actos de heroísmo.',
        rasgosNivel: {
          3: [
            { nombre: 'Atleta sin parangón', desc: 'Acción adicional + Canalizar divinidad: durante 1 hora tienes ventaja en pruebas de Fuerza (Atletismo) y Destreza (Acrobacias), y la distancia de tus saltos de longitud y de altura aumenta en 3 m.' },
            { nombre: 'Castigo inspirador', desc: 'Inmediatamente después de lanzar Castigo divino, puedes gastar un uso de Canalizar divinidad para distribuir PV temporales entre criaturas a 9 m a tu elección. Total de PV temporales = 2d8 + tu nivel de paladín, repartidos como quieras.' },
            { nombre: 'Conjuros del juramento de gloria', desc: 'Siempre preparados: Lv3: Heroísmo, Saeta guía; Lv5: Arma mágica, Potenciar característica; Lv9: Acelerar, Protección contra energía; Lv13: Compulsión, Libertad de movimiento; Lv17: Conocer las leyendas, Presencia regia de Yolande.' },
          ],
          7: [
            { nombre: 'Aura de celeridad', desc: 'Tu velocidad aumenta en 3 m. Además, cuando un aliado entre en tu Aura de protección por primera vez en un turno o empiece su turno dentro de ella, su velocidad aumenta en 3 m hasta el final de su próximo turno.' },
          ],
          15: [
            { nombre: 'Defensa gloriosa', desc: 'Reacción cuando un ataque vaya a acertar a ti o a una criatura a 3 m o menos de ti: sumas tu mod. CAR (mín. +1) a la CA del objetivo, lo que podría hacer fallar el ataque. Si falla, como parte de esta reacción puedes hacer un ataque de arma contra el atacante si está en tu alcance. Usos = mod. CAR (mín. 1) por descanso largo.' },
          ],
          20: [
            { nombre: 'Leyenda viviente', desc: 'Acción adicional: obtienes los beneficios siguientes durante 10 min. Una vez por descanso largo; también puedes restablecerlo gastando un espacio de nivel 5. Beneficios: Carismático (ventaja en todas las pruebas de Carisma); Golpe certero (una vez por turno, si fallas una tirada de ataque con un arma, el ataque acierta); Repetir tiradas de salvación (reacción para repetir una tirada de salvación fallida; debes usar el nuevo resultado).' },
          ],
        },
      },
      {
        id: 'antiguos',
        nombre: 'Juramento de los Antiguos',
        desc: 'Preserva la vida y la luz en el mundo. Este juramento es tan arcaico como los primeros elfos; valoras la luz y amas las cosas bellas y revitalizantes del mundo más que cualquier principio de honor, valentía y justicia.',
        rasgosNivel: {
          3: [
            { nombre: 'Ira de la naturaleza', desc: 'Acción de magia + Canalizar divinidad: invocas enredaderas espectrales alrededor de criaturas de tu elección a 4,5 m o menos. Deben superar una salvación de Fuerza o quedan apresadas durante 1 min. Una criatura apresada repite la salvación al final de cada uno de sus turnos y se libera si tiene éxito.' },
            { nombre: 'Conjuros del juramento de los antiguos', desc: 'Siempre preparados: Lv3: Golpe apresador, Hablar con los animales; Lv5: Paso brumoso, Rayo de luna; Lv9: Crecimiento vegetal, Protección contra energía; Lv13: Piel pétrea, Tormenta de hielo; Lv17: Comunión con la naturaleza, Paso arbóreo.' },
          ],
          7: [
            { nombre: 'Aura de salvaguarda', desc: 'La magia ancestral te rodea con tal fuerza que tú y tus aliados dentro de tu Aura de protección tenéis resistencia al daño necrótico, psíquico y radiante.' },
          ],
          15: [
            { nombre: 'Centinela imperecedero', desc: 'Cuando tus PV se reducen a 0 pero no mueres inmediatamente, puedes quedarte con 1 PV y recuperas PV adicionales = 3 × tu nivel de paladín. Una vez por descanso largo. Además, no puedes envejecer por medios mágicos ni de forma visible.' },
          ],
          20: [
            { nombre: 'Campeón ancestral', desc: 'Acción adicional: imbuyes tu Aura de protección de poder primordial durante 1 min. Una vez por descanso largo; también puedes restablecerlo gastando un espacio de nivel 5. Beneficios: Conjuros veloces (puedes lanzar como acción adicional un conjuro que normalmente requiere una acción); Mermar la oposición (los enemigos dentro del aura tienen desventaja en salvaciones contra tus conjuros y Canalizar divinidad); Regeneración (recuperas 10 PV al inicio de cada uno de tus turnos).' },
          ],
        },
      },
      {
        id: 'venganza',
        nombre: 'Juramento de Venganza',
        desc: 'Castiga a los malhechores a toda costa. Pronuncias este juramento decidido a enderezar aquello que se ha torcido cuando las fuerzas del mal campan a sus anchas.',
        rasgosNivel: {
          3: [
            { nombre: 'Voto de enemistad', desc: 'Al realizar la acción de atacar, puedes gastar un uso de Canalizar divinidad para pronunciar un voto de enemistad contra una criatura a 9 m o menos de ti: tienes ventaja en las tiradas de ataque contra ella durante 1 min o hasta que vuelvas a usar este rasgo. Si sus PV se reducen a 0, puedes transferir el voto a otra criatura a 9 m (no requiere acción).' },
            { nombre: 'Conjuros del juramento de venganza', desc: 'Siempre preparados: Lv3: Marca del cazador, Perdición; Lv5: Inmovilizar persona, Paso brumoso; Lv9: Acelerar, Protección contra energía; Lv13: Destierro, Puerta dimensional; Lv17: Escudriñar, Inmovilizar monstruo.' },
          ],
          7: [
            { nombre: 'Vengador implacable', desc: 'Cuando aciertes un ataque de oportunidad contra una criatura, puedes reducir su velocidad a 0 hasta el fin del turno actual. A continuación puedes moverte hasta la mitad de tu velocidad como parte de la misma reacción sin provocar ataques de oportunidad.' },
          ],
          15: [
            { nombre: 'Espíritu vengativo', desc: 'Reacción cuando una criatura bajo los efectos de tu Voto de enemistad acierte o falle una tirada de ataque: puedes realizar un ataque cuerpo a cuerpo contra esa criatura si está dentro de tu alcance.' },
          ],
          20: [
            { nombre: 'Ángel vengador', desc: 'Acción adicional: obtienes beneficios durante 10 min. Una vez por descanso largo; también puedes restablecerlo gastando un espacio de nivel 5. Beneficios: Aura aterradora (enemigos que empiecen su turno en el aura hacen una salvación de SAB o quedan asustados 1 min o hasta recibir daño; ventaja en ataques vs criaturas asustadas así); Vuelo (te crecen alas espectrales: velocidad de vuelo 18 m y puedes levitar).' },
          ],
        },
      },
    ],
    rol: 'Combatiente divino sagrado',
    magia: true,
    rasgosNivel1: NIVEL_DATOS.paladin.rasgosNivel[1],
    ...NIVEL_DATOS.paladin,
  },
  {
    id: 'picaro',
    nombre: 'Pícaro',
    descripcion: 'Lanza ataques furtivos letales mientras usas el sigilo para evitar que te hieran.',
    preferencia: 'Sigilo',
    complejidad: 'Baja',
    caracteristicaPrincipal: ['Destreza'],
    requisitoMulticlase: { caracteristicas: ['Destreza'], modo: 'and' },
    competenciasMulticlase: { armaduras: ['Ligeras'], habilidadesElegir: 1, herramientas: ['Herramientas de ladrón'] },
    dadoGolpe: 'd8',
    tiradasSalvacion: ['Destreza', 'Inteligencia'],
    entrenamientoArmaduras: ['Ligeras'],
    competenciasHabilidades: {
      elegir: 4,
      opciones: ['Acrobacias', 'Atletismo', 'Engaño', 'Intimidación', 'Investigación', 'Juego de manos', 'Percepción', 'Perspicacia', 'Persuasión', 'Sigilo'],
    },
    subclases: [
      {
        id: 'asesino',
        nombre: 'Asesino',
        desc: 'Practica el sombrío arte de la muerte. Tu entrenamiento se centra en el uso del sigilo, el veneno y los disfraces para eliminar oponentes con una eficacia mortífera.',
        rasgosNivel: {
          3: [
            { nombre: 'Asesinar', desc: 'Golpes sorprendentes: durante el primer asalto de cada combate, tienes ventaja en tiradas de ataque contra cualquier criatura que aún no haya jugado un turno; si tu Ataque furtivo acierta en ese asalto, el objetivo sufre daño adicional del tipo del arma igual a tu nivel de pícaro. Iniciativa: tienes ventaja en las tiradas de iniciativa.' },
            { nombre: 'Herramientas de asesino', desc: 'Obtienes útiles de envenenador y útiles para disfrazarse, y tienes competencia con ellos.' },
          ],
          9: [
            { nombre: 'Pericia en infiltrarse', desc: 'Dos beneficios: Imitación magistral (puedes imitar a la perfección el habla de otra persona, su caligrafía o ambas si pasas al menos 1 hora estudiándolas); Puntería ambulante (tu velocidad no se reduce a 0 cuando usas Puntería certera).' },
          ],
          13: [
            { nombre: 'Envenenar armas', desc: 'Cuando uses la opción de veneno de tu Golpe astuto, el objetivo también recibe 2d6 de daño de veneno adicional si falla la salvación. Este daño ignora la resistencia al daño de veneno.' },
          ],
          17: [
            { nombre: 'Golpe mortal', desc: 'Cuando aciertes con tu Ataque furtivo en el primer asalto de un combate, el objetivo debe hacer una salvación de Constitución (CD 8 + mod. DES + bonif. competencia). Si falla, el daño del ataque se duplica.' },
          ],
        },
      },
      {
        id: 'embaucador',
        nombre: 'Embaucador Arcano',
        desc: 'Mejora tu sigilo mediante conjuros arcanos. Usas trucos mágicos para complementar tus habilidades de sigilo y agilidad.',
        rasgosNivel: {
          3: [
            { nombre: 'Lanzamiento de conjuros', desc: 'Usas la Inteligencia. Conoces 3 trucos: Mano de mago (obligatorio) + 2 de tu elección de la lista de mago. Preparas 3 conjuros de mago de nivel 1 para empezar; el número crece según tabla. Recuperas espacios tras descanso largo. A nivel 10 aprendes otro truco de mago.' },
            { nombre: 'Destreza con mano de mago', desc: 'Cuando lanzas Mano de mago, puedes hacerlo como acción adicional y hacer la mano invisible. Puedes controlarla como acción adicional para hacer pruebas de Destreza (Juego de manos).' },
          ],
          9: [
            { nombre: 'Emboscada mágica', desc: 'Si tienes el estado de invisible cuando lances un conjuro sobre una criatura, tendrá desventaja en cualquier salvación que haga contra ese conjuro ese mismo turno.' },
          ],
          13: [
            { nombre: 'Embaucador versátil', desc: 'Cuando uses la opción Tropiezo de tu Golpe astuto sobre una criatura, también puedes usar esa opción sobre otra criatura a 1,5 m o menos de tu mano espectral.' },
          ],
          17: [
            { nombre: 'Labrón de conjuros', desc: 'Reacción cuando una criatura lance un conjuro que te haga objetivo o cuya área te incluya: la obligas a hacer una salvación de Inteligencia (CD = tu CD de conjuros). Si falla, cancelas sus efectos sobre ti y robas el conjuro si es de nivel 1+ y de un nivel que puedas lanzar. Lo tienes preparado 8 horas y la criatura no puede lanzarlo durante ese tiempo. Una vez por descanso largo.' },
          ],
        },
      },
      {
        id: 'ladron',
        nombre: 'Ladrón',
        desc: 'Busca tesoros como los aventureros clásicos. Mezcla de ladrón, cazatesoros y explorador, representas el paradigma del aventurero.',
        rasgosNivel: {
          3: [
            { nombre: 'Balconero', desc: 'Dos beneficios: Escalador (velocidad trepando = tu velocidad); Saltador (puedes usar tu Destreza en lugar de Fuerza para determinar tu distancia de salto).' },
            { nombre: 'Manos rápidas', desc: 'Como acción adicional, puedes hacer una de las siguientes cosas: Juego de manos (prueba de DES (Juego de manos) para robar o usar herramientas de ladrón para forzar cerradura/trampa); Usar un objeto (acción Utilizar o acción de magia para usar un objeto mágico que necesite una acción).' },
          ],
          9: [
            { nombre: 'Sigilo supremo', desc: 'Nueva opción de Golpe astuto: Ataque sigiloso (coste: 1d6) — si tienes el estado invisible por haberte escondido, este ataque no termina ese estado si acabas el turno tras cobertura tres cuartos o completa.' },
          ],
          13: [
            { nombre: 'Usar objetos mágicos', desc: 'Tres beneficios: Cargas (cuando uses una propiedad de objeto mágico que gaste cargas, tira 1d6; si sacas un 6, úsala sin gastar cargas); Pergaminos (puedes usar cualquier pergamino de conjuro con INT como aptitud; nivel 1 o truco automáticamente; nivel mayor requiere prueba INT (Conocimiento arcano) CD 10 + nivel del conjuro o el pergamino se desintegra); Sintonización (puedes sintonizarte con hasta 4 objetos mágicos a la vez).' },
          ],
          17: [
            { nombre: 'Reflejos de ladrón', desc: 'Puedes actuar dos turnos durante el primer asalto de cualquier combate. Llevas a cabo tu primer turno según tu iniciativa normal y el segundo en tu iniciativa menos 10.' },
          ],
        },
      },
      {
        id: 'rebanaalmas',
        nombre: 'Rebanaalmas',
        desc: 'Golpea a tus enemigos con cuchillas psiónicas. Atacas empleando la mente, atravesando barreras tanto físicas como psíquicas.',
        rasgosNivel: {
          3: [
            { nombre: 'Cuchillas psíquicas', desc: 'Cuando uses la acción de atacar o hagas un ataque de oportunidad, puedes hacer aparecer una cuchilla psíquica en tu mano libre y atacar con ella (categoría: cuerpo a cuerpo sencilla; daño: 1d6 psíquico + mod. característica usado; propiedades: arrojadiza 18/36 m, sutil; maestría: molestar). Se desvanece tras acertar o fallar. Tras atacar con la cuchilla en tu turno, puedes hacer un segundo ataque (1d4 psíquico) como acción adicional si tienes la otra mano libre.' },
            { nombre: 'Poder psiónico', desc: 'Tienes dados de energía psiónica (empieza con 4d6; escalan hasta 12d12 al nivel 17). Recuperas 1 tras descanso corto y todos tras descanso largo. Don psirreforzado: si fallas una prueba de habilidad o herramienta en la que seas competente, tira un dado y súmalo; el dado se gasta solo si convierte el fallo en éxito. Susurros psíquicos: acción de magia, tira un dado, eliges criaturas visibles (hasta tu bonif. competencia) que pueden comunicarse contigo telepáticamente a 1,5 km durante horas = resultado; primera vez por descanso largo no gasta dado.' },
          ],
          9: [
            { nombre: 'Cuchillas del alma', desc: 'Nuevos poderes con cuchillas psíquicas: Golpes teledirigidos (si fallas un ataque con una cuchilla, tira un dado de energía psiónica y súmalo a la tirada; el dado se gasta solo si convierte el fallo en acierto); Teletransporte psíquico (acción adicional: manifiestas una cuchilla, gastas y tiras un dado, te teletransportas hasta 3 × resultado metros a un espacio vacío que puedas ver).' },
          ],
          13: [
            { nombre: 'Velo psíquico', desc: 'Como acción de magia, obtienes el estado invisible durante 1 hora o hasta que disipar el efecto (no requiere acción). Termina si infliges daño o fuerzas una salvación. Una vez por descanso largo; puedes restablecerlo gastando un dado de energía psiónica.' },
          ],
          17: [
            { nombre: 'Desgarro mental', desc: 'Cuando uses tus cuchillas psíquicas para infligir daño de Ataque furtivo, puedes obligar al objetivo a hacer una salvación de SAB (CD 8 + mod. DES + bonif. competencia). Si falla, queda aturdido 1 min (repite salvación al final de cada uno de sus turnos). Una vez por descanso largo; puedes restablecerlo gastando 3 dados de energía psiónica.' },
          ],
        },
      },
    ],
    rol: 'Especialista sigiloso y ágil',
    magia: false,
    rasgosNivel1: NIVEL_DATOS.picaro.rasgosNivel[1],
    ...NIVEL_DATOS.picaro,
  },
];

export const getClaseById = (id) => CLASES.find((c) => c.id === id);

// ── Opciones de invocación sobrenatural del Brujo (PHB 2024, págs. 71-73) ──
// En orden alfabético, tal como aparecen en el manual.
export const INVOCACIONES_BRUJO = [
  { nombre: 'Armadura de sombras', requisitos: null, repetible: false,
    descripcion: 'Puedes lanzar armadura de mago sobre ti sin gastar un espacio de conjuro.' },
  { nombre: 'Castigo arcano', requisitos: 'Brujo de nivel 5 o superior, invocación Pacto del filo', repetible: false,
    descripcion: 'Una vez por turno, cuando aciertes a una criatura con tu arma de pacto, puedes gastar un espacio de conjuro de Magia del pacto para causar 1d8 de daño de fuerza adicional al objetivo más 1d8 por cada nivel del espacio de conjuro. Además, puedes imponerle el estado de derribado al objetivo si es Enorme o más pequeño.' },
  { nombre: 'Descarga agónica', requisitos: 'Brujo de nivel 2 o superior, un truco de brujo que cause daño', repetible: true,
    descripcion: 'Elige uno de tus trucos de brujo que conozcas y cause daño. Puedes sumar tu modificador por Carisma a las tiradas de daño del conjuro. Repetible: cada vez que la obtengas, elige un truco distinto que cumpla las condiciones.' },
  { nombre: 'Descarga ahuyentadora', requisitos: 'Brujo de nivel 2 o superior, un truco de brujo que cause daño mediante una tirada de ataque', repetible: true,
    descripcion: 'Elige uno de tus trucos de brujo que conozcas y requiera una tirada de ataque. Cuando aciertes a una criatura Grande o más pequeña con ese truco, puedes empujarla hasta 3 m respecto a ti en línea recta. Repetible: cada vez que la obtengas, elige un truco distinto que cumpla las condiciones.' },
  { nombre: 'Devorador de vida', requisitos: 'Brujo de nivel 9 o superior, invocación Pacto del filo', repetible: false,
    descripcion: 'Una vez por turno, cuando aciertes a una criatura con tu arma de pacto, puedes causarle 1d6 de daño necrótico, psíquico o radiante adicional (a tu elección) y gastar uno de tus dados de puntos de golpe para tirarlo y recuperar una cantidad de puntos de golpe igual al resultado más tu modificador por Constitución (mínimo 1 punto de golpe).' },
  { nombre: 'Don de las profundidades', requisitos: 'Brujo de nivel 5 o superior', repetible: false,
    descripcion: 'Puedes respirar bajo el agua y obtienes una velocidad nadando igual a tu velocidad. También puedes lanzar respirar bajo el agua una vez sin gastar un espacio de conjuro; recuperas la capacidad de lanzarlo de este modo tras finalizar un descanso largo.' },
  { nombre: 'Don de los protectores', requisitos: 'Brujo de nivel 9 o superior, invocación Pacto del grimorio', repetible: false,
    descripcion: 'Aparece una nueva página en el Libro de las sombras cuando lo conjuras. Con tu permiso, una criatura puede usar una acción para escribir su nombre en esa página, que puede contener una cantidad de nombres igual a tu modificador por Carisma (mínimo un nombre). Cuando los puntos de golpe de cualquier criatura cuyo nombre esté en la página se reduzcan a 0, pero no muera, en vez de eso pasará a tener 1 punto de golpe mágicamente. Cuando esta magia se active, ninguna criatura podrá beneficiarse de ella hasta que finalices un descanso largo. Como acción de magia, puedes borrar un nombre de la página tocándolo.' },
  { nombre: 'Filo sediento', requisitos: 'Brujo de nivel 5 o superior, invocación Pacto del filo', repetible: false,
    descripcion: 'Obtienes el rasgo Ataque adicional, pero solo para tu arma de pacto. Este rasgo te permite hacer dos ataques con esa arma en lugar de uno cuando lleves a cabo la acción de atacar en tu turno.' },
  { nombre: 'Hoja devoradora', requisitos: 'Brujo de nivel 12 o superior, invocación Filo sediento', repetible: false,
    descripcion: 'El rasgo Ataque adicional de tu invocación Filo sediento otorga dos ataques adicionales en vez de uno.' },
  { nombre: 'Inversión del amo de las cadenas', requisitos: 'Brujo de nivel 5 o superior, invocación Pacto de la cadena', repetible: false,
    descripcion: 'Cuando lanzas encontrar familiar, imbuyes al familiar invocado de una cierta cantidad de tu poder sobrenatural, lo que le otorga los siguientes beneficios. Acuático o aéreo: el familiar obtiene una velocidad nadando o volando (a tu elección) de 12 m. Ataque rápido: como acción adicional, puedes ordenar al familiar que realice la acción de atacar. Daño necrótico o radiante: siempre que el familiar haga daño contundente, cortante o perforante, puedes hacer que cause daño necrótico o radiante en su lugar. Tu CD de salvación: si el familiar obliga a una criatura a una tirada de salvación, esta usa tu CD de salvación de conjuros. Resistencia: cuando el familiar recibe daño, puedes usar una reacción para otorgarle resistencia contra ese daño.' },
  { nombre: 'Lanza sobrenatural', requisitos: 'Brujo de nivel 2 o superior, un truco de brujo que cause daño', repetible: true,
    descripcion: 'Elige uno de tus trucos de brujo que conozcas, cause daño y tenga un alcance de 3 m o más. Cuando lances ese conjuro, su alcance aumenta una cantidad de metros igual a 10 veces tu nivel de brujo. Repetible: cada vez que la obtengas, elige un truco distinto que cumpla las condiciones.' },
  { nombre: 'Lecciones de los primeros', requisitos: 'Brujo de nivel 2 o superior', repetible: true,
    descripcion: 'Has obtenido conocimientos de un ente anciano del multiverso, lo que te permite obtener una dote de origen de tu elección. Repetible: cada vez que la obtengas, elige una dote de origen distinta.' },
  { nombre: 'Maestro de las formas innumerables', requisitos: 'Brujo de nivel 5 o superior', repetible: false,
    descripcion: 'Puedes lanzar alterar el propio aspecto sin gastar un espacio de conjuro.' },
  { nombre: 'Máscara de los mil rostros', requisitos: 'Brujo de nivel 2 o superior', repetible: false,
    descripcion: 'Puedes lanzar disfrazarse sin gastar un espacio de conjuro.' },
  { nombre: 'Mente sobrenatural', requisitos: null, repetible: false,
    descripcion: 'Tienes ventaja en las tiradas de salvación de Constitución que realices para mantener la concentración.' },
  { nombre: 'Mirada de las dos mentes', requisitos: 'Brujo de nivel 5 o superior', repetible: false,
    descripcion: 'Puedes usar una acción adicional para tocar a una criatura voluntaria y percibir el mundo a través de sus sentidos hasta el final de tu siguiente turno. Mientras la criatura permanezca en el mismo plano de existencia que tú, podrás usar una acción adicional en cada uno de los turnos posteriores para mantener esta conexión y alargar la duración hasta el final de tu siguiente turno. La conexión termina si no la mantienes. Mientras percibes el mundo a través de los ojos de la otra criatura, te beneficias de cualquier sentido especial que tenga y puedes lanzar conjuros como si estuvieras en tu espacio o en el de la otra criatura si estáis a 18 m o menos.' },
  { nombre: 'Pacto de la cadena', requisitos: null, repetible: false,
    descripcion: 'Aprendes el conjuro encontrar familiar y puedes lanzarlo como acción de magia sin gastar un espacio de conjuro. Cuando lo lances, escoge entre una de las formas habituales para tu familiar o una de las siguientes formas especiales: diablillo, duende, esfinge de las maravillas, esqueleto, pseudodragón, quasit, renacuajo slaad o serpiente venenosa (consulta el apéndice B). Asimismo, cuando realizas la acción de atacar, puedes renunciar a uno de tus propios ataques para que el familiar realice un ataque propio con su reacción.' },
  { nombre: 'Pacto del filo', requisitos: null, repetible: false,
    descripcion: 'Como acción adicional, puedes conjurar en tu mano un arma de pacto, un arma cuerpo a cuerpo sencilla o marcial de tu elección con la que estableces un vínculo. Como alternativa, puedes vincularte con un arma mágica que toques, salvo que otra criatura esté sintonizada con ella o que otro brujo esté vinculado con ella. Hasta que termine el vínculo, tendrás competencia con esa arma y podrás usarla como canalizador mágico. Siempre que ataques con el arma vinculada, puedes usar tu modificador por Carisma para las tiradas de ataque y de daño en lugar del modificador por Fuerza o Destreza. Además, puedes hacer que cause daño necrótico, psíquico o radiante en lugar de su tipo de daño normal. El vínculo se rompe si vuelves a usar la acción adicional de este rasgo, si el arma está a más de 1,5 m de ti durante 1 minuto o más, o si mueres. Un arma conjurada desaparece cuando termina el vínculo.' },
  { nombre: 'Pacto del grimorio', requisitos: null, repetible: false,
    descripcion: 'Uniendo hebras de sombras, conjuras un libro en tu mano al terminar un descanso corto o largo. Este Libro de las sombras (tú eliges su aspecto) contiene magia sobrenatural a la que solo tú puedes acceder. El libro desaparece si conjuras otro con este rasgo o si mueres. Trucos y rituales: cuando aparezca el libro, elige tres trucos y dos conjuros de nivel 1 marcados como «ritual». Los conjuros pueden ser de la lista de cualquier clase y deben ser conjuros que no tengas ya preparados; mientras lleves el libro contigo, tendrás preparados los conjuros elegidos y funcionarán como conjuros de brujo para ti. Canalizador mágico: puedes usar el libro como canalizador mágico.' },
  { nombre: 'Paso ascendente', requisitos: 'Brujo de nivel 5 o superior', repetible: false,
    descripcion: 'Puedes lanzar levitar sobre ti sin gastar un espacio de conjuro.' },
  { nombre: 'Salto sobrenatural', requisitos: 'Brujo de nivel 2 o superior', repetible: false,
    descripcion: 'Puedes lanzar salto sobre ti sin gastar un espacio de conjuro.' },
  { nombre: 'Susurros del sepulcro', requisitos: 'Brujo de nivel 7 o superior', repetible: false,
    descripcion: 'Puedes lanzar hablar con los muertos sin gastar un espacio de conjuro.' },
  { nombre: 'Uno con las sombras', requisitos: 'Brujo de nivel 5 o superior', repetible: false,
    descripcion: 'Mientras estés en una zona de luz tenue u oscuridad, puedes lanzar invisibilidad sobre ti sin gastar un espacio de conjuro.' },
  { nombre: 'Vigor infernal', requisitos: 'Brujo de nivel 2 o superior', repetible: false,
    descripcion: 'Puedes lanzar falsa vida sobre ti sin gastar un espacio de conjuro. Si lanzas el conjuro con este rasgo, no tiras el dado para los puntos de golpe temporales; en su lugar, obtienes automáticamente el número más alto en el dado.' },
  { nombre: 'Visión bruja', requisitos: 'Brujo de nivel 15 o superior', repetible: false,
    descripcion: 'Tienes visión verdadera hasta 9 m.' },
  { nombre: 'Visiones brumosas', requisitos: 'Brujo de nivel 2 o superior', repetible: false,
    descripcion: 'Puedes lanzar imagen silenciosa sin gastar un espacio de conjuro.' },
  { nombre: 'Visiones de reinos remotos', requisitos: 'Brujo de nivel 9 o superior', repetible: false,
    descripcion: 'Puedes lanzar ojo arcano sin gastar un espacio de conjuro.' },
  { nombre: 'Vista del diablo', requisitos: 'Brujo de nivel 2 o superior', repetible: false,
    descripcion: 'Puedes ver con normalidad en luz tenue y en la oscuridad, tanto si son mágicas como si no, a una distancia de 36 m o menos de ti.' },
];
