import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SectionDots from './SectionDots.jsx'
import useFullpageNav from '../../lib/useFullpageNav.js'

// 헤더 없음. Outlet. ink 배경. 풀페이지 키보드/휠 내비 장착.
export default function Layout() {
  const { active, ids, goTo } = useFullpageNav()

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== 'f' && e.key !== 'F') return
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        document.documentElement.requestFullscreen()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])
  return (
    <div className="min-h-screen bg-ink text-paper">
      <SectionDots ids={ids} active={active} onJump={goTo} />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
