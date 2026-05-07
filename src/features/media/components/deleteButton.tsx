"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dashboard/ui/dialog";
import { Spinner } from "@/components/dashboard/ui/spinner";

import { useDeleteFile } from "../hooks/useDeleteFile";

const DeleteFile = ({ id }: { id: string }) => {
  const { handleClickToDelete, isPending } = useDeleteFile(id);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon-sm" disabled={isPending} variant="destructive">
          {isPending ? <Spinner /> : <Trash2 />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>آیا از حذف این فایل اطمینان دارید؟</DialogTitle>
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

export default DeleteFile;
