import { useState } from 'react';
import { deleteAnswer, updateAnswer } from '@/app/api/qna';
import { formatDateTime } from '@/lib/date';
import { getAuthorName } from '@/lib/qnaAuthor';
import { Answer } from '@/types/qna';

export default function AnswerList({
    answers,
    getAnswerOwnerToken,
    onChanged,
    questionId,
    removeAnswerOwnerToken,
}: {
    answers: Answer[];
    getAnswerOwnerToken: (answerId: number) => string | null;
    onChanged: () => void;
    questionId: number;
    removeAnswerOwnerToken: (answerId: number) => void;
}) {
    const [editingAnswerId, setEditingAnswerId] = useState<number | null>(null);
    const [draftContent, setDraftContent] = useState('');

    return (
        <div className="mb-6">
            <h3 className="mb-3 text-base font-semibold text-slate-900 sm:text-lg">
                댓글 {answers.length}
            </h3>

            {answers.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-sm text-gray-400">
                    아직 댓글이 없습니다.
                </div>
            ) : (
                <div className="space-y-3">
                    {answers.map((answer) => {
                        const ownerToken = getAnswerOwnerToken(answer.id);
                        const isEditing = editingAnswerId === answer.id;

                        return (
                            <div
                                key={answer.id}
                                className="rounded-xl border border-gray-200 bg-white p-4"
                            >
                                {isEditing ? (
                                    <div className="space-y-3">
                                        <textarea
                                            value={draftContent}
                                            onChange={(e) =>
                                                setDraftContent(e.target.value)
                                            }
                                            className="min-h-28 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                                            <button
                                                type="button"
                                                className="inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-gray-50"
                                                onClick={() => {
                                                    setEditingAnswerId(null);
                                                    setDraftContent('');
                                                }}
                                            >
                                                취소
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                                onClick={async () => {
                                                    if (!ownerToken) return;

                                                    const success =
                                                        await updateAnswer(
                                                            questionId,
                                                            answer.id,
                                                            {
                                                                content:
                                                                    draftContent.trim(),
                                                            },
                                                            ownerToken
                                                        );

                                                    if (success) {
                                                        setEditingAnswerId(null);
                                                        setDraftContent('');
                                                        onChanged();
                                                    }
                                                }}
                                            >
                                                수정 저장
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700 sm:text-base">
                                        {answer.content}
                                    </p>
                                )}

                                <div className="mt-3 flex flex-col gap-3 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                                        <span>{getAuthorName(answer.author)}</span>
                                        <span className="hidden sm:inline">•</span>
                                        <span>{formatDateTime(answer.createdAt)}</span>
                                    </div>

                                    {ownerToken && (
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md px-2 py-1 font-medium text-slate-600 transition hover:bg-gray-100 hover:text-slate-800"
                                                onClick={() => {
                                                    if (isEditing) {
                                                        setEditingAnswerId(
                                                            null
                                                        );
                                                        setDraftContent('');
                                                        return;
                                                    }

                                                    setEditingAnswerId(answer.id);
                                                    setDraftContent(
                                                        answer.content
                                                    );
                                                }}
                                            >
                                                {isEditing
                                                    ? '수정 취소'
                                                    : '댓글 수정'}
                                            </button>

                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md px-2 py-1 font-medium text-red-500 transition hover:bg-red-50 hover:text-red-600"
                                                onClick={async () => {
                                                    const success =
                                                        await deleteAnswer(
                                                            questionId,
                                                            answer.id,
                                                            ownerToken
                                                        );

                                                    if (success) {
                                                        removeAnswerOwnerToken(
                                                            answer.id
                                                        );
                                                        onChanged();
                                                    }
                                                }}
                                            >
                                                댓글 삭제
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
