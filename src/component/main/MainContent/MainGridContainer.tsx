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
    <div className="my-container">
      <ContentCategory category={category} />
      <div className="my-grid">
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
