import { valibotResolver } from "@hookform/resolvers/valibot";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import AuthFormWrapper from "@/components/ui/auth/form";
import PasswordField from "@/components/ui/auth/password";
import Button from "@/components/ui/button";
import FormInputError from "@/components/ui/formInputError";
import SmallTextButton from "@/components/ui/smallTextButton";
import { authClient, getErrorMessage } from "@/lib/auth-client";

import { resetAuth, setAuthStep, useAuthStore } from "../store/auth";
import { PasswordSchemaObject } from "../validation/auth.schema";

const PasswordSignIn = () => {
  const phoneNumber = useAuthStore((state) => state.phoneNumber);
  const { control } = useForm({
    resolver: valibotResolver(PasswordSchemaObject),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async ({ password }: { password: string }) => {
    const { error } = await authClient.signIn.phoneNumber({
      password,
      phoneNumber,
      rememberMe: true,
    });

    if (error) {
      toast.error(getErrorMessage(error));
    } else {
      resetAuth();
    }
  };

  const requestForOTP = async () => {
    const { error } = await authClient.phoneNumber.sendOtp({
      phoneNumber,
    });

    if (error) {
      toast.error(getErrorMessage(error));
    } else {
      setAuthStep("verify");
    }
  };

  return (
    <AuthFormWrapper onSubmit={control.handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <div
            aria-invalid={fieldState.invalid}
            className="flex flex-col gap-2"
          >
            <PasswordField {...field} />
            <FormInputError error={fieldState.error} />
          </div>
        )}
      />
      <div className="flex flex-col ">
        <SmallTextButton onClick={() => setAuthStep("phoneNumber")}>
          تغییر شماره
        </SmallTextButton>
        <SmallTextButton onClick={requestForOTP}>
          ورود از طریق پیامک
        </SmallTextButton>
      </div>
      <Button variant="secondary" type="submit">
        {" "}
        ورود
      </Button>
    </AuthFormWrapper>
  );
};

export default PasswordSignIn;
