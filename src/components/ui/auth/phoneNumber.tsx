import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const PhoneNumber = ({ className, ...props }: ComponentProps<"input">) => {
  return (
    <input
      placeholder="شماره موبایل"
      className={cn(
        "rounded-full text-end placeholder:text-start border border-primary-500 p-4 outline-none",
        className,
      )}
      {...props}
    />
  );
};

export default PhoneNumber;
