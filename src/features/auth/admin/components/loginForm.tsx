"use client";
import Link from "next/link";
import { Activity } from "react";
import { Controller } from "react-hook-form";

import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/dashboard/ui/field";
import { Input, PasswordInput } from "@/components/dashboard/ui/input";
import { Spinner } from "@/components/dashboard/ui/spinner";
import { cn } from "@/lib/utils";

import { useLoginForm } from "../hooks/useLoginForm";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { submit, control, isPending } = useLoginForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>ورود به پنل مدیریت</CardTitle>
          <CardDescription>ورود با استفاده از ایمیل و رمز عبور</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <FieldGroup>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">ایمیل</FieldLabel>
                    <Input
                      dir="ltr"
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center gap-2">
                      <FieldLabel htmlFor="password">رمز عبور</FieldLabel>
                      <Link
                        className="me-auto font-light inline-block text-sm underline-offset-4 hover:underline"
                        href="/admin/forgot-password"
                      >
                        رمز عبور خود را فراموش کرده اید؟
                      </Link>
                    </div>
                    <PasswordInput
                      dir="ltr"
                      id="password"
                      autoComplete="current-password"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field>
                <Button disabled={isPending} type="submit">
                  <Activity mode={isPending ? "visible" : "hidden"}>
                    <Spinner />
                  </Activity>
                  ورود
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
