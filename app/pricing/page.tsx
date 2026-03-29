import { getPricingPlans } from '@/lib/strapi';
import { PricingSection } from '@/components/landing/pricing';

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
