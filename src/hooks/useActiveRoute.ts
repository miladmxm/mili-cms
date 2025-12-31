import type { Route } from "next";

import { usePathname } from "next/navigation";

export const useActiveRoute = (url: Route, haveChild: boolean = false) => {
  const pathname = usePathname();
  if (!haveChild) {
    return pathname === url;
  }
  return pathname.startsWith(url);
};
