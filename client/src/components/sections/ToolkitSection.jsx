import { useState } from 'react'
import { toolkit } from '../../data/toolkit.js'
import { type, color, layout } from '../../tokens.js'
import SectionLabel from '../ui/SectionLabel.jsx'
import useReveal from '../../lib/useReveal.js'

function AICard({ tool, index }) {
  const [imgErr, setImgErr] = useState(false)
  const { ref, style } = useReveal({ delay: index * 40 })
  const showImg = tool.logo && !imgErr

  return (
    <div ref={ref} style={style} className="flex flex-col items-center gap-3 text-center p-4">
      <div
        className="flex flex-shrink-0 items-center justify-center overflow-hidden"
        style={{
          width: '88px',
          height: '88px',
          backgroundColor: color.ink,
          borderRadius: layout.radius.md,
        }}
      >
        {showImg ? (
          <img
            src={tool.logo}
            alt={tool.name}
            onError={() => setImgErr(true)}
            style={{ width: '60px', height: '60px', objectFit: 'contain' }}
          />
        ) : (
          <span className="font-display text-xl font-bold" style={{ color: color.paper }}>
            {tool.name[0]}
          </span>
        )}
      </div>
      <div>
        <p className="font-display text-sm font-bold text-paper">{tool.name}</p>
        <p className="mt-1 text-muted" style={{ fontSize: '11px', letterSpacing: type.label.ls }}>
          {tool.role}
        </p>
      </div>
    </div>
  )
}

export default function ToolkitSection() {
  const headerReveal = useReveal()

  return (
    <section
      id="toolkit"
      data-section=""
      className="flex flex-col justify-center sec"
    >
      <div className="mx-auto w-full max-w-[1680px]">
        <div ref={headerReveal.ref} style={headerReveal.style}>
          <SectionLabel>TOOLKIT</SectionLabel>
        </div>

        {/* AI 툴 그리드: 모바일 3열, 데스크탑 4열 (아이콘 크게) */}
        <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-4 md:gap-4">
          {toolkit.ai.map((tool, i) => (
            <AICard key={tool.name} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
