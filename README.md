# PAYPORT

Buy anything, pay onchain. A marketing site for a non-custodial purchasing
service: paste a product link, sign one transaction, and the item ships.

The name is payment plus port — the point of entry goods arrive through. It
lives in `src/lib/site-config.ts` and nowhere else; renaming is three strings
in one file.

The domain and the trademark have **not** been checked. Do that before this
name goes anywhere it costs money to undo.

The directory is still `outpost/` from an earlier working name. Renaming it is
safe once no dev server is running, but it will move this session's working
directory out from under it, so do it between sessions.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · Lenis ·
TypeScript. No backend, no wallet library yet — this is the front door, not the
product.

```bash
npm install
npm run dev
```

## Read this before shipping

**Every figure and legal claim on the page is placeholder copy.** The stats in
`site-config.ts` (48+ countries, 2,000+ orders, $2.50 flat fee, <60s checkout),
the whole FAQ, and the chart series in `HowItWorks.tsx` are invented to give
the layout something true-shaped to hold. Three of them are claims a buyer
could be materially hurt by being wrong about:

- the KYC threshold and where it applies,
- the custody model ("we never hold your funds"),
- the refund path when an order cannot be fulfilled.

They are grouped deliberately — the numbers in one config object, the legal
answers in one array — so a compliance pass is a single read rather than a hunt
through nine components. Do that pass before this goes near a real domain.

## Where the design comes from

The art direction is a rebuild of an editorial agency template — full-bleed
alternating blocks, one typeface at an extreme size range, rationed colour.
None of the original's assets are used: the hero coin, the feature-card
ornaments and the phone mockups are all drawn here as SVG or CSS, which is why
the page ships no images at all.

## The three ideas holding it together

**Type does the shouting.** One family (Inter) across one weight range, but an
enormous size range — 13px legal copy under a 120px headline and a 192px
marquee. The headline is weight 400, not 700: at that size a bold face becomes
a wall, and the thin one reads as confidence rather than volume.

**Sections alternate black and paper.** Dark blocks sit inside a 12px gutter
with a 30px radius, so they read as objects laid on the page rather than bands
running through it. That inset is the most recognisable move in the layout —
remove it and this becomes an ordinary landing page.

**Colour is rationed.** Black, paper and five greys carry everything. Three
muted card colours hold the feature set, and exactly one saturated accent
(electric violet, `--accent`) is allowed — reserved for the marquee band and
for anything that means "money moved". Lime is a second signal, used only on
live-status dots so it never competes.

## Layout of the source

| Path | What it is |
| --- | --- |
| `src/lib/site-config.ts` | The entire brand. Name, chain, tokens, links, every printed figure. |
| `src/app/globals.css` | Design tokens, type scale, buttons, marquee and reveal mechanics. |
| `src/app/sections.css` | Per-section layout. Split out so the token layer stays readable. |
| `src/components/Reveal.tsx` | `useInView`, plus the line-mask and fade-up wrappers. |
| `src/components/SmoothScroll.tsx` | Lenis, and the anchor handling it needs. |
| `src/components/HeroVisual.tsx` | The coin field, drawn. Deterministic — no random scatter to desync on hydrate. |
| `src/app/dashboard/` | The signed-in room. Its own token set (`--dash-*`), lime accent, `noindex`. |

## Routes

`/` and `/dashboard`, plus a `not-found` styled like the rest of the site.
Anything else in `site-config.ts` that is not a route this app serves defaults
to an empty string, and every component treats empty as "don't render the
link" — a half-configured deploy ships a missing button, never a 404.

## The dashboard is deliberately empty

Every figure on it is a real zero and both lists are empty states, because
there is no order backend. Inventing a "recent order" to make the layout look
inhabited would be the one lie on this site a visitor could act on.

Two things on it are real. **Connect wallet** genuinely connects (see below),
and the URL field reads the retailer off the hostname. **Start order** is still
disabled and says why — there is nothing behind it yet, and a control that
looks live and quietly does nothing costs more trust than one that admits it
is off.

## The wallet

wagmi v3 + viem, injected connectors only, mounted in `app/dashboard/layout.tsx`
so the landing page ships none of it.

The card has five states and each one exists for a reason: no wallet, ready,
connecting, wrong network, connected. Two of them are the ones that usually get
skipped:

**No wallet.** wagmi registers the injected connector whether or not anything
is there to inject, so `connectors.length` proves nothing — trusting it leaves
an enabled button that does nothing on click, and the visitor concludes the
site is broken rather than that they need a wallet. `useWalletAvailable` looks
for a real provider instead: `window.ethereum`, plus the EIP-6963 announcement
current wallets use. It starts optimistic so the server and first client render
agree, then corrects itself.

**Wrong network.** Connected on the wrong chain is not a state anything can be
paid from, so the dot stays grey, the balance query is disabled, and the card
offers the switch. Reading a balance off the wrong network returns a confident
zero, which is worse than reading nothing.

A refused connection prints the wallet's own message. Wallets reject silently
from the page's point of view, and an unexplained no-op reads as a bug.

## Motion

Lenis drives the scroll, and the marquees, reveals and hero float are tuned
against its damping. All of it is gated on `prefers-reduced-motion`: with the
preference set, Lenis never mounts, the marquees hold still, the hero types
nothing and every masked line renders already in place.

Nothing is invisible without JavaScript. The reveals' hidden state sits inside
`@media (scripting: enabled)`, so copy is only ever hidden where a script is
guaranteed to run and take the mask off — the failure direction is "no
animation", never "no page". A browser that doesn't know the `scripting`
feature never matches, which fails the same safe way.

## Verification

`npx next build` passes clean, TypeScript included. The rendered page was
checked in-browser for horizontal overflow (none), empty sections (none), and
against the reference values for the card palette, band type size and section
backgrounds.

## Still to do

- Test the wallet against a real extension. Every state has been exercised
  against a stubbed EIP-1193 provider, which is not the same thing — in
  particular, switching to a chain MetaMask has never seen returns error 4902
  and triggers an "add this network" prompt that no stub reproduces.
- Give **Start order** a backend — pricing, then an onchain memo per order.
- Add WalletConnect if mobile wallets matter. `wagmiConfig.ts` is the one file
  that grows a second connector.
- Replace the chart series in `HowItWorks.tsx` with a real one.
- Set `NEXT_PUBLIC_SITE_URL` so metadata and OG tags point at the real domain.
- Set `NEXT_PUBLIC_X_URL` and `NEXT_PUBLIC_DOCS_URL` — both links stay hidden
  until they exist, so a half-configured deploy never ships a dead link.
- Add `opengraph-image`, `icon`, `robots.ts` and `sitemap.ts`.
