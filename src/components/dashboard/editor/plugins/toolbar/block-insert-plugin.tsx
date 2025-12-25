"use client";

import { PlusIcon } from "lucide-react";

import { useEditorModal } from "@/components/dashboard/editor/editor-hooks/use-modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from "@/components/dashboard/ui/select";

export function BlockInsertPlugin({ children }: { children: React.ReactNode }) {
  const [modal] = useEditorModal();

  return (
    <>
      {modal}
      <Select value="">
        <SelectTrigger className="!h-8 w-min gap-1">
          <PlusIcon className="size-4" />
          <span>افزودن</span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{children}</SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
