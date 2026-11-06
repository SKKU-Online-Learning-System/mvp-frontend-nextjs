'use client';

import { downloadDatasetArchive } from '@/app/api/dataset';
import { Badge } from '@/components/ui/badge';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Download, Eye, Heart } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useState } from 'react';
import { DatasetSummaryItem } from './data/types';

type Props = {
  item: DatasetSummaryItem;
  onDownloaded?: (id: number) => void;
};

const LABELS = {
  download: '다운로드',
  loginRequired: '다운로드는 로그인 후 이용할 수 있습니다.',
  views: '조회수',
  likes: '좋아요',
  downloads: '다운로드 수',
};

export default function CompetitionDatasetCard({ item, onDownloaded }: Props) {
  const { currentUser, isLoading: isUserLoading } = useCurrentUser();
  const [isDownloading, setIsDownloading] = useState(false);
  const imageSrc = item.image || '/favicon.png';
  const year = item.year ?? '-';
  const size = item.size || '-';

  const handleDownload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isDownloading || isUserLoading) {
      return;
    }

    if (!currentUser) {
      toast.error(LABELS.loginRequired);
      return;
    }

    setIsDownloading(true);

    try {
      const isSuccess = await downloadDatasetArchive(item.id, item.title);

      if (isSuccess) {
        onDownloaded?.(item.id);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Link href={`/dataset/${item.id}`} className='block h-full'>
      <article className='group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md'>
        <div className='flex flex-1 flex-col gap-4 p-5'>
          <div className='flex items-start justify-between gap-3'>
            <div className='flex size-14 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50'>
              <img
                src={imageSrc}
                alt={item.title}
                className='size-9 object-contain'
              />
            </div>
            <Badge variant='secondary' className='max-w-[60%] font-semibold'>
              <span className='min-w-0 truncate'>
                {item.tags[0] ?? item.type}
              </span>
            </Badge>
          </div>

          <div className='min-w-0'>
            <div className='min-h-[2.75rem]'>
              <h3
                className='line-clamp-2 break-words text-[15px] font-semibold leading-[1.45] text-slate-900'
                title={item.title}
              >
                {item.title}
              </h3>
            </div>
            <p className='mt-2 text-xs text-slate-500'>
              {year}년 · {size}
            </p>
          </div>

          <div className='mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-3.5'>
            <div className='flex items-center gap-3.5 text-xs text-slate-500'>
              <span className='flex items-center gap-1' title={LABELS.views}>
                <Eye className='size-3.5 text-slate-400' />
                {item.views.toLocaleString()}
              </span>
              <span className='flex items-center gap-1' title={LABELS.likes}>
                <Heart
                  className={`size-3.5 ${
                    item.isLike
                      ? 'fill-current text-rose-500'
                      : 'text-slate-400'
                  }`}
                />
                {item.likes.toLocaleString()}
              </span>
              <span
                className='flex items-center gap-1'
                title={LABELS.downloads}
              >
                <Download className='size-3.5 text-slate-400' />
                {item.downloads.toLocaleString()}
              </span>
            </div>

            <button
              type='button'
              onClick={handleDownload}
              disabled={isDownloading || isUserLoading}
              className='inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-700 transition hover:border-gray-950 hover:bg-gray-950 hover:text-white disabled:pointer-events-none disabled:opacity-50'
            >
              <Download className='size-3.5' />
              {LABELS.download}
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
