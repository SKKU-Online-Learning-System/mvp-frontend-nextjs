import { cookies } from 'next/headers';
// import { Header } from '../component/common/Header';
import { VideoContainer } from '../component/video/VideoContent';

export default async function Video({
  searchParams,
}: {
  searchParams: Promise<{ id: number }>;
}) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh-token');
  // const accessToken = cookieStore.get("access-token");

  const id = (await searchParams).id;
  return (
    <div>
      {/* <Header refreshToken={refreshToken} /> */}
      <VideoContainer id={id} refreshToken={refreshToken} />
    </div>
  );
}
