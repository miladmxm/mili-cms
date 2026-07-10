"use client";

import Button from "@/components/ui/button";

import { useShippingStore } from "../_store";

const NextStepButton = () => {
  const action = useShippingStore((store) => store.nextStepAction);
  const disabled = useShippingStore((store) => store.isDisabledNextAction);
  return (
    <Button
      disabled={disabled}
      onClick={action}
      variant="secondary"
      shadow="sm"
    >
      ادامه فرایند خرید
    </Button>
  );
};

export default NextStepButton;
