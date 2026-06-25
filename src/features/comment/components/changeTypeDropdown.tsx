"use client";

import { ChevronDown } from "lucide-react";

import type { CommentType } from "@/services/comment/type";

import { Button } from "@/components/dashboard/ui/button";
import { Spinner } from "@/components/dashboard/ui/spinner";

import { useChangeType } from "../hooks/useChangeType";
import { CommentTypeDictionary } from "../types";
import TypeDropdown from "./typeDropdown";

const ChangeTypeDropdown = ({
  active,
  id,
}: {
  id: string;
  active: CommentType;
}) => {
  const { handleChange, isPending, value } = useChangeType(id, active);
  return (
    <TypeDropdown value={value} onChange={handleChange}>
      <Button disabled={isPending} variant="outline">
        <span>{CommentTypeDictionary[value]}</span>
        <ChevronDown />
        {isPending && <Spinner />}
      </Button>
    </TypeDropdown>
  );
};

export default ChangeTypeDropdown;
