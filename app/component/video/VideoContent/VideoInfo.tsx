'use client';

import { postContentLike } from '@/app/api/content';
import { ContentDetailResponseType } from '@/app/type/content';
import { BsPersonCircle } from 'react-icons/bs';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useState } from 'react';
import { TagIcon } from '../../main/TagIcon';
import { VideoContentLike } from './VideoContentLike';

type Props = {
  content: ContentDetailResponseType | undefined;
  refreshToken?: RequestCookie;
};

export function VideoInfo({ content, refreshToken }: Props) {
  const [like, setLike] = useState(content?.isLike);
  const onClickLike = async () => {
    if (!refreshToken) {
      alert('로그인이 필요합니다!');
      return;
    }

    if (content?.id) {
      await postContentLike(content?.id);
    }
    setLike((prev) => !prev);
  };

  return (
    <div className='w-full'>
      {/* 추후 변경 예정 w-[60vw] */}
      <p className='py-4 text-2xl font-bold'>{content?.title}</p>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center'>
          <BsPersonCircle size={40} color='green' />
          <p className='ml-2 text-xl font-semibold'>{content?.author}</p>
        </div>
        <VideoContentLike
          onClickLike={onClickLike}
          isLike={like}
          likeCount={content?.likeCount}
        />
      </div>
      <div className='my-4 flex flex-col rounded-lg bg-gray-100 p-3'>
        <p className='font-semibold text-gray-700'>
          조회수 {content?.viewCount}회 {/*· 수강인원 {}명*/}
        </p>
        <p className='mt-2 text-gray-600'>{content?.description}</p>
      </div>
      <div className='flex flex-row gap-2 text-[1.1rem]'>
        {content?.tags.map((tag) => <TagIcon key={tag} text={tag} />)}
      </div>
    </div>
  );
}
