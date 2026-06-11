import type { ComponentProps, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export const SmallText = ({ children }: PropsWithChildren) => {
  return <small className="text-xs font-light">{children}</small>;
};

const SmallTextButton = ({
  children,
  className,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      type="button"
      className={cn("w-fit text-start me-auto", className)}
      {...props}
    >
      <SmallText>{children}</SmallText>
    </button>
  );
};

export default SmallTextButton;
