'use client';

import YouTube from 'react-youtube';

type Props = {
  youtubeId: string | undefined;
};

export function YoutubePlayer({ youtubeId }: Props) {
  return (
    <div className="w-full aspect-video overflow-hidden rounded-t-lg">
      <YouTube
        videoId={youtubeId}
        opts={{
          width: '100%',
          height: '100%',
        }}
        className="w-full h-full"
      />
    </div>
  );
}
