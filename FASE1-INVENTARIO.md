# Fase 1.1 — Inventario: hoja oficial (ES_Character_Sheet.pdf) vs aplicación

Mapeo campo por campo de la hoja oficial española de D&D 2024 (2 páginas) contra:
- **Estado**: `crearEstadoInicial` ([storage.js](src/data/storage.js)) + estado de [App.jsx](src/App.jsx)
- **Motor**: `calcularPersonaje` ([character.js](src/data/character.js))
- **UI**: [CharacterSheet.jsx](src/components/CharacterSheet.jsx) (Hoja1 / Hoja2 / Hoja3)
- **Supabase**: `002_schema_completo.sql` (upsert_personaje / cargar_personaje_completo)

Leyenda editabilidad: ✏️ editable directo · 🔒 solo lectura · ⚙️ override solo en "modo edición" · ❌ no existe

## Página 1 oficial

| Campo oficial | En la app | Autocompleta | Editable | Persiste local | Persiste Supabase |
|---|---|---|---|---|---|
| Nombre del personaje | header Hoja1 | — | ✏️ | ✓ | ✓ |
| Trasfondo / Clase / Especie / Subclase | selects header | — | ✏️ | ✓ | ✓ |
| Nivel / PX | header | XP por tabla | ✏️ | ✓ | **✗ XP no se guarda en BD** |
| Clase de Armadura | cs-combat | ✓ (sin armadura/rasgos) | ⚙️ | ✓ | ✓ |
| **Escudo** (rombo bajo CA) | ❌ no existe | — | ❌ | — | — |
| PG actuales / máx / temp | cs-combat | ✓ máx (fijo o tirada) | ✏️ | ✓ | actuales/temp ✓ · **✗ pgMaxPersonalizado** |
| Dados de golpe (máx/gastados) | tracker burbujas | ✓ | ✏️ | ✓ | **✗ dadosGolpeGastados** |
| Salvaciones contra muerte (3É/3F) | cs-combat | — | ✏️ | ✓ | ✓ |
| Bonificador por competencia | cs-combat | ✓ | ⚙️ | ✓ | ✓ (override) |
| **Inspiración heroica** | botón ★ | — | ✏️ | **✗ useState local, se pierde al recargar** | ✗ |
| 6 características (punt. + mod.) | ca-group ×6 | ✓ | ✏️ (ajusta base) | ✓ | ✓ |
| Tiradas de salvación ×6 (○ + valor) | DotRow | ✓ | 🔒 (override solo vía EditorAmigable, que está huérfano) | ✓ | **✗ overrides profundos** |
| 18 habilidades (○ + valor) | DotRow | ✓ | 🔒 ídem; **○ competencia no toggleable a mano** | ✓ | **✗ overrides profundos** |
| Iniciativa / Velocidad | cs-combat | ✓ | ⚙️ | ✓ | ✓ |
| Tamaño | cs-combat | ✓ (especie) | 🔒 sin override | ✓ | ✓ (vía especie) |
| Percepción pasiva | cs-combat | ✓ | ⚙️ | ✓ | ✓ |
| Armas y trucos de daño (tabla) | SheetSection | ✓ (equipo) + custom | ✏️ | ✓ | **✗ ataques custom pierden ~15 campos** (solo nombre llega; los nombres JSON no coinciden: `bonif`/`dano` vs `bonAtaque`/`daño`) |
| Rasgos de clase | SheetSection | ✓ | 🔒 (texto fijo de datos) | — | — |
| Atributos de especie | SheetSection | ✓ | 🔒 | — | — |
| Dotes | SheetSection | ✓ (trasfondo/ASI/libres) | ✏️ (modales) | ✓ | **✗ dotesElegidos, dotesLibres, bonusASI no se guardan en BD** |
| Entrenamiento con armaduras (4 rombos) | texto en sección | ✓ | 🔒 (lista de texto, sin rombos ni edición) | — | — |
| Armas / Herramientas (competencias) | texto en sección | ✓ | 🔒 | — | — |

## Página 2 oficial

| Campo oficial | En la app | Autocompleta | Editable | Persiste local | Persiste Supabase |
|---|---|---|---|---|---|
| Aptitud mágica (característica) | conj-header (Hoja3) | ✓ | 🔒 | — | — |
| Mod. aptitud / CD salvación / Bonif. ataque | conj-header | ✓ | 🔒 (override huérfano) | ✓ | **✗ overrides de conjuros** |
| Espacios de conjuro Nv1–9 (total/gastados) | burbujas interactivas | ✓ | ✏️ | ✓ | **✗ BUG: clave `'pacto'` rompe el upsert** (`(kv.key)::INTEGER` con brujo) |
| Trucos y conjuros preparados (tabla: nivel, nombre, **tiempo, alcance, C/R/M, notas**) | listas por nivel | ✓ nombre/escuela | ✏️ elegir/quitar | ✓ | ✓ nombres · **✗ columnas tiempo/alcance/C-R-M/notas no se muestran en la hoja** (solo en modal de detalle) |
| Aspecto | Hoja2 (apariencia + descripción) | — | ✏️ | ✓ | ✓ |
| Historia y personalidad | Hoja2 + fila personalidad | — | ✏️ | ✓ | ✓ |
| Alineamiento | select header | — | ✏️ | ✓ | ✓ |
| **Idiomas** (sección propia) | texto dentro de "Entrenamiento y competencias" | ✓ (origen) | 🔒 en la hoja (solo editable en el creador) | ✓ | ✓ |
| Equipo | SheetSection + añadir inline | ✓ | ✏️ | ✓ | ✓ |
| **Sintonización con objetos mágicos (×3)** | ❌ no existe | — | ❌ | ✗ | ✗ |
| Monedas PC/PP/PE/PO/**PPT** | pie Hoja1 (PC/PP/PE/PO/**PA**) | ✓ iniciales | ✏️ | ✓ | ✓ (como `pa`) |

## Bugs detectados durante el inventario

> **Estado (jun 2026):** los bugs 1–8 quedaron corregidos en el paso 1.2
> (migración `supabase/migrations/003_hoja_editable.sql` — **falta aplicarla en Supabase** —
> + cambios en `storage.js`, `App.jsx` y `CharacterSheet.jsx`). El 9 se mitigó en el RPC
> (lee `origen.trasfondo` con fallback a `descripcion.trasfondoId`). Además se corrigió
> que `pgActuales` no se restauraba al cargar un personaje.

1. **`espaciosUsados['pacto']` rompe `upsert_personaje`**: la tabla `personaje_espacios_conjuro.nivel` es INTEGER y el RPC castea la clave con `::INTEGER`. Un brujo que gastó espacios de pacto hace fallar el guardado completo en Supabase.
2. **Ataques custom no sobreviven el round-trip por Supabase**: `upsert_personaje` lee `a->>'bonif'`, `a->>'dano'`, `a->>'tipoDano'` pero el objeto JS usa `bonAtaque`, `daño`, `tipoDanio`, y además tiene ~15 campos más (característica, competencia, bonos, crítico, alcance, propiedades, maestría, notas) que no se guardan.
3. **Inspiración heroica no se persiste**: es `useState(false)` local en Hoja1; se pierde al recargar o cambiar de pestaña de personaje.
4. **`EditorAmigable` es código muerto**: el modal de overrides (habilidades, salvaciones, CD de conjuros…) está definido en CharacterSheet.jsx:3137 pero nunca se monta → en la práctica esos valores no son editables.
5. **Velocidad: número vs texto**: `especie.velocidad` es `'9 m'` (string) pero el input de la hoja y el override son `type="number"` → el valor calculado no se muestra y el EditorAmigable dice "(pies)".
6. **Campos sueltos sin columna en BD**: `bonusASI`, `dotesElegidos`, `dotesLibres`, `xpNivelActual`, `dadosGolpeGastados`, `pgMaxPersonalizado` se guardan en localStorage pero `cargar_personaje_completo` no los devuelve → un personaje sincronizado en otro dispositivo pierde dotes, ASI y XP.
7. **Overrides profundos no persisten en BD**: `personaje_overrides` tiene 5 columnas fijas; los overrides anidados (`habilidades.X.total`, `conjuros.cdSalvacion`…) que permite `buildDiff` se pierden.
8. **`crearEstadoInicial` desactualizado**: no incluye `bonusASI`, `dotesElegidos`, `dotesLibres`, `xpNivelActual`, `dadosGolpeGastados`, `pgMaxPersonalizado` aunque App.jsx los persiste.
9. **Trasfondo duplicado en el guardado**: el RPC lee el trasfondo de `descripcion.trasfondoId`, no de `origen.trasfondo` — verificar que App.jsx los mantenga sincronizados siempre.

## Faltantes puros de UI (para 1.3 / 1.4)

> **Estado (jun 2026):** todos resueltos en 1.3/1.4 salvo el marcado como pendiente.

- [x] Rombo de **escudo** junto a la CA (+2 CA vía motor, `escudoEquipado`).
- [x] **Sintonización con objetos mágicos** (3 renglones con rombo) — hecho en 1.2.
- [x] **Idiomas** editables (chips con añadir/quitar en la sección de competencias).
- [x] Rombos de **entrenamiento con armaduras** (toggleables en modo edición, override en `personajeOverrides.competenciasArmaduras`).
- [ ] Competencias de **armas/herramientas** editables (siguen siendo texto fijo) → 1.5.
- [x] Ficha de conjuros con **tiempo de lanzamiento, alcance, C/R/M y notas** (`conjurosHojaConfig`).
- [x] **Tamaño** editable (override en `personajeOverrides.especie.tamano`).
- [x] Toggle manual de **competencia/pericia** por habilidad y salvación (`competenciasOverride`, ciclo auto→competencia→pericia→ninguna→auto, marcado con borde punteado dorado).
- [x] Moneda de platino: **PA → PPT** — hecho en 1.2.
- [x] Editor de overrides montado (botón "⚙ Valores" en modo edición) — hecho en 1.2.

## Decisión de diseño para 1.3/1.4

La hoja actual ya implementa la mayor parte de la estructura oficial (3 pestañas ≈ 2 páginas oficiales + extras). **No se reescribe desde cero**: se evoluciona sección por sección hacia el layout oficial cerrando los gaps de esta lista, que funciona como spec. El orden recomendado: primero 1.2 (persistencia: bugs 1–8), después UI.
