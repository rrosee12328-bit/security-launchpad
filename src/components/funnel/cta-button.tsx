import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/tracking";
import { useLeadModal } from "./lead-modal";

/**
 * The single reusable CTA used across the entire funnel.
 * Every instance tracks CTA_Click and opens the shared LeadModal.
 */
export function CTAButton({
  children,
  trackingLabel,
  variant = "gold",
  size = "default",
  className,
  showArrow = false,
}: {
  children: ReactNode;
  /** Identifies which CTA fired in analytics (e.g. "hero", "pricing"). */
  trackingLabel: string;
  variant?: "gold" | "outline";
  size?: "default" | "lg";
  className?: string;
  showArrow?: boolean;
}) {
  const { open } = useLeadModal();

  return (
    <button
      type="button"
      onClick={() => {
        trackEvent("CTA_Click", { cta: trackingLabel });
        open();
      }}
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md font-semibold tracking-wide transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        size === "lg" ? "px-9 py-4 text-base md:text-lg" : "px-6 py-3 text-sm",
        variant === "gold" &&
          "bg-gold-gradient text-primary-foreground shadow-[0_10px_35px_-10px_var(--gold),inset_0_1px_0_oklch(1_0_0/40%)] hover:-translate-y-0.5 hover:shadow-[0_18px_45px_-10px_var(--gold),inset_0_1px_0_oklch(1_0_0/40%)] active:translate-y-0",
        variant === "outline" &&
          "border-gold-fade border bg-transparent text-gold hover:-translate-y-0.5 hover:bg-gold/10",
        className,
      )}
    >
      {/* travelling metallic highlight */}
      {variant === "gold" && (
        <span
          aria-hidden
          className="animate-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent"
        />
      )}
      <span className="relative uppercase">{children}</span>
      {showArrow && (
        <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );
}
