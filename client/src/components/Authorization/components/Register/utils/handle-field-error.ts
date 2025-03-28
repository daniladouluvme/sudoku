import { FieldErrors, FieldValues } from "react-hook-form";

export const handleFieldError = (
  name: string,
  errors: FieldErrors<FieldValues>
) => {
  return {
    error: !!errors[name],
    helperText: errors[name]?.message?.toString() ?? " ",
  };
};
