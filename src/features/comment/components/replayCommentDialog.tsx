"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dashboard/ui/dialog";

import { useCommentStore } from "../store";
import ReplayForm from "./replayForm";

const ReplayCommentDialog = () => {
  const id = useCommentStore((store) => store.activeCommentId);
  const comments = useCommentStore((store) => store.comments);
  const mode = useCommentStore((store) => store.mode);
  const setActiveCommentId = useCommentStore(
    (store) => store.setActiveCommentId,
  );

  const handleOpenChange = (open: boolean) => {
    setActiveCommentId(open ? id : undefined);
  };

  const activeComment = comments.find((comment) => comment.id === id);
  console.log(activeComment);
  const isOpen = !!id && !!activeComment && mode === "replay";
  return (
    <Dialog modal open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>پاسخ به نظر</DialogTitle>
          <DialogDescription>{activeComment?.content}</DialogDescription>
        </DialogHeader>
        <div>
          <ReplayForm comment={activeComment} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReplayCommentDialog;
