"use client";

import type { FC, PropsWithChildren } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dashboard/ui/dropdown-menu";
import { useDirection } from "@/hooks/useDirection";

import type { ArticleStatus } from "../../../services/article/types";

import { StatusDictionary } from "../../../services/article/types";

interface StatusDropdownProps {
  value: ArticleStatus;
  onChange: (v: ArticleStatus) => void;
  label?: string;
}
const StatusDropdown: FC<PropsWithChildren & StatusDropdownProps> = ({
  onChange,
  label,
  children,
  value,
}) => {
  const dir = useDirection();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="rtl:dir-rtl"
        onChange={console.log}
      >
        <DropdownMenuLabel>{label || "تغییر وضعیت به"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(key) => onChange(key as ArticleStatus)}
        >
          {Object.keys(StatusDictionary).map((status) => {
            const statusKey = status as ArticleStatus;
            return (
              <DropdownMenuRadioItem
                dir={dir}
                className="capitalize"
                key={status}
                value={statusKey}
              >
                {StatusDictionary[statusKey]}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;
