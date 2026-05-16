import { DatasetSummaryItem } from './data/types';
import CompetitionDatasetCard from './CompetitionDatasetCard';

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
            <div className="flex min-h-80 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm font-semibold text-slate-500">
                표시할 데이터셋이 없습니다.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
