import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { AuthorizationPasswordField } from "./AuthorizationPasswordField";
import { handleFieldError } from "../utils/handle-field-error";
import { useLoginForm } from "../hooks/use-login-form";
import { useState } from "react";
import { SimpleBackdrop } from "@components/shared";
import { AuthorizationService } from "@service/authorization.service";
import { useAppDispatch } from "@hooks/state";
import { setUser } from "@state/slice/user-slice";
import { AxiosError } from "axios";
import { ILoginForm } from "../models/login-form.model";

export const Login = () => {
  const dispatch = useAppDispatch();

  const [backdropState, setBackdropState] = useState<{
    loading?: boolean;
    error?: string;
  }>({});
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useLoginForm({
    mode: "onChange",
  });

  const handleLogin = (data: ILoginForm) => {
    setBackdropState({ loading: true });
    new AuthorizationService()
      .login({
        login: data.login,
        password: data.password,
      })
      .then((user) => dispatch(setUser(user)))
      .catch((error: AxiosError<{ notFound?: boolean }>) => {
        console.error(error);
        let errorMessage = "An unknown error occurred during authorization";
        if (error.status === 404) {
          const { notFound } = error.response.data ?? {};
          if (notFound) errorMessage = "The user was not found";
        }

        setBackdropState(() => ({ error: errorMessage, loading: false }));
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "0.5rem",
          }}
        >
          <Divider>
            <Typography variant="h5">Login</Typography>
          </Divider>
          <TextField
            label="Login"
            variant="outlined"
            {...register("login", {
              required: "Login required",
            })}
            {...handleFieldError("login", errors)}
          />
          <AuthorizationPasswordField
            label="Password"
            {...register("password", {
              required: "Password required",
            })}
            {...handleFieldError("password", errors)}
          />
          <Button
            type="submit"
            variant="outlined"
            sx={{ alignSelf: "flex-end" }}
          >
            Login
          </Button>
        </Box>
      </form>

      <SimpleBackdrop
        {...backdropState}
        open={backdropState.loading || !!backdropState.error}
        close={() => setBackdropState({})}
      />
    </>
  );
};
