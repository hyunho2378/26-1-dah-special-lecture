// toolkit.js — Toolkit 섹션 (화면용 최소 텍스트)
// 화면엔 로고 그리드 + 역할 한 줄. tips는 title만 크게(설명은 말로).
// 로고는 public/logos/ 에 넣고 경로만 맞춤.

export const toolkit = {
    ai: [
        { name: "Claude", role: "다이어그램 · 문서 · 코딩", logo: "/logos/claude.svg" },
        { name: "Claude Code", role: "에이전틱 코딩", logo: "/logos/claudecode.svg" },
        { name: "Gemini", role: "구글 생태계 확장", logo: "/logos/gemini.svg" },
        { name: "ChatGPT", role: "번역 · 코딩 · 이미지", logo: "/logos/gpt.svg" },
        { name: "Grok", role: "브레인스토밍 · 초기 리서치", logo: "/logos/grok.svg" },
        { name: "NotebookLM", role: "자료 텍스트 추출", logo: "/logos/notebooklm.svg" },
        { name: "Antigravity", role: "코딩 · 파일 관리", logo: "/logos/antigravity.svg" },
        { name: "Figma", role: "협업 · 디자인 컴포넌트", logo: "/logos/figma.svg" },
    ],

    // 화면엔 title만 크게 (설명은 말로)
    tips: [
        { title: "연간 구독은 하지 마라" },
        { title: "쓰레드로 매일 본다" },
        { title: "하나의 AI만 믿지 마라" },
    ],
}

export default toolkit