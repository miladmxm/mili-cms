import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, JSX } from "react";

import { cva } from "class-variance-authority";
import Link from "next/link";

import Arrow from "@/assets/icons/comingArrowRight.svg";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rounded-full min-h-12 py-2 center transition-all duration-300",
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

const Icon = ({
  defaultIcon,
  className,
}: {
  defaultIcon?: JSX.Element;
  className?: string;
}) => {
  const icon = defaultIcon ? defaultIcon : <Arrow />;
  return (
    <span className={cn(className, "h-full aspect-square rotate-180 p-2")}>
      {icon}
    </span>
  );
};

type LinkORButton =
  | (ComponentProps<"button"> & {
      href?: undefined;
    })
  | ComponentProps<typeof Link>;

const ButtonWithArrow = ({
  className,
  variant,
  children,
  containerClassName,
  icon,
  ...props
}: LinkORButton &
  VariantProps<typeof buttonVariants> & {
    containerClassName?: string;
    icon?: JSX.Element;
  }) => {
  return (
    <>
      {props.href ? (
        <Link
          className={cn(
            "flex gap-0 group items-stretch w-full disabled:opacity-80 disabled:pointer-events-none",
            containerClassName,
          )}
          {...props}
        >
          <span
            className={cn(buttonVariants({ variant, className }), "flex-auto")}
          >
            {children}
          </span>
        </Link>
      ) : (
        <button
          className={cn(
            "flex gap-0 group items-stretch w-full disabled:opacity-80 disabled:pointer-events-none",
            containerClassName,
          )}
          type={props.type}
          {...props}
        >
          <span
            className={cn(buttonVariants({ variant, className }), "flex-auto")}
          >
            {children}
          </span>
          <Icon
            defaultIcon={icon}
            className={buttonVariants({ variant, className })}
          />
        </button>
      )}
    </>
  );
};

export default ButtonWithArrow;
