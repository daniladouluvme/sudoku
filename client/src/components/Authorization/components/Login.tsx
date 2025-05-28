import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { AuthorizationPasswordField } from "./AuthorizationPasswordField";
import { handleFieldError } from "../utils/handle-field-error";
import { useLoginForm } from "../hooks/use-login-form";
import { useAppDispatch } from "@hooks/state";
import { setUser } from "@state/slice/user.slice";
import { AxiosError } from "axios";
import { ILoginForm } from "../models/login-form.model";
import { clearBackdrop, setBackdrop } from "@state/slice/backdrop.slice";
import { useService } from "@hooks/use-service";
import { useTranslation } from "react-i18next";

export const Login = () => {
  const { authorizationService } = useService();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useLoginForm({
    mode: "onChange",
  });

  const handleLogin = (data: ILoginForm) => {
    dispatch(setBackdrop({ loading: true }));
    authorizationService
      .login({
        login: data.login,
        password: data.password,
      })
      .then((user) => {
        dispatch(setUser(user));
        dispatch(clearBackdrop());
      })
      .catch(
        (
          error: AxiosError<{ notFound?: boolean; emailNotVerified?: boolean }>
        ) => {
          console.error(error);
          let errorMessage = t("error.unknown");
          if (error.status === 404) {
            const { notFound } = error.response.data ?? {};
            if (notFound) errorMessage = t("error.userWasNotFound");
          }

          if (error.status === 403) {
            const { emailNotVerified } = error.response.data ?? {};
            if (emailNotVerified) errorMessage = t("error.emailNotVerified");
          }
          dispatch(setBackdrop({ error: errorMessage }));
        }
      );
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "0.5rem",
        }}
      >
        <Divider>
          <Typography variant="h5">{t("authorization")}</Typography>
        </Divider>
        <TextField
          label={t("login")}
          variant="outlined"
          {...register("login", {
            required: t("validationError.required"),
          })}
          {...handleFieldError("login", errors)}
        />
        <AuthorizationPasswordField
          label={t("password")}
          {...register("password", {
            required: t("validationError.required"),
          })}
          {...handleFieldError("password", errors)}
        />
        <Button type="submit" variant="outlined" sx={{ alignSelf: "flex-end" }}>
          {t("authorization")}
        </Button>
      </Box>
    </form>
  );
};
