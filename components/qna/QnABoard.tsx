'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import QnADetail from './QnADetail';
import QnAList from './QnAList';

export default function QnABoard() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'RESOLVED'>('ALL');
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">질문 게시판</h1>
                <button
                    type="button"
                    onClick={() => router.push('/content/qna/write')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    질문하기
                </button>
            </div>

            <div className="flex gap-2 mb-4">
                {['ALL', 'OPEN', 'RESOLVED'].map((value) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() =>
                            setFilter(value as 'ALL' | 'OPEN' | 'RESOLVED')
                        }
                        className={`px-3 py-1 rounded-full text-sm border ${
                            filter === value
                                ? 'bg-blue-600 text-white'
                                : 'bg-white hover:bg-gray-100'
                        }`}
                    >
                        {value === 'ALL'
                            ? '전체'
                            : value === 'OPEN'
                              ? '미해결'
                              : '해결'}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1 border rounded-xl p-3 bg-white h-[70vh] overflow-y-auto">
                    <QnAList
                        filter={filter}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                        refreshKey={refreshKey}
                    />
                </div>

                <div className="col-span-2 border rounded-xl p-6 bg-white h-[70vh] overflow-y-auto">
                    {selectedId ? (
                        <QnADetail
                            questionId={selectedId}
                            onQuestionUpdated={() =>
                                setRefreshKey((prev) => prev + 1)
                            }
                            onQuestionDeleted={() => {
                                setSelectedId(null);
                                setRefreshKey((prev) => prev + 1);
                            }}
                        />
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
