import Image from "next/image";
import Link from "next/link";

import { Header, SearchBar, LoginButton } from "@/component/common/Header";

// import { PlaylistBox, PlaylistCard } from "@/component/video/PlaylistBox";
import { VideoContainer } from "@/component/video/VideoContent";
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
      <VideoContainer youtubeId={youtubeId} />
    </div>
  );
}
