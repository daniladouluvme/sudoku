import { User } from "@model/user.model";
import {
  Avatar,
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { UserService } from "@service/user.serivce";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const userS = new UserService();

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userS.get().then((users) => setUsers(users.filter((u) => u.emailVerified)));
  }, []);

  return (
    <Box>
      <List >
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
