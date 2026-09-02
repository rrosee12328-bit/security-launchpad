import { Building2, Compass, ShieldCheck, TrendingUp } from "lucide-react";
import { WEBINAR_CTA } from "@/lib/config";
import { CTAButton } from "./cta-button";
import { Reveal, SectionHeading } from "./shared";

const AUDIENCES = [
  {
    icon: ShieldCheck,
    copy: "You work in security and have thought about starting your own company.",
  },
  {
    icon: Compass,
    copy: "You already started a security company but feel like you're figuring everything out as you go.",
  },
  {
    icon: Building2,
    copy: "You know the security industry but don't fully understand the business side.",
  },
  {
    icon: TrendingUp,
    copy: "You want contracts, employees, systems, and a business that can grow beyond you.",
  },
];

export function WhoItsForSection() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-gold/8 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Who Should Attend"
          title={
            <>
              This Webinar Is <span className="text-gold-gradient">For You If&hellip;</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {AUDIENCES.map(({ icon: Icon, copy }, i) => (
            <Reveal key={copy} delay={(i % 2) * 90}>
              <div className="card-cinematic flex h-full items-start gap-4 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-gold/35 bg-gradient-to-b from-gold/20 to-gold/5">
                  <Icon className="size-5 text-gold" strokeWidth={1.8} />
                </span>
                <p className="text-sm leading-relaxed text-foreground/90">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220} className="mt-12 flex justify-center">
          <CTAButton trackingLabel="who-its-for" size="lg" showArrow>
            {WEBINAR_CTA}
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
