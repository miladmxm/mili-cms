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

import { Label } from "./ui/label";

interface EmptyPlaceholderProps {
  icon?: Icon;
  title: string;
  description?: string;
  className?: string;
  actionIcon?: Icon;
  actionTitle?: string;
  link?: Route;
  htmlFor?: string;
  onClick?: () => void;
}

type ActionProp =
  | {
      type: "button";
      onClick: () => void;
    }
  | {
      type: "label";
      htmlFor: string;
    }
  | {
      type: "link";
      link: Route;
    };

const EmptyPlaceholder = ({
  description,
  icon: IconComponent = CandyOff,
  title,
  link,
  actionIcon: ActionIcon = Plus,
  actionTitle,
  className,
  type,
  htmlFor,
  onClick,
}: ActionProp & EmptyPlaceholderProps) => {
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
        {type === "button" ? (
          <Button size="sm" variant="outline" onClick={onClick}>
            {actionTitle}
            <ActionIcon />
          </Button>
        ) : type === "link" ? (
          <Button asChild size="sm" variant="outline">
            <Link href={link}>
              {actionTitle}
              <ActionIcon />
            </Link>
          </Button>
        ) : type === "label" ? (
          <Button asChild size="sm" variant="outline">
            <Label htmlFor={htmlFor}>
              {actionTitle}
              <ActionIcon />
            </Label>
          </Button>
        ) : (
          <div>
            {actionTitle}
            <ActionIcon />
          </div>
        )}
      </EmptyContent>
    </Empty>
  );
};

export default EmptyPlaceholder;
