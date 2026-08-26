import { BRAND_NAME } from "@/lib/config";
import { trackEvent } from "@/lib/tracking";
import { useLeadModal } from "./lead-modal";

/** Mobile-only sticky CTA — always visible, hidden while the lead modal is open. */
export function MobileStickyCTA() {
  const { open, isOpen } = useLeadModal();
  if (isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="border-t border-gold/30 bg-navy-deep/92 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md">
        <button
          type="button"
          onClick={() => {
            trackEvent("CTA_Click", { cta: "mobile-sticky" });
            open();
          }}
          className="relative flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md bg-gold-gradient text-sm font-bold tracking-wide text-primary-foreground uppercase shadow-[0_8px_30px_-8px_var(--gold)]"
        >
          <span
            aria-hidden
            className="animate-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent"
          />
          <span className="relative">Join {BRAND_NAME}</span>
        </button>
      </div>
    </div>
  );
}
