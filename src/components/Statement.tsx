import { Marquee } from "./Marquee";
import { RevealText } from "./Reveal";
import { siteConfig } from "@/lib/site-config";

/**
 * The violet band that sits between the light sections.
 *
 * It is the only place on the page where the accent runs full-bleed at
 * 192px, and it earns that by carrying no information — it is a breath
 * between two dense sections, and a page this long needs one.
 */
export function Band() {
  return (
    <section className="band" aria-hidden="true">
      <Marquee duration={38} gap="4rem">
        <p className="marquee-display">Non-custodial · onchain · delivered</p>
      </Marquee>
    </section>
  );
}

/** The closing statement, set dark. */
export function Statement() {
  return (
    <section className="inset-block">
      <div className="statement">
        <Marquee className="statement-marquee" duration={30} gap="3rem">
          {["No spread", "No custody", "No waiting"].map((word) => (
            <span key={word} className="statement-marquee-item">
              {word}
              <i aria-hidden="true">/</i>
            </span>
          ))}
        </Marquee>

        <div className="container">
          <RevealText
            as="h2"
            className="headline statement-title"
            lines={[
              "Numbers don't lie,",
              `so we settle on ${siteConfig.chain}`,
              "and let the block",
              "be the receipt",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
