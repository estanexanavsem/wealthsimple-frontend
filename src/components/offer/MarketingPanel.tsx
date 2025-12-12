import Image from "next/image";

import { OfferLogo } from "@/components/offer/OfferLogo";

export function OfferMarketingPanel() {
  return (
    <section className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-10 pb-16 pt-10">
        <OfferLogo priority />

        <div className="box-content my-8 flex flex-col items-center justify-center text-center">
          <p className="text-xl font-semibold tracking-[1.6px] text-muted-foreground">ENDS DECEMBER 23</p>

          <h1 className="mt-6 text-[56px] font-display font-semibold leading-[1.02] tracking-tight">
            Choose an iPhone,
            <br />
            Mac, or both
          </h1>

          <p className="mt-5 max-w-md text-[24px] leading-[1.2] text-foreground/80">
            However you manage your money, you can do it with Wealthsimple. Just register, then transfer or deposit at
            least $100,000 within 30 days.{" "}
            <a className="offer-link" href="https://promotions.wealthsimple.com/hc/en-ca/articles/41973622872603">
              Terms and Conditions
            </a>{" "}
            apply.
          </p>
        </div>

        <div className="flex justify-center py-16">
          <div className="relative w-[520px] max-w-full overflow-hidden rounded-[28px]">
            <Image src="/apple.webp" alt="Apple devices" width={1040} height={800} className="h-auto w-full" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
