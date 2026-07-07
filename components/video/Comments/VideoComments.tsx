'use client';

import { getVideoComments } from '@/app/api/videoComment';
import useVideoCommentOwnerTokens from '@/hooks/useVideoCommentOwnerTokens';
import { VideoComment } from '@/types/videoComment';
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
      <h2 className='mb-4 text-xl font-bold text-slate-900 sm:text-2xl'>
        댓글 {commentCount}
      </h2>

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
        <div className='rounded-xl border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-400'>
          댓글을 불러오는 중입니다.
        </div>
      ) : comments.length === 0 ? (
        <div className='rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-400'>
          아직 댓글이 없습니다. 첫 댓글을 남겨보세요.
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
