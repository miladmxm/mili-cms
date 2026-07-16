import type { Cart } from "@/services/cart/type";

import CartCard from "../components/cartCard";
import Empty from "../components/empty";
import HandleNext from "../components/handleNext";

const CartList = ({ items }: Cart) => {
  if (!items.length) {
    return <Empty />;
  }

  return (
    <>
      <HandleNext itemsLength={items.length} />
      {items.map((cartItem) => (
        <CartCard key={cartItem.id} {...cartItem} />
      ))}
    </>
  );
};

export default CartList;
