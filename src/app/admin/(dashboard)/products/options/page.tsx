import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/dashboard/ui/button";

const OptionsPage = () => {
  return (
    <div className="flex gap-10 flex-col">
      <div className="flex gap-4 justify-between">
        <h4 className="font-semibold text-xl">ویژگی ها</h4>
        <Button asChild>
          <Link href="/admin/products/options/add">
            افزودن ویژگی
            <Plus />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OptionsPage;
