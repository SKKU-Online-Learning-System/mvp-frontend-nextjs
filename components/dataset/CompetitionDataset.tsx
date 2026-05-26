'use client';

import { getDatasets } from '@/app/api/dataset';
import CompetitionDatasetGrid from '@/components/dataset/CompetitionDatasetGrid';
import ContentFilter from '@/components/main/MainContent/ContentFilter';
import useCurrentUser from '@/hooks/useCurrentUser';
import { queryAtom } from '@/stores/atom';
import { AuthUser } from '@/types/auth';
import { useAtomValue } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { DatasetSummaryItem } from './data/types';

const downloadStorageKey = (id: number) => `downloads-${id}`;
const viewStorageKey = (id: number) => `views-${id}`;
const datasetLikeStorageKey = (userId: number | string, id: number) =>
  `dataset-like-${userId}-${id}`;
const datasetLikeCountStorageKey = (userId: number | string, id: number) =>
  `dataset-like-count-${userId}-${id}`;

const readStoredNumber = (key: string, fallback: number) => {
  const saved = localStorage.getItem(key);
  const savedCount = saved ? Number(saved) : NaN;

  return Number.isNaN(savedCount) ? fallback : savedCount;
};

const withStoredEngagement = (
  dataset: DatasetSummaryItem,
  user: AuthUser | null
) => {
  const userId = user?.id ?? null;
  const usesLocalLikeCache = userId === 'local-dev';
  const likedDatasetIds = user?.likedDatasetIds?.map(Number);

  return {
    ...dataset,
    views: readStoredNumber(viewStorageKey(dataset.id), dataset.views),
    likes:
      userId !== null && usesLocalLikeCache
        ? readStoredNumber(
            datasetLikeCountStorageKey(userId, dataset.id),
            dataset.likes
          )
        : dataset.likes,
    downloads: readStoredNumber(
      downloadStorageKey(dataset.id),
      dataset.downloads
    ),
    isLike:
      userId === null
        ? false
        : Array.isArray(likedDatasetIds)
          ? likedDatasetIds.includes(dataset.id)
          : typeof dataset.isLike === 'boolean'
            ? dataset.isLike
            : localStorage.getItem(
                datasetLikeStorageKey(userId, dataset.id)
              ) === 'true',
  };
};

function DatasetGridSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className='h-[290px] animate-pulse rounded-2xl border border-slate-200 bg-white shadow-sm'
        >
          <div className='mx-auto mt-12 h-18 w-18 rounded-2xl bg-slate-100' />
          <div className='mx-auto mt-6 h-3 w-20 rounded bg-slate-100' />
          <div className='mx-auto mt-7 h-4 w-3/4 rounded bg-slate-100' />
          <div className='mx-auto mt-3 h-4 w-2/3 rounded bg-slate-100' />
          <div className='mt-16 h-12 border-t border-slate-100 bg-slate-50' />
        </div>
      ))}
    </div>
  );
}

export default function CompetitionDataset() {
  const { currentUser, isLoading: isUserLoading } = useCurrentUser();
  const [datasets, setDatasets] = useState<DatasetSummaryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fields, setFields] = useState<string[]>([]);
  const [sort, setSort] = useState('upload');
  const [year, setYear] = useState<string | undefined>(undefined);
  const search = useAtomValue(queryAtom);

  useEffect(() => {
    let cancelled = false;

    const fetchDatasets = async () => {
      if (isUserLoading) {
        return;
      }

      setIsLoading(true);
      const data = await getDatasets();

      if (!cancelled) {
        setDatasets(
          data.map((item) => withStoredEngagement(item, currentUser))
        );
        setIsLoading(false);
      }
    };

    fetchDatasets();

    return () => {
      cancelled = true;
    };
  }, [currentUser, isUserLoading]);

  useEffect(() => {
    const syncStoredEngagement = () => {
      setDatasets((current) =>
        current.map((item) => withStoredEngagement(item, currentUser))
      );
    };

    window.addEventListener('focus', syncStoredEngagement);
    window.addEventListener('pageshow', syncStoredEngagement);

    return () => {
      window.removeEventListener('focus', syncStoredEngagement);
      window.removeEventListener('pageshow', syncStoredEngagement);
    };
  }, [currentUser]);

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

  const handleDatasetDownloaded = (id: number) => {
    setDatasets((current) =>
      current.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const downloads = item.downloads + 1;
        localStorage.setItem(downloadStorageKey(id), String(downloads));

        return {
          ...item,
          downloads,
        };
      })
    );
  };

  const flatData = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return datasets
      .filter((item) => {
        const fieldMatch =
          fields.length === 0 ||
          fields.some(
            (field) => item.tags.includes(field) || item.type === field
          );

        const searchMatch =
          normalizedSearch.length === 0 ||
          item.title.toLowerCase().includes(normalizedSearch) ||
          item.description.toLowerCase().includes(normalizedSearch);

        const yearMatch = !year || String(item.year ?? '') === year;

        return fieldMatch && searchMatch && yearMatch;
      })
      .sort((a, b) => {
        if (sort === 'upload') {
          return (b.year ?? 0) - (a.year ?? 0) || b.id - a.id;
        }
        if (sort === 'view') {
          return b.views - a.views;
        }
        return 0;
      });
  }, [datasets, fields, search, sort, year]);

  return (
    <div className='space-y-6 px-6 py-10'>
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

      {isLoading ? (
        <DatasetGridSkeleton />
      ) : (
        <CompetitionDatasetGrid
          data={flatData}
          onDatasetDownloaded={handleDatasetDownloaded}
        />
      )}
    </div>
  );
}
