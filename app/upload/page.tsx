import { VideoUploadModal } from '../component/video/Upload';

export default function Upload() {
  return (
    <>
      <div className='fixed z-20 flex h-full w-full items-center justify-center bg-gray-200'></div>
      <VideoUploadModal />
    </>
  );
}
