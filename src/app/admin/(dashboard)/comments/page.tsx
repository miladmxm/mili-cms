import AllComments from "@/features/comment/containers/allComments";

const CommentsPage = async ({ searchParams }: PageProps<"/admin/comments">) => {
  return <AllComments searchParams={await searchParams} />;
};

export default CommentsPage;
