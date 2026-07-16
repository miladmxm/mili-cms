"use client";

import { Suspense, useRef } from "react";

import SeparatorLine from "@/components/ui/separatorLine";

import AddAddressToggler from "../_components/addAddressToggler";
import AddressList, { AddressListSkeleton } from "../_components/addressList";
import RenderAddAddress from "../_components/renderAddAddress";

const AddressSelection = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Suspense fallback={<AddressListSkeleton />}>
        <AddressList />
      </Suspense>
      <SeparatorLine size="4" />
      <AddAddressToggler submitButtonRef={buttonRef} />
      <RenderAddAddress submitButtonRef={buttonRef} />
    </>
  );
};

export default AddressSelection;
