import Nav from '@/components/common/Header/Nav';
import ShadowRoundBox from '@/components/common/ShadowRoundBox';
import { PlayGroundGridContainer } from '@/components/main/MainContent/PlaygroundGridContainer';
import VideoUploadSheet from '@/components/video/Upload/VideoUploadSheet';
import { TbWorldUpload } from 'react-icons/tb';
import { cookies } from 'next/headers';
import { use } from 'react';

export async function generateMetadata() {
  return {
    title: `콘텐츠업로드 | 온라인 명륜당`,
    description: `교육 목적에 부합하는 영상을 업로드할 수 있습니다.`,
    openGraph: {
      title: `콘텐츠업로드 - 온라인 명륜당`,
      url: `https://mrdang.cs.skku.edu/playground`,
    },
  };
}

export default function Playground() {
  const cookieStore = use(cookies());
  const refreshToken = cookieStore.get('refresh-token');
  return (
    <div>
      <Nav style='white' refreshToken={refreshToken} />
      <div className='flex flex-col gap-4 pt-logo w-full'>
        <div className='my-container self-center'>
          <ShadowRoundBox>
            <>
              <TbWorldUpload className='text-[15rem] font-light' />
              <div className='flex flex-col gap-6'>
                <p className='text-2xl font-bold text-center'>
                  동영상을 업로드해보세요!
                </p>
                <VideoUploadSheet />
                <span>교육 목적에 부합하는 동영상을 업로드 해주세요!</span>
              </div>
            </>
          </ShadowRoundBox>
        </div>
        <PlayGroundGridContainer />
      </div>
    </div>
  );
}
