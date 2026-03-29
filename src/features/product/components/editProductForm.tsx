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

import type { Category, Product } from "../../../services/product/type";

import { useEditProduct } from "../hooks/useEditProduct";
import {
  ProductCategories,
  ProductContent,
  ProductExcerpt,
  ProductName,
  ProductSlug,
  ProductStatus,
  ProductThumbnail,
} from "./productFormFields";

const EditProductForm = ({
  categories,
  product,
}: {
  product: Product;
  categories: Promise<Category[]>;
}) => {
  const { isPending, submit, form } = useEditProduct(product);
  return (
    <FormProvider {...form}>
      <form onSubmit={submit}>
        <div className="grid grid-cols-1 auto-rows-auto lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4">
            <Card className="w-full lg:sticky lg:top-2">
              <CardHeader>
                <CardTitle>ایجاد مقاله جدید</CardTitle>
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
                        disabled={isPending || !form.formState.isDirty}
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
          <ProductContent key={Product.id} />
        </div>
      </form>
    </FormProvider>
  );
};

export default EditProductForm;
