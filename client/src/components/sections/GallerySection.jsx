import Carousel3D from '../carousel/Carousel3D.jsx'
import SectionLabel from '../ui/SectionLabel.jsx'
import { projects } from '../../data/projects.js'
import { type } from '../../tokens.js'

// id=work, data-trap-wheel. SectionLabel + 헤드라인 + Carousel3D + 안내.
// 정면 카드 클릭 → liveUrl 새 탭(noopener). 측면 카드 클릭은 Carousel3D가 focusCard로 회전.
export default function GallerySection() {
  const onSelect = (project) => {
    // [DEBUG] liveUrl 확인용 임시 로그 — 동작 확인 후 제거
    console.log('[GallerySection] onSelect liveUrl=%s', project.liveUrl)
    if (!project.liveUrl) return
    // 앵커 클릭 방식 — 일부 브라우저 window.open 팝업 차단 회피
    const a = document.createElement('a')
    a.href = project.liveUrl
    a.target = '_blank'
    a.rel = 'noopener,noreferrer'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <section
      id="work"
      data-section=""
      data-trap-wheel=""
      className="flex flex-col justify-center gap-8 sec"
    >
      <header className="mx-auto w-full max-w-[1680px]">
        <SectionLabel>WORK</SectionLabel>
        <h2
          className="mt-4 font-display text-paper"
          style={{
            fontSize: type.h2.size,
            lineHeight: type.h2.lh,
            letterSpacing: type.h2.ls,
            fontWeight: type.h2.weight,
          }}
        >
          2026-1학기 프로젝트 성과
        </h2>
      </header>

      <Carousel3D projects={projects} onSelect={onSelect} />
    </section>
  )
}
