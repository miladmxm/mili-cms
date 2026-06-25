"use client";

import type { FC, PropsWithChildren } from "react";

import type { CommentType } from "@/services/comment/type";

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

import { CommentTypeDictionary } from "../types";

interface TypeDropdownProps {
  value: CommentType;
  onChange: (v: CommentType) => void;
  label?: string;
}

const TypeDropdown: FC<PropsWithChildren & TypeDropdownProps> = ({
  onChange,
  label,
  children,
  value,
}) => {
  const dir = useDirection();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="rtl:dir-rtl">
        <DropdownMenuLabel>{label || "تغییر نوع به"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(key) => onChange(key as CommentType)}
        >
          {Object.keys(CommentTypeDictionary).map((status) => {
            const statusKey = status as CommentType;
            return (
              <DropdownMenuRadioItem
                dir={dir}
                className="capitalize"
                key={status}
                value={statusKey}
              >
                {CommentTypeDictionary[statusKey]}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TypeDropdown;
