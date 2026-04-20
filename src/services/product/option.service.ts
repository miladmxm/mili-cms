import { cacheTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import { convertToSlug, generateUniqueSlug } from "@/lib/slug";
import { withTransaction } from "@/repositories";
import * as productRepo from "@/repositories/product.repo";

import type {
  CreateOption,
  CreateOptionItem,
  OptionItem,
  UpdateOption,
} from "./type";

// * READ
export const getOptionsWithItems = async () => {
  "use cache";
  cacheTag(CacheKeys.productOption);

  return productRepo.findOptionsWithItems();
};
export const getOptionWithItems = async (id: string) => {
  "use cache";
  cacheTag(`${CacheKeys.productOption}-${id}`);

  return productRepo.findOptionByIdWithItems(id);
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
const sliceUpdatingOptionItemsWithNewOptionItems = (
  items: UpdateOption["items"],
) => {
  const update: OptionItem[] = [];
  const create: CreateOptionItem[] = [];
  if (!items) return { update, create };
  for (const item of items) {
    if (item.id) {
      update.push({
        ...item,
        id: item.id,
        optionId: "",
      });
    } else {
      create.push(item);
    }
  }
  return { update, create };
};
export const updateOption = async (id: string, input: UpdateOption) => {
  const data = input;

  if (data.slug) {
    data.slug = convertToSlug(data.slug);
    const existingArticleBySlug = await productRepo.findOptionByStartedSlugWith(
      data.slug,
    );
    data.slug = generateUniqueSlug(
      data.slug,
      existingArticleBySlug.filter((item) => item.id !== id).map((a) => a.slug),
    );
  }

  return withTransaction(async (tx) => {
    await productRepo.updateOptionById({ id, data }, tx);
    if (data.items && data.items.length > 0) {
      const itemsUpdatePromise: ReturnType<
        (typeof productRepo)["updateOptionItemById"]
      >[] = [];
      const { create, update } = sliceUpdatingOptionItemsWithNewOptionItems(
        data.items,
      );

      for (const itemData of update) {
        itemsUpdatePromise.push(
          productRepo.updateOptionItemById(
            { data: itemData, id: itemData.id },
            tx,
          ),
        );
      }
      await Promise.all(itemsUpdatePromise);

      if (create.length > 0) {
        await productRepo.createOptionItems(
          create.map((item) => ({ ...item, optionId: id })),
          tx,
        );
      }
    }
    if (data.deletedOptionItemIds && data.deletedOptionItemIds.length > 0) {
      await productRepo.deleteOptionItemsByIds(data.deletedOptionItemIds, tx);
    }
  });
};
// * DELETE

export const deleteOption = (id: string) => productRepo.deleteOptionById(id);
