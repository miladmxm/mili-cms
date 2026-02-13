import type { ComponentProps, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

const MediaCardWrapper = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"div">>) => {
  return (
    <div
      {...props}
      className={cn(
        "gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MediaCardWrapper;
