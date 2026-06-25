import { Eye } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";
import { cn } from "@/lib/utils";

import { useCommentStore } from "../store";

const ShowCommentDetails = ({ id }: { id: string }) => {
  const setCommentActiveId = useCommentStore(
    (store) => store.setActiveCommentId,
  );
  const setMode = useCommentStore((store) => store.setMode);

  const handleClick = () => {
    setCommentActiveId(id);
    setMode("edit");
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="sm"
      className={cn("w-full")}
    >
      نمایش <Eye />
    </Button>
  );
};

export default ShowCommentDetails;
