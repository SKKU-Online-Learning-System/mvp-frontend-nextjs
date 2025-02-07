import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

import { TagIcon } from "@/component/main/TagIcon";

export function VideoInfo() {
  // const id = 2;
  // const type = "youtube";
  const title = "성대의 성대한 특강";
  const description =
    "성균관대 소프트웨어융합대학에서 일반인을 대상으로 제공하는 IT특강입니다. 다양한 강의가 많이 준비되어 있습니다. 많은 참여 부탁드립니다. 성균관대 소프트웨어융합대학에서 일반인을 대상으로 제공하는 IT특강입니다. 다양한 강의가 많이 준비되어 있습니다. 많은 참여 부탁드립니다.";
  const author = "김형식 교수님";
  // const link = "https://www.youtube.com/watch?v=_yoKvywDpE0";
  // const thumbnail = "https://cdn.inflearn.com/public/courses/329295/cover/91207c2c-36ad-4c66-af8e-990193224b8a/329295.png";
  const tags = ["React", "Spring", "AWS"];

  // const time = 3;
  const heart_count = 123;
  const view_count = 1000;
  const student_count = 103;
  return (
    <div className="w-[60vw]">
      <p className="py-4 text-2xl font-bold">{title}</p>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <BsPersonCircle size={40} color="green" />
          <p className="ml-2 text-xl font-semibold">{author}</p>
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
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      <div className="flex flex-row gap-2 text-[1.1rem]">
        {tags.map((tag) => (
          <TagIcon key={tag} text={tag} />
        ))}
      </div>
    </div>
  );
}
