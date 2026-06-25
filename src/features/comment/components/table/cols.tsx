import type { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import type {
  CommentAdminAccess,
  CommentStatus,
  CommentType,
} from "@/services/comment/type";

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
import { fullDateNumberFormat } from "@/utils/fullDateWithFormat";

import ChangeStatusDropdown from "../changeStatusDropdown";
import ChangeTypeDropdown from "../changeTypeDropdown";
import DeleteComment from "../deleteComment";
import ReplyTrigger from "../replayTrigger";
import ShowCommentDetails from "../showCommentDetails";
import { CommentColsDictionary } from "./type";

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
    header: CommentColsDictionary["author"],
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
    header: CommentColsDictionary["content"],
    cell: ({ row }) => {
      return <p className="truncate max-w-28">{row.getValue("content")}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: CommentColsDictionary["createdAt"],
    cell: ({ row }) => {
      return <time>{fullDateNumberFormat(row.getValue("createdAt"))}</time>;
    },
  },
  {
    accessorKey: "status",
    header: CommentColsDictionary["status"],
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
    header: CommentColsDictionary["type"],
    cell: ({ row }) => {
      return (
        <ChangeTypeDropdown
          active={row.getValue("type") as CommentType}
          id={row.original.id}
        />
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
      const { id, type } = row.original;
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
              <ShowCommentDetails id={id} />
            </DropdownMenuItem>
            {type === "qa" && (
              <DropdownMenuItem asChild>
                <ReplyTrigger />
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <DeleteComment
                className="w-full text-destructive hover:text-destructive"
                id={id}
              >
                حذف
              </DeleteComment>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
