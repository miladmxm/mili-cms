import type { PropsWithChildren } from "react";

const ProductsWrapper = ({
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className="container">
      <div className="bg-white rounded-4xl md:rounded-7xl p-8 z-30 relative shadow-blur">
        {children}
      </div>
    </div>
  );
};

export default ProductsWrapper;
