import { valibotResolver } from "@hookform/resolvers/valibot";
import { Controller, useForm } from "react-hook-form";

import AuthFormWrapper from "@/components/ui/auth/form";
import PhoneNumberField from "@/components/ui/auth/phoneNumber";
import Button from "@/components/ui/button";
import FormInputError from "@/components/ui/formInputError";

import { setAuthStep, setPhonenNumber } from "../store/auth";
import { PhoneNumberSchemaObject } from "../validation/auth.schema";

const PhoneNumberSignIn = () => {
  const { control, handleSubmit } = useForm({
    resolver: valibotResolver(PhoneNumberSchemaObject),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit = async ({ phoneNumber }: { phoneNumber: string }) => {
    setPhonenNumber(phoneNumber);
    setAuthStep("password");
  };

  return (
    <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field, fieldState }) => (
          <div
            aria-invalid={fieldState.invalid}
            className="flex flex-col gap-4"
          >
            <PhoneNumberField {...field} />
            <FormInputError error={fieldState.error} />
          </div>
        )}
      />
      {/* <SmallTextButton onClick={() => changeMode("signUp")}>
        حساب کاربری ندارید؟ ایجاد کنید
      </SmallTextButton> */}
      <Button variant="secondary" type="submit">
        {" "}
        بعدی
      </Button>
    </AuthFormWrapper>
  );
};

export default PhoneNumberSignIn;
