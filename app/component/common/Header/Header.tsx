import mrdang_logo from '@/app/asset/mrdang_logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { SearchBar } from './SearchBar';

// import { PlaylistBox, PlaylistCard } from "@/component/video/PlaylistBox";

type Props = {
  refreshToken?: RequestCookie;
};

export function Header({ refreshToken }: Props) {
  return (
    <>
      <div className='fixed top-0 z-10 flex w-full flex-wrap items-end justify-between gap-3 bg-white px-12 py-8 max-sm:px-6'>
        <Link href='/' className='max-md:w-1/2'>
          <Image src={mrdang_logo} alt='mrdang logo' width={200} />
        </Link>
        <div className='flex w-3/4 justify-between gap-6 max-[944px]:w-full'>
          <SearchBar />
          {refreshToken ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </>
  );
}
