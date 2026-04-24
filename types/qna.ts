import { AuthUser } from './auth';

export type QnAAuthor =
    | string
    | (Partial<Pick<AuthUser, 'id' | 'profileImage'>> & { name: string });

export type Question = {
    id: number;
    title: string;
    content: string;
    author: QnAAuthor;
    status: 'OPEN' | 'RESOLVED';
    createdAt: string;
};

export type Answer = {
    id: number;
    questionId: number;
    content: string;
    author: QnAAuthor;
    isAccepted: boolean;
    createdAt: string;
};

export type QuestionRequestType = {
    title: string;
    content: string;
    author: string;
    status?: 'OPEN' | 'RESOLVED';
};

export type AnswerRequestType = {
    content: string;
    author: string;
};

export type QuestionMutationResponse = Question & {
    ownerToken?: string;
};

export type AnswerMutationResponse = Answer & {
    ownerToken?: string;
};
