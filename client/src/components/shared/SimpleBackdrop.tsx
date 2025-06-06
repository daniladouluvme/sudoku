import { Alert, Backdrop, CircularProgress } from "@mui/material";

interface Props {
  loading?: boolean;
  error?: string;
  message?: string;
  open: boolean;
  close: () => void;
}

export const SimpleBackdrop = ({
  loading,
  error,
  message,
  open,
  close,
}: Props) => (
  <Backdrop
    sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
    open={open}
    onClick={close}
  >
    {loading ? (
      <CircularProgress color="inherit" />
    ) : (
      <>
        {message && <Alert severity={"success"}>{message}</Alert>}
        {error && <Alert severity={"error"}>{error}</Alert>}
      </>
    )}
  </Backdrop>
);
