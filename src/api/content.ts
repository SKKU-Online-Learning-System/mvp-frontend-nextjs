import { api } from "@/api/axios";

export const getContents = async () => {
  const res = await api.get("/contents");
  if (res.status !== 200) {
    throw new Error("getContents api 에러 발생");
  }
  return res.data;
};
