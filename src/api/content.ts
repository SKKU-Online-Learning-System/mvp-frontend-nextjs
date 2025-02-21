import { api } from "@/api/axios";
import { ContentType, ContentDetailType } from "@/type/content";

export const getContents = async () => {
  const res = await api.get<ContentType[]>("/contents");
  if (res.status !== 200) {
    throw new Error("getContents api 에러 발생");
  }
  return res.data;
};

export const getContent = async (id: number) => {
  const res = await api.get<ContentDetailType>(`/contents/${id}`);
  if (res.status !== 200) {
    throw new Error("getContent api 에러 발생");
  }
  return res.data;
};

export const createContent = async (content: ContentDetailType) => {
  const res = await api.post("/contents", content);
  if (res.status !== 201) {
    throw new Error("createContent api 에러 발생");
  }
};
