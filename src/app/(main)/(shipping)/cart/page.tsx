import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getUserCart } from "@/features/cart/dal/query";

import CartList from "./_containers/cartList";

async function CartContent() {
  const cart = await getUserCart();
  if (!cart) redirect("/");
  return <CartList {...cart} />;
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-8 text-center">در حال بارگذاری...</div>
      }
    >
      <CartContent />
    </Suspense>
  );
}
