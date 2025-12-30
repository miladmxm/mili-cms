import { FileIcon, UploadIcon } from "lucide-react";
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

const EmptyMedias = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileIcon />
        </EmptyMedia>
        <EmptyTitle>فایلی وجود ندارد</EmptyTitle>
        <EmptyDescription>هیچ موردی در پایگاه داده یافت نشد</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href="/admin/media">
            بارگذاری کنید <UploadIcon />
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyMedias;
