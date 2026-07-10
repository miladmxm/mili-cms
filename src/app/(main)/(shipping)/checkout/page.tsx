"use client";

import SetShippingStoreOnMounted from "../_components/setShippingStoreOnMounted";
import AddressForm from "./_components/addressForm";

const CheckoutPage = () => {
  return (
    <div>
      <SetShippingStoreOnMounted step={2} />
      <AddressForm />
    </div>
  );
};

export default CheckoutPage;
