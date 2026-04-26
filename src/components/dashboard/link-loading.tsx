"use client";
import type { PropsWithChildren } from "react";

import { useLinkStatus } from "next/link";

import { cn } from "@/lib/utils";

import { Spinner } from "./ui/spinner";

export const IconLinkLoading = ({
  className,
  children,
}: PropsWithChildren<{
  className?: string;
}>) => {
  const { pending } = useLinkStatus();
  if (!pending) return children;
  return <Spinner className={cn(className)} />;
};

export const NavLinkLoading = ({ className }: { className?: string }) => {
  return (
    <IconLinkLoading
      className={cn("link-loader-spinner absolute end-1", className)}
    ></IconLinkLoading>
  );
};
