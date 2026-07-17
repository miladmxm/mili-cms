import Image from "next/image";

import Radio from "@/components/ui/radio";
import { PAYMENT_GATEWAYS, PAYMENT_GATEWAYS_KEYS } from "@/constant/appData";

import { setSelectedGateway, useShippingStore } from "../../_store";

const PaymentGateways = () => {
  const selectedGateway = useShippingStore((store) => store.selectedGateway);
  return (
    <div className="flex gap-4 items-center">
      {PAYMENT_GATEWAYS_KEYS.map((key) => {
        const { icon, label } = PAYMENT_GATEWAYS[key];
        return (
          <label
            htmlFor={key}
            key={key}
            className="rounded-3xl border border-primary-500 px-4 cursor-pointer flex items-center gap-4 has-[input:checked]:opacity-100 opacity-60 transition-all"
          >
            <Radio
              name="gateway"
              id={key}
              checked={selectedGateway === key}
              onChecked={() => setSelectedGateway(key)}
            />
            <Image src={icon} alt={label} className="size-28 object-contain" />
          </label>
        );
      })}
    </div>
  );
};

export default PaymentGateways;
