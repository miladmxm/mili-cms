"use client";
import { IconInnerShadowTop } from "@tabler/icons-react";
import Link from "next/link";

import { useSession } from "@/hooks/useSession";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

const AppSidebarHeader = () => {
  const { data, isPending } = useSession();
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="data-[slot=sidebar-menu-button]:!p-1.5"
          >
            <Link href="#">
              <IconInnerShadowTop className="size-5!" />
              {isPending ? (
                <Skeleton className="h-3 w-36" />
              ) : (
                <span className="text-base font-semibold">
                  {data?.user.name ?? ""}
                </span>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default AppSidebarHeader;
