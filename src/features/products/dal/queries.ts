import "server-only";

import type { QueryOptions } from "@/dal/types";

import { dalOperation, DTOifIsSuccess } from "@/dal/helpers";
import { toWooQueryParams } from "@/utils/appendSearchParams";
import { GET } from "@/utils/fetcher";
import { filterArrayByObjectKeyValue } from "@/utils/filterArrayByObjectKey";

import type { WooCategory, WooCategoryQueryParams } from "../types/category";
import type { WooProduct, WooStoreProductQuery } from "../types/products";

import {
  generateAuthHeaders,
  PRODUCTS_CATEGORIES_URL,
  PRODUCTS_URL,
} from "./utils";

type GetCategoriesOptions = QueryOptions<WooCategory, WooCategoryQueryParams>;

export const getCategories = (options: GetCategoriesOptions) => {
  if (!options?.fields) {
    return Promise.reject(new Error("fields is required"));
  }
  const url = toWooQueryParams(PRODUCTS_CATEGORIES_URL(), {
    ...options?.filter,
    _fields: options?.fields?.join(),
  });

  return dalOperation<WooCategory[]>(() =>
    GET(url, {
      headers: generateAuthHeaders(),
    }),
  );
};

export const getAllParentCategories = async () => {
  return DTOifIsSuccess(
    getCategories({
      filter: { parent: 0, hide_empty: false },
      fields: ["name", "id", "image", "slug"],
    }),
    (res) => filterArrayByObjectKeyValue(res, "name", "Uncategorized"),
  );
};

type GetProductsOptions = QueryOptions<WooProduct, WooStoreProductQuery>;

export const getProducts = async (options?: GetProductsOptions) => {
  const url = toWooQueryParams(PRODUCTS_URL(), {
    ...options?.filter,
    _fields: options?.fields?.join(),
  });
  return dalOperation<WooProduct[]>(() =>
    GET(url, {
      headers: generateAuthHeaders(),
    }),
  );
};

type NormalFilters = Record<"offset", number>;

export const getDicountedProducts = (filter?: NormalFilters) => {
  return getProducts({
    filter: { on_sale: true, per_page: filter?.offset },
    fields: ["id", "name", "prices"],
  });
};

export const getNewProducts = (filter?: NormalFilters) => {
  return getProducts({
    filter: { per_page: filter?.offset || 12, order: "desc", orderby: "date" },
    fields: ["id", "name", "prices", "price_html", "images", "slug"],
  });
};
export const getProductsAtLowPrices = (filter?: NormalFilters) => {
  return getProducts({
    filter: {
      order: "asc",
      orderby: "price",
      per_page: filter?.offset,
    },
    fields: ["name", "price_html", "id", "images", "slug"],
  });
};
