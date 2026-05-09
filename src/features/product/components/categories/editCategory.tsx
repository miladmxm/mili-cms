"use client";

import type { FC } from "react";

import { FormProvider } from "react-hook-form";

import type { Category } from "@/services/article/types";

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

import { useEditCategory } from "../../hooks/useEditCategory";
import {
  CategoryDescriptionField,
  CategoryNameField,
  CategorySelectParrent,
  CategorySlugField,
  CategoryThumbnailSelector,
  CategoryVectorSelector,
} from "./categoryFormFields";

interface CreateCategoryProps {
  className?: string;
  categories: Category[];
  editCategory: Category;
}

const EditCategory: FC<CreateCategoryProps> = ({
  className,
  categories,
  editCategory,
}) => {
  const { isPending, submit, form } = useEditCategory(editCategory);
  return (
    <FormProvider {...form}>
      <form className={cn(className)} onSubmit={submit}>
        <Card>
          <CardHeader>
            <CardTitle>ویرایش دسته بندی "{editCategory.name}"</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <CategoryNameField />
              <CategorySlugField />
              <CategorySelectParrent categories={categories} />
              <CategoryDescriptionField />
              <CategoryThumbnailSelector />
              <CategoryVectorSelector />
              <Field>
                <Button
                  className="flex-auto"
                  disabled={isPending || !form.formState.isDirty}
                  type="submit"
                >
                  بروزرسانی
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

export default EditCategory;
