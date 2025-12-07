"use client";

import * as React from "react";

import { NavDocuments } from "@/components/dashboard/nav-documents";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/dashboard/ui/sidebar";
import { AdminNavLinks } from "@/constant/adminNavLinks";
import { useDirection } from "@/hooks/useDirection";

import SidebarHeader from "./app-sidebar-header";

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;
export function AppSidebar({ ...props }: AppSidebarProps) {
  const dir = useDirection();
  return (
    <Sidebar
      side={dir === "rtl" ? "right" : "left"}
      collapsible="offcanvas"
      {...props}
    >
      <SidebarHeader />

      <SidebarContent>
        <NavMain items={AdminNavLinks.navMain} />
        <NavDocuments items={AdminNavLinks.documents} />
        <NavSecondary className="mt-auto" items={AdminNavLinks.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={AdminNavLinks.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
