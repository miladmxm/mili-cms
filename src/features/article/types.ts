export type ArticleStatus = "archived" | "draft" | "published";
export interface CreateArticle {
  excerpt: string;
  content: string;
  title: string;
  slug: string;
  authorId: string;
  status?: ArticleStatus;
  thumbnail?: string | null;
}
export interface Category {
  name: string;
  slug: string;
  thumbnail?: string | null;
  parentId?: string;
  description?: string;
}
export const StatusDictionary: Record<ArticleStatus, string> = {
  archived: "آرشیو",
  draft: "پیش‌نویس",
  published: "منتشر شده",
};
