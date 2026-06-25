import { Button } from "@/components/dashboard/ui/button";

import { useCommentStore } from "../store";

const ShowCommentDetails = ({ id }: { id: string }) => {
  const setCommentActiveId = useCommentStore(
    (store) => store.setActiveCommentId,
  );
  return (
    <Button onClick={() => setCommentActiveId(id)} variant="outline">
      نمایش{" "}
    </Button>
  );
};

export default ShowCommentDetails;
