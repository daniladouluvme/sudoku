import { TextField } from "@mui/material";
import { handleFieldError } from "../../../utils/handle-field-error";
import { useRegisterForm } from "@components/Authorization/hooks/use-register-form";
import { useTranslation } from "react-i18next";

export const EmailField = ({
  register,
  formState: { errors },
}: ReturnType<typeof useRegisterForm>) => {
  const { t } = useTranslation();

  return (
    <TextField
      label={t("email")}
      {...register("email", {
        required: "Email required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: t("validationError.emailTemplate"),
        },
      })}
      {...handleFieldError("email", errors)}
      variant="outlined"
    />
  );
};
