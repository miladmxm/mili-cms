import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { SheetController } from "@/features/media/components/mediaPickerSheet";

import type { CreateCategoryOutput } from "../validations/createCategory";

import { createCategoryAction } from "../actions/create";
import { CreateCategorySchema } from "../validations/createCategory";

export const useCreateCategory = () => {
  const [previewImageUrl, setPreviewImageUrl] = useState("");

  const mediaPickerSheetControllerRef = useRef<SheetController>(null);
  const form = useForm<CreateCategoryOutput>({
    resolver: valibotResolver(CreateCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: CreateCategoryOutput) => {
    startTransition(async () => {
      console.log(data);
      const { success, message } = await createCategoryAction(data);
      if (!success) toast.error(message);
      else {
        toast.success(message);
        setPreviewImageUrl("");
        form.reset();
      }
    });
  };

  return {
    isPending,
    control: form.control,
    submit: form.handleSubmit(handleSubmit),
    getValue: form.getValues,
    setValue: form.setValue,
    mediaPicker: {
      mediaPickerSheetControllerRef,
      previewImageUrl,
      setPreviewImageUrl,
    },
  };
};
