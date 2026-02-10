"use client";
import type { FC } from "react";

import { FormProvider } from "react-hook-form";

import type { Media } from "@/services/media/type";

import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { Field, FieldGroup } from "@/components/dashboard/ui/field";
import { Spinner } from "@/components/dashboard/ui/spinner";
import { cn } from "@/lib/utils";

import { useCreateCategory } from "../../hooks/useCreateCategory";
import {
  CategoryDescriptionField,
  CategoryNameField,
  CategorySelectParrent,
  CategorySlugField,
  CategoryThumbnailSelector,
} from "./categoryFormFields";

interface CreateCategoryProps {
  className?: string;
  categories: { name: string; id: string }[];
  media: Promise<Media[]>;
}

const CreateCategory: FC<CreateCategoryProps> = ({
  className,
  categories,
  media,
}) => {
  const { isPending, submit, form } = useCreateCategory();
  return (
    <FormProvider {...form}>
      <form className={cn(className)} onSubmit={submit}>
        <Card>
          <CardHeader>
            <CardTitle>اضافه کردن یک دسته بندی جدید</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <CategoryNameField />
              <CategorySlugField />
              <CategorySelectParrent categories={categories} />
              <CategoryDescriptionField />
              <CategoryThumbnailSelector media={media} />
              <Field>
                <Button
                  className="flex-auto"
                  disabled={isPending}
                  type="submit"
                >
                  ذخیره
                  {isPending && <Spinner />}
                </Button>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

export default CreateCategory;
