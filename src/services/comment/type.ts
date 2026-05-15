import type { Media } from "../media/type";

type CommentStatus = "approved" | "pending" | "spam";

export interface Comment {
  id: string;
  content: string;
  status: CommentStatus;
  author: { name: string; thumbnail?: Media };
  parent?: Comment;
}
