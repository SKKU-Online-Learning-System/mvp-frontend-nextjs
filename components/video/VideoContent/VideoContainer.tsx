'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getContent, postContentLike } from '@/app/api/content';
import useCurrentUser from '@/hooks/useCurrentUser';
import { ContentDetailResponseType } from '@/types/content';
import { VideoInfo } from './VideoInfo';
import { YoutubePlayer } from '../YoutubePlayer';

type Props = {
    id: number;
    refreshToken?: unknown;
};

export function VideoContainer({ id }: Props) {
    const { currentUser } = useCurrentUser();
    const [content, setContent] = useState<ContentDetailResponseType>();

    const onClickLike = async () => {
        if (!currentUser) {
            toast.error('좋아요는 로그인 후 이용할 수 있습니다.');
            throw new Error('login required');
        }

        if (!content?.id) return;

        try {
            await postContentLike(content.id);

            setContent((prev) => {
                if (!prev) return prev;

                const nextIsLike = !prev.isLike;

                return {
                    ...prev,
                    isLike: nextIsLike,
                    likeCount: nextIsLike
                        ? prev.likeCount + 1
                        : prev.likeCount - 1,
                };
            });
        } catch (err) {
            console.debug(err);
        }
    };

    const youtubeId = content?.link.split('v=')[1];

    useEffect(() => {
        const fetchContent = async () => {
            const nextContent = await getContent(id);
            setContent(nextContent);
        };

        fetchContent();
    }, [id]);

    return (
        <div className="pt-logo px-4 md:px-8 lg:px-16 xl:px-24 mb-12 flex flex-col lg:flex-row gap-6 max-w-[1400px] mx-auto">
            <div className="flex w-full flex-col border shadow-sm pb-12 rounded-lg overflow-hidden">
                <YoutubePlayer youtubeId={youtubeId} />
                <VideoInfo content={content} onClickLike={onClickLike} />
            </div>
        </div>
    );
}
