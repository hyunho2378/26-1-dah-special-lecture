// whyClaudeCode.js — WHY CLAUDE CODE. 비난이 아니라 포지셔닝.
// 축: x = 결과 속도 → 정교한 제어 / y = 입문자 친화 → 헤비 개발자
// mine/primary = accent 강조. glow = 맥동 발광 애니메이션.
export const whyClaudeCode = {
  eyebrow: 'WHY CLAUDE CODE',
  title: '도구의 포지셔닝',
  lead: '강점이 서로 다른 AI들 중 비전공자에게 친절하면서 디테일까지 잡을 수 있는 AI, Claude Code의 필요성입니다.',
  axis: { x: ['빠른 결과', '정교한 제어'], y: ['입문자 친화', '헤비 개발'] },
  tools: [
    { name: 'Google AI Studio', x: 0.16, y: 0.16 },
    { name: 'Gemini', x: 0.30, y: 0.22 },
    { name: 'ChatGPT', x: 0.36, y: 0.34 },
    { name: 'Claude Code', x: 0.64, y: 0.34, mine: true, glow: true },
    { name: 'Cursor', x: 0.74, y: 0.52, primary: true, glow: true },
    { name: 'Antigravity', x: 0.80, y: 0.46, mine: true, glow: true },
    { name: 'Codex', x: 0.88, y: 0.80, primary: true },
  ],
}

export default whyClaudeCode
