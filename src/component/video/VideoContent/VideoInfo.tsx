import { BsPersonCircle } from "react-icons/bs";

import { TagIcon } from "@/component/main/TagIcon";
import { VideoContentLike } from "@/component/video/VideoContent";
import { ContentDetailResponseType } from "@/type/content";

type Props = {
  content: ContentDetailResponseType | undefined;
};

export function VideoInfo({ content }: Props) {
  return (
    <div className="w-full">
      {/* 추후 변경 예정 w-[60vw] */}
      <p className="py-4 text-2xl font-bold">{content?.title}</p>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <BsPersonCircle size={40} color="green" />
          <p className="ml-2 text-xl font-semibold">{content?.author}</p>
        </div>
        <VideoContentLike
          id={content?.id}
          likeCount={content?.likeCount}
          isLike={content?.isLike}
        />
      </div>
      <div className="my-4 flex flex-col rounded-lg bg-gray-100 p-3">
        <p className="font-semibold text-gray-700">
          조회수 {content?.viewCount}회 {/*· 수강인원 {}명*/}
        </p>
        <p className="mt-2 text-gray-600">{content?.description}</p>
      </div>
      <div className="flex flex-row gap-2 text-[1.1rem]">
        {content?.tags.map((tag) => <TagIcon key={tag} text={tag} />)}
      </div>
    </div>
  );
}
