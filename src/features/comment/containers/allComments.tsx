import type { SearchParams } from "@/types/type";

import CommentDetailsDialog from "../components/commentDetailsDialog";
import { CommentTable } from "../components/table";
import { getComments } from "../dal/query";
import CommentStoreProvider from "../store";

const AllComments = async ({
  searchParams: _sp,
}: {
  searchParams?: SearchParams;
}) => {
  const comments = await getComments();
  return (
    <section>
      <CommentStoreProvider comments={comments}>
        <CommentTable data={comments} />
        <CommentDetailsDialog />
      </CommentStoreProvider>
    </section>
  );
};

export default AllComments;
