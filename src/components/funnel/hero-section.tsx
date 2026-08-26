import { BadgeCheck } from "lucide-react";
import { BRAND_TAGLINE } from "@/lib/config";
import { CTAButton } from "./cta-button";
import { Reveal } from "./shared";
import stephenHero from "@/assets/stephen-hero.png.asset.json";
import skyline from "@/assets/skyline-night.jpg";

export function HeroSection() {
  return (
    <section className="grain relative overflow-hidden bg-navy-deep">
      {/* layered backdrop: skyline + blueprint grid + light */}
      <div className="absolute inset-0">
        <img
          src={skyline}
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/60 to-transparent" />
        <div className="bg-blueprint absolute inset-0 opacity-60" />
        <div className="animate-pulse-glow absolute top-1/4 right-[8%] hidden h-96 w-96 rounded-full bg-gold/15 blur-[120px] lg:block" />
        <div className="absolute bottom-0 left-[15%] h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pt-32 pb-16 sm:px-6 md:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-24">
        {/* Copy */}
        <div className="max-w-2xl">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-gold" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.35em] text-gold">
                7 FIGURE SECURITY
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-[2.6rem] leading-[0.98] tracking-wide text-balance uppercase sm:text-6xl lg:text-[4.2rem]">
              Learn How to Start, Build &amp; Scale a{" "}
              <span className="text-gold-gradient">Profitable Security Company</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 text-lg font-medium text-foreground/90 md:text-xl">
              Get a step-by-step roadmap for turning your idea into a legitimate,
              contract-ready security business.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Learn the fundamentals behind building, operating, and growing a
              professional security company from someone who has already built one
              from the ground up.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-9 flex flex-col items-start gap-4">
              <CTAButton trackingLabel="hero" size="lg" showArrow>
                Join 7 Figure Security
              </CTAButton>
              <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                {BRAND_TAGLINE}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Portrait composition */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative">
            {/* HUD frame behind portrait */}
            <div className="hud-corners absolute -inset-3 rounded-2xl border border-white/5 bg-gradient-to-b from-navy/60 to-navy-deep/80" />
            {/* scan line */}
            <div className="animate-scan pointer-events-none absolute right-6 left-6 z-10 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

            <img
              src={stephenHero.url}
              alt="Stephen Taylor, founder of 7 Figure Security"
              fetchPriority="high"
              width={1024}
              height={1536}
              className="relative z-[5] mx-auto w-full max-w-sm object-contain drop-shadow-[0_30px_60px_oklch(0_0_0/60%)] lg:max-w-md [mask-image:linear-gradient(to_bottom,black_88%,transparent_99%)]"
            />

            {/* authority badge */}
            <div className="animate-floaty absolute bottom-10 left-1/2 z-20 w-max max-w-[92%] -translate-x-1/2">
              <div className="gold-glow flex items-center gap-2.5 rounded-lg border border-gold/40 bg-navy-deep/90 px-4 py-3 backdrop-blur-sm">
                <BadgeCheck className="size-5 shrink-0 text-gold" />
                <span className="text-xs leading-snug font-semibold tracking-wide uppercase sm:text-sm">
                  Built From Real Security Business Experience
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
