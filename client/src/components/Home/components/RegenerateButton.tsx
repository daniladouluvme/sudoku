import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

export const RegenerateButton = (props: IconButtonProps) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t("home.regenerate")}>
      <IconButton {...props}>
        <ReplayIcon />
      </IconButton>
    </Tooltip>
  );
};
