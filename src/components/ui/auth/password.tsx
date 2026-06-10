"use client";

import type { ComponentProps } from "react";

import { useState } from "react";

import CloseEye from "@/assets/icons/close.svg";
import OpenEye from "@/assets/icons/open.svg";
import { cn } from "@/lib/utils";

const Password = ({ className, ...props }: ComponentProps<"input">) => {
  const [isShowPassword, setisShowPassword] = useState(false);
  return (
    <div
      className={cn(
        "relative rounded-full text-end placeholder:text-start border border-primary-500 outline-none",
        className,
      )}
    >
      <input {...props} placeholder="رمز عبور" className="p-4 size-full" />
      <button
        type="button"
        onClick={() => setisShowPassword((prev) => !prev)}
        className="absolute inset-e-2 *:size-4 inset-y-0 z-10"
      >
        {isShowPassword ? <CloseEye /> : <OpenEye />}
      </button>
    </div>
  );
};

export default Password;
