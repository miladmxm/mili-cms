import "server-only";

import type {
  CreateCategory,
  CreateOption,
  CreateProduct,
  UpdateOption,
} from "@/services/product/type";

import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import * as categoryService from "@/services/product/category.service";
import * as optionService from "@/services/product/option.service";
import * as productService from "@/services/product/product.service";

export const createProduct = async (data: CreateProduct) => {
  const product = dalRequireAuth(
    () => dalDbOperation(() => productService.createProduct(data)),
    { product: ["create"] },
  );
  return product;
};
export const createOption = async (data: CreateOption) => {
  const product = dalRequireAuth(
    () => dalDbOperation(() => optionService.createOption(data)),
    { product: ["create"] },
  );
  return product;
};
export const deleteOption = (id: string) => {
  return dalRequireAuth(
    () => dalDbOperation(() => optionService.deleteOption(id)),
    { product: ["delete"] },
  );
};
export const updateOption = (id: string, data: UpdateOption) => {
  return dalRequireAuth(
    () => dalDbOperation(() => optionService.updateOption(id, data)),
    { product: ["update"] },
  );
};
// export const updateArticle = (id: string, data: Partial<CreateArticle>) => {
//   return dalRequireAuth(
//     () => dalDbOperation(() => articleService.updateArticle(id, data)),
//     { blog: ["update"] },
//   );
// };
export const updateCategory = (id: string, data: Partial<CreateCategory>) => {
  return dalRequireAuth(
    () => dalDbOperation(() => categoryService.updateCategory(id, data)),
    { product: ["update"] },
  );
};
// export const updateStatus = (id: string, status: ArticleStatus) => {
//   const article = dalRequireAuth(
//     () => dalDbOperation(() => articleService.updateArticleStatus(id, status)),
//     { blog: ["update"] },
//   );
//   return article;
// };
// export const deleteArticle = (id: string) => {
//   return dalRequireAuth(
//     () => dalDbOperation(() => articleService.deleteArticle(id)),
//     {
//       blog: ["delete"],
//     },
//   );
// };

export const createCategory = async (categoryData: CreateCategory) => {
  return dalRequireAuth(
    () => dalDbOperation(() => categoryService.createCategory(categoryData)),
    { product: ["create"] },
  );
};
export const deleteCategory = (id: string) => {
  return dalRequireAuth(
    () => dalDbOperation(() => categoryService.deleteCategory(id)),
    { product: ["delete"] },
  );
};
