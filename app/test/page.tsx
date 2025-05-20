import { NavigationMenuDemo } from '../component/common/Header/DemoNav';

export default function TestPage() {
  return (
    <>
      <div className='flex w-full h-16 bg-black/40 fixed justify-center'>
        <NavigationMenuDemo />
      </div>
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
