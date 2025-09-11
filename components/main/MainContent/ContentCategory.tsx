'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CategoryKey, categoryInfo } from './category';

type Props = {
  category: CategoryKey | null;
};

export function ContentCategory({ category }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  return (
    <div className='flex w-full flex-col gap-3'>
      <div className='flex flex-row flex-wrap gap-3 border-b-2 border-gray-300'>
        <Link
          href={query ? `/?query=${query}` : '/'}
          className={clsx(
            `${category == null ? 'border-b-2 border-green-700 text-green-700' : 'opacity-60'} px-1 text-[1.1rem] font-semibold text-gray-500 hover:border-b-2 hover:border-green-700 hover:text-green-700 hover:opacity-100`
          )}
        >
          전체
        </Link>
        {Object.keys(categoryInfo).map((key) => (
          <Link
            href={
              query ? `/?query=${query}&category=${key}` : `/?category=${key}`
            }
            className={clsx(
              `${key == category ? 'border-b-2 border-green-700 text-green-700' : 'opacity-60'} px-1 text-[1.1rem] font-semibold text-gray-500 hover:border-b-2 hover:border-green-700 hover:text-green-700 hover:opacity-100`
            )}
            key={key}
          >
            {key}
          </Link>
        ))}
      </div>
      <p className='text-[0.9rem] text-gray-500'>
        {category ? categoryInfo[category] : ''}
      </p>
    </div>
  );
}
