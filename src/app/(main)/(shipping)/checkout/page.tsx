import { getUserAddress } from "@/features/shipping/dal/query";

import SetShippingStoreOnMounted from "../_components/setShippingStoreOnMounted";
import CheckoutStepsHandler from "./_containers/checkoutStepsHandler";
import CheckoutContextProvider from "./_contexts";

const CheckoutPage = () => {
  const address = getUserAddress();
  return (
    <CheckoutContextProvider address={address}>
      <SetShippingStoreOnMounted step={2} />
      <CheckoutStepsHandler />
    </CheckoutContextProvider>
  );
};

export default CheckoutPage;
