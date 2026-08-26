import { ArrowRight, Check, X } from "lucide-react";
import { Reveal, SectionHeading } from "./shared";

const BEFORE = [
  "Unsure where to start",
  "Confused about licensing",
  "Guessing at pricing",
  "No contract strategy",
  "No operational systems",
  "No clear client acquisition process",
  "Doing everything alone",
];

const AFTER = [
  "Understand your business setup",
  "Know what needs to be in place",
  "Price with real costs in mind",
  "Understand how contracts work",
  "Build professional systems",
  "Learn how to pursue opportunities",
  "Develop a plan for growth",
];

export function TransformationSection() {
  return (
    <section className="section-pad relative overflow-hidden bg-navy-deep/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The Transformation"
          title={
            <>
              Go From &ldquo;Where Do I Start?&rdquo; to Building a{" "}
              <span className="text-gold-gradient">Real Security Business</span>
            </>
          }
        />

        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          {/* Before */}
          <Reveal>
            <div className="h-full rounded-xl border border-white/10 bg-card/60 p-7 md:p-9">
              <span className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
                Before 7 Figure Security
              </span>
              <ul className="mt-6 flex flex-col gap-4">
                {BEFORE.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                      <X className="size-3 text-muted-foreground" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-muted-foreground md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Connector */}
          <Reveal delay={120} className="flex items-center justify-center">
            <div className="gold-glow flex size-14 rotate-90 items-center justify-center rounded-full bg-gold-gradient lg:rotate-0">
              <ArrowRight className="size-6 text-primary-foreground" strokeWidth={2.5} />
            </div>
          </Reveal>

          {/* After */}
          <Reveal delay={200}>
            <div className="gold-glow relative h-full overflow-hidden rounded-xl border border-gold/40 bg-gradient-to-b from-navy to-navy-deep p-7 md:p-9">
              <div className="bg-blueprint absolute inset-0 opacity-40" />
              <div className="relative">
                <span className="font-mono text-[11px] tracking-[0.3em] text-gold uppercase">
                  With the Right Roadmap
                </span>
                <ul className="mt-6 flex flex-col gap-4">
                  {AFTER.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold-gradient">
                        <Check className="size-3 text-primary-foreground" strokeWidth={3.5} />
                      </span>
                      <span className="text-sm font-medium text-foreground md:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={260}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground/80">
            This training is designed to help members understand and implement these
            fundamentals. It does not promise or guarantee specific results.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
