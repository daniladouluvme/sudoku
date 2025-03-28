import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { AuthorizationPasswordField } from "./AuthorizationPasswordField";

interface Form {
  login: string;
  password: string;
}

export const Login = () => {
  const [form, setForm] = useState<Form>({
    login: "",
    password: "",
  });

  const canConfirm = () => form.login && form.password;
  const handleLogin = () => {};

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
      <AuthorizationPasswordField
        label="Password"
        value={form.password}
        onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
      />
      <Button
        disabled={!canConfirm()}
        variant="outlined"
        sx={{ alignSelf: "flex-end" }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
};
