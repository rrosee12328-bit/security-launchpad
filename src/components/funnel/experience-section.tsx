import { Reveal, Eyebrow } from "./shared";
import stephenAlt from "@/assets/stephen-alt.png.asset.json";
import buildingImg from "@/assets/commercial-building.jpg";

const STATS = [
  { value: "$0 → 7 Figures", label: "Built in about five years" },
  { value: "113 Employees", label: "At peak scale" },
  {
    value: "Major Government Contracts",
    label: "City of Houston, TxDOT, Metro",
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

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Portrait */}
        <Reveal className="order-2 lg:order-1">
          <div className="hud-corners relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-navy/50 to-navy-deep/80">
            <div className="absolute -top-16 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
            <img
              src={stephenAlt.url}
              alt="Stephen Taylor"
              loading="lazy"
              width={1024}
              height={1536}
              className="relative mx-auto max-h-[24rem] object-contain [mask-image:linear-gradient(to_bottom,black_85%,transparent_99%)]"
            />
          </div>
        </Reveal>

        {/* Copy + stats */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>Your Host</Eyebrow>
            <h2 className="mt-4 font-display text-3xl leading-[1.05] tracking-wide text-balance uppercase sm:text-4xl md:text-[2.75rem]">
              Learn From Someone Who{" "}
              <span className="text-gold-gradient">Actually Built It</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Stephen Taylor built Kairos Security from $0 to seven figures in
              approximately five years, grew the company to 113 employees, and won major
              contracts including the City of Houston, TxDOT, and Metro.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {STATS.map((stat, i) => (
              <Reveal key={stat.value} delay={i * 90}>
                <div className="card-cinematic h-full rounded-xl p-7 text-center">
                  <span className="text-gold-gradient block font-display text-3xl leading-tight tracking-wide uppercase sm:text-4xl">
                    {stat.value}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={280}>
            <p className="mt-8 border-l-2 border-gold pl-4 text-base leading-relaxed text-foreground/90">
              In this webinar, Stephen shares the mistakes he sees aspiring owners
              make&mdash;and the lessons he wishes more people understood before starting.
            </p>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground/80">
              Past business results are examples of experience and are not guarantees of
              future results.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
