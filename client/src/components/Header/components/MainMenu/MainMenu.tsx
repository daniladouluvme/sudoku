import DehazeIcon from "@mui/icons-material/Dehaze";
import { IconButton, IconButtonOwnProps, Menu } from "@mui/material";
import { MouseEvent, useState } from "react";
import { MenuItemLink } from "../MenuItemLink";
import { useAppSelector } from "@hooks";

export const MainMenu = (props: IconButtonOwnProps) => {
  const [anchor, setAnchor] = useState<HTMLElement>(null);
  const user = useAppSelector((s) => s.user);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => setAnchor(null);

  return user ? (
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
  ) : (
    <IconButton size="medium" sx={{ visibility: "hidden" }}>
      <DehazeIcon />
    </IconButton>
  );
};
