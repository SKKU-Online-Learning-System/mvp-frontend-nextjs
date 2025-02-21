import { api } from "@/api/axios";
import { ContentDetailType } from "@/type/content";

export const searchContent = async (link: string) => {
  const res = await api.get<ContentDetailType>(`/search?link=${link}`);
  if (res.status !== 200) {
    throw new Error("searchContent api 에러 발생");
  }
  return res.data;
};
