'use client';

import { useState } from 'react';
import ContentFilter from '@/components/main/MainContent/ContentFilter';
import CompetitionDatasetGrid from '@/components/dataset/CompetitionDatasetGrid';

export default function CompetitionDataset() {
    const [fields, setFields] = useState<string[]>([]);
    const [sort, setSort] = useState('upload');
    const [year, setYear] = useState<string | undefined>(undefined);

    const handleSortChange = (value: string) => {
        setSort(value);
    };

    const handleYearChange = (value: string) => {
        setYear(value === 'all' ? undefined : value);
    };

    const setDefaultSortYear = () => {
        setSort('upload');
        setYear(undefined);
    };

    const FIELD_IMAGE_MAP: Record<string, string> = {
        '금융': 'https://cdn-icons-png.flaticon.com/512/2331/2331970.png',
        '재난·안전·환경': 'https://cdn-icons-png.flaticon.com/512/427/427735.png',
        '교통': 'https://cdn-icons-png.flaticon.com/512/854/854894.png',
        '의료': 'https://cdn-icons-png.flaticon.com/512/2966/2966487.png',
        '교육': 'https://cdn-icons-png.flaticon.com/512/3135/3135755.png',
        '농축·수산': 'https://cdn-icons-png.flaticon.com/512/2909/2909767.png',
        '문화·관광': 'https://cdn-icons-png.flaticon.com/512/854/854878.png',

        '이미지': 'https://cdn-icons-png.flaticon.com/512/1829/1829586.png',
        '영상': 'https://cdn-icons-png.flaticon.com/512/727/727245.png',
        '음성': 'https://cdn-icons-png.flaticon.com/512/727/727269.png',

        '시계열': 'https://cdn-icons-png.flaticon.com/512/2088/2088617.png',
        '이상탐지': 'https://cdn-icons-png.flaticon.com/512/565/565547.png',
    };

    const rawData = [
        {
            competition: 'Kaggle',
            datasets: [
                {
                    id: 1,
                    title: 'Kaggle Hackathon 2024',
                    description: '직원 정보 기반 연봉 예측',
                    tags: ['금융'],
                    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png',
                },
                {
                    id: 2,
                    title: 'Traffic Flow Prediction',
                    description: '도시 교통 흐름 예측',
                    tags: ['교통', '시계열'],
                    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png',
                },
                {
                    id: 4,
                    title: 'Medical Image Classification',
                    description: 'X-ray 이미지 기반 질병 분류',
                    tags: ['의료', '이미지'],
                    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png',
                },
                {
                    id: 5,
                    title: 'Speech Emotion Recognition',
                    description: '음성 데이터 기반 감정 분석',
                    tags: ['음성'],
                    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png',
                },
                {
                    id: 6,
                    title: 'Tourism Recommendation System',
                    description: '관광지 추천 시스템',
                    tags: ['문화·관광'],
                    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png',
                },
            ],
        },
        {
            competition: 'DACON',
            datasets: [
                {
                    id: 7,
                    title: 'K-water AI 경진대회',
                    description: '상수도 관망 이상 탐지',
                    tags: ['재난·안전·환경', '시계열'],
                    image: 'https://dacon.io/favicon.ico',
                },
                {
                    id: 8,
                    title: '농작물 수확량 예측',
                    description: '기후 데이터 기반 수확량 예측',
                    tags: ['농축·수산', '시계열'],
                    image: 'https://dacon.io/favicon.ico',
                },
                {
                    id: 9,
                    title: '신용카드 이상 거래 탐지',
                    description: '금융 거래 이상 탐지',
                    tags: ['금융', '이상탐지'],
                    image: 'https://dacon.io/favicon.ico',
                },
                {
                    id: 10,
                    title: '교육 플랫폼 사용자 분석',
                    description: '학습 행동 분석 및 추천',
                    tags: ['교육'],
                    image: 'https://dacon.io/favicon.ico',
                },
            ],
        },
        {
            competition: 'AI Hackathon',
            datasets: [
                {
                    id: 11,
                    title: 'Disaster Image Detection',
                    description: '재난 상황 이미지 분류',
                    tags: ['재난·안전·환경', '이미지'],
                    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                },
                {
                    id: 12,
                    title: 'CCTV 이상 행동 탐지',
                    description: '영상 기반 이상 행동 탐지',
                    tags: ['영상', '이상탐지'],
                    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                },
                {
                    id: 13,
                    title: 'Smart City Traffic Analysis',
                    description: '스마트시티 교통 데이터 분석',
                    tags: ['교통', '시계열'],
                    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                },
            ],
        },
        {
            competition: 'University Competition',
            datasets: [
                {
                    id: 14,
                    title: '학생 성적 예측',
                    description: '학습 데이터 기반 성적 예측',
                    tags: ['교육'],
                    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                },
                {
                    id: 15,
                    title: '문화 행사 추천 시스템',
                    description: '사용자 기반 문화 콘텐츠 추천',
                    tags: ['문화·관광'],
                    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                },
            ],
        },
    ];

    const getImageByTags = (tags: string[]) => {
        for (const tag of tags) {
            if (FIELD_IMAGE_MAP[tag]) {
                return FIELD_IMAGE_MAP[tag];
            }
        }
        return 'https://cdn-icons-png.flaticon.com/512/1828/1828919.png'; // fallback
    };

    const dummyCompetitionData = rawData.map(group => ({
        ...group,
        datasets: group.datasets.map(item => ({
            ...item,
            image: getImageByTags(item.tags),
        })),
    }));

    const filteredData = dummyCompetitionData.map((group) => ({
        ...group,
        datasets: group.datasets.filter((item) => {
            if (fields.length === 0) return true; // 전체

            return fields.some((f) => item.tags.includes(f));
        }),
    }));

    const flatData = filteredData.flatMap((group) => group.datasets);

    return (
        <div className="px-6 py-10">
            <ContentFilter
                sort={sort}
                changeSort={handleSortChange}
                year={year}
                changeYear={handleYearChange}
                setDefaultSortYear={setDefaultSortYear}
                showBadge={false}
                showFieldFilter={true}
                fields={fields}
                setFields={setFields}
            />

            <CompetitionDatasetGrid data={flatData} />
        </div>
    );
}