'use client';

import { FaHeart, FaRegHeart } from 'react-icons/fa';

type Props = {
  onClickLike: () => Promise<void>;
  isLike: boolean | undefined;
  likeCount: number | undefined;
};

export function VideoContentLike({ onClickLike, isLike, likeCount }: Props) {
  return (
    <div className='flex flex-row items-center'>
      {isLike ? (
        <FaHeart
          color='green'
          onClick={onClickLike}
          size={35}
          className='cursor-pointer'
        />
      ) : (
        <FaRegHeart
          color='gray'
          onClick={onClickLike}
          size={35}
          className='cursor-pointer'
        />
      )}
      <p className='ml-2 text-xl font-semibold'>{likeCount}</p>
    </div>
  );
}
