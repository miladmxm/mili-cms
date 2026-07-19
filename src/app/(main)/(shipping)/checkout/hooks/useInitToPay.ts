import type { PaymentGatewayKeys } from "@/constant/appData";

import {
  setIsRulesAccepted,
  setSelectedGateway,
  setShippingStoreState,
} from "../../_store";

// eslint-disable-next-line @eslint-react/no-unnecessary-use-prefix
export const useInitToPay = () => {
  const check = () => {
    setShippingStoreState(({ isRulesAccepted, selectedGateway }) => ({
      isDisabledNextAction: !(
        Boolean(isRulesAccepted) && Boolean(selectedGateway)
      ),
    }));
  };

  const setPaymentGateway = (gateway: PaymentGatewayKeys) => {
    setSelectedGateway(gateway);
    check();
  };

  const setRulesAccepted = (accepted: boolean) => {
    setIsRulesAccepted(accepted);
    check();
  };

  return { setPaymentGateway, setRulesAccepted };
};
