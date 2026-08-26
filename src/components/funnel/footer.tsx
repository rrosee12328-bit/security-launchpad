import { Shield } from "lucide-react";
import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/config";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-navy-deep">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-12 pb-28 sm:px-6 md:pb-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-md bg-gold-gradient">
              <Shield className="size-5 text-primary-foreground" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg tracking-wider uppercase">
              7 Figure <span className="text-gold-gradient">Security</span>
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {["Privacy Policy", "Terms & Conditions", "Disclaimer"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-gold"
              >
                {label}
              </a>
            ))}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              Contact
            </a>
          </nav>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground/70">
          {BRAND_NAME} provides educational information only and does not provide legal,
          financial, licensing, or professional advice. Requirements vary by jurisdiction.
          Results are not guaranteed.
        </p>

        <p className="mt-6 text-center font-mono text-[10px] tracking-[0.25em] text-muted-foreground/50 uppercase">
          &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
