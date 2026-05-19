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

const getCookieValue = (name: string) => {
  if (typeof document === 'undefined') {
    return null;
  }

  return (
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith(`${name}=`))
      ?.split('=')
      .slice(1)
      .join('=') ?? null
  );
};

const getKingoCookieUser = (): AuthUser | null => {
  const loginUserID = getCookieValue('loginUserID');
  const uid = getCookieValue('uid');

  if (!loginUserID && !uid) {
    return null;
  }

  const name = decodeURIComponent(loginUserID ?? uid ?? 'Kingo User');

  return {
    id: uid ?? name,
    name,
    email: '',
    profileImage: null,
  };
};

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

const clearCookie = (name: string) => {
  if (typeof document === 'undefined') {
    return;
  }

  const hostname = window.location.hostname;
  const base = `${name}=; Max-Age=0; path=/`;
  document.cookie = base;
  document.cookie = `${base}; domain=${hostname}`;

  if (hostname.split('.').length > 2) {
    document.cookie = `${base}; domain=.${hostname.split('.').slice(-3).join('.')}`;
  }
};

const clearKingoCookies = () => {
  [
    'loginUserID',
    'uid',
    'pToken',
    'skku_sso_token',
    'language',
    'access-token',
    'refresh-token',
  ].forEach(clearCookie);
};

const clearStoredDatasetLikes = () => {
  if (typeof window === 'undefined') {
    return;
  }

  Object.keys(localStorage)
    .filter(
      (key) =>
        key.startsWith('liked-') ||
        key.startsWith('likes-') ||
        key.startsWith('dataset-like-') ||
        key.startsWith('dataset-like-count-')
    )
    .forEach((key) => localStorage.removeItem(key));
};

export const getCurrentUser = async () => {
  try {
    const res = await jwtApi.get<AuthUser>('/auth/me');
    return res.data;
  } catch (err) {
    const fallbackUser = getStoredLocalDevUser() ?? getKingoCookieUser();

    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return fallbackUser;
    }

    if (isDevelopment) {
      return fallbackUser;
    }

    if (fallbackUser) {
      return fallbackUser;
    }

    toast.error('로그인 정보를 불러오지 못했습니다.');
    return null;
  }
};

export const logoutUser = async () => {
  clearLocalDevUser();
  clearKingoCookies();
  clearStoredDatasetLikes();

  try {
    await jwtApi.post('/auth/logout');
  } catch {
    // Client-side cleanup above is enough to update the UI even if SSO logout fails.
  }

  return true;
};
