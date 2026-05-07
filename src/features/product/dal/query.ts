import "server-only";

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

export const getProduct = async (id: string) => {
  return dalRequireAuth(
    () => dalDbOperation(() => productService.getProduct(id)),
    { product: ["read"] },
  );
};

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
