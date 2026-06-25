"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dashboard/ui/dialog";

import { useCommentStore } from "../store";
import EditComment from "./editComment";

const CommentDetailsDialog = () => {
  const id = useCommentStore((store) => store.activeCommentId);
  const comments = useCommentStore((store) => store.comments);
  const setActiveCommentId = useCommentStore(
    (store) => store.setActiveCommentId,
  );

  const handleOpenChange = (open: boolean) => {
    setActiveCommentId(open ? id : undefined);
  };

  const activeComment = comments.find((comment) => comment.id === id);
  const isOpen = !!id && !!activeComment;
  console.log(activeComment);
  return (
    <Dialog modal open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>محتوای نظر</DialogTitle>
        </DialogHeader>
        <div>
          <EditComment comment={activeComment} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDetailsDialog;
