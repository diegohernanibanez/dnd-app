import { useState } from 'react';
import { TRASFONDOS, ESPECIES, IDIOMAS_ESTANDAR, IDIOMAS_INUSUALES } from '../data/origins';
import { HABILIDADES_LISTA } from '../data/character';
import { getDoteById } from '../data/dotes';
import './OriginSelector.css';

const ABREV = {
  Fuerza: 'FUE', Destreza: 'DES', Constitución: 'CON',
  Inteligencia: 'INT', Sabiduría: 'SAB', Carisma: 'CAR',
};

const ICONOS_ESPECIE = {
  aasimar: '😇',
  draconido: '🐉',
  elfo: '🧝',
  enano: '⛏️',
  gnomo: '🎩',
  goliat: '🏔️',
  humano: '🧑',
  mediano: '🍀',
  orco: '💪',
  tiefling: '😈',
};

const ICONOS_TRASFONDO = {
  acolito: '⛪',
  animador: '🎭',
  artesano: '🔨',
  campesino: '🌾',
  charlatan: '🃏',
  comerciante: '💰',
  criminal: '🗝️',
  ermitano: '🏕️',
  erudito: '📜',
  escriba: '✒️',
  guardia: '🏰',
  guia: '🗺️',
  marinero: '⚓',
  noble: '👑',
  soldado: '⚔️',
  vagabundo: '🎒',
};

// ─── Bonus de características del trasfondo ─────────────────────────

function BonusTrasfondo({ trasfondo, bonusTrasfondo, onBonusChange }) {
  if (!trasfondo) return null;
  const statsTrasfondo = trasfondo.puntuacionesCaracteristica ?? [];
  const modo  = bonusTrasfondo?.modo  ?? null;
  const stats = bonusTrasfondo?.stats ?? {};

  const setModo = (m) => onBonusChange({ modo: m, stats: {} });

  const toggle = (stat, valor) => {
    const next = { ...stats };
    if (next[stat] === valor) { delete next[stat]; }
    else                      { next[stat] = valor; }
    onBonusChange({ modo, stats: next });
  };

  const valoresAsignados = Object.values(stats);
  const bonusValido = modo === 'dos'
    ? valoresAsignados.includes(2) && valoresAsignados.includes(1) && valoresAsignados.length === 2
    : modo === 'tres'
    ? valoresAsignados.filter(v => v === 1).length === 3
    : false;

  return (
    <div className="bonus-trasfondo-origin">
      <div className="bonus-trasfondo-origin__header">
        <span className="bonus-trasfondo-origin__titulo">Aumentos de puntuación de característica</span>
        <span className="bonus-trasfondo-origin__stats">
          {statsTrasfondo.map(s => (
            <span key={s} className="bonus-stat-tag">{ABREV[s]} {s}</span>
          ))}
        </span>
      </div>
      <p className="bonus-trasfondo-origin__desc">
        Aumenta una puntuación en <strong>+2</strong> y otra en <strong>+1</strong>, o aumenta las <strong>tres</strong> en <strong>+1</strong>. Ninguna puede superar 20.
      </p>

      <div className="bonus-modos-origin">
        <button
          className={`bonus-modo-origin-btn ${modo === 'dos' ? 'bonus-modo-origin-btn--active' : ''}`}
          onClick={() => setModo('dos')}
          type="button"
        >+2 / +1</button>
        <button
          className={`bonus-modo-origin-btn ${modo === 'tres' ? 'bonus-modo-origin-btn--active' : ''}`}
          onClick={() => setModo('tres')}
          type="button"
        >+1 / +1 / +1</button>
      </div>

      {modo && (
        <div className="bonus-stat-rows">
          {statsTrasfondo.map(stat => {
            const valorActual = stats[stat];
            const opciones    = modo === 'dos' ? [2, 1] : [1];
            return (
              <div key={stat} className="bonus-stat-row-origin">
                <span className="bonus-stat-nombre-origin">
                  <span className="bonus-abrev">{ABREV[stat]}</span> {stat}
                </span>
                <div className="bonus-stat-opciones-origin">
                  {opciones.map(op => {
                    const sel      = valorActual === op;
                    const yaUsado  = modo === 'dos' && Object.entries(stats).some(([k, v]) => k !== stat && v === op);
                    return (
                      <button
                        key={op}
                        type="button"
                        className={`bonus-op-origin ${sel ? 'bonus-op-origin--sel' : ''}`}
                        onClick={() => toggle(stat, op)}
                        disabled={!sel && yaUsado}
                      >+{op}</button>
                    );
                  })}
                  {valorActual && (
                    <button type="button" className="bonus-clear-origin" onClick={() => toggle(stat, valorActual)}>✕</button>
                  )}
                </div>
              </div>
            );
          })}
          {bonusValido && <p className="bonus-ok-origin">✅ Bonus de características asignado</p>}
        </div>
      )}
    </div>
  );
}

// ─── SUBCOMPONENTES ───────────────────────────────────────────────

function TasbSection({ titulo, children }) {
  return (
    <div className="origin-section">
      <h3 className="origin-section__titulo">{titulo}</h3>
      {children}
    </div>
  );
}

function TrasfondoCard({ trasfondo, seleccionado, onClick }) {
  return (
    <button
      className={`origin-card ${seleccionado ? 'origin-card--selected' : ''}`}
      onClick={() => onClick(trasfondo.id)}
      aria-pressed={seleccionado}
    >
      <span className="origin-card__icono">{ICONOS_TRASFONDO[trasfondo.id]}</span>
      <div className="origin-card__body">
        <span className="origin-card__nombre">{trasfondo.nombre}</span>
        <span className="origin-card__sub">{trasfondo.competenciasHabilidades.join(', ')}</span>
      </div>
    </button>
  );
}

function TrasfondoDetalle({ trasfondo }) {
  const doteObj = trasfondo.doteId ? getDoteById(trasfondo.doteId) : null;
  return (
    <div className="origin-detalle">
      <div className="origin-detalle__header">
        <span className="origin-detalle__icono">{ICONOS_TRASFONDO[trasfondo.id]}</span>
        <div>
          <h4>{trasfondo.nombre}</h4>
          <p>{trasfondo.descripcion}</p>
        </div>
      </div>
      <div className="origin-detalle__stats">
        <div className="origin-stat">
          <span className="origin-stat__label">Puntuaciones de característica</span>
          <span>{trasfondo.puntuacionesCaracteristica.join(', ')}</span>
        </div>
        <div className="origin-stat">
          <span className="origin-stat__label">Competencias en habilidades</span>
          <span>{trasfondo.competenciasHabilidades.join(', ')}</span>
        </div>
        <div className="origin-stat">
          <span className="origin-stat__label">Competencia con herramienta</span>
          <span>{trasfondo.competenciaHerramienta}</span>
        </div>
      </div>
      {doteObj && (
        <div className="dote-detalle">
          <div className="dote-detalle__header">
            <span className="dote-detalle__etiqueta">Dote de origen</span>
            <span className="dote-detalle__nombre">{trasfondo.dote}</span>
          </div>
          <p className="dote-detalle__desc">{doteObj.descripcion}</p>
        </div>
      )}
      {!doteObj && (
        <div className="origin-stat">
          <span className="origin-stat__label">Dote de origen</span>
          <span>{trasfondo.dote}</span>
        </div>
      )}
    </div>
  );
}

function HabilidosoSelector({ habilidadesActuales, onCambiar, habilidadesYaComp }) {
  const MAX = 3;
  const sel = habilidadesActuales ?? [];
  const toggle = (hab) => {
    if (sel.includes(hab)) {
      onCambiar(sel.filter(h => h !== hab));
    } else if (sel.length < MAX) {
      onCambiar([...sel, hab]);
    }
  };
  return (
    <div className="diestro-selector">
      <div className="diestro-selector__header">
        <span className="diestro-selector__titulo">🎯 Habilidoso — Elige 3 competencias</span>
        <span className="diestro-selector__obligatorio">{sel.length}/{MAX} elegidas</span>
      </div>
      <p className="diestro-selector__desc">
        Tu dote de trasfondo te concede competencia en cualquier combinación de <strong>3 habilidades</strong> a tu elección.
      </p>
      <div className="diestro-opciones">
        {HABILIDADES_LISTA.map((hab) => {
          const yaComp = habilidadesYaComp.includes(hab);
          const esSel = sel.includes(hab);
          const maxAlcanzado = sel.length >= MAX && !esSel;
          return (
            <button
              key={hab}
              className={`diestro-opcion ${esSel ? 'diestro-opcion--selected' : ''} ${yaComp && !esSel ? 'diestro-opcion--ya' : ''} ${maxAlcanzado ? 'diestro-opcion--disabled' : ''}`}
              onClick={() => toggle(hab)}
              disabled={maxAlcanzado}
              title={yaComp ? 'Ya tienes competencia (trasfondo o clase)' : maxAlcanzado ? 'Ya elegiste 3' : ''}
            >
              {hab}
              {yaComp && !esSel && <span className="diestro-opcion__ya"> ✓ya</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EspecieCard({ especie, seleccionada, onClick }) {
  return (
    <button
      className={`origin-card ${seleccionada ? 'origin-card--selected' : ''}`}
      onClick={() => onClick(especie.id)}
      aria-pressed={seleccionada}
    >
      <span className="origin-card__icono">{ICONOS_ESPECIE[especie.id]}</span>
      <div className="origin-card__body">
        <span className="origin-card__nombre">{especie.nombre}</span>
        <span className="origin-card__sub">{especie.tamano} · {especie.velocidad}</span>
      </div>
    </button>
  );
}

function EspecieDetalle({ especie }) {
  return (
    <div className="origin-detalle">
      <div className="origin-detalle__header">
        <span className="origin-detalle__icono origin-detalle__icono--grande">
          {ICONOS_ESPECIE[especie.id]}
        </span>
        <div>
          <h4>{especie.nombre}</h4>
          <p>{especie.descripcion}</p>
        </div>
      </div>
      <div className="origin-detalle__stats">
        <div className="origin-stat">
          <span className="origin-stat__label">Tamaño</span>
          <span>{especie.tamano}</span>
        </div>
        <div className="origin-stat">
          <span className="origin-stat__label">Velocidad</span>
          <span>{especie.velocidad}</span>
        </div>
        {especie.vidaMax && (
          <div className="origin-stat">
            <span className="origin-stat__label">Esperanza de vida</span>
            <span>~{especie.vidaMax} años</span>
          </div>
        )}
        {especie.subtipos && (
          <div className="origin-stat">
            <span className="origin-stat__label">Subtipos</span>
            <span>{especie.subtipos.join(', ')}</span>
          </div>
        )}
      </div>
      <div className="origin-detalle__rasgos">
        <span className="origin-stat__label">Rasgos especiales</span>
        <ul>
          {especie.rasgosDestacados.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function IdiomasSelector({ idiomasElegidos, onChange }) {
  const adicionales = idiomasElegidos.filter((i) => i !== 'Común');
  const maxAdicionales = 2;

  const toggleIdioma = (nombre, esInusual = false) => {
    if (nombre === 'Común' || esInusual) return;
    const yaSeleccionado = idiomasElegidos.includes(nombre);
    if (yaSeleccionado) {
      onChange(idiomasElegidos.filter((i) => i !== nombre));
    } else if (adicionales.length < maxAdicionales) {
      onChange([...idiomasElegidos, nombre]);
    }
  };

  return (
    <div className="idiomas-selector">
      <p className="idiomas-selector__info">
        Tu personaje sabe al menos <strong>3 idiomas</strong>: Común (siempre) y{' '}
        <strong>2 más</strong> de la tabla de idiomas estándar.{' '}
        <span className={adicionales.length >= maxAdicionales ? 'idiomas-ok' : 'idiomas-pending'}>
          {adicionales.length}/{maxAdicionales} elegidos
        </span>
      </p>

      <div className="idiomas-grupos">
        <div>
          <h4 className="idiomas-grupo__titulo">Idiomas estándar</h4>
          <div className="idiomas-grid">
            {IDIOMAS_ESTANDAR.map(({ nombre, origen }) => {
              const esComan = nombre === 'Común';
              const seleccionado = idiomasElegidos.includes(nombre);
              const deshabilitado = !esComan && !seleccionado && adicionales.length >= maxAdicionales;
              return (
                <button
                  key={nombre}
                  className={`idioma-chip ${seleccionado ? 'idioma-chip--selected' : ''} ${esComan ? 'idioma-chip--fijo' : ''} ${deshabilitado ? 'idioma-chip--disabled' : ''}`}
                  onClick={() => toggleIdioma(nombre)}
                  disabled={esComan || deshabilitado}
                  title={`Origen: ${origen}`}
                >
                  {nombre}
                  {esComan && <span className="idioma-chip__fijo"> ✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="idiomas-grupo__titulo">
            Idiomas inusuales
            <span className="idiomas-grupo__nota"> — requieren rasgo especial</span>
          </h4>
          <div className="idiomas-grid">
            {IDIOMAS_INUSUALES.map(({ nombre, origen }) => {
              const seleccionado = idiomasElegidos.includes(nombre);
              return (
                <button
                  key={nombre}
                  className={`idioma-chip idioma-chip--inusual idioma-chip--locked ${seleccionado ? 'idioma-chip--selected' : ''}`}
                  disabled
                  title={`${origen} — Requiere rasgo especial (clase, trasfondo u otro)`}
                >
                  {nombre}
                  <span className="idioma-chip__lock">🔒</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Habilidad "Diestro" del Humano ─────────────────────────────────

function SentidosAgudosSelector({ habilidadActual, opciones, onCambiar, habilidadesYaComp }) {
  return (
    <div className="diestro-selector">
      <div className="diestro-selector__header">
        <span className="diestro-selector__titulo">🧝 Sentidos agudos — Competencia</span>
        <span className="diestro-selector__obligatorio">Rasgo élfico</span>
      </div>
      <p className="diestro-selector__desc">
        Los elfos poseen sentidos extraordinariamente agudos. Elige <strong>una habilidad</strong> en la que ganarás competencia.
      </p>
      <div className="diestro-opciones">
        {opciones.map((hab) => {
          const yaComp = habilidadesYaComp.includes(hab);
          const sel = habilidadActual === hab;
          return (
            <button
              key={hab}
              className={`diestro-opcion ${sel ? 'diestro-opcion--selected' : ''} ${yaComp && !sel ? 'diestro-opcion--ya' : ''}`}
              onClick={() => onCambiar(sel ? null : hab)}
              title={yaComp ? 'Ya tienes competencia en esta habilidad' : ''}
            >
              {hab}
              {yaComp && !sel && <span className="diestro-opcion__ya"> ✓ya</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DiestroSelector({ habilidadActual, onCambiar, habilidadesYaComp }) {
  return (
    <div className="diestro-selector">
      <div className="diestro-selector__header">
        <span className="diestro-selector__titulo">🧑 Diestro — Competencia extra</span>
        <span className="diestro-selector__obligatorio">Rasgo humano</span>
      </div>
      <p className="diestro-selector__desc">
        Los humanos son especialmente adaptables. Elige <strong>una habilidad</strong> en la que ganarás competencia adicional.
      </p>
      <div className="diestro-opciones">
        {Object.keys(HABILIDADES_LISTA).length > 0 && HABILIDADES_LISTA.map((hab) => {
          const yaComp = habilidadesYaComp.includes(hab);
          const sel = habilidadActual === hab;
          return (
            <button
              key={hab}
              className={`diestro-opcion ${sel ? 'diestro-opcion--selected' : ''} ${yaComp && !sel ? 'diestro-opcion--ya' : ''}`}
              onClick={() => onCambiar(sel ? null : hab)}
              title={yaComp ? 'Ya tienes competencia en esta habilidad' : ''}
            >
              {hab}
              {yaComp && !sel && <span className="diestro-opcion__ya"> ✓ya</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Selector de linaje de especie ──────────────────────────────────

function LinajeSelector({ especie, linajeSeleccionado, onLinajeChange }) {
  if (!especie?.linajes?.length) return null;

  const esCompacto = especie.linajes.length >= 6; // Dracónido/Goliat: grid compacto
  const linajeObj = especie.linajes.find((l) => l.id === linajeSeleccionado);

  return (
    <div className="linaje-selector">
      <div className="linaje-selector__header">
        <span className="linaje-selector__titulo">
          {especie.id === 'draconido' ? '🐉 Linaje dracónico' :
           especie.id === 'elfo'      ? '✨ Linaje élfico' :
           especie.id === 'gnomo'     ? '🎩 Linaje gnomo' :
           especie.id === 'goliat'    ? '🏔️ Linaje gigante' :
           especie.id === 'tiefling'  ? '😈 Legado infernal' : 'Linaje'}
        </span>
        <span className="linaje-selector__obligatorio">Requerido</span>
      </div>
      <p className="linaje-selector__desc">
        {especie.id === 'draconido' && 'Elige el tipo de dragón del que desciende tu personaje. Determina el tipo de daño de tu ataque de aliento y tu resistencia al daño.'}
        {especie.id === 'elfo'      && 'El entorno en que vivió tu elfo a lo largo de los siglos le ha otorgado magia característica. Elige un linaje élfico.'}
        {especie.id === 'gnomo'     && 'La variante gnoma de tu personaje determina sus trucos mágicos y habilidades especiales.'}
        {especie.id === 'goliat'    && 'Tu ascendencia gigante te otorga un beneficio sobrenatural. Elige el linaje que represente a tus antepasados.'}
        {especie.id === 'tiefling'  && 'El tipo de ser infernal al que tu linaje está vinculado determina tu resistencia y los conjuros que puedes lanzar.'}
      </p>

      <div className={`linaje-opciones ${esCompacto ? 'linaje-opciones--compacto' : 'linaje-opciones--expandido'}`}>
        {especie.linajes.map((l) => {
          const sel = linajeSeleccionado === l.id;
          return (
            <button
              key={l.id}
              className={`linaje-opcion ${sel ? 'linaje-opcion--selected' : ''}`}
              onClick={() => onLinajeChange(sel ? null : l.id)}
            >
              {esCompacto ? (
                <>
                  <span className="linaje-opcion__nombre">{l.nombre}</span>
                  {l.tipoDano && <span className="linaje-opcion__sub">{l.tipoDano}</span>}
                  {!l.tipoDano && l.desc && <span className="linaje-opcion__sub">{l.desc.substring(0, 60)}…</span>}
                </>
              ) : (
                <>
                  <span className="linaje-opcion__nombre">{l.nombre}</span>
                  {l.resistencia && <span className="linaje-opcion__badge">⚔️ Resist. {l.resistencia}</span>}
                  {l.velocidad   && <span className="linaje-opcion__badge">💨 {l.velocidad}</span>}
                </>
              )}
            </button>
          );
        })}
      </div>

      {linajeObj && (
        <div className="linaje-detalle">
          <div className="linaje-detalle__nombre">
            {linajeObj.nombre}
            {linajeObj.tipoDano && <span className="linaje-detalle__badge">{linajeObj.tipoDano}</span>}
            {linajeObj.resistencia && <span className="linaje-detalle__badge">Resist. {linajeObj.resistencia}</span>}
          </div>
          <p className="linaje-detalle__desc">{linajeObj.desc}</p>

          {linajeObj.rasgos?.length > 0 && (
            <div className="linaje-detalle__rasgos">
              <span className="linaje-detalle__rasgos-titulo">Rasgos y conjuros</span>
              {linajeObj.rasgos.map((r, i) => (
                <div key={i} className="linaje-rasgo">
                  <div className="linaje-rasgo__header">
                    <span className="linaje-rasgo__nombre">{r.nombre}</span>
                    <span className="linaje-rasgo__nivel">Nivel {r.nivel}</span>
                  </div>
                  <p className="linaje-rasgo__desc">{r.desc}</p>
                </div>
              ))}
            </div>
          )}

          {linajeObj.aptitudMagica && (
            <p className="linaje-detalle__aptitud">
              🎯 <strong>Aptitud mágica:</strong> Elige INT, SAB o CAR como tu característica para estos conjuros.
            </p>
          )}
        </div>
      )}
    </div>
  );
}



export default function OriginSelector({ origen, onCambiar, bonusTrasfondo, onBonusChange }) {
  const { trasfondo, especie, idiomas, linaje, habilidadDiestro, habilidadSentidos, habilidadesHabilidoso } = origen;

  const [detalleTrasfondo, setDetalleTrasfondo] = useState(null);
  const [detalleEspecie, setDetalleEspecie] = useState(null);

  const handleTrasfondo = (id) => {
    const nuevo = trasfondo === id ? null : id;
    onCambiar({ ...origen, trasfondo: nuevo, habilidadesHabilidoso: [] });
    setDetalleTrasfondo(nuevo);
  };

  const handleEspecie = (id) => {
    const nuevo = especie === id ? null : id;
    onCambiar({ ...origen, especie: nuevo, linaje: null, habilidadDiestro: null, habilidadSentidos: null });
    setDetalleEspecie(nuevo);
  };

  const handleLinaje = (id) => {
    onCambiar({ ...origen, linaje: id });
  };

  const handleHabilidadDiestro = (hab) => {
    onCambiar({ ...origen, habilidadDiestro: hab });
  };

  const handleHabilidadSentidos = (hab) => {
    onCambiar({ ...origen, habilidadSentidos: hab });
  };

  const handleHabilidadesHabilidoso = (lista) => {
    onCambiar({ ...origen, habilidadesHabilidoso: lista });
  };

  const handleIdiomas = (nuevos) => {
    onCambiar({ ...origen, idiomas: nuevos });
  };

  const trasfondoObj = TRASFONDOS.find((t) => t.id === detalleTrasfondo);
  const especieObj = ESPECIES.find((e) => e.id === detalleEspecie);

  // Habilidades ya con competencia (trasfondo) para marcarlas como "ya tienes"
  const habilidadesYaComp = trasfondoObj?.competenciasHabilidades ?? [];

  return (
    <section className="origin-selector">
      <div className="origin-selector__intro">
        <h2>Paso 2: Define tu origen</h2>
        <p>
          El origen de tu personaje abarca su trasfondo, su especie y los idiomas que conoce.
          Estos elementos definen su pasado antes de convertirse en aventurero.
        </p>
      </div>

      {/* TRASFONDO */}
      <TasbSection titulo="Trasfondo">
        <p className="origin-section__desc">
          Representa el lugar y la ocupación más relevantes antes de la aventura.
          Otorga competencias en habilidades, una herramienta y una dote de origen.
        </p>
        <div className="origin-grid origin-grid--trasfondo">
          {TRASFONDOS.map((t) => (
            <TrasfondoCard
              key={t.id}
              trasfondo={t}
              seleccionado={trasfondo === t.id}
              onClick={handleTrasfondo}
            />
          ))}
        </div>
        {trasfondoObj && <TrasfondoDetalle trasfondo={trasfondoObj} />}
        {trasfondoObj?.doteId === 'habilidoso' && (
          <HabilidosoSelector
            habilidadesActuales={habilidadesHabilidoso}
            onCambiar={handleHabilidadesHabilidoso}
            habilidadesYaComp={habilidadesYaComp}
          />
        )}
        {trasfondoObj && (
          <BonusTrasfondo
            trasfondo={trasfondoObj}
            bonusTrasfondo={bonusTrasfondo}
            onBonusChange={onBonusChange}
          />
        )}
      </TasbSection>

      {/* ESPECIE */}
      <TasbSection titulo="Especie">
        <p className="origin-section__desc">
          Determina si tu personaje es humano o parte de una especie fantástica, definiendo
          sus rasgos innatos y atributos especiales.
        </p>
        <div className="origin-grid origin-grid--especie">
          {ESPECIES.map((e) => (
            <EspecieCard
              key={e.id}
              especie={e}
              seleccionada={especie === e.id}
              onClick={handleEspecie}
            />
          ))}
        </div>
        {especieObj && <EspecieDetalle especie={especieObj} />}
        {especieObj?.linajes?.length > 0 && (
          <LinajeSelector
            especie={especieObj}
            linajeSeleccionado={linaje}
            onLinajeChange={handleLinaje}
          />
        )}
        {especieObj?.tieneSentidosAgudos && (
          <SentidosAgudosSelector
            habilidadActual={habilidadSentidos}
            opciones={especieObj.opcionesSentidosAgudos}
            onCambiar={handleHabilidadSentidos}
            habilidadesYaComp={habilidadesYaComp}
          />
        )}
        {especieObj?.tieneHabilidadDiestro && (
          <DiestroSelector
            habilidadActual={habilidadDiestro}
            onCambiar={handleHabilidadDiestro}
            habilidadesYaComp={habilidadesYaComp}
          />
        )}
      </TasbSection>

      {/* IDIOMAS */}
      <TasbSection titulo="Idiomas">
        <IdiomasSelector idiomasElegidos={idiomas} onChange={handleIdiomas} />
      </TasbSection>

      {/* RESUMEN */}
      {(trasfondo || especie || idiomas.filter((i) => i !== 'Común').length > 0) && (
        <div className="origin-resumen">
          <h4>Origen seleccionado</h4>
          <div className="origin-resumen__items">
            {trasfondo && (
              <span className="resumen-tag">
                {ICONOS_TRASFONDO[trasfondo]} {TRASFONDOS.find((t) => t.id === trasfondo)?.nombre}
              </span>
            )}
            {especie && (
              <span className="resumen-tag">
                {ICONOS_ESPECIE[especie]} {ESPECIES.find((e) => e.id === especie)?.nombre}
                {linaje && (() => {
                  const eObj = ESPECIES.find((e) => e.id === especie);
                  const lObj = eObj?.linajes?.find((l) => l.id === linaje);
                  return lObj ? <span className="resumen-tag__sub"> — {lObj.nombre}</span> : null;
                })()}
                {habilidadDiestro && (
                  <span className="resumen-tag__sub"> · Diestro: {habilidadDiestro}</span>
                )}
                {habilidadSentidos && (
                  <span className="resumen-tag__sub"> · Sentidos: {habilidadSentidos}</span>
                )}
              </span>
            )}
            {idiomas.length > 0 && (
              <span className="resumen-tag">🗣️ {idiomas.join(', ')}</span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
