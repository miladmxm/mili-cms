import type { CartItem } from "@/services/cart/type";
import type { Product, ProductVariableMeta } from "@/services/product/type";

import DefaultImage from "@/components/ui/defaultImage";
import { DiscountedPrice } from "@/features/product/components/ui/finalPrice";
import { OPTION_ITEM_IDS_SEPARATOR } from "@/features/product/constant";

import QuantityCounter from "../_containers/quantityCounter";
import RemoveFromCart from "./removeFromCart";

const SelectedVariables = ({
  optionItemIds,
  variables,
}: {
  variables: Product["variables"];
  optionItemIds: string;
}) => {
  const selectedItemIds = optionItemIds.split(OPTION_ITEM_IDS_SEPARATOR);

  console.log(variables, selectedItemIds);
  return (
    <div className="flex gap-4">
      {variables.map(({ name, items, id }) => {
        const item = items.find(({ id: itemId }) =>
          selectedItemIds.includes(itemId),
        );
        return (
          <div key={id}>
            <strong>{name}: </strong>
            {item && <small>{item.label}</small>}
          </div>
        );
      })}
    </div>
  );
};

const CartCard = ({ product, metadata, quantity, id }: CartItem) => {
  return (
    <div className="border border-primary-500 rounded-6xl flex p-6 gap-8">
      <div className="w-55.5 min-h-33 h-full">
        {product.type === "variable" ? (
          <DefaultImage
            className="rounded-3xl size-full object-cover"
            image={
              (metadata as ProductVariableMeta).thumbnail || product.thumbnail
            }
          />
        ) : (
          <DefaultImage
            className="rounded-3xl size-full object-cover"
            image={product.thumbnail}
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <strong>نام محصول: </strong>
          {product.name}
        </div>
        <div>
          <strong>قیمت: </strong>
          <DiscountedPrice metadata={[metadata]} />
        </div>
        {product.type === "variable" && (
          <SelectedVariables
            optionItemIds={(metadata as ProductVariableMeta).optionItemIds}
            variables={product.variables as Product["variables"]}
          />
        )}
      </div>
      <div className="flex-auto flex flex-col justify-between items-end">
        <RemoveFromCart id={id} />
        <QuantityCounter id={id} quantity={quantity} />
      </div>
    </div>
  );
};

export default CartCard;
