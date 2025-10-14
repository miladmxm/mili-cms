import env from "@/config/env";

import type { Category, WooCategory } from "../types/category";

export const WC_BASE_URL = () => new URL("wp-json/wc/v3/", env.WP_API_URL);
export const WC_STORE_BASE_URL = () =>
  new URL("wp-json/wc/store/v1/", env.WP_API_URL);

export const PRODUCTS_URL = () => new URL("products", WC_STORE_BASE_URL());

export const PRODUCTS_CATEGORIES_URL = () =>
  new URL("products/categories/", WC_BASE_URL());

export const PRODUCTS_REVIEWS_URL = () =>
  new URL("products/reviews/", WC_BASE_URL());

export const getAuthorizationToken = () => {
  return `Basic ${Buffer.from(
    `${env.WP_TOKEN_NAME}:${env.WP_TOKEN_SECRET}`,
  ).toString("base64")}`;
};

export const generateAuthHeaders = () => {
  return {
    Authorization: getAuthorizationToken(),
  };
};

export const getThumbnailFromWooCategory = (
  image: WooCategory["image"] | undefined,
): Category["image"] | undefined => {
  if (!image) {
    return;
  }
  return {
    alt: image.alt,
    id: image.id,
    name: image.name,
    src: image.src,
  };
};
export const convertWooCategoryToCategory = <W extends Partial<WooCategory>>(
  wooCategory: W,
): Category => {
  return {
    countOfProducts: wooCategory.count ?? 0,
    description: wooCategory.description ?? "",
    id: wooCategory.id ?? 0,
    name: wooCategory.name ?? "",
    parent: wooCategory.parent ?? 0,
    slug: wooCategory.slug ?? "",
    image: getThumbnailFromWooCategory(wooCategory.image),
  };
};
