import type { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/dashboard/ui/button";
import { Checkbox } from "@/components/dashboard/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dashboard/ui/dropdown-menu";

import type { Article } from "./type";

import ChangeStatusDropdown from "../changeStatusDropdown";
import { ArticleDictionary } from "./type";

export const columns: ColumnDef<Article>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ArticleDictionary["title"],
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ArticleDictionary["status"],
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="capitalize">
          <ChangeStatusDropdown active={row.getValue("status")} id={id} />
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { id, slug } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="rtl:dir-rtl">
            <DropdownMenuLabel>عملیات</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/" target="_blank">
                مشاهده
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/admin/blog">ویرایش</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>حذف</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
