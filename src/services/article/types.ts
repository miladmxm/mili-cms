import type { ProseMirror } from "@/types/type";

import type { Media } from "../media/type";

export type ArticleStatus = "archived" | "draft" | "published";
export interface Article {
  id: string;
  title: string;
  content: ProseMirror;
  slug: string;
  excerpt: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: Media;
  authorId: string;
  status: ArticleStatus;
  categoryIds: string[];
  readingTime: number | null;
  views: number;
}
export interface CreateArticle {
  excerpt: string;
  content: ProseMirror;
  title: string;
  slug: string;
  authorId: string;
  status?: ArticleStatus;
  categoryIds: string[];
  thumbnail?: string | null;
}
export interface CreateCategory {
  name: string;
  slug: string;
  thumbnail?: string | null;
  parentId?: string | null;
  description?: string;
}
export interface Category {
  name: string;
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: { url: string; alt: string; id: string } | null;
  parentId?: string | null;
  description?: string | null;
}
export interface CategoryTree extends Category {
  children?: CategoryTree[];
}

export const StatusDictionary: Record<ArticleStatus, string> = {
  archived: "آرشیو",
  draft: "پیش‌نویس",
  published: "منتشر شده",
};
