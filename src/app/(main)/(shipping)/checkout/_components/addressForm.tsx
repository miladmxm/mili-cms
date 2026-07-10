"use client";

import type { ComponentProps } from "react";

import { Controller } from "react-hook-form";

import { useAddAddress } from "@/features/shipping/hooks/useAddAddress";

const NormalTextInput = ({
  label,
  ...props
}: ComponentProps<"input"> & { label: string }) => {
  return (
    <div className="flex">
      <label htmlFor={props.id}>{label}</label>
      <input type="text" {...props} />
    </div>
  );
};

const ErrorMessage = ({ message }: { message?: string }) => {
  return <small className="ps-2 text-sm text-error">{message}</small>;
};

const AddressForm = () => {
  const { control, isPending, onSubmit } = useAddAddress();
  return (
    <section className="border border-primary-500 bg-primary-25">
      <form onSubmit={onSubmit}>
        <Controller
          control={control}
          name="fullname"
          render={({ field, fieldState }) => (
            <div>
              <NormalTextInput
                {...field}
                label="نام و نام خانوادگی"
                placeholder="علیرضا حسینی"
              />
              {fieldState.invalid && (
                <ErrorMessage message={fieldState.error?.message} />
              )}
            </div>
          )}
        />
      </form>
    </section>
  );
};

export default AddressForm;
