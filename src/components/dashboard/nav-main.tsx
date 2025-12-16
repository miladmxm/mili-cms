"use client";

import { IconMail } from "@tabler/icons-react";
import { ChevronRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";

import type {
  AdminNavItem,
  AdminNavItemWithSubMenu,
  AdminNavMain,
} from "@/types/adminNavs";

import { Button } from "@/components/dashboard/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/dashboard/ui/sidebar";
import { useActiveChildRoute, useActiveRoute } from "@/hooks/useActiveRoute";
import { useDirection } from "@/hooks/useDirection";
import { cn } from "@/lib/utils";

import LinkLoading from "./link-loading";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const SubMenuItem = ({ title, url }: AdminNavItemWithSubMenu["items"][0]) => {
  const isActiveRoute = useActiveRoute(url);
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <Link href={url}>
          <span
            className={cn("link-indicator", { "active-link": isActiveRoute })}
          >
            {title}
          </span>
          <LinkLoading />
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};

const NavItemWithSubMenu = (item: AdminNavItemWithSubMenu) => {
  const dir = useDirection();
  const { icon: Icon, items, title, base } = item;
  const isThisChildPathActived = useActiveChildRoute(base);
  return (
    <Collapsible
      asChild
      className="group/collapsible"
      defaultOpen={isThisChildPathActived}
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="text-lg" tooltip={title}>
            {Icon && (
              <Icon
                className={cn({ "text-primary": isThisChildPathActived })}
              />
            )}
            <span>{title}</span>
            <ChevronRight
              className={cn(
                "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90",
                {
                  "rotate-180": dir === "rtl",
                },
              )}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem) => (
              <SubMenuItem key={subItem.url} {...subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const NavItemWithoutSubMenu = (item: AdminNavItem) => {
  const { icon: Icon, title, url } = item;
  const isActiveRoute = useActiveRoute(url);
  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton asChild className="text-lg" tooltip={title}>
        <Link href={url}>
          {Icon && <Icon className={cn({ "text-primary": isActiveRoute })} />}
          <span>{title}</span>
          <LinkLoading />
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function NavMain({ items }: { items: AdminNavMain[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
              tooltip="Quick Create"
            >
              <LayoutDashboard />
              <span>مدیریت و دسترسی</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="gap-3">
          {items.map((item) => {
            if (item.items)
              return <NavItemWithSubMenu key={item.title} {...item} />;
            else
              return (
                <NavItemWithoutSubMenu key={item.title + item.url} {...item} />
              );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
