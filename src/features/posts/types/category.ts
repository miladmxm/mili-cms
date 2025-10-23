export interface WpCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: "category";
  parent: number;
  meta: Record<string, any>;
  _links?: {
    self: { href: string }[];
    collection: { href: string }[];
    about?: { href: string }[];
    up?: { href: string }[];
    "wp:post_type"?: { href: string }[];
    curies?: { name: string; href: string; templated: boolean }[];
  };
}

export interface WpCategoriesQueryParams {
  context?: "edit" | "embed" | "view";
  page?: number;
  per_page?: number;
  search?: string;
  exclude?: string | number[];
  include?: string | number[];
  order?: "asc" | "desc";
  orderby?:
    | "count"
    | "description"
    | "id"
    | "include_slugs"
    | "include"
    | "name"
    | "slug"
    | "term_group";
  hide_empty?: boolean;
  parent?: number;
  post?: number;
  slug?: string | string[];
}
export interface PostCategory {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
  parent?: number;
}
