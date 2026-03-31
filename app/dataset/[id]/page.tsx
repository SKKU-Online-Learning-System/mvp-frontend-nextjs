'use client';

import DatasetDetail from '@/components/dataset/DatasetDetail';
import { useParams } from 'next/navigation';
import Nav from '@/components/common/Header/Nav';

// 기존 CompetitionDataset에서 사용하던 데이터를 import해서 사용
import { rawData } from '@/components/dataset/data/dummyDataset';

// flat하게 변환
const dummyData = rawData.flatMap(group => group.datasets);

export default function Page() {
    const params = useParams();
    const id = Number(params.id);

    const dataset = dummyData.find((d) => d.id === id);

    if (!dataset) {
        return <div className="p-10">데이터를 찾을 수 없습니다.</div>;
    }

    return (<div>
        <Nav style='white' />
        <div className={`w-full pt-logo`}>
            <DatasetDetail dataset={dataset} />
        </div>
    </div>
    );
}