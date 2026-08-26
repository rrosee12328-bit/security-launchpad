import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./shared";

const STEPS = [
  {
    num: "01",
    title: "Foundation",
    copy: "Business structure, licensing, insurance, compliance, financial setup, and business fundamentals.",
  },
  {
    num: "02",
    title: "Infrastructure",
    copy: "Branding, professional communication, equipment, scheduling, reporting, and company systems.",
  },
  {
    num: "03",
    title: "Pricing",
    copy: "Wages, labor burden, overhead, margins, cash flow, and profitable pricing.",
  },
  {
    num: "04",
    title: "Contracts",
    copy: "Contract types, proposals, scopes of work, RFPs, negotiation, and client expectations.",
  },
  {
    num: "05",
    title: "Operations",
    copy: "Hiring, scheduling, documentation, incident management, client communication, and risk management.",
  },
  {
    num: "06",
    title: "Scale",
    copy: "Leadership, additional services, technology, larger contracts, multi-site operations, and sustainable growth.",
  },
];

export function RoadmapSection() {
  return (
    <section className="section-pad relative overflow-hidden bg-navy-deep/50">
      <div className="bg-blueprint absolute inset-0 opacity-30" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="animate-pulse-glow absolute top-0 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gold/8 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The Path"
          title={
            <>
              Your Security Business <span className="text-gold-gradient">Roadmap</span>
            </>
          }
          copy="A connected progression from startup foundation to a sophisticated security operation."
        />

        <div className="relative">
          {/* gold connector line */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[27px] w-px bg-gradient-to-b from-gold/70 via-gold/40 to-gold/70 md:left-1/2"
          />

          <div className="flex flex-col gap-10 md:gap-14">
            {STEPS.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={step.num} delay={80}>
                  <div
                    className={cn(
                      "relative flex items-start gap-6 md:w-1/2",
                      left
                        ? "md:pr-14"
                        : "md:ml-auto md:flex-row-reverse md:pl-14 md:text-right",
                    )}
                  >
                    {/* node */}
                    <div
                      className={cn(
                        "gold-glow relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-navy-deep md:absolute md:top-0",
                        left ? "md:-right-7" : "md:-left-7",
                      )}
                    >
                      <span className="font-display text-lg text-gold">{step.num}</span>
                    </div>

                    <div className="card-cinematic flex-1 rounded-xl p-6 transition-colors duration-300 hover:border-gold/35 md:p-7">
                      <span className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase">
                        Step {step.num}
                      </span>
                      <h3 className="mt-1.5 font-display text-2xl tracking-wide uppercase">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                        {step.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
