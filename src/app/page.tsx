import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Showcase } from "@/components/Showcase";
import { Stores } from "@/components/Stores";
import { Band, Statement } from "@/components/Statement";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

/**
 * The page is a stack of alternating blocks: dark, light, dark, light. The
 * rhythm is the argument — each dark block is a claim, each light block is
 * the evidence for it, and the violet band is the only place the reader is
 * allowed to rest.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <Band />
      <Features />
      <HowItWorks />
      <Showcase />
      <Stores />
      <Statement />
      <Faq />
      <Footer />
    </main>
  );
}
