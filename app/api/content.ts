import {
  ContentDetailResponseType,
  ContentRequestType,
  ContentResponseType,
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

export const getContent = async (id: number) => {
  const res = await api.get<ContentDetailResponseType>(`/contents/${id}`);
  if (res.status !== 200) {
    throw new Error('getContent api 에러 발생');
  }
  return res.data;
};

export const createContent = async (content: ContentRequestType) => {
  const res = await api.post('/contents', content);
  if (res.status !== 201) {
    throw new Error('createContent api 에러 발생');
  }
};

export const postContentLike = async (id: number) => {
  const res = await jwtApi.post(`/contents/${id}/likes`);
  if (res.status !== 200) {
    throw new Error('patchContentLike api 에러 발생');
  }
};
