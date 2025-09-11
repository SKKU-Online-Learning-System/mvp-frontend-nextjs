'use client';

import { getContent } from '@/app/api/content';
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
      <div className='pt-logo px-48 mb-12 flex flex-row'>
        <div className='flex w-full flex-col border shadow-sm pb-12 rounded-lg'>
          <YoutubePlayer youtubeId={youtubeId} />
          <VideoInfo content={content} />
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
