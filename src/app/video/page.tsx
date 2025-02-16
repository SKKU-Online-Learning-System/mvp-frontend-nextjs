import { cookies } from "next/headers";

import { Header, SearchBar, LoginButton } from "@/component/common/Header";

// import { PlaylistBox, PlaylistCard } from "@/component/video/PlaylistBox";
import { VideoContainer } from "@/component/video/VideoContent";
import mrdang_logo from "@/asset/mrdang_logo.svg";

export default async function Video({
  searchParams,
}: {
  searchParams: Promise<{ id: number }>;
}) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh-token");
  // const accessToken = cookieStore.get("access-token");

  const id = (await searchParams).id;
  return (
    <div>
      <Header refreshToken={refreshToken} />
      <VideoContainer id={id} />
    </div>
  );
}
