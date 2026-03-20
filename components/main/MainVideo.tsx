export default function MainVideo() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/main_banner.mp4" type="video/mp4" />
      </video>
    </div>
  );
}