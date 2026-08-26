import { Check } from "lucide-react";
import { BILLING_FREQUENCY, MEMBERSHIP_PRICE } from "@/lib/config";
import { CTAButton } from "./cta-button";
import { Reveal, SectionHeading } from "./shared";

const INCLUDED = [
  "Security business training",
  "Step-by-step roadmap",
  "Community access",
  "Practical resources",
  "Real-world business strategy",
  "Ongoing education and support",
];

export function PricingSection() {
  return (
    <section className="section-pad relative overflow-hidden bg-navy-deep/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="animate-pulse-glow absolute top-1/2 left-1/2 h-80 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[130px]" />
      <div className="bg-blueprint absolute inset-0 opacity-25" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Membership"
          title={
            <>
              Start Building Your <span className="text-gold-gradient">Security Company</span>
            </>
          }
          copy="Get the roadmap, training, resources, and community designed to help you build your security business the right way."
        />

        <Reveal>
          {/* gold gradient border wrapper */}
          <div className="relative mx-auto max-w-lg rounded-2xl bg-gradient-to-b from-gold via-gold/40 to-gold/10 p-px">
            <div className="grain relative overflow-hidden rounded-2xl bg-navy-deep p-8 sm:p-10">
              <div className="absolute -top-20 left-1/2 h-44 w-80 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />

              <div className="relative text-center">
                <span className="font-mono text-[11px] tracking-[0.3em] text-gold uppercase">
                  7 Figure Security Membership
                </span>

                <div className="mt-5 flex items-end justify-center gap-2">
                  <span className="text-gold-gradient font-display text-6xl leading-none sm:text-7xl">
                    {MEMBERSHIP_PRICE}
                  </span>
                </div>
                <span className="mt-2 block font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
                  {BILLING_FREQUENCY}
                </span>
              </div>

              <ul className="relative mt-8 flex flex-col gap-3.5">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-gold-gradient">
                      <Check className="size-3 text-primary-foreground" strokeWidth={3.5} />
                    </span>
                    <span className="text-sm font-medium text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-9">
                <CTAButton trackingLabel="pricing" size="lg" className="w-full" showArrow>
                  Join 7 Figure Security
                </CTAButton>
                <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
                  You&rsquo;ll be redirected to Skool to complete your paid enrollment.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
