"use client";

import type { FormEvent } from "react";
import { useId, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/offer/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/offer/ui/card";
import { Input } from "@/components/offer/ui/input";
import { Label } from "@/components/offer/ui/label";

export function OfferLoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const emailId = useId();
  const passwordId = useId();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div className="space-y-4">
            <div>
              <Label className="sr-only" htmlFor={emailId}>
                Email
              </Label>
              <Input id={emailId} autoComplete="username" inputMode="email" placeholder="Email" />
            </div>

            <div className="relative">
              <Label className="sr-only" htmlFor={passwordId}>
                Password
              </Label>
              <Input
                id={passwordId}
                autoComplete="current-password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="pr-14"
              />

              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <a className="offer-link inline-block text-lg font-semibold text-foreground" href="#">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full">
            Log in
          </Button>

          <p className="text-center text-lg text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a className="offer-link font-semibold text-foreground" href="#">
              Sign up
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
