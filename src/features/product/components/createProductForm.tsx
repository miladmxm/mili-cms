"use client";

import { FormProvider } from "react-hook-form";

import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { Field, FieldGroup } from "@/components/dashboard/ui/field";
import { Spinner } from "@/components/dashboard/ui/spinner";

import type { Category } from "../../../services/article/types";

import { useCreateProduct } from "../hooks/useCreateProduct";
import {
  ProductCategories,
  ProductContent,
  ProductExcerpt,
  ProductName,
  ProductSlug,
  ProductStatus,
  ProductThumbnail,
} from "./productFormFields";

const CreateProductForm = ({
  categories,
}: {
  categories: Promise<Category[]>;
}) => {
  const { form, isPending, submit } = useCreateProduct();
  return (
    <FormProvider {...form}>
      <form onSubmit={submit}>
        <div className="grid grid-cols-1 auto-rows-auto lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4">
            <Card className="w-full lg:sticky lg:top-2">
              <CardHeader>
                <CardTitle>ایجاد محصول جدید</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <ProductName />
                  <ProductSlug />
                  <ProductExcerpt />
                  <ProductCategories categories={categories} />
                  <ProductThumbnail />
                  <div className="flex gap-2">
                    <ProductStatus isPending={isPending} />
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
                  </div>
                </FieldGroup>
              </CardContent>
            </Card>
          </div>
          <ProductContent key="create" />
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateProductForm;
