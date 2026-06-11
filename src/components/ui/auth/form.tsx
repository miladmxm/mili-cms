import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const AuthFormWrapper = ({ className, ...props }: ComponentProps<"form">) => {
  return (
    <form className={cn("flex flex-col gap-4 p-6", className)} {...props} />
  );
};

export default AuthFormWrapper;
