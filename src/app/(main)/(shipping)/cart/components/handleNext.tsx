"use client";

import { useRouter } from "next/navigation";

import SetShippingStoreOnMounted from "../../_components/setShippingStoreOnMounted";
import { setShippingNextActionDisable } from "../../_store";

const HandleNext = ({ itemsLength }: { itemsLength: number }) => {
  const router = useRouter();
  return (
    <SetShippingStoreOnMounted
      step={1}
      isDisabledNextAction={itemsLength === 0}
      nextStepAction={() => {
        setShippingNextActionDisable(true);
        router.push("/checkout");
      }}
    />
  );
};

export default HandleNext;
