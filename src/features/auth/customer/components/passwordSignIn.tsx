import { valibotResolver } from "@hookform/resolvers/valibot";
import { Controller, useForm } from "react-hook-form";

import AuthFormWrapper from "@/components/ui/auth/form";
import PasswordField from "@/components/ui/auth/password";
import Button from "@/components/ui/button";
import FormInputError from "@/components/ui/formInputError";
import SmallTextButton from "@/components/ui/smallTextButton";

import { setAuthStep } from "../store/auth";
import { PasswordSchemaObject } from "../validation/auth.schema";

const PasswordSignIn = () => {
  const { control } = useForm({
    resolver: valibotResolver(PasswordSchemaObject),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = ({ password }: { password: string }) => {
    setAuthStep("verify");
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
        <SmallTextButton onClick={() => setAuthStep("verify")}>
          {/* todo send code before set step */}
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
