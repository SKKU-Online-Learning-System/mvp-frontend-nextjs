'use client';

import { useState } from 'react';
import { createQuestion } from '@/app/api/qna';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function QnAWrite() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        if (!title.trim()) {
            toast.error('제목을 입력하세요');
            return;
        }

        if (!content.trim()) {
            toast.error('내용을 입력하세요');
            return;
        }

        await createQuestion({ title, content });

        router.push('/content/qna');
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-bold mb-6">질문 작성</h1>

            {/* 제목 */}
            <div className="mb-4">
                <label className="block text-sm mb-1">제목</label>
                <input
                    type="text"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="질문 제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* 내용 */}
            <div className="mb-6">
                <label className="block text-sm mb-1">내용</label>
                <textarea
                    className="w-full border rounded-lg p-3 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="질문 내용을 자세히 작성하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 border rounded-lg"
                >
                    취소
                </button>

                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    등록
                </button>
            </div>
        </div>
    );
}
