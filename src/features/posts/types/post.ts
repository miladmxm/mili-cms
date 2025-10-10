export interface WPPostsQuery {
  context?: "edit" | "embed" | "view";
  page?: number;
  per_page?: number;
  after?: string;
  modified_after?: string;
  before?: string;
  modified_before?: string;
  author?: number | number[];
  author_exclude?: number | number[];
  include?: number | number[];
  exclude?: number | number[];
  offset?: number;
  order?: "asc" | "desc";
  orderby?:
    | string
    | "author"
    | "date"
    | "id"
    | "include"
    | "menu_order"
    | "modified"
    | "parent"
    | "relevance"
    | "slug"
    | "title";
  slug?: string | string[];
  status?:
    | string
    | "any"
    | "auto-draft"
    | "draft"
    | "future"
    | "inherit"
    | "pending"
    | "private"
    | "publish"
    | "trash";
  categories?: number | number[];
  categories_exclude?: number | number[];
  tags?: number | number[];
  tags_exclude?: number | number[];
  tax_relation?: "AND" | "OR";
  sticky?: boolean;
  search?: string;
  search_columns?: string[];
  [key: string]: any;
}

export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: "closed" | "open";
  ping_status: "closed" | "open";
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, any>;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: {
      id: number;
      name: string;
      url: string;
      description: string;
      link: string;
      slug: string;
      avatar_urls: Record<string, string>;
    }[];
    "wp:featuredmedia"?: {
      id: number;
      source_url: string;
      alt_text: string;
      media_type: string;
    }[];
  };
  _links: {
    self: { href: string }[];
    collection: { href: string }[];
    about: { href: string }[];
    author?: { embeddable: boolean; href: string }[];
    replies?: { embeddable: boolean; href: string }[];
    "version-history"?: { count: number; href: string }[];
    "predecessor-version"?: { id: number; href: string }[];
    "wp:featuredmedia"?: { embeddable: boolean; href: string }[];
    "wp:attachment"?: { href: string }[];
    "wp:term"?: { taxonomy: string; embeddable: boolean; href: string }[];
    curies?: { name: string; href: string; templated: boolean }[];
  };
}
