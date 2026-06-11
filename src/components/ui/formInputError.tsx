import type { FieldError } from "react-hook-form";

const FormInputError = ({ error }: { error?: FieldError }) => {
  if (!error || !error.message) return null;
  return <small className="text-sm text-error">{error.message}</small>;
};

export default FormInputError;
