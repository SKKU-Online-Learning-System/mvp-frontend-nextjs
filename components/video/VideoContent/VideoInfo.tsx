'use client';

import { postContentLike } from '@/app/api/content';
import { ContentDetailResponseType } from '@/types/content';
import { BsPersonCircle } from 'react-icons/bs';
import { useState } from 'react';
import { TagIcon } from '../../main/TagIcon';
import { VideoContentLike } from './VideoContentLike';

type Props = {
  content: ContentDetailResponseType | undefined;
};

export function VideoInfo({ content }: Props) {
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
