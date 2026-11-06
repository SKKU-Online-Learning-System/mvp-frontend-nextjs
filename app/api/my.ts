import { DatasetSummaryItem } from '@/components/dataset/data/types';
import { ContentResponseType } from '@/types/content';
import axios from 'axios';
import { hasLocalDevUser } from './auth';
import { jwtApi } from './axios';

export type ContinueWatchingItem = {
  id: number;
  title: string;
  author?: string | null;
  thumbnailUrl?: string | null;
  link?: string | null;
  youtubeVideoId?: string | null;
  progressSeconds: number;
  durationSeconds: number;
  progressPercent: number;
  watchedAt?: string | null;
};

export type DownloadedDatasetItem = {
  dataset: DatasetSummaryItem;
  downloadedAt?: string | null;
};

export type MyDashboardResponse = {
  continueWatching: ContinueWatchingItem[];
  likedVideos: ContentResponseType[];
  likedCompetitionDatasets: DatasetSummaryItem[];
  recentDownloadedDatasets: DownloadedDatasetItem[];
};

const emptyDashboard: MyDashboardResponse = {
  continueWatching: [],
  likedVideos: [],
  likedCompetitionDatasets: [],
  recentDownloadedDatasets: [],
};

const localWatchProgressStoragePrefix = 'content-watch-progress-';

const getLocalContinueWatching = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  return Object.keys(localStorage)
    .filter((key) => key.startsWith(localWatchProgressStoragePrefix))
    .map((key) => {
      try {
        return JSON.parse(
          localStorage.getItem(key) ?? 'null'
        ) as ContinueWatchingItem | null;
      } catch {
        return null;
      }
    })
    .filter((item): item is ContinueWatchingItem => item !== null)
    .sort(
      (left, right) =>
        new Date(right.watchedAt ?? 0).getTime() -
        new Date(left.watchedAt ?? 0).getTime()
    );
};

export type ActivityDay = {
  date: string;
  count: number;
  visits: number;
  watches: number;
  likes: number;
  downloads: number;
};

export type ActivityHeatmapResponse = {
  startDate: string;
  endDate: string;
  days: ActivityDay[];
  totalCount: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
};

export type RoadmapSummary = {
  id: number;
  slug: string;
  title: string;
  description: string;
  level: string;
  category: string;
  stepCount: number;
  totalDurationSeconds: number;
  completedSteps: number;
  progressPercent: number;
  selected: boolean;
};

export type RoadmapStep = {
  id: number;
  order: number;
  title: string;
  description?: string | null;
  contentId?: number | null;
  contentTitle?: string | null;
  contentType?: string | null;
  thumbnailUrl?: string | null;
  link?: string | null;
  durationSeconds: number;
  completed: boolean;
  completedByWatching: boolean;
};

export type RoadmapDetail = Omit<RoadmapSummary, 'selected'> & {
  selectedAt?: string | null;
  nextStepId?: number | null;
  steps: RoadmapStep[];
};

export type RoadmapStepToggleResponse = {
  stepId: number;
  completed: boolean;
  completedSteps: number;
  progressPercent: number;
};

const toLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const buildEmptyHeatmap = (weeks: number): ActivityHeatmapResponse => {
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - (weeks - 1) * 7);
  start.setDate(start.getDate() - start.getDay());

  const days: ActivityDay[] = [];
  for (
    const cursor = new Date(start);
    cursor <= today;
    cursor.setDate(cursor.getDate() + 1)
  ) {
    days.push({
      date: toLocalDateString(cursor),
      count: 0,
      visits: 0,
      watches: 0,
      likes: 0,
      downloads: 0,
    });
  }

  return {
    startDate: toLocalDateString(start),
    endDate: toLocalDateString(today),
    days,
    totalCount: 0,
    activeDays: 0,
    currentStreak: 0,
    longestStreak: 0,
  };
};

export const getMyActivity = async (weeks = 26) => {
  if (hasLocalDevUser()) {
    return buildEmptyHeatmap(weeks);
  }

  try {
    const res = await jwtApi.get<ActivityHeatmapResponse>('/me/activity', {
      params: { weeks },
    });
    return {
      ...res.data,
      days: res.data.days ?? [],
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return buildEmptyHeatmap(weeks);
    }

    throw err;
  }
};

export const getRoadmaps = async () => {
  try {
    const res = await jwtApi.get<RoadmapSummary[]>('/roadmaps');
    return res.data ?? [];
  } catch {
    return [];
  }
};

export const getMyRoadmap = async (): Promise<RoadmapDetail | null> => {
  if (hasLocalDevUser()) {
    return null;
  }

  try {
    const res = await jwtApi.get<RoadmapDetail | ''>('/me/roadmap');
    if (res.status === 204 || !res.data) {
      return null;
    }
    return { ...res.data, steps: res.data.steps ?? [] };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return null;
    }

    throw err;
  }
};

export const selectRoadmap = async (roadmapId: number) => {
  // 학교 보안장비가 PUT/DELETE 를 차단하므로 POST 엔드포인트를 사용한다.
  const res = await jwtApi.post<RoadmapDetail>(
    `/me/roadmap/${roadmapId}/select`
  );
  return { ...res.data, steps: res.data.steps ?? [] };
};

export const clearRoadmap = async () => {
  await jwtApi.post('/me/roadmap/clear');
};

export const toggleRoadmapStep = async (stepId: number) => {
  const res = await jwtApi.post<RoadmapStepToggleResponse>(
    `/me/roadmap/steps/${stepId}/toggle`
  );
  return res.data;
};

export const getMyDashboard = async () => {
  if (hasLocalDevUser()) {
    return {
      ...emptyDashboard,
      continueWatching: getLocalContinueWatching(),
    };
  }

  try {
    const res = await jwtApi.get<MyDashboardResponse>('/me/dashboard');
    return {
      continueWatching: res.data.continueWatching ?? [],
      likedVideos: res.data.likedVideos ?? [],
      likedCompetitionDatasets: res.data.likedCompetitionDatasets ?? [],
      recentDownloadedDatasets: res.data.recentDownloadedDatasets ?? [],
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return emptyDashboard;
    }

    throw err;
  }
};
