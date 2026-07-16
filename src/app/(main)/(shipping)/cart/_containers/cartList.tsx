"use clietn";

import type { Cart } from "@/services/cart/type";

import CartCard from "../components/cartCard";
import Empty from "../components/empty";

const CartList = ({ items }: { items: Cart["items"] }) => {
  if (!items.length) {
    return <Empty />;
  }

  return (
    <>
      {items.map((cartItem) => (
        <CartCard key={cartItem.id} {...cartItem} />
      ))}
    </>
  );
};

export default CartList;
