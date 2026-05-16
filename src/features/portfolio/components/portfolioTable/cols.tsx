import type { ColumnDef } from "@tanstack/react-table";

import { Eye, MoreHorizontal, Pen } from "lucide-react";
import Image from "next/image";
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

import type { PortfolioTable } from "./type";

import DeletePortfolio from "../deletePortfolio";
import { PortfolioDictionary } from "./type";

export const columns: ColumnDef<PortfolioTable>[] = [
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
    accessorKey: "thumbnail",
    header: PortfolioDictionary["thumbnail"],
    cell: ({ row }) => {
      const { meta, url } = row.getValue(
        "thumbnail",
      ) as PortfolioTable["thumbnail"];
      return (
        <div>
          <Image
            className="size-20 rounded-lg object-cover"
            src={{ src: url, width: 100, height: 100 }}
            alt={meta.alt}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: PortfolioDictionary["title"],
    cell: ({ row }) => (
      <div className="capitalize space-y-1">
        <h6>{row.getValue("title")}</h6>
      </div>
    ),
  },
  {
    accessorKey: "link",
    header: PortfolioDictionary["link"],
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <small>{row.getValue("link")}</small>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="rtl:dir-rtl *:justify-between"
          >
            <DropdownMenuLabel>عملیات</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/" target="_blank">
                مشاهده
                <Eye />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/portfolio/${id}`}>
                ویرایش
                <Pen />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeletePortfolio
                className="w-full text-destructive hover:text-destructive"
                id={id}
              >
                حذف
              </DeletePortfolio>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
