import { Badge } from '@/components/ui/badge';
import ContentSort from './ContentSort';
import { CategoryKey, Filter } from './category';

type Props = {
  filterList: Filter[];
  filterToggle: (name: CategoryKey) => void;
};

export default function ContentFilter({ filterList, filterToggle }: Props) {
  return (
    <div className='flex flex-wrap gap-2 justify-between'>
      <div className='flex flex-wrap gap-3 justify-start'>
        {filterList.map(({ name, checked }, idx) => (
          <Badge
            key={idx}
            variant={checked ? 'default' : 'secondary'}
            className='cursor-pointer h-8 font-semibold'
            onClick={() => filterToggle(name)}
          >
            {name}
          </Badge>
        ))}
      </div>
      <ContentSort />
    </div>
  );
}
