import { survival } from '../../data/survival.js'
import { type, color, layout } from '../../tokens.js'
import SectionLabel from '../ui/SectionLabel.jsx'
import useReveal from '../../lib/useReveal.js'

function Rule({ n, rule, delay }) {
  const { ref, style } = useReveal({ delay })
  return (
    <div ref={ref} style={{ ...style, borderRadius: layout.radius.card, border: `1px solid ${color.line}` }} className="flex items-center gap-6 p-8 md:p-9">
      <span style={{ color: color.accent, fontWeight: 800, fontSize: 'clamp(26px,2.4vw,38px)', lineHeight: 1 }}>{n}</span>
      <div className="flex-1">
        <span className="font-display text-paper" style={{ fontSize: 'clamp(18px,1.8vw,24px)', fontWeight: 700, lineHeight: 1.2 }}>{rule.en}</span>
        <p className="mt-2 font-body" style={{ fontSize: type.body.size, color: color.muted }}>{rule.ko}</p>
      </div>
    </div>
  )
}

export default function SurvivalSection() {
  const head = useReveal()
  return (
    <section id="survival" data-section="" className="flex flex-col justify-center sec">
      <div className="mx-auto w-full max-w-[1680px]">
        <SectionLabel>{survival.eyebrow}</SectionLabel>
        <h2 ref={head.ref} style={{ ...head.style, fontSize: type.h2.size, fontWeight: type.h2.weight, lineHeight: type.h2.lh, letterSpacing: type.h2.ls }} className="mt-5 font-display text-paper">{survival.title}</h2>
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {survival.rules.map((r, i) => (
            <Rule key={r.en} n={String(i + 1).padStart(2, '0')} rule={r} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  )
}
