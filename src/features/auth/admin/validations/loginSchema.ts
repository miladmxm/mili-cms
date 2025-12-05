import * as v from "valibot";

export const LoginInputSchema = v.object({
  email: v.pipe(
    v.string("باید بصورت رشته باشد"),
    v.email("فرمت ایمیل صحیح نیست"),
    v.nonEmpty("نباید خالی باشد"),
  ),
  rememberMe: v.pipe(v.boolean()),
  password: v.pipe(
    v.string("باید بصورت رشته باشد"),
    v.trim(),
    v.minLength(8, "حداقل دارای 8 کاراکتر باشد"),
  ),
});

export type LoginInput = v.InferInput<typeof LoginInputSchema>;
