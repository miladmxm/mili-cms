import type { Rating } from "../type";

export type CommentStatus = "approved" | "pending" | "spam";

export type CommentType = "default" | "qa";

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

export interface UpdateCommentPayload {
  content?: string;
  status?: CommentStatus;
  type?: CommentType;
}

export interface CreateReplayComment {
  authorId: string;
  content: string;
  parentId: string;
  role: string;
}
