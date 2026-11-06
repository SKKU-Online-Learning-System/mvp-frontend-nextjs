'use client';

import {
  ActivityHeatmapResponse,
  ContinueWatchingItem,
  DownloadedDatasetItem,
  MyDashboardResponse,
  getMyActivity,
  getMyDashboard,
} from '@/app/api/my';
import { DatasetSummaryItem } from '@/components/dataset/data/types';
import { ActivityHeatmap } from '@/components/my/ActivityHeatmap';
import { RoadmapSection } from '@/components/my/RoadmapSection';
import { Skeleton } from '@/components/ui/skeleton';
import useCurrentUser from '@/hooks/useCurrentUser';
import { ContentResponseType } from '@/types/content';
import {
  BookOpenCheck,
  CalendarDays,
  ChevronRight,
  Database,
  Download,
  Flame,
  Heart,
  PlayCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentType, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

const competitionDatasetHref =
  '/content/dataset?category=%EB%8C%80%ED%9A%8C%20%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%85%8B';

const HEATMAP_WEEKS = 26;

const emptyDashboard: MyDashboardResponse = {
  continueWatching: [],
  likedVideos: [],
  likedCompetitionDatasets: [],
  recentDownloadedDatasets: [],
};

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
      <Skeleton className='h-40 rounded-3xl' />
      <Skeleton className='mt-6 h-64 rounded-2xl' />
      <Skeleton className='mt-6 h-72 rounded-2xl' />
      <div className='mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, index) => (
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
  const [activity, setActivity] = useState<ActivityHeatmapResponse | null>(
    null
  );
  const [isActivityLoading, setIsActivityLoading] = useState(true);
  const [hasActivityError, setHasActivityError] = useState(false);

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

    const fetchActivity = async () => {
      setIsActivityLoading(true);
      setHasActivityError(false);

      try {
        const data = await getMyActivity(HEATMAP_WEEKS);
        if (!cancelled) {
          setActivity(data);
        }
      } catch {
        if (!cancelled) {
          setActivity(null);
          setHasActivityError(true);
        }
      } finally {
        if (!cancelled) {
          setIsActivityLoading(false);
        }
      }
    };

    fetchDashboard();
    fetchActivity();

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
              활동 잔디밭과 학습 로드맵, 이어보던 영상과 저장한 자료를 한 곳에서
              이어갈 수 있습니다.
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-2 text-sm'>
            {activity && activity.currentStreak > 0 ? (
              <div className='flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur'>
                <Flame className='h-5 w-5 text-amber-300' />
                {activity.currentStreak}일 연속 활동 중
              </div>
            ) : null}
            <div className='flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur'>
              <BookOpenCheck className='h-5 w-5 text-green-200' />
              연동 항목 {totalConnectedItems}개
            </div>
          </div>
        </div>
      </header>

      {hasDashboardError ? (
        <div className='mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800'>
          나의 명륜당 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
        </div>
      ) : null}

      <div className='mt-8 flex flex-col gap-6'>
        <section className='flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <div className='flex items-center gap-3'>
              <div className='rounded-xl bg-green-50 p-2.5 text-green-700'>
                <CalendarDays className='h-5 w-5' />
              </div>
              <div>
                <h2 className='text-lg font-bold text-slate-900'>
                  나의 활동 잔디밭
                </h2>
                <p className='mt-0.5 text-xs text-slate-400'>
                  로그인한 날의 방문, 영상 시청, 좋아요, 데이터셋 다운로드가
                  하루 단위로 쌓입니다.
                </p>
              </div>
            </div>
            <span className='rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700'>
              최근 {HEATMAP_WEEKS}주
            </span>
          </div>

          <div className='mt-6'>
            <ActivityHeatmap
              data={activity}
              isLoading={isActivityLoading}
              hasError={hasActivityError}
            />
          </div>
        </section>

        <RoadmapSection enabled={Boolean(currentUser)} />

        <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
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
        </div>
      </div>
    </main>
  );
}
