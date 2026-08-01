"use client";

import { useEffect, useState } from "react";

export function LocalClock({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
    });

    function update() {
      setTime(formatter.format(new Date()));
    }

    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  // Nothing is rendered until mounted, avoiding a server/client time mismatch.
  if (!time) return null;

  return <span>{time}</span>;
}
