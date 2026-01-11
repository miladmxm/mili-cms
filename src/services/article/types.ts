export type ArticleStatus = "archived" | "draft" | "published";
export interface Article {
  excerpt: string;
  content: string;
  title: string;
  slug: string;
  thumbnail?: string | null;
  status?: ArticleStatus;
  categoryIds: string[];
}
export interface CreateArticle {
  excerpt: string;
  content: string;
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
  thumbnail?: string;
  parentId?: string;
  description?: string;
}
export interface Category {
  name: string;
  id: string;
  slug: string;
  thumbnail?: { url: string; alt: string } | null;
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
