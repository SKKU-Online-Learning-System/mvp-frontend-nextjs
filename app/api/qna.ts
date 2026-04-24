import axios from 'axios';
import { toast } from 'sonner';
import { api } from './axios';
import {
    Answer,
    AnswerMutationResponse,
    AnswerRequestType,
    Question,
    QuestionMutationResponse,
    QuestionRequestType,
} from '@/types/qna';

export const getQuestions = async () => {
    try {
        const res = await api.get<Question[]>('/questions');
        return res.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            toast.error('질문 목록을 불러오는 중 오류가 발생했습니다.');
        }

        return [];
    }
};

export const getQuestion = async (id: number) => {
    try {
        const res = await api.get<Question>(`/questions/${id}`);
        return res.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            toast.error('질문을 불러오는 중 오류가 발생했습니다.');
        }

        return null;
    }
};

export const getAnswers = async (questionId: number) => {
    try {
        const res = await api.get<Answer[]>(`/questions/${questionId}/answers`);
        return res.data;
    } catch {
        toast.error('댓글을 불러오는 중 오류가 발생했습니다.');
        return [];
    }
};

export const createQuestion = async (data: QuestionRequestType) => {
    try {
        const res = await api.post<QuestionMutationResponse>('/questions', data);
        toast.success('질문이 등록되었습니다.');
        return res.data;
    } catch {
        toast.error('질문 등록에 실패했습니다.');
        return null;
    }
};

export const createAnswer = async (
    questionId: number,
    data: AnswerRequestType
) => {
    try {
        const res = await api.post<AnswerMutationResponse>(
            `/questions/${questionId}/answers`,
            data
        );
        toast.success('댓글이 등록되었습니다.');
        return res.data;
    } catch {
        toast.error('댓글 등록에 실패했습니다.');
        return null;
    }
};

export const updateQuestionStatus = async (
    id: number,
    status: 'OPEN' | 'RESOLVED',
    ownerToken: string
) => {
    try {
        await api.post(
            `/questions/${id}/status-change`,
            { status },
            {
                headers: {
                    'X-Owner-Token': ownerToken,
                },
            }
        );
        toast.success(
            status === 'RESOLVED'
                ? '질문이 해결 상태로 변경되었습니다.'
                : '질문이 미해결 상태로 변경되었습니다.'
        );
        return true;
    } catch {
        toast.error('질문 상태 변경에 실패했습니다.');
        return false;
    }
};

export const deleteQuestion = async (id: number, ownerToken: string) => {
    try {
        await api.post(
            `/questions/${id}/delete`,
            {},
            {
                headers: {
                    'X-Owner-Token': ownerToken,
                },
            }
        );
        toast.success('게시글이 삭제되었습니다.');
        return true;
    } catch {
        toast.error('게시글 삭제에 실패했습니다.');
        return false;
    }
};

export const deleteAnswer = async (
    questionId: number,
    answerId: number,
    ownerToken: string
) => {
    try {
        await api.post(
            `/questions/${questionId}/answers/${answerId}/delete`,
            {},
            {
                headers: {
                    'X-Owner-Token': ownerToken,
                },
            }
        );
        toast.success('댓글이 삭제되었습니다.');
        return true;
    } catch {
        toast.error('댓글 삭제에 실패했습니다.');
        return false;
    }
};
