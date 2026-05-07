import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { EditFileData } from "../validations";

import { editFileMeta } from "../actions/editFile";
import { EditFileDataSchema } from "../validations";

export const useEditFileData = (id: string, defaultValues: EditFileData) => {
  const form = useForm<EditFileData>({
    resolver: valibotResolver(EditFileDataSchema),
    defaultValues,
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: EditFileData) => {
    startTransition(async () => {
      const { success, message } = await editFileMeta(id, data);

      if (success) {
        toast.success("ویرایش انجام شد");
      } else {
        toast.error(message);
      }
    });
  };

  return {
    submit: form.handleSubmit(handleSubmit),
    isPending,
    control: form.control,
    isDirty: form.formState.isDirty,
  };
};
