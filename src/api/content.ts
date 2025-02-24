import { api, jwtApi } from "@/api/axios";
import {
  ContentResponseType,
  ContentDetailResponseType,
  ContentRequestType,
} from "@/type/content";

export const getContents = async () => {
  const res = await api.get<ContentResponseType[]>("/contents");
  if (res.status !== 200) {
    throw new Error("getContents api 에러 발생");
  }
  console.log(res.data);
  return res.data;
};

export const getContent = async (id: number) => {
  const res = await api.get<ContentDetailResponseType>(`/contents/${id}`);
  if (res.status !== 200) {
    throw new Error("getContent api 에러 발생");
  }
  return res.data;
};

export const createContent = async (content: ContentRequestType) => {
  const res = await api.post("/contents", content);
  if (res.status !== 201) {
    throw new Error("createContent api 에러 발생");
  }
};

export const patchContentLike = async (id: number) => {
  const res = await jwtApi.patch(`/contents/${id}/likes`);
  if (res.status !== 200) {
    throw new Error("patchContentLike api 에러 발생");
  }
};
