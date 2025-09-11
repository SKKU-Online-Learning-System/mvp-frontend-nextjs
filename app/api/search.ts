import axios from 'axios';
import { toast } from 'sonner';
import { ContentDetailResponseType } from '../../types/content';
import { api } from './axios';

export const searchContent = async (link: string) => {
  try {
    const res = await api.get<ContentDetailResponseType>(
      `/search?link=${link}`
    );
    toast.success('동영상 정보 가져오기 성공!');
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
