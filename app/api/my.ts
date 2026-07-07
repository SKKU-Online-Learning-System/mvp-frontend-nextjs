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
