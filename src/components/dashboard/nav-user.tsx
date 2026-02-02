"use client";

import {
  IconCreditCard,
  IconDotsVertical,
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
import SignoutButton from "@/features/auth/admin/components/signoutButton";
import { useDirection } from "@/hooks/useDirection";
import { useSession } from "@/hooks/useSession";

import { Skeleton } from "./ui/skeleton";

const NavUserSkeleton = () => {
  return (
    <div className="flex justify-between gap-3 p-2 items-center">
      <Skeleton className="size-8 rounded-lg" />
      <div className="flex flex-col flex-auto items-end gap-1.5 py-1">
        <Skeleton className="w-1/2 h-2" />
        <Skeleton className="w-1/3 h-1.5" />
      </div>
      <Skeleton className="size-4 my-auto" />
    </div>
  );
};
export function NavUser() {
  const { isMobile } = useSidebar();
  const { data, isPending } = useSession();
  const dir = useDirection();
  if (isPending || !data?.user) {
    return <NavUserSkeleton />;
  }
  const { name, email, image } = data.user;
  const userImageCallBack = name.slice(0, 2);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu dir={dir}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg grayscale">
                <AvatarImage
                  alt={name || "user image"}
                  src={image || undefined}
                />
                <AvatarFallback className="rounded-lg uppercase">
                  {userImageCallBack}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {email}
                </span>
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
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage alt={name} src={image || undefined} />
                  <AvatarFallback className="rounded-lg uppercase">
                    {userImageCallBack}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {email}
                  </span>
                </div>
              </div>
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
            <DropdownMenuItem dir={dir} asChild>
              <SignoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
