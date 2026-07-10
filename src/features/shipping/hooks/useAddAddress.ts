import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { AddAddressOutput } from "../validations";

import { createAddressAction } from "../actions/create";
import { AddAddressSchema } from "../validations";

export const useAddAddress = (cb?: () => void) => {
  const { control, handleSubmit } = useForm({
    resolver: valibotResolver(AddAddressSchema),
    defaultValues: {
      additionalAddress: "",
      city: "",
      fullname: "",
      phoneNumber: "",
      postCode: "",
      province: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: AddAddressOutput) => {
    startTransition(async () => {
      const { success, message } = await createAddressAction(data);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
      if (cb) cb();
    });
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    control,
    isPending,
  };
};
