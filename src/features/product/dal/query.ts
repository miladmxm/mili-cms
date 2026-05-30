import "server-only";

import type { LimitAndOffset } from "@/services/type";

import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import * as productCategoryService from "@/services/product/category.service";
import * as optionService from "@/services/product/option.service";
import * as productService from "@/services/product/product.service";

export const getProducts = async () => {
  return dalRequireAuth(
    () => dalDbOperation(() => productService.getPaginationProduct()),
    {
      product: ["read"],
    },
  );
};

export const getPublishedProducts = async (config?: LimitAndOffset) => {
  return dalVerifySuccess(
    await dalDbOperation(() => productService.getPublishedProducts(config)),
  );
};

export const getPublishedProductsWithFilter = async (
  filters: Parameters<typeof productService.getPublishedProductsWithFilter>[0],
  config?: LimitAndOffset,
) => {
  return dalVerifySuccess(
    await dalDbOperation(() =>
      productService.getPublishedProductsWithFilter(filters, config),
    ),
  );
};

export const getProduct = async (id: string) => {
  return dalRequireAuth(
    () => dalDbOperation(() => productService.getProduct(id)),
    { product: ["read"] },
  );
};

export const searchProducts = async (
  query: string,
  config?: LimitAndOffset,
) => {
  return dalVerifySuccess(
    await dalDbOperation(() =>
      productService.searchPublishedProducts(query, config),
    ),
  );
};

export const getDiscountedProducts = async () =>
  dalVerifySuccess(await dalDbOperation(productService.getDiscountedProducts));

export const getLowPriceProducts = async () =>
  dalVerifySuccess(await dalDbOperation(productService.getLowPriceProducts));

export const getCategories = async () => {
  const categories = dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(productCategoryService.getCategoriesWithThumbnail),
      {
        product: ["read"],
      },
    ),
  );

  return categories;
};

export const getPublicCategories = async () => {
  return dalVerifySuccess(
    await dalDbOperation(productCategoryService.getCategoriesWithThumbnail),
  );
};

export const getOptions = async () => {
  return dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(optionService.getOptionsWithItems),
      { product: ["read"] },
    ),
  );
};

export const getOption = async (id: string) => {
  return dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(() => optionService.getOptionWithItems(id)),
      { product: ["read"] },
    ),
  );
};
