import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";

export const RegenerateButton = (props: IconButtonProps) => {
  return (
    <Tooltip title="Regenerate sudoku">
      <IconButton {...props}>
        <ReplayIcon />
      </IconButton>
    </Tooltip>
  );
};
