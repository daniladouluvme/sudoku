import TranslateIcon from "@mui/icons-material/Translate";
import { IconButton, IconButtonProps, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageButton = (props: IconButtonProps) => {
  const [anchor, setAnchor] = useState<HTMLElement>(null);
  const { i18n } = useTranslation();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => setAnchor(null);
  return (
    <>
      <IconButton {...props} size="medium" onClick={handleClick}>
        <TranslateIcon />
      </IconButton>

      <Menu anchorEl={anchor} open={!!anchor} onClose={handleClose}>
        {["ru", "en"].map((l) => (
          <MenuItem
            selected={i18n.language === l}
            onClick={() => i18n.changeLanguage(l)}
          >
            <img
              src={`${l}.svg`}
              height="2rem"
              width="3rem"
              style={{ width: "3rem", height: "2rem" }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
