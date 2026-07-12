"use client";

import { Suspense } from "react";

import { useShippingStore } from "../../_store";
import AddressSelection from "./addressSelection";
import SendignMethod from "./sendignMethod";

const CheckoutStepsHandler = () => {
  const step = useShippingStore((store) => store.step);

  if (step === 3) {
    return <SendignMethod />;
  } else if (step === 4) {
    return <div>پرداخت</div>;
  } else {
    return (
      <Suspense>
        <AddressSelection />
      </Suspense>
    );
  }
};

export default CheckoutStepsHandler;
