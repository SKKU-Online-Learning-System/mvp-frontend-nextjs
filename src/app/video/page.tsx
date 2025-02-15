import Image from "next/image";
import Link from "next/link";

import { Header, SearchBar, LoginButton } from "@/component/common/Header";
import { YoutubePlayer } from "@/component/video/YoutubePlayer";
import { VideoInfo } from "@/component/video/VideoInfo";
import { PlaylistBox, PlaylistCard } from "@/component/video/PlaylistBox";
import mrdang_logo from "@/asset/mrdang_logo.svg";

export default async function Video({
  searchParams,
}: {
  searchParams: Promise<{ youtubeId: string }>;
}) {
  const youtubeId = (await searchParams).youtubeId; // _yoKvywDpE0

  return (
    <div>
      <Header>
        <Link href="/">
          <Image src={mrdang_logo} alt="mrdang logo" />
        </Link>
        <SearchBar />
        <LoginButton />
      </Header>
      <div className="flex flex-row">
        <div className="flex flex-col px-12">
          <YoutubePlayer youtubeId={youtubeId} />
          <VideoInfo />
        </div>
        <PlaylistBox>
          {Array.from({ length: 10 }, (_, index) => (
            <PlaylistCard key={index} />
          ))}
        </PlaylistBox>
      </div>
    </div>
  );
}
