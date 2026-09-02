import { CalendarClock } from "lucide-react";
import { WEBINAR_BADGE, WEBINAR_CTA } from "@/lib/config";
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
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-gold" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.35em] text-gold uppercase">
                {WEBINAR_BADGE}
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-[2.4rem] leading-[1] tracking-wide text-balance uppercase sm:text-5xl lg:text-[3.9rem]">
              The 5 Biggest Mistakes People Make When{" "}
              <span className="text-gold-gradient">Starting a Security Company</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/90 md:text-lg">
              Discover the mistakes that cause new security company owners to waste
              money, underprice their services, struggle to win contracts, and build a
              business that cannot scale.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-9 flex flex-col items-start gap-5">
              <CTAButton trackingLabel="hero" size="lg" showArrow>
                {WEBINAR_CTA}
              </CTAButton>
            </div>
          </Reveal>
        </div>

        {/* Portrait composition */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative mb-8 pb-10 sm:mb-10 sm:pb-12">
            {/* HUD frame behind portrait */}
            <div className="hud-corners absolute -inset-3 rounded-2xl border border-white/5 bg-gradient-to-b from-navy/60 to-navy-deep/80" />
            {/* scan line */}
            <div className="animate-scan pointer-events-none absolute right-6 left-6 z-10 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

            {/* event badge */}
            <div className="absolute top-4 right-3 z-20 sm:top-6 sm:right-5">
              <div className="gold-glow flex items-center gap-2 rounded-lg border border-gold/40 bg-navy-deep/90 px-3 py-2.5 backdrop-blur-md sm:px-4 sm:py-3">
                <CalendarClock className="size-4 shrink-0 text-gold sm:size-5" />
                <span className="text-[10px] leading-snug font-semibold tracking-wide uppercase sm:text-xs">
                  One Sitting &bull; Free Webinar
                </span>
              </div>
            </div>

            <img
              src={stephenHero.url}
              alt="Stephen Taylor, host of the free security company webinar"
              fetchPriority="high"
              width={1024}
              height={1536}
              className="relative z-[5] mx-auto w-full max-w-sm object-contain drop-shadow-[0_30px_60px_oklch(0_0_0/60%)] lg:max-w-md [mask-image:linear-gradient(to_bottom,black_88%,transparent_99%)]"
            />

            {/* integrated host lower-third */}
            <div className="absolute right-4 bottom-0 left-4 z-20 sm:right-8 sm:left-8">
              <div className="gold-glow border border-gold/35 bg-navy-deep/95 px-5 py-4 text-center backdrop-blur-md sm:px-7 sm:py-5">
                <div className="mx-auto mb-2 h-px w-12 bg-gold/60" />
                <p className="text-sm font-semibold tracking-wide uppercase text-gold sm:text-base">
                  Stephen Taylor
                </p>
                <p className="mx-auto mt-1 max-w-sm text-sm leading-snug text-foreground/85 sm:text-base">
                  Built a security company from $0 to seven figures and 113 employees.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
