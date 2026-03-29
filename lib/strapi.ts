// lib/strapi.ts
import { cache } from 'react';

import { request, requestRaw, requestWithMeta } from './api';
import type {
  BlogPostList,
  FeatureList,
  LandingResponse,
  LandingStatsResponse,
  NewsletterSubscriber,
  NewsletterSubscriberList,
  PricingPlanList,
  StrapiAuthResponse,
  Stat,
} from './types/shared-types';

import type {
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
export async function getBlogs(): Promise<BlogPostList> {
  return request<BlogPostList>('/api/blogs');
}

// FETCH EACH BLOG DETAIL
export const getBlogBySlug = cache(async function getBlogBySlug(
  slug: string,
): Promise<BlogPostList> {
  const encoded = encodeURIComponent(slug);
  return request<BlogPostList>(`/api/blogs?filters[slug][$eq]=${encoded}`);
});

// FETCH LANDING PAGE DATA
export async function getLandingPage(): Promise<LandingResponse['data']> {
  return request<LandingResponse['data']>('/api/landing-page?populate=*');
}

// FETCH FEATURES DATA
export async function getFeatures(): Promise<FeatureList> {
  return request<FeatureList>('/api/features');
}

// FETCH PRICING PLANS DATA
export async function getPricingPlans(): Promise<PricingPlanList> {
  return request<PricingPlanList>('/api/pricing-plans');
}

// FETCH DASHBOARD STATS
export async function getDashboardStats(): Promise<Stat[]> {
  const data = await request<LandingStatsResponse['data']>(
    '/api/landing-page?populate=stats',
    { auth: true },
  );
  return data.stats;
}

// FETCH NEWSLETTER DATA
export async function subscribeNewsletter(
  email: string,
): Promise<NewsletterSubscriber> {
  const body: NewsletterBody = {
    data: {
      email,
      subscribedAt: new Date().toISOString(),
    },
  };

  return request<NewsletterSubscriber>('/api/newsletter-subscribers', {
    method: 'POST',
    body,
  });
}

// GET SUBSCRIBER COUNTS
export async function getSubscriberCount(): Promise<number> {
  const res = await requestWithMeta<NewsletterSubscriberList, PaginationMeta>(
    '/api/newsletter-subscribers?pagination[pageSize]=1',
    { auth: true },
  );

  return res.meta.pagination.total;
}
