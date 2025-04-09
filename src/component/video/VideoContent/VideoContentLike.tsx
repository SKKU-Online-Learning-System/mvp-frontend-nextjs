"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { postContentLike } from "@/api/content";

type Props = {
  id: number | undefined;
  isLike: boolean | undefined;
  likeCount: number | undefined;
};

export function VideoContentLike({ id, isLike, likeCount }: Props) {
  const [like, setLike] = useState(isLike);
  const onClickLike = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (id) {
      await postContentLike(id);
    }
    setLike((prev) => !prev);
  };
  return (
    <div className="flex flex-row items-center">
      {like ? (
        <FaHeart color="green" onClick={onClickLike} size={35} />
      ) : (
        <FaRegHeart color="gray" onClick={onClickLike} size={35} />
      )}
      <p className="ml-2 text-xl font-semibold">{likeCount}</p>
    </div>
  );
}
