// import { TagIcon } from "@/component/main/TagIcon";
import { CardContent, CardFooter, CardLink } from '@/components/ui/card';
import { ContentResponseType } from '@/types/content';
import Image from 'next/image';

type Props = {
  content: ContentResponseType;
};

export function MainContentCard({ content }: Props) {
  const contentHour = Math.floor(content.duration / 3600);
  const contentMinute = Math.floor(content.duration / 60) % 60;

  const getLink = () => {
    switch (content.type) {
      case 'YOUTUBE':
        return `/video?id=${content.id}`;
      case 'INFLEARN':
        return content.link;
      case 'BOOK':
        return `/textbook/${content.id}`;
      default:
        return '/';
    }
  };

  return (
    <CardLink
      href={getLink()}
      target={`${content.type === 'INFLEARN' ? '_blank' : ''}`}
      className="cursor-pointer hover:bg-accent relative rounded-lg z-0 transition flex flex-col"
    >
      {/* 썸네일 */}
      <div className="relative aspect-video w-full">
        <Image
          src={content.thumbnailUrl}
          alt="썸네일"
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="rounded-t-md bg-slate-300 object-cover object-center"
        />
      </div>

      {/* 제목 */}
      <CardContent className="px-2 py-2 sm:px-3">
        <p className="break-words font-semibold text-xs sm:text-sm leading-tight">
          {content.title}
        </p>
      </CardContent>

      {/* 하단 */}
      <CardFooter className="px-2 pb-2 pt-0 sm:px-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-[11px] sm:text-xs text-gray-400 break-words">
            {content.author}
          </p>

          {content.type !== 'BOOK' && (
            <p className="text-[11px] sm:text-xs text-gray-400">
              {contentHour !== 0 ? `${contentHour}시간 ` : ''}
              {contentMinute}분
            </p>
          )}
        </div>
      </CardFooter>
    </CardLink>
  );
}
