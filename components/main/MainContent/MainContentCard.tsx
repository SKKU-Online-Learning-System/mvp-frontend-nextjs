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
      className='cursor-pointer hover:bg-accent relative rounded-lg z-0'
    >
      <div className='relative aspect-[16/9] w-full'>
        <Image
          src={content.thumbnailUrl}
          alt='썸네일'
          fill
          sizes='100'
          priority={true}
          className='rounded-t-md bg-slate-300 object-cover object-center border-b-2'
        />
      </div>
      <CardContent>
        <p className='line-clamp-2 w-full break-words font-semibold text-sm'>
          {content.title}
        </p>
      </CardContent>
      <CardFooter>
        <div className='flex flex-col gap-1'>
          <p className='break-words text-sm text-gray-400'>{content.author}</p>
          {content.type != 'BOOK' && (
            <p className='break-words text-sm text-gray-400'>
              약 {contentHour != 0 ? contentHour + '시간' : null}{' '}
              {contentMinute}분 소요
            </p>
          )}
        </div>
      </CardFooter>
    </CardLink>
  );
}
