import { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND_NAME } from "@/lib/config";
import { CTAButton } from "./cta-button";

/** Minimal conversion nav: logo left, single CTA right. No exit links. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-navy-deep/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20">
        <a href="/" className="flex items-center gap-2.5" aria-label={BRAND_NAME}>
          <span className="flex size-9 items-center justify-center rounded-md bg-gold-gradient shadow-[0_0_20px_-4px_var(--gold)]">
            <Shield className="size-5 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <span className="font-display text-base tracking-wider whitespace-nowrap uppercase sm:text-lg">
            7 Figure <span className="text-gold-gradient">Security</span>
          </span>
        </a>
        <CTAButton
          trackingLabel="header"
          className="px-3.5 py-2.5 text-[11px] whitespace-nowrap sm:px-6 sm:text-sm"
        >
          Join {BRAND_NAME}
        </CTAButton>
      </div>
    </header>
  );
}
