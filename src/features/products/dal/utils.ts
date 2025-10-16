import env from "@/config/env";

import type { Category, WooCategory } from "../types/category";
import type { Product, WooProduct } from "../types/products";

export const WC_BASE_URL = () => new URL("wp-json/wc/v3/", env.WP_API_URL);
export const WC_STORE_BASE_URL = () =>
  new URL("wp-json/wc/store/v1/", env.WP_API_URL);

export const PRODUCTS_URL = () => new URL(`products`, WC_STORE_BASE_URL());

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

const getTypeFromWooProduct = (type: WooProduct["type"] | undefined) => {
  if (type === "grouped") return "grouped";
  if (type === "variable") return "variable";
  return "simple";
};

const defaultPriceValue: Product["prices"] = {
  price: "",
  regularPrice: "",
  salePrice: "",
  currencyCode: "",
  currencySymbol: "",
  currencyMinorUnit: 0,
  currencyDecimalSeparator: "",
  currencyThousandSeparator: "",
  currencyPrefix: "",
  currencySuffix: "",
  priceRange: null,
};

const getRangePriceFromWooProductPriceRange = (
  wooProductPriceRange: WooProduct["prices"] | undefined,
): Product["prices"]["priceRange"] => {
  if (!wooProductPriceRange?.price_range) return null;
  return {
    minAmount: wooProductPriceRange.price_range.min_amount,
    maxAmount: wooProductPriceRange.price_range.max_amount,
  };
};

const getPriceFromWooProductPrice = (
  wooProductPrice: WooProduct["prices"] | undefined,
): Product["prices"] => {
  if (!wooProductPrice) return defaultPriceValue;
  return {
    price: wooProductPrice.price,
    regularPrice: wooProductPrice.regular_price,
    salePrice: wooProductPrice.sale_price,
    currencyCode: wooProductPrice.currency_code,
    currencySymbol: wooProductPrice.currency_symbol,
    currencyMinorUnit: wooProductPrice.currency_minor_unit,
    currencyDecimalSeparator: wooProductPrice.currency_decimal_separator,
    currencyThousandSeparator: wooProductPrice.currency_thousand_separator,
    currencyPrefix: wooProductPrice.currency_prefix,
    currencySuffix: wooProductPrice.currency_suffix,
    priceRange: getRangePriceFromWooProductPriceRange(wooProductPrice),
  };
};

const getImagesFromWooProductImages = (
  wooProductImages: WooProduct["images"] | undefined,
): Product["images"] => {
  return (
    wooProductImages?.map((img) => ({
      id: img.id,
      alt: img.alt,
      name: img.name,
      thumbnail: img.thumbnail,
      src: img.src,
    })) || []
  );
};
const getCategoriesFromWooProductCategories = (
  wooProductCategories: WooProduct["categories"] | undefined,
): Product["categories"] => {
  return (
    wooProductCategories?.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    })) || []
  );
};
const getAttributesFromWooProductAttributes = (
  wooProductAttributes: WooProduct["attributes"] | undefined,
): Product["attributes"] => {
  return (
    wooProductAttributes?.map((attr) => ({
      id: attr.id,
      name: attr.name,
      has_variations: attr.has_variations,
      terms: attr.terms.map((term) => ({
        id: term.id,
        name: term.name,
        slug: term.slug,
      })),
    })) || []
  );
};

export const convertWooProductToProduct = <W extends Partial<WooProduct>>(
  wooProduct: W,
): Product => {
  return {
    id: wooProduct.id ?? 0,
    name: wooProduct.name ?? "",
    slug: wooProduct.slug ?? "",
    type: getTypeFromWooProduct(wooProduct.type),
    shortDescription: wooProduct.short_description ?? "",
    description: wooProduct.description ?? "",
    prices: getPriceFromWooProductPrice(wooProduct.prices),
    reviewCount: wooProduct.review_count ?? 0,
    images: getImagesFromWooProductImages(wooProduct.images),
    categories: getCategoriesFromWooProductCategories(wooProduct.categories),
    attributes: getAttributesFromWooProductAttributes(wooProduct.attributes),
    variations: wooProduct.variations ?? [],
    isPurchasable: wooProduct.is_purchasable ?? false,
    isInStock: wooProduct.is_in_stock ?? false,
    stock: wooProduct.low_stock_remaining ?? undefined,
  };
};
