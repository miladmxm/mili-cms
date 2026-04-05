import { redirect } from "next/navigation";

import EditOptionForm from "../components/options/editOptionForm";
import { getOption } from "../dal/query";

const EditOption = async ({ id }: { id: string }) => {
  const option = await getOption(id);
  if (!option) redirect("/admin/products/options");
  return <EditOptionForm option={option} />;
};

export default EditOption;
