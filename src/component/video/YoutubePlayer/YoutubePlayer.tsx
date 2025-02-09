"use client";

import YouTube from "react-youtube";

type Props = {
  youtubeId: string;
};

export function YoutubePlayer({ youtubeId }: Props) {
  return (
    <div className="h-[55vh] w-[60vw] overflow-hidden rounded-lg">
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
