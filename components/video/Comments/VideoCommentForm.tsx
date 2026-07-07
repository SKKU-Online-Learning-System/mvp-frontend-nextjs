'use client';

import { createVideoComment } from '@/app/api/videoComment';
import useVideoCommentAuthor from '@/hooks/useVideoCommentAuthor';
import { toast } from 'sonner';
import { useState } from 'react';

type Props = {
  contentId: number;
  parentId?: number;
  onCancel?: () => void;
  onCreated: (commentId: number, ownerToken: string) => void;
};

export default function VideoCommentForm({
  contentId,
  parentId,
  onCancel,
  onCreated,
}: Props) {
  const { author, setAuthor } = useVideoCommentAuthor();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    const trimmedAuthor = author.trim();
    const trimmedComment = comment.trim();

    if (!trimmedAuthor) {
      toast.error('작성자 이름을 입력해주세요.');
      return;
    }
    if (!trimmedComment) {
      toast.error(
        parentId ? '답글 내용을 입력해주세요.' : '댓글 내용을 입력해주세요.'
      );
      return;
    }

    setIsSubmitting(true);
    const created = await createVideoComment(contentId, {
      author: trimmedAuthor,
      content: trimmedComment,
      parentId,
    });
    setIsSubmitting(false);

    if (!created) return;

    setComment('');
    onCreated(created.id, created.ownerToken);
  };

  return (
    <div
      className={
        parentId
          ? 'rounded-lg bg-slate-50 p-3'
          : 'rounded-xl border border-gray-200 bg-white p-4 sm:p-5'
      }
    >
      <div className='mb-2'>
        <label className='mb-1 block text-sm font-medium text-slate-700'>
          작성자 이름
        </label>
        <input
          type='text'
          maxLength={100}
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder='작성자 이름'
          className='min-h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:max-w-xs'
        />
      </div>
      <textarea
        rows={parentId ? 3 : 4}
        maxLength={2000}
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder={
          parentId ? '답글을 입력해주세요.' : '영상에 대한 댓글을 남겨주세요.'
        }
        className='min-h-24 w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <div className='mt-2 flex justify-end gap-2'>
        {onCancel && (
          <button
            type='button'
            onClick={onCancel}
            className='min-h-9 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-gray-50'
          >
            취소
          </button>
        )}
        <button
          type='button'
          disabled={isSubmitting}
          onClick={submit}
          className='min-h-9 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {isSubmitting ? '등록 중...' : parentId ? '답글 등록' : '댓글 등록'}
        </button>
      </div>
    </div>
  );
}
