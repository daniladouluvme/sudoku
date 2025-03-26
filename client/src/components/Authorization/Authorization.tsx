import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router";

export const Authorization = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <Typography variant="h2">Authorization</Typography>
      <Outlet />
    </Box>
  );
};
