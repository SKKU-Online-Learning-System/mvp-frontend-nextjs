export type Question = {
    id: number;
    title: string;
    content: string;
    author: string;
    status: 'OPEN' | 'RESOLVED';
    createdAt: string;
};

export type Answer = {
    id: number;
    questionId: number;
    content: string;
    author: string;
    isAccepted: boolean;
    createdAt: string;
};

// 🔥 더미 DB
const questions: Question[] = [
    {
        id: 1,
        title: 'React useEffect 동작 원리 질문',
        content: 'useEffect는 언제 실행되나요?',
        author: 'yongha',
        status: 'OPEN',
        createdAt: '2026-04-23',
    },
    {
        id: 2,
        title: 'Next.js SSR vs CSR',
        content: '언제 SSR을 써야 하나요?',
        author: 'devkim',
        status: 'RESOLVED',
        createdAt: '2026-04-22',
    },
];

const answers: Answer[] = [
    {
        id: 1,
        questionId: 2,
        content: 'SEO가 중요하면 SSR 사용하세요.',
        author: 'expert',
        isAccepted: true,
        createdAt: '2026-04-22',
    },
    {
        id: 2,
        questionId: 2,
        content: 'CSR은 인터랙션 많은 경우 좋아요.',
        author: 'anotherDev',
        isAccepted: false,
        createdAt: '2026-04-22',
    },
];
