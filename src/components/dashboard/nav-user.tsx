"use client";

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/dashboard/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dashboard/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/dashboard/ui/sidebar";
import { useDirection } from "@/hooks/useDirection";
import { useSession } from "@/hooks/useSession";

import { Skeleton } from "./ui/skeleton";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data, isPending } = useSession();
  const dir = useDirection();
  const hasUser = !!data?.user && !isPending;
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {!hasUser ? (
                <Skeleton className="size-8 rounded-lg" />
              ) : (
                <Avatar className="size-8 rounded-lg grayscale">
                  <AvatarImage
                    alt={data.user.name ?? "user image"}
                    src={data.user.image ?? undefined}
                  />
                  <AvatarFallback className="rounded-lg uppercase">
                    {data.user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                {!hasUser ? (
                  <>
                    <Skeleton className="h-3 w-4/5 ms-auto mb-2" />
                    <Skeleton className="w-2/3 h-2 ms-auto" />
                  </>
                ) : (
                  <>
                    <span className="truncate font-medium">
                      {data.user.name}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {data.user.email}
                    </span>
                  </>
                )}
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel dir={dir} className="p-0 font-normal">
              {hasUser && (
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage alt={data.user.name} src="user image" />
                    <AvatarFallback className="rounded-lg uppercase">
                      {data.user.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-start text-sm leading-tight">
                    <span className="truncate font-medium">
                      {data.user.name}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {data.user.email}
                    </span>
                  </div>
                </div>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup dir={dir}>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem dir={dir}>
              <IconLogout />
              خروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
