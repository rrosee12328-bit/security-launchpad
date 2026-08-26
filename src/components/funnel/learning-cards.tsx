import {
  Building2,
  Calculator,
  FileSignature,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import { CTAButton } from "./cta-button";
import { Reveal, SectionHeading } from "./shared";

const CARDS = [
  {
    icon: Building2,
    num: "01",
    title: "Build It Right",
    copy: "Learn how to structure your company, establish your brand, set up professional communication, and build the infrastructure needed to operate professionally.",
  },
  {
    icon: Calculator,
    num: "02",
    title: "Price for Profit",
    copy: "Understand wages, payroll burden, insurance, overhead, margins, and how to create pricing that accounts for the real cost of delivering security services.",
  },
  {
    icon: FileSignature,
    num: "03",
    title: "Understand & Win Contracts",
    copy: "Learn how security contracts work, what clients look for, how proposals and RFPs work, and how to position your company for opportunities.",
  },
  {
    icon: Users,
    num: "04",
    title: "Build Your Team",
    copy: "Learn the fundamentals of hiring, onboarding, scheduling, documentation, accountability, and managing security officers.",
  },
  {
    icon: Settings,
    num: "05",
    title: "Create Real Systems",
    copy: "Build processes for scheduling, reporting, client communication, incidents, operations, documentation, and risk management.",
  },
  {
    icon: TrendingUp,
    num: "06",
    title: "Prepare to Scale",
    copy: "Learn how to build beyond yourself, develop leadership, add services, manage larger operations, and prepare the company for growth.",
  },
];

export function LearningCards() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gold/6 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What You'll Learn"
          title={
            <>
              Build the Business. <span className="text-gold-gradient">Not Just the Idea.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map(({ icon: Icon, num, title, copy }, i) => (
            <Reveal key={title} delay={(i % 3) * 90}>
              <article className="group card-cinematic relative h-full overflow-hidden rounded-xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_30px_70px_-24px_oklch(0_0_0/80%),0_0_50px_-18px_var(--gold)]">
                {/* ghost number + blueprint texture */}
                <span
                  aria-hidden
                  className="absolute -top-4 right-3 font-display text-[6rem] leading-none text-white/[0.05] transition-colors duration-300 select-none group-hover:text-gold/10"
                >
                  {num}
                </span>
                <div className="bg-blueprint-fine absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-60" />

                {/* light sweep on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-gold/15 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]"
                />

                <div className="relative">
                  <div className="mb-5 inline-flex size-13 items-center justify-center rounded-lg border border-gold/35 bg-gradient-to-b from-gold/20 to-gold/5 shadow-[0_0_25px_-6px_var(--gold)]">
                    <Icon className="size-6 text-gold" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-xl tracking-wide uppercase">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
                </div>

                {/* gold base line */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gold-gradient transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 flex justify-center">
          <CTAButton trackingLabel="learning-cards" size="lg" showArrow>
            Join 7 Figure Security
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
