import type { SearchParams } from "@/types/type";

import { CommentTable } from "../components/table";
import { getComments } from "../dal/query";

const AllComments = async ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) => {
  const comments = await getComments();
  return (
    <section>
      <CommentTable data={comments} />
    </section>
  );
};

export default AllComments;
