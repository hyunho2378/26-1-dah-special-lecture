import { designerFuture as d } from '../../data/survival.js'
import { type, color } from '../../tokens.js'
import SectionLabel from '../ui/SectionLabel.jsx'
import useReveal from '../../lib/useReveal.js'

function Step({ step, index, isLast }) {
  const { ref, style } = useReveal({ delay: index * 120 })
  return (
    <div ref={ref} style={style} className="flex gap-8">
      {/* 왼쪽: 세로 선 + 도트 */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ paddingTop: '4px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: color.accent, flexShrink: 0 }} />
        {!isLast && (
          <div style={{ width: '1px', flex: 1, backgroundColor: color.accent, opacity: 0.25, marginTop: '8px' }} />
        )}
      </div>
      {/* 오른쪽: 콘텐츠 */}
      <div style={{ paddingBottom: isLast ? 0 : '72px' }}>
        <SectionLabel>{step.en}</SectionLabel>
        <p className="mt-4 font-display text-paper" style={{ fontSize: type.h3.size, fontWeight: 600, lineHeight: 1.35 }}>{step.ko}</p>
      </div>
    </div>
  )
}

export default function DesignerFutureSection() {
  const head = useReveal()
  const lead = useReveal({ delay: 120 })
  return (
    <section id="designer-future" data-section="" className="flex flex-col justify-center sec">
      <div className="mx-auto w-full max-w-[1680px]">
        <SectionLabel>{d.eyebrow}</SectionLabel>
        <h2
          ref={head.ref}
          style={{ ...head.style, fontSize: type.h2.size, fontWeight: type.h2.weight, lineHeight: type.h2.lh, letterSpacing: type.h2.ls }}
          className="mt-5 font-display text-paper"
        >{d.title}</h2>
        <p
          ref={lead.ref}
          style={{ ...lead.style, fontSize: type.bodyLg.size, lineHeight: type.bodyLg.lh, color: color.muted, maxWidth: '860px' }}
          className="mt-6 font-body"
        >{d.lead}</p>
        <div className="mt-16 flex flex-col" style={{ maxWidth: '640px' }}>
          {d.steps.map((s, i) => (
            <Step key={s.en} step={s} index={i} isLast={i === d.steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
