import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionCurveVariants = cva(
  "w-full h-32 md:h-60 bg-gradient-to-b to-thready-200 from-primary-25 absolute inset-x-0 z-20 clip-path-url-[#SectionCurveOutside]",
  {
    variants: {
      position: {
        top: "bottom-full translate-y-1/3",
        bottom: "top-full -translate-y-1/3 rotate-180",
      },
    },
    defaultVariants: {
      position: "top",
    },
  },
);

const SectionCurveOutside = ({
  position,
  className,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof sectionCurveVariants>) => {
  return (
    <>
      <div
        className={cn(sectionCurveVariants({ className, position }))}
        {...props}
      />
      <svg
        className="sr-only"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1 1"
      >
        <defs>
          <clipPath id="SectionCurveOutside" clipPathUnits="objectBoundingBox">
            <path d=" M0 1C0 1 0.1889 0.814 0.5 0.814C0.8111 0.814 1 1 1 1V0H0.5094H0V1Z" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default SectionCurveOutside;
