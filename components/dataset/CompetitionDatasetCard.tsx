'use client';

import Link from 'next/link';

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
    item: Dataset;
};

export default function CompetitionDatasetCard({ item }: Props) {
    return (
        <Link href={`/dataset/${item.id}`}>
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
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
        </Link>
    );
}