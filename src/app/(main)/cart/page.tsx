import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getSession } from "@/lib/auth";
import { getCart } from "@/services/cart/cart.service";

import CartPageClient from "./client";

async function CartContent() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/");
  }

  const cart = await getCart(session.user.id);

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
