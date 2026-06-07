# COMPONENTS.md

> 전부 JSX. props는 주석으로 명세(TypeScript interface 금지). 색·간격·폰트·3D값은 tokens.js에서만.
> 우선순위: [P0] 캐러셀·레이아웃·데이터 (강의 데모 필수) / [P1] 섹션 콘텐츠 / [P2] 상세·마무리.

---

## 1. 폴더 구조

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── tokens.js
├── data/
│   ├── projects.js      // 갤러리 10 항목
│   ├── profile.js       // Hero·About·Footer (학력·위치·활동·수상·스탯)
│   ├── journey.js       // Method 섹션 (독학·딸깍vs나·하네스·기획력)
│   ├── toolkit.js       // 멀티 AI 스택 + 생존키트
│   ├── manifesto.js     // 클로징 선언
│   └── aiTimeline.js    // AI 진화 5단계
├── lib/
│   ├── useCarousel3D.js  // 캐러셀 엔진 (gradientslider 이식)
│   ├── useFullpageNav.js // 무헤더 풀페이지: 키보드 섹션 점프 + 휠 충돌 트랩
│   ├── useReveal.js      // 뷰포트 진입 reveal
│   └── useCountUp.js     // 스탯 카운트업
├── components/
│   ├── layout/  Layout.jsx  Footer.jsx  ScrollToTop.jsx  SectionDots.jsx
│   ├── ui/      SectionLabel.jsx  Button.jsx  Stat.jsx  Tag.jsx  PageTransition.jsx
│   ├── carousel/ Carousel3D.jsx  Card3D.jsx
│   └── sections/ HeroSection.jsx  AboutSection.jsx  AITimelineSection.jsx
│                 MethodSection.jsx  GallerySection.jsx  ToolkitSection.jsx  ManifestoSection.jsx
└── pages/
    ├── HomePage.jsx
    ├── WorkDetailPage.jsx
    └── NotFoundPage.jsx
```

---

## 2. 캐러셀 [P0] — 핵심

### `lib/useCarousel3D.js`
gradientslider `script.js`의 **3D 로직만** 이식한 커스텀 훅. 바닐라 DOM/이벤트를 React ref + useEffect + rAF로 재작성.

```
// 입력
//   count       Number   카드 개수
//   stageRef    ref      .stage 컨테이너
//   cardRefs    ref[]    각 카드 el
//   options     { perspective, maxRotation, maxDepth, gap, friction, wheelSens, dragSens, autoRotate }  // tokens.carousel
// 반환
//   activeIndex Number   현재 정면 카드
//   isDragging  Boolean
//   focusCard(i)         특정 카드를 중앙으로 회전
```

이식 규칙(반드시):
- 원본 `computeTransformComponents` / `transformForScreenX` 수학 이식하되 **`scale` 항 제거**. transform = `translate3d(${x}px,-50%,${tz}px) rotateY(${ry}deg)` 까지만.
- 원본 `mod()` 무한 래핑, `FRICTION` 관성, `wheel`/`pointerdown·move·up` 핸들러 이식.
- DOM 직접 조작 대신 cardRefs로 `el.style.transform` 갱신(transform만, layout 속성 X).
- `extractColors`/`buildPalette`/`drawBackground`/`setActiveGradient`/canvas/GSAP **이식 안 함**.
- idle 시 `autoRotate`로 SCROLL_X 자동 증가, hover/drag 시 정지.
- `prefers-reduced-motion` 시 autoRotate 0 + 정적 배치.
- cleanup에서 rAF·리스너 전부 해제.

### `components/carousel/Carousel3D.jsx` [P0]
```
// props
//   projects   Array   projects.js
//   onSelect   func(project)   정면 카드 클릭 시 호출 (라우팅/새탭 분기는 GallerySection이 처리)
```
- `.stage`(perspective) > `.cards`(preserve-3d) > Card3D[] 렌더.
- useCarousel3D로 transform 구동, activeIndex를 Card3D에 전달.
- `.stage.carousel-mode` 클래스로 touch-action:none, cursor grab/grabbing.

### `components/carousel/Card3D.jsx` [P0]
```
// props
//   project   Object   { id, title, role, team, year, category, accent, thumbnail, liveUrl, detail }
//   isActive  Boolean  정면 여부
//   onClick   func     isActive일 때만 동작
```
- `.card`(16/10, transform-origin 90% center) > 썸네일 `img.card__img`(radius.card, object-fit cover).
- 하단 캡션: 프로젝트명(display) + 모노 라벨(role · year) + accent 점(프로젝트 고유색, 이 점에서만 색 노출).
- isActive일 때만 보더/캡션 강조 + cursor pointer + 클릭 활성. 비활성 카드 클릭은 focusCard로 회전만(상위에서 처리).
- backface-visibility hidden, will-change transform.

---

## 3. 레이아웃 [P0]

| 컴포넌트 | 스펙 |
|---|---|
| `Layout.jsx` | **헤더 없음.** `<Outlet/>` + Footer만. ink 배경. useFullpageNav 장착(키보드 섹션 점프) |
| `Footer.jsx` | 이메일·GitHub·Instagram(profile.js). 모바일 column |
| `ScrollToTop.jsx` | 라우트 변경 시 top |
| `SectionDots.jsx` | 우측 미니 도트 인디케이터(현재 섹션 표시·클릭 이동). 선택 구현. 모바일 숨김 |

`lib/useFullpageNav.js` — 무헤더 풀페이지 내비. ↓/PageDown/Space=다음 섹션, ↑/PageUp=이전(scrollIntoView smooth). 섹션 ref 배열 받아 현재 인덱스 추적. **갤러리 섹션(data-trap-wheel) 진입 시 휠 점프 비활성(휠은 카드 회전에 소비), 방향키 점프는 유지.** reduced-motion 시 instant.

---

## 4. UI [P1]

| 컴포넌트 | 스펙 |
|---|---|
| `SectionLabel.jsx` | 모노 대문자 라벨(type.label) + 좌측 짧은 라인. 모든 섹션 상단 공통 |
| `Button.jsx` | variant: solid(paper 배경·ink 텍스트) / ghost(보더만) / text. hover는 배경·보더만, scale 금지 |
| `Stat.jsx` | 큰 수치(display) + 모노 라벨. useCountUp 연동(Hero 스탯: 14 배포·10 프로젝트 등) |
| `Tag.jsx` | 모노 소형 칩(스택·역할 표기). 보더 1px line |
| `PageTransition.jsx` | opacity fade. scale·이동 변형 없음 |

---

## 5. 섹션 [P1]

| 컴포넌트 | 내용 | 데이터 |
|---|---|---|
| `HeroSection.jsx` | 상단 HO 로고 마크(profile.logo, 핑크) + 이름 + 정체성 헤드라인("불편함을 먼저 읽고 다정한 해답을 내미는") + 복수전공 + 프로필 사진. 100vh | profile.js |
| `AboutSection.jsx` | 학력 타임라인 + 위치(LUCID 위원장·전공대표) + 활동·수상 전체 리스트(tier별 강조: star=흰색, normal=기본, faint=흐림) + N9 성과 + Stat(배포 10 등). 길어지면 100vh 넘겨도 됨(스냅 proximity라 갇힘 없음) | profile.js |
| `AITimelineSection.jsx` | AI 진화 5단계 타임라인 + 도태론 카피 + Nano Banana 전향 hook | aiTimeline.js |
| `MethodSection.jsx` | 자기주도 독학 + "AI는 누구나, 나는 한 겹 더"(워크플로우 깊이: 클로드코드·안티그래비티 / 결과물 디테일: 여백·마진·폰트·일관성·UX 감각. 우열 아닌 레이어) + 하네스 다이어그램(skill→MD→Claude→Claude Code) + 기획력 | journey.js |
| `GallerySection.jsx` | SectionLabel + 헤드라인 + Carousel3D. onSelect 분기(liveUrl 새탭). `data-trap-wheel`로 휠=카드회전, 섹션 이탈은 방향키. 안내 텍스트 | projects.js |
| `ToolkitSection.jsx` | AI 로고 그리드(역할 라벨: Claude·Gemini·GPT·Grok·NotebookLM·Antigravity·Figma) + 생존키트 3카피(월구독만·쓰레드 추종·Codex 솔직). 로고 이미지는 사용자가 public/logos/에 넣음 | toolkit.js |
| `ManifestoSection.jsx` | 큰 타이포 선언(피그마·디자이너는 더 중요해진다 → "AI의 사장이 되어라") + 교수님 실습 전환 문장. reveal | manifesto.js |

---

## 6. 페이지 [P2]

| 컴포넌트 | 스펙 |
|---|---|
| `HomePage.jsx` | 섹션 5개 + (Footer는 Layout) 순서 조립 |
| `WorkDetailPage.jsx` | `useParams().id`로 projects.js 조회. 없으면 NotFound. 썸네일·요약·스택·라이브 버튼(+선택 케이스 본문). 상단 BackLink |
| `NotFoundPage.jsx` | 404, 홈 복귀 |

---

## 7. 데이터 [P0]

### `data/projects.js` — 사전 채움(썸네일·liveUrl만 네가 채움)
각 항목 필드: `id, title, role, team, year, category, accent(프로젝트 고유색), thumbnail(이미지 경로), liveUrl(배포 URL), tags[], summary, detail(선택)`.

확정 10개 (실제 배포 URL 기준. STEP 3에서 이 배열 생성):
```
id                   title                role / 정체성               accent   liveUrl
1  gangneung-pay-ios    강릉페이 (iOS)        지역화폐 앱 · iOS            #1D4ED8  https://gangneung-pay.vercel.app/
2  gangneung-pay-and    강릉페이 (Android)    지역화폐 앱 · Android         #1D4ED8  https://gangneung-pay-android.vercel.app/
3  gangneung-pay-folio  강릉페이 포트폴리오      프로젝트 포트폴리오 웹사이트    #1D4ED8  https://gangneung-pay-ux-project.vercel.app/
4  numer9               Numer9              AI 서비스 (신규)             (TBD)    https://numer9-ai-service.vercel.app/
5  axiom                AXIOM               하이엔드 뷰티 큐레이션 (3D)     #C9A227  https://project-axiom-puce.vercel.app/
6  dah-exhibition       Against the Flow     26-1 DAH 전공 전시          #F5C518  https://26-1-dah-exhibition.vercel.app/
7  teapot-418           418: I'M A TEAPOT    휴먼터치 포스터 공모전 큐레이션  #C8E63C  https://26-1-dah-exhibition-poster-competit.vercel.app/
8  dah-character        디인예 캐릭터 공모전     캐릭터 전시·투표             #E27DA6  https://dah-new-character-contest.vercel.app/
9  lucid-link           LUCID 링크페이지        전공 학생회 링크트리          #E27DA6  https://dah-lucid-site.vercel.app/
10 dalat-vibe           Dalat Vibe           여행 UX 앱 (기존 자산)        #1C224F  https://dalat-vibe.vercel.app/
```
> 강릉페이 3카드(1·2·3)는 배열에서 인접 유지 → 갤러리에서 "한 프로젝트, 세 결과물"로 읽힘. iOS+Android 동시 배포가 핵심 성과(usePlatform 분기).
> 제거됨: Return Hound/SellerGuard(폐기), Table One·Ugl:Eat·치얼업(라이브 URL 없음), chuncheon-sri(제외), numer9-personal-ai(서비스 카드 하나로 통합).
> 확정 대기: numer9 accent 색만. 모르면 무채색(#8C8A82) 임시.
> thumbnail은 사용자가 채움(각 사이트 캡처 → public/thumbs/{id}.webp).
> 전부 liveUrl 보유 → 카드 클릭 = 새 탭. detail 작성 시에만 /work/:id 진입.

### 나머지 데이터
- `profile.js` name, headline("불편함을 먼저 읽고 다정한 해답을 내미는"), majors("디지털인문예술전공 · 스타트업비즈니스 복수전공"), photo(프로필 사진 경로), education[](연도·항목 타임라인, 사용자 제공 그대로), roles[](LUCID 위원장·전공대표 등 위치), awards[](전체 수록 + `tier` 필드: 'star'=헤드라이너 N9최우수상·포스터최우수상·원통시장총장상·강원디자인전람회협회장상 / 'normal'=나머지 2025·2026), activities[](전체 수록 + `tier`: 'star'=KDM+7기·LUCID위원장·전공대표·디인예입문멘토 / 'normal'=나머지. 2022 미디어스쿨 3건은 사용자 결정 — 제외 권장 또는 'faint' 티어), experience[](선택: 운영·연구 — AX전환·동해시과제·총회총괄 등. 코딩 사이트는 갤러리와 중복이라 제외), stats[](배포 10 등), contacts{email,github,instagram}.
  > About 렌더링: tier 'star'=paper 강조, 'normal'=기본, 'faint'=color.faint. 페이지엔 다 깔되 눈은 star에 꽂히게. 말로는 star만 뽑음.
- `journey.js` (Method) 차별점 비트 배열: 자기주도 독학(아무도 안 알려줌·AI한테 물으며 학습) / "AI는 누구나 결과를 낸다, 나는 한 겹 더 얹는다"(워크플로우 깊이=클로드코드·안티그래비티·하네스 + 결과물 디테일=여백·마진·일관성·UX 감각, 우열 아닌 레이어, 그래서 UX/UI 안 갈 사람도 배워둘 가치) / 하네스 방식(skill→MD→Claude→Claude Code 최적화·토큰 절약) / 기획력. 각 { label, title, body }. 톤: 동기 비하 금지, 비교 우위 아닌 추가 레이어로.
- `toolkit.js` ai[](각 { name, role, logo경로 }: Claude=다이어그램·문서·코딩, Gemini=구글 생태계, GPT=번역·코딩·이미지, Grok=브레인스토밍·초기리서치, NotebookLM=자료 텍스트 추출, Antigravity=코딩·파일관리, Figma=협업·컴포넌트), tips[](월구독만·쓰레드로 매일 추종·하나에 맹신 금지·Codex 솔직평가).
- `manifesto.js` 선언 문단 배열 + 교수님 전환 문장.
- `aiTimeline.js` AI 진화 5단계 배열. 각 { era, name, nameEn, oneLiner, example }. 대화형(2022~)/생성형(2023~)/코파일럿·도구결합(2024~)/에이전틱(2025)/멀티에이전트·검증(2026~). 출처 주석 유지.
