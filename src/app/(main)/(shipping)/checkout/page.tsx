"use client";

import SetShippingStoreOnMounted from "../_components/setShippingStoreOnMounted";

const CheckoutPage = () => {
  return (
    <div>
      <SetShippingStoreOnMounted step={2} />
    </div>
  );
};

export default CheckoutPage;
