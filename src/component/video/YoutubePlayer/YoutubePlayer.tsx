"use client";

import YouTube from "react-youtube";

type Props = {
  youtubeId: string | undefined;
};

export function YoutubePlayer({ youtubeId }: Props) {
  return (
    <div className="h-[55vh] w-full overflow-hidden rounded-lg">
      {/* 추후 변경 예정 w-[60vw] */}
      <YouTube
        videoId={youtubeId}
        opts={{
          width: "100%",
          height: "100%",
        }}
        className="h-full w-full"
      />
    </div>
  );
}
