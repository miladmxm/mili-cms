/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-use-before-define */
"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

import type { Cart } from "@/services/cart/type";

import { removeFromCartAction } from "@/features/cart/actions/delete";
import { updateCartItemQuantity } from "@/features/cart/actions/update";
import { useCartStore } from "@/features/cart/store/cartStore";
import { formatNumber } from "@/lib/formatNumber";

const CartPageClient = ({ cart }: { cart: Cart | undefined }) => {
  const { items, setItems, updateQuantityOptimistic, removeItemOptimistic } =
    useCartStore();

  useEffect(() => {
    if (cart) {
      setItems(cart.items);
    }
  }, [cart, setItems]);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove(itemId);
      return;
    }

    updateQuantityOptimistic(itemId, newQuantity);
    const result = await updateCartItemQuantity(itemId, newQuantity);

    if (!result.success) {
      toast.error(result.error);
    }
  };

  const handleRemove = async (itemId: string) => {
    removeItemOptimistic(itemId);
    const result = await removeFromCartAction(itemId);

    if (!result.success) {
      toast.error(result.error);
    }
  };

  const calcDiscountPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  const totalPrice = items.reduce((acc, item) => {
    const price = item.metadata
      ? calcDiscountPrice(item.metadata.price, item.metadata.discount)
      : 0;
    return acc + price * item.quantity;
  }, 0);

  if (items.length === 0) {
    return (
      <main className="container min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold">سبد خرید خالی است</h1>
        <Link href="/shop" className="text-secondary-500 hover:underline">
          بازگشت به فروشگاه
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-8">سبد خرید</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="size-20 relative rounded-xl overflow-hidden shrink-0 bg-gray-100">
              {item.product?.thumbnail?.url && (
                <Image
                  src={item.product.thumbnail.url}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex-auto min-w-0">
              <Link
                href={`/product/${item.product?.slug}`}
                className="font-semibold line-clamp-1 hover:text-secondary-500"
              >
                {item.product?.name}
              </Link>
              {item.metadata && (
                <div className="text-sm text-gray-500 mt-1">
                  {item.metadata.discount > 0 ? (
                    <span className="flex gap-2">
                      <span className="line-through text-gray-400">
                        {formatNumber(item.metadata.price)} تومان
                      </span>
                      <span className="text-red-500">
                        {formatNumber(
                          calcDiscountPrice(
                            item.metadata.price,
                            item.metadata.discount,
                          ),
                        )}{" "}
                        تومان
                      </span>
                    </span>
                  ) : (
                    <span>{formatNumber(item.metadata.price)} تومان</span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-full">
                <button
                  type="button"
                  className="px-3 py-2 text-lg"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span className="px-3 min-w-8 text-center">
                  {item.quantity.toLocaleString("fa")}
                </span>
                <button
                  type="button"
                  className="px-3 py-2 text-lg"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                onClick={() => handleRemove(item.id)}
              >
                <Trash2 className="size-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>مجموع</span>
          <span>{formatNumber(totalPrice)} تومان</span>
        </div>
      </div>
    </main>
  );
};

export default CartPageClient;
