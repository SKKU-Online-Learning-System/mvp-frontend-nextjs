export default function MainVideo() {
  return (
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
  );
}
