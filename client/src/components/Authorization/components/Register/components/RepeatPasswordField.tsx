import { AuthorizationPasswordField } from "../../AuthorizationPasswordField";
import { handleFieldError } from "../utils/handle-field-error";
import { useRegisterForm } from "../hooks/use-register-form";

export const RepeatPasswordField = ({
  register,
  formState: { errors },
  watch,
}: ReturnType<typeof useRegisterForm>) => {
  const password = watch("password");

  return (
    <AuthorizationPasswordField
      label="Repeat password"
      {...register("repeatPassword", {
        required: "repeatPassword",
        validate: (value) => value === password || "Passwords don't match",
      })}
      {...handleFieldError("repeatPassword", errors)}
    />
  );
};
