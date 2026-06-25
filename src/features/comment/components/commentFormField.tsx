import { ChevronDown } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { Button } from "@/components/dashboard/ui/button";
import { Field, FieldError } from "@/components/dashboard/ui/field";
import { Textarea } from "@/components/dashboard/ui/textarea";

import type { UpdateCommentOutput } from "../validations";

import { CommentTypeDictionary, StatusDictionary } from "../types";
import StatusDropdown from "./statusDropdown";
import TypeDropdown from "./typeDropdown";

const useCommentFormContext = useFormContext<UpdateCommentOutput>;

export const CommentContent = () => {
  const { control } = useCommentFormContext();
  return (
    <Controller
      control={control}
      name="content"
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <Textarea {...field} id={field.name} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const CommentStatus = () => {
  const { control, setValue } = useCommentFormContext();
  return (
    <Controller
      control={control}
      name="status"
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <StatusDropdown
            value={field.value}
            onChange={(e) => setValue("status", e, { shouldDirty: true })}
          >
            <Button variant="outline">
              <span>
                {StatusDictionary[
                  field.value as keyof typeof StatusDictionary
                ] || "انتخاب وضعیت"}
              </span>
              <ChevronDown />
            </Button>
          </StatusDropdown>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const CommentType = () => {
  const { control, setValue } = useCommentFormContext();
  return (
    <Controller
      control={control}
      name="type"
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <TypeDropdown
            value={field.value}
            onChange={(e) => setValue("type", e, { shouldDirty: true })}
          >
            <Button variant="outline">
              <span>
                {CommentTypeDictionary[
                  field.value as keyof typeof CommentTypeDictionary
                ] || "انتخاب نوع"}
              </span>
              <ChevronDown />
            </Button>
          </TypeDropdown>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
