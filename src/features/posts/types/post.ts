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
interface WPAttachment {
  id: number;
  date: string;
  slug: string;
  type: "attachment";
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: "audio" | "file" | "image" | "video";
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    filesize?: number;
    sizes: {
      [key: string]: {
        file: string;
        width: number;
        height: number;
        filesize?: number;
        mime_type: string;
        source_url: string;
        uncropped?: boolean;
      };
    };
    image_meta: {
      aperture: string;
      credit: string;
      camera: string;
      caption: string;
      created_timestamp: string;
      copyright: string;
      focal_length: string;
      iso: string;
      shutter_speed: string;
      title: string;
      orientation: string;
      keywords: string[];
    };
  };
  source_url: string;
}
export interface WPCategory {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
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
    "wp:featuredmedia"?: WPAttachment[];
    "wp:term": WPCategory[];
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

export interface Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  comment_status: "closed" | "open";
  categories?: {
    id: number;
    name: string;
    slug: string;
  }[];
  author?: {
    id: number;
    name: string;
    description: string;
    slug: string;
    avatar: string;
  };
  image?: {
    id: number;
    src: string;
    thumbnail: string;
    alt: string;
  };
}
