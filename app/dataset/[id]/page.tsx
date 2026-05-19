'use client';

import { getDataset } from '@/app/api/dataset';
import Nav from '@/components/common/Header/Nav';
import DatasetDetail from '@/components/dataset/DatasetDetail';
import { DatasetItem } from '@/components/dataset/data/types';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const viewStorageKey = (id: number) => `views-${id}`;

const readStoredNumber = (key: string, fallback: number) => {
  const saved = localStorage.getItem(key);
  const savedCount = saved ? Number(saved) : NaN;

  return Number.isNaN(savedCount) ? fallback : savedCount;
};

const applyDetailEngagement = (data: DatasetItem) => {
  const baseViews = Math.max(
    readStoredNumber(viewStorageKey(data.id), data.views),
    data.views
  );
  const hasBackendEngagement = typeof data.isLike === 'boolean';
  const views = hasBackendEngagement ? baseViews : baseViews + 1;

  localStorage.setItem(viewStorageKey(data.id), String(views));

  return {
    ...data,
    views,
    likes: data.likes,
    isLike: Boolean(data.isLike),
  };
};

function DetailLoading() {
  return (
    <div className='mx-auto max-w-6xl px-6 py-10'>
      <div className='h-64 animate-pulse rounded-[28px] border border-slate-200 bg-white shadow-sm' />
      <div className='mt-6 space-y-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className='h-24 animate-pulse rounded-[28px] border border-slate-200 bg-white shadow-sm'
          />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const params = useParams<{ id?: string | string[] }>();
  const [dataset, setDataset] = useState<DatasetItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const datasetId = useMemo(() => {
    const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
    const parsedId = Number(rawId);
    return Number.isFinite(parsedId) ? parsedId : null;
  }, [params.id]);

  useEffect(() => {
    let cancelled = false;

    const fetchDataset = async () => {
      if (!datasetId) {
        setDataset(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const data = await getDataset(datasetId);

      if (!cancelled) {
        setDataset(data ? applyDetailEngagement(data) : null);
        setIsLoading(false);
      }
    };

    fetchDataset();

    return () => {
      cancelled = true;
    };
  }, [datasetId]);

  return (
    <div>
      <Nav style='white' />
      <div className='w-full pt-logo'>
        {isLoading ? (
          <DetailLoading />
        ) : dataset ? (
          <DatasetDetail dataset={dataset} />
        ) : (
          <div className='p-10 text-center text-sm font-semibold text-slate-500'>
            데이터셋을 찾을 수 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
