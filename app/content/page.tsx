import { cookies } from 'next/headers';
import Nav from '../../components/common/Header/Nav';
import { MainGridContainer } from '../../components/main/MainContent';

export default async function Content() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh-token');
  // const accessToken = cookieStore.get("access-token");

  return (
    <div>
      <Nav style='white' refreshToken={refreshToken} />
      <div className='pt-logo w-full'>
        <MainGridContainer />
      </div>
    </div>
  );
}
