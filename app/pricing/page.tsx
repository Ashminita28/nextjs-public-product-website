import { getPricingPlans } from '@/lib/strapi';
import { PricingSection } from '@/components/landing/pricing';
import { buildMarketingMetadata } from '@/lib/marketing-metadata';

export async function generateMetadata() {
  return buildMarketingMetadata({ page: 'pricing' });
}
export default async function PricingPage() {
  const plans = await getPricingPlans();

  return (
    <main className="min-h-[calc(100vh-56px)]">
      <PricingSection
        plans={plans}
        isPage
        subtitle="No hidden fees. Scale as your operations grow. Cancel anytime."
      />
    </main>
  );
}
