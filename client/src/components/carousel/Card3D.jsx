import { forwardRef, useState } from 'react'
import { carousel, color, layout } from '../../tokens.js'

// 모든 카드 pointer-events:none — 입력은 stage가 capture. 클릭=정면카드 열기는 useCarousel3D가 처리.
const Card3D = forwardRef(function Card3D({ project, isActive }, ref) {
  const [imgErr, setImgErr] = useState(false)
  const { title, role, year, accent, thumbnail, ratio } = project
  const showImg = thumbnail && !imgErr
  const isPortrait = ratio === 'portrait'
  const cardW = isPortrait ? carousel.cardWidthPortrait : carousel.cardWidth
  const cardAR = isPortrait ? carousel.cardAspectPortrait : carousel.cardAspect

  return (
    <div
      ref={ref}
      aria-label={title}
      className={`card overflow-hidden border transition-[opacity,border-color] duration-200 ${
        isActive ? 'border-line opacity-100' : 'border-transparent opacity-80'
      }`}
      style={{ width: cardW, aspectRatio: cardAR, borderRadius: layout.radius.card, pointerEvents: 'none' }}
    >
      {showImg ? (
        <img src={thumbnail} alt={title} onError={() => setImgErr(true)} draggable={false}
          className={`h-full w-full ${isPortrait ? 'object-contain' : 'object-cover'}`}
          style={isPortrait ? { backgroundColor: color.ink } : undefined} />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-ink px-4">
          <span className="text-center font-display text-paper">{title}</span>
        </div>
      )}
      <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-ink/70 px-4 py-3 backdrop-blur-sm">
        <span className={`flex items-center gap-2 font-display text-sm ${isActive ? 'text-paper' : 'text-muted'}`}>
          {isActive && (
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent || color.accent }} aria-hidden="true" />
          )}
          {title}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          {role}{year ? ` · ${year}` : ''}
        </span>
      </figcaption>
    </div>
  )
})

export default Card3D
