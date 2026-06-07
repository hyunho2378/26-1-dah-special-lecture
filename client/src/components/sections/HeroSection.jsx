import { useState } from 'react'
import { profile } from '../../data/profile.js'
import { layout, type, color } from '../../tokens.js'
import useReveal from '../../lib/useReveal.js'

// HO 로고 마크. 대형 + 좌측정렬. 누락 시 텍스트 폴백.
function Logo() {
  const [err, setErr] = useState(false)
  if (err || !profile.logo) {
    return (
      <div
        className="font-display font-bold text-accent"
        style={{ fontSize: 'clamp(72px, 12vw, 180px)', lineHeight: 1, letterSpacing: '-0.02em' }}
      >
        HO
      </div>
    )
  }
  return (
    <img
      src={profile.logo}
      alt="HO"
      onError={() => setErr(true)}
      style={{ height: 'clamp(96px, 15vw, 220px)', width: 'auto', display: 'block' }}
    />
  )
}

// 프로필 사진. 원본 비율 유지(크롭 없음). 누락 시 박스 폴백.
function Photo() {
  const [err, setErr] = useState(false)
  const ok = profile.photo && !err
  return (
    <div
      className="w-full overflow-hidden bg-ink mx-auto"
      style={{ borderRadius: layout.radius.card, maxWidth: '440px' }}
    >
      {ok ? (
        <img
          src={profile.photo}
          alt={profile.name}
          onError={() => setErr(true)}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      ) : (
        <div className="flex items-center justify-center" style={{ aspectRatio: '4 / 5' }}>
          <span className="text-xs uppercase tracking-[0.2em] text-paper">{profile.nameEn}</span>
        </div>
      )}
    </div>
  )
}

export default function HeroSection() {
  const left = useReveal()
  const right = useReveal({ delay: 120 })
  return (
    <section id="hero" data-section="" className="flex items-center sec">
      <div className="mx-auto w-full max-w-[1680px]">
        <div className="grid items-center gap-12 md:grid-cols-[1.35fr_1fr]">
          <div ref={left.ref} style={left.style}>
            <Logo />
            <h1
              className="mt-14 font-display text-paper"
              style={{ fontSize: type.h1.size, lineHeight: 1.35, letterSpacing: type.h1.ls, fontWeight: 700 }}
            >
              {profile.headline[0]}
              <br />
              {profile.headline[1]}
            </h1>
            <div className="mt-12">
              <p
                className="font-display text-paper"
                style={{ fontSize: 'clamp(22px, 2.2vw, 30px)', fontWeight: 700, lineHeight: 1.2 }}
              >
                {profile.name}
              </p>
              <p
                className="mt-3 font-body"
                style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', fontWeight: 400, lineHeight: 1.5, color: color.muted }}
              >
                {profile.majors}
              </p>
            </div>
          </div>
          <div ref={right.ref} style={right.style}>
            <Photo />
          </div>
        </div>
      </div>
    </section>
  )
}
