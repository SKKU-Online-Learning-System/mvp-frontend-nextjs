import { AuthUser } from '@/types/auth';
import axios from 'axios';
import { toast } from 'sonner';
import { jwtApi } from './axios';

const isDevelopment = process.env.NODE_ENV === 'development';
const localDevUserKey = 'local-dev-user';
const localDevUser: AuthUser = {
  id: 'local-dev',
  name: 'Local Admin',
  email: 'local-dev@example.com',
  profileImage: null,
};

const getStoredLocalDevUser = () => {
  if (!isDevelopment || typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(localDevUserKey) ? localDevUser : null;
};

export const hasLocalDevUser = () => getStoredLocalDevUser() !== null;

export const setLocalDevUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(localDevUserKey, 'true');
  }

  return localDevUser;
};

const clearLocalDevUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(localDevUserKey);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await jwtApi.get<AuthUser>('/auth/me');
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return getStoredLocalDevUser();
    }

    if (isDevelopment) {
      return getStoredLocalDevUser();
    }

    toast.error('로그인 정보를 불러오지 못했습니다.');
    return null;
  }
};

export const logoutUser = async () => {
  clearLocalDevUser();

  try {
    await jwtApi.post('/auth/logout');
    return true;
  } catch {
    if (isDevelopment) {
      return true;
    }

    toast.error('로그아웃에 실패했습니다.');
    return false;
  }
};
