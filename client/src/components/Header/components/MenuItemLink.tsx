import { MenuItem, MenuItemProps } from "@mui/material";
import { Link } from "react-router";

export const MenuItemLink = (
  props: MenuItemProps & { children?: string; to: string }
) => (
  <MenuItem to={props.to} component={Link}>
    {props.children}
  </MenuItem>
);
