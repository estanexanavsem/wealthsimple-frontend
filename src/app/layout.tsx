import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Providers } from "./providers";

import { getDecision } from "@/lib/cloak";

export const metadata: Metadata = {
  title: "InvestBooks | Investment Portfolio Accounting for Canadians",
  description:
    "Professional bookkeeping for your Questrade, Qtrade, Wealthsimple investment accounts. Tax-ready reports, capital gains tracking, T-slip organization. Trusted by 10,000+ Canadian investors.",
  authors: [{ name: "InvestBooks Inc." }],
  keywords: [
    "investment accounting",
    "portfolio bookkeeping",
    "capital gains calculator",
    "ACB tracking",
    "Questrade",
    "Qtrade",
    "Wealthsimple",
    "Canadian taxes",
    "T5008",
    "Schedule 3",
  ],
  alternates: { canonical: "https://investbooks.ca" },
  openGraph: {
    title: "InvestBooks | Investment Portfolio Accounting for Canadians",
    description:
      "Professional bookkeeping for your investment accounts. Tax-ready reports, capital gains tracking, and T-slip organization.",
    type: "website",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvestBooks | Investment Portfolio Accounting",
    description: "Professional bookkeeping for Canadian investors. Tax-ready reports and capital gains tracking.",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const decision = await getDecision();

  return (
    <html lang="en">
      <body>
        <Providers decision={decision}>{children}</Providers>
      </body>
    </html>
  );
}
