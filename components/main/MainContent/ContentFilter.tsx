'use client';

import { Badge } from '@/components/ui/badge';
import ContentFilterSkeleton from '../../common/ContentFilterSkeleton';
import { ComboBox, Framework } from './ComboBox';
import { CategoryKey, Filter } from './category';

type Props = {
  filterList: Filter[] | undefined;
  filterToggle: (name: CategoryKey) => void;
  sort: string;
  changeSort: (sortOption: string) => void;
  year: string | undefined;
  changeYear: (year: string) => void;
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
}: Props) {
  return (
    <div className='flex flex-wrap gap-2 justify-between'>
      <div className='flex flex-wrap gap-3 justify-start'>
        {filterList
          ? filterList.map(({ name, checked }, idx) => (
              <Badge
                key={idx}
                variant={checked ? 'default' : 'secondary'}
                className='cursor-pointer h-8 font-semibold'
                onClick={() => filterToggle(name)}
              >
                {name}
              </Badge>
            ))
          : Array.from({ length: 3 }).map((_, idx) => (
              <ContentFilterSkeleton key={idx} />
            ))}
      </div>
      <div className='flex gap-3'>
        <ComboBox
          defaultName='연도'
          frameworks={yearFrameworks}
          value={year}
          setValue={changeYear}
        />
        <ComboBox
          defaultName='정렬기준'
          frameworks={sortFrameworks}
          value={sort}
          setValue={changeSort}
        />
      </div>
    </div>
  );
}
