"use client";

import Counter from "@/components/ui/counter";

import { useQuantityContext } from "../_store/quantityStore";

const CounterHandler = () => {
  const quantity = useQuantityContext((s) => s.quantity);
  const increment = useQuantityContext((s) => s.increment);
  const decrement = useQuantityContext((s) => s.decrement);
  return (
    <Counter
      quantity={quantity}
      onIncrement={increment}
      onDecrement={decrement}
      className="max-md:hidden"
    />
  );
};

export default CounterHandler;
