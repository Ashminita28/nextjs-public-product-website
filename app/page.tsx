import { fetchAPI } from "@/lib/api";
import { LandingResponse } from "@/lib/types";
import { HeroSection } from "@/components/landing/hero";
import { ProblemSection } from "@/components/landing/problem";
import { SolutionSection } from "@/components/landing/solution";
import { StatsSection } from "@/components/landing/stats";
import { FeaturesSection } from "@/components/landing/features";
import { UseCasesSection } from "@/components/landing/use-cases";
import { PricingSection } from "@/components/landing/pricing";

export default async function Page() {
  const res = await fetchAPI<LandingResponse>(
    "/landing-page?populate=*"
  );

  const content = res.data;

  return (
    <main className="min-h-screen bg-[#060d1a] text-white antialiased">
      {/* Ambient top glow — sits behind everything */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-125 bg-linear-to-b from-blue-600/10 via-transparent to-transparent" />

      <div className="relative z-10">
        <HeroSection hero={content.hero} />

        <StatsSection stats={content.stats} />

        {/* Alternating section tints for visual rhythm */}
        <div className="bg-white/2">
          <ProblemSection problem={content.problem} />
        </div>

        <SolutionSection solutions={content.solution} />

        <div className="bg-white/2">
          <FeaturesSection features={content.features} />
        </div>

        <UseCasesSection useCases={content.use_cases} />

        <div className="bg-white/2">
          <PricingSection plans={content.pricing_plans} />
        </div>
      </div>
    </main>
  );
}