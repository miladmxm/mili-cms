import type { Route } from "next";

export interface AdminNavItemWithSubMenu {
  title: string;
  icon: FC;
  items: { title: string; url: Route }[];
  url?: undefined;
}
export interface AdminNavItem {
  title: string;
  url: Route;
  icon: FC;
  items?: undefined;
}
export type AdminNavMain = AdminNavItem | AdminNavItemWithSubMenu;
