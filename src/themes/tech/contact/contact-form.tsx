"use client";

import { AlertCircle, Check, Loader2 } from "lucide-react";
import { useContactForm } from "@/lib/hooks/use-contact-form";
import type { Dictionary } from "@/lib/i18n/types";

type FormLabels = Dictionary["contact"]["form"];

const promptClass =
  "w-full border-b border-border-strong bg-transparent py-1.5 text-foreground placeholder:text-foreground-subtle focus:border-accent focus:outline-none";

export function ContactForm({ labels }: { labels: FormLabels }) {
  const { status, handleSubmit } = useContactForm();

  if (status === "success") {
    return (
      <div className="space-y-1">
        <p className="flex items-center gap-2 text-accent">
          <Check size={16} strokeWidth={2} /> {labels.successTitle}
        </p>
        <p className="pl-6 text-foreground-muted">{labels.successBody}</p>
        <p className="pl-6 text-foreground-subtle">exit code: 0</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot field for basic spam protection; kept hidden from real visitors. */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

      <div className="flex items-baseline gap-2">
        <label htmlFor="name" className="shrink-0 text-accent">
          name&gt;
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder={labels.namePlaceholder}
          className={promptClass}
        />
      </div>

      <div className="flex items-baseline gap-2">
        <label htmlFor="email" className="shrink-0 text-accent">
          email&gt;
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={labels.emailPlaceholder}
          className={promptClass}
        />
      </div>

      <div className="flex items-start gap-2">
        <label htmlFor="message" className="shrink-0 pt-1.5 text-accent">
          message&gt;
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={3}
          placeholder={labels.messagePlaceholder}
          className={`${promptClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="flex items-center gap-1.5 text-foreground">
          <AlertCircle size={14} strokeWidth={1.75} /> {labels.errorBody}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 self-start rounded-md border border-accent px-4 py-2 text-accent transition-colors duration-fast ease-standard hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
      >
        {status === "submitting" ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 size={14} className="animate-spin" /> {labels.submitting}
          </span>
        ) : (
          `[ ${labels.submit} ]`
        )}
      </button>
    </form>
  );
}
