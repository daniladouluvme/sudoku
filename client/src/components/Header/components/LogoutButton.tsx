import { Button, SxProps, Theme } from "@mui/material";

interface Props {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const LogoutButton = ({ children, sx }: Props) => {
  const handleLogout = () => {};

  return (
    <Button sx={sx} color={"inherit"} variant="outlined" onClick={handleLogout}>
      {children ?? "logout"}
    </Button>
  );
};
