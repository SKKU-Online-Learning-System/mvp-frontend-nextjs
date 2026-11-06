import { CardLink } from '@/components/ui/card';
import { ContentResponseType } from '@/types/content';
import { Clock3 } from 'lucide-react';
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
      className='group relative z-0 flex h-full cursor-pointer flex-col gap-0 overflow-hidden rounded-xl border border-slate-200 bg-white pb-0 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md'
    >
      {/* 썸네일 */}
      <div className='relative aspect-video w-full overflow-hidden bg-slate-100'>
        <Image
          src={content.thumbnailUrl}
          alt='썸네일'
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
          className='object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]'
        />
      </div>

      {/* 본문 */}
      <div className='flex flex-1 flex-col gap-3 px-4 pb-4 pt-3.5'>
        <div className='min-h-[2.75rem]'>
          <p
            className='line-clamp-2 break-words text-sm font-semibold leading-[1.4] text-slate-900 sm:text-[15px]'
            title={content.title}
          >
            {content.title}
          </p>
        </div>

        <div className='mt-auto flex flex-col gap-1 text-xs text-slate-500'>
          <p className='truncate' title={content.author}>
            {content.author}
          </p>

          {content.type !== 'BOOK' && (
            <p className='flex items-center gap-1 text-slate-400'>
              <Clock3 className='size-3.5' />
              {contentHour !== 0 ? `${contentHour}시간 ` : ''}
              {contentMinute}분
            </p>
          )}
        </div>
      </div>
    </CardLink>
  );
}
