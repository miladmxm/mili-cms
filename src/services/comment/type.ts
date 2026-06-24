import type { Rating } from "../type";

type CommentStatus = "approved" | "pending" | "spam";

type CommentType = "default" | "qa";

export interface Comment {
  type: CommentType;
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

export interface CommentAdminAccess {
  authorId: string;
  content: string;
  type: CommentType;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: CommentStatus;
  rate: Rating | null;
  parentId: string | null;
  article?: {
    id: string;
    title: string;
  };
  product?: {
    id: string;
    name: string;
  };
  author: {
    email: string;
    id: string;
    name: string;
    phoneNumber: string | null;
  };
}
