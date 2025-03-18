"use client";

import { useState, useEffect } from "react";

import { getContent } from "@/api/content";
import { YoutubePlayer } from "@/component/video/YoutubePlayer";
import { VideoInfo } from "@/component/video/VideoContent";

import { ContentDetailResponseType } from "@/type/content";

type Props = {
  id: number;
};

export function VideoContainer({ id }: Props) {
  const [content, setContent] = useState<ContentDetailResponseType>();
  const youtubeId = content?.link.split("v=")[1];

  useEffect(() => {
    const fetchContent = async () => {
      const content = await getContent(id);
      setContent(content);
    };
    fetchContent();
  }, [id]);

  return (
    <>
      <div className="mb-12 flex flex-row">
        <div className="flex w-full flex-col px-12">
          <YoutubePlayer youtubeId={youtubeId} />
          <VideoInfo content={content} />
        </div>
        {/* <PlaylistBox>
    {Array.from({ length: 10 }, (_, index) => (
      <PlaylistCard key={index} />
    ))}
  </PlaylistBox> */}
      </div>
    </>
  );
}
