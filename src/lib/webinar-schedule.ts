/**
 * Recurring webinar schedule: every Thursday at 7:00 PM Central.
 * The first session is Thursday, September 10 (2026).
 * Once a session time passes, the next Thursday becomes the new date.
 */

export const WEBINAR_TIME_ZONE = "America/Chicago";
export const WEBINAR_HOUR_LOCAL = 19; // 7 PM Central
/** First scheduled session (Thursday, September 10, 2026, 7 PM Central). */
export const WEBINAR_FIRST_SESSION = { year: 2026, month: 9, day: 10 };

/** Offset (ms) that must be added to a UTC instant to get Central wall-clock time. */
function zoneOffsetMs(instant: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: WEBINAR_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(instant);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? "0");
  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );
  return asUtc - instant.getTime();
}

/** Convert Central wall-clock time to the correct UTC instant (DST-aware). */
function centralToUtc(year: number, month: number, day: number, hour: number): Date {
  const naive = Date.UTC(year, month - 1, day, hour);
  let instant = new Date(naive - zoneOffsetMs(new Date(naive)));
  instant = new Date(naive - zoneOffsetMs(instant));
  return instant;
}

/** Central-time calendar parts for an instant. */
function centralParts(instant: Date) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: WEBINAR_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(instant);
  const get = (type: string) => fmt.find((p) => p.type === type)?.value ?? "";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    weekday: get("weekday"),
  };
}

/**
 * Next upcoming webinar instant: the soonest Thursday 7 PM Central that is
 * still in the future, never earlier than the first scheduled session.
 */
export function getNextWebinarDate(now: Date = new Date()): Date {
  const first = centralToUtc(
    WEBINAR_FIRST_SESSION.year,
    WEBINAR_FIRST_SESSION.month,
    WEBINAR_FIRST_SESSION.day,
    WEBINAR_HOUR_LOCAL,
  );
  if (now.getTime() < first.getTime()) return first;

  const today = centralParts(now);
  for (let i = 0; i <= 8; i++) {
    const probe = new Date(Date.UTC(today.year, today.month - 1, today.day + i, 12));
    const p = centralParts(probe);
    if (p.weekday !== "Thu") continue;
    const candidate = centralToUtc(p.year, p.month, p.day, WEBINAR_HOUR_LOCAL);
    if (candidate.getTime() > now.getTime()) return candidate;
  }
  return first;
}

/** e.g. "Thursday, September 10 · 7:00 PM CT" */
export function formatWebinarDate(date: Date): string {
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: WEBINAR_TIME_ZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
  return `${day} \u00b7 7:00 PM CT`;
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getCountdownParts(target: Date, now: Date = new Date()): CountdownParts {
  const diff = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
