import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { AddAddressOutput } from "../validations";

import { createAddressAction } from "../actions/create";
import { AddAddressSchema } from "../validations";

export const useAddAddress = (cb?: (id: string) => void) => {
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
      const addAddressResponse = await createAddressAction(data);

      if (!addAddressResponse.success) {
        toast.error(addAddressResponse.message);
        return;
      }

      toast.success(addAddressResponse.message);
      if (cb) cb(addAddressResponse.data || "");
    });
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    control,
    isPending,
  };
};
