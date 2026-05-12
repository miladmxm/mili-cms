import { cacheTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import { ThrowableDalError } from "@/dal/types";
import { OPTION_ITEM_IDS_SEPARATOR } from "@/features/product/constant";
import { convertToSlug, generateUniqueSlug } from "@/lib/slug";
import { withTransaction } from "@/repositories";
import * as productRepo from "@/repositories/product.repo";

import type { LimitAndOffset } from "../type";
import type { CreateProduct, Product } from "./type";

import { checkMediaType, filterMediaIdsByTypes } from "../media";
import { DTOconvertMediaPathToRealUrl } from "../media/dto";

// * READ
export const getPaginationProduct = async (limitAndOffset?: LimitAndOffset) => {
  "use cache";

  cacheTag(CacheKeys.product);

  return productRepo.findProductsByLimitAndOffset(limitAndOffset);
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

// export const getLowPriceProducts = async () => {};

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

  const optionItems = product.optionItems.map(({ optionItem }) => optionItem);
  return {
    ...product,
    thumbnail,
    gallery,
    metadata: productMetadata,
    optionItems,
  } as unknown as Product;
};

// * CREATE

export const createProduct = async (productData: CreateProduct) => {
  if (productData.thumbnailId) {
    await checkMediaType(productData.thumbnailId, "image");
  }

  const categories = await productRepo.findCategoriesByIds(
    productData.categoryIds,
  );
  let slug: string = convertToSlug(productData.slug);
  const existingArticleBySlug =
    await productRepo.findProductByStartedSlugWith(slug);
  slug = generateUniqueSlug(
    slug,
    existingArticleBySlug.map((a) => a.slug),
  );
  const filteredGalleryByAcceptionType = await filterMediaIdsByTypes(
    productData.gallery || [],
    ["image"],
  );
  const resultId = await withTransaction(async (tx) => {
    const product = (
      await productRepo.createProduct({ ...productData, slug }, tx)
    )[0];
    if (!product) throw new Error("DB error to create article");
    if (categories.length)
      await productRepo.addProductToCategories(
        categories.map(({ id }) => ({ categoryId: id, productId: product.id })),
        tx,
      );
    await productRepo.createProductMetadata(
      productData.metadata.map((metadata) => ({
        ...metadata,
        productId: product.id,
      })),
      tx,
    );

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

      await productRepo.createProductToOptionItem(
        optionIds.map((id) => ({ optionItemId: id, productId: product.id })),
        tx,
      );
    }
    if (filteredGalleryByAcceptionType.length > 0) {
      await productRepo.addMediaToProductGallery(
        filteredGalleryByAcceptionType.map((mediaId) => ({
          mediaId,
          productId: product.id,
        })),
        tx,
      );
    }

    return product;
  });
  return resultId;
};

// * UPDATE
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

  if (productData.thumbnailId) {
    await checkMediaType(productData.thumbnailId, "image");
  }

  const prevCategoryIdsSet = new Set(product.categoryIds);
  const newCategoryIdsSet = new Set(productData.categoryIds);
  const addCategoryIds = productData.categoryIds.filter(
    (id) => !prevCategoryIdsSet.has(id),
  );
  const removeCategoryIds = product.categoryIds.filter(
    (id) => !newCategoryIdsSet.has(id),
  );

  const prevGalleryIdsSet = new Set(product.galleryIds);
  const newGalleryIdsSet = new Set(productData.gallery);
  const addGalleryIds = productData.gallery?.filter(
    (id) => !prevGalleryIdsSet.has(id),
  );
  const removeGalleryIds = product.galleryIds.filter(
    (id) => !newGalleryIdsSet.has(id),
  );
  const filteredGalleryByAcceptionType = await filterMediaIdsByTypes(
    addGalleryIds || [],
    ["image"],
  );

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
    // delete category
    const deletCategoryPromises: ReturnType<
      typeof productRepo.deleteProductToCategories
    >[] = [];
    removeCategoryIds.forEach((id) => {
      deletCategoryPromises.push(
        productRepo.deleteProductToCategories(
          { productId, categoryId: id },
          tx,
        ),
      );
    });
    await Promise.all(deletCategoryPromises);

    // add category
    if (addCategoryIds.length)
      await productRepo.addProductToCategories(
        addCategoryIds.map((id) => ({ categoryId: id, productId: product.id })),
        tx,
      );

    // remove gallery item
    const deletGalleryPromises: ReturnType<
      typeof productRepo.deleteMediaToProductGallery
    >[] = [];
    removeGalleryIds.forEach((id) => {
      deletGalleryPromises.push(
        productRepo.deleteMediaToProductGallery({ productId, mediaId: id }, tx),
      );
    });
    await Promise.all(deletGalleryPromises);

    if (filteredGalleryByAcceptionType.length > 0) {
      await productRepo.addMediaToProductGallery(
        filteredGalleryByAcceptionType.map((mediaId) => ({
          mediaId,
          productId: product.id,
        })),
        tx,
      );
    }

    // remove metadata
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
      typeof productRepo.deleteProductToOptionItem
    >[] = [];
    removeOptionItem.forEach((optionItemId) => {
      deleteOptionItemPromises.push(
        productRepo.deleteProductToOptionItem({ optionItemId, productId }, tx),
      );
    });
    await Promise.all(deleteOptionItemPromises);
    // add option item

    if (addOptionItem.length > 0) {
      await productRepo.createProductToOptionItem(
        addOptionItem.map((optionItemId) => ({ optionItemId, productId })),
        tx,
      );
    }
    if (productData.type === "default") {
      if (product.type === "variable") {
        await productRepo.deleteAllProductToOptionItemByProductId(
          productId,
          tx,
        );
        await productRepo.deleteAllProductMetadataByProductId(productId, tx);
      }

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
// * DELETE

export const deleteProduct = (id: string) => {
  return productRepo.deleteProductById(id);
};
