'use client';

import {
  ContinueWatchingItem,
  DownloadedDatasetItem,
  MyDashboardResponse,
  getMyDashboard,
} from '@/app/api/my';
import { DatasetSummaryItem } from '@/components/dataset/data/types';
import { Skeleton } from '@/components/ui/skeleton';
import useCurrentUser from '@/hooks/useCurrentUser';
import { ContentResponseType } from '@/types/content';
import {
  BookOpenCheck,
  CalendarDays,
  ChevronRight,
  Database,
  Download,
  Heart,
  PlayCircle,
  Route,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentType, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

const competitionDatasetHref =
  '/content/dataset?category=%EB%8C%80%ED%9A%8C%20%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%85%8B';

const emptyDashboard: MyDashboardResponse = {
  continueWatching: [],
  likedVideos: [],
  likedCompetitionDatasets: [],
  recentDownloadedDatasets: [],
};

const activityLevels = Array.from({ length: 20 * 7 }, (_, index) => {
  if (index > 112) return 0;
  if (index % 19 === 0) return 4;
  if (index % 11 === 0) return 3;
  if (index % 7 === 0 || index % 13 === 0) return 2;
  if (index % 5 === 0) return 1;
  return 0;
});

const activityColors = [
  'bg-slate-100',
  'bg-green-200',
  'bg-green-400',
  'bg-green-600',
  'bg-green-800',
];

type SectionShellProps = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  actionLabel: string;
  href: string;
  children: ReactNode;
  badge?: string;
};

function DashboardLoading() {
  return (
    <div className='mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8'>
      <Skeleton className='h-9 w-56' />
      <Skeleton className='mt-3 h-5 w-80 max-w-full' />
      <div className='mt-8 grid gap-5 md:grid-cols-2'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className='h-64 rounded-2xl' />
        ))}
      </div>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className='space-y-3'>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className='h-20 rounded-2xl' />
      ))}
    </div>
  );
}

function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm leading-6 text-slate-500'>
      {children}
    </div>
  );
}

function ScrollableList({ children }: { children: ReactNode }) {
  return (
    <div className='max-h-80 space-y-3 overflow-y-auto pr-1'>{children}</div>
  );
}

function SectionShell({
  title,
  icon: Icon,
  actionLabel,
  href,
  children,
  badge,
}: SectionShellProps) {
  return (
    <section className='flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <div className='rounded-xl bg-green-50 p-2.5 text-green-700'>
            <Icon className='h-5 w-5' />
          </div>
          <h2 className='text-lg font-bold text-slate-900'>{title}</h2>
        </div>
        {badge ? (
          <span className='rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700'>
            {badge}
          </span>
        ) : null}
      </div>

      <div className='mt-5 flex-1'>{children}</div>

      <Link
        href={href}
        className='mt-5 inline-flex w-fit items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-800'
      >
        {actionLabel}
        <ChevronRight className='h-4 w-4' />
      </Link>
    </section>
  );
}

function formatDuration(seconds?: number | null) {
  const safeSeconds = Math.max(0, Number(seconds ?? 0));
  const minutes = Math.floor(safeSeconds / 60);
  const restSeconds = safeSeconds % 60;

  return `${minutes}:${String(restSeconds).padStart(2, '0')}`;
}

function formatDate(value?: string | null) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function ContinueWatchingCard({ item }: { item: ContinueWatchingItem }) {
  const resumeAt = Math.max(0, item.progressSeconds - 3);
  const href = `/video?id=${item.id}&t=${resumeAt}`;

  return (
    <Link
      href={href}
      className='flex gap-3 rounded-2xl border border-slate-100 p-3 transition-colors hover:bg-slate-50'
    >
      <img
        src={item.thumbnailUrl || '/favicon.png'}
        alt={item.title}
        className='h-16 w-24 shrink-0 rounded-xl bg-slate-100 object-cover'
      />
      <div className='min-w-0 flex-1'>
        <p className='line-clamp-2 text-sm font-semibold leading-5 text-slate-900'>
          {item.title}
        </p>
        <p className='mt-1 text-xs text-slate-500'>
          {formatDuration(item.progressSeconds)} /{' '}
          {formatDuration(item.durationSeconds)}
        </p>
        <div className='mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100'>
          <div
            className='h-full rounded-full bg-green-600'
            style={{ width: `${item.progressPercent}%` }}
          />
        </div>
      </div>
    </Link>
  );
}

function LikedVideoCard({ item }: { item: ContentResponseType }) {
  return (
    <Link
      href={`/video?id=${item.id}`}
      className='flex gap-3 rounded-2xl border border-slate-100 p-3 transition-colors hover:bg-slate-50'
    >
      <img
        src={item.thumbnailUrl || '/favicon.png'}
        alt={item.title}
        className='h-16 w-24 shrink-0 rounded-xl bg-slate-100 object-cover'
      />
      <div className='min-w-0'>
        <p className='line-clamp-2 text-sm font-semibold leading-5 text-slate-900'>
          {item.title}
        </p>
        <p className='mt-1 truncate text-xs text-slate-500'>{item.author}</p>
        <p className='mt-2 text-xs font-medium text-green-700'>
          좋아요 {item.likeCount.toLocaleString()}개
        </p>
      </div>
    </Link>
  );
}

function DatasetCard({ item }: { item: DatasetSummaryItem }) {
  return (
    <Link
      href={`/dataset/${item.id}`}
      className='flex gap-3 rounded-2xl border border-slate-100 p-3 transition-colors hover:bg-slate-50'
    >
      <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-50'>
        <img
          src={item.image || '/favicon.png'}
          alt={item.title}
          className='h-10 w-10 object-contain'
        />
      </div>
      <div className='min-w-0'>
        <p className='line-clamp-2 text-sm font-semibold leading-5 text-slate-900'>
          {item.title}
        </p>
        <p className='mt-1 text-xs text-slate-500'>
          {item.year ?? '-'} | {item.size || '-'}
        </p>
        <p className='mt-2 text-xs font-medium text-green-700'>
          좋아요 {item.likes.toLocaleString()}개
        </p>
      </div>
    </Link>
  );
}

function DownloadedDatasetCard({ item }: { item: DownloadedDatasetItem }) {
  return (
    <div className='relative'>
      <DatasetCard item={item.dataset} />
      {item.downloadedAt ? (
        <span className='absolute right-3 top-3 rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-500'>
          {formatDate(item.downloadedAt)}
        </span>
      ) : null}
    </div>
  );
}

export function MyDashboard() {
  const router = useRouter();
  const { currentUser, isLoading } = useCurrentUser();
  const [dashboard, setDashboard] =
    useState<MyDashboardResponse>(emptyDashboard);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);
  const [hasDashboardError, setHasDashboardError] = useState(false);

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.replace('/');
    }
  }, [currentUser, isLoading, router]);

  useEffect(() => {
    if (isLoading || !currentUser) {
      return;
    }

    let cancelled = false;

    const fetchDashboard = async () => {
      setIsDashboardLoading(true);
      setHasDashboardError(false);

      try {
        const data = await getMyDashboard();
        if (!cancelled) {
          setDashboard(data);
        }
      } catch {
        if (!cancelled) {
          setDashboard(emptyDashboard);
          setHasDashboardError(true);
        }
      } finally {
        if (!cancelled) {
          setIsDashboardLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      cancelled = true;
    };
  }, [currentUser, isLoading]);

  const totalConnectedItems = useMemo(
    () =>
      dashboard.continueWatching.length +
      dashboard.likedVideos.length +
      dashboard.likedCompetitionDatasets.length +
      dashboard.recentDownloadedDatasets.length,
    [dashboard]
  );

  if (isLoading || !currentUser) {
    return <DashboardLoading />;
  }

  return (
    <main className='mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8'>
      <header className='rounded-3xl bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 px-6 py-8 text-white shadow-lg sm:px-8'>
        <div className='flex flex-col justify-between gap-6 sm:flex-row sm:items-end'>
          <div>
            <span className='text-sm font-semibold text-green-200'>
              나의 명륜당
            </span>
            <h1 className='mt-2 text-2xl font-bold sm:text-3xl'>
              {currentUser.name}님의 학습 공간
            </h1>
            <p className='mt-3 max-w-2xl text-sm leading-6 text-green-100'>
              이어보던 영상, 좋아요한 영상과 대회 데이터셋, 최근 내려받은 자료를
              한 곳에서 다시 이어갈 수 있습니다.
            </p>
          </div>
          <div className='flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur'>
            <BookOpenCheck className='h-5 w-5 text-green-200' />
            연동 항목 {totalConnectedItems}개
          </div>
        </div>
      </header>

      {hasDashboardError ? (
        <div className='mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800'>
          나의 명륜당 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
        </div>
      ) : null}

      <div className='mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
        <SectionShell
          title='영상 이어보기'
          icon={PlayCircle}
          actionLabel='영상 둘러보기'
          href='/content/education'
          badge={`${dashboard.continueWatching.length}개`}
        >
          {isDashboardLoading ? (
            <SectionSkeleton />
          ) : dashboard.continueWatching.length > 0 ? (
            <ScrollableList>
              {dashboard.continueWatching.map((item) => (
                <ContinueWatchingCard key={item.id} item={item} />
              ))}
            </ScrollableList>
          ) : (
            <EmptyState>
              아직 이어볼 영상이 없습니다.
              <br />
              로그인 후 영상을 재생하면 마지막 시청 위치가 여기에 표시됩니다.
            </EmptyState>
          )}
        </SectionShell>

        <SectionShell
          title='좋아요 누른 영상'
          icon={Heart}
          actionLabel='콘텐츠 둘러보기'
          href='/content/conference'
          badge={`${dashboard.likedVideos.length}개`}
        >
          {isDashboardLoading ? (
            <SectionSkeleton />
          ) : dashboard.likedVideos.length > 0 ? (
            <ScrollableList>
              {dashboard.likedVideos.map((item) => (
                <LikedVideoCard key={item.id} item={item} />
              ))}
            </ScrollableList>
          ) : (
            <EmptyState>
              아직 좋아요를 누른 영상이 없습니다.
              <br />
              관심 있는 특강과 강의를 저장해 보세요.
            </EmptyState>
          )}
        </SectionShell>

        <SectionShell
          title='좋아요 누른 대회 데이터셋'
          icon={Database}
          actionLabel='대회 데이터셋 둘러보기'
          href={competitionDatasetHref}
          badge={`${dashboard.likedCompetitionDatasets.length}개`}
        >
          {isDashboardLoading ? (
            <SectionSkeleton />
          ) : dashboard.likedCompetitionDatasets.length > 0 ? (
            <ScrollableList>
              {dashboard.likedCompetitionDatasets.map((item) => (
                <DatasetCard key={item.id} item={item} />
              ))}
            </ScrollableList>
          ) : (
            <EmptyState>
              아직 좋아요를 누른 대회 데이터셋이 없습니다.
              <br />
              프로젝트에 필요한 데이터셋을 저장해 보세요.
            </EmptyState>
          )}
        </SectionShell>

        <SectionShell
          title='최근 다운로드한 대회 데이터셋'
          icon={Download}
          actionLabel='대회 데이터셋 보기'
          href={competitionDatasetHref}
          badge={`${dashboard.recentDownloadedDatasets.length}개`}
        >
          {isDashboardLoading ? (
            <SectionSkeleton />
          ) : dashboard.recentDownloadedDatasets.length > 0 ? (
            <ScrollableList>
              {dashboard.recentDownloadedDatasets.map((item, index) => (
                <DownloadedDatasetCard
                  key={`${item.dataset.id}-${item.downloadedAt ?? index}`}
                  item={item}
                />
              ))}
            </ScrollableList>
          ) : (
            <EmptyState>
              아직 다운로드한 대회 데이터셋이 없습니다.
              <br />
              다운로드가 완료되면 최근 기록이 여기에 쌓입니다.
            </EmptyState>
          )}
        </SectionShell>

        <section className='flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2 xl:col-span-2'>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <div className='rounded-xl bg-green-50 p-2.5 text-green-700'>
                <Route className='h-5 w-5' />
              </div>
              <div>
                <h2 className='text-lg font-bold text-slate-900'>
                  내가 선택한 로드맵
                </h2>
                <p className='mt-1 text-xs text-slate-400'>
                  로드맵 및 진행 상황 연동 예정
                </p>
              </div>
            </div>
            <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500'>
              0% 진행
            </span>
          </div>

          <div className='mt-7 flex flex-1 flex-col justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6'>
            <p className='font-semibold text-slate-800'>
              아직 선택한 학습 로드맵이 없습니다.
            </p>
            <p className='mt-2 text-sm leading-6 text-slate-500'>
              관심 분야와 목표를 선택하면 강의, 교재, 데이터셋을 묶는 학습
              순서를 제안할 예정입니다.
            </p>
            <button
              type='button'
              disabled
              className='mt-5 w-fit cursor-not-allowed rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500'
            >
              로드맵 선택 기능 준비 중
            </button>
          </div>
        </section>

        <section className='flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2 xl:col-span-3'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <div className='flex items-center gap-3'>
              <div className='rounded-xl bg-green-50 p-2.5 text-green-700'>
                <CalendarDays className='h-5 w-5' />
              </div>
              <div>
                <h2 className='text-lg font-bold text-slate-900'>
                  나의 활동 잔디밭
                </h2>
                <p className='mt-1 text-xs text-slate-400'>
                  로그인과 학습 활동을 일별로 기록할 예정입니다.
                </p>
              </div>
            </div>
            <span className='rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700'>
              화면 구성용 샘플
            </span>
          </div>

          <div className='mt-7 overflow-x-auto pb-2'>
            <div
              className='grid min-w-[680px] grid-flow-col grid-rows-7 gap-1.5'
              aria-label='최근 20주 활동 히트맵 샘플'
            >
              {activityLevels.map((level, index) => (
                <div
                  key={index}
                  className={`aspect-square min-w-4 rounded-[3px] ${activityColors[level]}`}
                  title={`샘플 활동 강도 ${level}`}
                />
              ))}
            </div>
          </div>

          <div className='mt-auto flex items-center justify-end gap-1.5 text-xs text-slate-400'>
            <span className='mr-1'>적음</span>
            {activityColors.map((color) => (
              <span
                key={color}
                className={`h-3.5 w-3.5 rounded-[3px] ${color}`}
              />
            ))}
            <span className='ml-1'>많음</span>
          </div>
        </section>
      </div>
    </main>
  );
}
