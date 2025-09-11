import axios from 'axios';
import { toast } from 'sonner';
import {
  ContentDetailResponseType,
  ContentRequestType,
  ContentResponseType,
  PlaylistResonseType,
} from '../../types/content';
import { api, jwtApi } from './axios';

export const getContents = async (query: string = '') => {
  const res = await api.get<ContentResponseType[]>(
    query ? `/contents?search_query=${query}` : '/contents'
  );
  if (res.status !== 200) {
    throw new Error('getContents api 에러 발생');
  }
  console.log(res.data);
  return res.data;
};

export const getPlaylists = async (id: number) => {
  const res = await api.get<PlaylistResonseType>(`/playlists/${id}`);
  if (res.status !== 200) {
    throw new Error('getPlaylist api 에러 발생');
  }
  console.log(res.data);
  return res.data;
};

export const getContent = async (id: number) => {
  try {
    const res = await api.get<ContentDetailResponseType>(`/contents/${id}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
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
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        toast.error('로그인이 필요한 서비스입니다.');
      } else {
        toast.error('오류가 발생하였습니다.');
      }
    }
  }
};

export const postContentLike = async (id: number) => {
  try {
    await jwtApi.post(`/contents/${id}/likes`);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        toast.error('로그인이 필요한 서비스입니다.');
      }
      throw new Error('postContentLike api 에러 발생');
    }
  }
};
