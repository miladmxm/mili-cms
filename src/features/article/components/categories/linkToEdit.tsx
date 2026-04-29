import { Edit2 } from "lucide-react";
import Link from "next/link";

import { NavLinkLoading } from "@/components/dashboard/link-loading";
import { Button } from "@/components/dashboard/ui/button";

const LinkToEdit = ({ id }: { id: string }) => {
  return (
    <Button asChild size="sm" variant="ghost">
      <Link href={`/admin/blog/categories/${id}`}>
        <NavLinkLoading className="static" />
        <Edit2 />
      </Link>
    </Button>
  );
};

export default LinkToEdit;
