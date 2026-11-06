'use client';

import { getQuestions } from '@/app/api/qna';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Question, QuestionCategoryFilter } from '@/types/qna';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { QUESTION_CATEGORY_OPTIONS } from '@/lib/qnaCategory';
import QnADetail from './QnADetail';
import QnAList from './QnAList';

type QuestionStatusFilter = 'ALL' | 'OPEN' | 'RESOLVED';

const statusOptions: { value: QuestionStatusFilter; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'OPEN', label: '미해결' },
  { value: 'RESOLVED', label: '해결' },
];

export default function QnABoard() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<QuestionStatusFilter>('ALL');
  const [categoryFilter, setCategoryFilter] =
    useState<QuestionCategoryFilter>('ALL');
  const [refreshKey, setRefreshKey] = useState(0);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    getQuestions().then((data) => {
      if (!cancelled) {
        setQuestions(data);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  useEffect(() => {
    if (selectedId) {
      setMobileView('detail');
    }
  }, [selectedId]);

  const counts = useMemo(
    () => ({
      total: questions.length,
      open: questions.filter((question) => question.status === 'OPEN').length,
      resolved: questions.filter((question) => question.status === 'RESOLVED')
        .length,
    }),
    [questions]
  );

  const filtered = useMemo(
    () =>
      questions.filter((question) => {
        const matchesStatus =
          statusFilter === 'ALL' || question.status === statusFilter;
        const matchesCategory =
          categoryFilter === 'ALL' || question.category === categoryFilter;

        return matchesStatus && matchesCategory;
      }),
    [categoryFilter, questions, statusFilter]
  );

  return (
    <div className='my-container pb-16'>
      {/* 헤더 */}
      <section className='flex flex-col gap-5 border-b pb-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex items-start gap-3'>
            <div>
              <h1 className='text-2xl font-bold text-gray-950 sm:text-3xl'>
                질문 게시판
              </h1>
              <p className='mt-1 text-sm text-gray-500'>
                AI·SW 공부와 진로, 학교 생활에서 궁금한 점을 남기고 함께 답을
                찾아보세요.
              </p>
            </div>
          </div>

          <Button
            type='button'
            onClick={() => router.push('/content/qna/write')}
            className='h-10 shrink-0 px-5'
          >
            질문 작성하기
          </Button>
        </div>

        <div className='grid grid-cols-3 gap-3 sm:max-w-md'>
          <StatTile label='전체 질문' value={counts.total} />
          <StatTile label='미해결' value={counts.open} tone='amber' />
          <StatTile label='해결' value={counts.resolved} tone='emerald' />
        </div>

        <div className='flex flex-col gap-3'>
          <FilterRow label='상태'>
            {statusOptions.map((option) => (
              <Badge
                key={option.value}
                variant={
                  statusFilter === option.value ? 'default' : 'secondary'
                }
                className='h-8 cursor-pointer px-3 font-semibold'
                onClick={() => setStatusFilter(option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </FilterRow>

          <FilterRow label='분야'>
            {[
              { label: '전체', value: 'ALL' as const },
              ...QUESTION_CATEGORY_OPTIONS,
            ].map((option) => (
              <Badge
                key={option.value}
                variant={
                  categoryFilter === option.value ? 'default' : 'secondary'
                }
                className='h-8 cursor-pointer px-3 font-semibold'
                onClick={() => setCategoryFilter(option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </FilterRow>
        </div>
      </section>

      {/* 모바일 목록/상세 전환 */}
      <div className='grid grid-cols-2 gap-1 rounded-md border bg-white p-1 shadow-xs lg:hidden'>
        <button
          type='button'
          onClick={() => setMobileView('list')}
          className={`h-9 rounded-md text-sm font-semibold transition ${
            mobileView === 'list'
              ? 'bg-gray-950 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          목록
        </button>
        <button
          type='button'
          onClick={() => selectedId && setMobileView('detail')}
          disabled={!selectedId}
          className={`h-9 rounded-md text-sm font-semibold transition ${
            mobileView === 'detail' && selectedId
              ? 'bg-gray-950 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          } ${!selectedId ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          상세
        </button>
      </div>

      <div className='grid gap-6 lg:grid-cols-[minmax(320px,400px)_minmax(0,1fr)] xl:gap-8'>
        <section
          className={`flex flex-col gap-3 lg:block ${
            mobileView === 'detail' ? 'hidden' : 'block'
          }`}
        >
          <div className='flex items-center justify-between'>
            <p className='text-sm font-semibold text-gray-700'>
              질문 {filtered.length.toLocaleString('ko-KR')}개
            </p>
          </div>
          <div className='rounded-lg border bg-white p-3 shadow-xs lg:max-h-[72vh] lg:overflow-y-auto'>
            <QnAList
              questions={filtered}
              isLoading={isLoading}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </section>

        <section
          className={`rounded-lg border bg-white p-4 shadow-xs sm:p-6 lg:block lg:max-h-[72vh] lg:overflow-y-auto ${
            mobileView === 'list' ? 'hidden' : 'block'
          }`}
        >
          {selectedId ? (
            <QnADetail
              questionId={selectedId}
              onBack={() => setMobileView('list')}
              onQuestionUpdated={() => setRefreshKey((prev) => prev + 1)}
              onQuestionDeleted={() => {
                setSelectedId(null);
                setMobileView('list');
                setRefreshKey((prev) => prev + 1);
              }}
            />
          ) : (
            <div className='flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-gray-200 bg-gray-50 px-6 text-center'>
              <p className='text-sm font-semibold text-gray-700'>
                질문을 선택하면 자세한 내용을 볼 수 있습니다.
              </p>
              <p className='text-xs text-gray-500'>
                왼쪽 목록에서 질문을 고르거나, 새 질문을 남겨보세요.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-wrap items-center gap-2'>
      <span className='w-9 shrink-0 text-xs font-semibold text-gray-500'>
        {label}
      </span>
      {children}
    </div>
  );
}

function StatTile({
  label,
  value,
  tone = 'gray',
}: {
  label: string;
  value: number;
  tone?: 'gray' | 'amber' | 'emerald';
}) {
  const toneClass =
    tone === 'amber'
      ? 'text-amber-600'
      : tone === 'emerald'
        ? 'text-emerald-600'
        : 'text-gray-500';

  return (
    <div className='min-w-0 rounded-lg border bg-white px-3.5 py-3 shadow-xs'>
      <div
        className={`flex items-center gap-1.5 text-xs font-semibold ${toneClass}`}
      >
        {label}
      </div>
      <p className='mt-1 text-lg font-bold text-gray-950'>
        {value.toLocaleString('ko-KR')}
      </p>
    </div>
  );
}
