import type { SearchParams } from "@/types/type";

import { getComments } from "../dal/query";

const AllComments = async ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) => {
  const comments = await getComments();
  console.log(comments);
  return <div />;
};

export default AllComments;
