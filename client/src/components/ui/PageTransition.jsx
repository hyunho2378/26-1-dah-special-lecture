import { useEffect, useState } from 'react'

// 페이지 진입 opacity fade. scale·이동 변형 없음.
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export default function PageTransition({ children }) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return undefined
    }
    const raf = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div style={{ opacity: shown ? 1 : 0, transition: `opacity 300ms ${EASE}` }}>{children}</div>
  )
}
