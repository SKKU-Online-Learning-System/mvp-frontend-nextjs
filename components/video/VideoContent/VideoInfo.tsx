'use client';

import { postContentLike } from '@/app/api/content';
import { ContentDetailResponseType } from '@/types/content';
import { BsPersonCircle } from 'react-icons/bs';
import { toast } from 'sonner';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useState } from 'react';
import { TagIcon } from '../../main/TagIcon';
import { VideoContentLike } from './VideoContentLike';

type Props = {
  content: ContentDetailResponseType | undefined;
  refreshToken?: RequestCookie;
};

export function VideoInfo({ content, refreshToken }: Props) {
  const [like, setLike] = useState(content?.isLike ?? false);

  const onClickLike = async () => {
    if (!refreshToken) {
      toast.error('로그인이 필요한 서비스입니다.');
      return;
    }

    if (content?.id) {
      await postContentLike(content?.id);
    }
    setLike((prev) => !prev);
  };

  return (
    <div className='w-full px-8'>
      {/* 추후 변경 예정 w-[60vw] */}
      <p className='py-4 text-2xl font-bold'>{content?.title}</p>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-1'>
          <BsPersonCircle size={30} color='gray' />
          <p className='ml-2 text-xl font-semibold'>{content?.author}</p>
        </div>
        <VideoContentLike onClickLike={onClickLike} isLike={like} />
      </div>
      <div className='my-4 flex flex-col rounded-lg bg-gray-100 p-3'>
        <div className='flex gap-3'>
          <p className='font-semibold text-gray-700'>
            조회수 {content?.viewCount}회 {/*· 수강인원 {}명*/}
          </p>
          <p className='font-semibold text-gray-700'>
            좋아요 {content?.likeCount}회 {/*· 수강인원 {}명*/}
          </p>
        </div>
        <p className='mt-2 text-gray-600'>{content?.description}</p>
      </div>
      <div className='flex flex-wrap gap-2 text-[1.1rem]'>
        {content?.tags.map((tag) => <TagIcon key={tag} text={tag} />)}
      </div>
    </div>
  );
}
