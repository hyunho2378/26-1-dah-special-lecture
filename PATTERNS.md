# PATTERNS.md

> 반복 패턴 고정. 임의 변형 금지. 색·간격·폰트·3D값은 tokens.js에서만.

---

## 1. 섹션 리듬 (전 섹션 공통)

```
[SectionLabel: 모노 대문자 + 좌측 라인]
   ↓ space.4
[디스플레이 헤드라인 (type.h2)]
   ↓ space.6
[본문 / 콘텐츠]
```
- 섹션 상하 패딩: 모바일 space.16(64px) / 데스크탑 space.24(96px).
- 섹션 좌우: layout.pagePadX.
- 진입 시 useReveal로 opacity 0→1 + translateY 16px→0 (translateZ/scale 아님). stagger 60ms.

---

## 2. 모노 라벨 패턴

`SectionLabel`: `WORK` 처럼 영문 대문자, type.label(JetBrains Mono, ls 0.14em), color.muted. 앞에 24px 라인(color.line). 코딩 정체성 시각 신호.

---

## 3. 카드 호버·활성 (scale 금지)

- 비활성 카드: opacity 0.7, 캡션 muted.
- 정면 활성 카드: opacity 1, 1px 보더 color.line, 캡션 paper, accent 점 표시, cursor pointer.
- 전환: opacity·border·color만 200ms. **transform: scale 절대 금지**(AGENTS).

---

## 4. 3D 코버플로우 변환 수학 (gradientslider 이식, scale 제거판)

각 카드의 화면상 X(`screenX`, 중앙=0 기준 ±)로부터 transform 계산. 원본 `transformForScreenX` 이식하되 scale 항 삭제.

```
// 정규화 진행도 (중앙에서 멀어질수록 |p| 증가)
const half = VW_HALF                      // window.innerWidth * 0.5
const p = clamp(screenX / half, -1, 1)    // -1 ~ 1

// rotateY: 중앙 0, 양옆으로 갈수록 안쪽으로 꺾임
const ry = -p * carousel.maxRotation      // deg

// translateZ: 중앙 0, 멀수록 뒤로 후퇴
const tz = -Math.abs(p) * carousel.maxDepth  // px (음수)

// 최종 — scale 없음
el.style.transform =
  `translate3d(${screenX}px, -50%, ${tz}px) rotateY(${ry}deg)`
```
- 중앙(screenX≈0): ry 0, tz 0 → 정면·정자세·최전면.
- z-index 또는 DOM 순서로 중앙 카드가 위에 오게(원근상 자동이지만 보정).
- 원근 축소는 perspective(1800px)가 tz에 따라 자동 처리. 그래서 scale 불필요.

---

## 5. 무한 래핑 패턴

```
// 원본 mod: 음수 대응 모듈로
function mod(n, m) { return ((n % m) + m) % m }

// 각 카드 위치 = (기준 + index*STEP - SCROLL_X) 를 TRACK으로 래핑해
// 화면 중앙 기준 ±half 범위로 재배치. 트랙 양끝이 이어져 무한 스크롤.
```
STEP = cardWidth + gap, TRACK = STEP * count. 화면 밖 카드는 반대편으로 순환.

---

## 6. 물리 (드래그·휠·관성)

```
// 입력
wheel:        SCROLL_X += deltaX/Y * carousel.wheelSens
pointer drag: SCROLL_X += dx * carousel.dragSens, vX = dx
// 관성 (rAF tick)
vX *= carousel.friction        // 매 프레임 감쇠
if (!dragging) SCROLL_X += vX
// idle 자동 회전
if (!dragging && |vX| < 0.05) SCROLL_X += carousel.autoRotate
```
hover/drag 중 autoRotate 정지. friction 0.9로 부드러운 감속.

---

## 7. 클릭 진입 분기 (GallerySection)

```
onSelect(project):
  if (project.detail) navigate(`/work/${project.id}`)
  else if (project.liveUrl) window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
```
정면 카드만 onClick 활성. 측면 카드 클릭 → focusCard(i)로 중앙 회전(진입 아님).

---

## 8. 빈/대체 상태

- 썸네일 미입력: color.surface2 박스 + 프로젝트명 텍스트 placeholder(이미지 깨짐 노출 금지).
- liveUrl·detail 둘 다 없음: 카드 클릭 비활성, cursor default.
- WorkDetail 잘못된 id: NotFound로.

---

## 9. 반응형 분기

- 캐러셀 cardWidth `min(38vw, 520px)`로 자동 축소. 모바일은 maxDepth·gap 비례 축소(`window.innerWidth < md` 시 maxDepth 0.7배).
- 320px: 가로 스크롤·잘림 없음. 카드 1.x장 보이게.
- 768px↑: pagePadX 40, 1280px↑: 64.
- 터치: pointer 이벤트로 드래그 통합(touchstart 별도 분기 불필요, pointer-events 사용).
