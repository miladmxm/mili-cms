"use client";

import { use, useRef } from "react";

import AddressCard from "../_components/addressCard";
import AddressForm from "../_components/addressForm";
import { useCheckoutContext } from "../_contexts";
import SetShippingStoreOnMounted from "../../_components/setShippingStoreOnMounted";

const AddressSelection = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { address: addressPromise } = useCheckoutContext();
  const address = use(addressPromise);
  return (
    <div>
      <div className="py-3 my-6 grid grid-cols-2 gap-4 auto-rows-auto">
        {address.map((item) => (
          <AddressCard key={item.id} {...item} />
        ))}
      </div>
      <AddressForm submitButtonRef={buttonRef} />
      <SetShippingStoreOnMounted
        isDisabledNextAction={false}
        nextStepAction={() => buttonRef.current?.click()}
      />
    </div>
  );
};

export default AddressSelection;
