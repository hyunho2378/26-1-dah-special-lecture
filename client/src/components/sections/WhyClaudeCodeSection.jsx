import { whyClaudeCode as w } from '../../data/whyClaudeCode.js'
import { type, color } from '../../tokens.js'
import SectionLabel from '../ui/SectionLabel.jsx'
import useReveal from '../../lib/useReveal.js'

// 0..1 좌표 → SVG. x:[100,1100], y:[60,560]
const VX = (x) => 100 + x * 1000
const VY = (y) => 60 + y * 500

const isAccent = (t) => t.mine || t.primary

export default function WhyClaudeCodeSection() {
  const head = useReveal()
  const lead = useReveal({ delay: 120 })
  const chart = useReveal({ delay: 200 })
  return (
    <section id="why-claude-code" data-section="" className="flex flex-col justify-center sec">
      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.85; }
        }
        .tool-glow { animation: glowPulse 2.6s ease-in-out infinite; }
      `}</style>
      <div className="mx-auto w-full max-w-[1680px]">
        <SectionLabel>{w.eyebrow}</SectionLabel>
        <h2
          ref={head.ref}
          style={{ ...head.style, fontSize: type.h2.size, fontWeight: type.h2.weight, lineHeight: type.h2.lh, letterSpacing: type.h2.ls }}
          className="mt-5 font-display text-paper"
        >{w.title}</h2>
        <p
          ref={lead.ref}
          style={{ ...lead.style, fontSize: type.bodyLg.size, lineHeight: type.bodyLg.lh, color: color.muted, maxWidth: '820px' }}
          className="mt-6 font-body"
        >{w.lead}</p>

        <div ref={chart.ref} style={chart.style} className="mt-12">
          <svg
            viewBox="0 0 1200 620"
            className="w-full"
            style={{ maxWidth: '1400px' }}
            role="img"
            aria-label="AI 도구 포지셔닝 맵"
          >
            <defs>
              {/* glow 노드 전용 blur 필터 */}
              <filter id="soft-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="10" result="blur" />
              </filter>
            </defs>

            {/* 축선 — x 중심 600, y 중심 310 */}
            <line x1="100" y1="310" x2="1100" y2="310" stroke={color.line} strokeWidth="1" />
            <line x1="600" y1="60"  x2="600"  y2="560" stroke={color.line} strokeWidth="1" />

            {/* 축 라벨 */}
            <text x="88"  y="310" textAnchor="end"    dominantBaseline="middle" fill={color.muted} style={{ fontSize: '15px', fontFamily: 'Pretendard' }}>{w.axis.x[0]}</text>
            <text x="1112" y="310" textAnchor="start" dominantBaseline="middle" fill={color.muted} style={{ fontSize: '15px', fontFamily: 'Pretendard' }}>{w.axis.x[1]}</text>
            <text x="600" y="44"  textAnchor="middle" fill={color.muted} style={{ fontSize: '15px', fontFamily: 'Pretendard' }}>{w.axis.y[0]}</text>
            <text x="600" y="584" textAnchor="middle" fill={color.muted} style={{ fontSize: '15px', fontFamily: 'Pretendard' }}>{w.axis.y[1]}</text>

            {/* 노드 */}
            {w.tools.map((t, i) => {
              const cx = VX(t.x)
              const cy = VY(t.y)
              const accent = isAccent(t)
              const c = accent ? color.accent : color.paper
              const r = accent ? 10 : 6
              // x > 0.5 이면 라벨을 점 왼쪽에(겹침 방지)
              const labelLeft = t.x > 0.5
              const lx = labelLeft ? cx - r - 10 : cx + r + 10
              const anchor = labelLeft ? 'end' : 'start'
              return (
                <g key={t.name}>
                  {t.glow && (
                    <circle
                      className="tool-glow"
                      cx={cx}
                      cy={cy}
                      r={28}
                      fill={color.accent}
                      filter="url(#soft-glow)"
                      style={{ animationDelay: `${i * 0.7}s` }}
                    />
                  )}
                  <circle cx={cx} cy={cy} r={r} fill={c} />
                  <text
                    x={lx}
                    y={cy}
                    textAnchor={anchor}
                    dominantBaseline="middle"
                    fill={c}
                    style={{
                      fontSize: accent ? '18px' : '15px',
                      fontWeight: accent ? 700 : 500,
                      fontFamily: 'Pretendard',
                    }}
                  >{t.name}</text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  )
}
