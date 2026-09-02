import { CTAButton } from "./cta-button";
import { Reveal, SectionHeading } from "./shared";
import { WEBINAR_CTA } from "@/lib/config";

const MISTAKES = [
  {
    num: "01",
    title: "The Foundation Mistake",
    copy: "What new owners overlook before trying to pursue business.",
  },
  {
    num: "02",
    title: "The Pricing Mistake",
    copy: "Why guessing at your hourly rate can put you in trouble even when you win the contract.",
  },
  {
    num: "03",
    title: "The Contract Mistake",
    copy: "What you need to understand before trying to win and service security contracts.",
  },
  {
    num: "04",
    title: "The Operations Mistake",
    copy: "Why hiring officers without the right systems creates problems fast.",
  },
  {
    num: "05",
    title: "The Growth Mistake",
    copy: "Why building everything around yourself makes the company harder to scale.",
  },
];

export function MistakesSection() {
  return (
    <section className="section-pad relative overflow-hidden bg-navy-deep/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="animate-pulse-glow absolute top-1/2 left-1/2 h-80 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Inside the Webinar"
          title={
            <>
              What You&rsquo;ll <span className="text-gold-gradient">Discover</span>
            </>
          }
          copy="Five mistakes, broken down in one sitting — and what to do instead."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MISTAKES.map(({ num, title, copy }, i) => (
            <Reveal
              key={num}
              delay={(i % 3) * 90}
              className={
                i === 3 ? "lg:col-start-1 lg:translate-x-1/2" : i === 4 ? "lg:translate-x-1/2" : ""
              }
            >
              <div className="group card-cinematic relative h-full overflow-hidden rounded-xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                <div className="absolute -top-10 -right-8 h-28 w-28 rounded-full bg-gold/10 blur-2xl" />
                <span className="text-gold-gradient relative block font-display text-4xl leading-none tracking-wide">
                  {num}
                </span>
                <h3 className="relative mt-4 text-lg leading-snug font-bold tracking-tight">
                  {title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {copy}
                </p>
                <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gold-gradient transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220} className="mt-12 flex justify-center">
          <CTAButton trackingLabel="mistakes" size="lg" showArrow>
            {WEBINAR_CTA}
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
