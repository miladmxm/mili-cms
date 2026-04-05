"use client";

import type { PropsWithChildren } from "react";

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

import { useDeleteOption } from "../../hooks/useDeleteOption";

const DeleteOptionButton = ({
  id,
  name,
  children,
  className,
}: PropsWithChildren<{ name: string; id: string; className?: string }>) => {
  const { handleClickToDelete, isPending } = useDeleteOption(id);
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
          <DialogTitle>آیا از حذف ویژگی "{name}" اطمینان دارید ؟</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          این کار غیر قابل بازگشت است و محصولاتی که از این ویژگی استفاده
          می‌کردند دیگر آن را نخواهند داشت
        </DialogDescription>
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

export default DeleteOptionButton;
