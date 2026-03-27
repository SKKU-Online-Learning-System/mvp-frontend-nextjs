type Dataset = {
    id: number;
    title: string;
    description: string;
    image: string;
};

type Props = {
    item: Dataset;
};

export default function CompetitionDatasetCard({ item }: Props) {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 cursor-pointer">
            <img
                src={item.image}
                alt={item.title}
                className="w-full h-32 object-contain mb-3"
            />

            <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
            <p className="text-xs text-gray-500 line-clamp-2">
                {item.description}
            </p>
        </div>
    );
}