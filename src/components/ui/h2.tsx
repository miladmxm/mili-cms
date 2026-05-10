import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const H3 = ({ className, children, ...props }: ComponentProps<"h2">) => {
  return (
    <h3
      className={cn(
        "text-lg md:text-3xl font-bold text-primary-900 text-center",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export default H3;
