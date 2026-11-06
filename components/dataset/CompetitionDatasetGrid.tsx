import CompetitionDatasetCard from './CompetitionDatasetCard';
import { DatasetSummaryItem } from './data/types';

type Props = {
  data: DatasetSummaryItem[];
  onDatasetDownloaded?: (id: number) => void;
};

export default function CompetitionDatasetGrid({
  data,
  onDatasetDownloaded,
}: Props) {
  if (data.length === 0) {
    return (
      <div className='flex min-h-72 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-12 text-center text-sm font-semibold text-slate-500'>
        조건에 맞는 데이터셋이 없습니다.
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
      {data.map((item) => (
        <CompetitionDatasetCard
          key={item.id}
          item={item}
          onDownloaded={onDatasetDownloaded}
        />
      ))}
    </div>
  );
}
