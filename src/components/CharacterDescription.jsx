import { useState } from 'react'
import {
  ALINEAMIENTOS,
  RASGOS_POR_TRASFONDO,
  CAMPOS_APARIENCIA,
  RASGOS_POR_ALINEAMIENTO_EJE,
  EJES_POR_ALINEAMIENTO,
  CALIFICATIVOS_CARACTERISTICA,
} from '../data/description'
import { TRASFONDOS } from '../data/origins'
import './CharacterDescription.css'

export default function CharacterDescription({ descripcion, onCambiar, puntuaciones }) {
  const { nombre, alineamiento, apariencia, personalidad } = descripcion

  const [sugerenciasAbiertas, setSugerenciasAbiertas] = useState(false)

  const trasfondoId = descripcion.trasfondoId
  const sugerencias = trasfondoId ? RASGOS_POR_TRASFONDO[trasfondoId] : null
  const trasfondoNombre = trasfondoId
    ? TRASFONDOS.find((t) => t.id === trasfondoId)?.nombre
    : null

  const set = (campo, valor) =>
    onCambiar({ ...descripcion, [campo]: valor })

  const setApariencia = (campo, valor) =>
    onCambiar({ ...descripcion, apariencia: { ...apariencia, [campo]: valor } })

  const setPersonalidad = (campo, valor) =>
    onCambiar({ ...descripcion, personalidad: { ...personalidad, [campo]: valor } })

  // Grid 3x3 de alineamientos
  const filas = [0, 1, 2]
  const cols = [0, 1, 2]

  return (
    <div className="char-desc">
      <div className="char-desc__intro">
        <h2>Describe tu personaje</h2>
        <p>Dale vida a tu héroe: ponle nombre, define su alineamiento, su apariencia y su personalidad.</p>
      </div>

      {/* ── Nombre ── */}
      <section className="desc-section">
        <h3 className="desc-section__title">Nombre del personaje</h3>
        <input
          className="desc-nombre-input"
          type="text"
          placeholder="Ej. Arannis Luminar, Bryn Escudo de Piedra…"
          value={nombre}
          onChange={(e) => set('nombre', e.target.value)}
          maxLength={60}
          aria-label="Nombre del personaje"
        />
      </section>

      {/* ── Alineamiento ── */}
      <section className="desc-section">
        <h3 className="desc-section__title">Alineamiento</h3>
        <p className="desc-section__hint">
          El alineamiento describe la actitud moral de tu personaje. Elige uno de los nueve.
        </p>
        <div className="alineamiento-grid">
          {filas.map((fila) => (
            <div key={fila} className="alineamiento-fila">
              {cols.map((col) => {
                const al = ALINEAMIENTOS.find((a) => a.fila === fila && a.col === col)
                if (!al) return null
                const activo = alineamiento === al.id
                return (
                  <button
                    key={al.id}
                    className={`alineamiento-btn ${activo ? 'alineamiento-btn--active' : ''}`}
                    onClick={() => set('alineamiento', activo ? null : al.id)}
                    title={al.descripcion}
                    type="button"
                  >
                    <span className="al-abrev">{al.abrev}</span>
                    <span className="al-nombre">{al.nombre}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
        {alineamiento && (
          <>
            <p className="alineamiento-desc">
              {ALINEAMIENTOS.find((a) => a.id === alineamiento)?.descripcion}
            </p>
            {/* Rasgos de personalidad por alineamiento (Manual pág. 40) */}
            {(() => {
              const ejes = EJES_POR_ALINEAMIENTO[alineamiento] ?? []
              const rasgos = [...new Set(ejes.flatMap(e => RASGOS_POR_ALINEAMIENTO_EJE[e] ?? []))]
              if (!rasgos.length) return null
              return (
                <div className="alineamiento-rasgos">
                  <p className="alineamiento-rasgos__titulo">
                    💡 Rasgos asociados a este alineamiento — haz clic para añadir:
                  </p>
                  <div className="alineamiento-rasgos__chips">
                    {rasgos.map(r => (
                      <button
                        key={r}
                        className="rasgo-chip"
                        type="button"
                        onClick={() => setPersonalidad('rasgos',
                          personalidad.rasgos
                            ? personalidad.rasgos + (personalidad.rasgos.endsWith('.') || personalidad.rasgos.endsWith(',') ? ' ' : '. ') + r + '.'
                            : r + '.'
                        )}
                        title="Añadir a rasgos de personalidad"
                      >{r}</button>
                    ))}
                  </div>
                </div>
              )
            })()}
          </>
        )}
      </section>

      {/* ── Apariencia física ── */}
      <section className="desc-section">
        <h3 className="desc-section__title">Apariencia física</h3>
        <div className="apariencia-grid">
          {CAMPOS_APARIENCIA.map(({ id, label }) => (
            <div key={id} className="apariencia-campo">
              <label className="apariencia-label" htmlFor={`ap-${id}`}>{label}</label>
              <input
                id={`ap-${id}`}
                className="apariencia-input"
                type="text"
                value={apariencia[id] || ''}
                onChange={(e) => setApariencia(id, e.target.value)}
                placeholder="—"
                maxLength={80}
              />
            </div>
          ))}
        </div>
        {/* Calificativos por característica (Manual pág. 39) */}
        {puntuaciones && (() => {
          const STAT_MAP = {
            Fuerza: puntuaciones.Fuerza,
            Destreza: puntuaciones.Destreza,
            Constitución: puntuaciones.Constitución,
            Inteligencia: puntuaciones.Inteligencia,
            Sabiduría: puntuaciones.Sabiduría,
            Carisma: puntuaciones.Carisma,
          }
          const calificativos = []
          for (const [stat, valor] of Object.entries(STAT_MAP)) {
            if (!valor) continue
            if (valor >= 14) calificativos.push(...(CALIFICATIVOS_CARACTERISTICA[stat]?.alta ?? []))
            else if (valor <= 9) calificativos.push(...(CALIFICATIVOS_CARACTERISTICA[stat]?.baja ?? []))
          }
          if (!calificativos.length) return null
          return (
            <div className="calificativos-bloque">
              <p className="calificativos-bloque__titulo">
                💡 Calificativos según tus puntuaciones — haz clic para añadir a <em>Otros rasgos</em>:
              </p>
              <div className="calificativos-chips">
                {calificativos.map((c, i) => (
                  <button
                    key={i}
                    className="rasgo-chip"
                    type="button"
                    onClick={() => setApariencia('otros',
                      apariencia.otros ? apariencia.otros + ', ' + c : c
                    )}
                    title="Añadir a otros rasgos de apariencia"
                  >{c}</button>
                ))}
              </div>
            </div>
          )
        })()}
      </section>
      <section className="desc-section">
        <h3 className="desc-section__title">Personalidad</h3>
        {sugerencias && (
          <details
            className="sugerencias-details"
            open={sugerenciasAbiertas}
            onToggle={(e) => setSugerenciasAbiertas(e.target.open)}
          >
            <summary>💡 Ver sugerencias de <strong>{trasfondoNombre}</strong></summary>
            <div className="sugerencias-body">
              <SugerenciaBloque
                titulo="Rasgos de personalidad"
                items={sugerencias.rasgos}
                onUsar={(v) => setPersonalidad('rasgos', v)}
              />
              <SugerenciaBloque
                titulo="Ideal"
                items={sugerencias.ideales}
                onUsar={(v) => setPersonalidad('ideal', v)}
              />
              <SugerenciaBloque
                titulo="Vínculo"
                items={sugerencias.vinculos}
                onUsar={(v) => setPersonalidad('vinculo', v)}
              />
              <SugerenciaBloque
                titulo="Defecto"
                items={sugerencias.defectos}
                onUsar={(v) => setPersonalidad('defecto', v)}
              />
            </div>
          </details>
        )}
        <div className="personalidad-grid">
          <PersonalidadCampo
            id="rasgos"
            label="Rasgos de personalidad"
            placeholder="¿Qué manías, aficiones o actitudes definen a tu personaje?"
            value={personalidad.rasgos}
            onChange={(v) => setPersonalidad('rasgos', v)}
          />
          <PersonalidadCampo
            id="ideal"
            label="Ideal"
            placeholder="¿Qué principio o convicción impulsa a tu personaje?"
            value={personalidad.ideal}
            onChange={(v) => setPersonalidad('ideal', v)}
          />
          <PersonalidadCampo
            id="vinculo"
            label="Vínculo"
            placeholder="¿Qué persona, lugar o recuerdo es sagrado para tu personaje?"
            value={personalidad.vinculo}
            onChange={(v) => setPersonalidad('vinculo', v)}
          />
          <PersonalidadCampo
            id="defecto"
            label="Defecto"
            placeholder="¿Qué debilidad, miedo o vicio arrastra tu personaje?"
            value={personalidad.defecto}
            onChange={(v) => setPersonalidad('defecto', v)}
          />
        </div>
      </section>
    </div>
  )
}

function PersonalidadCampo({ id, label, placeholder, value, onChange }) {
  return (
    <div className="personalidad-campo">
      <label className="personalidad-label" htmlFor={`per-${id}`}>{label}</label>
      <textarea
        id={`per-${id}`}
        className="personalidad-textarea"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        maxLength={400}
      />
    </div>
  )
}

function SugerenciaBloque({ titulo, items, onUsar }) {
  return (
    <div className="sug-bloque">
      <p className="sug-titulo">{titulo}</p>
      {items.map((item, i) => (
        <div key={i} className="sug-item">
          <span className="sug-texto">"{item}"</span>
          <button
            className="sug-usar-btn"
            type="button"
            onClick={() => onUsar(item)}
          >
            Usar
          </button>
        </div>
      ))}
    </div>
  )
}
