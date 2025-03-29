import {
  Avatar,
  IconButton,
  IconButtonOwnProps,
  Menu,
  MenuItem,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { MenuItemLink } from "../MenuItemLink";
import { useAppDispatch, useAppSelector } from "@hooks/state";
import { logout } from "@state/slice/user-slice";

export const ProfileMenu = (props: IconButtonOwnProps) => {
  const dispatch = useAppDispatch();
  const [anchor, setAnchor] = useState<HTMLElement>(null);
  const user = useAppSelector((s) => s.user);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => setAnchor(null);
  const handleLogout = () => dispatch(logout());

  return (
    <>
      <IconButton {...props} size="medium" onClick={handleClick}>
        <Avatar sx={{ width: 24, height: 24 }} />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchor}
        open={!!anchor}
        onClose={handleClose}
      >
        {user
          ? [
              <MenuItemLink key={1} to={`profile/${user._id}`}>
                Profile
              </MenuItemLink>,
              <MenuItem key={2} onClick={handleLogout}>
                Logout
              </MenuItem>,
            ]
          : [
              <MenuItemLink key={1} to="login">
                Login
              </MenuItemLink>,
              <MenuItemLink key={2} to="register">
                Register
              </MenuItemLink>,
            ]}
      </Menu>
    </>
  );
};
