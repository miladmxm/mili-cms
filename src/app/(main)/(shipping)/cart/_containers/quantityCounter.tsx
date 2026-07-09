"use client";

import Counter from "@/components/ui/counter";
import { useUpdateQuantity } from "@/features/cart/hooks/useUpdateQuantity";

const QuantityCounter = ({
  id,
  quantity,
}: {
  quantity: number;
  id: string;
}) => {
  const { handleChange, optimisticQuantity } = useUpdateQuantity({
    id,
    quantity,
  });

  const increment = () => {
    handleChange(optimisticQuantity + 1);
  };

  const decrement = () => {
    handleChange(optimisticQuantity - 1);
  };

  return (
    <Counter
      onIncrement={increment}
      onDecrement={decrement}
      quantity={optimisticQuantity}
    />
  );
};

export default QuantityCounter;
