'use client';

import { useEffect, useState } from 'react';
import {
    deleteQuestion,
    getAnswers,
    getQuestion,
    updateQuestionStatus,
} from '@/app/api/qna';
import useQnAOwnerTokens from '@/hooks/useQnAOwnerTokens';
import { formatDateTime } from '@/lib/date';
import { getAuthorName } from '@/lib/qnaAuthor';
import { Answer, Question } from '@/types/qna';
import AnswerInput from './AnswerInput';
import AnswerList from './AnswerList';

export default function QnADetail({
    questionId,
    onQuestionUpdated,
    onQuestionDeleted,
}: {
    questionId: number;
    onQuestionUpdated: () => void;
    onQuestionDeleted: () => void;
}) {
    const {
        getAnswerOwnerToken,
        getQuestionOwnerToken,
        removeAnswerOwnerToken,
        removeQuestionOwnerToken,
        setAnswerOwnerToken,
    } = useQnAOwnerTokens();
    const [question, setQuestion] = useState<Question | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);

    const load = async () => {
        const [nextQuestion, nextAnswers] = await Promise.all([
            getQuestion(questionId),
            getAnswers(questionId),
        ]);

        setQuestion(nextQuestion);
        setAnswers(nextAnswers);
    };

    useEffect(() => {
        load();
    }, [questionId]);

    if (!question) return null;

    const questionOwnerToken = getQuestionOwnerToken(question.id);

    return (
        <div>
            <div className="mb-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-xl font-bold">{question.title}</h2>
                            <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                    question.status === 'OPEN'
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-green-100 text-green-600'
                                }`}
                            >
                                {question.status === 'OPEN' ? '미해결' : '해결'}
                            </span>
                        </div>

                        <div className="text-sm text-gray-400">
                            {getAuthorName(question.author)} ·{' '}
                            {formatDateTime(question.createdAt)}
                        </div>
                    </div>

                    {questionOwnerToken && (
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="px-3 py-1.5 rounded border text-sm hover:bg-gray-50"
                                onClick={async () => {
                                    const nextStatus =
                                        question.status === 'OPEN'
                                            ? 'RESOLVED'
                                            : 'OPEN';
                                    const success = await updateQuestionStatus(
                                        question.id,
                                        nextStatus,
                                        questionOwnerToken
                                    );

                                    if (success) {
                                        await load();
                                        onQuestionUpdated();
                                    }
                                }}
                            >
                                {question.status === 'OPEN'
                                    ? '해결로 변경'
                                    : '미해결로 변경'}
                            </button>

                            <button
                                type="button"
                                className="px-3 py-1.5 rounded border border-red-200 text-red-500 text-sm hover:bg-red-50"
                                onClick={async () => {
                                    const success = await deleteQuestion(
                                        question.id,
                                        questionOwnerToken
                                    );

                                    if (success) {
                                        removeQuestionOwnerToken(question.id);
                                        onQuestionDeleted();
                                    }
                                }}
                            >
                                게시글 삭제
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-gray-700 whitespace-pre-wrap">
                    {question.content}
                </p>
            </div>

            <AnswerList
                answers={answers}
                getAnswerOwnerToken={getAnswerOwnerToken}
                onDeleted={load}
                questionId={questionId}
                removeAnswerOwnerToken={removeAnswerOwnerToken}
            />

            <AnswerInput
                questionId={questionId}
                onOwnerTokenIssued={setAnswerOwnerToken}
                onSuccess={load}
            />
        </div>
    );
}
