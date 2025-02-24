"use client";

import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import { patchContentLike } from "@/api/content";

type Props = {
  id: number;
  isLike: boolean;
  likeCount: number;
};

export function MainContentLike({ id, isLike, likeCount }: Props) {
  const [like, setLike] = useState(isLike);
  const onClickLike = async (event: React.MouseEvent) => {
    event.preventDefault();
    await patchContentLike(id);
    setLike((prev) => !prev);
  };
  return (
    <div className="flex flex-row items-center">
      {like ? (
        <FaHeart color="green" onClick={onClickLike} />
      ) : (
        <FaRegHeart color="gray" onClick={onClickLike} />
      )}
      <p className="ml-1 text-sm text-gray-400">
        {like ? likeCount + 1 : likeCount}
      </p>
    </div>
  );
}
