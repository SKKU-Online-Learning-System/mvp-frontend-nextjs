'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { QUESTION_CATEGORY_OPTIONS } from '@/lib/qnaCategory';
import { QuestionCategoryFilter } from '@/types/qna';
import QnADetail from './QnADetail';
import QnAList from './QnAList';

type QuestionStatusFilter = 'ALL' | 'OPEN' | 'RESOLVED';

export default function QnABoard() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [statusFilter, setStatusFilter] =
        useState<QuestionStatusFilter>('ALL');
    const [categoryFilter, setCategoryFilter] =
        useState<QuestionCategoryFilter>('ALL');
    const [refreshKey, setRefreshKey] = useState(0);
    const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

    useEffect(() => {
        if (selectedId) {
            setMobileView('detail');
        }
    }, [selectedId]);

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
            <div className="mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        질문 게시판
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        궁금한 점을 남기고 답변을 주고받아보세요.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => router.push('/content/qna/write')}
                    className="inline-flex min-h-10 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    질문 작성하기
                </button>
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:mb-5">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-sm font-medium text-slate-500">
                        상태
                    </span>
                    {(
                        ['ALL', 'OPEN', 'RESOLVED'] as QuestionStatusFilter[]
                    ).map((value) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setStatusFilter(value)}
                            className={`rounded-full border px-3 py-1.5 text-sm transition ${
                                statusFilter === value
                                    ? 'border-blue-600 bg-blue-600 text-white'
                                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
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

                <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-sm font-medium text-slate-500">
                        분야
                    </span>
                    {[
                        { label: '전체', value: 'ALL' as const },
                        ...QUESTION_CATEGORY_OPTIONS,
                    ].map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => setCategoryFilter(option.value)}
                            className={`rounded-full border px-3 py-1.5 text-sm transition ${
                                categoryFilter === option.value
                                    ? 'border-blue-600 bg-blue-600 text-white'
                                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1 lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileView('list')}
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                            mobileView === 'list'
                                ? 'bg-white text-slate-900'
                                : 'text-slate-500'
                        }`}
                    >
                        목록
                    </button>
                    <button
                        type="button"
                        onClick={() => selectedId && setMobileView('detail')}
                        disabled={!selectedId}
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                            mobileView === 'detail' && selectedId
                                ? 'bg-white text-slate-900'
                                : 'text-slate-500'
                        } ${!selectedId ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        상세
                    </button>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(320px,380px)_minmax(0,1fr)] lg:gap-6">
                <section
                    className={`rounded-xl border border-gray-200 bg-white p-3 lg:block lg:max-h-[72vh] lg:overflow-y-auto ${
                        mobileView === 'detail' ? 'hidden' : 'block'
                    }`}
                >
                    <QnAList
                        statusFilter={statusFilter}
                        categoryFilter={categoryFilter}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                        refreshKey={refreshKey}
                    />
                </section>

                <section
                    className={`rounded-xl border border-gray-200 bg-white p-4 sm:p-6 lg:block lg:max-h-[72vh] lg:overflow-y-auto ${
                        mobileView === 'list' ? 'hidden' : 'block'
                    }`}
                >
                    {selectedId ? (
                        <QnADetail
                            questionId={selectedId}
                            onBack={() => setMobileView('list')}
                            onQuestionUpdated={() =>
                                setRefreshKey((prev) => prev + 1)
                            }
                            onQuestionDeleted={() => {
                                setSelectedId(null);
                                setMobileView('list');
                                setRefreshKey((prev) => prev + 1);
                            }}
                        />
                    ) : (
                        <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 text-center text-sm text-gray-400 sm:text-base">
                            질문을 선택하면 자세한 내용을 볼 수 있습니다.
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
