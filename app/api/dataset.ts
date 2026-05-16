import {
  DatasetItem,
  DatasetSummaryItem,
  PreviewFile,
} from '@/components/dataset/data/types';
import axios from 'axios';
import { toast } from 'sonner';
import { hasLocalDevUser } from './auth';
import { api, jwtApi } from './axios';

export type DatasetFileResponse = {
  id: number;
  name: string;
  description?: string | null;
  format: string;
  rowCount: number;
  columnCount: number;
  completionRate: number;
};

export type DatasetColumnProfile = {
  key: string;
  label: string;
  type: string;
  count: number;
  missingCount: number;
  numericStats?: Record<string, unknown> | null;
  categoricalStats?: Record<string, unknown> | null;
  histogramBins?: Array<Record<string, unknown>>;
};

export type DatasetFileProfileResponse = {
  id: number;
  name: string;
  rowCount: number;
  columnCount: number;
  completionRate: number;
  columnProfiles: DatasetColumnProfile[];
};

type DatasetChangeHistoryResponse = {
  version?: string | null;
  date?: string | null;
  description?: string | null;
};

type DatasetDetailResponse = DatasetSummaryItem & {
  isLike?: boolean | null;
  source?: string | null;
  updatedAt?: string | null;
  organization?: string | null;
  task?: string | null;
  formats?: string[] | null;
  annotationFormat?: string | null;
  serviceDomain?: string[] | null;
  buildScale?: string | null;
  purpose?: string | null;
  sampleNotice?: string | null;
  changeHistory?: DatasetChangeHistoryResponse[] | null;
  previewFiles?: PreviewFile[] | null;
};

export type DatasetLikeResponse = {
  likes: number;
  isLike: boolean;
};

export type DatasetLikeResult =
  | DatasetLikeResponse
  | {
      error: 'unauthorized' | 'unavailable';
    };

const zipFileName = (title: string) => {
  const normalized = title.trim().replace(/[\\/:*?"<>|\r\n]+/g, '_');
  return `${normalized || 'dataset'}.zip`;
};

export const DEFAULT_DATASET_DOWNLOADS: Record<number, number> = {
  1: 14,
  2: 410,
  3: 1204,
  4: 321,
  5: 210,
  6: 870,
  7: 560,
  8: 1500,
  9: 300,
  10: 620,
  11: 910,
  12: 470,
  13: 180,
  14: 250,
  15: 430,
  16: 760,
  17: 260,
  18: 540,
  19: 690,
  20: 310,
};

const toList = (value?: string[] | null) => value ?? [];
const toText = (value?: string | null) => value ?? '';
const toNumber = (value?: number | null) => value ?? 0;
const toDownloads = (id: number, value?: number | null) =>
  value && value > 0 ? value : (DEFAULT_DATASET_DOWNLOADS[id] ?? 0);

const normalizeDatasetSummary = (
  dataset: DatasetSummaryItem
): DatasetSummaryItem => ({
  ...dataset,
  image: dataset.image || '/favicon.png',
  year: toNumber(dataset.year),
  size: toText(dataset.size),
  views: toNumber(dataset.views),
  likes: toNumber(dataset.likes),
  downloads: toDownloads(dataset.id, dataset.downloads),
});

const normalizeDatasetDetail = (
  dataset: DatasetDetailResponse
): DatasetItem => {
  const previewFiles =
    dataset.previewFiles?.map((file) => ({
      ...file,
      columns: file.columns ?? [],
      rows: file.rows ?? [],
    })) ?? [];
  const firstPreview = previewFiles[0];

  return {
    id: dataset.id,
    title: dataset.title,
    description: toText(dataset.description),
    descriptionDetail: toText(dataset.description),
    useCases: [],
    tags: toList(dataset.tags),
    type: toText(dataset.type),
    image: dataset.image || '/favicon.png',
    year: toNumber(dataset.year),
    size: toText(dataset.size),
    views: toNumber(dataset.views),
    likes: toNumber(dataset.likes),
    downloads: toDownloads(dataset.id, dataset.downloads),
    isLike: dataset.isLike ?? undefined,
    source: toText(dataset.source),
    updatedAt: toText(dataset.updatedAt),
    organization: toText(dataset.organization),
    task: toText(dataset.task),
    formats: toList(dataset.formats),
    annotationFormat: toText(dataset.annotationFormat),
    serviceDomain: toList(dataset.serviceDomain),
    buildScale: toText(dataset.buildScale),
    purpose: toText(dataset.purpose),
    sampleNotice: toText(dataset.sampleNotice),
    changeHistory: (dataset.changeHistory ?? []).map((item) => ({
      version: toText(item.version),
      date: toText(item.date),
      description: toText(item.description),
    })),
    previewColumns: firstPreview?.columns ?? [],
    previewRows: firstPreview?.rows ?? [],
    previewFiles,
  };
};

export const getDatasets = async () => {
  try {
    const res = await api.get<DatasetSummaryItem[]>('/datasets');
    return res.data.map(normalizeDatasetSummary);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error('Failed to load datasets.');
    }

    return [];
  }
};

export const getDataset = async (id: number) => {
  try {
    const res = await api.get<DatasetDetailResponse>(`/datasets/${id}`);
    return normalizeDatasetDetail(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error('Failed to load dataset detail.');
    }

    return null;
  }
};

export const getDatasetFiles = async (datasetId: number) => {
  try {
    const res = await api.get<DatasetFileResponse[]>(
      `/datasets/${datasetId}/files`
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error('Failed to load dataset files.');
    }

    return [];
  }
};

export const getDatasetPreview = async (datasetId: number, fileId: number) => {
  try {
    const res = await api.get<PreviewFile>(
      `/datasets/${datasetId}/files/${fileId}/preview`
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error('Failed to load dataset preview.');
    }

    return null;
  }
};

export const getDatasetFileProfile = async (
  datasetId: number,
  fileId: number
) => {
  try {
    const res = await api.get<DatasetFileProfileResponse>(
      `/datasets/${datasetId}/files/${fileId}/profile`
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error('Failed to load dataset profile.');
    }

    return null;
  }
};

export const postDatasetLike = async (
  id: number
): Promise<DatasetLikeResult> => {
  try {
    const res = await jwtApi.post<DatasetLikeResponse>(`/datasets/${id}/likes`);
    return res.data;
  } catch (err) {
    if (hasLocalDevUser()) {
      return { error: 'unavailable' };
    }

    if (axios.isAxiosError(err) && err.response?.status === 401) {
      toast.error('좋아요는 로그인 후 이용할 수 있습니다.');
      return { error: 'unauthorized' };
    }

    return { error: 'unavailable' };
  }
};

export const downloadDatasetArchive = async (id: number, title: string) => {
  try {
    const res = await axios.get<Blob>(`/dataset-download/${id}`, {
      responseType: 'blob',
    });
    const blob = new Blob([res.data], {
      type: res.headers['content-type'] ?? 'application/zip',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = zipFileName(title);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    return true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error('Failed to download dataset zip.');
    }

    return false;
  }
};
