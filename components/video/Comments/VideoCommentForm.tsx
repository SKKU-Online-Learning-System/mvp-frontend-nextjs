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

export const commentInputClass =
  'w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-xs transition placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-[3px] focus:ring-gray-950/10';

export const commentPrimaryButtonClass =
  'inline-flex min-h-9 items-center justify-center rounded-md bg-gray-950 px-4 py-1.5 text-sm font-semibold text-white shadow-xs transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50';

export const commentSecondaryButtonClass =
  'inline-flex min-h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-xs transition hover:bg-gray-50';

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
          ? 'rounded-lg border border-gray-200 bg-gray-50 p-3'
          : 'rounded-lg border border-gray-200 bg-white p-4 shadow-xs sm:p-5'
      }
    >
      <div className='mb-3 grid gap-1.5'>
        <div className='flex items-baseline gap-2'>
          <label className='text-sm font-semibold text-gray-800'>
            작성자 이름
          </label>
          <span className='text-xs text-gray-400'>댓글에 표시됩니다.</span>
        </div>
        <input
          type='text'
          maxLength={100}
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder='닉네임'
          className={`${commentInputClass} min-h-10 sm:max-w-xs`}
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
        className={`${commentInputClass} min-h-24 resize-y py-3 leading-6`}
      />
      <div className='mt-3 flex items-center justify-between gap-2'>
        <span className='text-xs text-gray-400'>
          {comment.length.toLocaleString('ko-KR')} / 2,000
        </span>
        <div className='flex gap-2'>
          {onCancel && (
            <button
              type='button'
              onClick={onCancel}
              className={commentSecondaryButtonClass}
            >
              취소
            </button>
          )}
          <button
            type='button'
            disabled={isSubmitting}
            onClick={submit}
            className={commentPrimaryButtonClass}
          >
            {isSubmitting ? '등록 중...' : parentId ? '답글 등록' : '댓글 등록'}
          </button>
        </div>
      </div>
    </div>
  );
}
