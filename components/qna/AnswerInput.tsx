'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { createAnswer } from '@/app/api/qna';
import useQnAAuthor from '@/hooks/useQnAAuthor';

export default function AnswerInput({
    questionId,
    onOwnerTokenIssued,
    onSuccess,
}: {
    questionId: number;
    onOwnerTokenIssued: (answerId: number, ownerToken: string) => void;
    onSuccess: () => void;
}) {
    const { author, setAuthor } = useQnAAuthor();
    const [text, setText] = useState('');

    const submit = async () => {
        if (!author.trim()) {
            toast.error('작성자 닉네임을 입력해주세요.');
            return;
        }

        if (!text.trim()) {
            toast.error('댓글 내용을 입력해주세요.');
            return;
        }

        const createdAnswer = await createAnswer(questionId, {
            content: text.trim(),
            author: author.trim(),
        });

        if (!createdAnswer) return;

        if (createdAnswer.ownerToken) {
            onOwnerTokenIssued(createdAnswer.id, createdAnswer.ownerToken);
        }

        setText('');
        onSuccess();
    };

    return (
        <div className="border rounded-lg p-3 bg-white">
            <input
                type="text"
                className="w-full border rounded p-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="작성자 닉네임"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />

            <textarea
                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="댓글을 입력해주세요."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="flex justify-end mt-2">
                <button
                    type="button"
                    onClick={submit}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
                >
                    댓글 등록
                </button>
            </div>
        </div>
    );
}
