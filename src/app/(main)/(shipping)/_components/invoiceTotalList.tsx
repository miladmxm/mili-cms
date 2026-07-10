import type { ReactNode } from "react";

import type { CartItem } from "@/services/cart/type";

import SeparatorLine from "@/components/ui/separatorLine";
import { getUserCart } from "@/features/cart/dal/query";
import {
  FormatedPrice,
  TotalMetadataPriceWithDiscount,
} from "@/features/product/components/ui/finalPrice";

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: number | string | ReactNode;
}) => {
  return (
    <div className="flex justify-between gap-4 text-black font-bold text-lg">
      <span>{label}:</span>
      <span>{value}</span>
    </div>
  );
};

const InvoiceTotalPrice = ({ items }: { items: CartItem[] }) => {
  return (
    <h5 className="text-secondary-500 font-bold text-lg text-center">
      <span>جمع کل: </span>
      <TotalMetadataPriceWithDiscount
        metadata={items
          .map(({ metadata, quantity }) => new Array(quantity).fill(metadata))
          .flat()}
      />
    </h5>
  );
};

const InvoiceTotalList = async () => {
  const cart = await getUserCart();
  if (!cart) return;
  return (
    <div className="flex flex-col gap-4">
      {cart.items.map(({ id, product: { name }, metadata, quantity }) => (
        <div key={id} className="flex flex-col gap-2 text-black">
          <h5 className="font-semibold mb-2">{name}</h5>
          <DetailItem
            label="قیمت جزء"
            value={<FormatedPrice metadata={[metadata]} />}
          />
          <DetailItem label="تعداد" value={`${quantity} عدد`} />
          {metadata.discount > 0 && (
            <DetailItem label="تخفیف" value={`${metadata.discount}%`} />
          )}
          <SeparatorLine size="3" />
        </div>
      ))}
      <InvoiceTotalPrice items={cart.items} />
    </div>
  );
};

export default InvoiceTotalList;
