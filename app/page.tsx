export const dynamic = 'force-dynamic';

import { cookies } from 'next/headers';
import Nav from '../components/common/Header/Nav';
import MainVideo from '../components/main/MainVideo';

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
