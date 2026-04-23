type Dataset = {
    id: number;
    title: string;
    description: string;
    descriptionDetail: string;
    useCases: string[];
    tags: string[];
    type: string;
    image: string;
    year: number;
    size: string;
    views: number;
    likes: number;
    downloads: number;
};

type Props = {
    data: Dataset[];
};

import CompetitionDatasetCard from './CompetitionDatasetCard';

export default function CompetitionDatasetGrid({ data }: Props) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((item) => (
                <CompetitionDatasetCard key={item.id} item={item} />
            ))}
        </div>
    );
}