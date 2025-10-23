export interface WooCategoryImage {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
}

export interface WooCategoryLink {
  href: string;
}

export interface WooCategoryLinks {
  self: WooCategoryLink[];
  collection: WooCategoryLink[];
  up?: WooCategoryLink[];
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: WooCategoryImage | null;
  menu_order: number;
  count: number;
  _links: WooCategoryLinks;
}

export type WooCategoryContext = "edit" | "view";

export type WooCategoryOrder = "asc" | "desc";

export type WooCategoryOrderBy =
  | "count"
  | "description"
  | "id"
  | "include"
  | "name"
  | "slug"
  | "term_group";

export interface WooCategoryQueryParams {
  context?: WooCategoryContext;
  page?: number;
  per_page?: number;
  search?: string;
  exclude?: number[];
  include?: number[];
  order?: WooCategoryOrder;
  orderby?: WooCategoryOrderBy;
  hide_empty?: boolean;
  parent?: number;
  product?: number;
  slug?: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  image?: {
    name: string;
    src: string;
    id: number;
    alt: string;
  };
  countOfProducts: number;
}
