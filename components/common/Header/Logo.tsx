import mrdang_logo from '@/app/asset/mrdang_logo.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/' className='max-md:w-1/2'>
      <Image priority={true} src={mrdang_logo} alt='mrdang logo' width={150} />
    </Link>
  );
}
