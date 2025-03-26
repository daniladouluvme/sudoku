import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { PasswordField } from "./PasswordField";

interface Form {
  login: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const Register = () => {
  const [form, setForm] = useState<Form>({
    login: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const canConfirm = () => {
    const loginValid = form.login.length > 5;
    const passwordValid =
      form.password.length > 5 && form.password === form.repeatPassword;

    return loginValid && passwordValid;
  };

  const handleRegister = () => {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
      }}
    >
      <TextField
        label="Login"
        value={form.login}
        onChange={(e) => setForm((p) => ({ ...p, login: e.target.value }))}
        variant="outlined"
      />
      <TextField
        label="Email"
        value={form.email}
        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
        variant="outlined"
      />
      <PasswordField
        label="Password"
        value={form.password}
        onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
      />
      <PasswordField
        label="Repeat password"
        value={form.repeatPassword}
        onChange={(e) =>
          setForm((p) => ({ ...p, repeatPassword: e.target.value }))
        }
      />
      <Button
        disabled={!canConfirm()}
        variant="outlined"
        sx={{ alignSelf: "flex-end" }}
        onClick={handleRegister}
      >
        Register
      </Button>
    </Box>
  );
};
