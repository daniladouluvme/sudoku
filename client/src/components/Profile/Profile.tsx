import { useAppSelector } from "@hooks/state";
import { User } from "@model/user.model";
import { Box, Typography, Divider, Avatar, IconButton } from "@mui/material";
import { UserService } from "@service/user.serivce";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const userS = new UserService();

export const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState<User>(null);
  const currentUser = useAppSelector((s) => s.user);

  useEffect(() => {
    userS.get(userId).then((u) => setProfile(u));
  }, [userId]);

  const isCurrentUser = profile?._id === currentUser?._id;

  const friendRequest = () => {};

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Avatar
        sx={{
          marginBottom: "1rem",
          alignSelf: "center",
          width: "10rem",
          height: "10rem",
        }}
      />

      <Divider>
        <Typography variant="h5">{profile?.login ?? "?"}</Typography>
      </Divider>
      {!isCurrentUser && (
        <Box>
          <IconButton size="medium" onClick={friendRequest}>
            <Avatar>
              <PersonAddIcon />
            </Avatar>
          </IconButton>
          {/* <Avatar>
            <PersonAddIcon />
          </Avatar> */}
        </Box>
      )}
    </Box>
  );
};
