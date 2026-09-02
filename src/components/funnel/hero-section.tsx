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
              <p className="flex max-w-lg items-start gap-2.5 text-base leading-relaxed text-foreground/90 md:text-lg">
                <CalendarClock className="mt-1 size-5 shrink-0 text-gold" />
                <span>
                  Taught by Stephen Taylor &mdash; who built a security company from{" "}
                  $0 to seven figures and 113 employees.
                </span>
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
              alt="Stephen Taylor, host of the free security company webinar"
              fetchPriority="high"
              width={1024}
              height={1536}
              className="relative z-[5] mx-auto w-full max-w-sm object-contain drop-shadow-[0_30px_60px_oklch(0_0_0/60%)] lg:max-w-md [mask-image:linear-gradient(to_bottom,black_88%,transparent_99%)]"
            />

            {/* event badge */}
            <div className="animate-floaty absolute bottom-10 left-1/2 z-20 w-max max-w-[92%] -translate-x-1/2">
              <div className="gold-glow flex items-center gap-2.5 rounded-lg border border-gold/40 bg-navy-deep/90 px-4 py-3 backdrop-blur-sm">
                <CalendarClock className="size-5 shrink-0 text-gold" />
                <span className="text-xs leading-snug font-semibold tracking-wide uppercase sm:text-sm">
                  One Sitting &bull; Free Webinar
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
