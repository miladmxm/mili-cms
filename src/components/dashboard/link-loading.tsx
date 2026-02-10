"use client";
import { useLinkStatus } from "next/link";

import { cn } from "@/lib/utils";

import { Spinner } from "./ui/spinner";

const LinkLoading = ({ className }: { className?: string }) => {
  const { pending } = useLinkStatus();
  if (!pending) return;

  return (
    <Spinner className={cn("link-loader-spinner absolute end-1", className)} />
  );
};
export default LinkLoading;
