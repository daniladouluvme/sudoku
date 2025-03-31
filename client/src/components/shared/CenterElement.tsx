import { Box } from "@mui/material";
import { ReactNode } from "react";

export const CenterElement = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </Box>
);
