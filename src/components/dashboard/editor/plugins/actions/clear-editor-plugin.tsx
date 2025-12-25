"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CLEAR_EDITOR_COMMAND } from "lexical";
import { Trash2Icon } from "lucide-react";

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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/dashboard/ui/tooltip";

export function ClearEditorActionPlugin() {
  const [editor] = useLexicalComposerContext();

  return (
    <Dialog>
      <Tooltip disableHoverableContent>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="sm" className="p-2" variant="ghost">
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>پاکسازی ادیتور</TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>پاکسازی ادیتور</DialogTitle>
          <DialogDescription>
            آیا از حذف کامل تمام محتوای داخل ادیتور اطمینان دارید؟
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">انصراف</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={() => {
                editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
              }}
            >
              پاکسازی
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
