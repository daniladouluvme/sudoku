import { useService } from "@hooks/use-service";
import { User } from "@model/user.model";
import {
  Avatar,
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export const UserList = () => {
  const { userService } = useService();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userService
      .get()
      .then((users) => setUsers(users.filter((u) => u.emailVerified)));
  }, []);

  return (
    <Box>
      <List>
        {users.map((u) => (
          <ListItemButton
            key={u._id}
            to={`/profile/${u._id}`}
            component={Link}
            color="inherit"
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={u.login} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
