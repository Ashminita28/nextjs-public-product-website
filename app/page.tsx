import { HeroSection } from '@/components/landing/hero';
import { ProblemSection } from '@/components/landing/problem';
import { SolutionSection } from '@/components/landing/solution';
import { UseCasesSection } from '@/components/landing/use-cases';
import { PricingSection } from '@/components/landing/pricing';
import { NewsletterForm } from '@/components/newsletter';
import { getLandingPage } from '@/lib/strapi';
import FeaturesPage from './features/page';

export default async function Page() {
  const content = await getLandingPage();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection hero={content.hero} />
      <ProblemSection problem={content.problem} />
      <SolutionSection solutions={content.solution} />
      <FeaturesPage />
      <UseCasesSection useCases={content.use_cases} />
      <PricingSection plans={content.pricing_plans} />
      <NewsletterForm />
    </main>
  );
}
