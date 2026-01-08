import { revalidateTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import { saveFile } from "@/features/media/dal/mutation";
import { UploadMediaSchema } from "@/features/media/validations";
import { validator } from "@/validations";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const form = Object.fromEntries(formData.entries());
    const {
      errors,
      output,
      success: successValidation,
    } = validator(UploadMediaSchema, form);
    if (!successValidation)
      return Response.json(
        { message: "validation error", errors, success: successValidation },
        { status: 401 },
      );
    const { success } = await saveFile(output);
    if (!success)
      return Response.json({
        success: false,
        message: "در ایجاد فایل مشکلی رخ داد",
      });
    revalidateTag(CacheKeys.medias, "");
    return Response.json({ success: successValidation }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Content type not allowed" },
      { status: 400 },
    );
  }
}
