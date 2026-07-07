'use client';

import { deleteVideoComment, updateVideoComment } from '@/app/api/videoComment';
import { VideoComment } from '@/types/videoComment';
import { useState } from 'react';
import { formatDateTime } from '@/lib/date';
import VideoCommentForm from './VideoCommentForm';

type Props = {
  comment: VideoComment;
  contentId: number;
  getOwnerToken: (commentId: number) => string | null;
  isReply?: boolean;
  onChanged: () => Promise<void>;
  removeOwnerToken: (commentId: number) => void;
  setOwnerToken: (commentId: number, token: string) => void;
};

export default function VideoCommentItem({
  comment,
  contentId,
  getOwnerToken,
  isReply = false,
  onChanged,
  removeOwnerToken,
  setOwnerToken,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [draft, setDraft] = useState(comment.content ?? '');
  const ownerToken = getOwnerToken(comment.id);

  const saveEdit = async () => {
    const trimmed = draft.trim();
    if (!ownerToken || !trimmed) return;

    const success = await updateVideoComment(
      contentId,
      comment.id,
      { content: trimmed },
      ownerToken
    );
    if (success) {
      setIsEditing(false);
      await onChanged();
    }
  };

  const remove = async () => {
    if (!ownerToken || !window.confirm('댓글을 삭제하시겠습니까?')) return;

    const success = await deleteVideoComment(contentId, comment.id, ownerToken);
    if (success) {
      removeOwnerToken(comment.id);
      await onChanged();
    }
  };

  return (
    <article
      className={
        isReply
          ? 'rounded-lg border border-gray-100 bg-slate-50 p-3 sm:p-4'
          : 'rounded-xl border border-gray-200 bg-white p-4 sm:p-5'
      }
    >
      {comment.deleted ? (
        <p className='text-sm italic text-gray-400'>삭제된 댓글입니다.</p>
      ) : isEditing ? (
        <div className='space-y-2'>
          <textarea
            rows={3}
            maxLength={2000}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className='min-h-24 w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <div className='flex justify-end gap-2'>
            <button
              type='button'
              onClick={() => {
                setDraft(comment.content ?? '');
                setIsEditing(false);
              }}
              className='min-h-9 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-gray-50'
            >
              취소
            </button>
            <button
              type='button'
              onClick={saveEdit}
              className='min-h-9 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700'
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <p className='whitespace-pre-wrap break-words text-sm leading-6 text-slate-700 sm:text-base'>
          {comment.content}
        </p>
      )}

      <div className='mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400'>
        <div className='flex flex-wrap items-center gap-2'>
          {!comment.deleted && <span>{comment.author}</span>}
          {!comment.deleted && <span>•</span>}
          <span>{formatDateTime(comment.createdAt)}</span>
        </div>

        {!comment.deleted && !isEditing && (
          <div className='flex items-center gap-1'>
            {!isReply && (
              <button
                type='button'
                onClick={() => setIsReplying((previous) => !previous)}
                className='rounded-md px-2 py-1 font-medium text-slate-600 hover:bg-gray-100'
              >
                답글
              </button>
            )}
            {ownerToken && (
              <>
                <button
                  type='button'
                  onClick={() => {
                    setDraft(comment.content ?? '');
                    setIsEditing(true);
                  }}
                  className='rounded-md px-2 py-1 font-medium text-slate-600 hover:bg-gray-100'
                >
                  수정
                </button>
                <button
                  type='button'
                  onClick={remove}
                  className='rounded-md px-2 py-1 font-medium text-red-500 hover:bg-red-50'
                >
                  삭제
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {isReplying && (
        <div className='mt-3'>
          <VideoCommentForm
            contentId={contentId}
            parentId={comment.id}
            onCancel={() => setIsReplying(false)}
            onCreated={(commentId, token) => {
              setOwnerToken(commentId, token);
              setIsReplying(false);
              void onChanged();
            }}
          />
        </div>
      )}

      {!isReply && comment.replies.length > 0 && (
        <div className='mt-3 space-y-2 border-l-2 border-slate-200 pl-3 sm:pl-5'>
          {comment.replies.map((reply) => (
            <VideoCommentItem
              key={reply.id}
              comment={reply}
              contentId={contentId}
              getOwnerToken={getOwnerToken}
              isReply
              onChanged={onChanged}
              removeOwnerToken={removeOwnerToken}
              setOwnerToken={setOwnerToken}
            />
          ))}
        </div>
      )}
    </article>
  );
}
