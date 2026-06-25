import { Reply } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";

import { useCommentStore } from "../store";

const ReplyTrigger = ({ id }: { id: string }) => {
  const setMode = useCommentStore((store) => store.setMode);
  const setActiveCommentId = useCommentStore(
    (store) => store.setActiveCommentId,
  );

  const handleClick = () => {
    setMode("replay");
    setActiveCommentId(id);
  };

  return (
    <Button variant="ghost" size="sm" className="w-full" onClick={handleClick}>
      پاسخ
      <Reply />
    </Button>
  );
};

export default ReplyTrigger;
