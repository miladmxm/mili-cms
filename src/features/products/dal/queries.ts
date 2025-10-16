import "server-only";

import type { QueryOptions } from "@/dal/types";

import { dalOperation, DTOifIsSuccess } from "@/dal/helpers";
import { toWooQueryParams } from "@/utils/appendSearchParams";
import { GET } from "@/utils/fetcher";
import { filterArrayByObjectKeyValue } from "@/utils/filterArrayByObjectKey";
import { filterObjectByKeys } from "@/utils/filterObject";

import type { WooCategory, WooCategoryQueryParams } from "../types/category";
import type {
  Product,
  WooProduct,
  WooStoreProductQuery,
} from "../types/products";

import {
  convertWooCategoryToCategory,
  convertWooProductToProduct,
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
            "image",
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
  return DTOifIsSuccess(
    getProducts({
      filter: { on_sale: true, per_page: filter?.offset },
      fields: ["id", "name", "images", "prices"],
    }),
    (wooProducts) =>
      wooProducts.map((wooProduct) =>
        filterObjectByKeys(convertWooProductToProduct(wooProduct), [
          "id",
          "name",
          "images",
          "prices",
        ]),
      ),
  );
};

export const getNewProducts = (filter?: NormalFilters) => {
  return DTOifIsSuccess(
    getProducts({
      filter: {
        per_page: filter?.offset || 12,
        order: "desc",
        orderby: "date",
      },
      fields: ["id", "name", "prices", "images", "slug"],
    }),
    (wooProducts) =>
      wooProducts.map((wooProduct) =>
        filterObjectByKeys(convertWooProductToProduct(wooProduct), [
          "id",
          "name",
          "slug",
          "prices",
          "images",
        ]),
      ),
  );
};
export const getProductsAtLowPrices = (filter?: NormalFilters) => {
  return DTOifIsSuccess(
    getProducts({
      filter: {
        order: "asc",
        orderby: "price",
        per_page: filter?.offset,
      },
      fields: ["name", "id", "prices", "images", "slug"],
    }),
    (wooProducts) =>
      wooProducts.map((wooProduct) =>
        filterObjectByKeys(convertWooProductToProduct(wooProduct), [
          "name",
          "id",
          "images",
          "prices",
          "slug",
        ]),
      ),
  );
};

export const getProductBySlug = (slug: Product["slug"]) => {
  return DTOifIsSuccess(
    getProducts({
      filter: { slug },
    }),
    (wooProduct) =>
      wooProduct[0] ? convertWooProductToProduct(wooProduct[0]) : undefined,
  );
};
