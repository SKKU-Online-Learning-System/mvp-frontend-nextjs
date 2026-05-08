import { Suspense } from 'react';
import { TbWorldUpload } from 'react-icons/tb';
import Nav from '@/components/common/Header/Nav';
import ShadowRoundBox from '@/components/common/ShadowRoundBox';
import { PlayGroundGridContainer } from '@/components/main/MainContent/PlaygroundGridContainer';
import VideoUploadSheet from '@/components/video/Upload/VideoUploadSheet';
import MainContentSkeleton from '@/components/common/MainContentSkeleton';

function PlaygroundGridFallback() {
    return (
        <div className="my-container">
            <div className="my-grid">
                {Array.from({ length: 12 }).map((_, idx) => (
                    <MainContentSkeleton key={idx} />
                ))}
            </div>
        </div>
    );
}

export async function generateMetadata() {
    return {
        title: '콘텐츠 업로드 | 온라인 명륜당',
        description: '교육 목적에 부합하는 영상을 업로드할 수 있습니다.',
        openGraph: {
            title: '콘텐츠 업로드 - 온라인 명륜당',
            url: 'https://mrdang.cs.skku.edu/playground',
        },
    };
}

export default function Playground() {
    return (
        <div>
            <Nav style="white" />
            <div className="flex flex-col gap-4 pt-logo w-full">
                <div className="my-container self-center">
                    <ShadowRoundBox>
                        <>
                            <TbWorldUpload className="text-[15rem] font-light" />
                            <div className="flex flex-col gap-6">
                                <p className="text-2xl font-bold text-center">
                                    동영상을 업로드해보세요
                                </p>
                                <VideoUploadSheet />
                                <span>
                                    교육 목적에 부합하는 동영상을 업로드해주세요.
                                </span>
                            </div>
                        </>
                    </ShadowRoundBox>
                </div>
                <Suspense fallback={<PlaygroundGridFallback />}>
                    <PlayGroundGridContainer />
                </Suspense>
            </div>
        </div>
    );
}
