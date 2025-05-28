import { AuthorizationPasswordField } from "../../AuthorizationPasswordField";
import { handleFieldError } from "../../../utils/handle-field-error";
import { useRegisterForm } from "@components/Authorization/hooks/use-register-form";
import { useTranslation } from "react-i18next";

export const PasswordField = ({
  register,
  formState: { errors },
}: ReturnType<typeof useRegisterForm>) => {
  const { t } = useTranslation();

  return (
    <AuthorizationPasswordField
      label={t("password")}
      {...register("password", {
        required: t("validationError.required"),
        minLength: {
          value: 8,
          message: t("validationError.minLength", { count: 8 }),
        },
        pattern: {
          value:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_{|}~]).{8,}$/,
          message: t("validationError.passwordTemplate"),
        },
      })}
      {...handleFieldError("password", errors)}
    />
  );
};
