// projects.js — 갤러리 11개 (COMPONENTS.md "7. 데이터" 확정본 그대로. 왜곡·축소 금지).
// 필드: id, title, role, accent(프로젝트 고유색), thumbnail, liveUrl. 전부 liveUrl 보유 → 카드 클릭 = 새 탭.
// 강릉페이 3카드(1·2·3) 인접 유지. numer9 accent 미확정 → 무채색 임시(#8C8A82).
export const projects = [
  { id: 'gangneung-pay-ios', title: '강릉페이 (iOS)', role: '지역화폐 앱 · iOS', accent: '#1D4ED8', ratio: 'portrait', thumbnail: '/thumbs/gangneung-pay-ios.webp', liveUrl: 'https://gangneung-pay.vercel.app/' },
  { id: 'gangneung-pay-and', title: '강릉페이 (Android)', role: '지역화폐 앱 · Android', accent: '#1D4ED8', ratio: 'portrait', thumbnail: '/thumbs/gangneung-pay-and.webp', liveUrl: 'https://gangneung-pay-android.vercel.app/' },
  { id: 'gangneung-pay-folio', title: '강릉페이 UX 개선 포트폴리오', role: '프로젝트 포트폴리오 웹사이트', accent: '#1D4ED8', thumbnail: '/thumbs/gangneung-pay-folio.webp', liveUrl: 'https://gangneung-pay-ux-project.vercel.app/' },
  { id: 'numer9', title: '디지털 소외 시니어를 위한 AI 무간섭 서비스 디자인', role: '후평동 상권 활성화 프로젝트', accent: '#02C75A', thumbnail: '/thumbs/numer9.webp', liveUrl: 'https://numer9-personal-ai.vercel.app/' },
  { id: 'axiom', title: 'AXIOM', role: '하이엔드 뷰티 큐레이션 (3D)', accent: '#C9A227', thumbnail: '/thumbs/axiom.webp', liveUrl: 'https://project-axiom-puce.vercel.app/' },
  { id: 'axiom-folio', title: 'AXIOM 포트폴리오', role: '프로젝트 웹사이트', accent: '#C9A227', thumbnail: '/thumbs/axiom-folio.webp', liveUrl: 'https://project-axiom-web.vercel.app/' },
  { id: 'dah-exhibition', title: 'Against the Flow', role: '26-1 전공 프로젝트 전시회', accent: '#F5C518', thumbnail: '/thumbs/dah-exhibition.webp', liveUrl: 'https://26-1-dah-exhibition.vercel.app/' },
  { id: 'teapot-418', title: "418: I'M A TEAPOT", role: '전공 프로젝트 전시회 포스터 공모전 큐레이션', accent: '#C8E63C', thumbnail: '/thumbs/teapot-418.webp', liveUrl: 'https://26-1-dah-exhibition-poster-competit.vercel.app/' },
  { id: 'dah-character', title: '디인예 캐릭터 공모전', role: '전공 신규 캐릭터 공모전', accent: '#E27DA6', thumbnail: '/thumbs/dah-character.webp', liveUrl: 'https://dah-new-character-contest.vercel.app/' },
  { id: 'lucid-link', title: 'LUCID 링크페이지', role: '전공 위원회 링크트리', accent: '#E27DA6', ratio: 'portrait', thumbnail: '/thumbs/lucid-link.webp', liveUrl: 'https://dah-lucid-site.vercel.app/' },
  { id: 'dalat-vibe', title: 'Dalat Vibe', role: '날씨 API 기반 여행 큐레이션 웹', accent: '#1C224F', thumbnail: '/thumbs/dalat-vibe.webp', liveUrl: 'https://dalat-vibe.vercel.app/' },
]

export default projects
