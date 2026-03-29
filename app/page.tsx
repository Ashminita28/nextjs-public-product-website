import type { ReactElement } from 'react';
import { buildMarketingMetadata } from '@/lib/marketing-metadata';
import { HeroSection } from '@/components/landing/hero';
import { ProblemSection } from '@/components/landing/problem';
import { SolutionSection } from '@/components/landing/solution';
import { UseCasesSection } from '@/components/landing/use-cases';
import { PricingSection } from '@/components/landing/pricing';
import { FeaturesSection } from '@/components/landing/features';
import { NewsletterForm } from '@/components/newsletter';
import { getLandingPage } from '@/lib/strapi';

export async function generateMetadata() {
  return buildMarketingMetadata({ page: 'home' });
}
export default async function Page(): Promise<ReactElement> {
  const content = await getLandingPage();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection hero={content.hero} />
      <ProblemSection problem={content.problem} />
      <SolutionSection solutions={content.solution} />
      <FeaturesSection features={content.features ?? []} />
      <UseCasesSection useCases={content.use_cases} />
      <PricingSection plans={content.pricing_plans} />
      <NewsletterForm />
    </main>
  );
}
