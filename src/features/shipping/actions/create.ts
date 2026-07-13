"use server";

import { updateTag } from "next/cache";

import type { CreateAddress } from "@/services/shipping/type";
import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { getSession } from "@/lib/auth";
import { validator } from "@/validations";

import * as dalAddressMutation from "../dal/mutation";
import { AddAddressSchema } from "../validations";

export const createAddressAction = async (
  inputData: unknown,
): Promise<ActionResult<Partial<CreateAddress>, string>> => {
  const {
    errors,
    output,
    success: successValidation,
  } = validator(AddAddressSchema, inputData);
  const session = await getSession();

  if (!session?.user?.id) {
    return { success: false, message: "لطفا ابتدا وارد حساب خود شوید" };
  }
  if (!successValidation) {
    return { success: successValidation, message: "خطای اعتبارسنجی", errors };
  }

  try {
    const createdAddressOutput = await dalAddressMutation.createAddress(output);

    if (!createdAddressOutput.success) {
      return { success: false, message: "خطا در ایجاد آدرس" };
    }

    updateTag(`${CacheKeys.address}-${session.user.id}`);
    return {
      success: successValidation,
      message: "آدرس جدید با موفقیت ثبت شد",
      data: createdAddressOutput.data,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ایجاد آدرس" };
  }
};
