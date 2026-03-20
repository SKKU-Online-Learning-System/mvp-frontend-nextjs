'use client';

import { getContent, postContentLike } from '@/app/api/content';
import { ContentDetailResponseType } from '@/types/content';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useState, useEffect } from 'react';
import { YoutubePlayer } from '../YoutubePlayer';
import { VideoInfo } from './VideoInfo';
import { toast } from 'sonner';

type Props = {
  id: number;
  refreshToken?: RequestCookie;
};

export function VideoContainer({ id, refreshToken }: Props) {
  const [content, setContent] = useState<ContentDetailResponseType>();

  const onClickLike = async () => {
    if (!refreshToken) {
      toast.error('로그인이 필요한 서비스입니다.');
      throw new Error('postContentLike api 에러 발생');
    }

    if (content?.id) {
      try {
        await postContentLike(content.id);

        setContent((prev) => {
          if (!prev) return prev;

          const newIsLike = !prev.isLike;

          return {
            ...prev,
            isLike: newIsLike,
            likeCount: newIsLike ? prev.likeCount + 1 : prev.likeCount - 1,
          };
        });
      } catch (err) {
        console.debug(err);
      }
    }
  };

  const youtubeId = content?.link.split('v=')[1];

  useEffect(() => {
    const fetchContent = async () => {
      const content = await getContent(id);
      setContent(content);
    };

    fetchContent();
  }, [id]);

  return (
    <>
      <div className="pt-logo px-4 md:px-8 lg:px-16 xl:px-24 mb-12 flex flex-col lg:flex-row gap-6 max-w-[1400px] mx-auto">

        {/* 메인 영상 */}
        <div className="flex w-full flex-col border shadow-sm pb-12 rounded-lg overflow-hidden">
          <YoutubePlayer youtubeId={youtubeId} />
          <VideoInfo content={content} onClickLike={onClickLike} />
        </div>

        {/* 사이드 (나중에 플레이리스트) */}
        {/* 
  <div className="w-full lg:w-[350px]">
    <PlaylistBox>...</PlaylistBox>
  </div>
  */}

      </div>
    </>
  );
}
