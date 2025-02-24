"use client";

import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";

import { patchContentLike } from "@/api/content";

type Props = {
  id: number;
  likeCount: number;
};

export function MainContentLike({ id, likeCount }: Props) {
  const [like, setLike] = useState(false);
  const onClickLike = async (event: React.MouseEvent) => {
    event.preventDefault();
    await patchContentLike(id);
    setLike((prev) => !prev);
  };
  return (
    <div className="flex flex-row items-center">
      <FaRegHeart color="gray" onClick={onClickLike} />
      <p className="ml-1 text-sm text-gray-400">
        {like ? likeCount + 1 : likeCount}
      </p>
    </div>
  );
}
