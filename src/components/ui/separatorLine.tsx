import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "bg-gradient-to-l from-transparent via-thready-800/30 to-transparent",
  {
    variants: {
      variant: {
        horizontal: "h-full w-[1px] bg-gradient-to-b",
        vertical: "h-[1px] w-full",
      },
    },
    defaultVariants: {
      variant: "vertical",
    },
  },
);

const SeparatorLine = ({
  children,
  className,
  variant,
}: ComponentProps<"div"> & VariantProps<typeof buttonVariants>) => {
  return (
    <div className={cn(buttonVariants({ className, variant }))}>{children}</div>
  );
};

export default SeparatorLine;
