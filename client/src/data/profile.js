// profile.js — Hero / About / Footer (화면용)
// About tier: 'star'=핑크 강조, 'normal'=기본, 'faint'=흐림
// 페이지엔 다 깔되 눈은 star에. 긴 자기소개 문장은 화면 최소(말로).

export const profile = {
    name: "주현호 (UX Designer)",
    nameEn: "JU HYUNHO",
    role: "UX · Service Experience Designer",
    headline: ["기술의 흐름 위에서, 사람의 방향으로"],
    majors: "디지털인문예술전공 / 스타트업비즈니스전공",
    photo: "/profile.webp",   // 사용자 교체
    logo: "/logo-ho.svg",    // Hero 상단 HO 마크 (핑크), 사용자 교체

    stats: [],

    // 디인예 내 위치 (전부 star)
    roles: [
        { year: "2026", text: "제1대 디지털인문예술전공 운영위원회 LUCID 위원장", tier: "star", accent: true },
        { year: "2026", text: "디지털인문예술전공 전공 대표", tier: "star", accent: true },
        { year: "2026", text: "26-1 디지털인문예술입문 교과목 멘토", tier: "star" },
    ],

    awards: [
        { year: "2026", text: "지역사회 문제해결 PBL 경진대회 'N9 HAIR SALON 예약 시스템' 최우수상", note: "매출 증가 · 예약 활성화 실제 성과", tier: "star" },
        { year: "2026", text: "디지털인문예술전공 프로젝트 전시회 포스터 공모전 최우수상", tier: "star" },
        { year: "2025", text: "제17회 디지털인문예술전공 프로젝트 전시회 '디자인씽킹기초' 최우수상", tier: "star" },
        { year: "2025", text: "제4회 강원디자인전람회 강원디자인랩 플랫폼 리디자인 협회장상", tier: "star" },
        { year: "2026", text: "제18회 디지털인문예술전공 프로젝트 전시회 'UX디자인' 우수상", tier: "normal" },
        { year: "2026", text: "제18회 디지털인문예술전공 프로젝트 전시회 '디인예 전공 동아리' 우수상", tier: "normal" },
        { year: "2026", text: "지역사회 문제해결 PBL 경진대회 '강릉 로컬 결제 경험 개선' 우수상", tier: "normal" },
        { year: "2025", text: "제4회 강원디자인전람회 강원디자인랩 CI 디자인 입선", tier: "normal" },
        { year: "2025", text: "제4회 강원디자인전람회 강원디자인랩 리플렛 디자인 입선", tier: "normal" },
        { year: "2025", text: "제3회 디지털인문예술전공 프로젝트 전시회 포스터 공모전 우수상", tier: "normal" },
        { year: "2025", text: "춘천여행 SNS 공모전 마임축제 우수상", tier: "normal" },
        { year: "2025", text: "제16회 디지털인문예술전공 프로젝트 전시회 '디지털디자인1' 우수상", tier: "normal" },
        { year: "2025", text: "제16회 디지털인문예술전공 프로젝트 전시회 '문화콘텐츠기초' 우수상", tier: "normal" },
    ],

    activities: [
        { year: "2026", text: "Korea Design Membership Plus (KDM+) 7기", tier: "star", accent: true },
        { year: "2026", text: "창업동아리 Glow Wellness 콘텐츠 제작팀장", tier: "normal" },
        { year: "2026", text: "한림대학교 Station C 제작 서포터즈", tier: "normal" },
        { year: "2026", text: "UX Study with 김성우 교수", tier: "normal" },
        { year: "2025", text: "제7대 디지털인문예술전공 학생회 CUBE 임원", tier: "normal" },
        { year: "2025", text: "시각디자인 동아리 I-SO 부회장", tier: "normal" },
        { year: "2025", text: "UX·UI 동아리 더 인스튜디오 부원", tier: "normal" },
        { year: "2025", text: "창업동아리 GLOW IN 디자이너", tier: "normal" },
        { year: "2025", text: "제41대 사생위원회 이음 편집기획국 부장", tier: "normal" },
        { year: "2022", text: "제21회 미디어스쿨 비상제 Share 드라마팀", tier: "faint" },
        { year: "2022", text: "미디어스쿨 학술제 ALT 예고편팀", tier: "faint" },
        { year: "2022", text: "미디어스쿨 영상 동아리 Time Project+ 부원", tier: "faint" },
    ],

    experience: [
        { year: "2026", text: "디지털인문예술전공 AX 전환", accent: true },
        { year: "2026", text: "제18회 디지털인문예술전공 프로젝트 전시회 웹사이트 제작", accent: true },
        { year: "2026", text: "제4회 디지털인문예술전공 프로젝트 전시회 포스터 공모전 웹사이트 제작", accent: true },
        { year: "2026", text: "제1회 디지털인문예술전공 신규 캐릭터 공모전 웹사이트 제작", accent: true },
        { year: "2026", text: "디지털인문예술전공 전공박람회 부스 운영" },
        { year: "2026", text: "동해시 AX 전환 연구 과제 with 김성우 교수" },
        { year: "2026", text: "Google Sheet 연동 Apps Script 전시회 자동 접수 수정 폼 제작" },
        { year: "2026", text: "전공 동아리 전시회 운영" },
        { year: "2026", text: "비수도권 2030 대상 웰니스 서비스 디자인" },
        { year: "2026", text: "올리브영 앱 맨즈에딧 UX 개선" },
        { year: "2026", text: "강릉페이 UX 개선" },
        { year: "2026", text: "N9 1인 미용실 무간섭 서비스 디자인" },
        { year: "2026", text: "20대 한국인/외국인 혼밥러를 위한 로컬 식당 탐색 및 공간 서비스 CX 디자인" }, { year: "2026", text: "전공 동아리 전시회 운영" },
        { year: "2026", text: "디지털인문예술전공 개강·종강 총회 총괄 운영" },
        { year: "2026", text: "디지털인문예술전공 프로젝트 전시회 총괄 운영" },
        { year: "2026", text: "디지털인문예술전공 신규 캐릭터 공모전 기획·운영" },
        { year: "2025", text: "기상 데이터 기반 달랏 여행 큐레이션 웹 서비스 개발" },
        { year: "2025", text: "한림대-달랏대 국제협력 AI 워크숍 HIVE PROJECT 수료" },
        { year: "2025", text: "디지털인문예술전공 공식 웹사이트 리뉴얼" },
        { year: "2025", text: "디지털인문예술전공 공식 리플렛 리뉴얼" },
        { year: "2025", text: "디지털인문예술전공 프로젝트 전시회 배너 디자인" },
        { year: "2025", text: "제17회 디지털인문예술전공 프로젝트 전시회 웹사이트 제작" },
        { year: "2025", text: "제3회 디지털인문예술전공 프로젝트 전시회 포스터 공모전 웹사이트 제작" },
        { year: "2025", text: "강원디자인랩 CI 디자인" },
        { year: "2025", text: "미래내일 일경험 프로젝트 수료" },
        { year: "2025", text: "멈블 앰버서더 1기 수료" },
    ],

    education: [
        { year: "2026", text: "스타트업비즈니스 복수전공", accent: true },
        { year: "2026", text: "디지털인문예술전공 전과" },
        { year: "2024", text: "제60보병사단 정보통신대대 병장 만기 전역" },
        { year: "2023", text: "디지털인문예술 복수전공" },
        { year: "2023", text: "디지털미디어콘텐츠전공 선택" },
        { year: "2022", text: "한림대학교 미디어스쿨 입학" },
        { year: "2021", text: "강릉고등학교 졸업" },
    ],

    contacts: {
        email: "이메일 채우기",
        github: "github 핸들 채우기",
        instagram: "insta 핸들 채우기",
    },
}

export default profile