import { TextField } from "@mui/material";
import { handleFieldError } from "../../../utils/handle-field-error";
import { useRegisterForm } from "@components/Authorization/hooks/use-register-form";

export const EmailField = ({
  register,
  formState: { errors },
}: ReturnType<typeof useRegisterForm>) => (
  <TextField
    label="Email"
    {...register("email", {
      required: "Email required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Incorrect email format",
      },
    })}
    {...handleFieldError("email", errors)}
    variant="outlined"
  />
);
