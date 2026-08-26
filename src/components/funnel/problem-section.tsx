import { Check } from "lucide-react";
import { CTAButton } from "./cta-button";
import { Eyebrow, Reveal } from "./shared";
import operationsImg from "@/assets/security-operations.jpg";

const CHECKLIST = [
  "Business structure and compliance",
  "Licensing and insurance",
  "Professional company infrastructure",
  "Pricing your services correctly",
  "Understanding security contracts",
  "Finding and pursuing clients",
  "Hiring and managing officers",
  "Running day-to-day operations",
  "Protecting the company from unnecessary risk",
  "Creating systems that can support growth",
];

export function ProblemSection() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="bg-blueprint-fine absolute inset-0 opacity-50" />
      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-gold/8 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Visual */}
        <Reveal className="order-2 lg:order-1">
          <div className="hud-corners relative overflow-hidden rounded-xl border border-white/10">
            <img
              src={operationsImg}
              alt="Security operations command center with live surveillance feeds"
              loading="lazy"
              width={1536}
              height={1024}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-md border border-gold/30 bg-navy-deep/85 px-3 py-2 backdrop-blur-sm">
              <span className="font-mono text-[10px] tracking-[0.25em] text-gold uppercase">
                Operations &bull; Contracts &bull; Systems
              </span>
            </div>
          </div>
        </Reveal>

        {/* Copy + checklist */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>The Real Work</Eyebrow>
            <h2 className="mt-4 font-display text-3xl leading-[1.05] tracking-wide text-balance uppercase sm:text-4xl md:text-[2.75rem]">
              Starting a Security Company Is More Than Getting an LLC and{" "}
              <span className="text-gold-gradient">Hiring Guards</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Building a security company requires more than having the idea. You need
              the right business foundation, pricing, contracts, systems, people,
              processes, and strategy to operate professionally and grow.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                    <Check className="size-3 text-gold" strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-snug text-foreground/85">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 border-l-2 border-gold pl-4 text-sm leading-relaxed text-foreground/90 italic md:text-base">
              7 Figure Security gives you a roadmap instead of forcing you to figure
              everything out through trial and error.
            </p>
            <div className="mt-8">
              <CTAButton trackingLabel="problem" size="lg" showArrow>
                Start Building Your Company
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
