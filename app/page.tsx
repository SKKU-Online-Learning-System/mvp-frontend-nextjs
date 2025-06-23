import { cookies } from 'next/headers';
import { LoginButton, LogoutButton } from './component/common/Header';
import { NavigationMenuDemo } from './component/common/Header/DemoNav';
import Logo from './component/common/Header/Logo';

export default async function Main() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh-token');

  return (
    <>
      <nav className='flex w-full h-16 bg-black/40 fixed justify-between items-center px-6'>
        <Logo />
        <NavigationMenuDemo />
        {refreshToken ? <LogoutButton /> : <LoginButton />}
      </nav>
      <video
        autoPlay
        loop
        muted
        playsInline
        width='500'
        className='w-full object-cover absolute z-[-1]'
      >
        <source src='/main_banner.mp4' type='video/mp4' />
        브라우저가 비디오를 지원하지 않아요.
      </video>
    </>
  );
}
