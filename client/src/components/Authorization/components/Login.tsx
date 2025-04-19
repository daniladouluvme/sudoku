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

export const Login = () => {
  const { authorizationService } = useService();
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
          let errorMessage = "An unknown error occurred during authorization";
          if (error.status === 404) {
            const { notFound } = error.response.data ?? {};
            if (notFound) errorMessage = "The user was not found";
          }

          if (error.status === 403) {
            const { emailNotVerified } = error.response.data ?? {};
            if (emailNotVerified) errorMessage = "The user's email has not been verified";
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
        <Button type="submit" variant="outlined" sx={{ alignSelf: "flex-end" }}>
          Login
        </Button>
      </Box>
    </form>
  );
};
