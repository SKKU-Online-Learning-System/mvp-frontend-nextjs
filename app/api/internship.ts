import { InternshipCompany } from '@/components/internship/internshipCompanies';
import axios from 'axios';
import { hasLocalDevUser } from './auth';
import { jwtApi } from './axios';

const isDevelopment = process.env.NODE_ENV === 'development';

const loadDevCompanies = async (): Promise<InternshipCompany[]> => {
  const res = await fetch('/dev-data/internship-companies');

  if (!res.ok) {
    throw new Error('dev internship data unavailable');
  }

  return res.json();
};

export const getInternshipCompanies = async () => {
  try {
    const res = await jwtApi.get<InternshipCompany[]>('/internship-companies');

    return res.data;
  } catch (error) {
    const status = axios.isAxiosError(error) ? error.response?.status : null;

    if (isDevelopment && (status !== 401 || hasLocalDevUser())) {
      return loadDevCompanies();
    }

    throw error;
  }
};
