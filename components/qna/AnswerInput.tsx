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
        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
            <div className="mb-3 grid gap-2">
                <label className="text-sm font-medium text-slate-700">
                    작성자 닉네임
                </label>
                <input
                    type="text"
                    className="min-h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-xs transition focus:border-gray-400 focus:outline-none focus:ring-[3px] focus:ring-gray-950/10"
                    placeholder="작성자 닉네임"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </div>

            <textarea
                className="min-h-28 w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm leading-6 shadow-xs transition focus:border-gray-400 focus:outline-none focus:ring-[3px] focus:ring-gray-950/10"
                rows={4}
                placeholder="댓글 내용을 입력해주세요."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="mt-3 flex justify-end">
                <button
                    type="button"
                    onClick={submit}
                    className="inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-gray-950 px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-gray-800 sm:w-auto"
                >
                    댓글 등록
                </button>
            </div>
        </div>
    );
}
