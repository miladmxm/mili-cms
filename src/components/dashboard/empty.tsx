import type { Route } from "next";

import { CandyOff, Plus } from "lucide-react";
import Link from "next/link";

import type { Icon } from "@/types/adminNavs";

import { Button } from "@/components/dashboard/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/dashboard/ui/empty";
import { cn } from "@/lib/utils";

interface EmptyPlaceholderProps {
  icon?: Icon;
  title: string;
  description?: string;
  link: Route;
  className?: string;
  linkTitle?: string;
  linkIcon?: Icon;
}
const EmptyPlaceholder = ({
  description,
  icon: IconComponent = CandyOff,
  title,
  link,
  linkIcon: LinkIcon = Plus,
  linkTitle,
  className,
}: EmptyPlaceholderProps) => {
  return (
    <Empty className={cn("border border-dashed", className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconComponent />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      <EmptyContent>
        <Button asChild size="sm" variant="outline">
          <Link href={link}>
            {linkTitle}
            <LinkIcon />
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyPlaceholder;
