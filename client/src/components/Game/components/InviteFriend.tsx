import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";

interface Props {}

export const InviteFriend = ({}: Props) => {
  const [anchor, setAnchor] = useState<HTMLElement>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => setAnchor(null);

  return (
    <>
      <IconButton size="medium" onClick={handleClick}>
        <PersonAddIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchor}
        open={!!anchor}
        onClose={handleClose}
      >
        <MenuItem key={2}>Friend</MenuItem>
      </Menu>
    </>
  );
};
