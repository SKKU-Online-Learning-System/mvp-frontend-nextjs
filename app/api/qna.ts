import axios from 'axios';
import { toast } from 'sonner';
import { api, jwtApi } from './axios';
import {
    Question,
    Answer,
    QuestionRequestType,
    AnswerRequestType,
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
        const res = await api.get<Answer[]>(
            `/questions/${questionId}/answers`
        );
        return res.data;
    } catch (err) {
        toast.error('답변을 불러오는 중 오류가 발생했습니다.');
        return [];
    }
};

export const createQuestion = async (data: QuestionRequestType) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('[DEV] createQuestion bypass', data);
        toast.success('개발 모드: 질문 등록을 건너뛰었습니다.');
        return true;
    }

    try {
        await jwtApi.post('/questions', data);
        toast.success('질문이 등록되었습니다.');
        return true;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
                toast.error('로그인이 필요합니다.');
            } else {
                toast.error('질문 등록 실패');
            }
        }
        return false;
    }
};


export const createAnswer = async (
    questionId: number,
    data: AnswerRequestType
) => {
    try {
        await jwtApi.post(
            `/questions/${questionId}/answers`,
            data
        );
        toast.success('답변이 등록되었습니다.');
        return true;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            toast.error('답변 등록 실패');
        }
        return false;
    }
};

export const deleteQuestion = async (id: number) => {
    try {
        await jwtApi.delete(`/questions/${id}`);
        toast.success('삭제되었습니다.');
        return true;
    } catch {
        toast.error('삭제 실패');
        return false;
    }
};
