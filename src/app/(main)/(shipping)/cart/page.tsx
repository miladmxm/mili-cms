import { Suspense } from "react";

import { getUserCart } from "@/features/cart/dal/query";

import CartList from "./_containers/cartList";
import { CartCardSkeleton } from "./components/cartCard";
import HandleNext from "./components/handleNext";

async function CartContent() {
  const cart = await getUserCart();
  return (
    <>
      <HandleNext />
      <CartList items={cart?.items || []} />
    </>
  );
}

export default function CartPage() {
  return (
    <div className="flex flex-col gap-6 py-12">
      <Suspense fallback={<CartCardSkeleton />}>
        <CartContent />
      </Suspense>
    </div>
  );
}
