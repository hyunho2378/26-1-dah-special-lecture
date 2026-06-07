import { useRef } from 'react'
import useCarousel3D from '../../lib/useCarousel3D.js'
import Card3D from './Card3D.jsx'
import { carousel } from '../../tokens.js'

// 드래그 회전 + 휠 회전. 클릭(이동<6px)=정면 카드 열기(새 탭). 입력은 stage가 capture.
export default function Carousel3D({ projects = [], onSelect }) {
  const stageRef = useRef(null)
  const cardRefs = useRef([])

  const open = (i) => {
    const p = projects[i]
    if (!p?.liveUrl) return
    onSelect?.(p)
  }

  const { activeIndex, isDragging } = useCarousel3D(projects.length, stageRef, cardRefs, carousel, open)

  return (
    <div ref={stageRef} className={`stage carousel-mode ${isDragging ? 'is-dragging' : ''}`} data-trap-wheel="">
      <div className="cards">
        {projects.map((p, i) => (
          <Card3D key={p.id} ref={(el) => { cardRefs.current[i] = el }} project={p} isActive={i === activeIndex} />
        ))}
      </div>
    </div>
  )
}
