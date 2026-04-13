import type { ColumnDef } from "@tanstack/react-table";

import { Eye, MoreHorizontal, Pen } from "lucide-react";
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

import type { Product } from "./type";

import ChangeStatusDropdown from "../changeStatusDropdown";
import DeleteProduct from "../deleteProduct";
import { ProductDictionary } from "./type";

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "name",
    header: ProductDictionary["name"],
    cell: ({ row }) => (
      <div className="capitalize space-y-1">
        <h6>{row.getValue("name")}</h6>
        <small className="text-card-foreground/70 text-xs">
          {row.original.slug}
        </small>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ProductDictionary["status"],
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
      const { id, name } = row.original;
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
              <Link href={`/admin/products/${id}`}>
                ویرایش
                <Pen />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteProduct
                className="w-full text-destructive hover:text-destructive"
                id={id}
                name={name}
              >
                حذف
              </DeleteProduct>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
