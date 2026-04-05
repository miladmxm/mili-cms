import type { ComponentProps } from "react";

import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/dashboard/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/dashboard/ui/field";
import { Input } from "@/components/dashboard/ui/input";
import { Textarea } from "@/components/dashboard/ui/textarea";
import { convertToSlug } from "@/lib/slug";

import type { CreateOptionInput } from "../../validations/option.schema";

const useOptionFormContext = useFormContext<CreateOptionInput>;

export const OptionName = ({ ...props }: ComponentProps<typeof Input>) => {
  const { control } = useOptionFormContext();
  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>نام ویژگی</FieldLabel>
          <Input id={field.name} placeholder="رنگ" {...field} {...props} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const OptionSlug = () => {
  const { control, setValue, getValues } = useOptionFormContext();
  return (
    <Controller
      name="slug"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
          <Input
            dir="ltr"
            id={field.name}
            placeholder="color"
            {...field}
            onFocus={(e) => {
              if (!e.target.value) {
                setValue("slug", convertToSlug(getValues("name")), {
                  shouldDirty: true,
                });
              }
            }}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const OptionDescription = () => {
  const { control } = useOptionFormContext();
  return (
    <Controller
      name="description"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>توضیح کوتاه ویژگی</FieldLabel>
          <Textarea id={field.name} {...field} className="max-h-52" />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

interface OptionItemFieldsProps {
  index: number;
  remove: (index: number) => void;
}
const OptionItemFields = ({ index, remove }: OptionItemFieldsProps) => {
  const { control } = useOptionFormContext();
  return (
    <div className="flex gap-4">
      <Controller
        name={`items.${index}.label`}
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>برچسب</FieldLabel>
            <Input {...field} id={field.name} placeholder="قرمز" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name={`items.${index}.value`}
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>مقدار</FieldLabel>
            <div className="flex gap-3">
              <Input {...field} id={field.name} placeholder="red" />
              <Button
                size="icon"
                className="text-destructive mt-auto"
                type="button"
                variant="outline"
                onClick={() => remove(index)}
              >
                <Trash2 />
              </Button>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
};
export const OptionItems = () => {
  const { control } = useOptionFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
    keyName: "kid",
  });
  return (
    <div className="flex flex-col gap-4">
      {fields.map(({ kid }, index) => (
        <OptionItemFields index={index} key={kid} remove={remove} />
      ))}
      <Button
        size="sm"
        className="w-full"
        type="button"
        variant="outline"
        onClick={() => {
          append({ label: "", value: "" });
        }}
      >
        <small className="text-xs font-light">افزودن یک مقدار ویژگی</small>
        <Plus />
      </Button>
    </div>
  );
};
