"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Fires once, when the element first crosses into view.
 *
 * One-shot on purpose: re-animating on the way back up makes a long page feel
 * twitchy, and the reveal is there to pace a first read, not to be a feature.
 *
 * Nothing here needs a "what if this fails" branch, because the hidden state
 * is not the default: globals.css only hides a reveal inside
 * `@media (scripting: enabled)`. With JS off the page renders fully visible,
 * and this hook is never the thing standing between a reader and the copy.
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger, in ms. Read by the CSS as `--reveal-delay`. */
  delay?: number;
  as?: ElementType;
};

/** Slides its children up and fades them in. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-revealed={inView}
      className={className ? `fade-up ${className}` : "fade-up"}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

type RevealTextProps = {
  /** One entry per rendered line. Line breaks are a layout decision here, not
      a consequence of wrapping, so the mask has something to clip against. */
  lines: readonly string[];
  className?: string;
  as?: ElementType;
  /** Per-line stagger, in ms. */
  stagger?: number;
  delay?: number;
};

/**
 * Sets each line in its own clipped box and slides it up from below, so the
 * headline assembles line by line the way type is set rather than fading in
 * as a block.
 */
export function RevealText({
  lines,
  className,
  as: Tag = "p",
  stagger = 90,
  delay = 0,
}: RevealTextProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag ref={ref} data-revealed={inView} className={className}>
      {lines.map((line, i) => (
        <span className="reveal-line" key={line + i}>
          <span
            className="reveal-inner"
            style={
              { "--reveal-delay": `${delay + i * stagger}ms` } as React.CSSProperties
            }
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
