'use client';

import NoResult from '@/components/common/NoResult';
import useContent from '@/hooks/useContent';
import useFilter, { Topic } from '@/hooks/useFilter';
import { useSearchParams } from 'next/navigation';
import MainContentSkeleton from '../../common/MainContentSkeleton';
import ContentFilter from './ContentFilter';
import { MainContentCard } from './MainContentCard';

type Props = {
  topic: Topic;
};

export function MainGridContainer({ topic }: Props) {
  const searchParams = useSearchParams();
  // const query = searchParams.get('query');

  const {
    filters,
    filterToggle,
    sort,
    changeSort,
    year,
    changeYear,
    setDefaultSortYear,
  } = useFilter({ topic, searchParams });

  const { contents } = useContent(filters);

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
        filterList={filters}
        filterToggle={filterToggle}
        sort={sort}
        changeSort={changeSort}
        year={year?.toString()}
        changeYear={changeYear}
        setDefaultSortYear={setDefaultSortYear}
      />
      {!contents ? (
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
