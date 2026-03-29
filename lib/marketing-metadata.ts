// lib/marketing-metadata.ts
import type { Metadata } from 'next';

import { getSiteUrl } from './site';

type MarketingPage = 'home' | 'features' | 'pricing' | 'blog';

interface MarketingMetadataOptions {
  page: MarketingPage;
}

function marketingPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  keywords: string[];
}): Metadata {
  const base = getSiteUrl();
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: `${base}${opts.path}`,
      siteName: 'Fligo',
      images: [
        {
          url: opts.image,
          width: 1200,
          height: 630,
          alt: opts.imageAlt,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [opts.image],
    },
  };
}

export function buildMarketingMetadata({
  page,
}: MarketingMetadataOptions): Metadata {
  switch (page) {
    case 'home':
      return marketingPageMetadata({
        title: 'Fligo - Streamlined Aviation Operations',
        description:
          'Fligo helps aviation teams manage operations efficiently with intuitive dashboards and tools.',
        path: '/',
        image: '/og-home.png',
        imageAlt: 'Fligo homepage',
        keywords: [
          'Fligo',
          'Aviation',
          'Operations',
          'Dashboard',
          'Management',
        ],
      });
    case 'features':
      return marketingPageMetadata({
        title: 'Fligo Features - Optimize Your Aviation Workflow',
        description:
          'Explore all Fligo features designed to make aviation operations smooth and efficient.',
        path: '/features',
        image: '/og-features.png',
        imageAlt: 'Fligo features',
        keywords: ['Fligo', 'Features', 'Aviation', 'Operations', 'Tools'],
      });
    case 'pricing':
      return marketingPageMetadata({
        title: 'Fligo Pricing - Flexible Plans for Aviation Teams',
        description:
          'Choose the right Fligo plan for your aviation operations and team size.',
        path: '/pricing',
        image: '/og-pricing.png',
        imageAlt: 'Fligo pricing plans',
        keywords: ['Fligo', 'Pricing', 'Plans', 'Aviation', 'Subscription'],
      });
    case 'blog':
      return marketingPageMetadata({
        title: 'Fligo Blog - Insights & updates',
        description:
          'Aviation operations news, product updates, and industry insights from Fligo.',
        path: '/blog',
        image: '/og-home.png',
        imageAlt: 'Fligo blog',
        keywords: ['Fligo', 'Blog', 'Aviation', 'Operations', 'News'],
      });
    default:
      return {
        title: 'Fligo',
        description: 'Fligo - Aviation operations management made easy.',
      };
  }
}
