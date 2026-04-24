'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { createQuestion } from '@/app/api/qna';
import useQnAAuthor from '@/hooks/useQnAAuthor';
import useQnAOwnerTokens from '@/hooks/useQnAOwnerTokens';

export default function QnAWrite() {
    const router = useRouter();
    const { author, setAuthor } = useQnAAuthor();
    const { setQuestionOwnerToken } = useQnAOwnerTokens();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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
        });

        if (!createdQuestion) return;

        if (createdQuestion.ownerToken) {
            setQuestionOwnerToken(createdQuestion.id, createdQuestion.ownerToken);
        }

        router.push('/content/qna');
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-bold mb-6">질문 작성</h1>

            <div className="mb-4">
                <label className="block text-sm mb-1">작성자</label>
                <input
                    type="text"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="게시글에 표시될 닉네임을 입력해주세요"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-1">제목</label>
                <input
                    type="text"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="질문 제목을 입력해주세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm mb-1">내용</label>
                <textarea
                    className="w-full border rounded-lg p-3 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="질문 내용을 자세히 작성해주세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 border rounded-lg"
                >
                    취소
                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    등록
                </button>
            </div>
        </div>
    );
}
