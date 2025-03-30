import { User } from "@model/user.model";
import { Box, Typography, Divider, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FriendButtons } from "./components/FriendButtons";
import { useService } from "@hooks/use-service";

export const Profile = () => {
  const { userService } = useService();
  const { userId } = useParams();
  const [profile, setProfile] = useState<User>(null);

  useEffect(() => {
    userService.get(userId).then((u) => setProfile(u));
  }, [userId]);

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
      <Box>
        <FriendButtons user={profile} />
      </Box>
    </Box>
  );
};
