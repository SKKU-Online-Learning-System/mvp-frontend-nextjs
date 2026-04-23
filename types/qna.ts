// types/qna.ts

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

export type QuestionRequestType = {
    title: string;
    content: string;
};

export type AnswerRequestType = {
    content: string;
};
