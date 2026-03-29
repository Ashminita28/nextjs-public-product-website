import type { ReactElement } from 'react';
import { buildMarketingMetadata } from '@/lib/marketing-metadata';
import { FeaturesSection } from '@/components/landing/features';
import { getFeatures } from '@/lib/strapi';

export async function generateMetadata() {
  return buildMarketingMetadata({ page: 'features' });
}
export default async function FeaturesPage(): Promise<ReactElement> {
  const features = await getFeatures();

  return (
    <main className="min-h-[calc(100vh-56px)] bg-slate-50/60 px-6 py-16">
      <FeaturesSection features={features} />
    </main>
  );
}
