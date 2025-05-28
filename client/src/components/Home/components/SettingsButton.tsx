import SettingsIcon from "@mui/icons-material/Settings";
import {
  IconButton,
  IconButtonProps,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { DIFFICULTIES } from "@utils/difficulties";
import { MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  difficulty: number;
  setDifficulty: (value: number) => void;
  buttonProps?: IconButtonProps;
}

export const SettingsButton = ({
  difficulty,
  setDifficulty,
  buttonProps,
}: Props) => {
  const [mainMenuAnchor, setMainMenuAnchor] = useState<HTMLElement>(null);
  const [difficultyMenyAnchor, setDifficultyMenyAnchor] =
    useState<HTMLElement>(null);
  const { t } = useTranslation();

  const openMainMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setMainMenuAnchor(e.currentTarget);
  };

  const openDifficultyMenu = (e: MouseEvent<HTMLElement>) => {
    setDifficultyMenyAnchor(e.currentTarget);
  };

  const closeMainMenu = () => setMainMenuAnchor(null);
  const closeDifficultyMenu = () => {
    setDifficultyMenyAnchor(null);
    closeMainMenu();
  };

  return (
    <>
      <Tooltip title={t("home.settings")}>
        <IconButton {...buttonProps} size="medium" onClick={openMainMenu}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={mainMenuAnchor}
        open={!!mainMenuAnchor}
        onClose={closeMainMenu}
      >
        <MenuItem onClick={openDifficultyMenu}>{t("difficulty")}</MenuItem>
      </Menu>

      <Menu
        anchorEl={difficultyMenyAnchor}
        open={!!difficultyMenyAnchor}
        onClose={closeDifficultyMenu}
      >
        {Object.entries(DIFFICULTIES).map(([k, v]) => (
          <MenuItem
            key={v}
            onClick={() => setDifficulty(v)}
            selected={v === difficulty}
          >
            {t(`difficultyLevel.${k}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
