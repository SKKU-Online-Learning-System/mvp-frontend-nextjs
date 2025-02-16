import Link from "next/link";

import Image from "next/image";

import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

import { TagIcon } from "@/component/main/TagIcon";
import { ContentType } from "@/type/content";

type Props = {
  content: ContentType;
};

export function MainContentCard({ content }: Props) {
  const time = 3;
  const heart_count = 123;

  const getLink = () => {
    switch (content.type) {
      case "YOUTUBE":
        return `/video?id=${content.id}`;
      case "INFLEARN":
        return content.link;
      default:
        return "/";
    }
  };

  return (
    <Link
      href={getLink()}
      className="flex w-full flex-col"
      target={`${content.type === "INFLEARN" ? "_blank" : ""}`}
    >
      <Image
        className="h-[10rem] w-full rounded-lg bg-slate-300"
        width={1000}
        height={1000}
        src={content.thumbnailUrl}
        alt="썸네일"
      ></Image>
      <div className="my-2 flex flex-row items-center justify-between">
        <BsPersonCircle size={35} color="gray" />
        <p className="ml-2 line-clamp-2 w-[85%] font-semibold">
          {content.title}
        </p>
      </div>
      <p className="line-clamp-3 text-sm text-gray-700">
        {content.description}
      </p>
      <div className="my-1 flex flex-row justify-between">
        <p className="text-sm text-gray-400">약 {time}시간 소요</p>
        <div className="flex flex-row items-center">
          <FaRegHeart color="gray" />
          <p className="ml-1 text-sm text-gray-400">{heart_count}</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-1 text-[0.8rem]">
        {content.tags.map((tag) => (
          <TagIcon key={tag} text={tag} />
        ))}
      </div>
    </Link>
  );
}
