import type { Rating } from "../type";

type CommentStatus = "approved" | "pending" | "spam";

export interface Comment {
  type: "default" | "qa";
  id: string;
  content: string;
  status: CommentStatus;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  rate?: Rating | null;
  author: {
    name: string;
    image: string | null;
    role: string | null;
  };
}
