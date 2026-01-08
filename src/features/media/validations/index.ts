import * as v from "valibot";

import type { MediaTypes } from "@/services/media/type";

const AudioSchema = v.pipe(
  v.file(),
  v.mimeType(["audio/aac", "audio/mp4", "audio/mpeg"]),
  v.transform((input) => ({
    file: input,
    type: "audio" as MediaTypes,
  })),
);
const DocsSchema = v.pipe(
  v.file(),
  v.mimeType([
    "text/plain",
    "application/pdf",
    "application/msword",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ]),
  v.transform((input) => ({
    file: input,
    type: "document" as MediaTypes,
  })),
);
const ImageSchema = v.pipe(
  v.file(),
  v.mimeType(["image/jpeg", "image/png", "image/webp", "image/gif"]),
  v.transform((input) => ({
    file: input,
    type: "image" as MediaTypes,
  })),
);
const VideoSchema = v.pipe(
  v.file(),
  v.mimeType(["video/mp4", "video/webm"]),
  v.transform((input) => ({
    file: input,
    type: "video" as MediaTypes,
  })),
);

export const UploadMediaSchema = v.pipe(
  v.object({
    file: v.pipe(
      v.file("لطفا یک فایل انتخاب کنید"),
      v.maxSize(100 * 1024 * 1024, "حجم فایل نباید بیشتر از ۱۰۰ مگابایت باشد"),
      v.union(
        [AudioSchema, DocsSchema, ImageSchema, VideoSchema],
        "فرمت فایل صحیح نیست",
      ),
    ),
  }),
  v.transform((input) => ({
    file: input.file.file,
    type: input.file.type as MediaTypes,
  })),
);

export type UploadMediaData = v.InferOutput<typeof UploadMediaSchema>;

export const EditFileDataSchema = v.object({
  alt: v.pipe(v.string(), v.nonEmpty("مقدار alt نباید خالی باشد")),
  name: v.optional(v.pipe(v.string(), v.nonEmpty())),
  title: v.optional(v.pipe(v.string(), v.nonEmpty())),
});
export type EditFileData = v.InferInput<typeof EditFileDataSchema>;
