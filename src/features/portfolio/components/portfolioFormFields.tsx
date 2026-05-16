import Image from "next/image";
import { Suspense, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { SheetController } from "@/features/media/components/mediaPickerSheet";

import { Button } from "@/components/dashboard/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/dashboard/ui/field";
import { Input } from "@/components/dashboard/ui/input";
import { Textarea } from "@/components/dashboard/ui/textarea";
import MediaPickerSheet from "@/features/media/components/mediaPickerSheet";

import type { CreatePortfolioInput } from "../validations/schema";

const usePortfolioFormContext = useFormContext<CreatePortfolioInput>;

export const PortfolioTitle = () => {
  const { control } = usePortfolioFormContext();
  return (
    <Controller
      control={control}
      name="title"
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>عنوان</FieldLabel>
          <Input {...field} id={field.name} placeholder="محصول تدی" />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const PortfolioLink = () => {
  const { control } = usePortfolioFormContext();
  return (
    <Controller
      control={control}
      name="link"
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>لینک (اختیاری)</FieldLabel>
          <Input
            type="url"
            className="dir-ltr"
            {...field}
            id={field.name}
            placeholder="https://localhost/products/item"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const PortfolioDescription = () => {
  const { control } = usePortfolioFormContext();
  return (
    <Controller
      name="description"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>توضیح کوتاه (اختیاری)</FieldLabel>
          <Textarea id={field.name} {...field} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const PortfolioThumbnail = () => {
  const sheetControllerRef = useRef<SheetController>(null);
  const { control, setValue } = usePortfolioFormContext();
  return (
    <Controller
      name="thumbnail"
      control={control}
      render={({ fieldState, field: { value, name } }) => {
        const validImageUrl = value && typeof value !== "string";
        return (
          <div className="relative">
            <Field aria-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={name}>انتخاب تصویر شاخص</FieldLabel>
              <Suspense fallback={null}>
                <MediaPickerSheet
                  mediaKey="image"
                  controllerRef={sheetControllerRef}
                  onSelect={({ id, url }) => {
                    setValue(
                      name,
                      { id, url },
                      { shouldDirty: true, shouldValidate: true },
                    );
                    sheetControllerRef.current?.close();
                  }}
                  selectedIds={
                    validImageUrl ? [value.id] : value ? [value] : []
                  }
                />
              </Suspense>
              <div className="relative">
                <Button
                  className="w-full h-32"
                  id={name}
                  variant="outline"
                  onClick={() => sheetControllerRef.current?.open()}
                >
                  {validImageUrl && (
                    <Image
                      alt="image preview"
                      className="size-full object-contain"
                      src={{
                        src: value.url,
                        width: 128,
                        height: 128,
                      }}
                    />
                  )}
                </Button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          </div>
        );
      }}
    />
  );
};
