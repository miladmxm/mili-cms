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

import { useCreatePortfolio } from "../hooks/useCreatePortfolio";
import {
  PortfolioDescription,
  PortfolioLink,
  PortfolioThumbnail,
  PortfolioTitle,
} from "./portfolioFormFields";

const CreatePortfolioForm = () => {
  const { form, submit, isPending } = useCreatePortfolio();
  return (
    <FormProvider {...form}>
      <form className="mx-auto max-w-4xl w-full" onSubmit={submit}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>ایجاد یک نمومه کار</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="flex gap-4">
                <PortfolioTitle />
                <PortfolioLink />
              </div>
              <PortfolioDescription />
              <PortfolioThumbnail />
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

export default CreatePortfolioForm;
