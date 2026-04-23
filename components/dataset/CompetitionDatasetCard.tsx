'use client';

import Link from 'next/link';

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
    item: Dataset;
};

export default function CompetitionDatasetCard({ item }: Props) {
    return (
        <Link href={`/dataset/${item.id}`}>
            <div className="relative w-full h-[260px] bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200 p-4 flex flex-col">

                {/* 다운로드 버튼 */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                    className="absolute top-3 right-3 text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200"
                >
                    ⬇ 다운로드
                </button>

                {/* 상단 (아이콘 + 분야) */}
                <div className="flex flex-col items-center mt-2 mb-2">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-contain mb-1"
                    />
                    <p className="text-xs text-blue-500">{item.tags[0]}</p>
                </div>

                {/* 중단 (텍스트 영역) */}
                <div className="flex-1 flex flex-col justify-center text-center px-1">
                    <h3 className="text-sm font-semibold leading-tight line-clamp-2">
                        {item.title}
                    </h3>

                    <p className="text-[11px] text-gray-400 mt-1">
                        {item.year} | {item.size}
                    </p>

                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                        {item.description}
                    </p>
                </div>

                {/* 하단 (통계) */}
                <div className="flex justify-between text-[11px] text-gray-400 pt-3 border-t">
                    <span>👁 {item.views.toLocaleString()}</span>
                    <span>❤ {item.likes.toLocaleString()}</span>
                    <span>⬇ {item.downloads.toLocaleString()}</span>
                </div>
            </div>
        </Link>
    );
}