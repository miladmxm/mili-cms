import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cva } from "class-variance-authority";
import Link from "next/link";

import Arrow from "@/assets/icons/comingArrowRight.svg";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rounded-full py-2 center transition-all duration-300",
  {
    variants: {
      variant: {
        light:
          "text-gray-500 bg-white group-hover:bg-gray-500 group-hover:text-white",
        dark: "bg-gray-500 text-white group-hover:bg-white group-hover:text-gray-500",
      },
    },
    defaultVariants: {
      variant: "dark",
    },
  },
);

type LinkORButton =
  | (ComponentProps<"button"> & {
      href?: undefined;
    })
  | ComponentProps<typeof Link>;

const ButtonWithArrow = ({
  className,
  variant,
  children,
  ...props
}: LinkORButton & VariantProps<typeof buttonVariants>) => {
  return (
    <>
      {props.href ? (
        <Link className="flex gap-0 group items-stretch w-full" {...props}>
          <span
            className={cn(buttonVariants({ variant, className }), "flex-auto")}
          >
            {children}
          </span>
          <span
            className={cn(
              buttonVariants({ variant, className }),
              "h-full aspect-square rotate-180 p-2",
            )}
          >
            <Arrow />
          </span>
        </Link>
      ) : (
        <button
          className="flex gap-0 group items-stretch w-full"
          type={props.type}
          {...props}
        >
          <span
            className={cn(buttonVariants({ variant, className }), "flex-auto")}
          >
            {children}
          </span>
          <span
            className={cn(
              buttonVariants({ variant, className }),
              "h-full aspect-square rotate-180 p-2",
            )}
          >
            <Arrow />
          </span>
        </button>
      )}
    </>
  );
};

export default ButtonWithArrow;
