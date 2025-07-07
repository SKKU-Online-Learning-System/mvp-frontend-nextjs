'use client';

import { FaHeart, FaRegHeart } from 'react-icons/fa';

type Props = {
  onClickLike: () => Promise<void>;
  isLike: boolean | undefined;
};

export function VideoContentLike({ onClickLike, isLike }: Props) {
  return (
    <div className='flex flex-row items-center'>
      {isLike ? (
        <FaHeart
          color='green'
          onClick={onClickLike}
          size={30}
          className='cursor-pointer'
        />
      ) : (
        <FaRegHeart
          color='gray'
          onClick={onClickLike}
          size={30}
          className='cursor-pointer'
        />
      )}
    </div>
  );
}
