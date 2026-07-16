"use client";

import { useEffect, useEffectEvent } from "react";

import type { ShippingState } from "../_store";

import {
  setShippingNextActionDisable,
  setShippingNextButtonLabel,
  setShippingNextStepAction,
  setShippingStep,
  useShippingStore,
} from "../_store";

const SetShippingStoreOnMounted = ({
  step,
  isDisabledNextAction,
  nextStepAction,
  nextButtonLabel,
}: Partial<ShippingState>) => {
  const dis = useShippingStore((store) => store.isDisabledNextAction);
  const handleSetStep = useEffectEvent(() => {
    if (step) setShippingStep(step);
    if (isDisabledNextAction !== undefined) {
      setShippingNextActionDisable(isDisabledNextAction);
    }
    if (nextStepAction) setShippingNextStepAction(nextStepAction);
    if (nextButtonLabel) setShippingNextButtonLabel(nextButtonLabel);
  });
  useEffect(() => {
    handleSetStep();
  }, []);
  return <div>{dis ? "disabel" : "helo"}</div>;
};

export default SetShippingStoreOnMounted;
