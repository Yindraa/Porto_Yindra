"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { useIntro } from "@/components/intro-provider";
import { ScrambleText } from "@/components/scramble-text";
import { FadeText } from "@/components/fade-text";
import { siteConfig } from "@/lib/site-config";
import { TypewriterLine } from "./typewriter-line";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t } = useLanguage();
  const { introDone } = useIntro();

  // 0 = typing "$ whoami", 1 = typing name, 2 = typing "$ role --current",
  // 3 = typing role, 4 = transcript done, rest of the hero fades in.
  const [phase, setPhase] = useState(0);
  const [nameRevealed, setNameRevealed] = useState(false);
  const [roleRevealed, setRoleRevealed] = useState(false);

  return (
    <section id="top" className="relative flex min-h-[92vh] flex-col justify-center px-6 py-32">
      <div className="mx-auto w-full max-w-2xl">
        <div className="glass overflow-hidden rounded-md">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-caption text-foreground-subtle">~/portfolio/hero.sh</span>
          </div>

          <div className="space-y-1.5 p-5 text-small leading-relaxed sm:p-6">
            {introDone && (
              <div className="text-foreground-muted">
                <TypewriterLine text="$ whoami" cursor={phase === 0} onDone={() => setPhase(1)} />
              </div>
            )}

            {phase >= 1 && (
              <div className="text-h3 text-accent">
                {nameRevealed ? (
                  <ScrambleText text={siteConfig.name} />
                ) : (
                  <TypewriterLine
                    text={siteConfig.name}
                    cursor={phase === 1}
                    onDone={() => {
                      setNameRevealed(true);
                      setPhase(2);
                    }}
                  />
                )}
              </div>
            )}

            {phase >= 2 && (
              <div className="pt-2 text-foreground-muted">
                <TypewriterLine
                  text="$ role --current"
                  cursor={phase === 2}
                  onDone={() => setPhase(3)}
                />
              </div>
            )}

            {phase >= 3 && (
              <div className="text-foreground">
                {roleRevealed ? (
                  <ScrambleText text={t.hero.role} />
                ) : (
                  <TypewriterLine
                    text={t.hero.role}
                    cursor={phase === 3}
                    onDone={() => {
                      setRoleRevealed(true);
                      setPhase(4);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4, ease: EASE }}
          className="mt-6"
        >
          <span className="inline-flex items-center gap-2 rounded-md border border-border-strong px-3 py-1.5 text-caption text-foreground-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <ScrambleText text={t.hero.status} />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
          className="mt-4 max-w-xl text-small text-foreground-muted"
        >
          <span className="text-accent">#</span> <FadeText text={t.hero.subtitle} />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4, delay: 0.16, ease: EASE }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-md border border-accent px-4 py-2 text-small text-accent transition-colors duration-fast ease-standard hover:bg-accent hover:text-accent-foreground"
          >
            [ <ScrambleText text={t.hero.ctaPrimary} /> ]
          </a>
          <a
            href="#contact"
            className="rounded-md border border-border-strong px-4 py-2 text-small text-foreground-muted transition-colors duration-fast ease-standard hover:border-foreground hover:text-foreground"
          >
            [ <ScrambleText text={t.hero.ctaSecondary} /> ]
          </a>
        </motion.div>
      </div>
    </section>
  );
}
