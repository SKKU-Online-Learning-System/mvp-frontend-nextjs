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
    <div className="pt-logo px-4 md:px-8 lg:px-16 xl:px-24 mb-12 flex flex-col lg:flex-row gap-6 max-w-[1400px] mx-auto">

      {/* 메인 카드 */}
      <div className="flex w-full flex-col border shadow-sm pb-12 rounded-lg overflow-hidden">

        {/* 썸네일 */}
        <div className="w-full flex justify-center bg-gray-100">
          <div className="relative w-full max-w-[400px] aspect-[3/4]">
            <Image
              src={content.thumbnailUrl}
              alt="썸네일"
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
        </div>

        <TextBookInfo content={content} />
      </div>

      {/* 사이드 영역 (추후) */}
      {/*
      <div className="w-full lg:w-[350px]">
        ...
      </div>
      */}

    </div>
  ) : null;
}
