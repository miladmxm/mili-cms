import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";

import type { QueryOptions } from "@/dal/types";

import { dalOperation, DTOifIsSuccess } from "@/dal/helpers";
import { ThrowableDalError } from "@/dal/types";
import { toWooQueryParams } from "@/utils/appendSearchParams";
import { delay } from "@/utils/delay";
import { fetcher, GET } from "@/utils/fetcher";
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

export const getCategories = cache(
  async <T extends (keyof WooCategory)[]>(
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
  },
);

export const getProducts = async <T extends (keyof WooProduct)[]>(
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
  return DTOifIsSuccess(
    getCategories({ filter: { hide_empty: false } }),
    (wooCategories) =>
      wooCategories.map((wooCategory) =>
        convertWooCategoryToCategory(wooCategory),
      ),
  );
};

export const getCategoryIdBySlug = (slug: string) => {
  return DTOifIsSuccess(
    getCategories({ fields: ["id"], filter: { slug } }),
    (wooCategory) =>
      filterObjectByKeys(convertWooCategoryToCategory(wooCategory[0]), ["id"]),
  );
};
export const getProductsByLimit = (filter?: {
  offset?: number;
  page?: number;
  category?: string;
}) => {
  const defaultFilter = { offset: 10, page: 1, ...filter };
  return DTOifIsSuccess(
    getProducts({
      fields: [
        "name",
        "prices",
        "slug",
        "id",
        "short_description",
        "categories",
        "images",
      ],
      filter: {
        order: "desc",
        orderby: "date",
        category: defaultFilter.category,
        per_page: defaultFilter.offset,
        page: defaultFilter.page,
      },
    }),
    (wooProducts) =>
      wooProducts.map((wooProduct) =>
        filterObjectByKeys(convertWooProductToProduct(wooProduct), [
          "id",
          "name",
          "images",
          "slug",
          "shortDescription",
          "prices",
          "categories",
        ]),
      ),
  );
};

type NormalFilters = Record<"offset", number>;

export const getDicountedProducts = async (filter?: NormalFilters) => {
  await delay(2000);
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
    (wooProduct) => {
      if (!wooProduct[0])
        throw new ThrowableDalError({ type: "fetch-error", status: 404 });
      return convertWooProductToProduct(wooProduct[0]);
    },
  );
};

export const getNonce = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("nonce");
  try {
    await delay(3000);
    const nonceRes = await fetch(
      "http://localhost:8080/wp-json/wc/store/v1/checkout",
      {
        headers: {
          Nonce: "12345",
        },
      },
    );
    return nonceRes.headers.get("nonce");
  } catch (error) {
    console.log(error);
  }
};
