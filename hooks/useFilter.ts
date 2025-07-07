import { Topic } from '@/components/main/MainContent/MainGridContainer';
import { CategoryKey, Filter } from '@/components/main/MainContent/category';
import { Sort } from '@/types/content';
import { useState } from 'react';

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

export default function useFilter() {
  const [filters, setFilters] = useState<Filter[]>();
  const [sort, setSort] = useState<Sort>('업로드순');

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

  const changeSort = (sortOption: Sort) =>
    sortOption === '업로드순' ? setSort('업로드순') : setSort('조회순');

  return {
    filters,
    setFilters,
    filterToggle,
    filterOn,
    groupedFilterList,
    sort,
    changeSort,
  };
}
