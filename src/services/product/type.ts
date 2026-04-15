import type { Currency, ProseMirror } from "@/types/type";

import type { Media } from "../media/type";

export type ProductType = "default" | "variable";
export type ProductStatus = "archived" | "draft" | "published";
export const StatusDictionary: Record<ProductStatus, string> = {
  archived: "آرشیو",
  draft: "پیش‌نویس",
  published: "منتشر شده",
};

export interface ProductPrice {
  currency: Currency;
  amount: number;
}
export interface CreateProductMetadata {
  price: ProductPrice;
  stock?: number;
}
export interface VariableCreateProductMetadata extends CreateProductMetadata {
  thumbnailId?: string | null | undefined;
  optionItemIds: string;
}
interface CreateProductBaseData {
  name: string;
  content: ProseMirror;
  slug: string;
  excerpt: string;
  thumbnailId?: string | null | undefined;
  authorId: string;
  status?: ProductStatus;
  categoryIds: string[];
  gallery?: string[];
  type: ProductType;
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

interface ProductDefaultMeta {
  id: string;
  productId: string;
  price: ProductPrice;
  stock: number;
}
export interface ProductVariableMeta {
  id: string;
  thumbnailId: string | null;
  thumbnail: Media | null;
  productId: string;
  price: ProductPrice;
  stock: number;
  optionItemIds: string;
}
interface ProductBase {
  thumbnail: Media | null;
  thumbnailId: string | null;
  categoryIds: string[];
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
  gallery: Media[];
  optionItems: OptionItem[];
}
export type Product =
  | (ProductBase & { metadata: ProductDefaultMeta[]; type: "default" })
  | (ProductBase & { metadata: ProductVariableMeta[]; type: "variable" });
export interface CreateCategory {
  name: string;
  slug: string;
  thumbnailId?: string | null;
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

export interface Option {
  id: string;
  name: string;
  slug: string;
  description?: string;
  items: OptionItem[];
}
