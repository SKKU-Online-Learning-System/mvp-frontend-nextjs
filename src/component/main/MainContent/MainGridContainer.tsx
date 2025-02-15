"use client";

import { useState, useEffect } from "react";

import { MainContentCard } from "@/component/main/MainContent";
import { getContents } from "@/api/content";

import { ContentType } from "@/type/content";

export function MainGridContainer() {
  const [contents, setContents] = useState<ContentType[]>();
  useEffect(() => {
    const fetchContents = async () => {
      const contents = await getContents();
      setContents(contents);
    };
    fetchContents();
  }, []);

  return (
    <div className="grid w-[calc(100vw-20rem)] gap-6 pr-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-8">
      {contents?.map((content) => (
        <MainContentCard key={content.id} content={content} />
      ))}
    </div>
  );
}
