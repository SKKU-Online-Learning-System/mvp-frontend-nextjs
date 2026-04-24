import axios from 'axios';
import { toast } from 'sonner';
import { jwtApi } from './axios';
import { AuthUser } from '@/types/auth';

export const getCurrentUser = async () => {
    try {
        const res = await jwtApi.get<AuthUser>('/auth/me');
        return res.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
            return null;
        }

        toast.error('로그인 정보를 불러오지 못했습니다.');
        return null;
    }
};

export const logoutUser = async () => {
    try {
        await jwtApi.post('/auth/logout');
        return true;
    } catch {
        toast.error('로그아웃에 실패했습니다.');
        return false;
    }
};
