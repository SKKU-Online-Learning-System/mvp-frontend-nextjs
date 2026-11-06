'use client';

import { getVideoComments } from '@/app/api/videoComment';
import useVideoCommentOwnerTokens from '@/hooks/useVideoCommentOwnerTokens';
import { VideoComment } from '@/types/videoComment';
import { MessageSquareText } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import VideoCommentForm from './VideoCommentForm';
import VideoCommentItem from './VideoCommentItem';

export default function VideoComments({ contentId }: { contentId: number }) {
  const [comments, setComments] = useState<VideoComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getOwnerToken, removeOwnerToken, setOwnerToken } =
    useVideoCommentOwnerTokens();

  const load = useCallback(async () => {
    const nextComments = await getVideoComments(contentId);
    setComments(nextComments);
    setIsLoading(false);
  }, [contentId]);

  useEffect(() => {
    void load();
  }, [load]);

  const commentCount = comments.reduce(
    (count, comment) => count + 1 + comment.replies.length,
    0
  );

  return (
    <section className='w-full'>
      <div className='mb-4 flex items-center gap-3 border-b pb-4'>
        <div className='rounded-lg border border-emerald-100 bg-emerald-50 p-2 text-emerald-700'>
          <MessageSquareText className='size-4' />
        </div>
        <h2 className='text-lg font-bold text-gray-950 sm:text-xl'>댓글</h2>
        <span className='rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600'>
          {commentCount.toLocaleString('ko-KR')}
        </span>
      </div>

      <div className='mb-5'>
        <VideoCommentForm
          contentId={contentId}
          onCreated={(commentId, token) => {
            setOwnerToken(commentId, token);
            void load();
          }}
        />
      </div>

      {isLoading ? (
        <div className='rounded-lg border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-400'>
          댓글을 불러오는 중입니다.
        </div>
      ) : comments.length === 0 ? (
        <div className='flex flex-col items-center gap-2 rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center'>
          <MessageSquareText className='size-5 text-gray-300' />
          <p className='text-sm font-semibold text-gray-600'>
            아직 댓글이 없습니다.
          </p>
          <p className='text-xs text-gray-400'>
            영상을 보고 느낀 점이나 궁금한 점을 첫 댓글로 남겨보세요.
          </p>
        </div>
      ) : (
        <div className='space-y-3'>
          {comments.map((comment) => (
            <VideoCommentItem
              key={comment.id}
              comment={comment}
              contentId={contentId}
              getOwnerToken={getOwnerToken}
              onChanged={load}
              removeOwnerToken={removeOwnerToken}
              setOwnerToken={setOwnerToken}
            />
          ))}
        </div>
      )}
    </section>
  );
}
