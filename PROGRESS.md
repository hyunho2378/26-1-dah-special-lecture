# PROGRESS.md

> 진행 상태 추적. 컨텍스트 85% 도달 시 즉시 갱신하고 대기(AGENTS.md).
> 상태 표기: [ ] 대기 / [~] 진행중 / [x] 완료 / [!] 버그 / [-] 보류

---

## 현재 단계: WhyClaudeCode 포지셔닝 맵 리빌드 완료

---

## PHASE 0 — 부트스트랩 (STEP 0)
- [ ] Vite + React 18 초기화
- [ ] Tailwind + PostCSS 설정
- [ ] react-router-dom v6, lucide-react 설치
- [ ] 폰트 CDN 연결 (Space Grotesk / Pretendard / JetBrains Mono)
- [ ] tokens.js 배치 (제공본 그대로)
- [ ] CLAUDE.md / AGENTS.md / DESIGN.md / IA.md / ROUTES.md / COMPONENTS.md / PATTERNS.md / PROGRESS.md 배치
- [ ] 폴더 구조 생성 (COMPONENTS.md 기준)
- [ ] vercel.json SPA fallback
- [ ] index.css 전역 초기화 + 토큰 CSS 변수 브리지
- [ ] App.jsx 라우터 골격 (빈 페이지로 라우팅만 확인)

## PHASE 1 — 레이아웃 셸 (STEP 1) — 무헤더 풀페이지
- [x] Layout.jsx (헤더 없음: Outlet + Footer + useFullpageNav 장착)
- [x] lib/useFullpageNav.js (↓/PageDown/Space·↑/PageUp 섹션 점프, data-trap-wheel 휠 트랩, 긴섹션·경계 네이티브 허용, reduced-motion instant, 라우트 변경 시 재감지)
- [x] Footer.jsx (profile.contacts, 모바일 column. GitHub/Instagram inline SVG)
- [x] ScrollToTop.jsx (라우트 변경 시 top, 해시 예외)
- [x] SectionDots.jsx (우측 도트, 모바일 숨김, 클릭 이동)
- [x] HomePage 7섹션 placeholder (hero·about·ai-timeline·method·work[trap]·toolkit·manifesto, 각 100vh, scroll-snap-align start)
- [x] index.css scroll-snap-type y proximity
- [x] data/profile.js (사용자 작성 완료)
- 비고: Header.jsx 제거(무헤더 전환). 헤더 nav → useFullpageNav + SectionDots로 대체.

## PHASE 2 — 캐러셀 엔진 (STEP 2) ★ 최난도
- [x] lib/useCarousel3D.js (gradientslider 이식, scale 제거, 그래디언트/GSAP 제외. mod 무한래핑·friction 관성·wheel/pointer 드래그·focusCard·autoRotate·cleanup)
- [x] Carousel3D.jsx (.stage perspective/.cards preserve-3d 구조, transform 구동, data-trap-wheel)
- [x] Card3D.jsx (16/10, transform-origin 90% center, 캡션, isActive opacity1·보더·점 / else 0.6, backface-hidden)
- [x] 드래그·휠·관성·무한래핑 동작 확인 (HomePage work 섹션 더미 8장으로 마운트. 브라우저 실측은 사용자 권장)
- [x] prefers-reduced-motion 분기 (autoRotate 0)
- [x] transform에 scale 없음 확인(grep — 실제 scale() 변형 없음, 매칭은 주석뿐)
- 비고: 휠 충돌 — useCarousel3D가 stage wheel preventDefault + work 섹션 data-trap-wheel → useFullpageNav 섹션 점프 차단. 더미는 picsum(onError 시 surface2 placeholder). PHASE 3에서 GallerySection+projects.js로 교체.

## PHASE 3 — 데이터 연결 + 클릭 진입 (STEP 3)
- [x] data/projects.js (확정 10항목 그대로. id/title/role/accent/thumbnail(/thumbs/{id}.webp)/liveUrl. 강릉페이 3카드 인접)
- [x] GallerySection.jsx (SectionLabel + 헤드라인 + Carousel3D + 안내. id=work, data-trap-wheel)
- [x] 정면 카드 클릭 → liveUrl 새탭(noopener) / 측면 카드 → focusCard 회전 (detail 미사용: 전 항목 liveUrl 보유)
- [x] 썸네일 placeholder 대체 상태 (thumbs 미입력 → Card3D onError → surface2 + 프로젝트명)
- 비고: HomePage work 더미 제거 → GallerySection 연결. ui/SectionLabel.jsx 선행 생성(PHASE 4 항목). numer9 accent 무채색 임시.

## PHASE 4 — Hero·About + 공통 ui (STEP 4)
- [x] lib/useReveal.js (opacity+translateY16, IntersectionObserver, reduced-motion 즉시)
- [x] lib/useCountUp.js (뷰포트 진입 0→target easeOutCubic, reduced-motion 즉시)
- [x] ui: SectionLabel(accent 라인)·Stat(카운트업)·Button(scale 금지)·Tag·PageTransition
- [x] HeroSection.jsx (HO 로고+폴백 + headline 2줄 + name/majors + 프로필 사진. id=hero)
- [x] AboutSection.jsx (education/roles/awards/activities 전체 tier별 강조 + Stat 3. id=about)
- 비고: tokens.accent 사용자 갱신(핑크 #E27DA6)으로 tier 강조 동작. tier star=accent(핑크)/normal=paper/faint=faint. AITimeline·Method는 PHASE 5 placeholder 유지. 추가 카피 없음(EDUCATION 등은 구조 라벨).

## PHASE 5 — 하단 섹션 (STEP 5)
- [x] AITimelineSection.jsx (aiTimeline.js: hook h1크게 + 5단계 가로 타임라인 + takeaway h2크게. 모바일 세로/데스크탑 가로. 단계별 faint→accent 순차 reveal)
- [x] MethodSection.jsx (journey.js: 4비트 label+title. 01+02 2열 그리드, 03 전폭+하네스 다이어그램(inline SVG 화살표), 04 전폭. stagger reveal)
- [x] ToolkitSection.jsx (toolkit.js: 7 AI 카드 grid(3→4→7col) + logo onError폴백 + tips 3개 h3 크게)
- [x] ManifestoSection.jsx (manifesto.js: lines 2개 muted→paper + punchline h1 accent핑크 + transition 모노 small)
- [x] 섹션 reveal 리듬 통일 (전 섹션 useReveal stagger, PATTERNS §1 패딩 일관)

## PHASE 6 — 상세 + 마무리 (STEP 6)
- [x] WorkDetailPage.jsx (/work/:id: BackLink+썸네일+accent점+제목+라이브버튼. 없는 id→NotFoundPage 렌더)
- [x] NotFoundPage.jsx (404 + 홈버튼 ghost)
- [x] PageTransition (이미 완료 PHASE 4)

## PHASE 7 — QA + 배포 (STEP 7)
- [-] 320/390/768/1024/1280/1920 전 구간 레이아웃 (코드 반응형 확인. 브라우저 실측은 사용자 권장)
- [x] 접근성: img alt ✓ / aria-label ✓ / aria-hidden ✓ / focus-visible accent 링(global CSS) ✓ / reduced-motion ✓
- [-] 캐러셀 터치 기기 동작 (pointer 이벤트 이식. 기기 실측은 사용자 권장)
- [x] AGENTS 금지항목 grep 0건 (TS·scale·localStorage·sessionStorage·하드코딩 HEX·이모지 — build 포함 모두 통과)
- [-] Lighthouse 90+ (브라우저 실측 필요)
- [x] vercel.json SPA fallback 확인 ✓
- [x] 라이센스 크레딧 주석 삽입 (useCarousel3D.js: Clément Grellier / Codrops, MIT)
- [-] Vercel 배포 (사용자 직접 진행)

---

## 결정 로그 (ADR)
| 결정 | 이유 |
|---|---|
| 색 모노크롬, 개인 액센트 없음 | 14 썸네일이 색을 다 가짐. 크롬이 색 더하면 충돌 |
| 캐러셀 scale 제거 | AGENTS transform:scale 금지 + perspective가 원근축소 자동 |
| 그래디언트/캔버스/GSAP 미이식 | 다크+단일톤 브랜드와 충돌, 강의 안정성 우선 |
| 카드 16/10 가로 | 웹사이트 스샷이 가로라 4/5 세로는 잘림 |
| 싱글스크롤 + /work/:id | 강의 = 스크롤 흐름, 상세는 라우트 |

## 이슈 로그
| 날짜 | 이슈 | 상태 |
|---|---|---|
| 2026-06-08 | profile.contacts 값이 placeholder("이메일 채우기" 등) → Footer 링크 비활성(비링크 텍스트로 표시). 실제 값 입력 필요 | 대기 |
| 2026-06-08 | lucide-react 브랜드 아이콘(Github/Instagram) 미제공 → inline SVG로 대체 | 해결 |
| 2026-06-08 | DESIGN.md(ink #181818·accent 핑크 #E27DA6)와 tokens.js(ink #0B0B0B·accent #F2F0EB) 충돌 → 사용자가 tokens.js 갱신(ink #181818·accent 핑크)으로 해소 | 해결 |
| 2026-06-08 | tier 색: COMPONENTS §7 노트(star=paper)는 구버전 → 과제+DESIGN(강조텍스트=핑크) 따라 star=accent(핑크) 적용 | 해결 |
| 2026-06-08 | projects: numer9 accent 미확정(#8C8A82 임시), teapot-418 liveUrl이 잘린 듯한 형태(...poster-competit) → 실제 배포 URL 확인 필요 | 대기 |
| 2026-06-08 | projects: axiom 1카드 → 2카드 분리(axiom + axiom-folio). 총 10→11개. axiom-folio 썸네일 /thumbs/axiom-folio.webp 추가 필요 | 완료(썸네일 대기) |
| 2026-06-08 | HeroSection Photo img: Tailwind h-full/w-full → inline style (width/height 100% + objectFit cover + aspectRatio 4/5) 명시. 찌그러짐 방지 | 완료 |
| 2026-06-08 | HeroSection Photo 컨테이너 maxWidth 360px 추가. 과확대 → 픽셀처럼 보이는 문제 차단 | 완료 |
| 2026-06-08 | HeroSection Photo 재수정: 컨테이너 aspect-ratio 제거(maxWidth:420px만 유지), img height:auto + objectFit/aspectRatio 제거 → 원본 비율 그대로 강제크롭 없음. 폴백만 4/5 유지 | 완료 |
| 2026-06-08 | AboutSection: stats 블록 제거, tier 강조 제거(동일 text-paper 스타일), 연도 내림차순 정렬 적용. Stat 임포트 제거. profile.js stats 배열 비움 | 완료 |
| 2026-06-08 | toolkit.js: ai 배열 Claude 다음에 Claude Code { role: 에이전틱 코딩, logo: /logos/claudecode.svg } 추가. 총 7→8개. 로고 파일 추가 필요 | 완료(로고 대기) |
| 2026-06-08 | 전역 디자인 통일: 폰트 Pretendard 단일(display/body/mono 전부). 색 paper=#FFFFFF / muted=rgba(255,255,255,0.6) / faint=rgba(255,255,255,0.4) / line rgba 255 기반. scroll-snap 제거. SectionLabel 핑크선 제거 + eyebrow(0.5 opacity, tracking-[0.16em]). Google Fonts CDN 제거. | 완료 |
| 2026-06-08 | Hero: HO 로고 대형(clamp 80~200px / 폴백 type.hero 텍스트). 헤드라인 "기술의 흐름 위에서, 사람의 방향으로". name·majors type.small 하단. profile.js headline 교체. | 완료 |
| 2026-06-08 | AITimeline: stages 영문 UX용어 5단계(Conversational/Generative/Tool-Use/Agentic/Multi-Agent & Verification). oneLiner 삭제. 2026만 accent. takeaway border-t 제거. | 완료 |
| 2026-06-08 | About 리뉴얼: profile.js에 experience 배열 추가(2026 7개·2025 12개). AboutSection 좌(EDUCATION+ROLES)·우(AWARDS+ACTIVITIES+EXPERIENCE) 2열. 각 그룹 PREVIEW=4 접기/더보기 텍스트 버튼. tier 강조 없음, 전 항목 동일 위계. 연도 내림차순. | 완료 |
| 2026-06-08 | Method: journey.js 라벨 영문(01 SELF-TAUGHT / 02 ONE MORE LAYER / 03 HARNESS / 04 PLANNING). MethodSection 3분할 그리드 박스: [01][02][03+04 세로스택] 3열. 각 BeatBox border-line 보더+p-8. 하네스 flex-wrap 수평 흐름. 핑크 선 장식 제거. | 완료 |
| 2026-06-08 | Toolkit: 아이콘 88×88px 박스 + 60×60px 이미지로 대형화. 3열(모바일)·4열(sm+) 그리드. tips 3개 → SURVIVAL KIT eyebrow + 3분할 border 카드(p-8, 중앙 정렬). 상단 border-t 라인 제거. | 완료 |
| 2026-06-08 | 갤러리 클릭 수정: useCarousel3D에서 setPointerCapture 제거(포인터 캡처가 카드 click 이벤트 차단하던 원인). window에 pointermove/pointerup 리스너 부착. didDrag ref(이동 5px 초과 시 true)를 Carousel3D에 노출. onClick에서 didDrag.current 가드 → 드래그 후 오클릭 방지 + 실제 클릭 시 window.open 정상 동작. | 완료 |
| 2026-06-08 | 신규 섹션 데이터 파일 3개 생성: onboarding.js(AX TRANSFORMATION) / planning.js(PLANNING & STARTUP) / whyClaudeCode.js(WHY CLAUDE CODE). 각 { eyebrow, title, lead, points[] } 구조. 컴포넌트는 다음 STEP. | 완료 |
| 2026-06-08 | 신규 섹션 컴포넌트 3개 생성: OnboardingSection(id=onboarding) / PlanningSection(id=planning) / WhyClaudeCodeSection(id=why-claude-code). 공통 구조: SectionLabel(eyebrow) + h1(title) + lead(muted) + 3열 border 포인트 카드. useReveal stagger. | 완료 |
| 2026-06-08 | HomePage 11섹션 재배치: hero → about → onboarding → ai-timeline → planning → method → why-claude-code → work → toolkit → manifesto. | 완료 |
| 2026-06-08 | survival.js 신규 생성: survival(eyebrow/title/4points) + designerFuture(eyebrow/title/lead/3points). SurvivalSection(id=survival, 4열 카드) + DesignerFutureSection(id=designer-future, 3열 카드) 생성. ManifestoSection transition 블록 제거 + manifesto.js transition 필드 제거. HomePage 12섹션 최종 배치: hero → about → onboarding → ai-timeline → planning → method → why-claude-code → work → toolkit → survival → designer-future → manifesto. | 완료 |
| 2026-06-08 | 섹션 패딩: 전 섹션 py-16 md:py-24 → py-24(96px 균일). 헤드라인 크기: type.h1.size clamp(32px,5vw,56px) → clamp(40px,6vw,64px). 색 전수 정리: tokens.color에서 surface/#1F1F1F, surface2/#262626, faint/0.4, lineSoft/0.06, accentSoft 제거. muted 0.6→0.8. SectionLabel 0.5→0.8. AITimeline STAGE_COLORS muted→paper. text-faint 전부 text-muted/text-paper 교체. surface2 사용처(HeroSection/MethodSection/ToolkitSection/Card3D/WorkDetailPage) → bg-ink/color.ink. 잔존 HEX grep 0건 확인. | 완료 |
| 2026-06-08 | HeroSection 타이포 정비: 로고↔헤드라인 mt-6→mt-12(48px). 헤드라인 lineHeight 1.05→1.3. name mt-8→mt-10, fontSize type.small→type.h2(clamp 24~40px), fontWeight 700. majors fontSize type.small→type.h3(clamp 20~28px). nameEn 분리 제거, name 단독 표시. text-muted→text-paper 전부 교체. | 완료 |
| 2026-06-08 | 특강 발표용 카피 교체(데이터만): planning(title→기획력의 시대, points 3개 명사형 교체), onboarding(title→전공 온보딩 재설계, points 3개 교체), whyClaudeCode(title→도구의 깊이, points 3개 교체), survival(title→AI 시대 생존법, points 4개 교체), designerFuture(title→더 중요해지는 자리, points 3개 교체). 전 points 마침표 없음. lead 완결 문장 마침표 유지. | 완료 |
| 2026-06-08 | 전역 여백·정렬·방향키 통일: index.css .sec 클래스 추가(padding-top/bottom 128px, 좌우 clamp(16px,3.125vw,64px)). 12개 섹션 파일 px-4 py-24 md:px-10 xl:px-16 → sec 일괄 교체(잔존 0건 확인). SectionLabel font-sans→font-body, 12px→14px, fontWeight 700 추가. useFullpageNav 방향키 scrollBy → goTo(currentIndex±1)로 교체(섹션 상단 정렬 보장). goTo를 useEffect deps에 추가. | 완료 |
| 2026-06-08 | 갤러리 클릭 1차 수정: movedTotal 누적합 → onUp Euclidean 거리(Math.hypot) 교체. dist < 6px = 클릭, dist >= 6px = 드래그. GallerySection 안내문 삭제. GallerySection onSelect: window.open → 앵커 생성+.click() 방식(팝업 차단 우회). | 완료 |
| 2026-06-08 | 갤러리 클릭 2차 수정: 근본 원인 추가 발견 — 비활성 카드가 pointer-events:auto(기본값)여서 transform-style:preserve-3d 3D 히트 테스트 환경에서 stage cursor(grab)가 활성 카드 위에 표시되고 click이 차단됨. Card3D: 활성 카드 pointerEvents:'auto', 비활성 카드 pointerEvents:'none' 인라인 스타일 추가. drag는 stage pointerdown이 처리하므로 기능 영향 없음. 임시 콘솔 로그: useCarousel3D.onUp(dist/didDrag), Carousel3D.onClick(i/active/didDrag), GallerySection.onSelect(liveUrl) — 확인 후 제거 필요. | 완료(로그 제거 대기) |
| 2026-06-08 | SurvivalSection: lucide-react CalendarX/Rss/Layers/Zap 아이콘 및 ICON 맵 제거. Rule 컴포넌트 레이아웃 → 번호(accent)+영문(굵게)+한글(muted) 3요소만. .sec/min-height:100vh·"flex flex-col justify-center sec" 이미 적용돼 있어 CSS 변경 없음. | 완료 |
| 2026-06-08 | SectionLabel 위계 수정: tokens.js type.label size clamp(15~22px)→14px 고정, weight 800→700, ls 0.12em→0.16em. SectionLabel.jsx는 토큰 참조라 자동 반영. AITimelineSection 데스크탑 노드 확대: 도트 12px→20px(hover 28px), era 텍스트 text-xs→18px, 단계명 text-sm→clamp(18px,1.6vw,26px). hover 인터랙션(onMouseEnter/Leave state): 도트 width/height transition 200ms, 단계명 color→accent transition 200ms. 2026 노드는 기본 accent 유지. 연결선 top 34px→44px(era 22px + mb 12px + 도트반경 10px). transform:scale 미사용. | 완료 |
| 2026-06-08 | HeroSection HO 로고 중앙→좌측정렬: img margin:'0 auto' 제거, 폴백 div text-center 제거, h1 text-center/md:text-left→정렬 클래스 제거, name/majors 컨테이너 text-center/md:text-left 제거. index.html 파비콘: /favicon.svg→/logo-ho.svg. SVG 로고 검수: claude·claudecode·gemini·gpt·figma·grok 정상 확인. 의심 파일: hermes.svg(만화 벌레 형태), openclo.svg(만화 캐릭터 형태), antigravity.svg(와이파이 아이콘 형태). notebooklm.svg 2.3MB 초과로 읽기 불가. 교체는 사용자 공식 파일 수령 후 진행 보류. | 완료 |
| 2026-06-08 | onboarding.js 데이터 교체: eyebrow "AI & DESIGN" / title "AI 시대, 디자인 업계의 지금" / lead·nodes 3개 교체(AI AT THE CENTER / ADAPT OR FALL / VISUAL TO UX). AITimelineSection: 헤드라인↔타임라인 마진 mt-14→mt-32(모바일 mt-10→mt-32). 단계명 fontSize clamp(18~26px)→clamp(20~28px). 결론 박스 padding 28px 40px→20px 28px, 텍스트 type.h2.size→clamp(18px,1.6vw,26px). journey.js harnessFlow: '토큰 절약' 항목 제거(4개→3개). | 완료 |
| 2026-06-08 | whyClaudeCode.js tools 배열 교체: Google AI Studio·Gemini·ChatGPT·Claude Code(mine·glow)·Cursor(primary·glow)·Antigravity(mine·glow)·Codex(primary) 7개. WhyClaudeCodeSection SVG 리빌드: viewBox 800×460→1200×620, maxWidth 980→1400px, VX/VY 범위 확장([90~710]→[100~1100]). SVG defs feGaussianBlur(stdDeviation 10) glow 필터. CSS @keyframes glowPulse(opacity 0.3→0.85, 2.6s) + className tool-glow + animationDelay i*0.7s 스태거. accent 노드(mine||primary) r 6→10, fontSize 14→18px bold. 라벨 x>0.5 이면 점 왼쪽(겹침 방지). transform:scale 미사용. | 완료 |
| 2026-06-08 | 자유 스크롤 전환: useFullpageNav 재작성(onWheel·lockRef·lockTimer 전부 제거). 방향키/PageDown/Space = window.scrollBy 한 화면(강제 섹션 정렬 없음). 갤러리 data-trap-wheel은 useCarousel3D가 독립 처리. goTo는 SectionDots 클릭 전용 유지. 전 섹션(7개) min-h-screen 제거 → 내용 길이대로 자연 흐름. index.css scroll-snap 이미 없음 확인. | 완료 |
| 2026-06-08 | ToolkitSection SURVIVAL KIT 블록 삭제: TipCard 컴포넌트 전체·SURVIVAL KIT div 블록 제거. AI 로고 그리드만 유지. 관련 import(type, layout) 잔존은 AICard에서 사용 중이라 유지. | 완료 |
| 2026-06-08 | portrait 카드 이미지 잘림 수정: Card3D.jsx img className에 isPortrait 분기(object-contain / object-cover) + portrait 시 backgroundColor:color.ink 적용. index.css .stage height 68vh → min(72vh, 640px). | 완료 |
| 2026-06-08 | MethodSection lucide 아이콘 제거: import에서 BookOpen·Layers·GitBranch 삭제(ArrowRight는 Flow에서 사용 중 유지). const ICON 맵 삭제. Beat 컴포넌트에서 Icon 할당 및 <Icon> 렌더 제거. journey.js harnessFlow '토큰 절약' 이미 제거됨(이전 세션) 확인. | 완료 |
| 2026-06-08 | OnboardingSection 레이아웃 재설계: 아이콘·ICON 맵 제거. 각 노드 border 카드에 대형 배경 번호(accent, opacity 0.08, clamp 110~180px, absolute 우하단) 장식. 노드 간 연결선 connector element(color.line)를 map 외부 배열로 구성(Fragment key 회피). 모바일 세로/데스크탑 가로 플로우 유지. | 완료 |
| 2026-06-08 | DesignerFutureSection 레이아웃 완전 재설계: 가로 카드+화살표 → 세로 타임라인. 왼쪽 accent 세로선(opacity 0.25)+도트(12px 원, accent). 오른쪽 SectionLabel(en)+h3(ko). 단계 간격 paddingBottom 72px. 마지막 단계 선 없음. 모든 아이콘(ShieldAlert·Sparkles·Crown·ArrowRight) 제거. maxWidth 640px 컨테이너. | 완료 |
| 2026-06-08 | AboutSection accent 강조 7항목: profile.js에 accent:true 필드 추가(roles 2개, activities 1개, experience 4개). AboutSection Row 컴포넌트 color.accent/color.paper 인라인 분기 적용. tokens.js color import 추가. 하드코딩 없음. | 완료 |
| 2026-06-08 | lucide-react 전수 제거: AITimelineSection(ArrowDown import+렌더), MethodSection(ArrowRight import+렌더+미사용 i 파라미터), PlanningSection(Shuffle·Lightbulb·Rocket import+ICON맵+Icon 할당+렌더) 완전 제거. grep -r "lucide-react" src/components/ 결과 Footer.jsx 단독 확인. | 완료 |
| 2026-06-08 | designerFuture 데이터 교체: title '디자이너가 쥐어야 할 것', lead 도구 평준화·감각 차별화, steps 3개(DEFINE/JUDGE/DIRECT). icon 필드 유지. 레이아웃 변경 없음. | 완료 |
| 2026-06-08 | 가로 스크롤 차단: index.css html,body에 overflow-x:hidden + max-width:100% 추가. .stage에 overflow:hidden 추가(캐러셀 카드 absolute 배치가 페이지 가로 넓힘 방지). 세로 스크롤·휠 캐러셀·방향키 동작 영향 없음. | 완료 |
| 2026-06-08 | MethodSection 구조 재설계: 1행 01·02 md:grid-cols-2, 2행 03 풀폭 HarnessCard. HarnessCard = SectionLabel+제목+하네스 설명 문단+흐름 칩(4단계·→화살표)+MD원본 아코디언(7개). client/src/data/docs/에 CLAUDE·AGENTS·DESIGN·COMPONENTS·IA·ROUTES·PATTERNS.md 복사, Vite ?raw import로 원문 그대로 <pre> 렌더. overflow-x:auto로 박스 내부 가로 스크롤 처리. PlanningSection lucide 이미 제거됨 확인. | 완료 |
| 2026-06-08 | MethodSection MD 아코디언 제거: data/docs/ 폴더 삭제. MethodSection.jsx에서 ?raw import 전부·useState·DOCS const·DocItem 컴포넌트 제거. HarnessCard에 하네스 설명 문단+흐름 칩(4단계)만 유지. | 완료 |
| 2026-06-08 | Footer 삭제: Layout.jsx에서 Footer import·렌더 제거. Footer.jsx 파일 삭제. Footer 참조 잔존 없음 확인(profile.js의 contacts 데이터 필드는 건드리지 않음). | 완료 |
| 2026-06-08 | WhyClaudeCode 축 라벨 한글화: whyClaudeCode.js axis.x ['Fast Result','Fine Control']→['빠른 결과','정교한 제어'], axis.y ['Beginner-Friendly','Heavy Dev']→['입문자 친화','헤비 개발']. WhyClaudeCodeSection.jsx 코드 변경 없음(데이터만). | 완료 |
| 2026-06-08 | journey.js method[2] 수정: label '03 HARNESS'→'03 WORKFLOW', title '직접 명령하지 않는 법'→'환경을 설계하는 법', detail 필드 추가(3단계 \n 구분 텍스트). MethodSection.jsx Beat·HarnessCard 모두 beat.detail \n→<br/> 변환 렌더로 통일. 하드코딩 설명 문단 제거. | 완료 |
| 2026-06-08 | F키 전체화면 토글: Layout.jsx에 useEffect keydown 핸들러 추가. F/f 키 → fullscreenElement 있으면 exitFullscreen, 없으면 documentElement.requestFullscreen. cleanup 제거. UI 힌트 없음. | 완료 |
| 2026-06-08 | 새 탭 중복 열림 수정: Carousel3D.jsx open()에서 anchor 생성·클릭 코드 제거, onSelect?.(p) 만 유지. 새 탭 열기는 GallerySection.onSelect 단일 경로로 처리. | 완료 |
