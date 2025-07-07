'use client';

import useContent from '@/hooks/useContent';
import useFilter from '@/hooks/useFilter';
import { useSearchParams } from 'next/navigation';
import Error from '../../common/Error';
import MainContentSkeleton from '../../common/MainContentSkeleton';
import ContentFilter from './ContentFilter';
import { MainContentCard } from './MainContentCard';

export function MainGridContainer() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const { filters, filterToggle, sort, changeSort, year, changeYear } =
    useFilter(searchParams);

  const { contents } = useContent(query);

  const filteredContents = contents?.filter((content) =>
    filters?.some(
      ({ name, checked }) =>
        checked && new RegExp(name, 'i').test(content.title)
    )
  );

  return (
    <div className='my-container'>
      <ContentFilter
        filterList={filters}
        filterToggle={filterToggle}
        sort={sort}
        changeSort={changeSort}
        year={year?.toString()}
        changeYear={changeYear}
      />
      {!filteredContents ? (
        <div className='my-grid'>
          {Array.from({ length: 12 }).map((_, idx) => (
            <MainContentSkeleton key={idx} />
          ))}
        </div>
      ) : filteredContents.length == 0 ? (
        <Error />
      ) : (
        <div className='my-grid'>
          {filteredContents
            ?.sort((a, b) => {
              if (sort === 'view') {
                return b.viewCount - a.viewCount;
              } else {
                return 0;
              }
            })
            .map((content) => (
              <MainContentCard key={content.id} content={content} />
            ))}
        </div>
      )}
    </div>
  );
}
