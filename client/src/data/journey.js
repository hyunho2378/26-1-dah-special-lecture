// journey.js — Method 섹션. 3비트. 화면엔 라벨+제목+상세 시각화.
export const method = [
  {
    label: '01 SELF-TAUGHT',
    title: '독학으로 습득한 문제 해결 역량',
    detail: '모르면 AI에게 묻고 답을 받으며 스스로 익혔습니다. 결국 질문하고 끊임없이 생각하는 능력이 커졌습니다.',
    icon: 'book',
  },
  {
    label: '02 ONE MORE LAYER',
    title: '1차적 결과가 아닌 추가 작업을 통한 완성도 증가',
    tags: ['클로드 + 클로드 코드 + 안티그래비티 동시 사용', '여백과 마진, 일관성 증가를 통한 UX 구축'],
    icon: 'layers',
  },
  {
    label: '03 WORKFLOW',
    title: '환경을 설계하는 법',
    detail: '1. MD 문서로 금지 규칙과 필수 조항을 정의한다.\n2. 자연어 프롬프트를 통해 한 번 최적화 및 정제한다.\n3. Claude Code가 그 문서와 프롬프트를 읽고 일하게 한다.\n\n명령이 아니라 환경을 설계해 결과의 일관성과 품질을 확보한다.',
    flow: true,
    icon: 'git',
  },
]

export const harnessFlow = ['Skill', '구조 MD', 'Claude Code', 'Claude 최적화']

export default method
