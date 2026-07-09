import { Suspense } from "react";

import { getUserCart } from "@/features/cart/dal/query";

import CartPageClient from "./client";

async function CartContent() {
  const cart = await getUserCart();

  return <CartPageClient cart={cart} />;
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
