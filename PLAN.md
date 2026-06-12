# Plan maestro — dnd-app

Finalidad: que el grupo pueda llevar el estado de sus personajes de D&D 2024 con una
creación intuitiva y una **hoja de personaje completamente editable**, respetando las
reglas del manual, con datos en Supabase y diseño abierto a homebrew futuro.

## Estado actual de la arquitectura (verificado jun 2026)

- `src/data/*.js` — fuente canónica de datos de referencia (clases, trasfondos, especies,
  dotes, conjuros, armas, progresión). Versionada en git.
- `npm run db:seed` (`supabase/seeds/seed.js`) — sube esos datos a las tablas de referencia
  de Supabase (`clases`, `subclases`, `rasgos_clase`, `trasfondos`, `especies`, `linajes`,
  `dotes`, `conjuros`, `armas`, `alineamientos`, `progreso_nivel`).
- Personajes: localStorage primero + sync a Supabase en tablas normalizadas
  (`personajes`, `personaje_*`) vía RPC `upsert_personaje` / `cargar_personaje_completo`.
- Ya existe un embrión de overrides (`personajeOverrides` + `buildDiff` en
  `CharacterSheet.jsx`) que es la base del patrón "autocompletado pero editable".

Regla operativa: **toda corrección de datos se hace en `src/data/*.js` y se cierra con
`npm run db:seed`** — así git tiene el historial y Supabase queda sincronizado.

## Fase 1 — Hoja de personaje editable (réplica de ES_Character_Sheet)

Reemplazar la hoja actual por una réplica editable de la hoja oficial española
(`public/ES_Character_Sheet.pdf`, 2 páginas). Cada campo se autocompleta desde las
elecciones del creador pero es editable; los campos calculados usan el patrón override
(valor calculado ↔ valor manual + botón "recalcular").

- [x] **1.1 Inventario de campos** (jun 2026): ver `FASE1-INVENTARIO.md` — mapeo completo
      + 9 bugs de persistencia detectados.
- [x] **1.2 Modelo de datos** (jun 2026): migración `003_hoja_editable.sql` (⚠ pendiente de
      aplicar en Supabase), `crearEstadoInicial` completo, inspiración y sintonización
      persistidas, overrides profundos en JSONB, editor de valores montado, fix de
      pgActuales/velocidad/pacto/armasCustom.
- [x] **1.3 Página 1 editable** (jun 2026): rombo de escudo (+2 CA), toggle manual de
      competencia/pericia en habilidades y salvaciones (vía `competenciasOverride` en el
      motor), rombos de entrenamiento con armaduras, idiomas como chips editables,
      tamaño editable. Pendiente menor: armas/herramientas siguen siendo texto fijo.
- [x] **1.4 Página 2 conjuros** (jun 2026): ficha oficial por conjuro con tiempo de
      lanzamiento, alcance, marcas C/R/M y notas editables (`conjurosHojaConfig`),
      aplicada a trucos, conjuros de subclase y preparados.
- [ ] **1.5 Verificación con personajes reales**: probar la hoja con los personajes del
      grupo, pulir detalles de layout vs hoja oficial, hacer editables las competencias
      de armas/herramientas.

## Fase 2 — Revisión del manual vs datos (plan detallado en `REVISION-MANUAL.md`)

Repaso página por página del Manual del Jugador 2024 (desde pág. 32) contra los datos de
la app: ~29 sesiones en 7 bloques (creación, clases, orígenes, dotes, equipo, conjuros,
glosario). Correcciones por bloque en `src/data/*.js` + re-seed.

Puede intercalarse con la Fase 1 (las sesiones son cortas e independientes); lo ideal es
tener los bloques A–E revisados antes de dar por cerrada la Fase 1.5, porque validan los
datos que autocompletan la hoja.

## Fase 3 — Soporte homebrew (futuro)

No se implementa todavía, pero las fases 1–2 deben dejarlo barato:

- Columna `fuente` (`'phb2024'` / `'homebrew'`) en tablas de referencia cuando se toque
  el esquema.
- Nada de reglas hardcodeadas en componentes: todo dato de juego sale de `src/data/*.js`
  (y a futuro, de Supabase).
- El patrón override de la hoja ya cubre el homebrew "suave" (ajustar valores a mano).

## Fase 4 — Simulador de combate (futuro)

Recién cuando las fases 1–3 estén refinadas. La hoja editable con estado persistido
(PG, espacios, condiciones) es el insumo directo del simulador.
