'use client';

import { ActivityDay, ActivityHeatmapResponse } from '@/app/api/my';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarDays, Flame, Sprout, Trophy } from 'lucide-react';
import { useMemo, useState } from 'react';

type Props = {
  data: ActivityHeatmapResponse | null;
  isLoading: boolean;
  hasError: boolean;
};

const WEEKDAY_LABELS = ['', '월', '', '수', '', '금', ''];

const LEVEL_CLASSES = [
  'bg-slate-100',
  'bg-green-200',
  'bg-green-400',
  'bg-green-600',
  'bg-green-800',
];

function levelOf(count: number) {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

function parseDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatKoreanDate(value: string) {
  const date = parseDate(value);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(date);
}

function describeDay(day: ActivityDay) {
  if (day.count === 0) {
    return '활동 없음';
  }

  const parts: string[] = [];
  if (day.visits > 0) parts.push(`방문 ${day.visits}회`);
  if (day.watches > 0) parts.push(`영상 시청 ${day.watches}편`);
  if (day.likes > 0) parts.push(`좋아요 ${day.likes}회`);
  if (day.downloads > 0) parts.push(`데이터셋 다운로드 ${day.downloads}회`);
  return parts.join(' · ');
}

type Column = {
  weekStart: string;
  cells: (ActivityDay | null)[];
  monthLabel: string | null;
};

function buildColumns(days: ActivityDay[]): Column[] {
  if (days.length === 0) {
    return [];
  }

  const columns: Column[] = [];
  let current: Column | null = null;
  let lastMonth = -1;

  for (const day of days) {
    const date = parseDate(day.date);
    const weekday = date.getDay();

    if (!current || weekday === 0) {
      current = {
        weekStart: day.date,
        cells: Array(7).fill(null),
        monthLabel: null,
      };
      columns.push(current);

      const month = date.getMonth();
      if (month !== lastMonth) {
        current.monthLabel = `${month + 1}월`;
        lastMonth = month;
      }
    }

    current.cells[weekday] = day;
  }

  return columns;
}

export function ActivityHeatmap({ data, isLoading, hasError }: Props) {
  const [hovered, setHovered] = useState<ActivityDay | null>(null);

  const columns = useMemo(() => buildColumns(data?.days ?? []), [data]);
  const latestActive = useMemo(
    () =>
      [...(data?.days ?? [])].reverse().find((day) => day.count > 0) ?? null,
    [data]
  );
  const focused = hovered ?? latestActive;

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <div className='grid gap-3 sm:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className='h-20 rounded-xl' />
          ))}
        </div>
        <Skeleton className='h-36 rounded-xl' />
      </div>
    );
  }

  if (hasError || !data) {
    return (
      <div className='flex min-h-40 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 text-center text-sm text-slate-500'>
        활동 기록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
      </div>
    );
  }

  return (
    <div className='space-y-5'>
      <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
        <StatTile
          icon={Sprout}
          label='총 활동'
          value={`${data.totalCount.toLocaleString()}회`}
        />
        <StatTile
          icon={CalendarDays}
          label='활동한 날'
          value={`${data.activeDays.toLocaleString()}일`}
        />
        <StatTile
          icon={Flame}
          label='현재 연속'
          value={`${data.currentStreak.toLocaleString()}일`}
          highlight={data.currentStreak > 0}
        />
        <StatTile
          icon={Trophy}
          label='최장 연속'
          value={`${data.longestStreak.toLocaleString()}일`}
        />
      </div>

      <div className='overflow-x-auto pb-1'>
        <div className='inline-flex min-w-full flex-col gap-1.5'>
          {/* 월 라벨 */}
          <div className='ml-8 flex gap-[3px] text-[11px] text-slate-400'>
            {columns.map((column) => (
              <div key={column.weekStart} className='w-3.5 shrink-0'>
                {column.monthLabel ? (
                  <span className='whitespace-nowrap'>{column.monthLabel}</span>
                ) : null}
              </div>
            ))}
          </div>

          <div className='flex gap-2'>
            {/* 요일 라벨 */}
            <div className='flex w-6 shrink-0 flex-col gap-[3px] text-[11px] text-slate-400'>
              {WEEKDAY_LABELS.map((label, index) => (
                <div
                  key={index}
                  className='flex h-3.5 items-center justify-end'
                >
                  {label}
                </div>
              ))}
            </div>

            {/* 격자 */}
            <div
              className='flex gap-[3px]'
              role='img'
              aria-label={`최근 ${columns.length}주 활동 기록`}
              onMouseLeave={() => setHovered(null)}
            >
              {columns.map((column) => (
                <div key={column.weekStart} className='flex flex-col gap-[3px]'>
                  {column.cells.map((day, index) => {
                    if (!day) {
                      return <div key={index} className='size-3.5' />;
                    }

                    const isFocused = focused?.date === day.date;

                    return (
                      <button
                        key={day.date}
                        type='button'
                        title={`${formatKoreanDate(day.date)} · ${describeDay(day)}`}
                        onMouseEnter={() => setHovered(day)}
                        onFocus={() => setHovered(day)}
                        onClick={() => setHovered(day)}
                        className={`size-3.5 rounded-[3px] transition ${
                          LEVEL_CLASSES[levelOf(day.count)]
                        } ${
                          isFocused
                            ? 'ring-2 ring-green-900/40 ring-offset-1'
                            : 'hover:ring-2 hover:ring-slate-300'
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <p className='text-sm text-slate-600'>
          {focused ? (
            <>
              <span className='font-semibold text-slate-900'>
                {formatKoreanDate(focused.date)}
              </span>
              <span className='mx-2 text-slate-300'>|</span>
              {describeDay(focused)}
            </>
          ) : (
            '아직 기록된 활동이 없습니다. 로그인한 상태로 영상을 보거나 데이터셋을 받으면 잔디가 채워집니다.'
          )}
        </p>

        <div className='flex items-center gap-1.5 text-xs text-slate-400'>
          <span className='mr-1'>적음</span>
          {LEVEL_CLASSES.map((color) => (
            <span key={color} className={`size-3.5 rounded-[3px] ${color}`} />
          ))}
          <span className='ml-1'>많음</span>
        </div>
      </div>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-4 py-3.5 ${
        highlight
          ? 'border-green-200 bg-green-50'
          : 'border-slate-200 bg-slate-50/60'
      }`}
    >
      <div
        className={`flex items-center gap-1.5 text-xs font-semibold ${
          highlight ? 'text-green-700' : 'text-slate-500'
        }`}
      >
        <Icon className='size-3.5' />
        {label}
      </div>
      <p className='mt-1.5 text-xl font-bold text-slate-900'>{value}</p>
    </div>
  );
}
