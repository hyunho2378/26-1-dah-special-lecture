import { manifesto } from '../../data/manifesto.js'
import { type, color } from '../../tokens.js'
import SectionLabel from '../ui/SectionLabel.jsx'
import useReveal from '../../lib/useReveal.js'

export default function ManifestoSection() {
  const line0 = useReveal()
  const line1 = useReveal({ delay: 180 })
  const punchReveal = useReveal({ delay: 360 })

  return (
    <section
      id="manifesto"
      data-section=""
      className="flex flex-col justify-center sec"
    >
      <div className="mx-auto w-full max-w-[1680px]">
        <SectionLabel>MANIFESTO</SectionLabel>

        <div className="mt-8 space-y-2">
          <div ref={line0.ref} style={line0.style}>
            <p
              className="font-display"
              style={{
                fontSize: type.h2.size,
                fontWeight: type.h2.weight,
                lineHeight: type.h2.lh,
                letterSpacing: type.h2.ls,
                color: color.muted,
              }}
            >
              {manifesto.lines[0]}
            </p>
          </div>
          <div ref={line1.ref} style={line1.style}>
            <p
              className="font-display text-paper"
              style={{
                fontSize: type.h2.size,
                fontWeight: type.h2.weight,
                lineHeight: type.h2.lh,
                letterSpacing: type.h2.ls,
              }}
            >
              {manifesto.lines[1]}
            </p>
          </div>
        </div>

        {/* 핵심 선언: accent(핑크) 강조 — DESIGN "강조 텍스트에만 사용" */}
        <div ref={punchReveal.ref} style={punchReveal.style} className="mt-10 md:mt-14">
          <p
            className="font-display"
            style={{
              fontSize: type.h1.size,
              fontWeight: type.h1.weight,
              lineHeight: type.h1.lh,
              letterSpacing: type.h1.ls,
              color: color.accent,
            }}
          >
            {manifesto.punchline}
          </p>
        </div>

      </div>
    </section>
  )
}
