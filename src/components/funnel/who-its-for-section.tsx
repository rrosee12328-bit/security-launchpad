import { Compass, Rocket, Shield, UserCog, Users } from "lucide-react";
import { CTAButton } from "./cta-button";
import { Reveal, SectionHeading } from "./shared";

const AUDIENCES = [
  {
    icon: Rocket,
    title: "Aspiring Security Entrepreneurs",
    copy: "You want to start a security company but need a clear roadmap.",
  },
  {
    icon: Shield,
    title: "Security Professionals Ready to Become Owners",
    copy: "You know security but need to understand the business side.",
  },
  {
    icon: Compass,
    title: "New Security Company Owners",
    copy: "You've already started but need stronger systems and direction.",
  },
  {
    icon: UserCog,
    title: "Existing Owners",
    copy: "You're operating but need better pricing, operations, contracts, or infrastructure.",
  },
  {
    icon: Users,
    title: "Growth-Minded Entrepreneurs",
    copy: "You want to build something bigger than a business that depends completely on you.",
  },
];

export function WhoItsForSection() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-gold/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Who This Is For"
          title={
            <>
              Is 7 Figure Security <span className="text-gold-gradient">Right for You?</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map(({ icon: Icon, title, copy }, i) => (
            <Reveal
              key={title}
              delay={(i % 3) * 90}
              className={i === 3 ? "lg:col-start-1 lg:translate-x-1/2" : i === 4 ? "lg:translate-x-1/2" : ""}
            >
              <div className="group card-cinematic h-full rounded-xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                <span className="mb-5 inline-flex size-12 items-center justify-center rounded-lg border border-gold/35 bg-gradient-to-b from-gold/20 to-gold/5">
                  <Icon className="size-5.5 text-gold" strokeWidth={1.8} />
                </span>
                <h3 className="text-lg leading-snug font-bold tracking-tight">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220} className="mt-12 flex flex-col items-center gap-6 text-center">
          <p className="max-w-xl text-base text-foreground/90 md:text-lg">
            If you&rsquo;re serious about building a real security business, you&rsquo;re
            in the right place.
          </p>
          <CTAButton trackingLabel="who-its-for" size="lg" showArrow>
            Become a Member
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
