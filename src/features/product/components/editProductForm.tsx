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

import type { Category, Option } from "../../../services/product/type";

import { useEditProduct } from "../hooks/useEditProduct";
import {
  ProductCategories,
  ProductContent,
  ProductExcerpt,
  ProductGallery,
  ProductMeta,
  ProductName,
  ProductSlug,
  ProductStatus,
  ProductThumbnail,
} from "./productFormFields";

const EditProductForm = ({
  categories,
  options,
}: {
  options: Promise<Option[]>;
  categories: Promise<Category[]>;
}) => {
  const { isPending, submit, form } = useEditProduct();
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
                  <ProductGallery />
                  <div className="flex gap-2">
                    <ProductStatus isPending={isPending} />
                    <Field>
                      <Button
                        className="flex-auto"
                        disabled={isPending}
                        type="submit"
                      >
                        بروزرسانی
                        {isPending && <Spinner />}
                      </Button>
                    </Field>
                  </div>
                </FieldGroup>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>داده های محصول</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductMeta options={options} />
              </CardContent>
            </Card>
            <ProductContent key="create" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditProductForm;
