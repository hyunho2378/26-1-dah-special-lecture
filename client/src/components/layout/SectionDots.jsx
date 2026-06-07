// 우측 미니 도트 인디케이터. 현재 섹션 표시 + 클릭 이동. 모바일 숨김.
export default function SectionDots({ ids = [], active = 0, onJump }) {
  if (!ids.length) return null
  return (
    <nav
      aria-label="섹션 내비게이션"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex"
    >
      {ids.map((id, i) => (
        <button
          key={id}
          type="button"
          onClick={() => onJump?.(i)}
          aria-label={id}
          aria-current={i === active}
          className={`h-2 w-2 rounded-full border border-line transition-colors duration-200 ${
            i === active ? 'bg-paper' : 'bg-transparent hover:bg-muted'
          }`}
        />
      ))}
    </nav>
  )
}
