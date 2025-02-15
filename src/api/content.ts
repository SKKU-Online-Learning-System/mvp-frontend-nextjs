import { api } from "@/api/axios";
import { ContentType } from "@/type/content";

export const getContents = async () => {
  const res = await api.get<ContentType>("/contents");
  if (res.status !== 200) {
    throw new Error("getContents api 에러 발생");
  }
  return res.data;
};
