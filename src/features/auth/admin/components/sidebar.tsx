import type { FC, PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/dashboard/ui/sidebar";
import { getSession } from "@/lib/auth";

const SidebarWrapper: FC<PropsWithChildren> = async ({ children }) => {
  const userSession = await getSession();
  if (!userSession) redirect("/admin/login");
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={userSession.user} variant="inset" collapsible="icon" />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarWrapper;
