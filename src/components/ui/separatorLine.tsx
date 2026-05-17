import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, CSSProperties } from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const separatorLineVariants = cva(
  "bg-gradient-to-l from-transparent via-thready-800/30 to-transparent",
  {
    variants: {
      variant: {
        horizontal: "h-full w-[var(--separator-line-size)] bg-gradient-to-b",
        vertical: "h-[var(--separator-line-size)] w-full",
      },
    },
    defaultVariants: {
      variant: "vertical",
    },
  },
);

type Size = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

const SeparatorLine = ({
  children,
  className,
  variant,
  size = "1",
}: ComponentProps<"div"> &
  VariantProps<typeof separatorLineVariants> & { size?: Size }) => {
  return (
    <div
      style={{ "--separator-line-size": `${size}px` } as CSSProperties}
      className={cn(separatorLineVariants({ className, variant }))}
    >
      {children}
    </div>
  );
};

export default SeparatorLine;
