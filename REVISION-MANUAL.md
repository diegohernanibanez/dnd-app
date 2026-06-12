# Revisión: Manual del Jugador 2024 vs código de la app

Objetivo: detectar inconsistencias entre el manual (`public/Manual del Jugador 2024.pdf`, 385 págs.)
y el código de creación de personajes, repasando desde la página 32 hasta el final, sin saltear nada.

## Metodología por sesión

1. Leer las páginas del PDF de la sesión (lectura visual con la herramienta Read, máx. 20 págs. por tanda).
2. Comparar contra los archivos de código indicados (datos + componente que los consume).
3. Registrar cada inconsistencia en la sección **Hallazgos** con formato:
   `- [ ] (sesión) pág. X — descripción — archivo:línea — severidad (alta/media/baja)`
4. Marcar la sesión como hecha en el checklist y anotar la fecha.
5. Las correcciones se aplican aparte (por bloque o al final), no durante el repaso.
6. Toda corrección se hace en `src/data/*.js` (fuente canónica versionada) y se cierra el
   bloque con `npm run db:seed` para sincronizar las tablas de referencia de Supabase.

Este documento es la **Fase 2** del plan maestro (`PLAN.md`); la Fase 1 es la hoja de
personaje editable basada en `public/ES_Character_Sheet.pdf`.

## Checklist de sesiones

### Bloque A — Cap. 2: Crear un personaje (págs. 32–47)
- [ ] **A1** págs. 32–40 · Pasos de creación (clase, origen, características, detalles) ↔ `src/App.jsx`, `src/components/ClassSelector.jsx`, `src/components/OriginSelector.jsx`, `src/components/AbilityScoreGenerator.jsx`, `src/data/abilityScores.js`, `src/data/character.js`
- [ ] **A2** págs. 41–45 · Progresión de niveles, comenzar en niveles superiores, multiclase ↔ `src/data/levelProgression.js`, `src/components/LevelSelector.jsx`, `src/data/classLevelData.js`
- [ ] **A3** págs. 46–47 · Bagatelas ↔ `src/data/bagatelas.js`

### Bloque B — Cap. 3: Clases de personaje (págs. 48–175)
Cada sesión compara rasgos por nivel, dado de golpe, salvaciones, competencias, subclases y
(si aplica) lista de conjuros ↔ `src/data/classes.js`, `src/data/classLevelData.js`, `src/data/spellSlots.js`, `src/data/spells.js`.
- [ ] **B0** págs. 48–49 · Introducción del capítulo y tabla general de clases
- [ ] **B1** págs. 50–57 · Bárbaro (4 sendas)
- [ ] **B2** págs. 58–67 · Bardo (lista de conjuros + 4 colegios)
- [ ] **B3** págs. 68–79 · Brujo (invocaciones, lista de conjuros, 4 patrones)
- [ ] **B4** págs. 80–89 · Clérigo (lista de conjuros + 4 dominios)
- [ ] **B5** págs. 90–101 · Druida (lista de conjuros + 4 círculos)
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

## Hallazgos

(ninguno todavía)

## Registro de sesiones

| Sesión | Fecha | Resultado |
|--------|-------|-----------|
