import { Box, Divider, Typography } from "@mui/material";

export const NotFound = () => (
  <Box
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: 'center'
    }}
  >
    <Divider>
      <Typography variant="h5">Page not found</Typography>
    </Divider>
  </Box>
);
