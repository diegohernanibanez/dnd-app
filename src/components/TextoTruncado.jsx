import { useState } from 'react'
import './TextoTruncado.css'

const LIMITE_DEFAULT = 180

export default function TextoTruncado({ texto, limite = LIMITE_DEFAULT, className = '' }) {
  const [expandido, setExpandido] = useState(false)

  if (!texto || texto.length <= limite) {
    return <span className={className}>{texto}</span>
  }

  if (expandido) {
    return (
      <span className={className}>
        {texto}{' '}
        <button className="texto-truncado__btn" onClick={() => setExpandido(false)}>
          Ver menos
        </button>
      </span>
    )
  }

  const corte = texto.lastIndexOf(' ', limite)
  const textoCorto = texto.slice(0, corte > 0 ? corte : limite)

  return (
    <span className={className}>
      {textoCorto}…{' '}
      <button className="texto-truncado__btn" onClick={() => setExpandido(true)}>
        Ver más
      </button>
    </span>
  )
}
