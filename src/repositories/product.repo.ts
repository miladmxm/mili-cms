import { desc, eq, inArray, like } from "drizzle-orm";

import {
  product,
  productCategory,
  productGallery,
  productMeta,
  productToCategory,
} from "@/db/drizzle/schemas";

import type { Transaction } from ".";

import { getDBorTX } from ".";

export const findProducts = (tx?: Transaction) =>
  getDBorTX(tx).query.product.findMany({
    orderBy: [desc(product.createdAt)],
  });
export const findProductByIdWithAll = (id: string, tx?: Transaction) =>
  getDBorTX(tx).query.product.findFirst({
    where: eq(product.id, id),
    with: {
      author: true,
      categories: true,
      comments: true,
      gallery: true,
      optionItems: true,
      productMeta: true,
      rates: true,
      thumbnail: true,
    },
  });
export const findProductByStartedSlugWith = async (
  slug: string,
  tx?: Transaction,
) =>
  getDBorTX(tx).query.product.findMany({
    where: like(product.slug, `${slug}%`),
  });
export const createProduct = (
  data: typeof product.$inferInsert,
  tx?: Transaction,
) => getDBorTX(tx).insert(product).values(data).returning({ id: product.id });

export const findCategoriesByIds = async (ids: string[], tx?: Transaction) => {
  return await getDBorTX(tx).query.productCategory.findMany({
    where: inArray(productCategory.id, ids),
  });
};
export const addProductToCategories = (
  productToCategories: (typeof productToCategory.$inferInsert)[],
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .insert(productToCategory)
    .values(productToCategories)
    .onConflictDoNothing();

export const createProductMetadata = (
  metadata: (typeof productMeta.$inferInsert)[],
  tx?: Transaction,
) => getDBorTX(tx).insert(productMeta).values(metadata);

export const addMediaToProductGallery = (
  data: (typeof productGallery.$inferInsert)[],
  tx?: Transaction,
) => getDBorTX(tx).insert(productGallery).values(data);
