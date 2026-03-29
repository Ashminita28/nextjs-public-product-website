// lib/strapi.ts
import { request, requestRaw, requestWithMeta } from './api';
import {
  BlogResponse,
  FeatureResponse,
  PricingResponse,
  LandingResponse,
  LandingStatsResponse,
  NewsletterResponse,
  StrapiAuthResponse,
  Stat,
} from './types/shared-types';

import {
  RegisterBody,
  LoginBody,
  NewsletterBody,
  PaginationMeta,
} from './types/api-types';

// REGISTER FETCH
export async function registerUser(
  body: RegisterBody,
): Promise<StrapiAuthResponse> {
  return request<StrapiAuthResponse>('/api/auth/local/register', {
    method: 'POST',
    body: {
      username: body.name,
      email: body.email,
      password: body.password,
    },
  });
}

// LOGIN FETCH
export async function loginUser(body: LoginBody): Promise<StrapiAuthResponse> {
  return requestRaw<StrapiAuthResponse>('/api/auth/local', {
    method: 'POST',
    body,
  });
}

// FETCH BLOGS DATA
export async function getBlogs(): Promise<BlogResponse['data']> {
  return request<BlogResponse['data']>('/api/blogs');
}

// FECTH EACH BLOG DETAIL
export async function getBlogBySlug(
  slug: string,
): Promise<BlogResponse['data']> {
  return request<BlogResponse['data']>(`/api/blogs?filters[slug][$eq]=${slug}`);
}

// FETCH LANDING PAGE DATA
export async function getLandingPage(): Promise<LandingResponse['data']> {
  return request<LandingResponse['data']>('/api/landing-page?populate=*');
}

// FETCH FEATURES DATA
export async function getFeatures(): Promise<FeatureResponse['data']> {
  return request<FeatureResponse['data']>('/api/features');
}

// FETCH PRICING PLANS DATA
export async function getPricingPlans(): Promise<PricingResponse['data']> {
  return request<PricingResponse['data']>('/api/pricing-plans');
}

// FETCH DASHBOARD STATS
export async function getDashboardStats(): Promise<Stat[]> {
  const res = request<LandingStatsResponse['data']>(
    '/api/landing-page?populate=stats',
    { auth: true },
  );
  return (await res).stats;
}

// FETCH NEWSLETTER DATA
export async function subscribeNewsletter(
  email: string,
): Promise<NewsletterResponse['data']> {
  const body: NewsletterBody = {
    data: {
      email,
      subscribedAt: new Date().toISOString(),
    },
  };

  return request<NewsletterResponse['data']>('/api/newsletter-subscribers', {
    method: 'POST',
    body,
  });
}

// GET SUBSCRIBER COUNTS
export async function getSubscriberCount(): Promise<number> {
  const res = await requestWithMeta<NewsletterResponse['data'], PaginationMeta>(
    '/api/newsletter-subscribers?pagination[pageSize]=1',
    { auth: true },
  );

  return res.meta.pagination.total;
}
