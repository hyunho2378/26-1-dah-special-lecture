import { useState } from 'react'
import { profile } from '../../data/profile.js'
import { color } from '../../tokens.js'
import SectionLabel from '../ui/SectionLabel.jsx'
import useReveal from '../../lib/useReveal.js'

const PREVIEW = 4

function Row({ year, text, accent }) {
  return (
    <li className="flex gap-4">
      <span className="w-12 shrink-0 pt-0.5 font-mono text-xs tabular-nums text-muted">{year}</span>
      <span className="text-sm leading-relaxed" style={{ color: accent ? color.accent : color.paper }}>{text}</span>
    </li>
  )
}

function Group({ label, items, delay }) {
  const { ref, style } = useReveal({ delay })
  const [expanded, setExpanded] = useState(false)
  const sorted = [...items].sort((a, b) => parseInt(b.year) - parseInt(a.year))
  const visible = expanded ? sorted : sorted.slice(0, PREVIEW)
  const hasMore = sorted.length > PREVIEW

  return (
    <div ref={ref} style={style}>
      <SectionLabel>{label}</SectionLabel>
      <ul className="mt-4 space-y-2">
        {visible.map((it, i) => (
          <Row key={`${it.year}-${i}`} year={it.year} text={it.text} accent={it.accent} />
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-3 text-xs tracking-[0.1em] uppercase text-muted hover:text-paper transition-colors duration-150"
        >
          {expanded ? '접기' : `+${sorted.length - PREVIEW}개 더보기`}
        </button>
      )}
    </div>
  )
}

export default function AboutSection() {
  return (
    <section
      id="about"
      data-section=""
      className="sec"
    >
      <div className="mx-auto w-full max-w-[1680px]">
        <SectionLabel>ABOUT</SectionLabel>

        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-10">
            <Group label="EDUCATION" items={profile.education} delay={0} />
            <Group label="ROLES" items={profile.roles} delay={60} />
          </div>
          <div className="flex flex-col gap-10">
            <Group label="AWARDS" items={profile.awards} delay={120} />
            <Group label="ACTIVITIES" items={profile.activities} delay={180} />
            <Group label="EXPERIENCE" items={profile.experience} delay={240} />
          </div>
        </div>
      </div>
    </section>
  )
}
