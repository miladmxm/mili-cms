import "server-only";

import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import * as productCategoryService from "@/services/product/category.service";
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
