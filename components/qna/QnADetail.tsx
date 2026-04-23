'use client';

import { useEffect, useState } from 'react';
import { Question, Answer } from '@/lib/qnaApi';
import AnswerList from './AnswerList';
import AnswerInput from './AnswerInput';
import { getQuestion } from '@/app/api/qna';
import { getAnswers } from '@/app/api/qna';

export default function QnADetail({ questionId }: { questionId: number }) {
    const [question, setQuestion] = useState<Question | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);

    const load = async () => {
        const q = await getQuestion(questionId);
        const a = await getAnswers(questionId);
        if (q) setQuestion(q);
        setAnswers(a);
    };

    useEffect(() => {
        load();
    }, [questionId]);

    if (!question) return null;

    return (
        <div>
            {/* 질문 */}
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">{question.title}</h2>
                <p className="text-gray-700">{question.content}</p>

                <div className="text-sm text-gray-400 mt-2">
                    {question.author} · {question.createdAt}
                </div>
            </div>

            {/* 답변 */}
            <AnswerList answers={answers} />

            {/* 입력 */}
            <AnswerInput questionId={questionId} onSuccess={load} />
        </div>
    );
}
