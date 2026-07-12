"use client";

import { useRef } from "react";

import SetShippingStoreOnMounted from "../_components/setShippingStoreOnMounted";
import AddressForm from "./_components/addressForm";

const CheckoutPage = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <SetShippingStoreOnMounted
        step={2}
        isDisabledNextAction={false}
        nextStepAction={() => buttonRef.current?.click()}
      />
      <AddressForm submitButtonRef={buttonRef} />
    </div>
  );
};

export default CheckoutPage;
