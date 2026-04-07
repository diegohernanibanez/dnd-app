import { useState, useMemo } from 'react';
import {
  CARACTERISTICAS,
  CONJUNTO_ESTANDAR,
  COSTE_PUNTOS,
  PUNTOS_TOTALES,
  CONJUNTO_POR_CLASE,
  calcModificador,
  formatModificador,
  generarPuntuacionesAleatorias,
} from '../data/abilityScores';
import { TRASFONDOS } from '../data/origins';
import { getClaseById } from '../data/classes';
import { HABILIDADES, HABILIDADES_LISTA, CARACTERISTICAS_ABBREV } from '../data/character';
import './AbilityScoreGenerator.css';

const ABREV = {
  Fuerza: 'FUE', Destreza: 'DES', Constitución: 'CON',
  Inteligencia: 'INT', Sabiduría: 'SAB', Carisma: 'CAR',
};

const METODOS = [
  {
    id: 'estandar',
    nombre: 'Conjunto estándar',
    desc: 'Usa las 6 puntuaciones fijas: 15, 14, 13, 12, 10 y 8. Asígnalas como prefieras.',
  },
  {
    id: 'aleatorio',
    nombre: 'Generación aleatoria',
    desc: 'Tira 4d6 y descarta el dado más bajo. Repite 6 veces para obtener tus puntuaciones.',
  },
  {
    id: 'puntos',
    nombre: 'Coste en puntos',
    desc: 'Tienes 27 puntos para repartir entre tus características. Cada puntuación tiene un coste diferente.',
  },
];

// ─── Fila de una característica ────────────────────────────────────

function CaracteristicaFila({ nombre, puntuacionBase, bonusTrasfondo, metodo, disponibles, asignada, onAsignar, onPuntosChange }) {
  const total = (puntuacionBase ?? 0) + (bonusTrasfondo ?? 0);
  const mod = puntuacionBase != null ? calcModificador(total) : null;

  return (
    <div className={`ca-fila ${asignada ? 'ca-fila--asignada' : ''}`}>
      <div className="ca-fila__nombre">
        <span className="ca-abrev">{ABREV[nombre]}</span>
        <span className="ca-nombre-completo">{nombre}</span>
      </div>

      {/* Selector de puntuación según método */}
      <div className="ca-fila__input">
        {metodo === 'estandar' || metodo === 'aleatorio' ? (
          <select
            className="ca-select"
            value={puntuacionBase ?? ''}
            onChange={(e) => onAsignar(nombre, e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">—</option>
            {disponibles.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
            {puntuacionBase != null && !disponibles.includes(puntuacionBase) && (
              <option value={puntuacionBase}>{puntuacionBase}</option>
            )}
          </select>
        ) : (
          <div className="ca-puntos-ctrl">
            <button
              className="ca-puntos-btn"
              onClick={() => onPuntosChange(nombre, -1)}
              disabled={puntuacionBase <= 8}
              aria-label={`Reducir ${nombre}`}
            >−</button>
            <span className="ca-puntos-valor">{puntuacionBase ?? 8}</span>
            <button
              className="ca-puntos-btn"
              onClick={() => onPuntosChange(nombre, +1)}
              disabled={puntuacionBase >= 15}
              aria-label={`Aumentar ${nombre}`}
            >+</button>
          </div>
        )}
      </div>

      {/* Bonus trasfondo */}
      <div className="ca-fila__bonus">
        {bonusTrasfondo > 0 && (
          <span className="ca-bonus">+{bonusTrasfondo}</span>
        )}
      </div>

      {/* Total y modificador */}
      <div className="ca-fila__total">
        {puntuacionBase != null ? (
          <>
            <span className="ca-total">{total}</span>
            <span className={`ca-mod ${mod >= 0 ? 'ca-mod--pos' : 'ca-mod--neg'}`}>
              {formatModificador(mod)}
            </span>
          </>
        ) : (
          <span className="ca-total ca-total--vacio">—</span>
        )}
      </div>
    </div>
  );
}

// ─── Componente principal ───────────────────────────────────────────

export default function AbilityScoreGenerator({ puntuaciones, onCambiar, claseId, trasfondoId, bonusTrasfondo, onBonusChange, habilidadesClase, onHabilidadesClaseChange }) {
  const [metodo, setMetodo] = useState('estandar');
  const [puntosPool, setPuntosPool] = useState(CONJUNTO_ESTANDAR.slice());
  const [puntosUsados, setPuntosUsados] = useState(
    Object.fromEntries(CARACTERISTICAS.map((c) => [c, 8]))
  );
  const [modoManual, setModoManual] = useState(false);
  const [valoresManuales, setValoresManuales] = useState(Array(6).fill(''));

  // bonusTrasfondo = { modo: null|'dos'|'tres', stats: { Fuerza: 2, ... } }
  // estado levantado a App.jsx para que character.js pueda usar el bonus

  const trasfondo = TRASFONDOS.find((t) => t.id === trasfondoId);
  const statsTrasfondo = trasfondo?.puntuacionesCaracteristica ?? [];

  // Pool de valores según método
  const pool = metodo === 'estandar' ? CONJUNTO_ESTANDAR : puntosPool;

  // Puntuaciones asignadas según método
  const puntuacionesActuales = metodo === 'puntos'
    ? puntosUsados
    : puntuaciones;

  // Valores ya usados en asignación (estandar/aleatorio)
  const valoresUsados = Object.values(puntuaciones).filter((v) => v != null);
  const disponiblesPara = (nombreStat) => {
    const usadosSinEsta = CARACTERISTICAS
      .filter((c) => c !== nombreStat)
      .map((c) => puntuaciones[c])
      .filter((v) => v != null);
    // Construir pool restante contando duplicados
    const restante = [...pool];
    for (const u of usadosSinEsta) {
      const idx = restante.indexOf(u);
      if (idx !== -1) restante.splice(idx, 1);
    }
    return [...new Set(restante)].sort((a, b) => b - a);
  };

  // Puntos restantes en coste en puntos
  const puntosGastados = useMemo(
    () => CARACTERISTICAS.reduce((s, c) => s + (COSTE_PUNTOS[puntosUsados[c]] ?? 0), 0),
    [puntosUsados]
  );
  const puntosRestantes = PUNTOS_TOTALES - puntosGastados;

  // Sugerencia para la clase
  const sugerenciaClase = claseId ? CONJUNTO_POR_CLASE[claseId] : null;

  // ── Handlers ────────────────────────────────────────────────────

  const handleMetodo = (id) => {
    setMetodo(id);
    setModoManual(false);
    setValoresManuales(Array(6).fill(''));
    if (id === 'estandar') {
      onCambiar(Object.fromEntries(CARACTERISTICAS.map((c) => [c, null])));
    } else if (id === 'aleatorio') {
      const nuevas = generarPuntuacionesAleatorias();
      setPuntosPool(nuevas);
      onCambiar(Object.fromEntries(CARACTERISTICAS.map((c) => [c, null])));
    } else {
      setPuntosUsados(Object.fromEntries(CARACTERISTICAS.map((c) => [c, 8])));
      onCambiar(Object.fromEntries(CARACTERISTICAS.map((c) => [c, 8])));
    }
  };

  const handleRetirar = () => {
    const nuevas = generarPuntuacionesAleatorias();
    setPuntosPool(nuevas);
    onCambiar(Object.fromEntries(CARACTERISTICAS.map((c) => [c, null])));
  };

  const handleToggleManual = () => {
    const entrando = !modoManual;
    setModoManual(entrando);
    if (!entrando) {
      // Volver a tirada virtual
      const nuevas = generarPuntuacionesAleatorias();
      setPuntosPool(nuevas);
      setValoresManuales(Array(6).fill(''));
      onCambiar(Object.fromEntries(CARACTERISTICAS.map((c) => [c, null])));
    } else {
      setValoresManuales(Array(6).fill(''));
      onCambiar(Object.fromEntries(CARACTERISTICAS.map((c) => [c, null])));
    }
  };

  const handleValorManual = (idx, raw) => {
    const nuevo = raw === '' ? '' : Math.min(18, Math.max(1, Number(raw)));
    const nuevos = valoresManuales.map((v, i) => i === idx ? (raw === '' ? '' : nuevo) : v);
    setValoresManuales(nuevos);
    const completos = nuevos.filter((v) => v !== '' && Number(v) >= 3 && Number(v) <= 18).map(Number);
    if (completos.length === 6) {
      const sorted = [...completos].sort((a, b) => b - a);
      setPuntosPool(sorted);
    } else {
      setPuntosPool(nuevos.filter((v) => v !== '').map(Number).sort((a, b) => b - a));
    }
    onCambiar(Object.fromEntries(CARACTERISTICAS.map((c) => [c, null])));
  };

  const manualesCompletos = valoresManuales.every((v) => v !== '' && Number(v) >= 3 && Number(v) <= 18);

  const handleAsignar = (stat, valor) => {
    onCambiar({ ...puntuaciones, [stat]: valor });
  };

  const handlePuntosChange = (stat, delta) => {
    const actual = puntosUsados[stat];
    const nuevo = actual + delta;
    if (nuevo < 8 || nuevo > 15) return;
    const costeDelta = COSTE_PUNTOS[nuevo] - COSTE_PUNTOS[actual];
    if (costeDelta > puntosRestantes) return;
    const nuevas = { ...puntosUsados, [stat]: nuevo };
    setPuntosUsados(nuevas);
    onCambiar(nuevas);
  };

  const handleSugerencia = () => {
    if (!sugerenciaClase) return;
    if (metodo === 'puntos') {
      const capadas = Object.fromEntries(
        Object.entries(sugerenciaClase).map(([k, v]) => [k, Math.min(v, 15)])
      );
      setPuntosUsados(capadas);
      onCambiar(capadas);
    } else {
      onCambiar({ ...sugerenciaClase });
    }
  };

  const handleBonusTrasfondo = (modo) => {
    onBonusChange({ modo, stats: {} });
  };

  // Calcula bonus por característica según selección del trasfondo
  const getBonusTrasfondo = (stat) => bonusTrasfondo?.stats?.[stat] ?? 0;

  const toggleBonusStat = (stat, valor) => {
    const stats = { ...bonusTrasfondo.stats };
    if (stats[stat] === valor) {
      delete stats[stat];
    } else {
      stats[stat] = valor;
    }
    onBonusChange({ ...bonusTrasfondo, stats });
  };

  // Validación de selección de bonus
  const bonusValido = useMemo(() => {
    if (!trasfondo || bonusTrasfondo?.modo === null) return false;
    const vals = Object.values(bonusTrasfondo?.stats ?? {});
    if (bonusTrasfondo.modo === 'dos') return vals.includes(2) && vals.includes(1) && vals.length === 2;
    if (bonusTrasfondo.modo === 'tres') return vals.filter((v) => v === 1).length === 3;
    return false;
  }, [bonusTrasfondo, trasfondo]);

  // ── Render ───────────────────────────────────────────────────────

  return (
    <section className="ability-generator">
      <div className="ability-generator__intro">
        <h2>Paso 3: Puntuaciones de característica</h2>
        <p>
          Las 6 características definen las capacidades físicas y mentales de tu personaje.
          Elige un método para determinar sus valores.
        </p>
      </div>

      {/* Selector de método */}
      <div className="metodo-selector">
        {METODOS.map((m) => (
          <button
            key={m.id}
            className={`metodo-btn ${metodo === m.id ? 'metodo-btn--active' : ''}`}
            onClick={() => handleMetodo(m.id)}
          >
            <span className="metodo-btn__nombre">{m.nombre}</span>
            <span className="metodo-btn__desc">{m.desc}</span>
          </button>
        ))}
      </div>

      {/* Controles específicos del método */}
      <div className="metodo-controles">
        {metodo === 'aleatorio' && !modoManual && (
          <button className="btn-tirar" onClick={handleRetirar}>
            🎲 Volver a tirar
          </button>
        )}
        {metodo === 'aleatorio' && (
          <button
            className={`btn-manual ${modoManual ? 'btn-manual--active' : ''}`}
            onClick={handleToggleManual}
          >
            {modoManual ? '🖥️ Usar tirada virtual' : '🎲 Tengo dados físicos'}
          </button>
        )}
        {metodo === 'aleatorio' && modoManual && (
          <div className="manual-input-area">
            <p className="manual-input-label">
              Introduce tus 6 tiradas <span>(4d6, descarta el dado más bajo · valores entre 3 y 18)</span>
            </p>
            <div className="manual-inputs">
              {valoresManuales.map((v, i) => (
                <div key={i} className="manual-input-slot">
                  <label className="manual-input-num">#{i + 1}</label>
                  <input
                    type="number"
                    className={`manual-input ${v !== '' && (Number(v) < 3 || Number(v) > 18) ? 'manual-input--error' : v !== '' ? 'manual-input--ok' : ''}`}
                    min={3}
                    max={18}
                    value={v}
                    placeholder="—"
                    onChange={(e) => handleValorManual(i, e.target.value)}
                  />
                </div>
              ))}
            </div>
            {manualesCompletos && (
              <p className="manual-ok">✓ Pool listo — asigna los valores a tus características</p>
            )}
            {!manualesCompletos && valoresManuales.some((v) => v !== '') && (
              <p className="manual-pendiente">
                {valoresManuales.filter((v) => v !== '').length} / 6 tiradas introducidas
              </p>
            )}
          </div>
        )}
        {metodo === 'puntos' && (
          <div className="puntos-restantes">
            <span>Puntos restantes:</span>
            <span className={`puntos-num ${puntosRestantes === 0 ? 'puntos-num--ok' : puntosRestantes < 0 ? 'puntos-num--error' : ''}`}>
              {puntosRestantes} / {PUNTOS_TOTALES}
            </span>
          </div>
        )}
        {(metodo === 'estandar' || (metodo === 'aleatorio' && (!modoManual || manualesCompletos))) && (
          <div className="pool-display">
            <span className="pool-label">Pool disponible:</span>
            {pool.map((v, i) => {
              const usado = valoresUsados.includes(v) && valoresUsados.indexOf(v) <= valoresUsados.lastIndexOf(v)
              return (
                <span key={i} className={`pool-valor ${valoresUsados.filter(x => x === v).length > pool.slice(0, i).filter(x => x === v).length ? 'pool-valor--usado' : ''}`}>
                  {v}
                </span>
              );
            })}
          </div>
        )}
        {sugerenciaClase && metodo === 'estandar' && (
          <button className="btn-sugerencia" onClick={handleSugerencia}>
            💡 Usar sugerencia para la clase
          </button>
        )}
      </div>

      {/* Tabla de características */}
      <div className="ca-tabla">
        <div className="ca-tabla__header">
          <span>Característica</span>
          <span>Valor</span>
          <span>Trasfondo</span>
          <span>Total / Mod</span>
        </div>
        {CARACTERISTICAS.map((c) => (
          <CaracteristicaFila
            key={c}
            nombre={c}
            puntuacionBase={metodo === 'puntos' ? puntosUsados[c] : puntuaciones[c]}
            bonusTrasfondo={getBonusTrasfondo(c)}
            metodo={metodo}
            disponibles={disponiblesPara(c)}
            asignada={metodo !== 'puntos' ? puntuaciones[c] != null : true}
            onAsignar={handleAsignar}
            onPuntosChange={handlePuntosChange}
          />
        ))}
      </div>

      {/* Bonus de trasfondo: ahora asignado en Paso 2 (Origen) — aquí solo lectura */}
      {trasfondo && Object.keys(bonusTrasfondo?.stats ?? {}).length > 0 && (
        <div className="bonus-trasfondo bonus-trasfondo--readonly">
          <h3>Bonus de trasfondo: {trasfondo.nombre}</h3>
          <p className="bonus-trasfondo__nota">
            Asignado en el Paso 2. Aplicado en la columna "Trasfondo" de la tabla de arriba.
          </p>
          <div className="bonus-stats bonus-stats--readonly">
            {Object.entries(bonusTrasfondo.stats).map(([stat, val]) => (
              <span key={stat} className="bonus-tag-readonly">
                {ABREV[stat]} <strong>+{val}</strong>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Selector de habilidades de clase */}
      {claseId && (() => {
        const clase = getClaseById(claseId);
        const elegir   = clase?.competenciasHabilidades?.elegir   ?? 0;
        const opciones = clase?.competenciasHabilidades?.opciones ?? [];
        if (elegir === 0) return null;

        const trasfondoHabs  = TRASFONDOS.find(t => t.id === trasfondoId)?.competenciasHabilidades ?? [];
        const opcionesEfec   = opciones.includes('Cualquiera') ? HABILIDADES_LISTA : opciones;
        const opcionesDisp   = opcionesEfec.filter(h => !trasfondoHabs.includes(h));
        const faltan         = elegir - habilidadesClase.length;
        const selCompleto    = faltan <= 0;

        return (
          <div className="skill-picker">
            <div className="skill-picker__header">
              <div className="skill-picker__titulo">
                <span className="skill-picker__clase-badge">{clase.nombre}</span>
                Elige {elegir} habilidades de competencia
              </div>
              <span className={`skill-picker__count ${selCompleto ? 'skill-picker__count--ok' : ''}`}>
                {habilidadesClase.length} / {elegir}
                {selCompleto ? ' ✓' : ` — faltan ${faltan}`}
              </span>
            </div>
            <div className="skill-picker__grid">
              {opcionesDisp.map(hab => {
                const sel = habilidadesClase.includes(hab);
                const dis = !sel && habilidadesClase.length >= elegir;
                return (
                  <button
                    key={hab}
                    type="button"
                    className={`skill-chip ${sel ? 'skill-chip--sel' : ''} ${dis ? 'skill-chip--dis' : ''}`}
                    onClick={() => {
                      if (sel) {
                        onHabilidadesClaseChange(habilidadesClase.filter(h => h !== hab));
                      } else if (!dis) {
                        onHabilidadesClaseChange([...habilidadesClase, hab]);
                      }
                    }}
                    disabled={dis}
                  >
                    {sel ? '✓ ' : ''}{hab}
                    <span className="skill-chip__abrev">{CARACTERISTICAS_ABBREV[HABILIDADES[hab]]}</span>
                  </button>
                );
              })}
            </div>
            {trasfondoHabs.length > 0 && (
              <p className="skill-picker__trasfondo-nota">
                Ya incluidas por trasfondo: <em>{trasfondoHabs.join(', ')}</em>
              </p>
            )}
          </div>
        );
      })()}

      {/* Tabla de referencia costes */}
      {metodo === 'puntos' && (
        <details className="coste-tabla-wrapper">
          <summary>Ver tabla de costes en puntos</summary>
          <table className="coste-tabla">
            <thead>
              <tr><th>Puntuación</th><th>Coste</th></tr>
            </thead>
            <tbody>
              {Object.entries(COSTE_PUNTOS).map(([p, c]) => (
                <tr key={p}><td>{p}</td><td>{c}</td></tr>
              ))}
            </tbody>
          </table>
        </details>
      )}
    </section>
  );
}
