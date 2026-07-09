import type { Cart } from "@/services/cart/type";

import CartCard from "../components/cartCard";

const CartList = ({ items }: Cart) => {
  return (
    <div className="flex flex-col gap-6 py-12">
      {items.map((cartItem) => (
        <CartCard key={cartItem.id} {...cartItem} />
      ))}
    </div>
  );
};

export default CartList;
