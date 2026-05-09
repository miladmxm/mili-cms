import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cva } from "class-variance-authority";
import Link from "next/link";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rounded-full block text-center transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-500 hover:text-white hover:bg-gray-500",
        secondary: "bg-gray-500 text-white hover:text-gray-500 hover:bg-white",
        outline:
          "bg-transparent ring-3 ring-gray-500 hover:bg-gray-500 text-gray-500 hover:text-white",
      },
      size: {
        default: "p-3 w-full font-bold text-xl",
      },
      shadow: {
        default: "",
        sm: "shadow",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type LinkORButton =
  | (ComponentProps<"button"> & {
      href?: undefined;
    })
  | ComponentProps<typeof Link>;

const Button = ({
  className,
  variant,
  size,
  shadow,
  ...props
}: LinkORButton & VariantProps<typeof buttonVariants>) => {
  return (
    <>
      {props.href ? (
        <Link
          className={cn(buttonVariants({ variant, size, shadow, className }))}
          {...props}
        />
      ) : (
        <button
          className={cn(buttonVariants({ variant, size, shadow, className }))}
          type={props.type}
          {...props}
        />
      )}
    </>
  );
};

export default Button;
