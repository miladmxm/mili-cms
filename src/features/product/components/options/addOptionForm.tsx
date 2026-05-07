"use client";

import { FormProvider } from "react-hook-form";

import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { FieldGroup, FieldSet } from "@/components/dashboard/ui/field";
import { Spinner } from "@/components/dashboard/ui/spinner";

import { useAddOption } from "../../hooks/useAddOption";
import {
  OptionDescription,
  OptionItems,
  OptionName,
  OptionSlug,
} from "./optionFormField";

const AddOptionForm = () => {
  const { form, onSubmit, isPending } = useAddOption();
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <Card className="max-w-5xl mx-auto w-full">
          <CardHeader>
            <CardTitle>ایجاد ویژگی جدید</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <FieldGroup className="sm:flex-row">
                <OptionName />
                <OptionSlug />
              </FieldGroup>
              <OptionDescription />
              <FieldSet className="border border-border border-dashed py-3 px-5 rounded-2xl">
                <legend className="px-1">مقادیر ویژگی</legend>
                <OptionItems />
              </FieldSet>
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button
              className="flex-auto"
              disabled={isPending || !form.formState.isDirty}
              type="submit"
            >
              ذخیره
              {isPending && <Spinner />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};

export default AddOptionForm;
