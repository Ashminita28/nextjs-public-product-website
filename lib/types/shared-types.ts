// lib/types/shared-types.ts

import { SVGProps, ComponentType } from 'react';

export interface RichTextNode {
  type: string;
  children?: { type: string; text: string }[];
}

export type IconType = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number }
>;

// BLOG TYPES

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  publishedAt: string;
}

/** Unwrapped Strapi blog collection (`data` array after `request()`). */
export type BlogPostList = BlogPost[];

//   LANDING PAGE TYPES

export interface Hero {
  title: string;
  subtitle: string;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
}

export interface Problem {
  title: string;
  description: RichTextNode[];
}

export interface Solution {
  id: number;
  title: string | null;
  description: RichTextNode[] | null;
}

export interface Capability {
  id: number;
  title: string;
  description: RichTextNode[];
}

export interface ModuleItem {
  id: number;
  name: string;
  description: RichTextNode[];
}

export interface Stat {
  id: number;
  label: string;
  value: string;
  description: string;
}

export interface Feature {
  id: number;
  title: string;
  description: RichTextNode[];
  category?: string | null;
}

export interface UseCase {
  id: number;
  text: string;
  description: RichTextNode[];
}

export interface PricingPlan {
  id: number;
  plan_name: string;
  price: string;
}

export interface LandingPage {
  hero: Hero;
  problem: Problem;
  solution: Solution[];
  capabilities: Capability[];
  modules: ModuleItem[];
  stats: Stat[];
  features: Feature[];
  use_cases: UseCase[];
  pricing_plans: PricingPlan[];
  blogs?: BlogPost[];
}

export interface LandingResponse {
  data: LandingPage;
}

//FEATURE & PRICING TYPES

/** Unwrapped Strapi pricing collection. */
export type PricingPlanList = PricingPlan[];

/** Unwrapped Strapi feature collection. */
export type FeatureList = Feature[];

//AUTH (STRAPI)

export interface StrapiUser {
  id: number;
  username: string;
  email: string;
}

export interface StrapiAuthResponse {
  jwt: string;
  user: StrapiUser;
}

// APP USER (NextAuth)

export interface AppUser {
  id: string;
  name: string;
  email: string;
  jwt: string;
}

// DASHBOARD TYPES

export interface LandingStatsResponse {
  data: {
    stats: Stat[];
  };
}

// NEWSLETTER TYPES

export interface NewsletterSubscriber {
  id: number;
  email: string;
  subscribedAt: string;
}

/** Strapi collection list (`data` after unwrapping list GET). */
export type NewsletterSubscriberList = NewsletterSubscriber[];

export type SectionSkeletonProps = {
  label: string;
  title?: string;
  lines?: number;
  className?: string;
};
