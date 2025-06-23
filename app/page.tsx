import { cookies } from 'next/headers';
import Nav from './component/common/Header/Nav';
import MainVideo from './component/main/MainVideo';

export default async function Main() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh-token');

  return (
    <>
      <Nav refreshToken={refreshToken} />
      <MainVideo />
    </>
  );
}
