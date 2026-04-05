import { cacheTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import { convertToSlug, generateUniqueSlug } from "@/lib/slug";
import { withTransaction } from "@/repositories";
import * as productRepo from "@/repositories/product.repo";

import type { CreateOption } from "./type";

// * READ
export const getOptionsWithItems = async () => {
  "use cache";
  cacheTag(CacheKeys.productOption);

  return productRepo.findOptionsWithItems();
};

// * CREATE

export const createOption = async (optionData: CreateOption) => {
  const { items, name, description } = optionData;

  const result = await withTransaction(async (tx) => {
    let slug: string = convertToSlug(optionData.slug);
    const existingArticleBySlug = await productRepo.findOptionByStartedSlugWith(
      slug,
      tx,
    );
    slug = generateUniqueSlug(
      slug,
      existingArticleBySlug.map((a) => a.slug),
    );
    const { id: optionId } = (
      await productRepo.createOption({ name, slug, description }, tx)
    )[0];
    if (items.length > 0) {
      await productRepo.createOptionItems(
        items.map((item) => ({ ...item, optionId })),
        tx,
      );
    }
    return optionId;
  });
  return result;
};

// * UPDATE

// * DELETE

export const deleteOption = (id: string) => productRepo.deleteOptionById(id);
