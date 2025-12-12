import { getDecision } from "@/lib/cloak";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { match } from "ts-pattern";

const WhitePage = dynamic(() => import("./white").then((mod) => mod.WhitePage));
const OfferPage = dynamic(() => import("./offer").then((mod) => mod.OfferPage));

export default async function Page() {
  const decision = await getDecision();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {match(decision)
        .with("white", () => <WhitePage />)
        .with("offer", () => <OfferPage />)
        .exhaustive()}
    </Suspense>
  );
}
