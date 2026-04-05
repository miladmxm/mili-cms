import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { Option, OptionItem } from "@/services/product/type";

import type { CreateOptionInput } from "../validations/option.schema";

import { updateOptionAction } from "../actions/update";
import { CreateOptionSchema } from "../validations/option.schema";

const getIdsFromOptionItems = (
  optionItems: CreateOptionInput["items"] | OptionItem[],
): string[] => optionItems.map((item) => item.id || "");

const getDeletedId = (baseIds: string[], newIds: string[]) =>
  baseIds.filter((id) => !newIds.includes(id));

export const useEditOption = ({
  description,
  id,
  items,
  name,
  slug,
}: Option) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: valibotResolver(CreateOptionSchema),
    defaultValues: {
      description: description || undefined,
      items,
      name,
      slug,
    },
  });
  const submit = (data: CreateOptionInput) => {
    startTransition(async () => {
      const deletedItemIds = getDeletedId(
        getIdsFromOptionItems(items),
        getIdsFromOptionItems(data.items),
      );
      const { success, message } = await updateOptionAction(id, {
        deletedOptionItemIds: deletedItemIds,
        ...data,
      });
      toast[success ? "success" : "error"](message);
    });
  };
  return { form, onSubmit: form.handleSubmit(submit), isPending };
};
