import * as v from "valibot";

import { ThumbnailNotNullSchema } from "@/validations/mainSchemas";

export const CreatePortfolioSchema = v.object({
  title: v.pipe(v.string(), v.nonEmpty("عنوان اجباری است")),
  link: v.union([
    v.literal(""),
    v.pipe(v.string(), v.url("حتما باید یک لینک باشد")),
  ]),
  description: v.union([v.literal(""), v.pipe(v.string())]),
  thumbnail: ThumbnailNotNullSchema,
});

export type CreatePortfolioInput = v.InferInput<typeof CreatePortfolioSchema>;
