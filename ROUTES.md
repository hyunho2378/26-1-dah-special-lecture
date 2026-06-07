# ROUTES.md

> React Router v6. SPA. Vercel 배포 시 `vercel.json` rewrite로 fallback.

---

## 1. 라우트 테이블

| path | 컴포넌트 | 설명 |
|---|---|---|
| `/` | `HomePage` | 싱글 스크롤 내러티브 (Hero·Journey·Gallery·NowNext·Manifesto·Footer) |
| `/work/:id` | `WorkDetailPage` | 프로젝트 상세. `:id`는 projects.js의 id. 없는 id면 NotFound |
| `*` | `NotFoundPage` | 404 |

---

## 2. 구조

```jsx
// App.jsx
<BrowserRouter>
  <ScrollToTop />
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/work/:id" element={<WorkDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

- `Layout`은 Header + Footer + `<Outlet />`. Footer는 Home 내부 섹션과 중복되지 않게 Layout Footer 하나만 둔다(Home의 6번 Footer = Layout Footer).
- `ScrollToTop`: 라우트 변경 시 스크롤 최상단. 단 `/`로 복귀 시 갤러리 위치 복원이 필요하면 `location.state`로 처리(localStorage 금지).

---

## 3. 섹션 내비 (Home 내부, 무헤더)

라우트 아님. 헤더 없으므로 헤더 nav도 없음. `useFullpageNav`가 섹션 ref 배열로 방향키 점프. 섹션 id: `hero · about · ai-timeline · method · work · toolkit · manifesto`. SectionDots(선택)가 이 id로 이동.

---

## 4. 카드 클릭 분기

```
정면 활성 카드 클릭
 ├─ project.detail 존재 → navigate(`/work/${project.id}`)
 └─ 없고 project.liveUrl 존재 → window.open(liveUrl, '_blank', 'noopener')
```

비활성(측면) 카드는 클릭 시 해당 카드를 중앙으로 회전만(진입 아님).

---

## 5. vercel.json

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

Vercel Root Directory는 `client`(또는 레포 루트, STEP 0에서 확정). Build `npm run build`, Output `dist`.
