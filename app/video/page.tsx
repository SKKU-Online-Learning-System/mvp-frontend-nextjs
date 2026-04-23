import { cookies } from 'next/headers';
import Nav from '../../components/common/Header/Nav';
// import { Header } from '../component/common/Header';
import { VideoContainer } from '../../components/video/VideoContent';

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
      <Nav style='white' refreshToken={refreshToken} />
      <VideoContainer id={id} refreshToken={refreshToken} />
    </div>
  );
}
