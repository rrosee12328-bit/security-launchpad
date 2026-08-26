import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { ArrowRight, Lock, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BRAND_NAME,
  LEAD_SUBMISSION_ENDPOINT,
  SKOOL_REDIRECT_DELAY_MS,
  SUPABASE_ANON_KEY,
  buildSkoolUrl,
} from "@/lib/config";
import { getUtmParams, trackEvent } from "@/lib/tracking";

/* ------------------------------------------------------------------ */
/* Context — one shared modal instance driven by every CTA on the page */
/* ------------------------------------------------------------------ */

const LeadModalContext = createContext<{ open: () => void; isOpen: boolean }>({
  open: () => {},
  isOpen: false,
});

export const useLeadModal = () => useContext(LeadModalContext);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    trackEvent("Lead_Form_Open");
  }, []);

  return (
    <LeadModalContext.Provider value={{ open, isOpen }}>
      {children}
      <LeadModal open={isOpen} onClose={() => setIsOpen(false)} />
    </LeadModalContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: { firstName: string; email: string; phone: string }) {
  const errors: Partial<Record<"firstName" | "email" | "phone", string>> = {};
  if (values.firstName.trim().length < 2) errors.firstName = "Enter your first name.";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid email address.";
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10) errors.phone = "Enter a valid phone number.";
  return errors;
}

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */

type Stage = "form" | "submitting" | "success";

function LeadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [stage, setStage] = useState<Stage>("form");
  const [values, setValues] = useState({ firstName: "", email: "", phone: "" });
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [submitError, setSubmitError] = useState("");
  const [skoolUrl, setSkoolUrl] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const redirectRef = useRef<number | null>(null);

  const close = useCallback(() => {
    if (redirectRef.current) {
      window.clearTimeout(redirectRef.current);
      redirectRef.current = null;
    }
    onClose();
  }, [onClose]);

  // Reset back to the form whenever the modal is reopened

  useEffect(() => {
    if (open) setStage((s) => (s === "success" ? "success" : "form"));
  }, [open]);

  // Scroll lock + Escape to close
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && stage !== "submitting") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, stage, onClose]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStage("submitting");
    setSubmitError("");

    const utm = getUtmParams();
    const payload = {
      firstName: values.firstName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      submittedAt: new Date().toISOString(),
      landingPageUrl: window.location.href,
      referralUrl: document.referrer || "",
      ...utm,
    };

    // The lead must be persisted before enrollment can continue.
    try {
      const response = await fetch(LEAD_SUBMISSION_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Lead capture failed (${response.status})`);
    } catch (err) {
      console.warn("[7fs] lead capture failed", err);
      setStage("form");
      setSubmitError(
        "We couldn't save your information. Please check your connection and try again.",
      );
      return;
    }

    trackEvent("Lead", {
      email: payload.email,
      phone: payload.phone,
    });

    const destination = buildSkoolUrl(utm);
    setSkoolUrl(destination);
    setStage("success");

    trackEvent("Skool_Redirect", { destination });
    window.setTimeout(() => {
      window.location.assign(destination);
    }, SKOOL_REDIRECT_DELAY_MS);
  }

  const inputClass = (hasError?: string) =>
    cn(
      "h-12 w-full rounded-md border bg-white/[0.04] px-4 text-base text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none",
      hasError ? "border-destructive" : "border-white/15",
    );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Join 7 Figure Security"
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
    >
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={stage === "submitting" ? undefined : onClose}
        className="absolute inset-0 cursor-pointer bg-navy-deep/85 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="card-cinematic relative w-full max-w-md overflow-hidden rounded-xl"
      >
        {/* gold top edge */}
        <div className="h-[3px] w-full bg-gold-gradient" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />

        {stage !== "submitting" && (
          <button
            onClick={onClose}
            aria-label="Close form"
            className="absolute top-4 right-4 cursor-pointer rounded-full border border-white/10 p-1.5 text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            <X className="size-4" />
          </button>
        )}

        <div className="relative p-6 sm:p-8">
          {stage === "success" ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="mb-6 flex size-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                <ShieldCheck className="size-8 text-gold" />
              </div>
              <h3 className="font-display text-3xl tracking-wide uppercase">
                You&rsquo;re Almost There.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Taking you to {BRAND_NAME} to complete your enrollment...
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="size-5 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
                <span className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase">
                  Redirecting
                </span>
              </div>
              {skoolUrl && (
                <a
                  href={skoolUrl}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold underline-offset-4 hover:underline"
                >
                  Continue to Enrollment <ArrowRight className="size-4" />
                </a>
              )}
            </div>
          ) : (
            <>
              <h3 className="font-display text-2xl leading-tight tracking-wide uppercase sm:text-3xl">
                Ready to Build Your Security Company?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your information below to continue to {BRAND_NAME}.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
                {submitError && (
                  <div
                    role="alert"
                    className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  >
                    {submitError}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="lead-first-name"
                    className="mb-1.5 block text-xs font-semibold tracking-wide text-foreground/80 uppercase"
                  >
                    First Name <span className="text-gold">*</span>
                  </label>
                  <input
                    id="lead-first-name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Your first name"
                    value={values.firstName}
                    onChange={(e) => setValues({ ...values, firstName: e.target.value })}
                    className={inputClass(errors.firstName)}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-destructive">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lead-email"
                    className="mb-1.5 block text-xs font-semibold tracking-wide text-foreground/80 uppercase"
                  >
                    Email Address <span className="text-gold">*</span>
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                    className={inputClass(errors.email)}
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>

                <div>
                  <label
                    htmlFor="lead-phone"
                    className="mb-1.5 block text-xs font-semibold tracking-wide text-foreground/80 uppercase"
                  >
                    Phone Number <span className="text-gold">*</span>
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(555) 123-4567"
                    value={values.phone}
                    onChange={(e) => setValues({ ...values, phone: e.target.value })}
                    className={inputClass(errors.phone)}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                </div>

                <button
                  type="submit"
                  disabled={stage === "submitting"}
                  className="group relative mt-2 inline-flex h-13 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md bg-gold-gradient px-6 text-base font-bold tracking-wide text-primary-foreground uppercase shadow-[0_10px_35px_-10px_var(--gold)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {stage === "submitting" ? (
                    <>
                      <span className="size-5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span
                        aria-hidden
                        className="animate-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                      />
                      <span className="relative">Continue to {BRAND_NAME}</span>
                      <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="size-3 text-gold" />
                  Your information is kept private.
                </p>
                <p className="text-center text-xs text-muted-foreground/70">
                  You&rsquo;ll continue to Skool to complete your paid enrollment.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
