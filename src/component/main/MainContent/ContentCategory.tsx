import Link from "next/link";

import { CategoryKey, categoryInfo } from "./category";

type Props = {
  category: CategoryKey | null;
};

export function ContentCategory({ category }: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-row flex-wrap gap-4">
        <Link
          href={`/`}
          className={`${category == null ? "text-green-700" : ""} text-[1.1rem] font-semibold text-gray-500`}
        >
          #전체
        </Link>
        {Object.keys(categoryInfo).map((key) => (
          <Link
            href={`/?category=${key}`}
            className={`${key == category ? "text-green-700" : ""} text-[1.1rem] font-semibold text-gray-500`}
            key={key}
          >
            #{key}
          </Link>
        ))}
      </div>
      <p className="text-[0.9rem] text-gray-500">
        {category ? categoryInfo[category] : ""}
      </p>
    </div>
  );
}
