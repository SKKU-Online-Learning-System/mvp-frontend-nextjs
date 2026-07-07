'use client';

import {
  getContent,
  postContentLike,
  postContentWatchProgress,
} from '@/app/api/content';
import useCurrentUser from '@/hooks/useCurrentUser';
import { ContentDetailResponseType } from '@/types/content';
import { toast } from 'sonner';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { VideoComments } from '../Comments';
import { YoutubePlayer } from '../YoutubePlayer';
import { VideoInfo } from './VideoInfo';

type Props = {
  id: number;
  startSeconds?: number;
  refreshToken?: unknown;
};

const localWatchProgressStorageKey = (id: number) =>
  `content-watch-progress-${id}`;

const saveLocalWatchProgress = (
  content: ContentDetailResponseType,
  payload: {
    progressSeconds: number;
    durationSeconds: number;
    completed: boolean;
  }
) => {
  if (typeof window === 'undefined') {
    return;
  }

  const durationSeconds =
    payload.durationSeconds > 0 ? payload.durationSeconds : content.duration;
  const progressSeconds = Math.max(0, payload.progressSeconds);
  const progressPercent =
    durationSeconds > 0
      ? Math.min(100, Math.round((progressSeconds * 100) / durationSeconds))
      : 0;
  const key = localWatchProgressStorageKey(content.id);

  if (payload.completed || progressSeconds <= 0 || progressPercent >= 95) {
    localStorage.removeItem(key);
    return;
  }

  localStorage.setItem(
    key,
    JSON.stringify({
      id: content.id,
      title: content.title,
      author: content.author,
      thumbnailUrl: content.thumbnailUrl,
      link: content.link,
      youtubeVideoId: content.youtubeVideoId,
      progressSeconds,
      durationSeconds,
      progressPercent,
      watchedAt: new Date().toISOString(),
    })
  );
};

export function VideoContainer({ id, startSeconds = 0 }: Props) {
  const { currentUser } = useCurrentUser();
  const [content, setContent] = useState<ContentDetailResponseType>();

  const onClickLike = async () => {
    if (!currentUser) {
      toast.error('좋아요는 로그인 후 이용할 수 있습니다.');
      throw new Error('login required');
    }

    if (!content?.id) return;

    try {
      await postContentLike(content.id);

      setContent((prev) => {
        if (!prev) return prev;

        const nextIsLike = !prev.isLike;

        return {
          ...prev,
          isLike: nextIsLike,
          likeCount: nextIsLike ? prev.likeCount + 1 : prev.likeCount - 1,
        };
      });
    } catch (err) {
      console.debug(err);
    }
  };

  const youtubeId = useMemo(() => {
    if (content?.youtubeVideoId) {
      return content.youtubeVideoId;
    }

    if (!content?.link) {
      return undefined;
    }

    try {
      return new URL(content.link).searchParams.get('v') ?? undefined;
    } catch {
      return content.link.split('v=')[1]?.split('&')[0];
    }
  }, [content?.link, content?.youtubeVideoId]);

  const handleProgress = useCallback(
    (payload: {
      progressSeconds: number;
      durationSeconds: number;
      completed: boolean;
    }) => {
      if (!currentUser || !content?.id) {
        return;
      }

      if (currentUser.id === 'local-dev') {
        saveLocalWatchProgress(content, payload);
      }

      postContentWatchProgress(content.id, payload);
    },
    [content, currentUser]
  );

  useEffect(() => {
    const fetchContent = async () => {
      const nextContent = await getContent(id);
      setContent(nextContent);
    };

    fetchContent();
  }, [id]);

  return (
    <main className='pt-logo mx-auto mb-12 flex max-w-[1400px] flex-col gap-8 px-4 md:px-8 lg:px-16 xl:px-24'>
      <div className='flex w-full flex-col overflow-hidden rounded-lg border pb-12 shadow-sm'>
        <YoutubePlayer
          youtubeId={youtubeId}
          startSeconds={startSeconds}
          onProgress={handleProgress}
        />
        <VideoInfo content={content} onClickLike={onClickLike} />
      </div>
      <VideoComments contentId={id} />
    </main>
  );
}
