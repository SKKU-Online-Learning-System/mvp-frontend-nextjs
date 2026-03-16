'use client';

import NoResult from '@/components/common/NoResult';
import useContentById from '@/hooks/useContentById';
import useFilter from '@/hooks/useFilter';
import { useSearchParams } from 'next/navigation';
import MainContentSkeleton from '../../common/MainContentSkeleton';
import ContentFilter from './ContentFilter';
import { MainContentCard } from './MainContentCard';

export function PlayGroundGridContainer() {
  const searchParams = useSearchParams();
  // const query = searchParams.get('query');

  const { sort, changeSort, year, changeYear, setDefaultSortYear } = useFilter({
    topic: '성대한만남',
    searchParams,
  });

  const { contents, loading } = useContentById(1);

  const filteredContents = contents
    ?.slice()
    ?.filter(({ publishedAt }) => {
      if (!year || year === 'all') {
        return true;
      }

      return new Date(publishedAt).getFullYear().toString() === year;
    })
    ?.sort((a, b) => {
      if (sort === 'view') {
        return b.viewCount - a.viewCount;
      } else {
        return 0;
      }
    });

  return (
    <div className='my-container'>
      <ContentFilter
        filterList={[]}
        sort={sort}
        changeSort={changeSort}
        year={year?.toString()}
        changeYear={changeYear}
        setDefaultSortYear={setDefaultSortYear}
      />
      {loading ? (
        // 스켈레톤 UI
        <div className='my-grid'>
          {Array.from({ length: 12 }).map((_, idx) => (
            <MainContentSkeleton key={idx} />
          ))}
        </div>
      ) : !filteredContents?.length ? (
        <NoResult />
      ) : (
        <div className='my-grid'>
          {filteredContents?.map((content) => (
            <MainContentCard key={content.id} content={content} />
          ))}
        </div>
      )}
    </div>
  );
}
