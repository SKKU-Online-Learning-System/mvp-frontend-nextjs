'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { createQuestion } from '@/app/api/qna';
import useQnAAuthor from '@/hooks/useQnAAuthor';
import useQnAOwnerTokens from '@/hooks/useQnAOwnerTokens';
import { QUESTION_CATEGORY_OPTIONS } from '@/lib/qnaCategory';
import { QuestionCategory } from '@/types/qna';

export default function QnAWrite() {
    const router = useRouter();
    const { author, setAuthor } = useQnAAuthor();
    const { setQuestionOwnerToken } = useQnAOwnerTokens();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState<QuestionCategory>('GENERAL');

    const handleSubmit = async () => {
        if (!author.trim()) {
            toast.error('작성자 닉네임을 입력해주세요.');
            return;
        }

        if (!title.trim()) {
            toast.error('제목을 입력해주세요.');
            return;
        }

        if (!content.trim()) {
            toast.error('내용을 입력해주세요.');
            return;
        }

        const createdQuestion = await createQuestion({
            title: title.trim(),
            content: content.trim(),
            author: author.trim(),
            status: 'OPEN',
            category,
        });

        if (!createdQuestion) return;

        if (createdQuestion.ownerToken) {
            setQuestionOwnerToken(createdQuestion.id, createdQuestion.ownerToken);
        }

        router.push('/content/qna');
    };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-5 sm:px-6 sm:py-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    질문 작성
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    제목과 내용을 입력해서 질문을 남겨주세요.
                </p>
            </div>

            <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
                <div className="grid gap-5">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            작성자
                        </label>
                        <input
                            type="text"
                            className="min-h-10 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="게시글에 표시할 닉네임을 입력해주세요"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label
                            htmlFor="question-category"
                            className="text-sm font-medium text-slate-700"
                        >
                            분야
                        </label>
                        <select
                            id="question-category"
                            value={category}
                            onChange={(event) =>
                                setCategory(
                                    event.target.value as QuestionCategory
                                )
                            }
                            className="min-h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {QUESTION_CATEGORY_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            제목
                        </label>
                        <input
                            type="text"
                            className="min-h-10 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="질문 제목을 입력해주세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            내용
                        </label>
                        <textarea
                            className="min-h-[240px] w-full rounded-lg border border-gray-200 px-3 py-3 text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:min-h-[320px]"
                            placeholder="질문 내용을 자세히 작성해주세요"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-gray-50"
                >
                    취소
                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex min-h-10 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    등록
                </button>
            </div>
        </div>
    );
}
