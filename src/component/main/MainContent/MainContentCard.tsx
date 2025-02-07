import Link from "next/link";

import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

import { TagIcon } from "@/component/main/TagIcon";

// {
// 	"id": 2,
// 	"type": "youtube",
// 	"title": "Practical Testing: 실용적인 테스트 가이드",
// 	"description": "이 강의를 통해 실무에서 개발하는 방식 그대로...",
// 	"author": "박우빈",
// 	"link": "https://www.youtube.com/watch?v=_yoKvywDpE0"
// 	"thumbnail": "https://cdn.inflearn.com/public/courses/329295/cover/91207c2c-36ad-4c66-af8e-990193224b8a/329295.png",
// 	"tags": ["JPA", "JUnit", "소프트웨어 공학"]
// }

export function MainContentCard() {
  const id = 2;
  const type = "youtube";
  const title = "성대의 성대한 특강";
  const description =
    "성균관대 소프트웨어융합대학에서 일반인을 대상으로 제공하는 IT특강입니다. 다양한 강의가 많이 준비되어 있습니다. 많은 참여 부탁드립니다.";
  const author = "김형식";
  const link = "https://www.youtube.com/watch?v=_yoKvywDpE0";
  const thumbnail =
    "https://cdn.inflearn.com/public/courses/329295/cover/91207c2c-36ad-4c66-af8e-990193224b8a/329295.png";
  const tags = ["React", "Spring", "AWS"];

  const time = 3;
  const heart_count = 123;

  return (
    <Link href="/video?youtubeId=_yoKvywDpE0" className="flex w-full flex-col">
      <div className="h-[10rem] w-full rounded-lg bg-slate-300"></div>
      <div className="my-2 flex flex-row items-end">
        <BsPersonCircle size={28} color="gray" />
        <p className="ml-2 font-semibold">{title}</p>
      </div>
      <p className="line-clamp-2 text-sm text-gray-700">{description}</p>
      <div className="my-1 flex flex-row justify-between">
        <p className="text-sm text-gray-400">약 {time}시간 소요</p>
        <div className="flex flex-row items-center">
          <FaRegHeart color="gray" />
          <p className="ml-1 text-sm text-gray-400">{heart_count}</p>
        </div>
      </div>
      <div className="flex flex-row gap-1 text-[0.8rem]">
        {tags.map((tag) => (
          <TagIcon key={tag} text={tag} />
        ))}
      </div>
    </Link>
  );
}
