import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getUserCart } from "@/features/cart/dal/query";

import CartList from "./_containers/cartList";
import { CartCardSkeleton } from "./components/cartCard";

async function CartContent() {
  const cart = await getUserCart();
  if (!cart) redirect("/");
  return <CartList {...cart} />;
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
