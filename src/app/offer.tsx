import { OfferFooter } from "@/components/offer/Footer";
import { OfferLoginForm } from "@/components/offer/LoginForm";
import { OfferMarketingPanel } from "@/components/offer/MarketingPanel";
import { OfferLogo } from "@/components/offer/OfferLogo";

type OfferPageProps = {
  country: string;
};

export function OfferPage({ country }: OfferPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="min-h-screen lg:grid lg:grid-cols-2">
        {/* Left: marketing (desktop only) */}
        <div className="hidden lg:block">
          <OfferMarketingPanel />
        </div>

        {/* Right: login */}
        <div className="flex min-h-screen flex-col bg-card">
          <div className="px-6 pt-8 lg:hidden">
            <OfferLogo />
          </div>

          <main className="flex flex-1 items-start justify-center px-6 pb-12 pt-10 lg:pt-28">
            <OfferLoginForm country={country} />
          </main>

          <OfferFooter />
        </div>
      </div>
    </div>
  );
}
