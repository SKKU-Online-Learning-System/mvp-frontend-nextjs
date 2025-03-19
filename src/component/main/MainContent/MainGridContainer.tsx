"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { MainContentCard } from "@/component/main/MainContent";
import { ContentCategory } from "@/component/main/MainContent";
import { getContents } from "@/api/content";

import { CategoryKey } from "./category";
import { ContentResponseType } from "@/type/content";

export function MainGridContainer() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as CategoryKey | null;

  const [contents, setContents] = useState<ContentResponseType[]>();
  useEffect(() => {
    const fetchContents = async () => {
      const contents = await getContents();
      setContents(contents);
    };
    fetchContents();
  }, []);

  return (
    <div className="mx-auto ml-[16rem] flex w-full flex-col gap-4 pr-12 max-sm:ml-[10rem] max-sm:pr-6">
      <ContentCategory category={category} />
      <div className="mb-12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-8">
        {contents
          ?.filter(
            (content) =>
              category === null ||
              new RegExp(category, "i").test(content.title),
          )
          .map((content) => (
            <MainContentCard key={content.id} content={content} />
          ))}
      </div>
    </div>
  );
}
