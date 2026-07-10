"use server";

import { updateTag } from "next/cache";

import type { CreateAddress } from "@/services/shipping/type";
import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { validator } from "@/validations";

import * as dalAddressMutation from "../dal/mutation";
import { AddAddressSchema } from "../validations";

export const createAddressAction = async (
  inputData: unknown,
): Promise<ActionResult<Partial<CreateAddress>>> => {
  const {
    errors,
    output,
    success: successValidation,
  } = validator(AddAddressSchema, inputData);

  if (!successValidation) {
    return { success: successValidation, message: "خطای اعتبارسنجی", errors };
  }

  try {
    const createdArticleOutput = await dalAddressMutation.createAddress(output);

    if (!createdArticleOutput.success) {
      return { success: false, message: "خطا در ایجاد آدرس" };
    }

    updateTag(`${CacheKeys.address}-{userid}`);
    return {
      success: successValidation,
      message: "آدرس جدید با موفقیت ثبت شد",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ایجاد آدرس" };
  }
};
