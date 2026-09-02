import { CTAButton } from "./cta-button";
import { Reveal } from "./shared";
import skyline from "@/assets/skyline-night.jpg";

export function FinalCTA() {
  return (
    <section className="section-pad grain relative overflow-hidden">
      {/* dramatic skyline backdrop */}
      <div className="absolute inset-0">
        <img
          src={skyline}
          alt=""
          aria-hidden
          loading="lazy"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-deep/60 to-navy-deep/90" />
        <div className="animate-pulse-glow absolute bottom-0 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gold/15 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <span className="font-mono text-[11px] font-semibold tracking-[0.35em] text-gold uppercase">
            Free Webinar
          </span>
          <h2 className="mt-5 font-display text-4xl leading-[1] tracking-wide text-balance uppercase sm:text-6xl md:text-[4rem]">
            Don&rsquo;t Learn These Lessons{" "}
            <span className="text-gold-gradient">the Expensive Way.</span>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-foreground/85 md:text-lg">
            Learn the 5 biggest mistakes people make when starting a security
            company&mdash;and what to do instead.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <CTAButton trackingLabel="final-cta" size="lg" showArrow>
              Reserve My Spot for the Free Webinar
            </CTAButton>
            <p className="text-sm text-muted-foreground">
              Takes less than a minute to register.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
