import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, Mail } from "lucide-react";
import { BRAND_NAME, WEBINAR_DATE_LABEL, WEBINAR_TITLE } from "@/lib/config";

export const Route = createFileRoute("/confirmation")({ component: Confirmation });

function Confirmation() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16 text-foreground">
      <section className="card-cinematic w-full max-w-2xl rounded-2xl p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto size-16 text-gold" />
        <p className="mt-6 font-mono text-xs tracking-[0.25em] text-gold uppercase">
          Registration confirmed
        </p>
        <h1 className="mt-4 font-display text-4xl uppercase sm:text-6xl">
          You&rsquo;re on the list.
        </h1>
        <h2 className="mx-auto mt-5 max-w-xl text-xl font-semibold">{WEBINAR_TITLE}</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <CalendarDays className="mx-auto size-6 text-gold" />
            <p className="mt-2 text-sm">{WEBINAR_DATE_LABEL}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <Mail className="mx-auto size-6 text-gold" />
            <p className="mt-2 text-sm">Check your inbox for confirmation.</p>
          </div>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          We&rsquo;ll send the date, attendance link, and reminders as soon as they are available.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-md border border-gold/40 px-5 py-3 text-sm font-semibold text-gold"
        >
          Return to {BRAND_NAME}
        </Link>
      </section>
    </main>
  );
}
