"use client";

import { useLanguage } from "@/components/language-provider";
import { ScrambleText } from "@/components/scramble-text";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-3 text-caption text-foreground-subtle sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}.{" "}
          <ScrambleText text={t.footer.rights} />
        </p>
        <p>
          <ScrambleText text={t.footer.builtWith} />
        </p>
      </div>
    </footer>
  );
}
