import type { Currency, ProseMirror } from "@/types/type";

import type { Media } from "../media/type";
import type { Rating } from "../type";

export type ProductType = "default" | "variable";
export type ProductStatus = "archived" | "draft" | "published";
export type ProductProperties = { key: string; value: string }[];
export const StatusDictionary: Record<ProductStatus, string> = {
  archived: "آرشیو",
  draft: "پیش‌نویس",
  published: "منتشر شده",
};

export interface CreateProductMetadata {
  price: number;
  currency: Currency;
  stock?: number;
  discount: number;
}
export interface VariableCreateProductMetadata extends CreateProductMetadata {
  thumbnailId?: string | null | undefined;
  optionItemIds: string;
}
interface CreateProductBaseData {
  name: string;
  content: ProseMirror;
  properties: ProductProperties;
  slug: string;
  excerpt: string;
  thumbnailId?: string | null | undefined;
  authorId: string;
  status?: ProductStatus;
  categoryIds: string[];
  gallery?: string[];
  type: ProductType;
  optionItemIds: string[];
}

export type CreateProduct =
  | (CreateProductBaseData & {
      type: "default";
      metadata: CreateProductMetadata[];
    })
  | (CreateProductBaseData & {
      type: "variable";
      metadata: VariableCreateProductMetadata[];
    });

export interface ProductDefaultMeta {
  id: string;
  productId: string;
  price: number;
  currency: Currency;
  stock: number;
  discount: number;
}

export interface ProductVariableMeta {
  id: string;
  thumbnailId: string | null;
  thumbnail: Media | null;
  productId: string;
  price: number;
  currency: Currency;
  stock: number;
  discount: number;
  optionItemIds: string;
}
interface ProductBase {
  thumbnail: Media | null;
  thumbnailId: string | null;
  categoryIds: string[];
  properties: ProductProperties;
  id: string;
  type: ProductType;
  name: string;
  content: ProseMirror;
  slug: string;
  excerpt: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  status: ProductStatus;
  categories: {
    categoryId: string;
  }[];
  optionItems: OptionItem[];
  gallery: Media[];
  variables: (Option & { items: OptionItem[] })[];
}

export type Product =
  | (ProductBase & { metadata: ProductDefaultMeta[]; type: "default" })
  | (ProductBase & { metadata: ProductVariableMeta[]; type: "variable" });
export interface CreateCategory {
  name: string;
  slug: string;
  thumbnailId?: string | null;
  vectorId?: string | null;
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
  vector?: { url: string; alt: string; id: string } | null;
  parentId?: string | null;
  description?: string | null;
}
export interface CategoryTree extends Category {
  children?: CategoryTree[];
}

export interface CreateOptionItem {
  label: string;
  value: string;
}
export interface CreateOption {
  name: string;
  slug: string;
  description?: string | undefined;
  items: CreateOptionItem[];
}
export interface OptionItem {
  value: string;
  id: string;
  label: string;
  optionId: string;
}
export interface UpdateOption extends Partial<CreateOption> {
  deletedOptionItemIds?: string[];
  items?: {
    value: string;
    id?: string;
    label: string;
  }[];
}

export interface OptionWithItems {
  id: string;
  name: string;
  slug: string;
  description?: string;
  items: OptionItem[];
}

export interface Option {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CreateProductComment {
  content: string;
  rate?: Rating;
  isQA?: boolean;
  authorId: string;
  productId: string;
  parentId?: string;
}
