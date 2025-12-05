import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { LoginInput } from "../validations/loginSchema";

import { login } from "../actions/login";
import { LoginInputSchema } from "../validations/loginSchema";

export const useLoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginInput>({
    resolver: valibotResolver(LoginInputSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });
  const [isPending, startTransition] = useTransition();
  const handleSubmit = ({ email, password, rememberMe }: LoginInput) => {
    startTransition(async () => {
      const { success, message } = await login({
        email,
        password,
        rememberMe,
      });
      if (success) {
        toast.success("با موفقیت وارد شدید");
        router.replace("/admin");
      } else {
        toast.error(message);
      }
    });
  };
  return {
    isPending,
    control: form.control,
    submit: form.handleSubmit(handleSubmit),
  };
};
