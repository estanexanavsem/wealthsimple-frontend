"use client";

import { TooltipProvider } from "@/components/white/ui/tooltip";
import { Toaster } from "@/components/white/ui/toaster";
import { Toaster as Sonner } from "@/components/white/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";

import { match } from "ts-pattern";

type ProvidersProps = {
  decision: CloakDecision;
  children: ReactNode;
};

export function Providers({ decision, children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            retryDelay: 0,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchInterval: false,
            refetchIntervalInBackground: false,
          },
          mutations: {
            retry: false,
            retryDelay: 0,
          },
        },
      }),
  );

  useEffect(() => {
    match(decision)
      .with("white", () => import("./white.css"))
      .with("offer", () => import("./offer.css"))
      .exhaustive();
  }, [decision]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
