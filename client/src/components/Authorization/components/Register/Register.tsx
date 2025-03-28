import { Box, Button } from "@mui/material";
import {
  EmailField,
  LoginField,
  PasswordField,
  RepeatPasswordField,
} from "./components";
import { SimpleBackdrop } from "@components/shared";
import { useState } from "react";
import { AuthorizationService } from "@service/authorization.service";
import { useRegisterForm } from "./hooks/use-register-form";
import { IRegisterForm } from "./models/register-form.model";
import { AxiosError } from "axios";

export const Register = () => {
  const [backdropState, setBackdropState] = useState<{
    loading?: boolean;
    error?: string;
    message?: string;
  }>({});
  const [showBackdrop, setShowBackdrop] = useState(false);
  const form = useRegisterForm({
    mode: "onChange",
  });
  const { handleSubmit } = form;

  const handleRegister = (data: IRegisterForm) => {
    setBackdropState({ loading: true });
    setShowBackdrop(true);
    new AuthorizationService()
      .register({
        login: data.login,
        email: data.email,
        password: data.password,
      })
      .then(() => {
        setBackdropState(() => ({
          message: `Registration was successful. The confirmation email has been sent to ${data.email}`,
          loading: false,
        }));
      })
      .catch((error: AxiosError<{ login?: boolean; email?: boolean }>) => {
        let errorMessage = "An unknown error occurred during registration";
        if (error.status === 409) {
          const { login, email } = error.response.data ?? {};
          if (login) errorMessage = "The user with this login already exists";
          if (email) errorMessage = "The user with this email already exists";
        }

        setBackdropState(() => ({ error: errorMessage, loading: false }));
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleRegister)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "0.5rem",
          }}
        >
          <LoginField {...form} />
          <EmailField {...form} />
          <PasswordField {...form} />
          <RepeatPasswordField {...form} />
          <Button
            type="submit"
            variant="outlined"
            sx={{ alignSelf: "flex-end" }}
          >
            Register
          </Button>
        </Box>
      </form>
      <SimpleBackdrop
        {...backdropState}
        open={showBackdrop}
        close={() => setShowBackdrop(false)}
      />
    </>
  );
};
