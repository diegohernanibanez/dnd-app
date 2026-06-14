# Revisión: Manual del Jugador 2024 vs código de la app

Objetivo: detectar inconsistencias entre el manual (`public/Manual del Jugador 2024.pdf`, 385 págs.)
y el código de creación de personajes, repasando desde la página 32 hasta el final, sin saltear nada.

## Metodología por sesión

1. Leer las páginas del PDF de la sesión (lectura visual con la herramienta Read, máx. 20 págs. por tanda).
2. Comparar contra los archivos de código indicados (datos + componente que los consume).
3. Registrar cada inconsistencia en la sección **Hallazgos** con formato:
   `- [ ] (sesión) [R|T] pág. X — descripción — archivo:línea — severidad (alta/media/baja)`
   donde `R` = problema de reglas/datos y `T` = texto resumido/incompleto vs. el manual.
4. Marcar la sesión como hecha en el checklist y anotar la fecha.
5. Las correcciones se aplican aparte (por bloque o al final), no durante el repaso.
6. Toda corrección se hace en `src/data/*.js` (fuente canónica versionada) y se cierra el
   bloque con `npm run db:seed` para sincronizar las tablas de referencia de Supabase.

Este documento es la **Fase 2** del plan maestro (`PLAN.md`); la Fase 1 es la hoja de
personaje editable basada en `public/ES_Character_Sheet.pdf`.

## Principio rector: descripciones COMPLETAS, sin resumir

Requisito explícito del proyecto (prioridad máxima): **todo texto descriptivo en la base de
datos debe ser una transcripción literal e íntegra del manual, sin resumir, parafrasear ni
recortar.** Esto aplica a rasgos de clase y subclase, dotes, conjuros, trasfondos, especies,
propiedades de armas, etc.

Reglas de transcripción:
- Copiar el texto **palabra por palabra** del PDF, incluyendo tablas, listas de opciones,
  "Mejora de nivel superior" de conjuros, y notas entre paréntesis.
- Conservar valores numéricos, CD, alcances, duraciones y unidades exactamente como aparecen.
- Mantener nombres de reglas y términos en su forma del manual ES 2024.
- Solo se permite normalizar el formato (saltos de línea, escapado de comillas para JS),
  nunca el contenido.
- Si un rasgo en el manual remite a otro (p. ej. "ver Furia"), incluir igualmente el texto
  propio del rasgo; no reemplazar por la referencia.

Por eso cada sesión revisa **dos ejes** y ambos se anotan por separado en Hallazgos:
- **(R) Reglas/datos** — valores correctos (niveles, CD, competencias, listas, etc.).
- **(T) Texto** — la descripción está completa y literal vs. el manual (resumida = hallazgo).

En el checklist, cada sesión marca dos casillas: `[R]` reglas y `[T]` texto.

## Qué funciona / qué no (estado vivo)

Se completa a medida que avanzan las sesiones. Resumen rápido del estado de cada área para
saber dónde estamos parados sin releer todos los hallazgos.

| Área | Reglas | Texto completo | Notas |
|------|--------|----------------|-------|
| Creación (cap. 2) | ✅ A1–A3 | ✅ A1–A3 | Gen. características ✓, idiomas ✓, progresión/PG ✓, bagatelas ✓; alineamientos y bagatela 47 corregidos a texto literal; **multiclase implementada**. Bloque A cerrado (queda preferencia/complejidad → B0) |
| Clases (resumen/intro) | ✅ B0 | ✅ B0 | Preferencia/complejidad añadidas; descripciones intro ✓ |
| Clases (rasgos por nivel) | ⬜ B1–B12 | ⬜ B1–B12 | Pendiente: comparar `classLevelData.js` contra cada clase |
| Subclases | ⬜ pendiente | ⬜ pendiente | |
| Trasfondos | ⬜ pendiente | ⬜ pendiente | `RASGOS_POR_TRASFONDO` con datos de 2014 (ver A1) |
| Especies | ⬜ pendiente | ⬜ pendiente | |
| Dotes | ⬜ pendiente | ⬜ pendiente | |
| Equipo/armas | ⬜ pendiente | ⬜ pendiente | |
| Conjuros | ⬜ pendiente | ⬜ pendiente | |

Leyenda: ✅ verificado · 🟡 parcial/con hallazgos abiertos · ⬜ pendiente.

## Checklist de sesiones

### Bloque A — Cap. 2: Crear un personaje (págs. 32–47)
- [x] **A1** `[R ✓] [T 🟡]` págs. 32–40 · Pasos de creación (clase, origen, características, detalles) ↔ `src/App.jsx`, `src/components/ClassSelector.jsx`, `src/components/OriginSelector.jsx`, `src/components/AbilityScoreGenerator.jsx`, `src/data/abilityScores.js`, `src/data/character.js` — revisado 2026-06-12
- [x] **A2** `[R 🟡] [T —]` págs. 41–45 · Progresión de niveles, comenzar en niveles superiores, multiclase ↔ `src/data/levelProgression.js`, `src/components/LevelSelector.jsx`, `src/data/classLevelData.js` — revisado 2026-06-12
- [x] **A3** `[R ✓] [T ✓]` págs. 46–47 · Bagatelas ↔ `src/data/bagatelas.js` — revisado 2026-06-12 (bloque A completo)

### Bloque B — Cap. 3: Clases de personaje (págs. 48–175)
Cada sesión compara rasgos por nivel, dado de golpe, salvaciones, competencias, subclases y
(si aplica) lista de conjuros ↔ `src/data/classes.js`, `src/data/classLevelData.js`, `src/data/spellSlots.js`, `src/data/spells.js`.
- [x] **B0** `[R ✓] [T ✓]` págs. 48–49 (+ tabla pág. 33) · Introducción del capítulo y resumen de clases — revisado 2026-06-12
- [x] **B1** `[R ✓] [T ✓]` págs. 50–57 · Bárbaro (4 sendas) — revisado 2026-06-12
- [x] **B2** `[R ✓] [T ✓]` págs. 58–67 · Bardo (4 colegios; lista de conjuros → F0) — revisado 2026-06-12
- [x] **B3** `[R ✓] [T ✓]` págs. 68–79 · Brujo (invocaciones, 4 patrones; lista de conjuros → F0) — revisado 2026-06-12
- [x] **B4** `[R ✓] [T ✓]` págs. 80–89 · Clérigo (4 dominios; lista de conjuros → F0) — revisado 2026-06-12 (sin correcciones)
- [x] **B5** `[R ✓] [T ✓]` págs. 90–101 · Druida (4 círculos; lista de conjuros → F0) — resumen propio + página 2026-06-13
- [ ] **B6** págs. 102–111 · Explorador (lista de conjuros + 4 subclases)
- [ ] **B7** págs. 112–121 · Guerrero (4 subclases)
- [ ] **B8** págs. 122–135 · Hechicero (metamagia, lista de conjuros, 4 hechicerías)
- [ ] **B9** págs. 136–147 · Mago (lista de conjuros + 4 subclases)
- [ ] **B10** págs. 148–155 · Monje (4 subclases)
- [ ] **B11** págs. 156–165 · Paladín (lista de conjuros + 4 juramentos)
- [ ] **B12** págs. 166–175 · Pícaro (4 subclases)

### Bloque C — Cap. 4: Orígenes de personaje (págs. 176–197)
- [ ] **C1** págs. 176–185 · Componentes del origen + 16 trasfondos ↔ `src/data/origins.js` (TRASFONDOS), cruce de dotes con `src/data/dotes.js`, `src/components/OriginSelector.jsx`
- [ ] **C2** págs. 186–197 · 10 especies + idiomas ↔ `src/data/origins.js` (ESPECIES, IDIOMAS_*)

### Bloque D — Cap. 5: Dotes (págs. 198–211)
- [ ] **D1** págs. 198–204 · Reglas de dotes + dotes de origen + generales (A–M) ↔ `src/data/dotes.js`
- [ ] **D2** págs. 205–211 · Dotes generales (resto), estilo de combate, don épico ↔ `src/data/dotes.js`

### Bloque E — Cap. 6: Equipo (págs. 212–233)
- [ ] **E1** págs. 212–219 · Monedas, armas, propiedades, maestría, armaduras ↔ `src/data/weapons.js`, `src/data/equipment.js`
- [ ] **E2** págs. 220–233 · Herramientas, equipo de aventureros, monturas, servicios ↔ `src/data/equipment.js`, `src/components/EquipmentSelector.jsx`

### Bloque F — Cap. 7: Conjuros (págs. 234–343)
- [ ] **F0** Comparación programática previa: inventario de conjuros del código (`src/data/spells.js`, `src/data/spells_raw.json`) vs listas por clase del manual — detecta faltantes/sobrantes y errores de nivel/escuela antes de leer página por página
- [ ] **F1** págs. 234–238 · Reglas de obtención y lanzamiento ↔ `src/data/spellSlots.js`, `src/components/SpellDescription.jsx`, lógica de conjuros en `src/components/CharacterSheet.jsx`
- [ ] **F2** págs. 239–256 · Descripciones de conjuros (1.ª tanda)
- [ ] **F3** págs. 257–274 · Descripciones (2.ª tanda)
- [ ] **F4** págs. 275–292 · Descripciones (3.ª tanda)
- [ ] **F5** págs. 293–310 · Descripciones (4.ª tanda)
- [ ] **F6** págs. 311–328 · Descripciones (5.ª tanda)
- [ ] **F7** págs. 329–343 · Descripciones (6.ª tanda)

### Bloque G — Apéndices (opcional, según relevancia para la app)
- [ ] **G1** págs. 360–377 · Ap. C: Glosario de reglas ↔ `src/components/Glossary.jsx`

## Cambio de enfoque: resúmenes propios + referencia de página (2026-06-13)

**Importante — reemplaza la pauta "verbatim" anterior.** El texto verbatim del manual es material con
copyright de Wizards of the Coast; reproducirlo a gran escala en la BD no corresponde, ni siquiera para
uso no comercial. Las **mecánicas/reglas (hechos, números, niveles, dados) no tienen copyright** y son
lo que la app realmente necesita.

Nuevo criterio para todos los rasgos (clase y subclase), dotes, etc.:
- `desc`: **resumen propio y conciso de la mecánica**, redactado con palabras propias (no una copia ni un
  reword menor del libro). Captura qué hace el rasgo, no la prosa de "sabor".
- `pagina`: número de página del Manual del Jugador 2024 donde está el texto completo, para que cada
  jugador lo lea en su propio libro. Se muestra como "p. N" junto al rasgo (`PaginaRef` en `ClassSelector`).

Estado de la reescritura:
- [x] **B1 Bárbaro** (base + 4 sendas), **B2 Bardo** (base + 4 colegios), **B3 Brujo** (base + 28
  invocaciones + 4 patrones) y **B4 Clérigo** (base + 4 dominios) rehechos con resúmenes propios + página.
  Verificado: 0 restos verbatim; descripciones ≤ ~540 caracteres (antes ~1600). Helper compartido `ASI`
  y `donEpico` también pasados a resumen propio. UI: `PaginaRef` muestra "p. N" junto a cada rasgo.
- De **B5 en adelante**: aplicar directamente este criterio (resumen propio de la mecánica + `pagina`).

## Hallazgos

Formato: `- [ ] (sesión) [R|T] pág. X — descripción — archivo:línea — severidad`

### Sesión B5 — Druida (págs. 90–101)

**Verificado (mecánicas ✓):** los 20 niveles de rasgos coinciden con la estructura del manual
(Lanzamiento de conjuros, Druídico, Orden primigenia Guardián/Naturalista, Compañero salvaje, Forma
salvaje y sus mejoras de valor de desafío 1/4→1/2→1 y vuelo, Resurgimiento salvaje, Furia elemental y su
mejora, Conjurar como bestia, Archidruida). Niveles de subclase 3/6/10/14. Los 4 círculos (Luna, Tierra,
Estrellas, Mar) con sus rasgos correctos; las listas de conjuros de círculo coinciden con
`CONJUROS_SUBCLASE` (luna, tierra por terreno, mar; estrellas no tiene lista). Lista general → **F0**.
Escrito como **resumen propio + página** (sin texto del manual). **Sin hallazgos de reglas.**

### Re-auditoría de multiclase (págs. 44–45) — 2026-06-12

Repaso regla por regla del apartado Multiclase. Reglas ya correctas: XP por nivel total ✓; PG
(nivel 1 solo en la 1.ª clase) y dados de golpe acumulados por tipo ✓; bonif. competencia por nivel
total ✓; tabla de espacios multiclase (completo + ½↑ + ⅓↓ caballero/embaucador arcano) ✓; CA con una
sola fórmula ✓.

**Hallazgos corregidos:**
- [x] (MC) [R] pág. 44 — **Requisitos mal calculados.** Se usaba "alguna característica ≥13" (OR) para
  todas las clases, pero monje, paladín y explorador exigen **dos** (AND) y guerrero admite **una de dos**
  (OR). Además no se comprobaba el requisito de la **clase primaria/actuales** ("…y en las de tus clases
  actuales"). **CORREGIDO**: campo `requisitoMulticlase {caracteristicas, modo: and|or}` en las 12 clases;
  `MulticlassPanel` aplica AND/OR correcto y avisa también si la clase primaria no cumple. Verificado por
  script (guerrero OR, monje/paladín AND).
- [x] (MC) [R] pág. 44 — **Competencias de multiclase demasiado generosas.** Se unía el entrenamiento con
  armaduras COMPLETO de cada clase secundaria; el manual da solo un subconjunto por clase (p. ej.
  multiclasear a bárbaro da únicamente Escudos, no Ligeras/Medias). **CORREGIDO**: campo
  `competenciasMulticlase {armaduras, armas, habilidadesElegir, herramientas}` en las 12 clases (transcrito
  de cada bloque "Como personaje multiclase"); el motor aplica el subconjunto a las secundarias y el
  entrenamiento completo solo a la primaria. Verificado (Mago+Bárbaro → solo Escudos).

**UX de leveo por clase (rediseño 2026-06-12):**
- [x] El panel de multiclase ahora es un **asignador de niveles**: cada nivel del personaje se asigna a
  una clase. ▲/▼ por clase suben/bajan su nivel; "+ Multiclase" da el próximo nivel a una clase nueva
  (entra en nivel 1); bajar una secundaria desde nivel 1 la elimina. Nivel total = suma (tope 20).
  El `LevelSelector` superior, cuando hay multiclase, muestra "Nivel total" y queda bloqueado (el leveo
  se hace en el asignador). Coincide con el modelo del manual: "subir de nivel en una nueva clase cada
  vez que subas de nivel, en lugar de subir de nivel en tu clase actual". Verificado en navegador
  (Bárbaro 3 → +Guerrero = 4 → ▲ Guerrero = 5 → ▲ Bárbaro = 6; tope 20; subclase por clase a nivel 3).
- [x] **El asignador vive ahora en la HOJA, no al crear** (2026-06-12): el paso 1 vuelve a ser de clase
  única. En la hoja, junto al nivel, hay un chip sutil "⚗️ Multiclase" (resaltado en oro cuando está
  activa) que abre el asignador embebido. Para clase única el campo "Nivel" se edita normalmente; al
  multiclasear pasa a mostrar "Nivel total" (bloqueado) y el leveo se hace eligiendo clase en el
  asignador. Verificado: crear Bárbaro single → hoja → ⚗️ → +Guerrero (total 4) → ▲ Guerrero (total 5,
  dados "3d12 + 2d10").

**Pendiente / limitaciones anotadas:**
- [ ] (MC) [R] pág. 44 — **Ataque adicional no acumulable**: si dos clases lo otorgan, aparece dos veces en
  la lista de rasgos sin señalar que no se acumulan (máx. 2 ataques). Solo display (el app no calcula
  ataques). **baja**.
- [ ] (MC) [R] pág. 44 — Las competencias de multiclase de **armas/habilidades/herramientas** están en los
  datos pero el motor solo auto-aplica las **armaduras**; el resto se añade desde la hoja editable. **baja**.
- [ ] (MC) [R] pág. 44 — Preparación de conjuros **por clase** (cada conjuro ligado a su clase y aptitud):
  el motor usa contadores combinados. Limitación ya conocida. **media**.

### Bugs de datos (encontrados fuera del repaso de páginas)

- [x] [R] **id de subclase duplicado rompía `npm run db:seed`** — `feerico` se usaba como id tanto en
  Brujo (Patrón feérico) como en Explorador (Errante feérico). Como `subclases.id` es PK de una sola
  columna y `personajes.subclase_id` es un FK plano a ella, el upsert fallaba con *"ON CONFLICT DO UPDATE
  command cannot affect row a second time"*. **CORREGIDO 2026-06-12**: Explorador renombrado a
  `errante_feerico` en `src/data/classes.js:574` y `src/data/spellSlots.js:352` (clave de
  `CONJUROS_SUBCLASE.explorador`). Verificado: `getConjurosSubclase` resuelve ambas subclases.
  Único duplicado en todo el dataset (trasfondos/especies/linajes/dotes verificados sin duplicados).
  ⚠️ Personajes ya guardados con la subclase del Explorador (`subclaseSeleccionada: 'feerico'`) habría
  que migrarlos a `errante_feerico` (caso borde; sin personajes así en uso).

### Sesión B4 — Clérigo (págs. 80–89) — sin correcciones

**Lo que funciona (verificado ✓):** los 20 niveles de rasgos coinciden con la tabla (Lanzamiento de
conjuros, Orden divina con sus opciones Protector/Taumaturgo, Canalizar divinidad con Chispa divina y
Expulsar muertos vivientes y sus usos 2/3/4, Abrasar muertos vivientes, Golpes benditos y su mejora,
Intercesión divina y la mayor). Niveles de subclase del clérigo **3/6/17** (propios de la clase) ✓.
Trucos 3/4/5 ✓. Los 4 dominios (Guerra, Luz, Vida, Engaño) completos y fieles, con sus tres rasgos de
nivel 3 cada uno, y conjuros de dominio que coinciden con `CONJUROS_SUBCLASE`. Lista de conjuros → **F0**.

**Hallazgos:** ninguno — el clérigo ya estaba completo y correcto.

### Sesión B3 — Brujo (págs. 68–79)

**Lo que funciona (verificado ✓):** los 20 niveles de rasgos coinciden con la tabla (Invocaciones
sobrenaturales, Magia del pacto, Astucia mágica, Contactar patrón, Arcanum místico 6/7/8/9, Maestro
sobrenatural). Trucos (2/3/4) ✓. Los 4 patrones (Celestial, Feérico, Infernal, Primigenio) completos y
fieles, incl. los tres rasgos de nivel 3 del Primigenio y los conjuros siempre preparados (que coinciden
con `CONJUROS_SUBCLASE` en `spellSlots.js`). Lista de conjuros de brujo → **F0**.

**Hallazgos:**
- [x] (B3) [R] pág. 69 — La progresión de invocaciones decía "niveles 3, 5, 7 y 9" (incorrecto). El manual
  sube a 3 (niv. 2), 5 (5), 6 (7), 7 (9), 8 (11), 9 (14) y 10 (17). **CORREGIDO** — `classLevelData.js`.
- [x] (B3) [T/gap] págs. 71–73 — Las **28 invocaciones sobrenaturales no existían** como datos (solo se
  mencionaban en el rasgo de nivel 1). **AÑADIDAS** como `INVOCACIONES_BRUJO` en `src/data/classes.js`
  (nombre, requisitos, descripción literal, repetible). Verificado: 28 invocaciones, 4 repetibles.
- [ ] (B3) [UI] No hay interfaz para **elegir invocaciones** (ni cantidad por nivel) en el creador/hoja;
  los datos ya existen para cuando se construya. **media** (feature pendiente, como las dotes).
- [ ] (B3) [DB] `INVOCACIONES_BRUJO` no se siembra a Supabase (no hay tabla); igual que
  preferencia/complejidad/requisitoMulticlase, vive en `src/data` (fuente canónica). **baja**.

### Sesión B2 — Bardo (págs. 58–67)

**Lo que funciona (verificado ✓):** los 20 niveles de rasgos de bardo coinciden con la tabla
(Inspiración bárdica con su progresión de dado d6→d12, Aprendiz de mucho, Pericia ×2, Fuente de
inspiración, Contraencantamiento, Secretos mágicos, Inspiración superior, Palabras de creación).
Trucos (2/3/4) y preparados ✓. Los 4 colegios (Danza, Conocimiento, Glamour, Valor) completos y fieles,
incl. sub-beneficios de "Juego de pies deslumbrante" y entrenamiento marcial del Valor. La CA de la
Danza (10+DES+CAR) ya está en el motor. La **lista de conjuros de bardo** (qué conjuros la integran)
se cruza en **F0** (inventario programático).

**Hallazgos:**
- [x] (B2) [T] pág. 59 — Inspiración bárdica omitía "Cada criatura no puede tener más de un dado…" y el
  matiz de que el dado se gasta al tirarlo. **CORREGIDO** — `classLevelData.js`.
- [x] (B2) [R] pág. 60 — el nivel 15 anotaba el dado d12 pero no el desbloqueo de espacios de nivel 8
  (11/13/17 sí anotaban los suyos). **CORREGIDO** — añadido "Conjuros de nivel 8" en nivel 15.

### Sesión B1 — Bárbaro (págs. 50–57)

**Lo que funciona (verificado ✓):** los 20 niveles de rasgos de bárbaro coinciden con la tabla y el
texto del manual (Furia, Maestría con armas, Ataque temerario, Golpe brutal y sus mejoras, Furia
implacable/persistente, Campeón primordial). Aumentos de furia (2→3→4→5→6 en niveles 1/3/6/12/17) ✓.
Las 4 sendas (Árbol del Mundo, Berserker, Corazón Salvaje, Fanático) están completas y fieles,
incluidas las opciones múltiples (Águila/Lobo/Oso, Búho/Pantera/Salmón, Carnero/Halcón/León) y la
reserva del Fanático (4→5→6→7 dados en 3/6/12/17). `classLevelData.js` + `classes.js`.

**Hallazgos:**
- [x] (B1) [T] pág. 52 — la elección de subclase decía "camino del bárbaro"; el manual usa "senda".
  **CORREGIDO** — `classLevelData.js` (`subclaseElegir('senda del bárbaro')`).
- [x] (B1) [R] pág. 52 — el aumento de daño por furia a +4 (nivel 16) estaba anotado, pero faltaba el
  +3 de nivel 9. **CORREGIDO** — añadido en nivel 9.
- [ ] (B1) [R] pág. 52 — la columna "Maestría con armas" (2/3/4 tipos en niveles 1/4/10) no se anota
  por nivel (solo el rasgo de nivel 1 lo describe en general). **baja** (completitud; el dato funcional
  de maestrías no se calcula). Patrón a revisar en todas las clases con esa columna.

### Sesión B0 (págs. 48–49 + tabla pág. 33)

**Lo que funciona (verificado ✓):** las descripciones one-liner de las 12 clases en la intro del
capítulo coinciden con `descripcion` en `src/data/classes.js`. (Las págs. 48–49 son solo intro;
la "tabla general de clases" con preferencia/complejidad está en la pág. 33, cap. 2.)

**Hallazgos:**
- [x] (B0 / cierra A1) [R] pág. 33 — Faltaban los campos **Preferencia** (Batalla, Actuación…) y
  **Complejidad** (Baja/Media/Alta) de la tabla "Resumen de las clases". **AÑADIDOS 2026-06-12** a las
  12 clases — `src/data/classes.js`. Verificado por script contra el manual. La característica principal
  ya estaba en `caracteristicaPrincipal`. (Surfacing en Supabase/UI: opcional, nada los consume aún.)

### Sesión A3 (págs. 46–47)

**Lo que funciona (verificado ✓):** las 100 bagatelas de la tabla 1d100 están presentes, completas,
en el orden correcto y sin duplicados — `src/data/bagatelas.js`. Mapeo 1d100 → índice (resultado-1) correcto.

**Hallazgos:**
- [x] (A3) [T] pág. 46 — La bagatela 47 omitía el paréntesis final del manual:
  "…o cristales rotos **(a tu elección)**". **CORREGIDO 2026-06-12** — `src/data/bagatelas.js:51`.

Con A3 queda **cerrado el bloque A (Cap. 2: Crear un personaje)** salvo la épica de multiclase
(ya implementada) y los hallazgos diferidos a sus bloques (preferencia/complejidad → B0; `RASGOS_POR_TRASFONDO` → C1).

### Sesión A2 (págs. 41–45)

Nota: estas páginas son **tablas de reglas**, no descripciones de sabor → no hay eje (T) que revisar.
Los "Escalones del juego" (págs. 42–43) son texto narrativo de campaña, no datos de personaje (fuera de alcance de la BD).

**Lo que funciona (verificado ✓):**
- Tabla "Progreso de los personajes" (XP + bonificador de competencia, niveles 1–20): coincide
  exactamente con el manual — `src/data/levelProgression.js:4-25`.
- PG nivel 1 por clase (d12→12, d10→10, d8→8, d6→6 + Con) y PG fijos por nivel 2+
  (Bárbaro 7, Explorador/Guerrero/Paladín 6, resto d8 5, Hechicero/Mago 4 + Con): exactos — `:29-34`.
- Bonificador de competencia por nivel (`getBonoCompetencia`): correcto.
- Comenzar en nivel superior: el `LevelSelector` permite niveles 1–20 y el XP del nivel usa la
  cantidad mínima del nivel ("Comienzas con la cantidad mínima de PX"): correcto.
- Fórmulas de CA base, iniciativa, ataques c/c y a distancia, CD de conjuros (pág. 41): ya verificadas
  en `src/data/character.js` (Fase 1).

**Hallazgos:**
- [x] (A2) [R] págs. 44–45 — **Multiclase IMPLEMENTADA 2026-06-12.** Estado aditivo `clasesSecundarias`
  (cero regresión en una sola clase). Motor (`src/data/character.js`): nivel total = suma de niveles,
  bonif. por competencia y XP por nivel total, PG (nivel 1 solo en la primaria + valor fijo por nivel de
  cada clase), dados de golpe agrupados por tipo ("6d8 + 1d10"), salvaciones solo de la primaria,
  entrenamiento con armaduras unión de todas las clases, rasgos de todas las clases, mejor "Defensa sin
  armadura" entre clases. Conjuros (`src/data/spellSlots.js`): nivel de lanzador multiclase (completo +
  ½ ↑ + ⅓ ↓ caballero/embaucador arcano) → tabla pág. 45; Magia del pacto del brujo aparte. UI:
  `src/components/MulticlassPanel.jsx` (añadir/quitar/subir nivel + aviso de requisito ≥13) y desglose en
  la hoja. Persistencia local + Supabase (migración 003, columna `clases_secundarias`).
  **Pendiente** `npm run db:seed` no aplica (es schema); re-ejecutar **migración 003**.
  Limitaciones conocidas: la preparación de conjuros por clase usa contadores combinados (no separa
  listas por clase); el gasto de dados de golpe usa un contador total (no por tipo de dado).
- [ ] (A2) [R] pág. 43 — Falta la tabla **"Equipo inicial a niveles superiores"** (oro y objetos
  mágicos según el escalón al empezar en nivel >1). Es guía de DM y el paso de Equipo no la consume
  hoy — **baja** (opcional; se decide en sesión E2).
- [x] (A2) [doc] pág. 41 — Comentario de fuente decía "pág. 36"; la tabla "Progreso de los personajes"
  está en la pág. 41. **CORREGIDO 2026-06-12** — `src/data/levelProgression.js:1`.

### Sesión A1 (págs. 32–40)

**Lo que funciona (verificado ✓):**
- Conjunto estándar `[15,14,13,12,10,8]`, coste en puntos (27 pts, tabla 8→0…15→9) y
  conjunto estándar por clase: las 12 clases coinciden exactamente con el manual — `src/data/abilityScores.js`.
- Fórmula de modificador `floor((p-10)/2)` y 4d6 descartando el menor — correctas.
- Idiomas estándar (10) e inusuales (9) con sus orígenes y los 4 dialectos del primordial:
  coinciden palabra por palabra — `src/data/origins.js:438-461`.
- Estructura de los 5 pasos de creación y los 9 alineamientos (ids/abreviaturas) — correcta.
- Cálculo de PG nivel 1 por clase y Percepción pasiva (10 + mod) — correcto (ya validado en Fase 1).

**Hallazgos:**
- [x] (A1) [T] pág. 39 — Las descripciones de los 9 alineamientos estaban **parafraseadas/resumidas**.
  **CORREGIDO 2026-06-12**: reemplazadas por el texto literal del manual — `src/data/description.js:3-67`.
  Verificado en el paso Descripción (Neutral Bueno muestra el texto completo). ⏳ Falta correr
  `npm run db:seed` con credenciales (`.env.local` con `VITE_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`)
  para sincronizar Supabase — no disponible en este worktree.
- [ ] (A1) [R] pág. 33 — La tabla "Resumen de las clases" del manual incluye **Preferencia** (Batalla,
  Actuación, Ocultismo…) y **Complejidad** (Baja/Media/Alta) por clase; estos campos **no existen** en
  `src/data/classes.js`. Falta agregarlos — **baja**.
- [ ] (A1) [R] pág. 36 / cap. 4 — `RASGOS_POR_TRASFONDO` usa trasfondos que **no son del PHB 2024**
  (`guerrero`, `proscrito`, `sabio`, `urchin` — son de 2014) y faltan los reales `escriba`, `guardia`,
  `guia`, `vagabundo`. Además el PHB 2024 no trae tablas de rasgos de personalidad por trasfondo (movió
  esa guía a las tablas por alineamiento, pág. 40). Revisar el origen de estos datos — `src/data/description.js:70-204` — **media** (se cierra en sesión C1).
- [ ] (A1) [T] pág. 39 — Posible inversión en `CALIFICATIVOS_CARACTERISTICA.Carisma`: "Dominante"
  figura en el manual como calificativo **alto**, pero el código lo tiene en `baja` y pone "Atrevido"
  en `alta`. Re-verificar con texto limpio del PDF — `src/data/description.js:247` — **baja**.

## Registro de sesiones

| Sesión | Fecha | Resultado |
|--------|-------|-----------|
