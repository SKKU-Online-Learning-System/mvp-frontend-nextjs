'use client';

import { getContents } from '@/app/api/content';
import { ContentResponseType } from '@/app/type/content';
import useFilter from '@/hooks/useFilter';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Error from '../../common/Error';
import MainContentSkeleton from '../../common/MainContentSkeleton';
import ContentFilter from './ContentFilter';
import { MainContentCard } from './MainContentCard';
import { CategoryKey } from './category';

export type Topic = '성대한만남' | '기술교류회' | '공개형교육' | '성대한활동';

export function MainGridContainer() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const [contents, setContents] = useState<ContentResponseType[]>();

  const {
    filters,
    setFilters,
    filterToggle,
    filterOn,
    groupedFilterList,
    sort,
    changeSort,
  } = useFilter();

  useEffect(() => {
    const topic = (searchParams.get('topic') ?? '성대한만남') as Topic;

    const category = (searchParams.get('category') ??
      groupedFilterList[topic].at(0)?.name) as CategoryKey;

    setFilters(groupedFilterList[topic]);

    filterOn(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const fetchContents = async () => {
      const contents = await getContents(query ?? '');
      setContents(contents);
    };
    fetchContents();
  }, [query]);

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
        changeSort={changeSort}
      />
      {!filteredContents ? (
        <div className='my-grid'>
          {Array.from({ length: 9 }).map((_, idx) => (
            <MainContentSkeleton key={idx} />
          ))}
        </div>
      ) : filteredContents.length == 0 ? (
        <Error />
      ) : (
        <div className='my-grid'>
          {filteredContents
            ?.sort((a, b) => {
              if (sort === '조회순') {
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
