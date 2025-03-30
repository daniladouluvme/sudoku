import { useAppSelector } from "@hooks/state";
import { Box, CircularProgress } from "@mui/material";
import { Outlet } from "react-router";

export const LoadingRoute = () => {
  const loading = useAppSelector((s) => s.loading);
  return loading ? (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  ) : (
    <Outlet />
  );
};
