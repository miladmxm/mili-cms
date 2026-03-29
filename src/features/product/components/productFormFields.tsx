"use client";
import type { ComponentProps } from "react";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Suspense, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { SheetController } from "@/features/media/components/mediaPickerSheet";
import type { Category } from "@/services/article/types";

import RichEditor from "@/components/dashboard/rich-editor";
import { Button } from "@/components/dashboard/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/dashboard/ui/field";
import { Input } from "@/components/dashboard/ui/input";
import { Textarea } from "@/components/dashboard/ui/textarea";
import MediaPickerSheet from "@/features/media/components/mediaPickerSheet";
import { convertToSlug } from "@/lib/slug";
import { StatusDictionary } from "@/services/article/types";

import type { CreateProductInput } from "../validations/product.schema";

import SelectMultipleCategories, {
  SelectMultipleCategoriesSkeleton,
} from "./selectMultipleCategories";
import StatusDropdown from "./statusDropdown";

const useProductFormContext = useFormContext<CreateProductInput>;

export const ProductName = ({ ...props }: ComponentProps<typeof Input>) => {
  const { control } = useProductFormContext();
  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>نام محصول</FieldLabel>
          <Input id={field.name} placeholder="تخت خواب" {...field} {...props} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const ProductSlug = () => {
  const { control, setValue, getValues } = useProductFormContext();
  return (
    <Controller
      name="slug"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
          <Input
            dir="ltr"
            id="slug"
            placeholder="article-about"
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

export const ProductExcerpt = () => {
  const { control } = useProductFormContext();
  return (
    <Controller
      name="excerpt"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="excerpt">توضیح کوتاه محصول</FieldLabel>
          <Textarea id="excerpt" {...field} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const ProductCategories = ({
  categories,
}: {
  categories: Promise<Category[]>;
}) => {
  const { control, setValue } = useProductFormContext();
  return (
    <Controller
      name="categoryIds"
      control={control}
      render={({ fieldState, field: { value } }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="categories">انتخاب دسته بندی ها</FieldLabel>
          <Suspense fallback={<SelectMultipleCategoriesSkeleton />}>
            <SelectMultipleCategories
              selectedItems={value}
              triggerId="categories"
              categories={categories}
              onSelect={({ id }) => {
                if (value.includes(id)) {
                  setValue(
                    "categoryIds",
                    value.filter((i) => i !== id),
                    { shouldDirty: true },
                  );
                } else {
                  setValue("categoryIds", [...value, id], {
                    shouldDirty: true,
                  });
                }
              }}
            />
          </Suspense>
        </Field>
      )}
    />
  );
};

export const ProductThumbnail = () => {
  const sheetControllerRef = useRef<SheetController>(null);

  const { control, setValue } = useProductFormContext();
  return (
    <Controller
      name="thumbnailId"
      control={control}
      render={({ fieldState, field: { value } }) => {
        const validImageUrl = value && typeof value !== "string";
        return (
          <div className="relative">
            <Field aria-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="thumbnail">انتخاب تصویر شاخص</FieldLabel>
              <Suspense fallback={null}>
                <MediaPickerSheet
                  mediaKey="image"
                  controllerRef={sheetControllerRef}
                  onSelect={({ id, url }) => {
                    setValue("thumbnailId", { id, url }, { shouldDirty: true });
                    sheetControllerRef.current?.close();
                  }}
                  selectedIds={
                    validImageUrl ? [value.id] : value ? [value] : []
                  }
                />
              </Suspense>

              <Button
                className="w-full h-32"
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          </div>
        );
      }}
    />
  );
};

export const ProductStatus = ({ isPending }: { isPending: boolean }) => {
  const { setValue, control } = useProductFormContext();
  return (
    <Controller
      name="status"
      control={control}
      render={({ fieldState, field: { value } }) => {
        return (
          <Field aria-invalid={fieldState.invalid} className="w-max">
            <StatusDropdown
              value={value}
              onChange={(v) => setValue("status", v, { shouldDirty: true })}
            >
              <Button disabled={isPending} variant="outline">
                <span>{StatusDictionary[value]}</span>
                <ChevronDown />
              </Button>
            </StatusDropdown>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export const ProductContent = () => {
  const { control, setValue } = useProductFormContext();
  return (
    <Controller
      name="content"
      control={control}
      render={({ fieldState, field: { value } }) => {
        return (
          <div className="lg:col-span-8">
            <Field aria-invalid={fieldState.invalid}>
              <RichEditor
                content={value}
                onUpdate={(content) => {
                  setValue("content", content, { shouldDirty: true });
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          </div>
        );
      }}
    />
  );
};
