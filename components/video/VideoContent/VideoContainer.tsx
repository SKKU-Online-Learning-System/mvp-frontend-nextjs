'use client';

import { getContent, postContentLike } from '@/app/api/content';
import { ContentDetailResponseType } from '@/types/content';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useState, useEffect } from 'react';
import { YoutubePlayer } from '../YoutubePlayer';
import { VideoInfo } from './VideoInfo';

type Props = {
  id: number;
  refreshToken?: RequestCookie;
};

export function VideoContainer({ id }: Props) {
  const [content, setContent] = useState<ContentDetailResponseType>();
  const [like, setLike] = useState(content?.isLike ?? false);

  const onClickLike = async () => {
    if (content?.id) {
      try {
        await postContentLike(content?.id);
        setLike((prev) => !prev);
      } catch (err) {
        if (err instanceof Error) {
          console.debug(err);
        }
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
  }, [id, like]);

  return (
    <>
      <div className='pt-logo px-48 mb-12 flex flex-row'>
        <div className='flex w-full flex-col border shadow-sm pb-12 rounded-lg'>
          <YoutubePlayer youtubeId={youtubeId} />
          <VideoInfo content={content} onClickLike={onClickLike} />
        </div>
        {/* <PlaylistBox>
    {Array.from({ length: 10 }, (_, index) => (
      <PlaylistCard key={index} />
    ))}
  </PlaylistBox> */}
      </div>
    </>
  );
}
