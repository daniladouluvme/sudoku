import { Box } from "@mui/material";

type BgColorType = "selected" | "highlighted" | "default";
type TextColorType = "wrong" | "initial" | "default";

interface Props {
  value: number;
  bgColor: BgColorType;
  textColor: TextColorType;
  selectCell: () => void;
}

const bgColorMapper: { [f in BgColorType]: string } = {
  default: "#222",
  highlighted: "#333",
  selected: "#555",
};

const textColorMapper: { [f in TextColorType]: string } = {
  default: "#inherit",
  wrong: "#f00",
  initial: "#999",
};

export const Cell = ({
  value,
  bgColor = "default",
  textColor = "default",
  selectCell,
}: Props) => {
  return (
    <Box
      onClick={selectCell}
      sx={{
        backgroundColor: bgColorMapper[bgColor],
        display: "flex",
        color: textColorMapper[textColor],
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {value || ""}
    </Box>
  );
};
