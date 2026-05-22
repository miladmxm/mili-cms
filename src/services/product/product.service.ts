import { cacheTag } from "next/cache";

import type { Transaction } from "@/repositories";

import { CacheKeys } from "@/constant/cacheKeys";
import { ThrowableDalError } from "@/dal/types";
import { OPTION_ITEM_IDS_SEPARATOR } from "@/features/product/constant";
import { convertToSlug, generateUniqueSlug } from "@/lib/slug";
import { withTransaction } from "@/repositories";
import * as productRepo from "@/repositories/product.repo";

import type { LimitAndOffset } from "../type";
import type { CreateProduct, Product, ProductStatus } from "./type";

import { checkMediaType, filterMediaIdsByTypes } from "../media";
import { DTOconvertMediaPathToRealUrl } from "../media/dto";

// * UTILS
const checkProductImage = async (thumbnailId: CreateProduct["thumbnailId"]) => {
  if (thumbnailId) {
    await checkMediaType(thumbnailId, "image");
  }
};

const fixSlugConflict = async (productSlug: string) => {
  let slug: string = convertToSlug(productSlug);
  const existingArticleBySlug =
    await productRepo.findProductByStartedSlugWith(slug);
  slug = generateUniqueSlug(
    slug,
    existingArticleBySlug.map((a) => a.slug),
  );
  return slug;
};

const verifyGalleryIds = async (galleryIds: CreateProduct["gallery"]) => {
  return await filterMediaIdsByTypes(galleryIds || [], ["image"]);
};

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

// * READ
export const getPaginationProduct = async (limitAndOffset?: LimitAndOffset) => {
  "use cache";

  cacheTag(CacheKeys.product);

  return productRepo.findProductsByLimitAndOffset(limitAndOffset);
};

export const getPublishedProducts = async (limitAndOffset?: LimitAndOffset) => {
  "use cache";

  cacheTag(CacheKeys.product);

  const products =
    await productRepo.findPublishedProductsByLimitAndOffset(limitAndOffset);
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

export const getProduct = async (id: string) => {
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
    gallery = gallery.map((img) => {
      return {
        ...img,
        url: DTOconvertMediaPathToRealUrl(img.url),
      };
    });
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
  } as unknown as Product;
};

// * CREATE

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

const updateMetadata = ({
  productData,
  metadataOptioItemIds,
  productId,
  tx,
}: {
  productData: CreateProduct;
  metadataOptioItemIds: string[];
  tx: Transaction;
  productId: string;
}) => {
  let updateMetadataIds: string[] = [];
  let addMetadataIds: string[] = [];
  let removeMetadataIds: string[] = [];
  const metadataByOptionItemIds = new Map<
    string,
    (typeof productData)["metadata"][number]
  >();

  if (productData.type === "variable") {
    const newMetadataOptionItemIds = productData.metadata.map(
      ({ optionItemIds }) => optionItemIds,
    );
    const oldMetadataOptionItemIds = metadataOptioItemIds.filter(
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
  }
};

// eslint-disable-next-line max-lines-per-function
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

  let updateMetadataIds: string[] = [];
  let addMetadataIds: string[] = [];
  let removeMetadataIds: string[] = [];
  const metadataByOptionItemIds = new Map<
    string,
    (typeof productData)["metadata"][number]
  >();

  if (productData.type === "variable") {
    const newMetadataOptionItemIds = productData.metadata.map(
      ({ optionItemIds }) => optionItemIds,
    );
    const oldMetadataOptionItemIds = product.metadataOptioItemIds.filter(
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
  }

  const metadataOptionItemIds = addMetadataIds.concat(updateMetadataIds);
  const newOptionItemIdsSet = new Set(
    metadataOptionItemIds
      .map((optionItemIds) => optionItemIds.split(OPTION_ITEM_IDS_SEPARATOR))
      .flat(),
  );
  const newOptionItemIds = Array.from(newOptionItemIdsSet);
  const oldOptionItemIdsSet = new Set(product.optionItemIds);

  const removeOptionItem = product.optionItemIds.filter(
    (id) => !newOptionItemIdsSet.has(id),
  );
  const addOptionItem = newOptionItemIds.filter(
    (id) => !oldOptionItemIdsSet.has(id),
  );
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

    // remove metadata
    await cleanupMetadata({
      oldType: product.type,
      newType: productData.type,
      tx,
      productId,
    });

    const deletMetadataPromises: ReturnType<
      typeof productRepo.deleteProductMetadataByOptionItemIds
    >[] = [];
    removeMetadataIds.forEach((id) => {
      deletMetadataPromises.push(
        productRepo.deleteProductMetadataByOptionItemIds(id, tx),
      );
    });
    await Promise.all(deletMetadataPromises);

    //update metadata
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

    //add new metadata
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

    // remove option item
    const deleteOptionItemPromises: ReturnType<
      typeof productRepo.deleteProductVariable
    >[] = [];
    removeOptionItem.forEach((optionItemId) => {
      deleteOptionItemPromises.push(
        productRepo.deleteProductVariable({ optionItemId, productId }, tx),
      );
    });
    await Promise.all(deleteOptionItemPromises);
    // add option item

    if (addOptionItem.length > 0) {
      await productRepo.createProductVariable(
        addOptionItem.map((optionItemId) => ({ optionItemId, productId })),
        tx,
      );
    }

    if (productData.type === "default") {
      const prevMetadata = await productRepo.findFirstProductMeta(
        productId,
        tx,
      );
      const metadata = { ...productData.metadata[0], productId };

      if (prevMetadata) {
        await productRepo.updateProductMetadatById(
          { id: prevMetadata.id, metadata },
          tx,
        );
      } else {
        await productRepo.createProductMetadata([metadata], tx);
      }
    }

    return (
      await productRepo.updateProductById(
        { data: productData, id: productId },
        tx,
      )
    )[0].id;
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
