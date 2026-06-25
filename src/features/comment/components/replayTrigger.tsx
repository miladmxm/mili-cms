import { Reply } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";

const ReplyTrigger = () => {
  return (
    <Button variant="ghost" size="sm" className="w-full">
      پاسخ
      <Reply />
    </Button>
  );
};

export default ReplyTrigger;
