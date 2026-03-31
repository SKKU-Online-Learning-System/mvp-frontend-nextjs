type Dataset = {
    id: number;
    title: string;
    description: string;
    descriptionDetail: string; // 추가
    useCases: string[];        // 추가
    tags: string[];
    type: string;
    image: string;
    year: number;
    views: number;
    downloads: number;         // 추가
};

type Props = {
    data: Dataset[];
};

import CompetitionDatasetCard from './CompetitionDatasetCard';

export default function CompetitionDatasetGrid({ data }: Props) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {data.map((item) => (
                <CompetitionDatasetCard key={item.id} item={item} />
            ))}
        </div>
    );
}