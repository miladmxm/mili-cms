import "server-only";

import type { QueryOptions } from "@/dal/types";

import { dalOperation, DTOifIsSuccess } from "@/dal/helpers";
import { toWooQueryParams } from "@/utils/appendSearchParams";
import { GET } from "@/utils/fetcher";
import { filterArrayByObjectKeyValue } from "@/utils/filterArrayByObjectKey";
import { filterObjectByKeys } from "@/utils/filterObject";

import type { WooCategory, WooCategoryQueryParams } from "../types/category";
import type { WooProduct, WooStoreProductQuery } from "../types/products";

import {
  convertWooCategoryToCategory,
  generateAuthHeaders,
  PRODUCTS_CATEGORIES_URL,
  PRODUCTS_URL,
} from "./utils";

export const getCategories = <T extends (keyof WooCategory)[]>(
  options: QueryOptions<T, WooCategoryQueryParams>,
) => {
  const url = toWooQueryParams(PRODUCTS_CATEGORIES_URL(), {
    ...options?.filter,
    _fields: options?.fields?.join(),
  });

  return dalOperation<Pick<WooCategory, T[number]>[]>(() =>
    GET(url, {
      headers: generateAuthHeaders(),
    }),
  );
};
export const getAllParentCategories = () => {
  return DTOifIsSuccess(
    getCategories({
      filter: { parent: 0, hide_empty: false },
      fields: ["name", "id", "image", "slug", "count", "description"],
    }),
    (wooCategories) =>
      filterArrayByObjectKeyValue(
        wooCategories.map((wooCategory) =>
          filterObjectByKeys(convertWooCategoryToCategory(wooCategory), [
            "id",
            "name",
            "slug",
          ]),
        ),
        "name",
        "Uncategorized",
      ),
  );
};

export const getAllCategories = () => {
  return getCategories({ filter: { hide_empty: false } });
};

export const getProducts = <T extends (keyof WooProduct)[]>(
  options?: QueryOptions<T, WooStoreProductQuery>,
) => {
  const url = toWooQueryParams(PRODUCTS_URL(), {
    ...options?.filter,
    _fields: options?.fields?.join(),
  });
  return dalOperation<Pick<WooProduct, T[number]>[]>(() =>
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
