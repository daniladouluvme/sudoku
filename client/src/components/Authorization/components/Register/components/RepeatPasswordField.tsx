import { AuthorizationPasswordField } from "../../AuthorizationPasswordField";
import { handleFieldError } from "../../../utils/handle-field-error";
import { useRegisterForm } from "@components/Authorization/hooks/use-register-form";
import { useTranslation } from "react-i18next";

export const RepeatPasswordField = ({
  register,
  formState: { errors },
  watch,
}: ReturnType<typeof useRegisterForm>) => {
  const password = watch("password");
  const { t } = useTranslation();

  return (
    <AuthorizationPasswordField
      label={t("repeatPassword")}
      {...register("repeatPassword", {
        validate: (value) =>
          value === password || t("validationError.passwordsMatch"),
      })}
      {...handleFieldError("repeatPassword", errors)}
    />
  );
};
