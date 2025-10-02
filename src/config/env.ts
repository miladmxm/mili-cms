import * as v from "valibot";

const EnvSchema = v.object({
  WP_API_URL: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your WP_API_URL."),
    v.url("The WP_API_URL is badly formatted."),
  ),
  WP_TOKEN_NAME: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your WP_TOKEN_NAME."),
  ),
  WP_TOKEN_SECRET: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your WP_TOKEN_SECRET."),
  ),
  WC_TOKEN_SECRET_KEY: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your WC_TOKEN_SECRET_KEY."),
  ),
  WC_TOKEN_SECRET_VALUE: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your WC_TOKEN_SECRET_VALUE."),
  ),
});
type Env = v.InferOutput<typeof EnvSchema>;

const ENV = (): Env => {
  try {
    const env = v.parse(EnvSchema, process.env);
    return env;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default ENV();
