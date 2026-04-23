'use client';

import { useEffect, useState } from 'react';
import { Question } from '@/types/qna';
import { getQuestions } from '@/app/api/qna';

export default function QnAList({
    filter,
    selectedId,
    onSelect,
}: {
    filter: 'ALL' | 'OPEN' | 'RESOLVED';
    selectedId: number | null;
    onSelect: (id: number) => void;
}) {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        getQuestions().then(setQuestions);
    }, []);

    const filtered = questions.filter((q) => {
        if (filter === 'ALL') return true;
        return q.status === filter;
    });

    return (
        <div className="space-y-2">
            {filtered.map((q) => (
                <div
                    key={q.id}
                    onClick={() => onSelect(q.id)}
                    className={`p-3 rounded-lg cursor-pointer border transition
            ${selectedId === q.id
                            ? 'bg-blue-50 border-blue-400'
                            : 'hover:bg-gray-50'
                        }`}
                >
                    <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">{q.title}</h3>

                        <span
                            className={`text-xs px-2 py-0.5 rounded-full
                ${q.status === 'OPEN'
                                    ? 'bg-red-100 text-red-600'
                                    : 'bg-green-100 text-green-600'
                                }`}
                        >
                            {q.status === 'OPEN' ? '미해결' : '해결됨'}
                        </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-1 truncate">
                        {q.content}
                    </p>

                    <div className="text-xs text-gray-400 mt-1">
                        {q.author}
                    </div>
                </div>
            ))}
        </div>
    );
}
