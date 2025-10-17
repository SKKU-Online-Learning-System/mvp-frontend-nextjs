'use client';

import { ContentDetailResponseType } from '@/types/content';
import Image from 'next/image';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useState, useEffect } from 'react';
import { TextBookInfo } from './TextBookInfo';

type Props = {
  id: number;
  refreshToken?: RequestCookie;
};

const defaultTextBookDetailResponse: ContentDetailResponseType = {
  id: 1,
  type: 'BOOK',
  title: '컴퓨팅 사고와 문제해결',
  description: '',
  author: '황숙희·조미영',
  duration: 0,
  link: '/file/textbooks/컴퓨팅사고와문제해결.pdf',
  thumbnailUrl:
    'https://skb.skku.edu/_res/editor_image/2025/03/TtJktGAkFpjsdcagkuRs0.jpg',
  tags: [],
  viewCount: 0,
  likeCount: 0,
  isLike: false,
  youtubeVideoId: '',
};

export function TextBookContainer({ id }: Props) {
  const [content, setContent] = useState<ContentDetailResponseType>();

  useEffect(() => {
    setContent(defaultTextBookDetailResponse);
  }, [id]);

  return content ? (
    <>
      <div className='pt-logo px-48 mb-12 flex flex-row'>
        <div className='flex w-full flex-col border shadow-sm pb-12 rounded-lg'>
          <Image
            className='h-[60vh] w-full overflow-hidden rounded-t-lg'
            width={300}
            height={300}
            src={content.thumbnailUrl}
            alt='썸네일'
          ></Image>
          <TextBookInfo content={content} />
        </div>
        {/* <PlaylistBox>
    {Array.from({ length: 10 }, (_, index) => (
      <PlaylistCard key={index} />
    ))}
  </PlaylistBox> */}
      </div>
    </>
  ) : (
    <></>
  );
}
