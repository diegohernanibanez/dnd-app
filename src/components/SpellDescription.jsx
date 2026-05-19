import React from 'react'

const SPECIAL_LABELS = [
  'Con un espacio de conjuro de nivel superior.',
  'Mejora de truco.',
]

const SENTENCE_STARTERS = /^(El |La |Los |Las |Un |Una |Unos |Unas |Si |Cuando |Durante |Al |En |Con |Por |Para |A |De |Cada |Este |Esta |Estos |Estas |Tú |Tu |Su |Sus |Puedes |Puede |Debes |Hasta |También |Además |Sin |No |Mientras |Como |Tras |Sobre |Bajo |Entre |Ante |Dicha|Dicho|Todas|Todos|Cualquier|Cualquiera)/i

function isSubheading(text) {
  const t = text.trim()
  if (!t || t.length > 55) return false
  if (SENTENCE_STARTERS.test(t)) return false
  if (t.includes(',')) return false
  if (t.split(/\s+/).length > 6) return false
  if (!/^[A-ZÁÉÍÓÚÑÜ]/.test(t)) return false
  return true
}

// Split text into sections by finding subheadings at sentence boundaries.
// Uses a checkpoint approach: check every position that follows ". " for a short phrase.
function splitIntoSections(text) {
  // Collect checkpoints: start-of-text + every position after ". "
  const checkpoints = [0]
  const boundaryRe = /\.\s+/g
  let m
  while ((m = boundaryRe.exec(text)) !== null) {
    checkpoints.push(m.index + m[0].length)
  }

  // Find all valid headings
  const headings = []
  for (const pos of checkpoints) {
    const nextDot = text.indexOf('.', pos)
    if (nextDot <= pos) continue
    const phrase = text.slice(pos, nextDot)
    // Must be followed by a space and uppercase letter (has a body)
    const afterDot = nextDot + 1
    if (afterDot >= text.length || text[afterDot] !== ' ') continue
    const bodyStart = afterDot + 1
    if (bodyStart >= text.length) continue
    if (!/[A-ZÁÉÍÓÚÑÜ]/.test(text[bodyStart])) continue
    const specialLabel = SPECIAL_LABELS.find(l => l === phrase + '.')
    if (isSubheading(phrase) || specialLabel) {
      headings.push({ headingStart: pos, heading: phrase, bodyStart, isSpecial: !!specialLabel })
    }
  }

  if (headings.length === 0) return [{ text }]

  const sections = []

  // Text before the first heading (drop trailing ". " connector)
  if (headings[0].headingStart > 0) {
    const raw = text.slice(0, headings[0].headingStart)
    const prefix = raw.replace(/\.\s*$/, '').trim()
    if (prefix) sections.push({ text: prefix + '.' })
  }

  // Each heading + its body (body runs until the next heading's headingStart)
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i]
    const bodyEnd = i + 1 < headings.length
      ? headings[i + 1].headingStart  // includes the preceding ". "
      : text.length
    // body text is from bodyStart to bodyEnd; trim the ". " connector at the end
    let body = text.slice(h.bodyStart, bodyEnd).trim().replace(/\.\s*$/, '').trim()
    if (body) body += '.'
    sections.push({ heading: h.heading, body })
  }

  return sections
}

function renderParagraph(text, keyPrefix) {
  const t = text.trim()
  if (!t) return null

  // Special bold/italic labels at start of text
  for (const label of SPECIAL_LABELS) {
    if (t.startsWith(label)) {
      const rest = t.slice(label.length).trim()
      return (
        <p key={keyPrefix} className="spell-desc__para">
          <strong><em>{label}</em></strong>
          {rest ? ' ' + rest : ''}
        </p>
      )
    }
  }

  // Split on inline subheadings
  const sections = splitIntoSections(t)

  if (sections.length === 1 && !sections[0].heading) {
    return <p key={keyPrefix} className="spell-desc__para">{t}</p>
  }

  return sections.map((s, i) => {
    const k = `${keyPrefix}-${i}`
    if (s.heading) {
      const label = s.heading + '.'
      return (
        <p key={k} className="spell-desc__para">
          {s.isSpecial
            ? <strong><em>{label}</em></strong>
            : <strong>{label}</strong>}
          {s.body ? ' ' + s.body : ''}
        </p>
      )
    }
    return <p key={k} className="spell-desc__para">{s.text}</p>
  })
}

function renderTable(tableLines, key, title) {
  if (!tableLines.length) return null
  return (
    <div key={key} className="spell-desc__table-wrap">
      {title && <p className="spell-desc__table-title">{title}</p>}
      <table className="spell-desc__table">
        <thead>
          <tr>
            {tableLines[0].split('|').filter(c => c.trim()).map((cell, ci) => (
              <th key={ci}>{cell.trim()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableLines.slice(1).map((row, ri) => (
            <tr key={ri}>
              {row.split('|').filter(c => c.trim()).map((cell, ci) => (
                <td key={ci}>{cell.trim()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function parseSegments(text) {
  const lines = text.split('\n')
  const result = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    if (!line) { i++; continue }

    // ALL-CAPS table title (no |) followed by | lines
    const isAllCaps = /^[A-ZÁÉÍÓÚÑÜ\s\d]+$/.test(line) && line.length > 2
    const nextLine = lines[i + 1] ? lines[i + 1].trim() : ''
    if (isAllCaps && nextLine.includes('|')) {
      const title = line
      i++
      const tableLines = []
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i].trim())
        i++
      }
      result.push(renderTable(tableLines, `table-${i}`, title))
      continue
    }

    // Table rows (no preceding ALL-CAPS title)
    if (line.includes('|')) {
      const tableLines = []
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i].trim())
        i++
      }
      result.push(renderTable(tableLines, `table-${i}`))
      continue
    }

    // Bullet group
    if (line.startsWith('+ ') || line.startsWith('· ')) {
      const bullets = []
      while (i < lines.length && (lines[i].trim().startsWith('+ ') || lines[i].trim().startsWith('· '))) {
        const t = lines[i].trim()
        bullets.push(<li key={i}>{t.slice(2)}</li>)
        i++
      }
      result.push(<ul key={`ul-${i}`} className="spell-desc__list">{bullets}</ul>)
      continue
    }

    // Normal paragraph (may contain inline subheadings or special labels)
    const rendered = renderParagraph(line, `p-${i}`)
    if (rendered) {
      if (Array.isArray(rendered)) result.push(...rendered)
      else result.push(rendered)
    }
    i++
  }

  return result
}

export default function SpellDescription({ text, className }) {
  if (!text) return null
  return <div className={className || 'spell-desc'}>{parseSegments(text)}</div>
}
