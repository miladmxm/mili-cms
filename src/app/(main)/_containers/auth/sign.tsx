/* eslint-disable @eslint-react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import type { SlotProps } from "input-otp";
import type { ReactNode } from "react";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { OTPInput } from "input-otp";
import { useRouter } from "next/navigation";
import { Activity } from "react";
import { Controller, useForm } from "react-hook-form";
import * as v from "valibot";

import Close from "@/assets/icons/close.svg";
import Button from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import type { AuthSteps } from "../../_store/auth";

import {
  closeAuthDialog,
  resetAuth,
  setAuthStep,
  useAuthStore,
} from "../../_store/auth";

const formClasses = "flex flex-col gap-4 p-6";

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative w-10 h-6 border-b border-b-primary-200 text-xl center",
        "transition-all",
        { "border-b-primary-400": props.isActive },
      )}
    >
      {props.char ?? props.placeholderChar}
    </div>
  );
}

const Verify = () => {
  const phoneNumber = useAuthStore((state) => state.phoneNumber);
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: valibotResolver(
      v.object({
        code: v.pipe(v.string(), v.nonEmpty(), v.minLength(6), v.maxLength(6)),
      }),
    ),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async ({ code }: { code: string }) => {
    console.log(code);
    const { data, error } = await authClient.phoneNumber.verify({
      phoneNumber,
      code: String(code),
    });
    resetAuth();
    router.refresh();
    console.log(data, error);
  };

  return (
    <form className={formClasses} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="code"
        render={({ field }) => (
          <OTPInput
            {...field}
            maxLength={6}
            containerClassName="group dir-ltr center has-[:disabled]:opacity-30 rounded-full border border-primary-500 p-4 outline-none"
            render={({ slots }) => (
              <div className="flex gap-0.5">
                {slots.map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
            )}
          />
        )}
      />
      <button
        type="button"
        className="me-auto"
        onClick={() => setAuthStep("phoneNumber")}
      >
        <small className="text-xs font-light">تغییر شماره</small>
      </button>
      <Button variant="secondary" onClick={() => setAuthStep("verify")}>
        {" "}
        ورود یا ثبت نام
      </Button>
    </form>
  );
};

const SignSteps: Record<AuthSteps, ReactNode> = {
  phoneNumber: <PhoneNumber />,
  password: <Password />,
  verify: <Verify />,
};

const Sign = () => {
  const isOpen = useAuthStore((state) => state.isOpenAuthDialog);
  const step = useAuthStore((state) => state.step);

  // const singIn = async () => {
  //   const {} = await authClient.signIn.phoneNumber({
  //     phoneNumber
  //   })
  //   const { data, error } = await authClient.phoneNumber.sendOtp({
  //     phoneNumber: "09109662449",
  //   });
  //   console.log(data, error);
  // };

  return (
    <Activity mode={isOpen ? "visible" : "hidden"} name="auth-dialog">
      <div className="fixed z-50 inset-0 center">
        <div
          className="inset-0 cursor-pointer backdrop-blur-xs absolute -z-10"
          onClick={closeAuthDialog}
        />
        <div className="bg-white shadow-sm-gray w-[95%] max-w-lg rounded-6xl overflow-hidden">
          <header className="bg-primary-50 p-6 flex items-center justify-between">
            <h5 className="font-bold md:text-lg"> ورود/ثبت‌نام</h5>
            <button
              type="button"
              className="size-3 *:size-full"
              onClick={closeAuthDialog}
            >
              <Close />
            </button>
          </header>
          {SignSteps[step]}
        </div>
      </div>
    </Activity>
  );
};

export default Sign;
