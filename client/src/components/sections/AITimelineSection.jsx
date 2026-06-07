import { useState } from 'react'
import { aiTimeline } from '../../data/aiTimeline.js'
import { type, color } from '../../tokens.js'
import SectionLabel from '../ui/SectionLabel.jsx'
import useReveal from '../../lib/useReveal.js'

// 2026(마지막)만 accent. 나머지는 muted.
const STAGE_COLORS = [color.paper, color.paper, color.paper, color.paper, color.accent]

function MobileNode({ stage, index, isLast }) {
  const { ref, style } = useReveal({ delay: index * 80 })
  return (
    <div ref={ref} style={style} className="flex gap-4">
      <div className="flex flex-col items-center flex-shrink-0" style={{ paddingTop: '2px' }}>
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: STAGE_COLORS[index] }} />
        {!isLast && (
          <div className="w-px flex-1" style={{ backgroundColor: color.line, minHeight: '1.5rem', marginTop: '4px' }} />
        )}
      </div>
      <div className="pb-5 min-w-0">
        <span className="text-xs block" style={{ color: color.muted }}>{stage.era}</span>
        <p className="font-display font-bold text-sm mt-1" style={{ color: STAGE_COLORS[index] }}>
          {stage.name}
        </p>
      </div>
    </div>
  )
}

function DesktopNode({ stage, index }) {
  const { ref, style } = useReveal({ delay: index * 100 })
  const [hovered, setHovered] = useState(false)
  const isAccent = index === aiTimeline.stages.length - 1
  const dotSize = hovered ? '28px' : '20px'
  const nameColor = (hovered || isAccent) ? color.accent : STAGE_COLORS[index]
  return (
    <div
      ref={ref}
      style={style}
      className="flex flex-col items-center flex-1 min-w-0 px-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* era: 22px 렌더 높이 + mb 12px + 도트반경 10px → 선 top 44px */}
      <span
        className="text-center block"
        style={{ color: color.muted, fontSize: '18px', lineHeight: '22px', marginBottom: '12px' }}
      >
        {stage.era}
      </span>
      <div
        className="rounded-full flex-shrink-0 relative z-10"
        style={{
          width: dotSize,
          height: dotSize,
          backgroundColor: STAGE_COLORS[index],
          marginBottom: '12px',
          transition: 'width 200ms, height 200ms',
        }}
      />
      <span
        className="font-display font-bold text-center"
        style={{
          color: nameColor,
          fontSize: 'clamp(20px,1.7vw,28px)',
          transition: 'color 200ms',
        }}
      >
        {stage.name}
      </span>
    </div>
  )
}

export default function AITimelineSection() {
  const hookReveal = useReveal()
  const takeawayReveal = useReveal({ delay: 400 })

  return (
    <section
      id="ai-timeline"
      data-section=""
      className="flex flex-col justify-center sec"
    >
      <div className="mx-auto w-full max-w-[1680px]">
        <SectionLabel>AI TIMELINE</SectionLabel>

        <div ref={hookReveal.ref} style={hookReveal.style} className="mt-6">
          <h2
            className="font-display text-paper"
            style={{ fontSize: type.h1.size, fontWeight: type.h1.weight, lineHeight: type.h1.lh, letterSpacing: type.h1.ls }}
          >
            {aiTimeline.hook}
          </h2>
        </div>

        {/* 모바일: 세로 노드 리스트 */}
        <div className="mt-32 md:hidden">
          {aiTimeline.stages.map((s, i) => (
            <MobileNode key={s.era} stage={s} index={i} isLast={i === aiTimeline.stages.length - 1} />
          ))}
        </div>

        {/* 데스크탑: 가로 타임라인. 연결선 top=44px(era 22px + mb 12px + 도트반경 10px) */}
        <div className="hidden md:block mt-32 relative">
          <div className="absolute left-0 right-0 h-px" style={{ top: '44px', backgroundColor: color.line }} />
          <div className="flex">
            {aiTimeline.stages.map((s, i) => (
              <DesktopNode key={s.era} stage={s} index={i} />
            ))}
          </div>
        </div>

        <div ref={takeawayReveal.ref} style={takeawayReveal.style} className="mt-16 flex flex-col items-center">
          <div
            className="mt-6 text-center"
            style={{ border: `1px solid ${color.accent}`, borderRadius: '14px', padding: '20px 28px', maxWidth: '820px' }}
          >
            <p
              className="font-display text-paper"
              style={{ fontSize: 'clamp(18px,1.6vw,26px)', fontWeight: type.h2.weight, lineHeight: type.h2.lh, letterSpacing: type.h2.ls }}
            >
              {aiTimeline.takeaway}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
