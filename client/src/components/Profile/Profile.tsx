import { User } from "@model/user.model";
import { Box, Typography, Divider, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FriendButtons } from "./components/FriendButtons";
import { Loading } from "@components/shared";
import { FriendRequestList } from "./components/FriendRequestList";
import { FriendList } from "./components/FriendList/FriendList";
import { useProfileFriendRequests, useProfileFriends } from "./hooks";
import { useAppSelector, useService } from "@hooks";

export const Profile = () => {
  const { userService } = useService();
  const { userId } = useParams();
  const currentUser = useAppSelector((s) => s.user);
  const friendRequests = useProfileFriendRequests(userId);
  const friends = useProfileFriends(userId);
  const [profile, setProfile] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initProfileInfo();
  }, [userId]);

  const initProfileInfo = async () => {
    setLoading(true);
    let user: User;
    try {
      user = await userService.get(userId);
      setProfile(user);
    } catch (error) {
      console.error(error);
      return;
    }

    setLoading(false);
  };

  const formatedFriendRequests = [...friendRequests]
    .filter((fr) => fr.to === currentUser._id && !fr.declined)
    .splice(-3);

  return (
    <Loading loading={loading}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Avatar
          sx={{
            alignSelf: "center",
            width: "10rem",
            height: "10rem",
          }}
        />
        <Divider sx={{ marginTop: "1rem" }}>
          <Typography variant="h5">{profile?.login ?? "?"}</Typography>
        </Divider>
        <Box sx={{ display: "flex", columnGap: "1rem" }}>
          <FriendButtons user={profile} />
        </Box>
        {profile?._id !== currentUser._id && !!friends.length && (
          <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
        )}
        {!!formatedFriendRequests.length && (
          <FriendRequestList friendRequests={formatedFriendRequests} />
        )}
        {!!friends.length && !!formatedFriendRequests.length && (
          <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
        )}
        {!!friends.length && <FriendList friends={friends} profile={profile} />}
      </Box>
    </Loading>
  );
};
