"use client";

import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";
import { ChevronRight } from "lucide-react";
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
import { useDirection } from "@/hooks/useDirection";
import { cn } from "@/lib/utils";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const SubMenuItem = ({ title, url }: AdminNavItemWithSubMenu["items"][0]) => {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <Link href={url}>
          <span>{title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};

const NavItemWithSubMenu = (item: AdminNavItemWithSubMenu) => {
  const dir = useDirection();
  const { icon, items, title } = item;
  return (
    <Collapsible asChild className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="text-lg" tooltip={title}>
            {icon && <item.icon />}
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
  const { icon, title, url } = item;
  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton asChild tooltip={title}>
        <Link href={url}>
          {icon && <item.icon />}
          <span>{title}</span>
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
              <IconCirclePlusFilled />
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
