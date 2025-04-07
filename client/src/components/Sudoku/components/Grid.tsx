import { Box } from "@mui/material";

interface Props {
  cellSize: string;
}

const backgroundColor = '#444';

export const Grid = ({ cellSize }: Props) => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          backgroundColor,
          width: "0.25rem",
          height: `calc(9 * ${cellSize} + 8 * 0.25rem)`,
          left: `calc(3 * ${cellSize} + 2 * 0.25rem)`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          backgroundColor,
          width: "0.25rem",
          height: `calc(9 * ${cellSize} + 8 * 0.25rem)`,
          left: `calc(6 * ${cellSize} + 5 * 0.25rem)`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          backgroundColor,
          width: `calc(9 * ${cellSize} + 8 * 0.25rem)`,
          height: '0.25rem',
          top: `calc(3 * ${cellSize} + 2 * 0.25rem)`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          backgroundColor,
          width: `calc(9 * ${cellSize} + 8 * 0.25rem)`,
          height: '0.25rem',
          top: `calc(6 * ${cellSize} + 5 * 0.25rem)`,
        }}
      />
    </>
  );
};
