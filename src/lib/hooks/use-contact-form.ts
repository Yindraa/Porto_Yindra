"use client";

import { useState, type FormEvent } from "react";

export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

/**
 * Submit logic (Web3Forms + honeypot + status) shared by every theme's
 * contact form — this is business logic, not design, so it's kept in one
 * place instead of being re-implemented three times.
 */
export function useContactForm() {
  const [status, setStatus] = useState<ContactFormStatus>("idle");

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

  return { status, handleSubmit };
}
