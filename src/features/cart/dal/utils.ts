import env from "@/config/env";

export const WC_CART_STORE = () =>
  new URL("wp-json/wc/store/v1/cart/", env.WP_API_URL);

export const WC_ADD_TO_CART_STORE = () => new URL("add-item/", WC_CART_STORE());
