import Image from "next/image";

type OfferLogoProps = {
  className?: string;
  priority?: boolean;
};

export function OfferLogo({ className, priority = false }: OfferLogoProps) {
  return (
    <div className={className}>
      <Image src="/logo.svg" alt="Wealthsimple" width={200} height={29} priority={priority} />
    </div>
  );
}
