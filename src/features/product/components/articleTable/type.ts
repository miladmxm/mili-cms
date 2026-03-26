import type { ArticleStatus } from "../../../../services/article/types";

export interface Article {
  id: string;
  status: ArticleStatus;
  title: string;
  slug: string;
}
export const ArticleDictionary: Record<keyof Article, string> = {
  status: "وضعیت",
  id: "شناسه",
  slug: "نشانی",
  title: "عنوان",
};
