import { Badge } from '@/components/ui/badge';
import { SelectItem } from '@/components/ui/select';
import ContentFilterSkeleton from '../../common/ContentFilterSkeleton';
import SelectBox from './SelectBox';
import { CategoryKey, Filter } from './category';

type Props = {
  filterList: Filter[] | undefined;
  filterToggle: (name: CategoryKey) => void;
  changeSort: (sortOption: string) => void;
  changeYear: (year: string) => void;
};

export default function ContentFilter({
  filterList,
  filterToggle,
  changeSort,
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
        <SelectBox placeholder='연도' onValueChange={changeYear}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <SelectItem value={(idx + 2020).toString()} key={idx}>
              {idx + 2020}
            </SelectItem>
          ))}
        </SelectBox>
        <SelectBox placeholder='정렬기준' onValueChange={changeSort}>
          <SelectItem value='upload'>업로드순</SelectItem>
          <SelectItem value='view'>조회순</SelectItem>
        </SelectBox>
      </div>
    </div>
  );
}
