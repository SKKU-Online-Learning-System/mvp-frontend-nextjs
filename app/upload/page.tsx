import { VideoUploadModal } from '../component/video/Upload';
import VideoUploadSheet from '../component/video/Upload/VideoUploadSheet';

export default function Upload() {
  return (
    <>
      <VideoUploadSheet />
      <VideoUploadModal />
    </>
  );
}
