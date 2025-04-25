import Image from "next/image";

import { TextBookResponseType } from "@/type/textbook";
import Link from "next/link";

type Props = {
  textbook: TextBookResponseType;
};

export function TextBookCard({ textbook }: Props) {
  return (
    <Link href={`/textbook/${textbook.id}`} className="flex w-full flex-col">
      <Image
        className="h-[10rem] w-full rounded-lg bg-slate-300"
        width={1000}
        height={1000}
        src={textbook.thumbnailUrl}
        alt="썸네일"
      ></Image>
      <p className="line-clamp-2 w-[85%] font-semibold">{textbook.title}</p>
      <div className="line-clamp-3 break-all text-sm text-gray-700">
        {textbook.description}
      </div>
      <div className="my-1 flex flex-row justify-between">
        <p className="text-sm text-gray-400">{textbook.author}</p>
        {/* <p className="text-sm text-gray-400">조회수 {textbook.viewCount}</p> */}
      </div>
    </Link>
  );
}
