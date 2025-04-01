import DehazeIcon from "@mui/icons-material/Dehaze";
import { IconButton, IconButtonOwnProps, Menu } from "@mui/material";
import { MouseEvent, useState } from "react";
import { MenuItemLink } from "../MenuItemLink";

export const MainMenu = (props: IconButtonOwnProps) => {
  const [anchor, setAnchor] = useState<HTMLElement>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => setAnchor(null);

  return (
    <>
      <IconButton {...props} size="medium" onClick={handleClick}>
        <DehazeIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchor}
        open={!!anchor}
        onClose={handleClose}
      >
        <MenuItemLink to="users">Users</MenuItemLink>
        <MenuItemLink to="games">Games</MenuItemLink>
      </Menu>
    </>
  );
};
