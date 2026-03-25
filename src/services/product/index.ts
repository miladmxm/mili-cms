import { convertToSlug, generateUniqueSlug } from "@/lib/slug";
import { withTransaction } from "@/repositories";
import * as productRepo from "@/repositories/product.repo";

import type { CreateProduct } from "./type";

import { checkMediaType, filterMediaIdsByTypes } from "../media";
// * READ
export const getAllProducts = () => productRepo.findProducts();

// * CREATE

export const createProduct = async (productData: CreateProduct) => {
  if (productData.thumbnail) {
    await checkMediaType(productData.thumbnail, "image");
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

// * DELETE
