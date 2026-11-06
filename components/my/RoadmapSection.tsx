'use client';

import {
  RoadmapDetail,
  RoadmapStep,
  RoadmapSummary,
  clearRoadmap,
  getMyRoadmap,
  getRoadmaps,
  selectRoadmap,
  toggleRoadmapStep,
} from '@/app/api/my';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  Layers,
  PlayCircle,
  RefreshCw,
  Route,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  enabled: boolean;
};

function formatHours(seconds: number) {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes}분`;
  }
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours}시간` : `${hours}시간 ${rest}분`;
}

function formatMinutes(seconds: number) {
  const minutes = Math.max(1, Math.round(seconds / 60));
  return `${minutes}분`;
}

function levelClass(level: string) {
  switch (level) {
    case '입문':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    case '중급':
      return 'border-sky-200 bg-sky-50 text-sky-700';
    case '심화':
      return 'border-violet-200 bg-violet-50 text-violet-700';
    default:
      return '';
  }
}

function stepHref(step: RoadmapStep) {
  if (!step.contentId) {
    return null;
  }
  if (step.contentType === 'BOOK') {
    return `/textbook/${step.contentId}`;
  }
  if (step.contentType === 'INFLEARN' && step.link) {
    return step.link;
  }
  return `/video?id=${step.contentId}`;
}

export function RoadmapSection({ enabled }: Props) {
  const [roadmap, setRoadmap] = useState<RoadmapDetail | null>(null);
  const [roadmaps, setRoadmaps] = useState<RoadmapSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pendingRoadmapId, setPendingRoadmapId] = useState<number | null>(null);
  const [pendingStepId, setPendingStepId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const [mine, all] = await Promise.all([getMyRoadmap(), getRoadmaps()]);
      setRoadmap(mine);
      setRoadmaps(all);
    } catch {
      setRoadmap(null);
      setRoadmaps([]);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    load();
  }, [enabled, load]);

  const handleSelect = async (roadmapId: number) => {
    if (pendingRoadmapId !== null) return;

    setPendingRoadmapId(roadmapId);

    try {
      const detail = await selectRoadmap(roadmapId);
      setRoadmap(detail);
      setRoadmaps((current) =>
        current.map((item) => ({ ...item, selected: item.id === roadmapId }))
      );
      setIsPickerOpen(false);
      toast.success(`'${detail.title}' 로드맵을 시작했습니다.`);
    } catch {
      toast.error('로드맵을 선택하지 못했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setPendingRoadmapId(null);
    }
  };

  const handleClear = async () => {
    if (!roadmap) return;

    try {
      await clearRoadmap();
      setRoadmap(null);
      setRoadmaps((current) =>
        current.map((item) => ({ ...item, selected: false }))
      );
      toast.success('로드맵 선택을 해제했습니다.');
    } catch {
      toast.error('로드맵 해제에 실패했습니다.');
    }
  };

  const handleToggleStep = async (step: RoadmapStep) => {
    if (!roadmap || pendingStepId !== null || step.completedByWatching) {
      return;
    }

    setPendingStepId(step.id);

    try {
      const result = await toggleRoadmapStep(step.id);
      setRoadmap((current) => {
        if (!current) return current;

        const steps = current.steps.map((item) =>
          item.id === step.id ? { ...item, completed: result.completed } : item
        );
        const nextStep = steps.find((item) => !item.completed);

        return {
          ...current,
          steps,
          completedSteps: result.completedSteps,
          progressPercent: result.progressPercent,
          nextStepId: nextStep?.id ?? null,
        };
      });
    } catch {
      toast.error('단계 상태를 바꾸지 못했습니다.');
    } finally {
      setPendingStepId(null);
    }
  };

  return (
    <section className='flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <div className='rounded-xl bg-green-50 p-2.5 text-green-700'>
            <Route className='h-5 w-5' />
          </div>
          <div>
            <h2 className='text-lg font-bold text-slate-900'>
              내가 선택한 로드맵
            </h2>
            <p className='mt-0.5 text-xs text-slate-400'>
              강의를 순서대로 묶은 학습 코스입니다. 영상을 끝까지 보면 단계가
              자동으로 완료됩니다.
            </p>
          </div>
        </div>

        {roadmap ? (
          <div className='flex items-center gap-2'>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() => setIsPickerOpen(true)}
            >
              <RefreshCw className='size-3.5' />
              로드맵 변경
            </Button>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='text-slate-500'
              onClick={handleClear}
            >
              선택 해제
            </Button>
          </div>
        ) : null}
      </div>

      <div className='mt-6'>
        {isLoading ? (
          <div className='space-y-3'>
            <Skeleton className='h-24 rounded-2xl' />
            <Skeleton className='h-16 rounded-2xl' />
            <Skeleton className='h-16 rounded-2xl' />
          </div>
        ) : hasError ? (
          <div className='flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 text-center text-sm text-slate-500'>
            로드맵 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
          </div>
        ) : roadmap ? (
          <SelectedRoadmap
            roadmap={roadmap}
            pendingStepId={pendingStepId}
            onToggleStep={handleToggleStep}
          />
        ) : (
          <RoadmapPicker
            roadmaps={roadmaps}
            pendingRoadmapId={pendingRoadmapId}
            onSelect={handleSelect}
          />
        )}
      </div>

      <Dialog open={isPickerOpen} onOpenChange={setIsPickerOpen}>
        <DialogContent className='max-h-[85vh] overflow-y-auto sm:max-w-3xl'>
          <DialogHeader>
            <DialogTitle>로드맵 변경</DialogTitle>
            <DialogDescription>
              다른 로드맵을 선택하면 현재 로드맵의 진행 상황은 그대로 보관되고,
              선택만 바뀝니다.
            </DialogDescription>
          </DialogHeader>
          <RoadmapPicker
            roadmaps={roadmaps}
            pendingRoadmapId={pendingRoadmapId}
            onSelect={handleSelect}
            compact
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}

function RoadmapPicker({
  roadmaps,
  pendingRoadmapId,
  onSelect,
  compact = false,
}: {
  roadmaps: RoadmapSummary[];
  pendingRoadmapId: number | null;
  onSelect: (roadmapId: number) => void;
  compact?: boolean;
}) {
  if (roadmaps.length === 0) {
    return (
      <div className='flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 text-center text-sm text-slate-500'>
        아직 준비된 로드맵이 없습니다.
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {!compact ? (
        <div className='rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-4'>
          <p className='font-semibold text-slate-800'>
            아직 선택한 학습 로드맵이 없습니다.
          </p>
          <p className='mt-1 text-sm leading-6 text-slate-500'>
            관심 분야의 로드맵을 하나 고르면 다음에 볼 강의와 진행률을 이
            자리에서 바로 확인할 수 있습니다.
          </p>
        </div>
      ) : null}

      <div
        className={`grid gap-3 ${
          compact ? 'sm:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-4'
        }`}
      >
        {roadmaps.map((item) => {
          const isPending = pendingRoadmapId === item.id;

          return (
            <div
              key={item.id}
              className={`flex flex-col gap-3 rounded-2xl border p-4 transition ${
                item.selected
                  ? 'border-green-600 bg-green-50/40'
                  : 'border-slate-200 bg-white hover:border-slate-400'
              }`}
            >
              <div className='flex flex-wrap items-center gap-1.5'>
                <Badge variant='outline' className={levelClass(item.level)}>
                  {item.level}
                </Badge>
                <Badge variant='secondary'>{item.category}</Badge>
              </div>

              <div className='min-w-0'>
                <h3 className='text-[15px] font-bold leading-6 text-slate-900'>
                  {item.title}
                </h3>
                <p className='mt-1 line-clamp-3 text-xs leading-5 text-slate-500'>
                  {item.description}
                </p>
              </div>

              <div className='mt-auto flex items-center gap-3 text-xs text-slate-500'>
                <span className='flex items-center gap-1'>
                  <Layers className='size-3.5' />
                  {item.stepCount}단계
                </span>
                <span className='flex items-center gap-1'>
                  <Clock3 className='size-3.5' />
                  {formatHours(item.totalDurationSeconds)}
                </span>
                {item.completedSteps > 0 ? (
                  <span className='ml-auto font-semibold text-green-700'>
                    {item.progressPercent}% 진행
                  </span>
                ) : null}
              </div>

              <Button
                type='button'
                size='sm'
                variant={item.selected ? 'secondary' : 'default'}
                disabled={isPending || item.selected}
                onClick={() => onSelect(item.id)}
              >
                {item.selected ? (
                  <>
                    <Check className='size-3.5' />
                    선택됨
                  </>
                ) : isPending ? (
                  '선택 중...'
                ) : (
                  '이 로드맵으로 시작'
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SelectedRoadmap({
  roadmap,
  pendingStepId,
  onToggleStep,
}: {
  roadmap: RoadmapDetail;
  pendingStepId: number | null;
  onToggleStep: (step: RoadmapStep) => void;
}) {
  const nextStep =
    roadmap.steps.find((step) => step.id === roadmap.nextStepId) ?? null;
  const nextHref = nextStep ? stepHref(nextStep) : null;
  const isFinished =
    roadmap.stepCount > 0 && roadmap.completedSteps >= roadmap.stepCount;

  return (
    <div className='space-y-5'>
      <div className='rounded-2xl border border-slate-200 bg-slate-50/60 p-5'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
          <div className='min-w-0'>
            <div className='flex flex-wrap items-center gap-1.5'>
              <Badge variant='outline' className={levelClass(roadmap.level)}>
                {roadmap.level}
              </Badge>
              <Badge variant='secondary'>{roadmap.category}</Badge>
            </div>
            <h3 className='mt-2 text-xl font-bold text-slate-900'>
              {roadmap.title}
            </h3>
            <p className='mt-1 text-sm leading-6 text-slate-500'>
              {roadmap.description}
            </p>
          </div>

          {isFinished ? (
            <div className='flex shrink-0 items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700'>
              <CheckCircle2 className='size-4' />
              로드맵을 모두 완료했습니다
            </div>
          ) : nextStep ? (
            <div className='shrink-0 rounded-xl border border-slate-200 bg-white p-4 lg:w-72'>
              <p className='text-xs font-semibold text-slate-400'>다음 단계</p>
              <p className='mt-1 line-clamp-2 text-sm font-semibold text-slate-900'>
                {nextStep.order}. {nextStep.title}
              </p>
              {nextHref ? (
                <Button asChild size='sm' className='mt-3 w-full'>
                  <Link
                    href={nextHref}
                    target={
                      nextStep.contentType === 'INFLEARN' ? '_blank' : undefined
                    }
                  >
                    <PlayCircle className='size-4' />
                    이어서 학습하기
                  </Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className='mt-5'>
          <div className='flex items-center justify-between text-xs text-slate-500'>
            <span>
              {roadmap.completedSteps} / {roadmap.stepCount} 단계 완료 · 총{' '}
              {formatHours(roadmap.totalDurationSeconds)}
            </span>
            <span className='font-semibold text-green-700'>
              {roadmap.progressPercent}%
            </span>
          </div>
          <div className='mt-2 h-2 overflow-hidden rounded-full bg-slate-200'>
            <div
              className='h-full rounded-full bg-green-600 transition-all duration-500'
              style={{ width: `${roadmap.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <ol className='space-y-2'>
        {roadmap.steps.map((step) => {
          const href = stepHref(step);
          const isNext = step.id === roadmap.nextStepId;
          const isPending = pendingStepId === step.id;

          return (
            <li
              key={step.id}
              className={`flex items-center gap-3 rounded-2xl border p-3 transition ${
                step.completed
                  ? 'border-green-100 bg-green-50/40'
                  : isNext
                    ? 'border-green-600 bg-white'
                    : 'border-slate-100 bg-white'
              }`}
            >
              <button
                type='button'
                onClick={() => onToggleStep(step)}
                disabled={isPending || step.completedByWatching}
                title={
                  step.completedByWatching
                    ? '영상 시청으로 완료된 단계입니다'
                    : step.completed
                      ? '완료 표시 해제'
                      : '완료로 표시'
                }
                className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition ${
                  step.completed
                    ? 'border-green-600 bg-green-600 text-white'
                    : 'border-slate-300 text-slate-300 hover:border-green-600 hover:text-green-600'
                } disabled:cursor-default`}
              >
                {step.completed ? (
                  <Check className='size-4' />
                ) : (
                  <Circle className='size-4' />
                )}
              </button>

              {step.thumbnailUrl ? (
                <img
                  src={step.thumbnailUrl}
                  alt=''
                  className='hidden h-12 w-20 shrink-0 rounded-lg bg-slate-100 object-cover sm:block'
                />
              ) : null}

              <div className='min-w-0 flex-1'>
                <p
                  className={`line-clamp-2 text-sm font-semibold leading-5 ${
                    step.completed ? 'text-slate-500' : 'text-slate-900'
                  }`}
                >
                  <span className='mr-1 text-slate-400'>{step.order}.</span>
                  {step.title}
                </p>
                <p className='mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-slate-400'>
                  {step.durationSeconds > 0 ? (
                    <span className='flex items-center gap-1'>
                      <Clock3 className='size-3' />
                      {formatMinutes(step.durationSeconds)}
                    </span>
                  ) : null}
                  {step.completedByWatching ? (
                    <span className='text-green-700'>시청 완료</span>
                  ) : step.completed ? (
                    <span className='text-green-700'>완료 표시</span>
                  ) : isNext ? (
                    <span className='font-semibold text-green-700'>
                      다음 단계
                    </span>
                  ) : null}
                </p>
              </div>

              {href ? (
                <Button
                  asChild
                  size='sm'
                  variant={isNext ? 'default' : 'outline'}
                  className='shrink-0'
                >
                  <Link
                    href={href}
                    target={
                      step.contentType === 'INFLEARN' ? '_blank' : undefined
                    }
                  >
                    <PlayCircle className='size-3.5' />
                    <span className='hidden sm:inline'>보기</span>
                  </Link>
                </Button>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
