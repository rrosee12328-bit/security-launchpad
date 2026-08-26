import {
  Cog,
  DollarSign,
  FileText,
  Handshake,
  LineChart,
  Shield,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { Reveal, SectionHeading } from "./shared";

const PILLARS = [
  { icon: Shield, label: "Compliance" },
  { icon: DollarSign, label: "Pricing" },
  { icon: FileText, label: "Contracts" },
  { icon: Handshake, label: "Sales" },
  { icon: UserCheck, label: "People" },
  { icon: Cog, label: "Systems" },
  { icon: LineChart, label: "Operations" },
  { icon: TrendingUp, label: "Growth" },
];

export function WhyDifferentSection() {
  return (
    <section className="section-pad relative overflow-hidden bg-navy-deep/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why This Is Different"
          title={
            <>
              You&rsquo;re Learning the Business{" "}
              <span className="text-gold-gradient">Behind the Guards</span>
            </>
          }
          copy="Security companies don't grow because they simply hire more guards. They grow when the owner understands how to build the business behind the service."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={(i % 4) * 70}>
              <div className="group card-cinematic flex flex-col items-center gap-4 rounded-xl px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                <span className="flex size-12 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 transition-shadow duration-300 group-hover:shadow-[0_0_25px_-5px_var(--gold)]">
                  <Icon className="size-5 text-gold" strokeWidth={1.9} />
                </span>
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-foreground/90 uppercase">
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed text-foreground/90 md:text-lg">
            The goal is to help you think and operate like a security company
            owner&mdash;not just someone providing security services.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
