// lib/marketing-metadata.ts
import type { Metadata } from 'next';

type MarketingPage = 'home' | 'features' | 'pricing';

interface MarketingMetadataOptions {
  page: MarketingPage;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function buildMarketingMetadata({
  page,
}: MarketingMetadataOptions): Metadata {
  switch (page) {
    case 'home':
      return {
        title: 'Fligo - Streamlined Aviation Operations',
        description:
          'Fligo helps aviation teams manage operations efficiently with intuitive dashboards and tools.',
        keywords: [
          'Fligo',
          'Aviation',
          'Operations',
          'Dashboard',
          'Management',
        ],
        openGraph: {
          title: 'Fligo - Streamlined Aviation Operations',
          description:
            'Fligo helps aviation teams manage operations efficiently with intuitive dashboards and tools.',
          url: SITE_URL,
          siteName: 'Fligo',
          images: [],
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Fligo - Streamlined Aviation Operations',
          description:
            'Fligo helps aviation teams manage operations efficiently with intuitive dashboards and tools.',
          images: [], // empty for now
        },
      };

    case 'features':
      return {
        title: 'Fligo Features - Optimize Your Aviation Workflow',
        description:
          'Explore all Fligo features designed to make aviation operations smooth and efficient.',
        keywords: ['Fligo', 'Features', 'Aviation', 'Operations', 'Tools'],
        openGraph: {
          title: 'Fligo Features - Optimize Your Aviation Workflow',
          description:
            'Explore all Fligo features designed to make aviation operations smooth and efficient.',
          url: `${SITE_URL}/features`,
          siteName: 'Fligo',
          images: [],
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Fligo Features - Optimize Your Aviation Workflow',
          description:
            'Explore all Fligo features designed to make aviation operations smooth and efficient.',
          images: [],
        },
      };

    case 'pricing':
      return {
        title: 'Fligo Pricing - Flexible Plans for Aviation Teams',
        description:
          'Choose the right Fligo plan for your aviation operations and team size.',
        keywords: ['Fligo', 'Pricing', 'Plans', 'Aviation', 'Subscription'],
        openGraph: {
          title: 'Fligo Pricing - Flexible Plans for Aviation Teams',
          description:
            'Choose the right Fligo plan for your aviation operations and team size.',
          url: `${SITE_URL}/pricing`,
          siteName: 'Fligo',
          images: [],
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Fligo Pricing - Flexible Plans for Aviation Teams',
          description:
            'Choose the right Fligo plan for your aviation operations and team size.',
          images: [],
        },
      };

    default:
      return {
        title: 'Fligo',
        description: 'Fligo - Aviation operations management made easy.',
      };
  }
}
