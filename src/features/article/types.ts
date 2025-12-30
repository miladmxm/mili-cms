export interface CreateArticle {
  excerpt: string;
  content: string;
  title: string;
  slug: string;
  authorId: string;
  thumbnail?: string | null;
}
