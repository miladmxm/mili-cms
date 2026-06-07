"use client";

import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

const Radio = ({
  className,
  id,
  children,
  ...props
}: ComponentProps<"input"> & { id: string; children?: ReactNode }) => {
  return (
    <div className={cn("group", className)}>
      <input className="sr-only" type="radio" {...props} id={id} />
      <label
        className="size-4 rounded-full bg-white border cursor-pointer border-primary-500 center p-0.5 group-has-[input:checked]:border-secondary-500/50 transition-colors"
        htmlFor={id}
      >
        {" "}
        <span className="block aspect-square rounded-full transition-all bg-secondary-500 w-0 group-has-[input:checked]:w-full" />
      </label>
      {children}
    </div>
  );
};

export default Radio;
