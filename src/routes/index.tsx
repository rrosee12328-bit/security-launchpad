import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";
import { LeadModalProvider } from "@/components/funnel/lead-modal";
import { Header } from "@/components/funnel/header";
import { HeroSection } from "@/components/funnel/hero-section";
import { AuthorityBar } from "@/components/funnel/authority-bar";
import { BeliefsSection } from "@/components/funnel/beliefs-section";
import { MistakesSection } from "@/components/funnel/mistakes-section";
import { ExperienceSection } from "@/components/funnel/experience-section";
import { WhoItsForSection } from "@/components/funnel/who-its-for-section";
import { FinalCTA } from "@/components/funnel/final-cta";
import { Footer } from "@/components/funnel/footer";
import { MobileStickyCTA } from "@/components/funnel/mobile-sticky-cta";

const TITLE =
  "Free Webinar: 5 Mistakes When Starting a Security Company";
const DESCRIPTION =
  "Free webinar with Stephen Taylor: the 5 biggest mistakes people make when starting a security company — foundation, pricing, contracts, operations, and growth.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    trackEvent("PageView", { page: "webinar-registration" });
  }, []);

  return (
    <LeadModalProvider>
      <div className="min-h-screen overflow-x-clip bg-background text-foreground">
        <Header />
        <main>
          <HeroSection />
          <AuthorityBar />
          <BeliefsSection />
          <MistakesSection />
          <ExperienceSection />
          <WhoItsForSection />
          <FinalCTA />
        </main>
        <Footer />
        <MobileStickyCTA />
      </div>
    </LeadModalProvider>
  );
}
