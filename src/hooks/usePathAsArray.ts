"use client";

import { usePathname } from "next/navigation";

export const usePathAsArray = (): string[] => {
  const pathname = usePathname();
  return pathname.split("/").filter((item) => item.trim());
};
