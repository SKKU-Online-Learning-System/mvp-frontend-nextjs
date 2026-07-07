'use client';

import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import { useCallback, useEffect, useRef } from 'react';

type Props = {
  youtubeId: string | undefined;
  startSeconds?: number;
  onProgress?: (payload: {
    progressSeconds: number;
    durationSeconds: number;
    completed: boolean;
  }) => void;
};

export function YoutubePlayer({
  youtubeId,
  startSeconds = 0,
  onProgress,
}: Props) {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  const stopProgressTimer = useCallback(() => {
    if (progressTimerRef.current) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, []);

  const reportProgress = useCallback(
    async (completed = false) => {
      const player = playerRef.current;

      if (!player || !onProgress) {
        return;
      }

      let currentTime = 0;
      let duration = 0;

      try {
        [currentTime, duration] = await Promise.all([
          player.getCurrentTime(),
          player.getDuration(),
        ]);
      } catch {
        return;
      }

      if (!Number.isFinite(currentTime) || !Number.isFinite(duration)) {
        return;
      }

      onProgress({
        progressSeconds: Math.max(0, Math.floor(currentTime)),
        durationSeconds: Math.max(0, Math.floor(duration)),
        completed,
      });
    },
    [onProgress]
  );

  const startProgressTimer = useCallback(() => {
    stopProgressTimer();
    progressTimerRef.current = window.setInterval(() => {
      reportProgress(false);
    }, 10000);
  }, [reportProgress, stopProgressTimer]);

  const handleReady = useCallback(
    async (event: YouTubeEvent) => {
      playerRef.current = event.target;

      if (startSeconds > 0) {
        await event.target.seekTo(startSeconds, true);
      }
    },
    [startSeconds]
  );

  const handlePause = useCallback(() => {
    stopProgressTimer();
    reportProgress(false);
  }, [reportProgress, stopProgressTimer]);

  const handleEnd = useCallback(() => {
    stopProgressTimer();
    reportProgress(true);
  }, [reportProgress, stopProgressTimer]);

  useEffect(() => {
    const reportBeforeLeaving = () => {
      reportProgress(false);
    };

    const reportWhenHidden = () => {
      if (document.visibilityState === 'hidden') {
        reportProgress(false);
      }
    };

    window.addEventListener('pagehide', reportBeforeLeaving);
    document.addEventListener('visibilitychange', reportWhenHidden);

    return () => {
      reportBeforeLeaving();
      stopProgressTimer();
      window.removeEventListener('pagehide', reportBeforeLeaving);
      document.removeEventListener('visibilitychange', reportWhenHidden);
    };
  }, [reportProgress, stopProgressTimer]);

  return (
    <div className='w-full aspect-video overflow-hidden rounded-t-lg'>
      <YouTube
        videoId={youtubeId}
        opts={{
          width: '100%',
          height: '100%',
          playerVars: startSeconds > 0 ? { start: startSeconds } : undefined,
        }}
        onReady={handleReady}
        onPlay={startProgressTimer}
        onPause={handlePause}
        onEnd={handleEnd}
        className='w-full h-full'
      />
    </div>
  );
}
