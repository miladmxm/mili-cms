import { IconListDetails } from "@tabler/icons-react";

import EmptyPlaceholder from "@/components/dashboard/empty";
import { dalVerifySuccess } from "@/dal/helpers";

import { ProductTable } from "../components/productTable";
import { getProducts } from "../dal/query";

const AllProducts = async () => {
  const products = dalVerifySuccess(await getProducts());
  if (!products.length)
    return (
      <EmptyPlaceholder
        link="/admin/products/add"
        linkTitle="افزودن محصول"
        title="هیچ محصولی نیست"
        description="موردی در پایگاه داده یافت نشد"
        icon={IconListDetails}
      />
    );
  return <ProductTable data={products} />;
};

export default AllProducts;
