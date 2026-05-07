"use client";

import type { FC, PropsWithChildren } from "react";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dashboard/ui/dialog";
import { Spinner } from "@/components/dashboard/ui/spinner";
import { cn } from "@/lib/utils";

import { useDeleteProduct } from "../hooks/useDeleteProduct";

const DeleteProduct: FC<
  PropsWithChildren & { id: string; className?: string; name: string }
> = ({ children, className, id, name }) => {
  const { isPending, handleClickToDelete } = useDeleteProduct(id);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className={cn(className)}
          disabled={isPending}
          variant="ghost"
        >
          {children}
          {isPending ? <Spinner /> : <Trash2 className="text-destructive" />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>آیا از حذف محصول "{name}" اطمینان دارید؟</DialogTitle>
        </DialogHeader>
        <DialogDescription>این کار غیر قابل بازگشت است</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">خیر</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleClickToDelete}>
              بله
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProduct;
