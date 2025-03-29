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
import { useNavigate } from "react-router";
import { logout } from "@state/slice/user-slice";

export const ProfileMenu = (props: IconButtonOwnProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchor, setAnchor] = useState<HTMLElement>(null);
  const user = useAppSelector((s) => s.user);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => setAnchor(null);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <IconButton {...props} size="medium" onClick={handleClick}>
        <Avatar />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchor}
        open={!!anchor}
        onClose={handleClose}
      >
        {user
          ? [
              <MenuItemLink key={1} to="profile">
                Profile
              </MenuItemLink>,
              <MenuItem key={2} onClick={handleLogout}>
                Logout
              </MenuItem>,
            ]
          : [
              <MenuItemLink key={1} to="authorization/login">
                Login
              </MenuItemLink>,
              <MenuItemLink key={2} to="authorization/register">
                Register
              </MenuItemLink>,
            ]}
      </Menu>
    </>
  );
};
