import { and, desc, eq, inArray, like } from "drizzle-orm";

import type { OffsetLimit } from "@/types/repo";

import {
  product,
  productCategory,
  productGallery,
  productMeta,
  productToCategory,
  productToOptionItem,
} from "@/db/drizzle/schemas";
import {
  productOption,
  productOptionItem,
} from "@/db/drizzle/schemas/productOptions";

import type { Transaction } from ".";

import { getDBorTX } from ".";

export const findProductById = async (id: string, tx?: Transaction) => {
  const findedProduct = await getDBorTX(tx).query.product.findFirst({
    where: eq(product.id, id),
    with: {
      categories: { columns: { categoryId: true } },
      thumbnail: true,
      gallery: { with: { media: true } },
      optionItems: {
        with: { optionItem: true },
      },
      metadata: { with: { thumbnail: true } },
    },
  });
  if (!findedProduct) return findedProduct;

  const categoryIds = findedProduct.categories.map(
    ({ categoryId }) => categoryId,
  );
  return {
    ...findedProduct,
    categoryIds,
  };
};
export const findProductsByLimitAndOffset = (
  options?: OffsetLimit,
  tx?: Transaction,
) =>
  getDBorTX(tx).query.product.findMany({
    orderBy: [desc(product.createdAt)],
    limit: options?.limit,
    offset: options?.offset,
  });

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
      metadata: true,
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

export const deleteProductToCategories = (
  { categoryId, productId }: typeof productToCategory.$inferInsert,
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .delete(productToCategory)
    .where(
      and(
        eq(productToCategory.categoryId, categoryId),
        eq(productToCategory.productId, productId),
      ),
    );

export const createProductMetadata = (
  metadata: (typeof productMeta.$inferInsert)[],
  tx?: Transaction,
) => getDBorTX(tx).insert(productMeta).values(metadata);

export const addMediaToProductGallery = (
  data: (typeof productGallery.$inferInsert)[],
  tx?: Transaction,
) => getDBorTX(tx).insert(productGallery).values(data);

export const createCategory = (
  data: typeof productCategory.$inferInsert,
  tx?: Transaction,
) => getDBorTX(tx).insert(productCategory).values(data).returning();
export const findCategories = async (tx?: Transaction) => {
  const categories = await getDBorTX(tx).query.productCategory.findMany({
    with: { thumbnail: { columns: { url: true, meta: true } } },
    orderBy: [desc(productCategory.createdAt)],
  });
  return categories;
};
export const findCategoryByStartedSlugWith = async (
  slug: string,
  tx?: Transaction,
) =>
  getDBorTX(tx).query.articleCategory.findMany({
    where: like(productCategory.slug, `${slug}%`),
  });
export const deleteProductCategoryById = (id: string, tx?: Transaction) =>
  getDBorTX(tx).delete(productCategory).where(eq(productCategory.id, id));

export const updateCategoryById = (
  id: string,
  value: Partial<typeof productCategory.$inferInsert>,
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .update(productCategory)
    .set(value)
    .where(eq(productCategory.id, id))
    .returning();

export const findOptionByIdWithItems = (id: string, tx?: Transaction) =>
  getDBorTX(tx).query.productOption.findFirst({
    with: { items: true },
    where: eq(productOption.id, id),
  });
export const findOptionsWithItems = (tx?: Transaction) =>
  getDBorTX(tx).query.productOption.findMany({
    with: { items: true },
  });

export const createOption = (
  data: typeof productOption.$inferInsert,
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .insert(productOption)
    .values(data)
    .returning({ id: productOption.id });
export const updateOptionById = (
  {
    data,
    id,
  }: { id: string; data: Partial<typeof productOption.$inferInsert> },
  tx?: Transaction,
) =>
  getDBorTX(tx).update(productOption).set(data).where(eq(productOption.id, id));
export const createOptionItems = (
  data: (typeof productOptionItem.$inferInsert)[],
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .insert(productOptionItem)
    .values(data)
    .returning({ id: productOptionItem.id });

export const deleteOptionById = (id: string, tx?: Transaction) =>
  getDBorTX(tx).delete(productOption).where(eq(productOption.id, id));

export const findOptionByStartedSlugWith = async (
  slug: string,
  tx?: Transaction,
) =>
  getDBorTX(tx).query.productOption.findMany({
    where: like(productOption.slug, `${slug}%`),
  });

export const updateOptionItemById = (
  {
    id,
    data,
  }: { id: string; data: Partial<typeof productOptionItem.$inferInsert> },
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .update(productOptionItem)
    .set(data)
    .where(eq(productOptionItem.id, id));

export const deleteOptionItemsByIds = (ids: string[], tx?: Transaction) =>
  getDBorTX(tx)
    .delete(productOptionItem)
    .where(inArray(productOptionItem.id, ids));
export const createProductToOptionItem = (
  data: (typeof productToOptionItem.$inferInsert)[],
  tx?: Transaction,
) => getDBorTX(tx).insert(productToOptionItem).values(data);

export const deleteProductById = (id: string, tx?: Transaction) =>
  getDBorTX(tx)
    .delete(product)
    .where(eq(product.id, id))
    .returning({ id: product.id });
