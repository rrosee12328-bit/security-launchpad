import {
  BookOpen,
  Brain,
  FolderOpen,
  MessagesSquare,
  PlayCircle,
  RefreshCw,
  Users,
} from "lucide-react";
import { Eyebrow, Reveal } from "./shared";

const FEATURES = [
  {
    icon: PlayCircle,
    title: "Step-by-Step Training",
    copy: "Learn the major foundations of starting, operating, and growing a security company.",
  },
  {
    icon: FolderOpen,
    title: "Business Resources",
    copy: "Access tools, templates, worksheets, and resources that help turn the lessons into action.",
  },
  {
    icon: Brain,
    title: "Real-World Strategy",
    copy: "Learn lessons based on actual experience in the security industry.",
  },
  {
    icon: Users,
    title: "Community",
    copy: "Build alongside aspiring and existing security entrepreneurs.",
  },
  {
    icon: MessagesSquare,
    title: "Questions & Support",
    copy: "Get clarity when you encounter challenges along the way.",
  },
  {
    icon: RefreshCw,
    title: "Ongoing Education",
    copy: "Continue learning as new lessons, resources, and discussions are added.",
  },
];

/** Premium CSS-built browser mockup of the Skool community (no flat screenshot). */
function SkoolMockup() {
  return (
    <div className="relative">
      {/* glow behind */}
      <div className="animate-pulse-glow absolute -inset-6 rounded-3xl bg-gold/10 blur-3xl" />

      {/* browser frame */}
      <div className="card-cinematic relative overflow-hidden rounded-xl border-white/15 shadow-[0_40px_90px_-30px_oklch(0_0_0/85%)]">
        {/* chrome bar */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-navy-deep/90 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-gold/70" />
          </div>
          <div className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-center">
            <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
              skool.com/7-figure-security-5885
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[110px_1fr] bg-gradient-to-b from-navy to-navy-deep sm:grid-cols-[150px_1fr]">
          {/* sidebar */}
          <div className="flex flex-col gap-1 border-r border-white/10 p-3">
            {["Community", "Classroom", "Members", "Leaderboards", "About"].map((item, i) => (
              <span
                key={item}
                className={
                  i === 0
                    ? "rounded-md bg-gold/15 px-2.5 py-2 font-mono text-[9px] font-semibold tracking-widest text-gold uppercase sm:text-[10px]"
                    : "rounded-md px-2.5 py-2 font-mono text-[9px] tracking-widest text-muted-foreground uppercase sm:text-[10px]"
                }
              >
                {item}
              </span>
            ))}
          </div>

          {/* feed */}
          <div className="flex flex-col gap-3 p-3 sm:p-4">
            <div className="rounded-lg border border-gold/30 bg-gold/5 p-3">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-gold-gradient font-display text-[10px] text-primary-foreground">
                  ST
                </span>
                <div>
                  <p className="text-[11px] font-semibold">Stephen Taylor</p>
                  <p className="text-[9px] text-muted-foreground">Admin &bull; pinned</p>
                </div>
              </div>
              <p className="mt-2 text-[11px] leading-snug text-foreground/85">
                New module live: How to Get Security Contracts — proposals, RFPs, and outreach
                strategy.
              </p>
            </div>
            {[
              {
                tag: "Wins",
                text: "Just submitted my first government RFP using the Module 6 framework.",
              },
              {
                tag: "Pricing",
                text: "Recalculated my labor burden — my old rate was losing money.",
              },
            ].map((post) => (
              <div key={post.tag} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <span className="rounded-full border border-gold/25 px-2 py-0.5 font-mono text-[8px] tracking-widest text-gold uppercase">
                  {post.tag}
                </span>
                <p className="mt-2 text-[11px] leading-snug text-muted-foreground">{post.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* floating lesson card */}
      <div className="animate-floaty absolute -right-3 -bottom-6 hidden rounded-lg border border-gold/40 bg-navy-deep/95 p-3.5 shadow-[0_20px_50px_-15px_oklch(0_0_0/80%)] sm:block">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-md bg-gold/15">
            <BookOpen className="size-4.5 text-gold" />
          </span>
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-gold uppercase">Module 06</p>
            <p className="text-xs font-semibold">How to Get Security Contracts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommunitySection() {
  return (
    <section className="section-pad relative overflow-hidden bg-navy-deep/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="bg-blueprint-fine absolute inset-0 opacity-40" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow>The Community</Eyebrow>
            <h2 className="mt-4 font-display text-3xl leading-[1.05] tracking-wide text-balance uppercase sm:text-4xl md:text-[2.75rem]">
              You&rsquo;re Not Just Buying Information.{" "}
              <span className="text-gold-gradient">You&rsquo;re Joining a Community.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              7 Figure Security is hosted inside Skool — bringing the training, resources, and
              community together in one place so you&rsquo;re not trying to build alone.
            </p>
          </Reveal>

          <div className="mt-9 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, copy }, i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="flex gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10">
                    <Icon className="size-4.5 text-gold" strokeWidth={1.9} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold tracking-wide uppercase">{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={150}>
          <SkoolMockup />
        </Reveal>
      </div>
    </section>
  );
}
