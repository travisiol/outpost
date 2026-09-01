/**
 * The hero backdrop: a coin sitting in a receding field of blank discs.
 *
 * Drawn rather than photographed, for two reasons. A rendered still would put
 * a 2 MB hero image in front of the headline on a cold connection, and the
 * thing being sold is not a coin — it is the moment a balance becomes goods.
 * So the field is anonymous and out of focus, and exactly one disc is in
 * focus, minted, and carries the only colour on a black screen.
 *
 * Everything is deterministic. A random scatter would differ between the
 * server and the client render and hydrate with a mismatch.
 */

/** x-offsets per row, as fractions of the viewBox width. Hand-placed so the
    field looks strewn rather than gridded, and so nothing collides with the
    coin's footprint. */
const ROWS = [
  { y: 470, rx: 34, blur: 7, opacity: 0.5, xs: [0.04, 0.19, 0.33, 0.69, 0.83, 0.96] },
  { y: 545, rx: 46, blur: 9, opacity: 0.58, xs: [0.1, 0.26, 0.75, 0.9] },
  { y: 630, rx: 62, blur: 12, opacity: 0.62, xs: [0.02, 0.17, 0.35, 0.66, 0.86] },
  { y: 730, rx: 84, blur: 17, opacity: 0.66, xs: [0.08, 0.3, 0.72, 0.95] },
  { y: 850, rx: 112, blur: 24, opacity: 0.7, xs: [0.0, 0.24, 0.55, 0.86] },
] as const;

export function HeroVisual() {
  return (
    <svg
      className="hero-visual"
      viewBox="0 0 1440 810"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="hv-ground" cx="50%" cy="42%" r="72%">
          <stop offset="0%" stopColor="#1b1b22" />
          <stop offset="55%" stopColor="#0a0a0d" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>

        <radialGradient id="hv-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5e00ff" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#5e00ff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#5e00ff" stopOpacity="0" />
        </radialGradient>

        {/* Brushed metal: a hard light-to-shadow sweep, not a soft gradient.
            The abrupt mid stop is what makes the rim read as machined. */}
        <linearGradient id="hv-rim" x1="12%" y1="0%" x2="88%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="34%" stopColor="#d8d8de" />
          <stop offset="52%" stopColor="#8f8f99" />
          <stop offset="70%" stopColor="#e6e6ec" />
          <stop offset="100%" stopColor="#9a9aa4" />
        </linearGradient>

        <linearGradient id="hv-face" x1="20%" y1="6%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#fbfbfd" />
          <stop offset="48%" stopColor="#e4e4ea" />
          <stop offset="100%" stopColor="#c2c2cc" />
        </linearGradient>

        <linearGradient id="hv-glyph" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="45%" stopColor="#7c2ffb" />
          <stop offset="100%" stopColor="#4c00d6" />
        </linearGradient>

        <linearGradient id="hv-disc" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a3a44" />
          <stop offset="100%" stopColor="#0e0e12" />
        </linearGradient>

        {ROWS.map((row) => (
          <filter
            id={`hv-blur-${row.y}`}
            key={row.y}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation={row.blur} />
          </filter>
        ))}
      </defs>

      <rect width="1440" height="810" fill="url(#hv-ground)" />

      {/* The out-of-focus field. Near rows are larger and blurrier, which is
          what sells depth on a flat drawing. */}
      {ROWS.map((row) => (
        <g key={row.y} filter={`url(#hv-blur-${row.y})`} opacity={row.opacity}>
          {row.xs.map((fraction) => (
            <g key={fraction}>
              <ellipse
                cx={fraction * 1440}
                cy={row.y}
                rx={row.rx}
                ry={row.rx * 0.3}
                fill="url(#hv-disc)"
              />
              <ellipse
                cx={fraction * 1440}
                cy={row.y - row.rx * 0.09}
                rx={row.rx * 0.82}
                ry={row.rx * 0.23}
                fill="#15151b"
              />
            </g>
          ))}
        </g>
      ))}

      <ellipse cx="720" cy="392" rx="330" ry="300" fill="url(#hv-halo)" />

      {/* The one disc in focus. Tipped a few degrees so it reads as an object
          standing in the field rather than a logo pasted on top. */}
      <g transform="translate(720 392) rotate(-8)" className="hero-coin">
        <ellipse cx="10" cy="196" rx="150" ry="26" fill="#000" opacity="0.55" />

        <circle r="176" fill="url(#hv-rim)" />
        <circle r="176" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
        <circle r="150" fill="url(#hv-face)" />
        <circle
          r="150"
          fill="none"
          stroke="#6b6b76"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />

        {/* The mark: an arrow folded back on itself — value leaving a wallet
            and arriving as a parcel. Abstract enough to survive a rename. */}
        <path
          d="M-6 -84 L74 -84 L18 -14 L66 -14 L-16 84 L14 6 L-38 6 Z"
          fill="url(#hv-glyph)"
        />
        <path
          d="M-6 -84 L74 -84 L18 -14 L40 -14 L-6 -14 Z"
          fill="#ffffff"
          fillOpacity="0.16"
        />
      </g>
    </svg>
  );
}
