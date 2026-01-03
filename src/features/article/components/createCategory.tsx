"use client";
import type { FC } from "react";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { Controller } from "react-hook-form";

import type { Media } from "@/features/type";

import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/dashboard/ui/field";
import { Input } from "@/components/dashboard/ui/input";
import { Spinner } from "@/components/dashboard/ui/spinner";
import { Textarea } from "@/components/dashboard/ui/textarea";
import MediaPickerSheet from "@/features/media/components/mediaPickerSheet";
import { convertToSlug } from "@/lib/slug";
import { cn } from "@/lib/utils";

import { useCreateCategory } from "../hooks/useCreateCategory";
import SelectParentCategory from "./selectParentCategory";

interface CreateCategoryProps {
  className?: string;
  categories: { name: string; id: string }[];
  medias: Promise<Media[]>;
}
// eslint-disable-next-line max-lines-per-function
const CreateCategory: FC<CreateCategoryProps> = ({
  className,
  categories,
  medias,
}) => {
  const {
    control,
    isPending,
    submit,
    getValue,
    setValue,
    mediaPicker: {
      previewImageUrl,
      setPreviewImageUrl,
      setShowMediaPicker,
      showMediaPicker,
    },
  } = useCreateCategory();
  return (
    <form className={cn(className)} onSubmit={submit}>
      <Card>
        <CardHeader>
          <CardTitle>اضافه کردن یک دسته بندی جدید</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">نام دسته بندی</FieldLabel>
                  <Input id="name" placeholder="آموزش" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
                        setValue("slug", convertToSlug(getValue("name")));
                      }
                    }}
                    placeholder="learn"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {categories.length > 0 && (
              <Controller
                name="parentId"
                control={control}
                render={({ fieldState }) => (
                  <Field aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="parentId">دسته‌بندی والد</FieldLabel>
                    <SelectParentCategory
                      value={getValue("parentId")}
                      allCategories={categories}
                      onChange={(id) => setValue("parentId", id || undefined)}
                    >
                      <Button
                        className="text-start"
                        disabled={isPending}
                        variant="outline"
                      >
                        <span className="w-full">
                          {categories.find(
                            ({ id }) => id === getValue("parentId"),
                          )?.name || "هیچ کدام"}
                        </span>
                        <ChevronDown />
                      </Button>
                    </SelectParentCategory>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="thumbnail"
              control={control}
              render={({ fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="thumbnail">انتخاب تصویر شاخص</FieldLabel>
                  <Suspense fallback={null}>
                    <MediaPickerSheet
                      medias={medias}
                      onOpenChange={setShowMediaPicker}
                      onSelect={({ id, url }) => {
                        setValue("thumbnail", id);
                        setPreviewImageUrl(url);
                        setShowMediaPicker(false);
                      }}
                      open={showMediaPicker}
                    />
                  </Suspense>
                  <Button
                    className="w-full h-32"
                    variant="outline"
                    onClick={() => setShowMediaPicker(true)}
                  >
                    {previewImageUrl && (
                      <Image
                        alt="image preview"
                        className="size-full object-contain"
                        src={{
                          src: previewImageUrl,
                          width: 128,
                          height: 128,
                        }}
                      />
                    )}
                  </Button>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field>
              <Button className="flex-auto" disabled={isPending} type="submit">
                ذخیره
                {isPending && <Spinner />}
              </Button>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </form>
  );
};

export default CreateCategory;
