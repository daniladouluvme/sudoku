import { Box } from "@mui/material";

interface Props {
  value: number;
  disabled?: boolean;
}

export const Cell = ({ value, disabled }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: "#222",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {value ? value : ""}
    </Box>
  );
};
