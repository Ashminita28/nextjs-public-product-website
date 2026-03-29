import { FeaturesSection } from '@/components/landing/features';
import { getFeatures } from '@/lib/strapi';

export default async function FeaturesPage() {
  const landing = await getFeatures();

  return (
    <main className="min-h-[calc(100vh-56px)] bg-slate-50/60 px-6 py-16">
      <FeaturesSection features={landing} />
    </main>
  );
}
