"use client";

import { createLoginAttempt } from "@/lib/api/handlers/log";
import { useQuery, skipToken } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { LoginFormValues, OfferLoginCard } from "./LoginCard";
import { useState } from "react";
import { OfferVerificationCard } from "./VerificationCard";

type LoginStep = "credentials" | "code";

export function OfferLoginForm() {
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
    queryKey: ["login"],
    queryFn: !fingerprint?.visitorId ? skipToken : () => createLoginAttempt({ userId: fingerprint.visitorId }),
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
    />
  );
}
