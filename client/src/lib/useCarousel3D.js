import { useEffect, useRef, useState } from 'react'

// 원본: Clément Grellier / Codrops gradientslider (MIT). 물리(dt·friction·wheel·drag) 그대로 이식, scale 항만 제외.
// 클릭 판정: stage가 pointer-capture로 입력 독점 → pointerup 이동거리 < 6px면 '정면(active) 카드' 열기.
//          (3D preserve-3d 히트테스트에 의존하지 않으므로 항상 동작)
function mod(n, m) { return ((n % m) + m) % m }
const clampN = (v, a, b) => Math.max(a, Math.min(b, v))

export default function useCarousel3D(count, stageRef, cardRefs, options = {}, onTap) {
  const {
    perspective = 1800, maxRotation = 28, maxDepth = 180, gap = 28,
    friction = 0.9, wheelSens = 0.6, dragSens = 1.0,
  } = options

  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const scrollX = useRef(0)
  const vX = useRef(0)
  const activeRef = useRef(0)
  const metrics = useRef({ step: 1, track: 1, half: 1, vwHalf: 1 })
  const rafId = useRef(0)
  const lastTime = useRef(0)

  const onTapRef = useRef(onTap)
  onTapRef.current = onTap

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || count < 1) return undefined
    stage.style.perspective = `${perspective}px`

    const measure = () => {
      let cw = 0
      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i]
        if (el && el.offsetWidth > cw) cw = el.offsetWidth
      }
      if (!cw) cw = Math.min(window.innerWidth * 0.36, 500)
      const m = metrics.current
      m.step = cw + gap
      m.track = m.step * count
      m.half = m.track / 2
      m.vwHalf = (stage.offsetWidth || window.innerWidth) * 0.5
    }
    measure()

    const render = () => {
      const { step, track, half, vwHalf } = metrics.current
      let bestI = 0, bestD = Infinity
      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i]
        if (!el) continue
        let pos = i * step - scrollX.current
        if (pos < -half) pos += track
        if (pos > half) pos -= track
        const norm = clampN(pos / vwHalf, -1, 1)
        const ry = -norm * maxRotation
        const tz = (1 - Math.abs(norm)) * maxDepth
        el.style.transform = `translate3d(calc(-50% + ${pos}px), -50%, ${tz}px) rotateY(${ry}deg)`
        el.style.zIndex = String(1000 + Math.round(tz))
        const d = Math.abs(pos)
        if (d < bestD) { bestD = d; bestI = i }
      }
      if (bestI !== activeRef.current) { activeRef.current = bestI; setActiveIndex(bestI) }
    }

    const tick = (t) => {
      const dt = lastTime.current ? (t - lastTime.current) / 1000 : 0
      lastTime.current = t
      scrollX.current = mod(scrollX.current + vX.current * dt, metrics.current.track)
      const decay = Math.pow(friction, dt * 60)
      vX.current *= decay
      if (Math.abs(vX.current) < 0.02) vX.current = 0
      render()
      rafId.current = requestAnimationFrame(tick)
    }

    const onWheel = (e) => {
      e.preventDefault()
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      vX.current += delta * wheelSens * 20
    }

    let dragging = false
    let startX = 0, startY = 0, lastX = 0, lastT = 0, lastDelta = 0
    const onDown = (e) => {
      dragging = true
      startX = e.clientX; startY = e.clientY
      lastX = e.clientX; lastT = performance.now(); lastDelta = 0
      vX.current = 0
      try { stage.setPointerCapture(e.pointerId) } catch (err) { void err }
      setIsDragging(true)
    }
    const onMove = (e) => {
      if (!dragging) return
      const now = performance.now()
      const dx = e.clientX - lastX
      const dt = Math.max(1, now - lastT) / 1000
      scrollX.current = mod(scrollX.current - dx * dragSens, metrics.current.track)
      lastDelta = dx / dt
      lastX = e.clientX; lastT = now
    }
    const onUp = (e) => {
      if (!dragging) return
      dragging = false
      try { stage.releasePointerCapture(e.pointerId) } catch (err) { void err }
      setIsDragging(false)
      const dist = Math.hypot(e.clientX - startX, e.clientY - startY)
      if (dist < 6) {
        vX.current = 0
        onTapRef.current?.(activeRef.current) // 클릭 → 정면 카드 열기
      } else {
        vX.current = -lastDelta * dragSens // 관성
      }
    }

    stage.addEventListener('wheel', onWheel, { passive: false })
    stage.addEventListener('pointerdown', onDown)
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerup', onUp)
    stage.addEventListener('pointercancel', onUp)
    stage.addEventListener('dragstart', (e) => e.preventDefault())
    const ro = new ResizeObserver(() => { measure(); render() })
    ro.observe(stage)
    window.addEventListener('resize', measure)
    rafId.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId.current)
      stage.removeEventListener('wheel', onWheel)
      stage.removeEventListener('pointerdown', onDown)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerup', onUp)
      stage.removeEventListener('pointercancel', onUp)
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [count, stageRef, cardRefs, perspective, maxRotation, maxDepth, gap, friction, wheelSens, dragSens])

  return { activeIndex, isDragging }
}
