import env from "@/config/env";

export const WC_BASE_URL = new URL("wp-json/wc/v3/", env.WP_API_URL);
export const WC_STORE_BASE_URL = new URL(
  "wp-json/wc/store/v1/",
  env.WP_API_URL,
);

export const PRODUCTS_URL = new URL("products", WC_STORE_BASE_URL);

export const PRODUCTS_CATEGORIES_URL = new URL(
  "products/categories/",
  WC_BASE_URL,
);

export const getAuthorizationToken = () => {
  return `Basic ${Buffer.from(
    `${process.env.WP_TOKEN_NAME}:${process.env.WP_TOKEN_SECRET}`,
  ).toString("base64")}`;
};

export const generateAuthHeaders = () => {
  return {
    Authorization: getAuthorizationToken(),
  };
};
