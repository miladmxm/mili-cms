"use client";

import { useRouter } from "next/navigation";

import SetShippingStoreOnMounted from "../../_components/setShippingStoreOnMounted";

const HandleNext = ({ itemsLength }: { itemsLength: number }) => {
  const router = useRouter();

  if (itemsLength > 0) {
    return (
      <SetShippingStoreOnMounted
        step={1}
        key={itemsLength}
        isDisabledNextAction={false}
        nextStepAction={() => {
          router.push("/checkout");
        }}
        nextButtonLabel="تکمیل فرایند خرید"
      />
    );
  } else {
    return (
      <SetShippingStoreOnMounted
        step={1}
        key={itemsLength}
        isDisabledNextAction={true}
        nextButtonLabel="امکان ادامه خرید وجود ندارد"
        nextStepAction={() => {
          /* empty */
        }}
      />
    );
  }
};

export default HandleNext;
