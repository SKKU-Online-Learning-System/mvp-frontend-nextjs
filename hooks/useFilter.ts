import { CategoryKey, Filter } from '@/components/main/MainContent/category';
import { Sort } from '@/types/content';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export type Topic = '성대한만남' | '기술교류회' | '공개형교육' | '성대한활동' | '데이터셋';

const groupedFilterList: {
  [key in Topic]: Filter[];
} = {
  성대한만남: [
    { id: 3, name: '성대의 성대한 특강', checked: false },
    { id: 4, name: '성대의 성대한 스토리', checked: false },
    { id: 5, name: '글로벌 IT전문가와 킹고인의 만남', checked: false },
  ],
  기술교류회: [{ id: 2, name: 'S-TOP', checked: false }],
  공개형교육: [
    { id: 6, name: '공개형 온라인 강의', checked: false },
    { id: 11, name: '공개형 교재', checked: false },
  ],
  성대한활동: [
    { id: 7, name: '인턴십 후기', checked: false },
    { id: 8, name: 'IT 해외봉사', checked: false },
    { id: 9, name: '글로벌 챌린지', checked: false },
    { id: 10, name: '현직자 인터뷰', checked: false },
  ],
  데이터셋: [
    { id: 12, name: '데이터셋 플랫폼', checked: false },
    { id: 13, name: '대회 데이터셋', checked: false },
  ]
};

type Props = {
  topic: Topic;
  searchParams: ReadonlyURLSearchParams;
};

export default function useFilter({ topic, searchParams }: Props) {
  const [filters, setFilters] = useState<Filter[]>();
  const [sort, setSort] = useState<Sort>('upload');
  const [year, setYear] = useState<string>();

  const filterToggle = (name: CategoryKey) => {
    setFilters((prev) =>
      prev?.map((filter) =>
        filter.name === name
          ? { ...filter, checked: true }
          : { ...filter, checked: false }
      )
    );
  };

  const filterOn = (name: CategoryKey) => {
    setFilters((prev) =>
      prev?.map((filter) =>
        filter.name === name ? { ...filter, checked: true } : filter
      )
    );
  };

  const changeSort = (sortOption: string) =>
    sortOption === 'upload' ? setSort('upload') : setSort('view');

  const changeYear = (year: string) => {
    setYear(year);
  };

  const setDefaultSortYear = () => {
    setYear('all');
    setSort('upload');
  };

  useEffect(() => {
    const category = (searchParams.get('category') ??
      groupedFilterList[topic].at(0)?.name) as CategoryKey;

    setFilters(groupedFilterList[topic]);

    filterOn(category);
  }, [topic, searchParams]);

  return {
    filters,
    setFilters,
    filterToggle,
    filterOn,
    groupedFilterList,
    sort,
    changeSort,
    year,
    changeYear,
    setDefaultSortYear,
  };
}
