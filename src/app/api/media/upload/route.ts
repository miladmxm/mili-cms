import { revalidateTag } from "next/cache";

import { saveFile } from "@/features/media/dal/mutation";
import { UploadMediaSchema } from "@/features/media/validations";
import { validator } from "@/validations";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const form = Object.fromEntries(formData.entries());
    const { errors, output, success } = validator(UploadMediaSchema, form);
    if (!success)
      return Response.json(
        { message: "validation error", errors, success },
        { status: 401 },
      );
    await saveFile(output);
    revalidateTag("media", "max");
    return Response.json({ success }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Content type not allowed" },
      { status: 400 },
    );
  }
}
