import { CategoryKey, Filter } from '@/components/main/MainContent/category';
import { Sort } from '@/types/content';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export type Topic = string;

const groupedFilterList: Record<string, Filter[]> = {
    성대한만남: [
        { id: 3, name: '성대의 성대한 특강' as CategoryKey, checked: false },
        { id: 4, name: '성대의 성대한 스토리' as CategoryKey, checked: false },
        {
            id: 5,
            name: '글로벌 IT전문가와 킹고인의 만남' as CategoryKey,
            checked: false,
        },
    ],
    기술교류회: [{ id: 2, name: 'S-TOP' as CategoryKey, checked: false }],
    공개형교육: [
        { id: 6, name: '공개형 온라인 강의' as CategoryKey, checked: false },
        { id: 11, name: '공개형 교재' as CategoryKey, checked: false },
    ],
    성대한활동: [
        { id: 7, name: '인턴십 후기' as CategoryKey, checked: false },
        { id: 8, name: 'IT 해외봉사' as CategoryKey, checked: false },
        { id: 9, name: '글로벌 챌린지' as CategoryKey, checked: false },
        { id: 10, name: '현직자 인터뷰' as CategoryKey, checked: false },
    ],
    성대한데이터: [
        { id: 12, name: '데이터셋 플랫폼' as CategoryKey, checked: false },
        { id: 13, name: '대회 데이터셋' as CategoryKey, checked: false },
    ],
    qna: [{ id: 14, name: 'qna' as CategoryKey, checked: false }],
};

type Props = {
    topic: Topic;
    searchParams: ReadonlyURLSearchParams;
};

export default function useFilter({ topic, searchParams }: Props) {
    const [filters, setFilters] = useState<Filter[]>();
    const [sort, setSort] = useState<Sort>('upload');
    const [year, setYear] = useState<string>();

    const filterToggle = (name: CategoryKey) => {
        setFilters((prev) =>
            prev?.map((filter) =>
                filter.name === name
                    ? { ...filter, checked: true }
                    : { ...filter, checked: false }
            )
        );
    };

    const filterOn = (name: CategoryKey) => {
        setFilters((prev) =>
            prev?.map((filter) =>
                filter.name === name ? { ...filter, checked: true } : filter
            )
        );
    };

    const changeSort = (sortOption: string) =>
        sortOption === 'upload' ? setSort('upload') : setSort('view');

    const changeYear = (nextYear: string) => {
        setYear(nextYear);
    };

    const setDefaultSortYear = () => {
        setYear('all');
        setSort('upload');
    };

    useEffect(() => {
        const nextFilters = groupedFilterList[topic] ?? groupedFilterList.qna;
        const category = (searchParams.get('category') ??
            nextFilters.at(0)?.name) as CategoryKey;

        setFilters(nextFilters);
        filterOn(category);
    }, [topic, searchParams]);

    return {
        filters,
        setFilters,
        filterToggle,
        filterOn,
        groupedFilterList,
        sort,
        changeSort,
        year,
        changeYear,
        setDefaultSortYear,
    };
}
