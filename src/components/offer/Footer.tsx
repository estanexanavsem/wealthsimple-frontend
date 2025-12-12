export function OfferFooter() {
  return (
    <footer className="border-t border-border/70 bg-card px-6 py-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <a
          className="offer-link w-fit text-base font-semibold text-foreground"
          href="https://help.wealthsimple.com/hc/"
        >
          Help Centre
        </a>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <span className="text-base">Download our mobile apps</span>
          <div className="flex items-center gap-6">
            <a
              className="offer-link font-semibold text-foreground text-lg"
              href="https://apps.apple.com/ca/app/wealthsimple-invest-save/id895993526"
            >
              iPhone
            </a>
            <a
              className="offer-link font-semibold text-foreground text-lg"
              href="https://play.google.com/store/apps/details?id=com.wealthsimple"
            >
              Android
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
