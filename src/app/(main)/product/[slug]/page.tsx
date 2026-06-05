import { Suspense } from "react";

import MainContent from "./_containers/main";

const ProductPage = async (props: PageProps<"/product/[slug]">) => {
  return (
    <main>
      <Suspense>
        <MainContent {...props} />
      </Suspense>
    </main>
  );
};

export default ProductPage;
