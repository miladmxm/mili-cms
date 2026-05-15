"use client";

import { FormProvider } from "react-hook-form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";

import { useCreatePortfolio } from "../hooks/useCreatePortfolio";

const CreatePortfolioForm = () => {
  const { form, submit } = useCreatePortfolio();
  return (
    <FormProvider {...form}>
      <form className="mx-auto max-w-6xl w-full" onSubmit={submit}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>ایجاد یک نمومه کار</CardTitle>
          </CardHeader>
          <CardContent />
        </Card>
      </form>
    </FormProvider>
  );
};

export default CreatePortfolioForm;
