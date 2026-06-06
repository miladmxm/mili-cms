import type { SQL } from "drizzle-orm";

import {
  and,
  asc,
  between,
  desc,
  eq,
  exists,
  ilike,
  inArray,
  like,
  ne,
  sql,
} from "drizzle-orm";

import type { OffsetLimit } from "@/types/repo";

import {
  product,
  productCategory,
  productGallery,
  productMeta,
  productToCategory,
  productToOptionItem,
  productVariables,
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
      variables: {
        with: { optionItem: true },
      },
      optionItems: { with: { optionItem: true } },
      metadata: { with: { thumbnail: true } },
    },
  });
  if (!findedProduct) return findedProduct;
  const optionItems = findedProduct.optionItems.map(
    ({ optionItem }) => optionItem,
  );
  const categoryIds = findedProduct.categories.map(
    ({ categoryId }) => categoryId,
  );
  return {
    ...findedProduct,
    categoryIds,
    optionItems,
  };
};

export const findPublishedProductBySlug = async (
  slug: string,
  tx?: Transaction,
) => {
  const findedProduct = await getDBorTX(tx).query.product.findFirst({
    where: and(eq(product.slug, slug), eq(product.status, "published")),
    with: {
      categories: { columns: { categoryId: true } },
      thumbnail: true,
      gallery: { with: { media: true } },
      variables: {
        with: { optionItem: { with: { option: true } } },
      },
      optionItems: { with: { optionItem: true } },
      metadata: { with: { thumbnail: true } },
    },
  });
  if (!findedProduct) return findedProduct;
  const optionItems = findedProduct.optionItems.map(
    ({ optionItem }) => optionItem,
  );
  const categoryIds = findedProduct.categories.map(
    ({ categoryId }) => categoryId,
  );
  return {
    ...findedProduct,
    categoryIds,
    optionItems,
  };
};

export const findDiscountedProducts = async (
  options?: OffsetLimit,
  tx?: Transaction,
) => {
  const productMetas = await getDBorTX(tx).query.productMeta.findMany({
    where: ne(productMeta.discount, 0),
    columns: { productId: true },
  });
  const productIds = Array.from(
    new Set<string>(productMetas.map(({ productId }) => productId)),
  );
  return getDBorTX(tx).query.product.findMany({
    where: and(
      inArray(product.id, productIds),
      eq(product.status, "published"),
    ),
    orderBy: desc(product.updatedAt),
    with: { thumbnail: true, metadata: true },
    limit: options?.limit,
    offset: options?.offset,
  });
};

export const findPublishedProductsByNameSearch = (
  { search, config }: { search: string; config?: OffsetLimit },
  tx?: Transaction,
) =>
  getDBorTX(tx).query.product.findMany({
    offset: config?.offset,
    limit: config?.limit,
    where: and(
      eq(product.status, "published"),
      ilike(product.name, `%${search}%`),
    ),
    with: { thumbnail: true },
    columns: { createdAt: true, slug: true, name: true },
  });

const removeDuplicationProductIds = (
  products: {
    productId: string;
  }[],
  limit?: number,
) => {
  const removeDuplication = new Set<string>();
  const productIds = products
    .filter(({ productId }) => {
      if (!removeDuplication.has(productId)) {
        if (limit && limit <= removeDuplication.size) return false;
        removeDuplication.add(productId);
        return true;
      }

      return false;
    })
    .map(({ productId }) => productId);
  return productIds;
};

export const findProductsOrderByPrice = async (
  options?: OffsetLimit,
  tx?: Transaction,
) => {
  const productMetas = await getDBorTX(tx).query.productMeta.findMany({
    orderBy: asc(productMeta.price),
    columns: { productId: true },
  });
  const productIds = removeDuplicationProductIds(productMetas, options?.limit);
  return getDBorTX(tx).query.product.findMany({
    where: and(
      inArray(product.id, productIds),
      eq(product.status, "published"),
    ),
    orderBy: desc(product.updatedAt),
    with: { thumbnail: true, metadata: true },
    limit: options?.limit,
    offset: options?.offset,
  });
};

export const findProductByIdForUpdate = async (
  id: string,
  tx?: Transaction,
) => {
  const findedProduct = await getDBorTX(tx).query.product.findFirst({
    where: eq(product.id, id),
    with: {
      categories: { columns: { categoryId: true } },
      optionItems: { columns: { optionItemId: true } },
      gallery: { columns: { mediaId: true } },
      variables: {
        columns: { optionItemId: true },
      },
      metadata: { columns: { optionItemIds: true } },
    },
  });
  if (!findedProduct) return findedProduct;
  const categoryIds = findedProduct.categories.map(
    ({ categoryId }) => categoryId,
  );
  const optionItemIds = findedProduct.optionItems.map(
    ({ optionItemId }) => optionItemId,
  );
  const galleryIds = findedProduct.gallery.map(({ mediaId }) => mediaId);
  const metadataOptioItemIds = findedProduct.metadata.map(
    ({ optionItemIds: variableOptionItemIds }) => variableOptionItemIds,
  );
  const variableOptionItemIds = findedProduct.variables.map(
    ({ optionItemId: variableOptionItemId }) => variableOptionItemId,
  );
  return {
    ...findedProduct,
    galleryIds,
    categoryIds,
    metadataOptioItemIds,
    variableOptionItemIds,
    optionItemIds,
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

const findRecersiveCategoryIdsBySlug = async (
  slug: string,
  tx?: Transaction,
): Promise<string[]> => {
  const result = await getDBorTX(tx).execute(sql`
    WITH RECURSIVE category_tree AS (
      SELECT id
      FROM product_category
      WHERE slug = ${slug}

      UNION ALL

      SELECT c.id
      FROM product_category c
      INNER JOIN category_tree ct
        ON c.parent_id = ct.id
    )
    SELECT id
    FROM category_tree
  `);
  return result.rows.map((row) => row.id as string);
};

interface Filters {
  price?: { min: number; max: number };
  optionItems?: Record<string, string>;
  discount?: boolean;
  categorySlug?: string;
}

export const findPublishedProductByFilters = async (
  {
    filters,
    config,
  }: {
    filters: Filters;
    config?: OffsetLimit;
  },
  tx?: Transaction,
) => {
  const conditions: SQL<unknown>[] = [];

  if (filters.categorySlug) {
    const categoryIds = await findRecersiveCategoryIdsBySlug(
      filters.categorySlug,
      tx,
    );
    const categoryCondition = exists(
      getDBorTX(tx)
        .select()
        .from(productToCategory)
        .where(
          and(
            eq(productToCategory.productId, product.id),
            inArray(productToCategory.categoryId, categoryIds),
          ),
        ),
    );
    conditions.push(categoryCondition);
  }
  if (filters.discount || filters.price) {
    let where: SQL | undefined;

    if (filters.discount) {
      where = and(
        eq(productMeta.productId, product.id),
        ne(productMeta.discount, 0),
      );
    }

    if (filters.price) {
      where = and(
        eq(productMeta.productId, product.id),
        between(productMeta.price, filters.price.min, filters.price.max),
      );
    }

    if (filters.price && filters.discount) {
      where = and(
        eq(productMeta.productId, product.id),
        between(productMeta.price, filters.price.min, filters.price.max),
        ne(productMeta.discount, 0),
      );
    }

    conditions.push(
      exists(getDBorTX(tx).select().from(productMeta).where(where)),
    );
  }
  if (filters.optionItems) {
    if (filters.optionItems) {
      for (const [slug, value] of Object.entries(filters.optionItems)) {
        conditions.push(
          exists(
            getDBorTX(tx)
              .select({ id: productToOptionItem.productId })
              .from(productToOptionItem)
              .innerJoin(
                productOptionItem,
                eq(productOptionItem.id, productToOptionItem.optionItemId),
              )
              .innerJoin(
                productOption,
                eq(productOption.id, productOptionItem.optionId),
              )
              .where(
                and(
                  eq(productToOptionItem.productId, product.id),
                  eq(productOption.slug, slug),
                  eq(productOptionItem.value, value),
                ),
              ),
          ),
        );
      }
    }
  }

  const filteredProducts = await getDBorTX(tx)
    .select({ id: product.id })
    .from(product)
    .where(and(...conditions));
  const productIds = filteredProducts.map(({ id }) => id);

  if (productIds.length === 0) {
    return [];
  }

  return getDBorTX(tx).query.product.findMany({
    where: and(
      eq(product.status, "published"),
      inArray(product.id, productIds),
    ),
    with: { thumbnail: true, metadata: true },
    offset: config?.offset,
    limit: config?.limit,
    orderBy: [desc(product.createdAt)],
  });
};

export const findPublishedProductsByLimitAndOffset = (
  options?: OffsetLimit,
  tx?: Transaction,
) =>
  getDBorTX(tx).query.product.findMany({
    where: eq(product.status, "published"),
    with: { thumbnail: true, metadata: true },
    offset: options?.offset,
    limit: options?.limit,
    orderBy: [desc(product.createdAt)],
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
      variables: true,
      metadata: true,
      rates: true,
      thumbnail: true,
    },
  });

export const findProductIdBySlug = async (slug: string, tx?: Transaction) =>
  getDBorTX(tx).query.product.findFirst({
    where: eq(product.slug, slug),
    columns: { id: true },
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

export const updateProductById = (
  { data, id }: { id: string; data: typeof product.$inferInsert },
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .update(product)
    .set(data)
    .where(eq(product.id, id))
    .returning({ id: product.id });

export const updateProductPartialDataById = (
  { data, id }: { id: string; data: Partial<typeof product.$inferInsert> },
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .update(product)
    .set(data)
    .where(eq(product.id, id))
    .returning({ id: product.id });

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
export const deleteProductToOptionItem = (
  { optionItemId, productId }: typeof productToOptionItem.$inferInsert,
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .delete(productToOptionItem)
    .where(
      and(
        eq(productToOptionItem.optionItemId, optionItemId),
        eq(productToOptionItem.productId, productId),
      ),
    );

export const createProductMetadata = (
  metadata: (typeof productMeta.$inferInsert)[],
  tx?: Transaction,
) => getDBorTX(tx).insert(productMeta).values(metadata);

export const findFirstProductMeta = (productId: string, tx?: Transaction) =>
  getDBorTX(tx).query.productMeta.findFirst({
    where: eq(productMeta.productId, productId),
  });

export const updateProductMetadatById = (
  { id, metadata }: { id: string; metadata: typeof productMeta.$inferInsert },
  tx?: Transaction,
) =>
  getDBorTX(tx).update(productMeta).set(metadata).where(eq(productMeta.id, id));

export const deleteProductMetadataByOptionItemIds = (
  optionItemIds: string,
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .delete(productMeta)
    .where(eq(productMeta.optionItemIds, optionItemIds));

export const deleteAllProductMetadataByProductId = (
  productId: string,
  tx?: Transaction,
) =>
  getDBorTX(tx).delete(productMeta).where(eq(productMeta.productId, productId));

export const updateProductMetadataByOptionItemIds = (
  metadata: typeof productMeta.$inferInsert,
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .update(productMeta)
    .set(metadata)
    .where(eq(productMeta.optionItemIds, metadata.optionItemIds || ""));

export const addMediaToProductGallery = (
  data: (typeof productGallery.$inferInsert)[],
  tx?: Transaction,
) => getDBorTX(tx).insert(productGallery).values(data);

export const addProductToProductOptionItem = (
  data: (typeof productToOptionItem.$inferInsert)[],
  tx?: Transaction,
) => getDBorTX(tx).insert(productToOptionItem).values(data);

export const deleteMediaToProductGallery = (
  { mediaId, productId }: typeof productGallery.$inferInsert,
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .delete(productGallery)
    .where(
      and(
        eq(productGallery.mediaId, mediaId),
        eq(productGallery.productId, productId),
      ),
    );

export const createCategory = (
  data: typeof productCategory.$inferInsert,
  tx?: Transaction,
) => getDBorTX(tx).insert(productCategory).values(data).returning();

export const findCategories = async (tx?: Transaction) => {
  const categories = await getDBorTX(tx).query.productCategory.findMany({
    with: {
      thumbnail: { columns: { url: true, meta: true } },
      vector: { columns: { url: true, meta: true } },
    },
    orderBy: [desc(productCategory.createdAt)],
  });
  return categories;
};

export const findCategoryBySlugWithThumbnail = async (
  slug: string,
  tx?: Transaction,
) =>
  getDBorTX(tx).query.productCategory.findFirst({
    where: eq(productCategory.slug, slug),
    with: { thumbnail: true },
  });

export const findCategoryByStartedSlugWith = async (
  slug: string,
  tx?: Transaction,
) =>
  getDBorTX(tx).query.productCategory.findMany({
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
export const findOptions = (tx?: Transaction) =>
  getDBorTX(tx).query.productOption.findMany();

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

export const createProductVariable = (
  data: (typeof productVariables.$inferInsert)[],
  tx?: Transaction,
) => getDBorTX(tx).insert(productVariables).values(data).onConflictDoNothing();

export const deleteProductVariable = (
  { optionItemId, productId }: typeof productVariables.$inferInsert,
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .delete(productVariables)
    .where(
      and(
        eq(productVariables.productId, productId),
        eq(productVariables.optionItemId, optionItemId),
      ),
    );

export const deleteAllProductVariablesByProductId = (
  productId: string,
  tx?: Transaction,
) =>
  getDBorTX(tx)
    .delete(productVariables)
    .where(eq(productVariables.productId, productId));

export const deleteProductById = (id: string, tx?: Transaction) =>
  getDBorTX(tx)
    .delete(product)
    .where(eq(product.id, id))
    .returning({ id: product.id });
