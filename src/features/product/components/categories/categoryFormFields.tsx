import { Trash } from "lucide-react";
import Image from "next/image";
import { Suspense, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { SheetController } from "@/features/media/components/mediaPickerSheet";
import type { Category } from "@/services/article/types";

import { Button } from "@/components/dashboard/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/dashboard/ui/field";
import { Input } from "@/components/dashboard/ui/input";
import { Textarea } from "@/components/dashboard/ui/textarea";
import MediaPickerSheet from "@/features/media/components/mediaPickerSheet";
import { convertToSlug } from "@/lib/slug";

import type { CreateCategoryInput } from "../../validations/category.schema";

import SelectCategory from "./selectCategory";

const useCategoryFormContext = useFormContext<CreateCategoryInput>;

export const CategoryNameField = () => {
  const { control } = useCategoryFormContext();
  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>نام دسته بندی</FieldLabel>
          <Input id={field.name} placeholder="آموزش" {...field} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const CategorySlugField = () => {
  const { control, setValue, getValues } = useCategoryFormContext();
  return (
    <Controller
      name="slug"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="slug">slug</FieldLabel>
          <Input
            dir="ltr"
            id="slug"
            onFocus={(e) => {
              if (!e.target.value) {
                setValue("slug", convertToSlug(getValues("name")));
              }
            }}
            placeholder="learn"
            {...field}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const CategorySelectParrent = ({
  categories,
}: {
  categories: Category[];
}) => {
  const { control, setValue } = useCategoryFormContext();
  return (
    <Controller
      name="parentId"
      control={control}
      render={({ fieldState, field: { value } }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="parentId">دسته‌بندی والد</FieldLabel>
          <SelectCategory
            selectedItemId={value}
            categories={categories}
            onSelect={(selected) =>
              setValue("parentId", selected?.id || null, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const CategoryDescriptionField = () => {
  const { control } = useCategoryFormContext();
  return (
    <Controller
      name="description"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="description">توضیحات</FieldLabel>
          <Textarea
            id="description"
            placeholder="توضیحاتی درباره این دسته بندی"
            {...field}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const CategoryThumbnailSelector = () => {
  const { control, setValue } = useCategoryFormContext();
  const mediaPickerSheetControllerRef = useRef<SheetController>(null);
  return (
    <Controller
      name="thumbnail"
      control={control}
      render={({ fieldState, field: { value, name } }) => (
        <div className="relative">
          <Field aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={name}>انتخاب تصویر شاخص</FieldLabel>
            <Suspense fallback={null}>
              <MediaPickerSheet
                mediaKey="image"
                controllerRef={mediaPickerSheetControllerRef}
                onSelect={({ id, url }) => {
                  setValue(
                    name,
                    { id, url },
                    { shouldDirty: true, shouldValidate: true },
                  );
                  mediaPickerSheetControllerRef.current?.close();
                }}
              />
            </Suspense>
            <Button
              className="w-full h-32"
              variant="outline"
              onClick={() => mediaPickerSheetControllerRef.current?.open()}
            >
              {typeof value !== "string" && value?.url && (
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
          {value && (
            <Button
              size="icon-sm"
              className="absolute end-4 top-10 z-20 text-destructive"
              variant="outline"
              onClick={() =>
                setValue(name, null, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            >
              <Trash />
            </Button>
          )}
        </div>
      )}
    />
  );
};

export const CategoryVectorSelector = () => {
  const { control, setValue } = useCategoryFormContext();
  const mediaPickerSheetControllerRef = useRef<SheetController>(null);
  return (
    <Controller
      name="vector"
      control={control}
      render={({ fieldState, field: { value, name } }) => (
        <div className="relative">
          <Field aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={name}>
              یک آیکن یا تصویر برداری انتخاب کنید
            </FieldLabel>
            <Suspense fallback={null}>
              <MediaPickerSheet
                mediaKey="image"
                controllerRef={mediaPickerSheetControllerRef}
                onSelect={({ id, url }) => {
                  setValue(
                    name,
                    { id, url },
                    { shouldDirty: true, shouldValidate: true },
                  );
                  mediaPickerSheetControllerRef.current?.close();
                }}
              />
            </Suspense>
            <Button
              className="w-full h-32"
              variant="outline"
              onClick={() => mediaPickerSheetControllerRef.current?.open()}
            >
              {typeof value !== "string" && value?.url && (
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
          {value && (
            <Button
              size="icon-sm"
              className="absolute end-4 top-10 z-20 text-destructive"
              variant="outline"
              onClick={() =>
                setValue(name, null, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            >
              <Trash />
            </Button>
          )}
        </div>
      )}
    />
  );
};
