import type { Route } from "next";

import { usePathname } from "next/navigation";

export const useActiveRoute = (url: Route) => {
  const pathname = usePathname();
  return pathname === url;
};
export const useActiveChildRoute = (url: Route) => {
  const pathname = usePathname();
  return pathname.startsWith(url);
};
