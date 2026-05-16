"use client";

import { FormProvider } from "react-hook-form";

import type { Portfolio } from "@/services/portfolio/type";

import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { Field, FieldGroup } from "@/components/dashboard/ui/field";
import { Spinner } from "@/components/dashboard/ui/spinner";

import { useEditPortfolio } from "../hooks/useEditPortfolio";
import {
  PortfolioDescription,
  PortfolioLink,
  PortfolioThumbnail,
  PortfolioTitle,
} from "./portfolioFormFields";

const EditPortfolioForm = ({ portfolio }: { portfolio: Portfolio }) => {
  const { form, submit, isPending } = useEditPortfolio(portfolio);
  return (
    <FormProvider {...form}>
      <form className="mx-auto max-w-4xl w-full" onSubmit={submit}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>ویرایش نمومه کار</CardTitle>
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
                  disabled={isPending || !form.formState.isDirty}
                  type="submit"
                >
                  ویرایش
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

export default EditPortfolioForm;
