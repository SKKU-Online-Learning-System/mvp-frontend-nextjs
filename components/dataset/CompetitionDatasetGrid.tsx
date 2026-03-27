type Dataset = {
    id: number;
    title: string;
    description: string;
    image: string;
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