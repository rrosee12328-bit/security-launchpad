import { Reveal, Eyebrow } from "./shared";
import stephenAlt from "@/assets/stephen-alt.png.asset.json";
import buildingImg from "@/assets/commercial-building.jpg";

const STATS = [
  {
    value: "$0 → 7 Figures",
    label: "Built a security company from the ground up.",
  },
  {
    value: "100+ Employees",
    label: "Managed a security workforce of more than 100 employees at peak scale.",
  },
  {
    value: "Major Contracts",
    label: "Experience winning and servicing significant commercial and government opportunities.",
  },
  {
    value: "Years of Real Lessons",
    label: "The strategies include both what worked and what should have been done differently.",
  },
];

export function ExperienceSection() {
  return (
    <section className="section-pad relative overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0">
        <img
          src={buildingImg}
          alt=""
          aria-hidden
          loading="lazy"
          width={1536}
          height={1024}
          className="h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Portrait + headline */}
        <div>
          <Reveal>
            <Eyebrow>Real Experience</Eyebrow>
            <h2 className="mt-4 font-display text-3xl leading-[1.05] tracking-wide text-balance uppercase sm:text-4xl md:text-[2.75rem]">
              Built From Real Experience —{" "}
              <span className="text-gold-gradient">Not Theory</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              7 Figure Security is built around lessons learned from actually starting,
              operating, and scaling a security company.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              This is not information collected from random articles or business theory.
              It comes from real-world experience building a company, managing employees,
              winning contracts, solving operational problems, making mistakes, and
              learning what it actually takes to grow.
            </p>
          </Reveal>

          <Reveal delay={150} className="relative mt-8 hidden lg:block">
            <div className="hud-corners relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-navy/50 to-navy-deep/80">
              <div className="absolute -top-16 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
              <img
                src={stephenAlt.url}
                alt="Stephen Taylor"
                loading="lazy"
                width={1024}
                height={1536}
                className="relative mx-auto max-h-[26rem] object-contain [mask-image:linear-gradient(to_bottom,black_85%,transparent_99%)]"
              />
            </div>
          </Reveal>
        </div>

        {/* Stat cards */}
        <div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {STATS.map((stat, i) => (
              <Reveal key={stat.value} delay={i * 90}>
                <div className="group card-cinematic relative h-full overflow-hidden rounded-xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                  <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gold/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="text-gold-gradient block font-display text-3xl leading-none tracking-wide uppercase sm:text-[2rem]">
                    {stat.value}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {stat.label}
                  </p>
                  <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gold-gradient transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={320}>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground/80">
              Past business results are examples of experience and are not guarantees of
              member results.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
