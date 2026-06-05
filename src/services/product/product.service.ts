import { cacheTag } from "next/cache";

import type { Transaction } from "@/repositories";

import { CacheKeys } from "@/constant/cacheKeys";
import { ThrowableDalError } from "@/dal/types";
import { OPTION_ITEM_IDS_SEPARATOR } from "@/features/product/constant";
import { convertCorrectToSlug, generateUniqueSlug } from "@/lib/slug";
import { withTransaction } from "@/repositories";
import * as productRepo from "@/repositories/product.repo";

import type { LimitAndOffset } from "../type";
import type { CreateProduct, Product, ProductStatus } from "./type";

import { checkMediaType, filterMediaIdsByTypes } from "../media";
import {
  DTOconvertMediaPathToRealUrl,
  DTOconvertMediaToRealUrlMedia,
} from "../media/dto";

// * UTILS
const checkProductImage = async (thumbnailId: CreateProduct["thumbnailId"]) => {
  if (thumbnailId) {
    await checkMediaType(thumbnailId, "image");
  }
};

const fixSlugConflict = async (productSlug: string) => {
  let slug: string = convertCorrectToSlug(productSlug);
  const isHaveThisSlug = await productRepo.findProductIdBySlug(slug);

  if (!isHaveThisSlug || !isHaveThisSlug.id) {
    return slug;
  }

  const existingProductBySlug =
    await productRepo.findProductByStartedSlugWith(slug);
  slug = generateUniqueSlug(
    slug,
    existingProductBySlug.map((a) => a.slug),
  );
  return slug;
};

const verifyGalleryIds = async (galleryIds: CreateProduct["gallery"]) => {
  return await filterMediaIdsByTypes(galleryIds || [], ["image"]);
};

// * READ
export const getPaginationProduct = async (limitAndOffset?: LimitAndOffset) => {
  "use cache";

  cacheTag(CacheKeys.product);

  return productRepo.findProductsByLimitAndOffset(limitAndOffset);
};

export const getPublishedProductsWithFilter = async (
  filters: Parameters<
    typeof productRepo.findPublishedProductByFilters
  >[0]["filters"],
  limitAndOffset?: LimitAndOffset,
) => {
  "use cache";

  cacheTag(
    CacheKeys.product,
    `${CacheKeys.product}-${JSON.stringify(filters)}`,
    `${CacheKeys.product}-${JSON.stringify(limitAndOffset)}`,
  );

  const products = await productRepo.findPublishedProductByFilters({
    filters,
    config: limitAndOffset,
  });
  const normalProducts: Product[] = [];

  for (const product of products) {
    const { thumbnail } = product;

    if (thumbnail) {
      thumbnail.url = DTOconvertMediaPathToRealUrl(thumbnail.url);
    }

    normalProducts.push({ ...(product as Product), thumbnail });
  }

  return normalProducts;
};

export const getPublishedProducts = async (limitAndOffset?: LimitAndOffset) => {
  "use cache";

  cacheTag(CacheKeys.product);

  const products =
    await productRepo.findPublishedProductsByLimitAndOffset(limitAndOffset);
  await productRepo.findPublishedProductByFilters({
    filters: {
      price: { max: 4, min: 0 },
      discount: true,
      optionItems: { color: "red", size: "md" },
    },
  });
  const normalProducts: Product[] = [];

  for (const product of products) {
    const { thumbnail } = product;

    if (thumbnail) {
      thumbnail.url = DTOconvertMediaPathToRealUrl(thumbnail.url);
    }

    normalProducts.push({ ...(product as Product), thumbnail });
  }

  return normalProducts;
};

export const searchPublishedProducts = async (
  query: string,
  limitAndOffset?: LimitAndOffset,
) => {
  "use cache";

  cacheTag(CacheKeys.product, `${CacheKeys.product}-${query}`);
  const products = await productRepo.findPublishedProductsByNameSearch({
    search: query,
    config: limitAndOffset,
  });
  const normalProducts: Product[] = [];

  for (const product of products) {
    const { thumbnail } = product;

    if (thumbnail) {
      thumbnail.url = DTOconvertMediaPathToRealUrl(thumbnail.url);
    }

    normalProducts.push({ ...(product as Product), thumbnail });
  }

  return normalProducts;
};

export const getAllProducts = () => productRepo.findProducts();

export const getDiscountedProducts = async () => {
  "use cache";

  cacheTag(CacheKeys.product);
  const products = await productRepo.findDiscountedProducts();
  const normalProducts: Product[] = [];

  for (const product of products) {
    const { thumbnail } = product;

    if (thumbnail) {
      thumbnail.url = DTOconvertMediaPathToRealUrl(thumbnail.url);
    }

    normalProducts.push({ ...(product as Product), thumbnail });
  }

  return normalProducts;
};

export const getLowPriceProducts = async () => {
  "use cache";

  cacheTag(CacheKeys.product);

  const products = await productRepo.findProductsOrderByPrice({
    limit: 4,
    offset: 0,
  });
  const normalProducts: Product[] = [];

  for (const product of products) {
    const { thumbnail } = product;

    if (thumbnail) {
      thumbnail.url = DTOconvertMediaPathToRealUrl(thumbnail.url);
    }

    normalProducts.push({ ...(product as Product), thumbnail });
  }

  return normalProducts;
};

export const getProduct = async (id: string): Promise<Product | undefined> => {
  "use cache";

  cacheTag(`${CacheKeys.product}-${id}`);
  const product = await productRepo.findProductById(id);
  if (!product) return product;
  const { thumbnail } = product;

  if (thumbnail) {
    thumbnail.url = DTOconvertMediaPathToRealUrl(thumbnail.url);
  }

  let gallery = product.gallery.map(({ media }) => media);

  if (gallery && gallery.length > 0) {
    gallery = DTOconvertMediaToRealUrlMedia(gallery);
  }

  let productMetadata = product.metadata;

  if (productMetadata && productMetadata.length > 0) {
    productMetadata = productMetadata.map((meta) => {
      if (!meta.thumbnail) return meta;
      return {
        ...meta,
        thumbnail: {
          ...meta.thumbnail,
          url: DTOconvertMediaPathToRealUrl(meta.thumbnail.url),
        },
      };
    });
  }

  const variables = product.variables.map(({ optionItem }) => optionItem);
  return {
    ...product,
    thumbnail,
    gallery,
    metadata: productMetadata,
    variables,
  } as Product;
};

export const getPublishedProduct = async (
  slug: string,
): Promise<Product | undefined> => {
  "use cache";

  cacheTag(`${CacheKeys.product}-${slug}`);
  const product = await productRepo.findPublishedProductBySlug(slug);
  if (!product) return product;
  const { thumbnail } = product;

  if (thumbnail) {
    thumbnail.url = DTOconvertMediaPathToRealUrl(thumbnail.url);
  }

  let gallery = product.gallery.map(({ media }) => media);

  if (gallery && gallery.length > 0) {
    gallery = DTOconvertMediaToRealUrlMedia(gallery);
  }

  let productMetadata = product.metadata;

  if (productMetadata && productMetadata.length > 0) {
    productMetadata = productMetadata.map((meta) => {
      if (!meta.thumbnail) return meta;
      return {
        ...meta,
        thumbnail: {
          ...meta.thumbnail,
          url: DTOconvertMediaPathToRealUrl(meta.thumbnail.url),
        },
      };
    });
  }

  const variables = product.variables.map(({ optionItem }) => optionItem);
  return {
    ...product,
    thumbnail,
    gallery,
    metadata: productMetadata,
    variables,
  } as Product;
};
// * CREATE

const addProductCategories = async ({
  categoryIds,
  productId,
  tx,
}: {
  categoryIds: CreateProduct["categoryIds"];
  tx: Transaction;
  productId: string;
}) => {
  const categories = await productRepo.findCategoriesByIds(categoryIds, tx);
  if (categories.length)
    await productRepo.addProductToCategories(
      categories.map(({ id }) => ({ categoryId: id, productId })),
      tx,
    );
};

const createProductAndReturnId = async ({
  productData,
  tx,
}: {
  productData: CreateProduct;
  tx: Transaction;
}) => {
  const slug = await fixSlugConflict(productData.slug);
  const product = (
    await productRepo.createProduct({ ...productData, slug }, tx)
  )[0];
  if (!product)
    throw new ThrowableDalError({
      type: "unknown-error",
      error: { message: "DB error to create product" },
    });
  return product.id;
};

const createProductVariables = async ({
  productData,
  productId,
  tx,
}: {
  productData: CreateProduct;
  tx: Transaction;
  productId: string;
}) => {
  if (productData.type === "variable") {
    const optionIds = Array.from(
      new Set(
        productData.metadata
          .map(({ optionItemIds }) =>
            optionItemIds.split(OPTION_ITEM_IDS_SEPARATOR),
          )
          .flat(),
      ),
    );

    await productRepo.createProductVariable(
      optionIds.map((id) => ({ optionItemId: id, productId })),
      tx,
    );
  }
};

const createProductMetadata = async ({
  metadata,
  productId,
  tx,
}: {
  tx: Transaction;
  productId: string;
  metadata: CreateProduct["metadata"];
}) => {
  await productRepo.createProductMetadata(
    metadata.map((metadataItem) => ({
      ...metadataItem,
      productId,
    })),
    tx,
  );
};

const createProductGallery = async ({
  galleryIds,
  productId,
  tx,
}: {
  galleryIds: CreateProduct["gallery"];
  productId: string;
  tx: Transaction;
}) => {
  const filteredGalleryByAcceptionType = await verifyGalleryIds(galleryIds);

  if (filteredGalleryByAcceptionType.length > 0) {
    await productRepo.addMediaToProductGallery(
      filteredGalleryByAcceptionType.map((mediaId) => ({
        mediaId,
        productId,
      })),
      tx,
    );
  }
};

const createProductOptionItems = async ({
  optionItemIds,
  productId,
  tx,
}: {
  productId: string;
  tx: Transaction;
  optionItemIds: CreateProduct["optionItemIds"];
}) => {
  if (optionItemIds.length > 0) {
    await productRepo.addProductToProductOptionItem(
      optionItemIds.map((optionItemId) => ({ optionItemId, productId })),
      tx,
    );
  }
};

export const createProduct = async (productData: CreateProduct) => {
  await checkProductImage(productData.thumbnailId);

  const resultId = await withTransaction(async (tx) => {
    const productId = await createProductAndReturnId({ productData, tx });

    await addProductCategories({
      categoryIds: productData.categoryIds,
      tx,
      productId,
    });

    await createProductMetadata({
      metadata: productData.metadata,
      productId,
      tx,
    });

    await createProductVariables({ productData, productId, tx });

    await createProductGallery({
      galleryIds: productData.gallery,
      productId,
      tx,
    });
    await createProductOptionItems({
      optionItemIds: productData.optionItemIds,
      productId,
      tx,
    });
    return productId;
  });
  return resultId;
};

// * UPDATE
const deleteProductCategory = async ({
  categoryIds,
  productId,
  tx,
}: {
  categoryIds: string[];
  tx: Transaction;
  productId: string;
}) => {
  const deletCategoryPromises: ReturnType<
    typeof productRepo.deleteProductToCategories
  >[] = [];
  categoryIds.forEach((id) => {
    deletCategoryPromises.push(
      productRepo.deleteProductToCategories({ productId, categoryId: id }, tx),
    );
  });
  await Promise.all(deletCategoryPromises);
};

const updateProductCategory = async ({
  newCategoryIds,
  oldCategoryIds,
  productId,
  tx,
}: {
  oldCategoryIds: string[];
  newCategoryIds: string[];
  productId: string;
  tx: Transaction;
}) => {
  const prevCategoryIdsSet = new Set(oldCategoryIds);
  const newCategoryIdsSet = new Set(newCategoryIds);
  const addCategoryIds = newCategoryIds.filter(
    (id) => !prevCategoryIdsSet.has(id),
  );
  const removeCategoryIds = oldCategoryIds.filter(
    (id) => !newCategoryIdsSet.has(id),
  );

  await deleteProductCategory({
    categoryIds: removeCategoryIds,
    productId,
    tx,
  });

  await addProductCategories({ categoryIds: addCategoryIds, productId, tx });
};

const deleteProductOptionItem = async ({
  optionItemIds,
  productId,
  tx,
}: {
  optionItemIds: string[];
  productId: string;
  tx: Transaction;
}) => {
  const deletOptionItemPromises: ReturnType<
    (typeof productRepo)["deleteProductToOptionItem"]
  >[] = [];
  optionItemIds.forEach((optionItemId) => {
    deletOptionItemPromises.push(
      productRepo.deleteProductToOptionItem({ productId, optionItemId }, tx),
    );
  });
  await Promise.all(deletOptionItemPromises);
};

const updateProductOptionIte = async ({
  newOptionItemIds,
  oldOptionItemIds,
  productId,
  tx,
}: {
  newOptionItemIds: string[];
  oldOptionItemIds: string[];
  productId: string;
  tx: Transaction;
}) => {
  const prevOptionItemIdsSet = new Set(oldOptionItemIds);
  const newOptionItemIdsSet = new Set(newOptionItemIds);
  const addOptionItemIds = newOptionItemIds.filter(
    (id) => !prevOptionItemIdsSet.has(id),
  );
  const removeOptionItemIds = oldOptionItemIds.filter(
    (id) => !newOptionItemIdsSet.has(id),
  );

  await deleteProductOptionItem({
    optionItemIds: removeOptionItemIds,
    productId,
    tx,
  });

  await createProductOptionItems({
    optionItemIds: addOptionItemIds,
    productId,
    tx,
  });
};

const removeProductGallery = async ({
  galleryIds,
  productId,
  tx,
}: {
  galleryIds: string[];
  productId: string;
  tx: Transaction;
}) => {
  const deletGalleryPromises: ReturnType<
    typeof productRepo.deleteMediaToProductGallery
  >[] = [];
  galleryIds.forEach((id) => {
    deletGalleryPromises.push(
      productRepo.deleteMediaToProductGallery({ productId, mediaId: id }, tx),
    );
  });
  await Promise.all(deletGalleryPromises);
};

const updateProductGallery = async ({
  newGalleryIds,
  oldGalleryIds,
  productId,
  tx,
}: {
  oldGalleryIds: string[];
  newGalleryIds?: string[];
  tx: Transaction;
  productId: string;
}) => {
  const prevGalleryIdsSet = new Set(oldGalleryIds);
  const newGalleryIdsSet = new Set(newGalleryIds);
  const addGalleryIds = newGalleryIds?.filter(
    (id) => !prevGalleryIdsSet.has(id),
  );
  const removeGalleryIds = oldGalleryIds.filter(
    (id) => !newGalleryIdsSet.has(id),
  );

  await removeProductGallery({ galleryIds: removeGalleryIds, productId, tx });

  await createProductGallery({ galleryIds: addGalleryIds, productId, tx });
};

const cleanupMetadata = async ({
  productId,
  tx,
  oldType,
  newType,
}: {
  tx: Transaction;
  productId: string;
  oldType: Product["type"];
  newType: CreateProduct["type"];
}) => {
  if (oldType !== newType) {
    await productRepo.deleteAllProductMetadataByProductId(productId, tx);
    await productRepo.deleteAllProductVariablesByProductId(productId, tx);
  }
};

const updateDefaultTypeMetadata = async ({
  metadata,
  tx,
  productId,
}: {
  metadata: CreateProduct["metadata"];
  productId: string;
  tx: Transaction;
}) => {
  const prevMetadata = await productRepo.findFirstProductMeta(productId, tx);
  const newMetadata = { ...metadata[0], productId };

  if (prevMetadata) {
    await productRepo.updateProductMetadatById(
      { id: prevMetadata.id, metadata: newMetadata },
      tx,
    );
  } else {
    await productRepo.createProductMetadata([newMetadata], tx);
  }
};

type MetadataMapByOptionItemIds = Map<
  string,
  CreateProduct["metadata"][number]
>;

const createMetadataInUpdateProduct = async ({
  addMetadataIds,
  metadataByOptionItemIds,
  productId,
  tx,
}: {
  addMetadataIds: string[];
  metadataByOptionItemIds: MetadataMapByOptionItemIds;
  productId: string;
  tx: Transaction;
}) => {
  const addMetadata: Parameters<
    (typeof productRepo)["createProductMetadata"]
  >[0] = [];

  for (const id of addMetadataIds) {
    const metadata = metadataByOptionItemIds.get(id);

    if (metadata) {
      addMetadata.push({ ...metadata, productId });
    }
  }

  if (addMetadata.length > 0) {
    await productRepo.createProductMetadata(addMetadata, tx);
  }
};

const updateMetadataToNewData = async ({
  updateMetadataIds,
  metadataByOptionItemIds,
  productId,
  tx,
}: {
  updateMetadataIds: string[];
  metadataByOptionItemIds: MetadataMapByOptionItemIds;
  productId: string;
  tx: Transaction;
}) => {
  const updateMetadataPromises: ReturnType<
    typeof productRepo.updateProductMetadataByOptionItemIds
  >[] = [];

  for (const id of updateMetadataIds) {
    const metadata = metadataByOptionItemIds.get(id);

    if (metadata) {
      updateMetadataPromises.push(
        productRepo.updateProductMetadataByOptionItemIds(
          {
            ...metadata,
            productId,
          },
          tx,
        ),
      );
    }
  }

  await Promise.all(updateMetadataPromises);
};

const deleteMetadata = async ({
  removeMetadataIds,
  tx,
}: {
  removeMetadataIds: string[];
  tx: Transaction;
}) => {
  const deletMetadataPromises: ReturnType<
    typeof productRepo.deleteProductMetadataByOptionItemIds
  >[] = [];
  removeMetadataIds.forEach((id) => {
    deletMetadataPromises.push(
      productRepo.deleteProductMetadataByOptionItemIds(id, tx),
    );
  });
  await Promise.all(deletMetadataPromises);
};

const getDifferenceBetweenOldAndNewMetadata = ({
  productData,
  oldMetadataOptioItemIds,
}: {
  productData: CreateProduct;
  oldMetadataOptioItemIds: (string | null)[];
}) => {
  let updateMetadataIds: string[] = [];
  let addMetadataIds: string[] = [];
  let removeMetadataIds: string[] = [];
  const metadataByOptionItemIds: MetadataMapByOptionItemIds = new Map();
  if (productData.type === "default")
    return {
      removeMetadataIds,
      addMetadataIds,
      updateMetadataIds,
      metadataByOptionItemIds: new Map(),
    };

  const newMetadataOptionItemIds = productData.metadata.map(
    ({ optionItemIds }) => optionItemIds,
  );
  const oldMetadataOptionItemIds = oldMetadataOptioItemIds.filter(
    (id) => id !== null,
  );
  const prevMetadataIdsSet = new Set(oldMetadataOptionItemIds);
  const newMetadataIdsSet = new Set(newMetadataOptionItemIds);

  updateMetadataIds = oldMetadataOptionItemIds.filter((id) =>
    newMetadataIdsSet.has(id),
  );

  addMetadataIds = newMetadataOptionItemIds.filter(
    (id) => !prevMetadataIdsSet.has(id),
  );

  removeMetadataIds = oldMetadataOptionItemIds.filter(
    (id) => !newMetadataIdsSet.has(id),
  );

  for (const metadata of productData.metadata) {
    metadataByOptionItemIds.set(metadata.optionItemIds, metadata);
  }

  return {
    removeMetadataIds,
    addMetadataIds,
    updateMetadataIds,
    metadataByOptionItemIds,
  };
};

const updateMetadata = async ({
  productData,
  oldMetadataOptioItemIds,
  productId,
  tx,
}: {
  productData: CreateProduct;
  oldMetadataOptioItemIds: (string | null)[];
  tx: Transaction;
  productId: string;
}) => {
  const {
    addMetadataIds,
    metadataByOptionItemIds,
    removeMetadataIds,
    updateMetadataIds,
  } = getDifferenceBetweenOldAndNewMetadata({
    oldMetadataOptioItemIds,
    productData,
  });

  await deleteMetadata({ removeMetadataIds, tx });

  await updateMetadataToNewData({
    metadataByOptionItemIds,
    productId,
    tx,
    updateMetadataIds,
  });

  await createMetadataInUpdateProduct({
    addMetadataIds,
    metadataByOptionItemIds,
    productId,
    tx,
  });

  if (productData.type === "default") {
    await updateDefaultTypeMetadata({
      metadata: productData.metadata,
      productId,
      tx,
    });
  }

  const metadataOptionItemIds = addMetadataIds.concat(updateMetadataIds);
  return metadataOptionItemIds;
};

const updateProductVariables = async ({
  metadataOptionItemIds,
  oldOptionItemIds,
  productId,
  tx,
}: {
  metadataOptionItemIds: string[];
  oldOptionItemIds: string[];
  tx: Transaction;
  productId: string;
}) => {
  const newOptionItemIdsSet = new Set(
    metadataOptionItemIds
      .map((optionItemIds) => optionItemIds.split(OPTION_ITEM_IDS_SEPARATOR))
      .flat(),
  );
  const newOptionItemIds = Array.from(newOptionItemIdsSet);
  const oldOptionItemIdsSet = new Set(oldOptionItemIds);

  const removeOptionItem = oldOptionItemIds.filter(
    (id) => !newOptionItemIdsSet.has(id),
  );
  const addOptionItem = newOptionItemIds.filter(
    (id) => !oldOptionItemIdsSet.has(id),
  );

  const deleteOptionItemPromises: ReturnType<
    typeof productRepo.deleteProductVariable
  >[] = [];
  removeOptionItem.forEach((optionItemId) => {
    deleteOptionItemPromises.push(
      productRepo.deleteProductVariable({ optionItemId, productId }, tx),
    );
  });
  await Promise.all(deleteOptionItemPromises);

  if (addOptionItem.length > 0) {
    await productRepo.createProductVariable(
      addOptionItem.map((optionItemId) => ({ optionItemId, productId })),
      tx,
    );
  }
};

const updateProductAndReturnId = async ({
  oldSlug,
  productData,
  productId,
  tx,
}: {
  oldSlug: string;
  productData: CreateProduct;
  productId: string;
  tx: Transaction;
}) => {
  let { slug } = productData;

  if (oldSlug !== slug) {
    slug = await fixSlugConflict(productData.slug);
  }

  const resultId = (
    await productRepo.updateProductById(
      { data: { ...productData, slug }, id: productId },
      tx,
    )
  )[0];
  if (!resultId || !resultId.id)
    throw new ThrowableDalError({
      type: "unknown-error",
      error: "can not update product",
    });
  return resultId.id;
};

export const updateProduct = async (
  productId: string,
  productData: CreateProduct,
) => {
  const product = await productRepo.findProductByIdForUpdate(productId);
  if (!product)
    throw new ThrowableDalError({
      type: "not-found",
    });

  await checkProductImage(productData.thumbnailId);

  const resultId = await withTransaction(async (tx) => {
    await updateProductCategory({
      newCategoryIds: productData.categoryIds,
      oldCategoryIds: product.categoryIds,
      productId,
      tx,
    });

    await updateProductGallery({
      oldGalleryIds: product.galleryIds,
      newGalleryIds: productData.gallery,
      productId,
      tx,
    });
    await updateProductOptionIte({
      newOptionItemIds: productData.optionItemIds,
      oldOptionItemIds: product.optionItemIds,
      productId,
      tx,
    });
    await cleanupMetadata({
      oldType: product.type,
      newType: productData.type,
      tx,
      productId,
    });
    const currentOptionItemIds = await updateMetadata({
      oldMetadataOptioItemIds: product.metadataOptioItemIds,
      productData,
      productId,
      tx,
    });

    await updateProductVariables({
      metadataOptionItemIds: currentOptionItemIds,
      oldOptionItemIds: product.variableOptionItemIds,
      productId,
      tx,
    });
    return await updateProductAndReturnId({
      oldSlug: product.slug,
      productData,
      productId,
      tx,
    });
  });
  return resultId;
};

export const updateProductStatus = async (
  id: string,
  status: ProductStatus,
) => {
  return productRepo.updateProductPartialDataById({ id, data: { status } });
};

// * DELETE

export const deleteProduct = (id: string) => {
  return productRepo.deleteProductById(id);
};
