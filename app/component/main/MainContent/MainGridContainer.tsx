'use client';

import { getContents } from '@/app/api/content';
import { ContentResponseType } from '@/app/type/content';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import ContentFilter from './ContentFilter';
import { MainContentCard } from './MainContentCard';
import { CategoryKey, Filter } from './category';

export type Topic = '성대한만남' | '기술교류회' | '공개형교육' | '성대한활동';

const groupedFilterList: {
  [key in Topic]: Filter[];
} = {
  성대한만남: [
    { name: '성대의 성대한 특강', checked: false },
    { name: '성대의 성대한 스토리', checked: false },
    { name: '글로벌 IT전문가와 킹고인의 만남', checked: false },
  ],
  기술교류회: [{ name: 'S-TOP', checked: false }],
  공개형교육: [
    { name: '공개형 온라인 강의', checked: false },
    { name: '공개형 교재', checked: false },
  ],
  성대한활동: [
    { name: '글로벌 챌린지', checked: false },
    { name: '인턴십 후기', checked: false },
    { name: 'IT 해외봉사', checked: false },
  ],
};

export function MainGridContainer() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const [contents, setContents] = useState<ContentResponseType[]>();
  const [filters, setFilters] = useState<Filter[]>(
    groupedFilterList['성대한만남']
  );

  const filterToggle = (name: CategoryKey) => {
    setFilters((prev) =>
      prev.map((filter) =>
        filter.name === name ? { ...filter, checked: !filter.checked } : filter
      )
    );
  };

  const filterOn = (name: CategoryKey) => {
    setFilters((prev) =>
      prev.map((filter) =>
        filter.name === name ? { ...filter, checked: true } : filter
      )
    );
  };

  useEffect(() => {
    const topic = (searchParams.get('topic') ?? '성대한만남') as Topic;

    const category = (searchParams.get('category') ??
      groupedFilterList[topic].at(0)?.name) as CategoryKey;

    setFilters(groupedFilterList[topic]);

    filterOn(category);
  }, [searchParams]);

  useEffect(() => {
    const fetchContents = async () => {
      const contents = await getContents(query ?? '');
      setContents(contents);
    };
    fetchContents();
  }, [query]);

  const filteredContents = contents?.filter((content) =>
    filters.some(
      ({ name, checked }) =>
        checked && new RegExp(name, 'i').test(content.title)
    )
  );

  return (
    <div className='my-container'>
      <ContentFilter filterList={filters} filterToggle={filterToggle} />
      {!filteredContents ? (
        <Loading />
      ) : filteredContents.length == 0 ? (
        <Error />
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
