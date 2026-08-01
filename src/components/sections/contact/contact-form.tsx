"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Check, Loader2, Send } from "lucide-react";
import { ScrambleText } from "@/components/scramble-text";
import type { Dictionary } from "@/lib/i18n/types";

type FormLabels = Dictionary["contact"]["form"];
type Status = "idle" | "submitting" | "success" | "error";

const EASE = [0.22, 1, 0.36, 1] as const;

const fieldClass =
  "mt-1.5 w-full rounded-md border border-border-strong bg-transparent px-3.5 py-2.5 text-small text-foreground placeholder:text-foreground-subtle transition-colors duration-fast ease-standard focus:border-accent focus:outline-none";

export function ContactForm({ labels }: { labels: FormLabels }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");

    const formData = new FormData(form);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "");
    formData.append("subject", "New message from portfolio contact form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
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

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-small font-medium text-accent-foreground transition-transform duration-fast ease-standard hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
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
      </button>
    </form>
  );
}
