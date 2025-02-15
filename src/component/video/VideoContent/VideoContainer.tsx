import { YoutubePlayer } from "@/component/video/YoutubePlayer";
import { VideoInfo } from "@/component/video/VideoContent";

type Props = {
  youtubeId: string;
};

export function VideoContainer({ youtubeId }: Props) {
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col px-12">
          <YoutubePlayer youtubeId={youtubeId} />
          <VideoInfo />
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
