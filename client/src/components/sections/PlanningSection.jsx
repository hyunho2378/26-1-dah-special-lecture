import { planning } from '../../data/planning.js'
import { type, color } from '../../tokens.js'
import SectionLabel from '../ui/SectionLabel.jsx'
import useReveal from '../../lib/useReveal.js'

function Row({ n, node, delay }) {
  const { ref, style } = useReveal({ delay })
  return (
    <div ref={ref} style={{ ...style, borderTop: `1px solid ${color.line}` }} className="flex items-center gap-8 py-8">
      <span style={{ color: color.accent, fontWeight: 800, fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1, minWidth: '2ch' }}>{n}</span>
      <div>
        <div className="font-mono uppercase" style={{ fontSize: '13px', letterSpacing: '0.12em', fontWeight: 700, color: color.accent }}>{node.en}</div>
        <p className="mt-1 font-display text-paper" style={{ fontSize: type.h3.size, fontWeight: 600, lineHeight: 1.3 }}>{node.ko}</p>
      </div>
    </div>
  )
}

export default function PlanningSection() {
  const head = useReveal()
  const lead = useReveal({ delay: 120 })
  return (
    <section id="planning" data-section="" className="flex flex-col justify-center sec">
      <div className="mx-auto w-full max-w-[1680px]">
        <SectionLabel>{planning.eyebrow}</SectionLabel>
        <h2 ref={head.ref} style={{ ...head.style, fontSize: type.h2.size, fontWeight: type.h2.weight, lineHeight: type.h2.lh, letterSpacing: type.h2.ls }} className="mt-5 font-display text-paper">{planning.title}</h2>
        <p ref={lead.ref} style={{ ...lead.style, fontSize: type.bodyLg.size, lineHeight: type.bodyLg.lh, color: color.muted, maxWidth: '820px' }} className="mt-6 font-body">{planning.lead}</p>
        <div className="mt-14">
          {planning.nodes.map((node, i) => (
            <Row key={node.en} n={String(i + 1).padStart(2, '0')} node={node} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
