"use client";

import { use, useRef } from "react";

import SeparatorLine from "@/components/ui/separatorLine";

import AddAddressToggler from "../_components/addAddressToggler";
import AddressCard from "../_components/addressCard";
import RenderAddAddress from "../_components/renderAddAddress";
import { useCheckoutContext } from "../_contexts";

const AddressSelection = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { address: addressPromise } = useCheckoutContext();
  const address = use(addressPromise);
  return (
    <div>
      آدرس های پیشین شما:
      <div className="py-3 my-6 grid grid-cols-2 gap-4 auto-rows-auto">
        {address.map((item) => (
          <AddressCard key={item.id} {...item} />
        ))}
      </div>
      <SeparatorLine size="4" />
      <AddAddressToggler submitButtonRef={buttonRef} />
      <RenderAddAddress submitButtonRef={buttonRef} />
    </div>
  );
};

export default AddressSelection;
