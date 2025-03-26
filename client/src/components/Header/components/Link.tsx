import { Button, SxProps, Theme } from "@mui/material";
import { NavLink, useLocation } from "react-router";

interface Props {
  to: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const Link = ({ children, to, sx }: Props) => {
  const location = useLocation();

  return (
    <Button
      sx={sx}
      to={to}
      component={NavLink}
      color={location.pathname === to ? "primary" : "inherit"}
      variant="outlined"
    >
      {children}
    </Button>
  );
};
