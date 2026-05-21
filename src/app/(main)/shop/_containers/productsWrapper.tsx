import type { PropsWithChildren } from "react";

const ProductsWrapper = ({
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <section className="bg-white rounded-4xl md:rounded-7xl container p-8 z-10 relative shadow-blur">
      {children}
    </section>
  );
};

export default ProductsWrapper;
