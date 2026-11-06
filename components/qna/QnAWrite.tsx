'use client';

import { createQuestion } from '@/app/api/qna';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useQnAAuthor from '@/hooks/useQnAAuthor';
import useQnAOwnerTokens from '@/hooks/useQnAOwnerTokens';
import { QuestionCategory } from '@/types/qna';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { QUESTION_CATEGORY_OPTIONS } from '@/lib/qnaCategory';

const inputClass =
  'min-h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-xs transition placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-[3px] focus:ring-gray-950/10';

export default function QnAWrite() {
  const router = useRouter();
  const { author, setAuthor } = useQnAAuthor();
  const { setQuestionOwnerToken } = useQnAOwnerTokens();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<QuestionCategory>('GENERAL');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;

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

    setIsSubmitting(true);

    try {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 pb-16 sm:px-6'>
      <div className='flex items-start gap-3 border-b pb-6'>
        <div>
          <h1 className='text-2xl font-bold text-gray-950 sm:text-3xl'>
            질문 작성
          </h1>
          <p className='mt-1 text-sm text-gray-500'>
            분야를 고르고 제목과 내용을 입력하면 질문 게시판에 등록됩니다.
          </p>
        </div>
      </div>

      <section className='rounded-lg border bg-white p-5 shadow-xs sm:p-6'>
        <div className='grid gap-6'>
          <Field label='작성자' hint='게시글에 표시할 닉네임입니다.'>
            <input
              type='text'
              className={inputClass}
              placeholder='닉네임'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Field>

          <Field label='분야'>
            <div className='flex flex-wrap gap-2'>
              {QUESTION_CATEGORY_OPTIONS.map((option) => (
                <Badge
                  key={option.value}
                  variant={category === option.value ? 'default' : 'secondary'}
                  className='h-8 cursor-pointer px-3 font-semibold'
                  onClick={() => setCategory(option.value)}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </Field>

          <Field label='제목'>
            <input
              type='text'
              className={inputClass}
              placeholder='질문 제목을 입력해주세요'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>

          <Field label='내용'>
            <textarea
              className={`${inputClass} min-h-[240px] leading-6 sm:min-h-[320px]`}
              placeholder='상황, 시도해 본 것, 궁금한 점을 자세히 적을수록 좋은 답변을 받을 수 있어요.'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Field>
        </div>
      </section>

      <div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
        <Button
          type='button'
          variant='outline'
          className='h-10 px-5'
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          type='button'
          className='h-10 px-5'
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          등록
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className='grid gap-2'>
      <div className='flex items-baseline gap-2'>
        <label className='text-sm font-semibold text-gray-800'>{label}</label>
        {hint && <span className='text-xs text-gray-400'>{hint}</span>}
      </div>
      {children}
    </div>
  );
}
