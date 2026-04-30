import { cacheTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import { ThrowableDalError } from "@/dal/types";
import { OPTION_ITEM_IDS_SEPARATOR } from "@/features/product/constant";
import { convertToSlug, generateUniqueSlug } from "@/lib/slug";
import { withTransaction } from "@/repositories";
import * as productRepo from "@/repositories/product.repo";

import type { Media } from "../media/type";
import type { LimitAndOffset } from "../type";
import type { CreateProduct, Product, UpdateProduct } from "./type";

import { checkMediaType, filterMediaIdsByTypes } from "../media";
import { DTOconvertMediaPathToRealUrl } from "../media/dto";
// * READ
export const getPaginationProduct = async (limitAndOffset?: LimitAndOffset) => {
  "use cache";
  cacheTag(CacheKeys.product);

  return productRepo.findProductsByLimitAndOffset(limitAndOffset);
};
export const getAllProducts = () => productRepo.findProducts();

export const getProduct = async (id: string) => {
  "use cache";
  cacheTag(`${CacheKeys.product}-${id}`);
  const product = await productRepo.findProductById(id);
  if (!product) return product;
  const thumbnail: Media | null = product.thumbnail;
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
export const updateProduct = async (
  productId: string,
  productData: UpdateProduct,
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

    return productId;
  });
  return resultId;
};
// * DELETE

export const deleteProduct = (id: string) => {
  return productRepo.deleteProductById(id);
};
