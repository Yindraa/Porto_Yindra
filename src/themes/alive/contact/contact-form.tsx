"use client";

import { motion } from "framer-motion";
import { AlertCircle, Check, Loader2, Send } from "lucide-react";
import { ScrambleText } from "@/components/scramble-text";
import { useContactForm } from "@/lib/hooks/use-contact-form";
import type { Dictionary } from "@/lib/i18n/types";

type FormLabels = Dictionary["contact"]["form"];

const SPRING = { type: "spring", stiffness: 400, damping: 15 } as const;

const fieldClass =
  "mt-1.5 w-full rounded-md border border-border-strong bg-transparent px-3.5 py-2.5 text-small text-foreground placeholder:text-foreground-subtle transition-colors duration-fast ease-standard focus:border-accent focus:outline-none";

export function ContactForm({ labels }: { labels: FormLabels }) {
  const { status, handleSubmit } = useContactForm();

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={SPRING}
        className="flex flex-col items-center py-6 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Check size={20} strokeWidth={2} />
        </div>
        <h3 className="mt-4 text-h3 text-foreground">
          <ScrambleText text={labels.successTitle} />
        </h3>
        <p className="mt-2 max-w-xs text-small text-foreground-muted">{labels.successBody}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      {/* Honeypot field for basic spam protection; kept hidden from real visitors. */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

      <div>
        <label htmlFor="name" className="text-caption text-foreground-muted">
          {labels.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder={labels.namePlaceholder}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="text-caption text-foreground-muted">
          {labels.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={labels.emailPlaceholder}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-caption text-foreground-muted">
          {labels.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder={labels.messagePlaceholder}
          className={`${fieldClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="flex items-center gap-1.5 text-caption text-foreground">
          <AlertCircle size={14} strokeWidth={1.75} />
          {labels.errorBody}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={status === "submitting" ? undefined : { scale: 1.05, rotate: -1 }}
        whileTap={status === "submitting" ? undefined : { scale: 0.92 }}
        transition={SPRING}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-small font-medium text-accent-foreground disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {labels.submitting}
          </>
        ) : (
          <>
            <Send size={16} strokeWidth={1.75} />
            {labels.submit}
          </>
        )}
      </motion.button>
    </form>
  );
}
