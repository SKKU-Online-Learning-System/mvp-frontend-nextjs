'use client';

import { useEffect, useState } from 'react';
import { getQuestions } from '@/app/api/qna';
import { formatDateTime } from '@/lib/date';
import { getAuthorName } from '@/lib/qnaAuthor';
import { Question } from '@/types/qna';

export default function QnAList({
    filter,
    selectedId,
    onSelect,
    refreshKey,
}: {
    filter: 'ALL' | 'OPEN' | 'RESOLVED';
    selectedId: number | null;
    onSelect: (id: number) => void;
    refreshKey: number;
}) {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        getQuestions().then(setQuestions);
    }, [refreshKey]);

    const filtered = questions.filter((question) => {
        if (filter === 'ALL') return true;
        return question.status === filter;
    });

    return (
        <div className="space-y-2">
            {filtered.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-12 text-center text-sm text-gray-400">
                    현재 조건에 맞는 질문이 없습니다.
                </div>
            ) : (
                filtered.map((question) => (
                    <button
                        key={question.id}
                        type="button"
                        onClick={() => onSelect(question.id)}
                        className={`block w-full rounded-xl border p-3 text-left transition ${
                            selectedId === question.id
                                ? 'border-blue-400 bg-blue-50'
                                : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                    >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0 flex-1">
                                <h3 className="break-words text-sm font-medium leading-6 text-slate-900 sm:text-base">
                                    {question.title}
                                </h3>
                                <p className="mt-1 break-words text-xs leading-5 text-gray-500 sm:text-sm">
                                    {question.content}
                                </p>
                            </div>

                            <span
                                className={`inline-flex w-fit shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                    question.status === 'OPEN'
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-green-100 text-green-600'
                                }`}
                            >
                                {question.status === 'OPEN' ? '미해결' : '해결'}
                            </span>
                        </div>

                        <div className="mt-2 flex flex-col gap-1 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
                            <span className="truncate">{getAuthorName(question.author)}</span>
                            <span>{formatDateTime(question.createdAt)}</span>
                        </div>
                    </button>
                ))
            )}
        </div>
    );
}
