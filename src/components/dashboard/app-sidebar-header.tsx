"use client";
import { IconInnerShadowTop } from "@tabler/icons-react";

import type { User } from "@/features/auth/admin/types";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const AppSidebarHeader = ({ user }: { user: User }) => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className="data-[slot=sidebar-menu-button]:!p-1.5">
            <IconInnerShadowTop className="size-5!" />
            <span className="text-base font-semibold">{user.name}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default AppSidebarHeader;
