import { Box } from "@mui/material";

interface Props {
  value: number;
  disabled?: boolean;
  highlighted?: boolean;
  selected?: boolean;
  selectCell: () => void;
}

export const Cell = ({
  value,
  disabled,
  highlighted,
  selected,
  selectCell,
}: Props) => {
  const handleClick = () => {
    selectCell();
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        backgroundColor: selected ? "#555" : highlighted ? "#333" : "#222",
        display: "flex",
        color: disabled ? "#999" : "inherit",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {value ? value : ""}
    </Box>
  );
};
