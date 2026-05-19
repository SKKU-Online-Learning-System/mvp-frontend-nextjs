'use client';

import { downloadDatasetArchive, postDatasetLike } from '@/app/api/dataset';
import useCurrentUser from '@/hooks/useCurrentUser';
import { ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import DatasetPreview from './DatasetPreview';
import { DatasetItem } from './data/types';

type Props = {
  dataset: DatasetItem;
};

type SectionKey = 'overview' | 'intro' | 'preview';
type OpenSections = Record<SectionKey, boolean>;

const LABELS = {
  download: '다운로드',
  field: '분야',
  type: '유형',
  source: '출처',
  size: '용량',
  views: '조회수',
  likes: '관심',
  overview: '데이터 개요',
  intro: '소개',
  preview: '샘플 데이터',
  updateDate: '갱신년월',
  format: '데이터 형식',
  labelFormat: '라벨링 형식',
  service: '활용 서비스',
  amount: '데이터 구축량',
  purpose: '활용 방향',
  alert: '다운로드가 시작되었습니다.',
  loginRequired: '좋아요는 로그인 후 이용할 수 있습니다.',
};

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

const readStoredLike = (userId: number | string, datasetId: number) =>
  localStorage.getItem(datasetLikeStorageKey(userId, datasetId));

const readStoredLikeCount = (
  userId: number | string,
  datasetId: number,
  fallback: number
) => readStoredNumber(datasetLikeCountStorageKey(userId, datasetId), fallback);

const overviewRows = (dataset: DatasetItem) => [
  { label: LABELS.field, value: dataset.tags.join(', ') },
  { label: LABELS.type, value: dataset.type },
  { label: LABELS.source, value: dataset.source },
  { label: LABELS.format, value: dataset.formats.join(', ') },
  { label: LABELS.updateDate, value: dataset.updatedAt },
  { label: LABELS.size, value: dataset.size },
];

const metadataRows = (dataset: DatasetItem) => [
  {
    label: LABELS.field,
    value: dataset.tags.join(', '),
  },
  {
    label: '데이터 유형',
    value: dataset.type,
  },
  {
    label: LABELS.format,
    value: dataset.formats.join(', '),
  },
  {
    label: LABELS.labelFormat,
    value: dataset.annotationFormat,
  },
  {
    label: LABELS.service,
    value: dataset.serviceDomain.join(', '),
  },
  {
    label: LABELS.amount,
    value: dataset.buildScale,
  },
];

type AccordionSectionProps = {
  title: string;
  sectionKey: SectionKey;
  isOpen: boolean;
  onToggle: (key: SectionKey) => void;
  children: React.ReactNode;
};

function AccordionSection({
  title,
  sectionKey,
  isOpen,
  onToggle,
  children,
}: AccordionSectionProps) {
  return (
    <section className='rounded-[28px] border border-slate-200 bg-white shadow-sm'>
      <button
        type='button'
        onClick={() => onToggle(sectionKey)}
        className='flex w-full items-center justify-between px-7 py-6 text-left'
      >
        <h2 className='text-xl font-semibold text-slate-900'>{title}</h2>
        {isOpen ? (
          <ChevronUp className='h-5 w-5 text-slate-400' />
        ) : (
          <ChevronDown className='h-5 w-5 text-slate-400' />
        )}
      </button>
      {isOpen ? (
        <div className='border-t border-slate-200 p-7'>{children}</div>
      ) : null}
    </section>
  );
}

export default function DatasetDetail({ dataset }: Props) {
  const { currentUser, isLoading: isUserLoading } = useCurrentUser();
  const [views, setViews] = useState(dataset.views);
  const [likes, setLikes] = useState(dataset.likes);
  const [isLike, setIsLike] = useState(Boolean(dataset.isLike));
  const [downloads, setDownloads] = useState(dataset.downloads);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [openSections, setOpenSections] = useState<OpenSections>({
    overview: true,
    intro: true,
    preview: true,
  });

  useEffect(() => {
    setViews(readStoredNumber(viewStorageKey(dataset.id), dataset.views));
    setLikes(
      currentUser
        ? readStoredLikeCount(currentUser.id, dataset.id, dataset.likes)
        : dataset.likes
    );
    setDownloads(
      readStoredNumber(downloadStorageKey(dataset.id), dataset.downloads)
    );
    if (!currentUser) {
      setIsLike(false);
    } else if (typeof dataset.isLike === 'boolean') {
      setIsLike(dataset.isLike);
    } else {
      setIsLike(readStoredLike(currentUser.id, dataset.id) === 'true');
    }
  }, [
    currentUser,
    dataset.downloads,
    dataset.id,
    dataset.isLike,
    dataset.likes,
    dataset.views,
  ]);

  const handleDownload = async () => {
    if (isDownloading || isUserLoading) {
      return;
    }

    if (!currentUser) {
      toast.error(
        '\uB2E4\uC6B4\uB85C\uB4DC\uB294 \uB85C\uADF8\uC778 \uD6C4 \uC774\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.'
      );
      return;
    }

    setIsDownloading(true);

    try {
      const isSuccess = await downloadDatasetArchive(dataset.id, dataset.title);

      if (isSuccess) {
        const nextCount = downloads + 1;

        setDownloads(nextCount);
        localStorage.setItem(downloadStorageKey(dataset.id), String(nextCount));
        alert(LABELS.alert);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const persistLikeState = (nextLikes: number, nextIsLike: boolean) => {
    setLikes(nextLikes);
    setIsLike(nextIsLike);

    if (currentUser) {
      localStorage.setItem(
        datasetLikeStorageKey(currentUser.id, dataset.id),
        String(nextIsLike)
      );
      localStorage.setItem(
        datasetLikeCountStorageKey(currentUser.id, dataset.id),
        String(nextLikes)
      );
    }
  };

  const handleLike = async () => {
    if (isLiking || isUserLoading) {
      return;
    }

    if (!currentUser) {
      toast.error(LABELS.loginRequired);
      return;
    }

    setIsLiking(true);
    const result = await postDatasetLike(dataset.id);

    if ('error' in result) {
      if (result.error === 'local-only') {
        const nextIsLike = !isLike;
        const nextLikes = Math.max(0, likes + (nextIsLike ? 1 : -1));
        persistLikeState(nextLikes, nextIsLike);
      }

      setIsLiking(false);
      return;
    }

    persistLikeState(result.likes, result.isLike);
    setIsLiking(false);
  };

  const handleToggle = (section: SectionKey) => {
    setOpenSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  };

  return (
    <div className='mx-auto max-w-6xl px-6 py-10'>
      <section className='rounded-[28px] border border-slate-200 bg-white shadow-sm'>
        <div className='border-b border-slate-200 px-6 py-5 md:px-8'>
          <h1 className='text-3xl font-bold leading-tight text-slate-900 md:text-[34px]'>
            {dataset.title}
          </h1>
        </div>

        <div className='px-6 py-7 md:px-8'>
          <div className='flex flex-col gap-6 md:flex-row md:items-start'>
            <div className='flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50'>
              <img
                src={dataset.image}
                alt={dataset.title}
                className='h-16 w-16 object-contain'
              />
            </div>

            <div className='min-w-0 flex-1'>
              <div className='grid gap-3 md:grid-cols-3'>
                <div className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4'>
                  <div className='text-xs font-semibold text-slate-400'>
                    {LABELS.field}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-800'>
                    {dataset.tags.join(', ')}
                  </div>
                </div>
                <div className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4'>
                  <div className='text-xs font-semibold text-slate-400'>
                    {LABELS.type}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-800'>
                    {dataset.type}
                  </div>
                </div>
                <div className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4'>
                  <div className='text-xs font-semibold text-slate-400'>
                    {LABELS.source}
                  </div>
                  <div className='mt-2 text-sm font-semibold text-slate-800'>
                    {dataset.source}
                  </div>
                </div>
              </div>

              <div className='mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500'>
                <span>
                  {LABELS.updateDate} : {dataset.updatedAt}
                </span>
                <span>
                  {LABELS.views} : {views.toLocaleString()}
                </span>
                <span>
                  {LABELS.likes} : {likes.toLocaleString()}
                </span>
                <span>
                  {LABELS.download} : {downloads.toLocaleString()}
                </span>
                <span>
                  {LABELS.size} : {dataset.size}
                </span>
              </div>

              <div className='mt-6 flex flex-wrap gap-3'>
                <button
                  type='button'
                  onClick={handleDownload}
                  disabled={isDownloading || isUserLoading}
                  className='inline-flex rounded-xl bg-[#ff6f5d] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#f75e4a]'
                >
                  {LABELS.download}
                </button>
                <button
                  type='button'
                  onClick={handleLike}
                  disabled={isLiking || isUserLoading}
                  className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-colors ${
                    isLike
                      ? 'border-[#ff6f5d] bg-[#fff3f0] text-[#f75e4a]'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${isLike ? 'fill-current' : ''}`}
                  />
                  {LABELS.likes}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='mt-6 space-y-4'>
        <AccordionSection
          title={LABELS.overview}
          sectionKey='overview'
          isOpen={openSections.overview}
          onToggle={handleToggle}
        >
          <div className='grid gap-3 md:grid-cols-2'>
            {overviewRows(dataset).map((row) => (
              <div
                key={row.label}
                className='flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-4'
              >
                <span className='shrink-0 text-sm text-slate-500'>
                  {row.label}
                </span>
                <span className='text-right text-sm font-semibold text-slate-800'>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection
          title={LABELS.intro}
          sectionKey='intro'
          isOpen={openSections.intro}
          onToggle={handleToggle}
        >
          <p className='text-[15px] leading-8 text-slate-600'>
            {dataset.descriptionDetail}
          </p>

          <h3 className='mt-8 text-lg font-semibold text-slate-900'>
            {LABELS.purpose}
          </h3>
          <p className='mt-3 text-[15px] leading-8 text-slate-600'>
            {dataset.purpose}
          </p>

          <div className='mt-8 overflow-hidden rounded-2xl border border-slate-200'>
            {metadataRows(dataset).map((row, index) => (
              <div
                key={row.label}
                className={`grid text-sm md:grid-cols-[220px_minmax(0,1fr)] ${
                  index !== metadataRows(dataset).length - 1
                    ? 'border-b border-slate-200'
                    : ''
                }`}
              >
                <div className='bg-slate-50 px-5 py-4 font-semibold text-slate-600'>
                  {row.label}
                </div>
                <div className='px-5 py-4 leading-7 text-slate-700'>
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection
          title={LABELS.preview}
          sectionKey='preview'
          isOpen={openSections.preview}
          onToggle={handleToggle}
        >
          <p className='text-sm leading-6 text-slate-500'>
            {dataset.sampleNotice}
          </p>
          <div className='mt-5'>
            <DatasetPreview dataset={dataset} />
          </div>
        </AccordionSection>
      </div>
    </div>
  );
}
