'use client';

import { useEffect, useState } from 'react';
import {
    deleteQuestion,
    getAnswers,
    getQuestion,
    updateQuestion,
    updateQuestionStatus,
} from '@/app/api/qna';
import useQnAOwnerTokens from '@/hooks/useQnAOwnerTokens';
import { formatDateTime } from '@/lib/date';
import { getAuthorName } from '@/lib/qnaAuthor';
import { getQuestionCategoryLabel } from '@/lib/qnaCategory';
import { Answer, Question } from '@/types/qna';
import { Badge } from '@/components/ui/badge';
import AnswerInput from './AnswerInput';
import AnswerList from './AnswerList';
import { QuestionStatusBadge } from './QnAList';

export default function QnADetail({
    questionId,
    onBack,
    onQuestionUpdated,
    onQuestionDeleted,
}: {
    questionId: number;
    onBack: () => void;
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
    const [isEditing, setIsEditing] = useState(false);
    const [draftTitle, setDraftTitle] = useState('');
    const [draftContent, setDraftContent] = useState('');

    const load = async () => {
        const [nextQuestion, nextAnswers] = await Promise.all([
            getQuestion(questionId),
            getAnswers(questionId),
        ]);

        setQuestion(nextQuestion);
        setAnswers(nextAnswers);

        if (nextQuestion) {
            setDraftTitle(nextQuestion.title);
            setDraftContent(nextQuestion.content);
        }
    };

    useEffect(() => {
        load();
    }, [questionId]);

    if (!question) return null;

    const questionOwnerToken = getQuestionOwnerToken(question.id);

    return (
        <div className="space-y-6">
            <div className="lg:hidden">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-xs transition hover:bg-gray-50"
                >
                    목록으로
                </button>
            </div>

            <section className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
                <div className="mb-4 flex flex-col gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                            <h2 className="break-words text-xl font-bold text-slate-900 sm:text-2xl">
                                {question.title}
                            </h2>
                            <Badge variant="secondary" className="font-semibold">
                                {getQuestionCategoryLabel(question.category)}
                            </Badge>
                            <QuestionStatusBadge status={question.status} />
                        </div>

                        <div className="flex flex-col gap-1 text-sm text-gray-400 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                            <span>{getAuthorName(question.author)}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{formatDateTime(question.createdAt)}</span>
                        </div>
                    </div>

                    {questionOwnerToken && !isEditing && (
                        <div className="flex flex-wrap gap-2 sm:justify-end">
                            <button
                                type="button"
                                className="inline-flex min-h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-xs transition hover:bg-gray-50"
                                onClick={() => {
                                    setDraftTitle(question.title);
                                    setDraftContent(question.content);
                                    setIsEditing(true);
                                }}
                            >
                                게시글 수정
                            </button>

                            <button
                                type="button"
                                className="inline-flex min-h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-xs transition hover:bg-gray-50"
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
                                className="inline-flex min-h-9 items-center justify-center rounded-md border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 shadow-xs transition hover:bg-red-50"
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

                {isEditing ? (
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={draftTitle}
                            onChange={(e) => setDraftTitle(e.target.value)}
                            className="min-h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-xs transition focus:border-gray-400 focus:outline-none focus:ring-[3px] focus:ring-gray-950/10"
                            placeholder="질문 제목을 입력해주세요"
                        />
                        <textarea
                            value={draftContent}
                            onChange={(e) => setDraftContent(e.target.value)}
                            className="min-h-48 w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm leading-7 shadow-xs transition focus:border-gray-400 focus:outline-none focus:ring-[3px] focus:ring-gray-950/10"
                            placeholder="질문 내용을 수정해주세요"
                        />
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                className="inline-flex min-h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-xs transition hover:bg-gray-50"
                                onClick={() => {
                                    setDraftTitle(question.title);
                                    setDraftContent(question.content);
                                    setIsEditing(false);
                                }}
                            >
                                취소
                            </button>
                            <button
                                type="button"
                                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-gray-950 px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-gray-800"
                                onClick={async () => {
                                    if (!questionOwnerToken) return;

                                    const success = await updateQuestion(
                                        question.id,
                                        {
                                            title: draftTitle.trim(),
                                            content: draftContent.trim(),
                                        },
                                        questionOwnerToken
                                    );

                                    if (success) {
                                        setIsEditing(false);
                                        await load();
                                        onQuestionUpdated();
                                    }
                                }}
                            >
                                수정 저장
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700 sm:text-base">
                        {question.content}
                    </p>
                )}
            </section>

            <AnswerList
                answers={answers}
                getAnswerOwnerToken={getAnswerOwnerToken}
                onChanged={load}
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
