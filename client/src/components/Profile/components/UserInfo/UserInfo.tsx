import { User } from "@model/user.model";
import { Avatar, Box, Typography } from "@mui/material";
import { Link } from "react-router";

interface Props {
  user: User;
}

export const UserInfo = ({ user }: Props) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      columnGap: "1rem",
      textDecoration: "none",
      pointerEvents: user ? "auto" : "none",
    }}
    component={Link}
    color="inherit"
    to={`/users/${user?._id}`}
  >
    <Avatar />
    <Typography variant="inherit">{user?.login}</Typography>
  </Box>
);
