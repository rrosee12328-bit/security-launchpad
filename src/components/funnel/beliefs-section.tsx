import { Quote } from "lucide-react";
import { CTAButton } from "./cta-button";
import { Eyebrow, Reveal } from "./shared";
import operationsImg from "@/assets/security-operations.jpg";

const ASSUMPTIONS = [
  "Once I get licensed, I can start getting contracts.",
  "I'll figure out pricing once customers start calling.",
  "If I hire good guards, the rest will work itself out.",
  "I just need my first client and then I'll figure out the systems.",
];

export function BeliefsSection() {
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
                Foundation &bull; Pricing &bull; Contracts &bull; Systems
              </span>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>The Costly Assumptions</Eyebrow>
            <h2 className="mt-4 font-display text-3xl leading-[1.05] tracking-wide text-balance uppercase sm:text-4xl md:text-[2.75rem]">
              Starting a Security Company Is Not Just Getting an LLC and{" "}
              <span className="text-gold-gradient">Hiring Guards</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              A lot of people enter this business thinking:
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-6 flex flex-col gap-3">
              {ASSUMPTIONS.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3.5"
                >
                  <Quote className="mt-0.5 size-4 shrink-0 text-gold/70" />
                  <span className="text-sm leading-snug text-foreground/85 italic">
                    &ldquo;{line}&rdquo;
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-7 border-l-2 border-gold pl-4 text-sm leading-relaxed text-foreground/90 md:text-base">
              Those assumptions can become expensive mistakes.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              In this free webinar, Stephen breaks down what actually needs to be in
              place if you want to build a legitimate, contract-ready security company
              instead of learning everything through trial and error.
            </p>
            <div className="mt-8">
              <CTAButton trackingLabel="beliefs" size="lg" showArrow>
                Watch the Free Webinar
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
