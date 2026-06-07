import { Suspense } from "react";

import Product from "./_containers/main";

const ProductPage = async (props: PageProps<"/product/[slug]">) => {
  return (
    <main>
      <Suspense>
        <Product {...props} />
      </Suspense>
    </main>
  );
};

export default ProductPage;
