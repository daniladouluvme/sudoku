import { TextField } from "@mui/material";
import { handleFieldError } from "../../../utils/handle-field-error";
import { useRegisterForm } from "@components/Authorization/hooks/use-register-form";
import { useTranslation } from "react-i18next";

export const LoginField = ({
  register,
  formState: { errors },
}: ReturnType<typeof useRegisterForm>) => {
  const { t } = useTranslation();

  return (
    <TextField
      label={t('login')}
      {...register("login", {
        required: t("validationError.required"),
        minLength: {
          value: 5,
          message: t("validationError.minLength", { count: 5 }),
        },
        pattern: {
          value: /^[a-zA-Z0-9_\.]+$/,
          message: t("validationError.loginTemplate"),
        },
      })}
      {...handleFieldError("login", errors)}
      variant="outlined"
    />
  );
};
