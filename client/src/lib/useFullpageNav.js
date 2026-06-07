import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

// 자유 스크롤 내비. 섹션 강제 스냅 없음.
// 방향키/PageDown/Space → 다음/이전 섹션 상단으로 정렬(goTo).
// goTo는 SectionDots 클릭에서도 사용. scrollIntoView block:'start'.
// 휠 처리: 개입 없음. 갤러리 data-trap-wheel은 useCarousel3D가 직접 담당.
export default function useFullpageNav() {
  const [active, setActive] = useState(0)
  const [ids, setIds] = useState([])
  const { pathname } = useLocation()

  const getSections = () => Array.from(document.querySelectorAll('[data-section]'))

  const currentIndex = useCallback(() => {
    const sections = getSections()
    let idx = 0
    let best = Infinity
    sections.forEach((el, i) => {
      const d = Math.abs(el.getBoundingClientRect().top)
      if (d < best) {
        best = d
        idx = i
      }
    })
    return idx
  }, [])

  const goTo = useCallback((i) => {
    const sections = getSections()
    if (!sections.length) return
    const clamped = Math.max(0, Math.min(sections.length - 1, i))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    sections[clamped].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    setActive(clamped)
  }, [])

  useEffect(() => {
    setIds(getSections().map((el) => el.id))
    setActive(currentIndex())

    const onKey = (e) => {
      if (e.target?.closest?.('input,textarea,select,[contenteditable]')) return
      const space = e.key === ' ' || e.key === 'Spacebar'
      if (space && e.target?.closest?.('button,a,[role=button]')) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || space) {
        e.preventDefault()
        goTo(currentIndex() + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goTo(currentIndex() - 1)
      }
    }

    let raf
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setActive(currentIndex()))
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [currentIndex, goTo, pathname])

  return { active, ids, goTo }
}
