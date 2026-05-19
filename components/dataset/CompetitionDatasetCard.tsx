'use client';

import { downloadDatasetArchive } from '@/app/api/dataset';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Download, Eye, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { DatasetSummaryItem } from './data/types';

type Props = {
  item: DatasetSummaryItem;
  onDownloaded?: (id: number) => void;
};

const LABELS = {
  download: '\uB2E4\uC6B4\uB85C\uB4DC',
  loginRequired:
    '\uB2E4\uC6B4\uB85C\uB4DC\uB294 \uB85C\uADF8\uC778 \uD6C4 \uC774\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  views: '\uC870\uD68C\uC218',
  likes: '\uC88B\uC544\uC694',
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
      <article className='group relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md'>
        <button
          type='button'
          onClick={handleDownload}
          disabled={isDownloading || isUserLoading}
          className='absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-[#ff6f5d] px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.02]'
        >
          <Download className='h-3 w-3' />
          {LABELS.download}
        </button>

        <div className='flex flex-1 flex-col items-center px-5 pb-4 pt-12 text-center'>
          <div className='flex h-18 w-18 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_8px_20px_rgba(15,23,42,0.05)]'>
            <img
              src={imageSrc}
              alt={item.title}
              className='h-12 w-12 object-contain'
            />
          </div>

          <span className='mt-4 text-sm font-semibold text-[#556dff]'>
            {item.tags[0] ?? item.type}
          </span>

          <h3 className='mt-5 line-clamp-3 text-[15px] font-semibold leading-6 text-slate-900 transition-colors group-hover:text-slate-700'>
            {item.title}
          </h3>

          <p className='mt-4 text-xs font-medium text-[#b47854]'>
            {year} | {size}
          </p>
        </div>

        <div className='grid grid-cols-3 border-t border-slate-200 bg-slate-50/60 px-4 py-3 text-[12px] text-slate-500'>
          <div className='flex items-center justify-center gap-1.5'>
            <Eye className='h-3.5 w-3.5' />
            <span>{item.views.toLocaleString()}</span>
          </div>
          <div className='flex items-center justify-center gap-1.5 border-x border-slate-200'>
            <Heart
              className={`h-3.5 w-3.5 ${item.isLike ? 'fill-current text-[#f75e4a]' : ''}`}
            />
            <span>{item.likes.toLocaleString()}</span>
          </div>
          <div className='flex items-center justify-center gap-1.5'>
            <Download className='h-3.5 w-3.5' />
            <span>{item.downloads.toLocaleString()}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
