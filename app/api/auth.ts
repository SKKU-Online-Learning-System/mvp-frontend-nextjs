import { AuthUser } from '@/types/auth';
import axios from 'axios';
import { toast } from 'sonner';
import { jwtApi } from './axios';

const isDevelopment = process.env.NODE_ENV === 'development';
const localDevUserKey = 'local-dev-user';
const loggedOutKey = 'mrdang-auth-logged-out';
export const authLogoutEvent = 'mrdang:auth:logout';
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
  if (hasLoggedOutMarker()) {
    return null;
  }

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
    localStorage.removeItem(loggedOutKey);
    localStorage.setItem(localDevUserKey, 'true');
  }

  return localDevUser;
};

const clearLocalDevUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(localDevUserKey);
  }
};

const hasLoggedOutMarker = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return localStorage.getItem(loggedOutKey) === 'true';
};

const markLoggedOut = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(loggedOutKey, 'true');
  }
};

export const clearLoggedOutMarker = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(loggedOutKey);
  }
};

const clearCookie = (name: string) => {
  if (typeof document === 'undefined') {
    return;
  }

  const hostname = window.location.hostname;
  const base = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  document.cookie = base;

  const parts = hostname.split('.');
  const domainCandidates = new Set<string>();

  for (let index = 0; index <= parts.length - 2; index += 1) {
    const domain = parts.slice(index).join('.');
    domainCandidates.add(domain);
    domainCandidates.add(`.${domain}`);
  }

  domainCandidates.forEach((domain) => {
    document.cookie = `${base}; domain=${domain}`;
  });
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

const notifyLoggedOut = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(authLogoutEvent));
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await jwtApi.get<AuthUser>('/auth/me');
    clearLoggedOutMarker();
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
  try {
    await jwtApi.post('/auth/logout');
  } catch {
    // Client-side cleanup below keeps the UI logged out even if the network request fails.
  } finally {
    clearLocalDevUser();
    clearKingoCookies();
    clearStoredDatasetLikes();
    markLoggedOut();
    notifyLoggedOut();
  }

  return true;
};
