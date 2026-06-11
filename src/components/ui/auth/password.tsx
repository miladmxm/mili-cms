"use client";

import type { ComponentProps } from "react";

import { useState } from "react";

import CloseEye from "@/assets/icons/closeEye.svg";
import OpenEye from "@/assets/icons/openEye.svg";
import { cn } from "@/lib/utils";

const PasswordField = ({ className, ...props }: ComponentProps<"input">) => {
  const [isShowPassword, setisShowPassword] = useState(false);
  return (
    <div
      className={cn(
        "relative rounded-full text-end placeholder:text-start border border-primary-500 outline-none",
        className,
      )}
    >
      <input
        autoComplete="password"
        {...props}
        type={isShowPassword ? "text" : "password"}
        placeholder="رمز عبور"
        className="p-4 size-full outline-none"
      />
      <button
        type="button"
        onClick={() => setisShowPassword((prev) => !prev)}
        className="absolute inset-e-4 *:size-6 inset-y-0 z-10"
      >
        {isShowPassword ? <CloseEye /> : <OpenEye />}
      </button>
    </div>
  );
};

export default PasswordField;
