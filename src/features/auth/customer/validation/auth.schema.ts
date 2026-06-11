import * as v from "valibot";

import { toLatinNumber } from "@/utils/toLatinNumber";

const PhoneNumberSchema = v.pipe(
  v.string(),
  v.nonEmpty("نمی‌تواند خالی باشه"),
  v.transform((input) => toLatinNumber(input)),
  v.regex(/\d/, "فقط عدد مجاز است"),
  v.minLength(9, "تعداد شماره صحیح نیست"),
  v.transform((input) => {
    return `+989${input.replaceAll(/\s/g, "")}`;
  }),
);

export const PhoneNumberSchemaObject = v.object({
  phoneNumber: PhoneNumberSchema,
});

export const PasswordSchemaObject = v.object({
  password: v.pipe(v.string(), v.nonEmpty("رمز عبور اجباری است")),
});
