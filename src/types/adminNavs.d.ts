import type { ClassValue } from "clsx";
import type { Route } from "next";

type Icon = FC<{ className?: ClassValue }>;
export interface AdminNavItemWithSubMenu {
  title: string;
  icon: Icon;
  base: Route;
  items: { title: string; url: Route }[];
  url?: undefined;
}
export interface AdminNavItem {
  title: string;
  url: Route;
  icon: Icon;
  items?: undefined;
}
export type AdminNavMain = AdminNavItem | AdminNavItemWithSubMenu;
