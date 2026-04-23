'use client';

import { useState } from 'react';
import QnAList from './QnAList';
import QnADetail from './QnADetail';
import { useRouter } from 'next/navigation';

export default function QnABoard() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'RESOLVED'>('ALL');

    return (
        <div className="max-w-7xl mx-auto px-6 py-6">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">질문 게시판</h1>
                <button
                    onClick={() => router.push('/content/qna/write')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    질문하기
                </button>

            </div>

            {/* 필터 */}
            <div className="flex gap-2 mb-4">
                {['ALL', 'OPEN', 'RESOLVED'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-3 py-1 rounded-full text-sm border
              ${filter === f
                                ? 'bg-blue-600 text-white'
                                : 'bg-white hover:bg-gray-100'
                            }`}
                    >
                        {f === 'ALL' ? '전체' : f === 'OPEN' ? '미해결' : '해결됨'}
                    </button>
                ))}
            </div>

            {/* 🔥 핵심: 2단 레이아웃 */}
            <div className="grid grid-cols-3 gap-6">
                {/* 좌측 리스트 */}
                <div className="col-span-1 border rounded-xl p-3 bg-white h-[70vh] overflow-y-auto">
                    <QnAList
                        filter={filter}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                    />
                </div>

                {/* 우측 상세 */}
                <div className="col-span-2 border rounded-xl p-6 bg-white h-[70vh] overflow-y-auto">
                    {selectedId ? (
                        <QnADetail questionId={selectedId} />
                    ) : (
                        <div className="text-gray-400 text-center mt-20">
                            질문을 선택하세요
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
