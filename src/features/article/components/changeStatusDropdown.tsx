import { ChevronDown } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";
import { Spinner } from "@/components/dashboard/ui/spinner";

import type { ArticleStatus } from "../types";

import { useChangeStatus } from "../hooks/useChangeStatus";
import { StatusDictionary } from "../types";
import StatusDropdown from "./statusDropdown";

const ChangeStatusDropdown = ({
  active,
  id,
}: {
  id: string;
  active: ArticleStatus;
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
