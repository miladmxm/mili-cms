"use client";

import { useEffect, useEffectEvent } from "react";

import type { ShippingState } from "../_store";

import {
  setShippingNextActionDisable,
  setShippingNextStepAction,
  setShippingStep,
} from "../_store";

const SetShippingStoreOnMounted = ({
  step,
  isDisabledNextAction,
  nextStepAction,
}: Partial<ShippingState>) => {
  const handleSetStep = useEffectEvent(() => {
    if (step) setShippingStep(step);
    if (isDisabledNextAction !== undefined)
      setShippingNextActionDisable(isDisabledNextAction);
    if (nextStepAction) setShippingNextStepAction(nextStepAction);
  });
  useEffect(() => {
    handleSetStep();
  }, []);
  return null;
};

export default SetShippingStoreOnMounted;
