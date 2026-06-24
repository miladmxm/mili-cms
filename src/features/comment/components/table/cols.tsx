import type { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";

import type {
  CommentAdminAccess,
  CommentStatus,
  CommentType,
} from "@/services/comment/type";

import { Button } from "@/components/dashboard/ui/button";
import { Checkbox } from "@/components/dashboard/ui/checkbox";
import { fullDateNumberFormat } from "@/utils/fullDateWithFormat";

import { CommentTypeDictionary } from "../../types";
import ChangeStatusDropdown from "../changeStatusDropdown";
import { ProductDictionary } from "./type";

export const columns: ColumnDef<CommentAdminAccess>[] = [
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
    accessorKey: "author",
    header: ProductDictionary["author"],
    cell: ({ row }) => {
      const {
        author: { name, phoneNumber, email },
      } = row.original;
      return (
        <div className="capitalize space-y-1">
          <h6>{name}</h6>
          <small className="text-card-foreground/70 text-xs dir-ltr">
            {phoneNumber || email}
          </small>
        </div>
      );
    },
  },
  {
    accessorKey: "content",
    header: ProductDictionary["content"],
    cell: ({ row }) => {
      return <p className="truncate">{row.getValue("content")}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ProductDictionary["createdAt"],
    cell: ({ row }) => {
      return <time>{fullDateNumberFormat(row.getValue("createdAt"))}</time>;
    },
  },
  {
    accessorKey: "status",
    header: ProductDictionary["status"],
    cell: ({ row }) => {
      return (
        <ChangeStatusDropdown
          active={row.getValue("status") as CommentStatus}
          id={row.original.id}
        />
      );
    },
  },
  {
    accessorKey: "type",
    header: ProductDictionary["type"],
    cell: ({ row }) => {
      return (
        <small>
          {CommentTypeDictionary[row.getValue("type") as CommentType]}
        </small>
      );
    },
  },
  {
    id: "relation",
    header: "مربوط به",
    cell: ({ row }) => {
      const { article, product } = row.original;
      const isArticle = !!article;
      const isProduct = !!product;

      if (isArticle) {
        return (
          <Link href={`/admin/blog/${article.id}`}>مقاله: {article.title}</Link>
        );
      }
      if (isProduct) {
        return (
          <Link href={`/admin/products/${product.id}`}>
            محصول: {product.name}
          </Link>
        );
      }

      return <small>نامشخص</small>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { id } = row.original;
      return <Button variant="outline">نمایش </Button>;
    },
  },
];
