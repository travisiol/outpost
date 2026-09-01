import type { CSSProperties, ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full pass. Longer reads calmer; the display band wants 26–40s. */
  duration?: number;
  direction?: "left" | "right";
  gap?: string;
  className?: string;
};

/**
 * Two identical tracks side by side, each translating a full width. When the
 * first has walked off, the second is exactly where it started, so the loop
 * has no seam and needs no measurement or JS.
 *
 * The duplicate is `aria-hidden` — a screen reader should hear the line once.
 */
export function Marquee({
  children,
  duration = 40,
  direction = "left",
  gap = "3.5rem",
  className,
}: MarqueeProps) {
  const style = {
    "--marquee-duration": `${duration}s`,
    "--marquee-gap": gap,
  } as CSSProperties;

  return (
    <div
      className={className ? `marquee ${className}` : "marquee"}
      data-direction={direction}
      style={style}
    >
      <div className="marquee-track">{children}</div>
      <div className="marquee-track" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
