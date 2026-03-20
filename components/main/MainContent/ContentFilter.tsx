'use client';

import { SearchBar } from '@/components/common/Header';
import { Badge } from '@/components/ui/badge';
import { useRouter, useSearchParams } from 'next/navigation';
import ContentFilterSkeleton from '../../common/ContentFilterSkeleton';
import { ComboBox, Framework } from './ComboBox';
import { CategoryKey, Filter } from './category';

type Props = {
  filterList?: Filter[] | undefined;
  filterToggle?: (name: CategoryKey) => void;
  sort: string;
  changeSort: (sortOption: string) => void;
  year: string | undefined;
  changeYear: (year: string) => void;
  setDefaultSortYear: () => void;
};

const yearFrameworks: Framework[] = Array.from({ length: 6 }, (_, i) => {
  const year = (2020 + i).toString();
  return {
    value: year,
    label: year,
  };
});

const sortFrameworks: Framework[] = [
  {
    value: 'upload',
    label: '업로드순',
  },
  {
    value: 'view',
    label: '조회순',
  },
];

export default function ContentFilter({
  filterList,
  filterToggle,
  sort,
  changeSort,
  year,
  changeYear,
  setDefaultSortYear,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeCategory = (newCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', newCategory);
    router.push(`?${params.toString()}`);
  };

  const onClick = (name: CategoryKey) => {
    if (!filterList || !filterToggle) return;

    setDefaultSortYear();
    filterToggle(name);
    changeCategory(name);
  };

  return (
    <div className="flex flex-col gap-4">


      {/* 🏷 1. 카테고리 */}
      <div className="flex flex-wrap gap-2">
        {filterList
          ? filterList.map(({ name, checked }, idx) => (
            <Badge
              key={idx}
              variant={checked ? 'default' : 'secondary'}
              className="cursor-pointer h-8 font-semibold"
              onClick={() => onClick(name)}
            >
              {name}
            </Badge>
          ))
          : Array.from({ length: 3 }).map((_, idx) => (
            <ContentFilterSkeleton key={idx} />
          ))}
      </div>

      {/* 🔍 2 . 검색창  */}
      <SearchBar />

      {/* ⚙️ 3. 옵션 */}
      <div className="flex justify-end gap-2">
        <ComboBox
          defaultName="연도"
          frameworks={[{ value: 'all', label: '전체' }, ...yearFrameworks]}
          value={year}
          setValue={changeYear}
        />
        <ComboBox
          defaultName="정렬기준"
          frameworks={sortFrameworks}
          value={sort}
          setValue={changeSort}
        />
      </div>

    </div>
  );
}