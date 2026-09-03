import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  formatWebinarDate,
  getCountdownParts,
  getNextWebinarDate,
  type CountdownParts,
} from "@/lib/webinar-schedule";

/** Live countdown to the next Thursday 7 PM CT webinar. Rolls over automatically. */
export function useWebinarCountdown() {
  const [state, setState] = useState<{
    target: Date;
    parts: CountdownParts;
    ready: boolean;
  }>(() => {
    const target = getNextWebinarDate(new Date(0));
    return { target, parts: getCountdownParts(target, new Date(0)), ready: false };
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const target = getNextWebinarDate(now);
      setState({ target, parts: getCountdownParts(target, now), ready: true });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return state;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function WebinarCountdown({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { target, parts, ready } = useWebinarCountdown();
  const units = [
    { label: "Days", value: pad(parts.days) },
    { label: "Hours", value: pad(parts.hours) },
    { label: "Mins", value: pad(parts.minutes) },
    { label: "Secs", value: pad(parts.seconds) },
  ];

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-3 flex items-center gap-2">
        <CalendarDays className="size-4 shrink-0 text-gold" />
        <span
          suppressHydrationWarning
          className="font-mono text-[11px] font-semibold tracking-[0.22em] text-gold uppercase sm:text-xs"
        >
          {formatWebinarDate(target)}
        </span>
      </div>

      <div
        className={cn(
          "grid grid-cols-4 gap-2 sm:gap-3",
          compact ? "max-w-xs" : "max-w-md",
        )}
      >
        {units.map((u) => (
          <div
            key={u.label}
            className="rounded-lg border border-gold/25 bg-navy-deep/80 px-2 py-3 text-center backdrop-blur-sm"
          >
            <div
              suppressHydrationWarning
              className={cn(
                "font-display tracking-wide text-gold-gradient tabular-nums",
                compact ? "text-2xl" : "text-3xl sm:text-4xl",
                !ready && "opacity-60",
              )}
            >
              {u.value}
            </div>
            <div className="mt-1 font-mono text-[9px] font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:text-[10px]">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
