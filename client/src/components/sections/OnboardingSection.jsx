import { onboarding } from '../../data/onboarding.js'
import { type, color, layout } from '../../tokens.js'
import SectionLabel from '../ui/SectionLabel.jsx'
import useReveal from '../../lib/useReveal.js'

function Node({ n, node, delay }) {
  const { ref, style } = useReveal({ delay })
  return (
    <div
      ref={ref}
      style={{
        ...style,
        position: 'relative',
        border: `1px solid ${color.line}`,
        borderRadius: layout.radius.card,
        padding: '40px 32px',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      {/* 장식용 대형 배경 번호 */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '-0.1em', right: '0.08em',
          fontSize: 'clamp(110px, 12vw, 180px)', fontWeight: 800, lineHeight: 1,
          color: color.accent, opacity: 0.08,
          userSelect: 'none', pointerEvents: 'none',
        }}
      >{n}</span>

      {/* 콘텐츠 */}
      <span className="font-mono block" style={{ color: color.accent, fontSize: '12px', fontWeight: 700, letterSpacing: '0.16em' }}>{n}</span>
      <p className="font-mono uppercase mt-5" style={{ color: color.accent, fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em' }}>{node.en}</p>
      <p className="font-display mt-3" style={{ fontSize: type.h3.size, fontWeight: 600, lineHeight: 1.35, color: color.paper }}>{node.ko}</p>
    </div>
  )
}

export default function OnboardingSection() {
  const head = useReveal()
  const lead = useReveal({ delay: 120 })

  const nodeItems = []
  onboarding.nodes.forEach((node, i) => {
    nodeItems.push(
      <Node key={node.en} n={String(i + 1).padStart(2, '0')} node={node} delay={i * 100} />
    )
    if (i < onboarding.nodes.length - 1) {
      nodeItems.push(
        <div key={`line-${i}`} className="hidden md:flex items-center flex-shrink-0" style={{ width: '24px' }}>
          <span className="block h-px w-full" style={{ backgroundColor: color.line }} />
        </div>
      )
    }
  })

  return (
    <section id="onboarding" data-section="" className="flex flex-col justify-center sec">
      <div className="mx-auto w-full max-w-[1680px]">
        <SectionLabel>{onboarding.eyebrow}</SectionLabel>
        <h2
          ref={head.ref}
          style={{ ...head.style, fontSize: type.h2.size, fontWeight: type.h2.weight, lineHeight: type.h2.lh, letterSpacing: type.h2.ls }}
          className="mt-5 font-display text-paper"
        >{onboarding.title}</h2>
        <p
          ref={lead.ref}
          style={{ ...lead.style, fontSize: type.bodyLg.size, lineHeight: type.bodyLg.lh, color: color.muted, maxWidth: '820px' }}
          className="mt-6 font-body"
        >{onboarding.lead}</p>
        <div className="mt-20 flex flex-col gap-5 md:flex-row md:gap-0 md:items-stretch">
          {nodeItems}
        </div>
      </div>
    </section>
  )
}
