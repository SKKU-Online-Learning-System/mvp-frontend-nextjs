'use client';

import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Question } from '@/types/qna';
import { CheckCircle2, CircleDashed } from 'lucide-react';
import { formatDateTime } from '@/lib/date';
import { getAuthorName } from '@/lib/qnaAuthor';
import { getQuestionCategoryLabel } from '@/lib/qnaCategory';

export function QuestionStatusBadge({
  status,
}: {
  status: Question['status'];
}) {
  return status === 'OPEN' ? (
    <Badge
      variant='outline'
      className='border-amber-200 bg-amber-50 text-amber-700'
    >
      <CircleDashed className='size-3' />
      미해결
    </Badge>
  ) : (
    <Badge
      variant='outline'
      className='border-emerald-200 bg-emerald-50 text-emerald-700'
    >
      <CheckCircle2 className='size-3' />
      해결
    </Badge>
  );
}

function AuthorAvatar({ name }: { name: string }) {
  const initial = name.trim().charAt(0) || '?';

  return (
    <span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[11px] font-bold text-gray-600'>
      {initial}
    </span>
  );
}

export default function QnAList({
  questions,
  isLoading = false,
  selectedId,
  onSelect,
}: {
  questions: Question[];
  isLoading?: boolean;
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  if (isLoading) {
    return (
      <div className='space-y-2'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='rounded-lg border border-gray-100 p-4'>
            <Skeleton className='h-4 w-3/4 rounded-md' />
            <Skeleton className='mt-2 h-3 w-full rounded-md' />
            <Skeleton className='mt-3 h-3 w-1/3 rounded-md' />
          </div>
        ))}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className='rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-12 text-center text-sm text-gray-500'>
        현재 조건에 맞는 질문이 없습니다.
      </div>
    );
  }

  return (
    <div className='space-y-2'>
      {questions.map((question) => {
        const isSelected = selectedId === question.id;
        const authorName = getAuthorName(question.author);

        return (
          <button
            key={question.id}
            type='button'
            onClick={() => onSelect(question.id)}
            aria-pressed={isSelected}
            className={`block w-full rounded-lg border p-4 text-left transition ${
              isSelected
                ? 'border-gray-950 bg-gray-50 ring-2 ring-gray-950/10'
                : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <div className='flex flex-wrap items-center gap-1.5'>
              <Badge variant='secondary' className='font-semibold'>
                {getQuestionCategoryLabel(question.category)}
              </Badge>
              <QuestionStatusBadge status={question.status} />
            </div>

            <h3 className='mt-2.5 line-clamp-2 break-words text-sm font-semibold leading-5 text-gray-950 sm:text-[15px]'>
              {question.title}
            </h3>
            <p className='mt-1 line-clamp-2 break-words text-xs leading-5 text-gray-500'>
              {question.content}
            </p>

            <div className='mt-3 flex items-center justify-between gap-2 text-xs text-gray-400'>
              <span className='flex min-w-0 items-center gap-1.5'>
                <AuthorAvatar name={authorName} />
                <span className='truncate text-gray-600'>{authorName}</span>
              </span>
              <span className='shrink-0'>
                {formatDateTime(question.createdAt)}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
