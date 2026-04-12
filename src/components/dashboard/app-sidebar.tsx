"use client";

import * as React from "react";

import type { User } from "@/features/auth/admin/types";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/dashboard/ui/sidebar";
import { navMain } from "@/constant/adminNavLinks";
import { useDirection } from "@/hooks/useDirection";

import SidebarHeader from "./app-sidebar-header";
import { ScrollArea } from "./ui/scroll-area";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & { user: User };
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const dir = useDirection();
  return (
    <Sidebar
      side={dir === "rtl" ? "right" : "left"}
      collapsible="offcanvas"
      {...props}
    >
      <SidebarHeader user={user} />

      <SidebarContent>
        <ScrollArea dir={dir} className="h-full pe-1">
          <NavMain items={navMain} />
          {/* <NavDocuments items={AdminNavLinks.documents} /> */}
          {/* <NavSecondary
            className="mt-auto"
            items={AdminNavLinks.navSecondary}
          /> */}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
