"use client";

import type { ChangeEvent, ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

const Checkbox = ({
  className,
  id,
  onChecked,
  children,
  onChange,
  ...props
}: ComponentProps<"input"> & {
  id: string;
  children?: ReactNode;
  onChecked?: (bool: boolean) => void;
}) => {
  const handleChenge = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChecked) {
      onChecked(e.target.checked);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={cn("group", className)}>
      <input
        className="sr-only"
        type="checkbox"
        {...props}
        onChange={handleChenge}
        id={id}
      />
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

export default Checkbox;
