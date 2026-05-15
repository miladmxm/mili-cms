import { useForm } from "react-hook-form";

export const useCreatePortfolio = () => {
  const form = useForm();

  const onSubmit = () => {
    console.log("object");
  };

  return { form, submit: form.handleSubmit(onSubmit) };
};
