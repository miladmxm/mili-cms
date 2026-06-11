"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import AuthFormWrapper from "@/components/ui/auth/form";
import OTPfield from "@/components/ui/auth/OTP";
import Button from "@/components/ui/button";
import { authClient, getErrorMessage } from "@/lib/auth-client";

import { resetAuth, useAuthStore } from "../store/auth";
import { VerifyOTPschema } from "../validation/auth.schema";

const VerifySignIn = () => {
  const phoneNumber = useAuthStore((state) => state.phoneNumber);
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: valibotResolver(VerifyOTPschema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async ({ code }: { code: string }) => {
    const { error } = await authClient.phoneNumber.verify({
      phoneNumber,
      code,
    });

    if (error) {
      toast.error(getErrorMessage(error));
      return;
    }

    resetAuth();
    router.refresh();
  };

  return (
    <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="code"
        render={({ field }) => <OTPfield {...field} />}
      />

      <Button variant="secondary" type="submit">
        {" "}
        ورود یا ثبت نام
      </Button>
    </AuthFormWrapper>
  );
};

export default VerifySignIn;
