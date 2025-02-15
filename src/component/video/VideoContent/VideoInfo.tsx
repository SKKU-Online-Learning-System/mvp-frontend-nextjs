import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

import { TagIcon } from "@/component/main/TagIcon";
import { ContentDetailType } from "@/type/content";

type Props = {
  content: ContentDetailType | undefined;
};

export function VideoInfo({ content }: Props) {
  const heart_count = 123;
  const view_count = 1000;
  const student_count = 103;
  return (
    <div className="w-full">
      {/* 추후 변경 예정 w-[60vw] */}
      <p className="py-4 text-2xl font-bold">{content?.title}</p>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <BsPersonCircle size={40} color="green" />
          <p className="ml-2 text-xl font-semibold">{content?.author}</p>
        </div>
        <div className="flex flex-row items-center">
          <FaRegHeart color="green" size={35} />
          <p className="ml-2 text-xl font-semibold">{heart_count}</p>
        </div>
      </div>
      <div className="my-4 flex flex-col rounded-lg bg-gray-100 p-3">
        <p className="font-semibold text-gray-700">
          조회수 {view_count}회 · 수강인원 {student_count}명{" "}
        </p>
        <p className="mt-2 text-gray-600">{content?.description}</p>
      </div>
      <div className="flex flex-row gap-2 text-[1.1rem]">
        {content?.tags.map((tag) => <TagIcon key={tag} text={tag} />)}
      </div>
    </div>
  );
}
