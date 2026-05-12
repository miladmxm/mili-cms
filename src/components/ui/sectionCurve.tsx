import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionCurveVariants = cva(
  "-z-10 h-28 md:h-40 w-full absolute rounded-[100%] right-1/2 translate-x-1/2",
  {
    variants: {
      color: {
        default: "bg-primary-25",
      },
      position: {
        top: "top-0 -translate-y-1/2",
        bottom: "bottom-0 translate-y-1/2",
      },
    },
    defaultVariants: {
      color: "default",
      position: "top",
    },
  },
);

const SectionCurve = ({
  color,
  position,
  className,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof sectionCurveVariants>) => {
  return (
    <div
      className={cn(sectionCurveVariants({ color, position, className }))}
      {...props}
    />
  );
};

export default SectionCurve;
