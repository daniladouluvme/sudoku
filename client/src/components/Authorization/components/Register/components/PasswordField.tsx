import { AuthorizationPasswordField } from "../../AuthorizationPasswordField";
import { handleFieldError } from "../../../utils/handle-field-error";
import { useRegisterForm } from "../hooks/use-register-form";

export const PasswordField = ({
  register,
  formState: { errors },
}: ReturnType<typeof useRegisterForm>) => (
  <AuthorizationPasswordField
    label="Password"
    {...register("password", {
      required: "Password required",
      minLength: {
        value: 8,
        message: "The password must be at least eight characters long",
      },
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_{|}~]).{8,}$/,
        message:
          "The password must contain an uppercase, lowercase letter, a number, and a special character.",
      },
    })}
    {...handleFieldError("password", errors)}
  />
);
