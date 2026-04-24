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
            {filtered.map((question) => (
                <div
                    key={question.id}
                    onClick={() => onSelect(question.id)}
                    className={`p-3 rounded-lg cursor-pointer border transition ${
                        selectedId === question.id
                            ? 'bg-blue-50 border-blue-400'
                            : 'hover:bg-gray-50'
                    }`}
                >
                    <div className="flex justify-between items-start gap-3">
                        <h3 className="font-medium text-sm">{question.title}</h3>

                        <span
                            className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${
                                question.status === 'OPEN'
                                    ? 'bg-red-100 text-red-600'
                                    : 'bg-green-100 text-green-600'
                            }`}
                        >
                            {question.status === 'OPEN' ? '미해결' : '해결'}
                        </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-1 truncate">
                        {question.content}
                    </p>

                    <div className="text-xs text-gray-400 mt-1">
                        {getAuthorName(question.author)} ·{' '}
                        {formatDateTime(question.createdAt)}
                    </div>
                </div>
            ))}
        </div>
    );
}
