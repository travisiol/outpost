"use client";

import { useEffect, useState } from "react";

/**
 * Three claims sharing one slot, cross-fading on a timer.
 *
 * All three lines occupy the same grid cell, so the slot is as tall as the
 * longest one and never reflows when the copy swaps — a column that resizes
 * itself every five seconds is worse than three static sentences. All three
 * stay in the accessibility tree; a reader hears the full set once instead of
 * whichever one happened to be up.
 */
export function RotatingLines({ lines }: { lines: readonly string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => setActive((current) => (current + 1) % lines.length),
      5200,
    );

    return () => window.clearInterval(id);
  }, [lines.length]);

  return (
    <div className="rotator">
      {lines.map((line, i) => (
        <p key={line} className="rotator-line" data-active={i === active}>
          {line}
        </p>
      ))}
    </div>
  );
}
