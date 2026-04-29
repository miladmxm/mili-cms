import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/dashboard/ui/button";
import Options from "@/features/product/containers/options";

const OptionsPage = () => {
  return (
    <div className="flex gap-10 flex-col min-h-full">
      <div className="flex gap-4 justify-between">
        <h4 className="font-semibold text-xl">ویژگی ها</h4>
        <Button asChild>
          <Link href="/admin/products/options/add">
            افزودن ویژگی
            <Plus />
          </Link>
        </Button>
      </div>
      <Options />
    </div>
  );
};

export default OptionsPage;
