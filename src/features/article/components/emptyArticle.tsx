import { IconList } from "@tabler/icons-react";
import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/dashboard/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/dashboard/ui/empty";

const EmptyArticle = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconList />
        </EmptyMedia>
        <EmptyTitle>هیچ مقاله ای وجود ندارد</EmptyTitle>
        <EmptyDescription>هیچ موردی در پایگاه داده یافت نشد</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href="/admin/blog/add">
            ایجاد کنید <Plus />
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyArticle;
