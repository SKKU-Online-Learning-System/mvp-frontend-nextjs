import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? '/api'
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export const jwtApi = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
