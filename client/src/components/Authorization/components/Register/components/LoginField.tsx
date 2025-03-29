import { TextField } from "@mui/material";
import { handleFieldError } from "../../../utils/handle-field-error";
import { useRegisterForm } from "@components/Authorization/hooks/use-register-form";

export const LoginField = ({
  register,
  formState: { errors },
}: ReturnType<typeof useRegisterForm>) => (
  <TextField
    label="Login"
    {...register("login", {
      required: "Login required",
      minLength: {
        value: 5,
        message: "The login must be at least five characters long",
      },
      pattern: {
        value: /^[a-zA-Z0-9_\.]+$/,
        message:
          "Only letters, numbers, underscores, and dots are allowed for login",
      },
    })}
    {...handleFieldError("login", errors)}
    variant="outlined"
  />
);
