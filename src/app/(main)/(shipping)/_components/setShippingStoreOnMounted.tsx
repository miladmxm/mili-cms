"use client";

import { useEffect, useEffectEvent } from "react";

import type { ShippingState } from "../_store";

import {
  setShippingNextActionDisable,
  setShippingNextButtonLabel,
  setShippingNextStepAction,
  setShippingStep,
} from "../_store";

const SetShippingStoreOnMounted = ({
  step,
  isDisabledNextAction,
  nextStepAction,
  nextButtonLabel,
}: Partial<ShippingState>) => {
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
  return null;
};

export default SetShippingStoreOnMounted;
