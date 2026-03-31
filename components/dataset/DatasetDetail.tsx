'use client';

import { useEffect, useState } from 'react';
import DatasetPreview from './DatasetPreview';

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
    dataset: Dataset;
};

export default function DatasetDetail({ dataset }: Props) {
    const [downloads, setDownloads] = useState(dataset.downloads);

    useEffect(() => {
        const saved = localStorage.getItem(`downloads-${dataset.id}`);
        if (saved) {
            setDownloads(Number(saved));
        }
    }, [dataset.id]);

    const handleDownload = () => {
        const newCount = downloads + 1;

        setDownloads(newCount);
        localStorage.setItem(`downloads-${dataset.id}`, String(newCount));

        // (옵션) 실제 다운로드 느낌
        alert('다운로드 시작!');
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

            {/* 🔥 HERO */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 via-white to-gray-200 shadow">
                <div className="relative p-8 flex flex-col md:flex-row gap-8">

                    <div className="w-full md:w-56 bg-white rounded-2xl shadow-md p-5 flex items-center justify-center">
                        <img
                            src={dataset.image}
                            alt={dataset.title}
                            className="max-h-32 object-contain"
                        />
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-3 leading-snug">
                            {dataset.title}
                        </h1>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                            {dataset.description}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-4 text-sm">
                            <div className="bg-white border rounded-lg px-3 py-2 shadow-sm">
                                <span className="text-gray-400 mr-2">분야</span>
                                <span className="font-medium">{dataset.tags.join(', ')}</span>
                            </div>
                            <div className="bg-white border rounded-lg px-3 py-2 shadow-sm">
                                <span className="text-gray-400 mr-2">유형</span>
                                <span className="font-medium">{dataset.type}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                            <div>
                                <span className="text-gray-400 mr-1">등록년도</span>
                                {dataset.year}
                            </div>
                            <div>
                                <span className="text-gray-400 mr-1">조회수</span>
                                {dataset.views.toLocaleString()}
                            </div>
                            <div>
                                <span className="text-gray-400 mr-1">다운로드수</span>
                                {downloads.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div className="flex md:flex-col gap-3 md:justify-center">
                        <button
                            onClick={handleDownload}
                            className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
                            다운로드
                        </button>
                    </div>
                </div>
            </div>


            {/* 🔥 전체 가로 블록 구조 */}

            {/* 데이터 정보 */}
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
                <h2 className="text-lg font-semibold mb-4">데이터 정보</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-400 text-xs">등록년도</div>
                        <div className="font-medium">{dataset.year}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-400 text-xs">조회수</div>
                        <div className="font-medium">{dataset.views.toLocaleString()}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-400 text-xs">유형</div>
                        <div className="font-medium">{dataset.type}</div>
                    </div>
                </div>
            </div>

            {/* 데이터 설명 */}
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
                <h2 className="text-lg font-semibold mb-4">데이터 설명</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {dataset.descriptionDetail}
                </p>
            </div>

            {/* 데이터 활용 예시 */}
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
                <h2 className="text-lg font-semibold mb-4">데이터 활용 예시</h2>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                    {dataset.useCases.map((item, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* 데이터 미리보기 */}
            <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
                <h2 className="text-lg font-semibold mb-4">데이터 미리보기</h2>
                <DatasetPreview />
            </div>

        </div>
    );
}