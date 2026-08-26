import { Briefcase, FileCheck, ShieldCheck, TrendingUp } from "lucide-react";
import { Reveal } from "./shared";

const ITEMS = [
  { icon: ShieldCheck, label: "Real Experience" },
  { icon: FileCheck, label: "Real Contracts" },
  { icon: Briefcase, label: "Real Systems" },
  { icon: TrendingUp, label: "Real Growth" },
];

export function AuthorityBar() {
  return (
    <section className="relative border-y border-white/10 bg-navy-deep/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="grid grid-cols-2 divide-x divide-white/5 md:grid-cols-4">
            {ITEMS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-3 py-6 md:py-8"
              >
                <Icon className="size-5 shrink-0 text-gold" strokeWidth={2.2} />
                <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-foreground/90 uppercase md:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
