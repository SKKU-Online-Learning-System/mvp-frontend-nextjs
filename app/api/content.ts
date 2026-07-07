import axios from 'axios';
import { toast } from 'sonner';
import {
  ContentDetailResponseType,
  ContentRequestType,
  ContentResponseType,
  PlaylistResonseType,
} from '../../types/content';
import { hasLocalDevUser } from './auth';
import { api, jwtApi } from './axios';

export const getContents = async (query: string = '') => {
  try {
    const res = await api.get<ContentResponseType[]>(
      query ? `/contents?search_query=${query}` : '/contents'
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error('콘텐츠를 불러오는 중 오류가 발생하였습니다.');
    }
    return []; // 에러 시 빈 배열 반환으로 일관성 유지
  }
};

export const getPlaylists = async (id: number) => {
  try {
    const res = await api.get<PlaylistResonseType>(`/playlists/${id}`);
    return res.data;
  } catch (err) {
    return null;
  }
};

export const getContent = async (id: number) => {
  try {
    const res = await api.get<ContentDetailResponseType>(`/contents/${id}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      //?
      if (err.response?.status === 401) {
        toast.error('로그인이 필요한 서비스입니다.');
      } else {
        toast.error('오류가 발생하였습니다.');
      }
    }
  }
};

export const createContent = async (content: ContentRequestType) => {
  try {
    await api.post('/contents', content);
    toast.success('동영상 업로드에 성공하였습니다.');
    return true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        toast.error('로그인이 필요한 서비스입니다.');
      } else {
        toast.error('오류가 발생했습니다.');
      }
    }
    return false;
  }
};

export const postContentLike = async (id: number) => {
  try {
    await jwtApi.post(`/contents/${id}/likes`);
  } catch (err) {
    if (hasLocalDevUser()) {
      return;
    }

    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        toast.error('로그인이 필요한 서비스입니다.');
      }
      throw new Error('postContentLike api 에러 발생');
    }
  }
};

export type ContentWatchProgressPayload = {
  progressSeconds: number;
  durationSeconds?: number;
  completed?: boolean;
};

export const postContentWatchProgress = async (
  id: number,
  payload: ContentWatchProgressPayload
) => {
  if (hasLocalDevUser()) {
    return true;
  }

  try {
    await jwtApi.post(`/contents/${id}/watch-progress`, payload);
    return true;
  } catch {
    return false;
  }
};
