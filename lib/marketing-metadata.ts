// lib/marketing-metadata.ts
import type { Metadata } from 'next';

type MarketingPage = 'home' | 'features' | 'pricing';

interface MarketingMetadataOptions {
  page: MarketingPage;
}

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
          url: 'https://yourdomain.com/',
          siteName: 'Fligo',
          images: [
            {
              url: '/og-home.png',
              width: 1200,
              height: 630,
              alt: 'Fligo homepage',
            },
          ],
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Fligo - Streamlined Aviation Operations',
          description:
            'Fligo helps aviation teams manage operations efficiently with intuitive dashboards and tools.',
          images: ['/og-home.png'],
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
          url: 'https://yourdomain.com/features',
          siteName: 'Fligo',
          images: [
            {
              url: '/og-features.png',
              width: 1200,
              height: 630,
              alt: 'Fligo features',
            },
          ],
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Fligo Features - Optimize Your Aviation Workflow',
          description:
            'Explore all Fligo features designed to make aviation operations smooth and efficient.',
          images: ['/og-features.png'],
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
          url: 'https://yourdomain.com/pricing',
          siteName: 'Fligo',
          images: [
            {
              url: '/og-pricing.png',
              width: 1200,
              height: 630,
              alt: 'Fligo pricing plans',
            },
          ],
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Fligo Pricing - Flexible Plans for Aviation Teams',
          description:
            'Choose the right Fligo plan for your aviation operations and team size.',
          images: ['/og-pricing.png'],
        },
      };
    default:
      return {
        title: 'Fligo',
        description: 'Fligo - Aviation operations management made easy.',
      };
  }
}
