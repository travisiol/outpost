import type { ReactNode } from "react";
import { Providers } from "@/components/providers";

/**
 * wagmi lives here rather than in the root layout, so the landing page ships
 * none of it. The marketing page has no wallet on it and no reason to pay for
 * one in its bundle.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>;
}
