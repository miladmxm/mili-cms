import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getUserCart } from "@/features/cart/dal/query";
import { getUserAddress } from "@/features/shipping/dal/query";

import SetShippingStoreOnMounted from "../_components/setShippingStoreOnMounted";
import CheckoutStepsHandler from "./_containers/checkoutStepsHandler";
import CheckoutContextProvider from "./_contexts";

const CheckCartItems = async () => {
  const cart = await getUserCart();

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  return null;
};

const CheckoutPage = async () => {
  const address = getUserAddress();

  return (
    <CheckoutContextProvider address={address}>
      <SetShippingStoreOnMounted step={2} />
      <CheckoutStepsHandler />
      <Suspense>
        <CheckCartItems />
      </Suspense>
    </CheckoutContextProvider>
  );
};

export default CheckoutPage;
