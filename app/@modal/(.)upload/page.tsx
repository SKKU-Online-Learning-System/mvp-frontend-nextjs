import { VideoUploadModal } from '@/app/component/video/Upload';

export default function Upload() {
  return (
    <>
      <div className='fixed z-20 flex h-full w-full items-center justify-center bg-gray-700 opacity-50'></div>
      <VideoUploadModal />
    </>
  );
}
