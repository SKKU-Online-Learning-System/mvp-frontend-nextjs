'use client';

import { useState } from 'react';
import { createAnswer } from '@/app/api/qna';

export default function AnswerInput({
    questionId,
    onSuccess,
}: {
    questionId: number;
    onSuccess: () => void;
}) {
    const [text, setText] = useState('');

    const submit = async () => {
        if (!text.trim()) return;
        await createAnswer(questionId, { content: text });
        setText('');
        onSuccess();
    };

    return (
        <div className="border rounded-lg p-3 bg-white">
            <textarea
                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="답변을 입력하세요..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="flex justify-end mt-2">
                <button
                    onClick={submit}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
                >
                    답변 등록
                </button>
            </div>
        </div>
    );
}
