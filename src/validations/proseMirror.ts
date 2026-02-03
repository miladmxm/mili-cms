import * as v from "valibot";

import type { ProseMirror } from "@/types/type";

export const ProseMirrorSchema: v.GenericSchema<ProseMirror> = v.object({
  type: v.optional(v.pipe(v.string(), v.nonEmpty())),
  attrs: v.optional(v.record(v.string(), v.any())),
  content: v.optional(v.array(v.lazy(() => ProseMirrorSchema))),
  marks: v.optional(
    v.array(
      v.object({
        type: v.pipe(v.string(), v.nonEmpty()),
        attrs: v.optional(v.record(v.string(), v.any())),
      }),
    ),
  ),
  text: v.optional(v.pipe(v.string(), v.nonEmpty())),
});
