'use client';

import { useState } from 'react';
import ContentFilter from '@/components/main/MainContent/ContentFilter';
import CompetitionDatasetGrid from '@/components/dataset/CompetitionDatasetGrid';
import { useAtomValue } from 'jotai';
import { queryAtom } from '@/stores/atom';
import { rawData } from './data/dummyDataset';

export default function CompetitionDataset() {
    const [fields, setFields] = useState<string[]>([]);
    const [sort, setSort] = useState('upload');
    const [year, setYear] = useState<string | undefined>(undefined);
    const search = useAtomValue(queryAtom);

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

    const dummyCompetitionData = rawData.map(group => ({
        ...group,
        datasets: group.datasets.map(item => ({
            ...item,
        })),
    }));

    const filteredData = dummyCompetitionData.map((group) => ({
        ...group,
        datasets: group.datasets.filter((item) => {
            const fieldMatch =
                fields.length === 0 ||
                fields.some((f) =>
                    item.tags.includes(f) || item.type === f
                );

            const searchMatch =
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase());

            const yearMatch =
                !year || item.year.toString() === year;

            return fieldMatch && searchMatch && yearMatch;
        }),
    }));

    const flatData = filteredData
        .flatMap((group) => group.datasets)
        .sort((a, b) => {
            if (sort === 'upload') {
                return b.year - a.year; // 최신 연도순
            }
            if (sort === 'view') {
                return b.views - a.views; // 조회수 높은 순
            }
            return 0;
        });

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