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
        desc: 'Bárbaros vinculados al árbol cósmico Yggdrasil, del que extraen vitalidad y transporte entre planos.',
        pagina: 54,
        rasgosNivel: {
          3: [
            { nombre: 'Vitalidad del árbol', pagina: 54, desc: 'Al enfurecerte obtienes PG temporales iguales a tu nivel de bárbaro. Además, cada turno enfurecido puedes dar PG temporales a una criatura a 3 m o menos (tiras tantos d6 como tu bonificación de daño por furia).' },
          ],
          6: [
            { nombre: 'Ramas del árbol', pagina: 54, desc: 'Reacción cuando un enemigo a 9 m o menos empieza su turno (estando tú enfurecido): salvación de Fuerza (CD 8 + Fuerza + competencia) o se teletransporta junto a ti; luego puedes reducir su velocidad a 0 hasta el final del turno.' },
          ],
          10: [
            { nombre: 'Raíces apaleadoras', pagina: 54, desc: '+3 m de alcance con armas cuerpo a cuerpo pesadas o versátiles. Al acertar con una así, puedes aplicar la maestría de derribar o empujar además de otra maestría del arma.' },
          ],
          14: [
            { nombre: 'Viajar por el árbol', pagina: 54, desc: 'Al enfurecerte y como acción adicional mientras estás enfurecido, te teletransportas hasta 18 m. Una vez por furia puedes ampliarlo a 45 m y llevar hasta 6 aliados que estén a 3 m de ti.' },
          ],
        },
      },
      {
        id: 'berserker',
        nombre: 'Senda del Berserker',
        desc: 'Bárbaros que canalizan la furia en violencia pura y desatada.',
        pagina: 55,
        rasgosNivel: {
          3: [
            { nombre: 'Frenesí', pagina: 55, desc: 'Si usas Ataque temerario estando enfurecido, el primer objetivo que aciertes en tu turno con un ataque de Fuerza sufre daño extra (tiras tantos d6 como tu bonificación de daño por furia; del mismo tipo que el ataque).' },
          ],
          6: [
            { nombre: 'Furia irracional', pagina: 55, desc: 'Inmune a los estados de asustado y hechizado mientras estés enfurecido (y te libras de ellos al enfurecerte).' },
          ],
          10: [
            { nombre: 'Represalia', pagina: 55, desc: 'Cuando un enemigo a 1,5 m o menos te causa daño, reacción para atacarlo cuerpo a cuerpo (con arma o sin armas).' },
          ],
          14: [
            { nombre: 'Presencia intimidante', pagina: 55, desc: 'Acción adicional: enemigos a tu elección en 9 m hacen salvación de Sabiduría (CD 8 + Fuerza + competencia) o quedan asustados 1 minuto (repiten al final de su turno). Recarga en descanso largo o gastando un uso de furia.' },
          ],
        },
      },
      {
        id: 'corazon_salvaje',
        nombre: 'Senda del Corazón Salvaje',
        desc: 'Bárbaros con afinidad animal que adoptan rasgos y aspectos de bestias.',
        pagina: 56,
        rasgosNivel: {
          3: [
            { nombre: 'Furia de lo salvaje', pagina: 56, desc: 'Al enfurecerte eliges un animal: Águila (destrabarte y correr como parte de la acción adicional de furia), Lobo (tus aliados tienen ventaja contra enemigos a 1,5 m de ti) u Oso (resistencia a todo el daño salvo fuerza, necrótico, psíquico y radiante).' },
            { nombre: 'Portavoz de los animales', pagina: 56, desc: 'Puedes lanzar hablar con los animales y sentidos de la bestia, pero solo como rituales (aptitud Sabiduría).' },
          ],
          6: [
            { nombre: 'Aspecto de lo salvaje', pagina: 56, desc: 'Eliges un aspecto (cambiable tras descanso largo): Búho (visión en la oscuridad 18 m), Pantera (velocidad trepando = tu velocidad) o Salmón (velocidad nadando = tu velocidad).' },
          ],
          10: [
            { nombre: 'Hablante de la naturaleza', pagina: 56, desc: 'Puedes lanzar comunión con la naturaleza, pero solo como ritual (aptitud Sabiduría).' },
          ],
          14: [
            { nombre: 'Poder de lo salvaje', pagina: 56, desc: 'Al enfurecerte eliges: Carnero (derribas al acertar cuerpo a cuerpo a criaturas Grandes o menores), Halcón (velocidad volando si vas sin armadura) o León (enemigos a 1,5 m tienen desventaja al atacar a otros que no seas tú).' },
          ],
        },
      },
      {
        id: 'fanatico',
        nombre: 'Senda del Fanático',
        desc: 'Bárbaros que viven su furia como una unión eufórica con una divinidad.',
        pagina: 57,
        rasgosNivel: {
          3: [
            { nombre: 'Furia divina', pagina: 57, desc: 'Mientras estás enfurecido, el primer objetivo que aciertes cada turno sufre 1d6 + la mitad de tu nivel de bárbaro de daño necrótico o radiante (a tu elección).' },
            { nombre: 'Guerrero de los dioses', pagina: 57, desc: 'Reserva de 4d12 para curarte como acción adicional (tiras los dados que gastes). Sube a 5 dados en nivel 6, 6 en el 12 y 7 en el 17. Se recupera en descanso largo.' },
          ],
          6: [
            { nombre: 'Foco fanático', pagina: 57, desc: 'Una vez por furia, si fallas una salvación, la repites con un bonificador igual a tu bonificación de daño por furia (usas el nuevo resultado).' },
          ],
          10: [
            { nombre: 'Presencia ferviente', pagina: 57, desc: 'Acción adicional: hasta 10 aliados a 18 m obtienen ventaja en ataques y salvaciones hasta tu próximo turno. Recarga en descanso largo o gastando un uso de furia.' },
          ],
          14: [
            { nombre: 'Furia de los dioses', pagina: 57, desc: 'Al enfurecerte adoptas forma de guerrero divino 1 minuto (una vez por descanso largo): resistencia a necrótico, psíquico y radiante; reacción para gastar un uso de furia y dejar a una criatura a 9 m con PG = tu nivel cuando caería a 0; velocidad volando y levitar.' },
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
        desc: 'Bardos ágiles que se mueven en armonía con el cosmos y combaten danzando.',
        pagina: 64,
        rasgosNivel: {
          3: [
            { nombre: 'Juego de pies deslumbrante', pagina: 64, desc: 'Sin armadura ni escudo: ventaja en pruebas de Carisma (Interpretación) que impliquen bailar; CA base = 10 + Destreza + Carisma; al gastar un uso de Inspiración bárdica puedes hacer un ataque sin armas como parte de esa acción; usas Destreza para tus ataques sin armas y su daño puede ser el del dado de Inspiración bárdica + Destreza (sin gastar el dado).' },
          ],
          6: [
            { nombre: 'Juego de pies conjunto', pagina: 64, desc: 'Al tirar iniciativa (si no estás incapacitado) puedes gastar un uso de Inspiración bárdica: tú y los aliados a 9 m que te vean u oigan sumáis el resultado del dado a la iniciativa.' },
            { nombre: 'Movimiento inspirador', pagina: 64, desc: 'Cuando un enemigo termina su turno a 1,5 m de ti, reacción + un uso de Inspiración bárdica para moverte la mitad de tu velocidad; además un aliado a 9 m puede usar su reacción para moverse la mitad. Sin provocar ataques de oportunidad.' },
          ],
          14: [
            { nombre: 'Evasión dirigida', pagina: 65, desc: 'En salvaciones de Destreza por mitad de daño: no recibes daño si la superas y solo la mitad si fallas. Puedes compartir el beneficio con una criatura a 1,5 m que haga la misma salvación. No funciona si estás incapacitado.' },
          ],
        },
      },
      {
        id: 'conocimiento',
        nombre: 'Colegio del Conocimiento',
        desc: 'Bardos que reúnen secretos y magia de toda fuente, expertos en saber y en desenmascarar.',
        pagina: 65,
        rasgosNivel: {
          3: [
            { nombre: 'Competencias adicionales', pagina: 65, desc: 'Ganas competencia en tres habilidades de tu elección.' },
            { nombre: 'Palabras cortantes', pagina: 65, desc: 'Cuando una criatura a 18 m hace una tirada de daño o tiene éxito en una prueba o ataque, reacción + un uso de Inspiración bárdica para restar el dado a su resultado (puede reducir el daño o convertir el éxito en fallo).' },
          ],
          6: [
            { nombre: 'Descubrimientos mágicos', pagina: 65, desc: 'Aprendes dos conjuros (trucos o de nivel que puedas lanzar) de las listas de clérigo, druida o mago; los tienes siempre preparados y puedes cambiar uno al subir de nivel.' },
          ],
          14: [
            { nombre: 'Habilidad sin parangón', pagina: 65, desc: 'Cuando fallas una prueba de característica o un ataque, puedes gastar un uso de Inspiración bárdica para sumar el dado al d20 (puede convertir el fallo en éxito). Si aun así fallas, el uso no se gasta.' },
          ],
        },
      },
      {
        id: 'glamour',
        nombre: 'Colegio del Glamour',
        desc: 'Bardos con la magia cautivadora de los Parajes Feéricos, capaces de una majestuosidad sobrenatural.',
        pagina: 66,
        rasgosNivel: {
          3: [
            { nombre: 'Magia cautivadora', pagina: 66, desc: 'Siempre tienes preparados hechizar persona e imagen múltiple. Tras lanzar un conjuro de encantamiento o ilusionismo con espacio, una criatura visible a 18 m hace una salvación de Sabiduría contra tu CD o queda asustada o hechizada (a tu elección) 1 minuto (repite al final de su turno). Recarga en descanso largo o gastando un uso de Inspiración bárdica.' },
            { nombre: 'Manto de inspiración', pagina: 66, desc: 'Acción adicional + un uso de Inspiración bárdica: eliges hasta tu modificador por Carisma de criaturas a 18 m; cada una obtiene PG temporales = el doble del resultado del dado y puede usar su reacción para moverse su velocidad sin provocar ataques de oportunidad.' },
          ],
          6: [
            { nombre: 'Manto de majestad', pagina: 66, desc: 'Siempre tienes preparada orden imperiosa. Acción adicional: la lanzas sin espacio y adoptas una apariencia sobrenatural 1 minuto (o hasta perder concentración); durante ese tiempo la lanzas como acción adicional sin espacio. Las criaturas que hayas hechizado fallan automáticamente esa salvación. Recarga en descanso largo o gastando un espacio de nivel 3+.' },
          ],
          14: [
            { nombre: 'Majestad inquebrantable', pagina: 67, desc: 'Acción adicional: aspecto majestuoso 1 minuto (o hasta incapacitado). La primera vez por turno que una criatura te acierte, hace una salvación de Carisma contra tu CD o su ataque falla. Recarga en descanso corto o largo.' },
          ],
        },
      },
      {
        id: 'valor',
        nombre: 'Colegio del Valor',
        desc: 'Bardos guerreros que cantan las hazañas de los héroes y combaten junto a sus conjuros.',
        pagina: 67,
        rasgosNivel: {
          3: [
            { nombre: 'Entrenamiento marcial', pagina: 67, desc: 'Ganas competencia con armas marciales y entrenamiento con armaduras medias y escudos. Puedes usar un arma sencilla o marcial como canalizador mágico para tus conjuros de bardo.' },
            { nombre: 'Inspiración en combate', pagina: 67, desc: 'Una criatura con tu dado de Inspiración bárdica puede usarlo para: Defensa (reacción al ser acertada: suma el dado a su CA contra ese ataque) u Ofensiva (al acertar: suma el dado al daño del ataque).' },
          ],
          6: [
            { nombre: 'Ataque adicional', pagina: 67, desc: 'Atacas dos veces al usar la acción de atacar. Además puedes sustituir uno de esos ataques por lanzar uno de tus trucos con tiempo de lanzamiento de una acción.' },
          ],
          14: [
            { nombre: 'Magia de batalla', pagina: 67, desc: 'Tras lanzar un conjuro con tiempo de lanzamiento de una acción, puedes hacer un ataque con arma como acción adicional.' },
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
        desc: 'Brujos cuyo pacto recurre a los Planos Superiores y la luz sagrada, con dotes curativas.',
        pagina: 75,
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del celestial', pagina: 75, desc: 'Conjuros siempre preparados según tu nivel de brujo: 3 (auxilio, curar heridas, llama sagrada, luz, restablecimiento menor, saeta guía), 5 (luz del día, revivir), 7 (guardián de la fe, muro de fuego), 9 (invocar celestial, restablecimiento mayor).' },
            { nombre: 'Luz sanadora', pagina: 75, desc: 'Reserva de d6 (1 + tu nivel de brujo). Acción adicional: gastas hasta tu modificador por Carisma de dados (mínimo 1) para curarte o curar a una criatura a 18 m (PG = el total tirado). Se recupera en descanso largo.' },
          ],
          6: [
            { nombre: 'Alma radiante', pagina: 75, desc: 'Resistencia al daño radiante. Una vez por turno, al causar daño radiante o de fuego con un conjuro, sumas tu modificador por Carisma al daño contra un objetivo.' },
          ],
          10: [
            { nombre: 'Resiliencia celestial', pagina: 75, desc: 'Al usar Astucia mágica o terminar un descanso obtienes PG temporales = nivel de brujo + Carisma; además das a hasta 5 criaturas visibles PG temporales = la mitad de tu nivel + Carisma.' },
          ],
          14: [
            { nombre: 'Venganza ardiente', pagina: 75, desc: 'Cuando tú o un aliado a 18 m vais a hacer una salvación contra muerte, puedes curar a esa criatura la mitad de sus PG máximos (y levantarla); las criaturas a tu elección a 9 m de ella sufren 2d8 + Carisma de daño radiante y quedan cegadas hasta el final del turno. Una vez por descanso largo.' },
          ],
        },
      },
      {
        id: 'feerico',
        nombre: 'Patrón Feérico',
        desc: 'Brujos ligados a los Parajes Feéricos, expertos en teletransporte y magia caprichosa.',
        pagina: 76,
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del señor feérico', pagina: 76, desc: 'Conjuros siempre preparados según tu nivel de brujo: 3 (calmar emociones, dormir, fuego feérico, fuerza fantasmal, paso brumoso), 5 (crecimiento vegetal, desplazamiento), 7 (dominar bestia, invisibilidad mejorada), 9 (apariencia, dominar persona).' },
            { nombre: 'Pasos feéricos', pagina: 76, desc: 'Lanzas paso brumoso sin espacio un número de veces = tu modificador por Carisma (recarga en descanso largo). Al lanzarlo eliges un efecto: Paso burlón (criaturas junto al espacio que dejas hacen salvación de Sabiduría o tienen desventaja al atacar a otros) o Paso refrescante (tú o una criatura a 3 m obtenéis 1d10 PG temporales).' },
          ],
          6: [
            { nombre: 'Escape brumoso', pagina: 76, desc: 'Puedes lanzar paso brumoso como reacción al recibir daño. Además sumas dos efectos a Pasos feéricos: Paso aterrador (2d10 de daño psíquico a quienes fallen una salvación de Sabiduría junto al espacio que dejas o al que llegas) y Paso desvanecedor (invisible hasta tu próximo turno o hasta que ataques, dañes o lances un conjuro).' },
          ],
          10: [
            { nombre: 'Defensas seductoras', pagina: 77, desc: 'Inmune al estado de hechizado. Cuando una criatura visible te acierta, reacción para reducir el daño a la mitad y forzarle una salvación de Sabiduría: si falla, sufre daño psíquico igual al que tú recibiste. Recarga en descanso largo o gastando un espacio de Magia del pacto.' },
          ],
          14: [
            { nombre: 'Magia embrujadora', pagina: 77, desc: 'Tras lanzar un conjuro de encantamiento o ilusionismo (con acción y espacio), puedes lanzar paso brumoso como parte de la misma acción sin gastar otro espacio.' },
          ],
        },
      },
      {
        id: 'infernal',
        nombre: 'Patrón Infernal',
        desc: 'Brujos que pactan con los Planos Inferiores, resistentes y con suerte siniestra.',
        pagina: 77,
        rasgosNivel: {
          3: [
            { nombre: 'Bendición del oscuro', pagina: 77, desc: 'Al reducir a 0 los PG de un enemigo (o si lo hace otra criatura a 3 m de ti) obtienes PG temporales = Carisma + tu nivel de brujo (mínimo 1).' },
            { nombre: 'Conjuros del infernal', pagina: 77, desc: 'Conjuros siempre preparados según tu nivel de brujo: 3 (manos ardientes, orden imperiosa, rayo abrasador, sugestión), 5 (bola de fuego, nube apestosa), 7 (escudo de fuego, muro de fuego), 9 (geas, plaga de insectos).' },
          ],
          6: [
            { nombre: 'La suerte del oscuro', pagina: 78, desc: 'En una prueba de característica o salvación, puedes sumar 1d10 (tras ver el resultado, antes de sus efectos). Usos = tu modificador por Carisma (no más de uno por tirada); recarga en descanso largo.' },
          ],
          10: [
            { nombre: 'Resistencia infernal', pagina: 78, desc: 'Tras un descanso eliges un tipo de daño (que no sea fuerza); tienes resistencia a él hasta que elijas otro.' },
          ],
          14: [
            { nombre: 'Arrastrar por el infierno', pagina: 78, desc: 'Una vez por turno, al acertar con un ataque, el objetivo hace una salvación de Carisma o desaparece a los Planos Inferiores; si no es un infernal, sufre 8d10 de daño psíquico y queda incapacitado hasta el final de tu próximo turno, cuando reaparece. Recarga en descanso largo o gastando un espacio de Magia del pacto.' },
          ],
        },
      },
      {
        id: 'primigenio',
        nombre: 'Patrón Primigenio',
        desc: 'Brujos ligados a entidades del Reino Lejano, con poderes psíquicos y telepáticos.',
        pagina: 78,
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del primigenio', pagina: 79, desc: 'Conjuros siempre preparados según tu nivel de brujo: 3 (detectar pensamientos, fuerza fantasmal, risa horrible de Tasha, susurros discordantes), 5 (clarividencia, hambre de Hadar), 7 (confusión, invocar aberración), 9 (alterar los recuerdos, telequinesis).' },
            { nombre: 'Conjuros psíquicos', pagina: 79, desc: 'Puedes cambiar a psíquico el daño de tus conjuros de brujo. Además, lanzas tus conjuros de brujo de encantamiento o ilusionismo sin componentes verbales ni somáticos.' },
            { nombre: 'Mente iluminada', pagina: 79, desc: 'Acción adicional: enlace telepático con una criatura a 9 m, con alcance de 1,5 km × tu modificador por Carisma, usando un idioma común. Dura minutos = tu nivel de brujo; termina si conectas con otra criatura.' },
          ],
          6: [
            { nombre: 'Combatiente clarividente', pagina: 79, desc: 'Al enlazar con Mente iluminada, la criatura hace una salvación de Sabiduría o tiene desventaja al atacarte y tú tienes ventaja al atacarla mientras dure el enlace. Recarga en descanso corto/largo o gastando un espacio de Magia del pacto.' },
          ],
          10: [
            { nombre: 'Escudo mental', pagina: 79, desc: 'Tus pensamientos no se pueden leer sin tu permiso. Tienes resistencia al daño psíquico y, cuando una criatura te lo causa, recibe la misma cantidad.' },
            { nombre: 'Maleficio sobrenatural', pagina: 79, desc: 'Siempre tienes preparado maleficio. Al lanzarlo y elegir una característica, el objetivo además tiene desventaja en las salvaciones de esa característica mientras dure el conjuro.' },
          ],
          14: [
            { nombre: 'Crear siervo', pagina: 79, desc: 'Puedes lanzar invocar aberración sin concentración (dura 1 minuto) y la aberración obtiene PG temporales = tu nivel de brujo + Carisma. La primera vez por turno que acierte a una criatura bajo tu maleficio le añade el daño extra del maleficio (psíquico).' },
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
        desc: 'Clérigos que destacan en el combate e inspiran a los demás a luchar.',
        pagina: 85,
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del dominio de la guerra', pagina: 85, desc: 'Conjuros siempre preparados según tu nivel de clérigo: 3 (arma espiritual, arma mágica, escudo de fe, saeta guía), 5 (espíritus guardianes, manto del cruzado), 7 (escudo de fuego, libertad de movimiento), 9 (golpe de viento acerado, inmovilizar monstruo).' },
            { nombre: 'Golpe guiado', pagina: 85, desc: 'Cuando tú o una criatura a 9 m falláis un ataque, gastas un uso de Canalizar divinidad para sumar +10 a esa tirada (para otra criatura, requiere tu reacción).' },
            { nombre: 'Sacerdote guerrero', pagina: 85, desc: 'Acción adicional: un ataque con arma o sin armas. Usos = tu modificador por Sabiduría (mínimo 1); se recuperan en descanso corto o largo.' },
          ],
          6: [
            { nombre: 'Bendición del dios de la guerra', pagina: 86, desc: 'Gastas un uso de Canalizar divinidad para lanzar arma espiritual o escudo de fe sin espacio; no requiere concentración y dura 1 minuto (termina si lo relanzas, quedas incapacitado o mueres).' },
          ],
          17: [
            { nombre: 'Avatar de la batalla', pagina: 86, desc: 'Resistencia al daño contundente, cortante y perforante.' },
          ],
        },
      },
      {
        id: 'luz',
        nombre: 'Dominio de la Luz',
        desc: 'Clérigos que canalizan luz abrasadora y revelaciones para repeler la oscuridad.',
        pagina: 86,
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del dominio de la luz', pagina: 86, desc: 'Conjuros siempre preparados según tu nivel de clérigo: 3 (fuego feérico, manos ardientes, rayo abrasador, ver invisibilidad), 5 (bola de fuego, luz del día), 7 (muro de fuego, ojo arcano), 9 (escudriñar, golpe flamígero).' },
            { nombre: 'Fulgor protector', pagina: 86, desc: 'Reacción cuando una criatura a 9 m hace un ataque: impones desventaja a esa tirada. Usos = tu modificador por Sabiduría (mínimo 1); recarga en descanso largo.' },
            { nombre: 'Resplandor del amanecer', pagina: 87, desc: 'Acción de magia + un uso de Canalizar divinidad: destello en emanación de 9 m que disipa la oscuridad mágica; las criaturas a tu elección hacen salvación de Constitución por 2d10 + tu nivel de clérigo de daño radiante (la mitad si la superan).' },
          ],
          6: [
            { nombre: 'Fulgor protector mejorado', pagina: 87, desc: 'Recuperas los usos de Fulgor protector también en descanso corto. Además, al usarlo das al objetivo del ataque PG temporales = 2d6 + tu modificador por Sabiduría.' },
          ],
          17: [
            { nombre: 'Halo de luz', pagina: 87, desc: 'Acción de magia: aura de luz solar 1 minuto (luz brillante 18 m, tenue 9 m más). Los enemigos en la luz brillante tienen desventaja en salvaciones contra tu Resplandor del amanecer y contra conjuros de daño de fuego o radiante. Usos = tu modificador por Sabiduría (mínimo 1); recarga en descanso largo.' },
          ],
        },
      },
      {
        id: 'vida',
        nombre: 'Dominio de la Vida',
        desc: 'Clérigos maestros de la curación que canalizan la energía positiva.',
        pagina: 87,
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del dominio de la vida', pagina: 88, desc: 'Conjuros siempre preparados según tu nivel de clérigo: 3 (auxilio, bendición, curar heridas, restablecimiento menor), 5 (palabra de curación en masa, revivir), 7 (aura de vida, guarda contra la muerte), 9 (curar heridas en masa, restablecimiento mayor).' },
            { nombre: 'Discípulo de la vida', pagina: 88, desc: 'Al lanzar con espacio un conjuro que cure PG a una criatura, esta recupera PG extra = 2 + el nivel del espacio.' },
            { nombre: 'Preservar vida', pagina: 88, desc: 'Acción de magia + un uso de Canalizar divinidad: generas PG de curación = 5 × tu nivel de clérigo y los repartes entre criaturas maltrechas a 9 m (incluido tú); no puede subir a nadie por encima de la mitad de sus PG máximos.' },
          ],
          6: [
            { nombre: 'Sanador bendito', pagina: 88, desc: 'Al usar un espacio para curar PG a otras criaturas, tú también recuperas PG = 2 + el nivel del espacio.' },
          ],
          17: [
            { nombre: 'Sanación suprema', pagina: 88, desc: 'Al curar PG con un conjuro o con Canalizar divinidad, usas el máximo de cada dado en vez de tirar (p. ej. 2d6 = 12).' },
          ],
        },
      },
      {
        id: 'enganio',
        nombre: 'Dominio del Engaño',
        desc: 'Clérigos de embustes, ilusiones y sigilo que prefieren el subterfugio.',
        pagina: 88,
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del dominio del engaño', pagina: 89, desc: 'Conjuros siempre preparados según tu nivel de clérigo: 3 (disfrazarse, hechizar persona, invisibilidad, pasar sin rastro), 5 (indetectable, patrón hipnótico), 7 (confusión, puerta dimensional), 9 (alterar los recuerdos, dominar persona).' },
            { nombre: 'Bendición del embaucador', pagina: 88, desc: 'Acción de magia: tú o una criatura voluntaria a 9 m obtenéis ventaja en pruebas de Destreza (Sigilo) hasta el próximo descanso largo o hasta que reuses el rasgo.' },
            { nombre: 'Invocar duplicidad', pagina: 89, desc: 'Acción adicional + un uso de Canalizar divinidad: creas un duplicado ilusorio tuyo a 9 m, 1 minuto. Mientras dure: ventaja al atacar a criaturas a 1,5 m de la ilusión (estando tú también cerca), puedes lanzar conjuros desde el espacio de la ilusión (con tus sentidos) y moverla hasta 9 m con una acción adicional.' },
          ],
          6: [
            { nombre: 'Transposición del embaucador', pagina: 89, desc: 'Al crear o mover la ilusión de Invocar duplicidad (acción adicional), puedes teletransportarte e intercambiar tu lugar con el de la ilusión.' },
          ],
          17: [
            { nombre: 'Duplicidad mejorada', pagina: 89, desc: 'Mejora Invocar duplicidad: tus aliados también tienen ventaja al atacar a criaturas a 1,5 m de la ilusión; y cuando la ilusión desaparece, tú o una criatura a 1,5 m de ella recupera PG = tu nivel de clérigo.' },
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
        desc: 'Druidas que dominan la magia lunar para adoptar formas de bestia poderosas en combate.',
        pagina: 96,
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del círculo de la luna', pagina: 97, desc: 'Conjuros siempre preparados (puedes lanzarlos en Forma salvaje) según tu nivel de druida: 3 (curar heridas, rayo de luna, voluta estelar), 5 (conjurar animales), 7 (fuente de luz lunar), 9 (curar heridas en masa).' },
            { nombre: 'Formas del círculo', pagina: 97, desc: 'Tu Forma salvaje mejora: valor de desafío máximo = tu nivel de druida ÷ 3; tu CA pasa a 13 + tu modificador por Sabiduría si supera la de la bestia; y obtienes PG temporales = el triple de tu nivel de druida.' },
          ],
          6: [
            { nombre: 'Formas del círculo mejoradas', pagina: 97, desc: 'En Forma salvaje: tus ataques pueden causar su daño normal o daño radiante (eliges por ataque), y sumas tu modificador por Sabiduría a tus salvaciones de Constitución.' },
          ],
          10: [
            { nombre: 'Paso de la luz lunar', pagina: 97, desc: 'Acción adicional: te teletransportas hasta 9 m y tienes ventaja en tu próximo ataque del turno. Usos = tu modificador por Sabiduría (mínimo 1); recarga en descanso largo o gastando espacios de conjuro de nivel 2+.' },
          ],
          14: [
            { nombre: 'Forma lunar', pagina: 97, desc: 'Al usar Paso de la luz lunar puedes llevar también a una criatura voluntaria a 3 m. Además, una vez por turno, al acertar con un ataque en Forma salvaje, causas 2d10 de daño radiante extra.' },
          ],
        },
      },
      {
        id: 'tierra',
        nombre: 'Círculo de la Tierra',
        desc: 'Druidas místicos ligados a un tipo de terreno, con conjuros y protecciones del entorno.',
        pagina: 98,
        rasgosNivel: {
          3: [
            { nombre: 'Ayuda de la tierra', pagina: 98, desc: 'Acción de magia + un uso de Forma salvaje: en una esfera de 3 m a 18 m, las criaturas a tu elección hacen salvación de Constitución por 2d6 de daño necrótico (mitad si la superan) y una criatura de tu elección recupera 2d6 PG. Sube a 3d6 (nivel 10) y 4d6 (nivel 14).' },
            { nombre: 'Conjuros del círculo de la tierra', pagina: 98, desc: 'Tras un descanso largo eliges un tipo de terreno (Árido, Polar, Templado o Tropical) y tienes preparados sus conjuros según tu nivel (cada terreno tiene su propia lista de niveles 3/5/7/9).' },
          ],
          6: [
            { nombre: 'Recuperación natural', pagina: 99, desc: 'Una vez por descanso largo lanzas un conjuro de Conjuros de círculo (nivel 1+) sin gastar espacio. Además, en un descanso corto recuperas espacios gastados cuya suma de niveles sea hasta la mitad de tu nivel de druida (sin espacios de nivel 6+).' },
          ],
          10: [
            { nombre: 'Protección de la naturaleza', pagina: 99, desc: 'Inmune al estado envenenado y resistente a un tipo de daño según tu terreno actual: Árido→fuego, Polar→frío, Templado→relámpago, Tropical→veneno.' },
          ],
          14: [
            { nombre: 'Santuario de la naturaleza', pagina: 99, desc: 'Acción de magia + un uso de Forma salvaje: un cubo de 4,5 m de árboles y enredaderas espectrales a 36 m, 1 minuto. Tú y tus aliados dentro tenéis cobertura media y tus aliados ganan tu resistencia de Protección de la naturaleza. Acción adicional: mueves el cubo hasta 18 m.' },
          ],
        },
      },
      {
        id: 'estrellas',
        nombre: 'Círculo de las Estrellas',
        desc: 'Druidas que canalizan el poder de las constelaciones mediante una forma estelar.',
        pagina: 99,
        rasgosNivel: {
          3: [
            { nombre: 'Forma estelar', pagina: 99, desc: 'Acción adicional + un uso de Forma salvaje: adoptas forma estelar 10 minutos (emites luz) y eliges una constelación: Arquero (acción adicional: ataque de conjuro a distancia, 1d8 + Sabiduría de daño radiante), Cáliz (al curar con un conjuro, tú u otra criatura a 9 m recupera 1d8 + Sabiduría PG) o Dragón (tratas como 10 los resultados de 9 o menos en pruebas de Inteligencia/Sabiduría y en salvaciones de concentración).' },
            { nombre: 'Mapa estelar', pagina: 99, desc: 'Objeto que usas como canalizador mágico. Mientras lo llevas tienes guía y saeta guía preparados y lanzas saeta guía sin espacio un número de veces = tu modificador por Sabiduría (recarga en descanso largo).' },
          ],
          6: [
            { nombre: 'Presagio cósmico', pagina: 100, desc: 'Tras un descanso largo tiras un dado: par (Fortuna) te da una reacción para sumar 1d6 a una prueba de d20 de una criatura a 9 m; impar (Desdicha), para restarle 1d6. Usos = tu modificador por Sabiduría; recarga en descanso largo.' },
          ],
          10: [
            { nombre: 'Constelaciones centelleantes', pagina: 100, desc: 'Arquero y Cáliz pasan a 2d8; el Dragón te da velocidad volando 6 m y levitar. Además, al inicio de cada turno en forma estelar puedes cambiar de constelación.' },
          ],
          14: [
            { nombre: 'Colmado de luz estelar', pagina: 100, desc: 'En forma estelar eres parcialmente incorpóreo: resistencia al daño contundente, cortante y perforante.' },
          ],
        },
      },
      {
        id: 'mar',
        nombre: 'Círculo del Mar',
        desc: 'Druidas que canalizan las mareas y tormentas con una emanación de furia marina.',
        pagina: 100,
        rasgosNivel: {
          3: [
            { nombre: 'Conjuros del círculo del mar', pagina: 101, desc: 'Conjuros siempre preparados según tu nivel de druida: 3 (hacer añicos, nube de oscurecimiento, ola atronadora, ráfaga de viento, rayo de escarcha), 5 (relámpago, respirar bajo el agua), 7 (controlar agua, tormenta de hielo), 9 (conjurar elemental, inmovilizar monstruo).' },
            { nombre: 'Ira de los mares', pagina: 101, desc: 'Acción adicional + un uso de Forma salvaje: una emanación de espuma marina (1,5 m) te rodea 10 minutos. Como acción adicional eliges una criatura en ella: salvación de Constitución o sufre daño de frío (tantos d6 como tu modificador por Sabiduría) y, si es Grande o menor, la empujas hasta 4,5 m.' },
          ],
          6: [
            { nombre: 'Afinidad acuática', pagina: 101, desc: 'La emanación de Ira de los mares crece a 3 m y obtienes velocidad nadando = tu velocidad.' },
          ],
          10: [
            { nombre: 'Nacido de la tempestad', pagina: 101, desc: 'Mientras Ira de los mares está activa, tienes resistencia al daño de frío, relámpago y trueno, y velocidad volando = tu velocidad.' },
          ],
          14: [
            { nombre: 'Obsequio oceánico', pagina: 101, desc: 'Puedes generar la emanación de Ira de los mares en torno a una criatura voluntaria a 18 m (usa tu CD y tu Sabiduría), o en torno a ambos gastando 2 usos de Forma salvaje.' },
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
// Resúmenes propios de las mecánicas; el texto completo está en las págs. 71-73 del manual.
export const INVOCACIONES_BRUJO = [
  { nombre: 'Armadura de sombras', requisitos: null, repetible: false, pagina: 71,
    descripcion: 'Lanzas armadura de mago sobre ti sin gastar espacio.' },
  { nombre: 'Castigo arcano', requisitos: 'Brujo de nivel 5 o superior, invocación Pacto del filo', repetible: false, pagina: 71,
    descripcion: 'Una vez por turno, al acertar con tu arma de pacto, gastas un espacio de Magia del pacto para sumar 1d8 de daño de fuerza por cada nivel del espacio; además derribas al objetivo si es Enorme o menor.' },
  { nombre: 'Descarga agónica', requisitos: 'Brujo de nivel 2 o superior, un truco de brujo que cause daño', repetible: true, pagina: 71,
    descripcion: 'Eliges un truco de brujo con daño y le sumas tu modificador por Carisma al daño. Repetible (otro truco cada vez).' },
  { nombre: 'Descarga ahuyentadora', requisitos: 'Brujo de nivel 2 o superior, un truco de brujo que cause daño mediante una tirada de ataque', repetible: true, pagina: 71,
    descripcion: 'Eliges un truco de brujo de ataque; al acertar a una criatura Grande o menor, la empujas hasta 3 m. Repetible (otro truco cada vez).' },
  { nombre: 'Devorador de vida', requisitos: 'Brujo de nivel 9 o superior, invocación Pacto del filo', repetible: false, pagina: 71,
    descripcion: 'Una vez por turno, al acertar con tu arma de pacto, sumas 1d6 (necrótico, psíquico o radiante) y gastas un dado de golpe para curarte ese resultado + tu modificador por Constitución.' },
  { nombre: 'Don de las profundidades', requisitos: 'Brujo de nivel 5 o superior', repetible: false, pagina: 71,
    descripcion: 'Respiras bajo el agua y tienes velocidad nadando = tu velocidad. Además lanzas respirar bajo el agua una vez sin espacio (recarga en descanso largo).' },
  { nombre: 'Don de los protectores', requisitos: 'Brujo de nivel 9 o superior, invocación Pacto del grimorio', repetible: false, pagina: 71,
    descripcion: 'En tu Libro de las sombras puedes anotar hasta tu modificador por Carisma de nombres; cuando una de esas criaturas caería a 0 PG (sin morir), queda en 1 PG (un solo uso por descanso largo).' },
  { nombre: 'Filo sediento', requisitos: 'Brujo de nivel 5 o superior, invocación Pacto del filo', repetible: false, pagina: 72,
    descripcion: 'Ganas Ataque adicional solo con tu arma de pacto (dos ataques al usar la acción de atacar).' },
  { nombre: 'Hoja devoradora', requisitos: 'Brujo de nivel 12 o superior, invocación Filo sediento', repetible: false, pagina: 72,
    descripcion: 'El Ataque adicional de Filo sediento pasa a dar dos ataques extra en vez de uno.' },
  { nombre: 'Inversión del amo de las cadenas', requisitos: 'Brujo de nivel 5 o superior, invocación Pacto de la cadena', repetible: false, pagina: 72,
    descripcion: 'Tu familiar de Pacto de la cadena mejora: velocidad nadando/volando 12 m, atacar como tu acción adicional, cambiar su daño a necrótico/radiante, usa tu CD de salvación y puedes darle resistencia con tu reacción.' },
  { nombre: 'Lanza sobrenatural', requisitos: 'Brujo de nivel 2 o superior, un truco de brujo que cause daño', repetible: true, pagina: 72,
    descripcion: 'Eliges un truco de brujo con daño y alcance ≥3 m; su alcance aumenta en 10 × tu nivel de brujo (metros). Repetible (otro truco cada vez).' },
  { nombre: 'Lecciones de los primeros', requisitos: 'Brujo de nivel 2 o superior', repetible: true, pagina: 72,
    descripcion: 'Obtienes una dote de origen a elegir. Repetible (otra dote de origen cada vez).' },
  { nombre: 'Maestro de las formas innumerables', requisitos: 'Brujo de nivel 5 o superior', repetible: false, pagina: 72,
    descripcion: 'Lanzas alterar el propio aspecto sin gastar espacio.' },
  { nombre: 'Máscara de los mil rostros', requisitos: 'Brujo de nivel 2 o superior', repetible: false, pagina: 72,
    descripcion: 'Lanzas disfrazarse sin gastar espacio.' },
  { nombre: 'Mente sobrenatural', requisitos: null, repetible: false, pagina: 72,
    descripcion: 'Ventaja en las salvaciones de Constitución para mantener la concentración.' },
  { nombre: 'Mirada de las dos mentes', requisitos: 'Brujo de nivel 5 o superior', repetible: false, pagina: 72,
    descripcion: 'Acción adicional: tocas a una criatura voluntaria y percibes por sus sentidos hasta tu próximo turno (prolongable con acción adicional). Mientras tanto usas sus sentidos especiales y puedes lanzar conjuros desde su espacio si está a 18 m.' },
  { nombre: 'Pacto de la cadena', requisitos: null, repetible: false, pagina: 72,
    descripcion: 'Aprendes encontrar familiar y lo lanzas sin espacio; el familiar puede tener formas especiales (diablillo, pseudodragón, quasit, etc.). Puedes renunciar a uno de tus ataques para que el familiar ataque con su reacción.' },
  { nombre: 'Pacto del filo', requisitos: null, repetible: false, pagina: 72,
    descripcion: 'Acción adicional: conjuras un arma de pacto (cuerpo a cuerpo sencilla o marcial) o te vinculas con una mágica. Tienes competencia con ella, la usas como canalizador, atacas y dañas con Carisma y puedes cambiar su tipo de daño a necrótico/psíquico/radiante.' },
  { nombre: 'Pacto del grimorio', requisitos: null, repetible: false, pagina: 73,
    descripcion: 'Conjuras un Libro de las sombras tras un descanso: eliges 3 trucos y 2 conjuros rituales de nivel 1 de cualquier lista (que no tengas ya); los tienes preparados como conjuros de brujo mientras lleves el libro, que sirve de canalizador.' },
  { nombre: 'Paso ascendente', requisitos: 'Brujo de nivel 5 o superior', repetible: false, pagina: 73,
    descripcion: 'Lanzas levitar sobre ti sin gastar espacio.' },
  { nombre: 'Salto sobrenatural', requisitos: 'Brujo de nivel 2 o superior', repetible: false, pagina: 73,
    descripcion: 'Lanzas salto sobre ti sin gastar espacio.' },
  { nombre: 'Susurros del sepulcro', requisitos: 'Brujo de nivel 7 o superior', repetible: false, pagina: 73,
    descripcion: 'Lanzas hablar con los muertos sin gastar espacio.' },
  { nombre: 'Uno con las sombras', requisitos: 'Brujo de nivel 5 o superior', repetible: false, pagina: 73,
    descripcion: 'En luz tenue u oscuridad, lanzas invisibilidad sobre ti sin gastar espacio.' },
  { nombre: 'Vigor infernal', requisitos: 'Brujo de nivel 2 o superior', repetible: false, pagina: 73,
    descripcion: 'Lanzas falsa vida sobre ti sin gastar espacio y obtienes el máximo del dado de PG temporales.' },
  { nombre: 'Visión bruja', requisitos: 'Brujo de nivel 15 o superior', repetible: false, pagina: 73,
    descripcion: 'Tienes visión verdadera hasta 9 m.' },
  { nombre: 'Visiones brumosas', requisitos: 'Brujo de nivel 2 o superior', repetible: false, pagina: 73,
    descripcion: 'Lanzas imagen silenciosa sin gastar espacio.' },
  { nombre: 'Visiones de reinos remotos', requisitos: 'Brujo de nivel 9 o superior', repetible: false, pagina: 73,
    descripcion: 'Lanzas ojo arcano sin gastar espacio.' },
  { nombre: 'Vista del diablo', requisitos: 'Brujo de nivel 2 o superior', repetible: false, pagina: 73,
    descripcion: 'Ves normalmente en luz tenue y oscuridad (mágica o no) hasta 36 m.' },
];
