import { fetchWithAuth } from '@/lib/fetch-with-auth';
import { LandingStatsResponse, LandingResponse } from '@/lib/types';
import { fetchAPI } from './api';

export async function getDashboardStats() {
  const res = await fetchWithAuth<LandingStatsResponse>(
    '/api/landing-page?populate=stats',
  );

  return res?.data?.stats ?? [];
}

export async function getLandingPage() {
  const res = await fetchAPI<LandingResponse>('/landing-page?populate=*');
  return res.data;
}
