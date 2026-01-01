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

export const StatusDictionary: Record<ArticleStatus, string> = {
  archived: "آرشیو",
  draft: "پیش‌نویس",
  published: "منتشر شده",
};
