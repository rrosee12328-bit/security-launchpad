import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";
import { LeadModalProvider } from "@/components/funnel/lead-modal";
import { Header } from "@/components/funnel/header";
import { HeroSection } from "@/components/funnel/hero-section";
import { AuthorityBar } from "@/components/funnel/authority-bar";
import { ProblemSection } from "@/components/funnel/problem-section";
import { TransformationSection } from "@/components/funnel/transformation-section";
import { LearningCards } from "@/components/funnel/learning-cards";
import { RoadmapSection } from "@/components/funnel/roadmap-section";
import { ExperienceSection } from "@/components/funnel/experience-section";
import { WhyDifferentSection } from "@/components/funnel/why-different-section";
import { WhoItsForSection } from "@/components/funnel/who-its-for-section";
import { CommunitySection } from "@/components/funnel/community-section";
import { CurriculumSection } from "@/components/funnel/curriculum-section";
import { PricingSection } from "@/components/funnel/pricing-section";
import { FinalCTA } from "@/components/funnel/final-cta";
import { Footer } from "@/components/funnel/footer";
import { MobileStickyCTA } from "@/components/funnel/mobile-sticky-cta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "7 Figure Security | Learn How to Build a Security Company" },
      {
        name: "description",
        content:
          "Learn the business fundamentals behind starting, operating, and scaling a professional security company with training, resources, and community inside 7 Figure Security.",
      },
      {
        property: "og:title",
        content: "7 Figure Security | Learn How to Build a Security Company",
      },
      {
        property: "og:description",
        content:
          "Learn the business fundamentals behind starting, operating, and scaling a professional security company with training, resources, and community inside 7 Figure Security.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "7 Figure Security | Learn How to Build a Security Company",
      },
      {
        name: "twitter:description",
        content:
          "Learn the business fundamentals behind starting, operating, and scaling a professional security company with training, resources, and community inside 7 Figure Security.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    trackEvent("PageView", { page: "landing" });
  }, []);

  return (
    <LeadModalProvider>
      <div className="min-h-screen overflow-x-clip bg-background text-foreground">
        <Header />
        <main>
          <HeroSection />
          <AuthorityBar />
          <ProblemSection />
          <TransformationSection />
          <LearningCards />
          <RoadmapSection />
          <ExperienceSection />
          <WhyDifferentSection />
          <WhoItsForSection />
          <CommunitySection />
          <CurriculumSection />
          <PricingSection />
          <FinalCTA />
        </main>
        <Footer />
        <MobileStickyCTA />
      </div>
    </LeadModalProvider>
  );
}
