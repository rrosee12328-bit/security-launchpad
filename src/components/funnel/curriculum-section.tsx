import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTAButton } from "./cta-button";
import { Reveal, SectionHeading } from "./shared";

const MODULES = [
  {
    title: "Industry Reality & Expectations",
    copy: "Understand what owning a security company actually requires.",
  },
  {
    title: "Legal Setup & Licensing",
    copy: "Learn the foundations of business setup, licensing, compliance, insurance, and financial infrastructure.",
    note: "Some licensing and compliance training is Texas-specific. Members should verify requirements for their own state.",
  },
  {
    title: "Building Company Infrastructure",
    copy: "Branding, communication, equipment, scheduling, reporting, and professional operations.",
  },
  {
    title: "How Security Contracts Work",
    copy: "Understand contract types, terms, scopes, client expectations, and red flags.",
  },
  {
    title: "Pricing Security Services",
    copy: "Learn wages, burden, overhead, margins, and pricing fundamentals.",
  },
  {
    title: "How to Get Security Contracts",
    copy: "Learn outreach, proposals, RFPs, certifications, networking, and relationship building.",
  },
  {
    title: "Contracts & Legal Documents",
    copy: "Understand agreements, scopes of work, post orders, amendments, and key contract documents.",
  },
  {
    title: "Internal Forms & SOPs",
    copy: "Build the documentation and policies required to operate professionally.",
  },
  {
    title: "Operations & Risk Management",
    copy: "Scheduling, incidents, communication, retention, documentation, and day-to-day operations.",
  },
  {
    title: "Scaling & Advanced Revenue",
    copy: "Leadership, additional services, technology, larger operations, and company growth.",
  },
];

export function CurriculumSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-gold/7 blur-[110px]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Course Preview"
          title={
            <>
              Inside <span className="text-gold-gradient">7 Figure Security</span>
            </>
          }
          copy="Ten modules covering the complete arc of building a professional security company."
        />

        <div className="flex flex-col gap-3">
          {MODULES.map((mod, i) => {
            const isOpen = openIndex === i;
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={mod.title} delay={Math.min(i, 4) * 50}>
                <div
                  className={cn(
                    "card-cinematic overflow-hidden rounded-xl transition-colors duration-300",
                    isOpen && "border-gold/45",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center gap-4 p-5 text-left sm:gap-6 sm:p-6"
                  >
                    <span
                      className={cn(
                        "font-display text-2xl transition-colors duration-300 sm:text-3xl",
                        isOpen ? "text-gold-gradient" : "text-white/20",
                      )}
                    >
                      {num}
                    </span>
                    <span className="flex-1">
                      <span className="block font-mono text-[9px] tracking-[0.3em] text-gold uppercase">
                        Module {num}
                      </span>
                      <span className="mt-0.5 block font-display text-base tracking-wide uppercase sm:text-xl">
                        {mod.title}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-gold transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-6 pl-[3.7rem] sm:px-6 sm:pl-[5.4rem]">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {mod.copy}
                        </p>
                        {mod.note && (
                          <p className="mt-3 flex items-start gap-2 rounded-md border border-gold/25 bg-gold/5 p-3 text-xs leading-relaxed text-foreground/80">
                            <Info className="mt-0.5 size-3.5 shrink-0 text-gold" />
                            {mod.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150} className="mt-12 flex justify-center">
          <CTAButton trackingLabel="curriculum" size="lg" showArrow>
            Join 7 Figure Security
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
