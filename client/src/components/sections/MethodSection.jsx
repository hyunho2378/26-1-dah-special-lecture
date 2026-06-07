import { method } from '../../data/journey.js'
import { type, color, layout } from '../../tokens.js'
import SectionLabel from '../ui/SectionLabel.jsx'
import useReveal from '../../lib/useReveal.js'

const HARNESS_FLOW = ['금지·필수 규칙(MD)', '최적화·정제', 'Claude Code', '일관된 결과']

function Beat({ beat, index }) {
  const { ref, style } = useReveal({ delay: index * 90 })
  return (
    <div ref={ref} style={{ ...style, borderRadius: layout.radius.card, border: `1px solid ${color.line}` }} className="flex flex-col p-8 md:p-9">
      <div><SectionLabel>{beat.label}</SectionLabel></div>
      <p className="mt-3 font-display text-paper" style={{ fontSize: 'clamp(22px,2vw,30px)', fontWeight: 700, lineHeight: 1.25 }}>{beat.title}</p>
      {beat.detail && (
        <p className="mt-5 font-body" style={{ fontSize: type.body.size, lineHeight: 1.6, color: color.muted }}>
          {beat.detail.split('\n').map((line, i) => <span key={i}>{line}{i < beat.detail.split('\n').length - 1 && <br/>}</span>)}
        </p>
      )}
      {beat.tags && (
        <div className="mt-6 flex flex-col gap-2">
          {beat.tags.map((t) => (
            <span key={t} className="font-body" style={{ fontSize: type.body.size, color: color.paper, border: `1px solid ${color.line}`, borderRadius: layout.radius.sm, padding: '10px 14px' }}>{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

function HarnessCard({ beat }) {
  const { ref, style } = useReveal({ delay: 200 })
  return (
    <div ref={ref} style={{ ...style, borderRadius: layout.radius.card, border: `1px solid ${color.line}` }} className="p-8 md:p-9">
      <div><SectionLabel>{beat.label}</SectionLabel></div>
      <p className="mt-3 font-display text-paper" style={{ fontSize: 'clamp(22px,2vw,30px)', fontWeight: 700, lineHeight: 1.25 }}>{beat.title}</p>
      {beat.detail && (
        <p className="mt-5 font-body" style={{ fontSize: type.body.size, lineHeight: 1.6, color: color.muted }}>
          {beat.detail.split('\n').map((line, i) => <span key={i}>{line}{i < beat.detail.split('\n').length - 1 && <br/>}</span>)}
        </p>
      )}
      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3">
        {HARNESS_FLOW.map((n, i) => (
          <div key={n} className="flex items-center gap-2">
            <span className="font-mono whitespace-nowrap" style={{ border: `1px solid ${color.line}`, color: color.paper, fontSize: '13px', padding: '7px 12px', borderRadius: layout.radius.sm }}>{n}</span>
            {i < HARNESS_FLOW.length - 1 && (
              <span style={{ color: color.accent, fontSize: '14px', fontWeight: 700 }} aria-hidden="true">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MethodSection() {
  const head = useReveal()
  const topBeats = method.slice(0, 2)
  const harness = method[2]

  return (
    <section id="method" data-section="" className="flex flex-col justify-center sec">
      <div className="mx-auto w-full max-w-[1680px]">
        <SectionLabel>METHOD</SectionLabel>
        <h2
          ref={head.ref}
          style={{ ...head.style, fontSize: type.h2.size, fontWeight: type.h2.weight, lineHeight: type.h2.lh, letterSpacing: type.h2.ls }}
          className="mt-5 font-display text-paper"
        >AI는 누구나, 차별화를 위한 역량</h2>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 md:items-stretch">
          {topBeats.map((b, i) => <Beat key={b.label} beat={b} index={i} />)}
        </div>

        <div className="mt-5">
          <HarnessCard beat={harness} />
        </div>
      </div>
    </section>
  )
}
