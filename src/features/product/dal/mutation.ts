import "server-only";

import type { CreateCategory, CreateProduct } from "@/services/product/type";

import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import * as categoryService from "@/services/product/category.service";
import * as productService from "@/services/product/product.service";

export const createProduct = async (data: CreateProduct) => {
  const product = dalRequireAuth(
    () => dalDbOperation(() => productService.createProduct(data)),
    { product: ["create"] },
  );
  return product;
};
// export const updateArticle = (id: string, data: Partial<CreateArticle>) => {
//   return dalRequireAuth(
//     () => dalDbOperation(() => articleService.updateArticle(id, data)),
//     { blog: ["update"] },
//   );
// };
// export const updateCategory = (id: string, data: Partial<CreateCategory>) => {
//   return dalRequireAuth(
//     () => dalDbOperation(() => articleService.updateCategory(id, data)),
//     { blog: ["update"] },
//   );
// };
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
// export const deleteCategory = (id: string) => {
//   return dalRequireAuth(
//     () => dalDbOperation(() => articleService.deleteCategory(id)),
//     { blog: ["delete"] },
//   );
// };
