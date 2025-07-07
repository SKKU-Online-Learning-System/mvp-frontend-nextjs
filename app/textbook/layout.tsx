import { cookies } from 'next/headers';
// import { Header } from 's../component/common/Header';
import LeftSideBar from '../component/main/SideBar/LeftSideBar';

export default async function TextBookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh-token');
  return (
    <div>
      {/* <Header refreshToken={refreshToken} /> */}
      <div className='pt-logo flex'>
        <LeftSideBar refreshToken={refreshToken} />
        {children}
      </div>
    </div>
  );
}
