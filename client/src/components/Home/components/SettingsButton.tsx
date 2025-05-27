import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, IconButtonProps, Menu, MenuItem } from "@mui/material";
import { DIFFICULTIES } from "@utils/difficulties";
import { MouseEvent, useState } from "react";

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
      <IconButton {...buttonProps} size="medium" onClick={openMainMenu}>
        <SettingsIcon />
      </IconButton>

      <Menu
        anchorEl={mainMenuAnchor}
        open={!!mainMenuAnchor}
        onClose={closeMainMenu}
      >
        <MenuItem onClick={openDifficultyMenu}>Difficulty</MenuItem>
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
            {k.charAt(0).toUpperCase() + k.slice(1).toLowerCase()}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
