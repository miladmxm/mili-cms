"use client";

import { ChevronDown } from "lucide-react";

import type { CommentStatus } from "@/services/comment/type";

import { Button } from "@/components/dashboard/ui/button";
import { Spinner } from "@/components/dashboard/ui/spinner";

import { useChangeStatus } from "../hooks/useChangeStatus";
import { StatusDictionary } from "../types";
import StatusDropdown from "./statusDropdown";

const ChangeStatusDropdown = ({
  active,
  id,
}: {
  id: string;
  active: CommentStatus;
}) => {
  const { handleChange, isPending, value } = useChangeStatus(id, active);
  return (
    <StatusDropdown value={value} onChange={handleChange}>
      <Button disabled={isPending} variant="outline">
        <span>{StatusDictionary[value]}</span>
        <ChevronDown />
        {isPending && <Spinner />}
      </Button>
    </StatusDropdown>
  );
};

export default ChangeStatusDropdown;
