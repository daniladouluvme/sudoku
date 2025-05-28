import { Box, Button, Divider, Typography } from "@mui/material";
import {
  EmailField,
  LoginField,
  PasswordField,
  RepeatPasswordField,
} from "./components";
import { IRegisterForm } from "../../models/register-form.model";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { useRegisterForm } from "@components/Authorization/hooks/use-register-form";
import { useAppDispatch } from "@hooks/state";
import { clearBackdrop, setBackdrop } from "@state/slice/backdrop.slice";
import { useService } from "@hooks/use-service";
import { useTranslation } from "react-i18next";

export const Register = () => {
  const { authorizationService } = useService();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useRegisterForm({
    mode: "onChange",
  });
  const { handleSubmit } = form;

  const handleRegister = (data: IRegisterForm) => {
    dispatch(setBackdrop({ loading: true }));
    authorizationService
      .register({
        login: data.login,
        email: data.email,
        password: data.password,
      })
      .then((user) => {
        navigate(`/verification/${user._id}`);
        dispatch(clearBackdrop());
      })
      .catch((error: AxiosError<{ login?: boolean; email?: boolean }>) => {
        console.error(error);
        let errorMessage = t("error.unknown");
        if (error.status === 409) {
          const { login, email } = error.response.data ?? {};
          if (login) errorMessage = t("error.userLoginExist");
          if (email) errorMessage = t("error.userEmailExist");
        }
        dispatch(setBackdrop({ error: errorMessage }));
      });
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "0.5rem",
        }}
      >
        <Divider>
          <Typography variant="h5">{t("register")}</Typography>
        </Divider>
        <LoginField {...form} />
        <EmailField {...form} />
        <PasswordField {...form} />
        <RepeatPasswordField {...form} />
        <Button type="submit" variant="outlined" sx={{ alignSelf: "flex-end" }}>
          {t("register")}
        </Button>
      </Box>
    </form>
  );
};
