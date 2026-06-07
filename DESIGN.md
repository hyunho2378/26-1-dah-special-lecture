# DESIGN.md

> 주현호 인터랙티브 포트폴리오 / 디지털인문예술입문 특강 사이트
> 색·간격·폰트·3D 튜닝값은 전부 `src/tokens.js`에서만 꺼낸다. 이 문서는 그 근거와 규칙.

---

## 0. 정체성

학부 3학년이 2026년 한 학기에 14개 사이트를 실제 배포했다. 이 사이트는 그 사실을 한 화면에 박는 허브이자, 특강의 스크롤 슬라이드다. 두 목적을 한 자산으로 합친다.

- **메시지** 피그마에서 멈추던 디자이너가 배포까지 한다. AI 시대엔 도구를 못 다루는 게 아니라 문제를 정의 못 하는 사람이 도태된다.
- **톤** 정제. 절제. editorial. 글리치·과장·다색 금지.

---

## 1. 플랫폼

**B형 반응형 웹.** 320px ~ 2560px 전 구간 대응. 강의 프로젝터(1920) 우선 검증.

---

## 2. 색 — 다크 + 시그니처 핑크

`color.ink #181818` 배경 / `color.paper #F2F0EB` 텍스트 / `color.accent #E27DA6` = 주현호 시그니처 핑크.

핑크는 헤더 로고(HO 마크), 모노 라벨, 라인, 강조 텍스트, focus 링에만. 큰 배경 면에는 안 쓴다.

근거. 갤러리 썸네일 10개가 골드·핑크·오렌지·라임 잡색이다. 크롬 배경까지 핑크면 캐릭터공모전·LUCID 카드(둘 다 #E27DA6)가 배경에 묻힌다. 그래서 핑크는 크롬의 강조 요소에만, 카드 라벨 점은 각 프로젝트 고유색 유지(`projects.js`의 accent). 색 변경은 `tokens.js`의 `color` 한 곳에서만.

대비. paper on ink 약 14:1(AAA). accent #E27DA6 on ink 약 6:1, 강조 텍스트·라벨 가독 확보.

---

## 3. 타이포그래피

| 역할 | 폰트 | 용도 |
|---|---|---|
| display | Space Grotesk | 영문 헤드라인·히어로·숫자 강조 |
| body | Pretendard | 국문 본문 전체 |
| mono | JetBrains Mono | 섹션 라벨(대문자)·수치·코드 톤 라벨 |

모노를 섞는 이유 = "코딩하는 디자이너" 정체성을 타이포로 보여주기 위함. 스케일은 `type` 토큰의 clamp로 모바일↔데스크탑 연속 보간. 폰트는 전부 CDN(Space Grotesk·JetBrains Mono = Google Fonts, Pretendard = jsdelivr). 폰트 스택 1순위는 반드시 명명 폰트. system-ui를 폰트로 쓰지 않는다.

---

## 4. 간격·레이아웃

- 4pt 배수(`space` 토큰).
- 텍스트 섹션 max 1280px 중앙 정렬, 와이드 섹션 1440px.
- pagePadX 모바일 16 / md 40 / xl 64.
- radius: UI 4~8px, 이미지 카드 14px(`radius.card`), pill 999px.
- 섹션 리듬: 큰 모노 라벨 → 여백 → 디스플레이 헤드라인 → 여백 → 본문. (PATTERNS.md 참조)

---

## 5. 3D 코버플로우 캐러셀

이 사이트의 심장. 레퍼런스 `clementgrellier/gradientslider`(Codrops, MIT)의 3D 로직만 이식한다. 반응형 그래디언트·캔버스·GSAP는 가져오지 않는다.

### 가져온 것
- `perspective` 1800px 무대 + `transform-style: preserve-3d`.
- 카드 배치 `translate3d(x, -50%, tz) rotateY(ry)`.
- 무한 래핑(`mod`), 드래그/휠 물리(friction·velocity).

### 변경한 것 (반드시 지킬 것)
1. **`scale()` 제거.** 원본은 카드에 `scale(0.92~1.0)`을 쓴다. 우리 AGENTS.md는 `transform: scale` 금지. perspective가 이미 거리에 따라 원근 축소를 하므로 scale 없이 translateZ depth(`maxDepth` 140→180 상향)로만 표현한다.
2. **카드 비율 16/10 가로.** 원본 4/5 세로 → 웹사이트 스샷은 가로라 세로면 잘림.
3. **배경 그래디언트·`#bg` 캔버스·`extractColors`·`buildPalette`·`drawBackground`·`setActiveGradient` 전부 미구현.**
4. **GSAP 미사용.** 진입 애니는 CSS stagger(opacity + translateZ)로.
5. **정면 카드 클릭 → 라이브 사이트 진입(`target="_blank"`) 또는 `/work/:id` 라우트.** 원본엔 없는 신규 기능.

### 튜닝값
전부 `tokens.js`의 `carousel` 객체. 컴포넌트에서 매직넘버 금지.

---

## 6. 인터랙션 모델 — 무헤더 풀페이지

**헤더 없음.** 상단 고정 nav 제거. 각 섹션 = 한 화면(100vh 기준, 콘텐츠 많으면 자연 확장).

- **스크롤 스냅** `scroll-snap-type: y proximity`(mandatory 아님 — 긴 섹션 갇힘 방지). 섹션 `scroll-snap-align: start`.
- **키보드 내비** ↓/PageDown/Space → 다음 섹션, ↑/PageUp → 이전. `scrollIntoView({behavior:'smooth'})`. 발표자가 방향키로 섹션 단위 진행. `useFullpageNav` 훅으로 구현.
- **현재 섹션 표시** 우측 미니 도트 인디케이터(선택). 클릭 시 해당 섹션 이동.
- **⚠️ 갤러리 휠 충돌** 풀페이지는 휠=섹션 이동, 3D 갤러리는 휠=카드 회전. 한 화면에서 충돌. **해결: 갤러리 섹션 안에서는 휠을 카드 회전에 소비(섹션 이동 차단), 섹션 이탈은 방향키로만.** 갤러리 진입 시 `data-trap-wheel` 플래그 → useFullpageNav가 휠 점프 비활성, 방향키 점프는 유지.
- **프로필 사진** Hero 섹션에 배치(profile.js의 photo 경로). object-fit cover, radius.card 또는 원형. alt 필수.
- `prefers-reduced-motion` 시 smooth → instant, 스냅 유지.

---

## 7. 모션 원칙

- transition 150~300ms, ease `cubic-bezier(0.22,1,0.36,1)`.
- 호버는 배경·보더·opacity 변화만. **scale·transform 변형 금지**(AGENTS 규칙).
- `prefers-reduced-motion: reduce` 시 자동 회전·진입 애니 정지, 캐러셀은 정적 배치 유지.

---

## 8. 절대 규칙 (AGENTS.md 상속)

- TypeScript 금지 → JSX만.
- localStorage / sessionStorage 금지.
- 색·간격·폰트 하드코딩 금지 → tokens.js만.
- 이모지 금지 → lucide-react 또는 inline SVG.
- `transform: scale` 금지(캐러셀 포함).
- B형 hover/focus 필수, 320~2560 전 구간 깨짐 없음.
