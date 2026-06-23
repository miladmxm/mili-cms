import "server-only";

import type { LimitAndOffset } from "@/services/type";

import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import { getSession } from "@/lib/auth";
import * as productCategoryService from "@/services/product/category.service";
import * as commentService from "@/services/product/comment.service";
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

export const getApprovedProductComments = async (
  productId: string,
  config?: LimitAndOffset,
) => {
  return dalVerifySuccess(
    await dalDbOperation(async () => {
      const user = await getSession();
      return commentService.getApprovedProductComments(
        { productId, userId: user?.user.id },
        config,
      );
    }),
  );
};

export const getPublishedProduct = async (slug: string) => {
  return dalVerifySuccess(
    await dalDbOperation(() => productService.getPublishedProduct(slug)),
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

export const getProductCategoryBySlug = async (slug: string) =>
  dalVerifySuccess(
    await dalDbOperation(() => productCategoryService.getCategoryBySlug(slug)),
  );

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

export const getPublicOptionsWithItems = async () => {
  return dalVerifySuccess(
    await dalDbOperation(() => optionService.getOptionsWithItems()),
  );
};

export const getPublicOptions = async () => {
  return dalVerifySuccess(
    await dalDbOperation(() => optionService.getOptions()),
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
