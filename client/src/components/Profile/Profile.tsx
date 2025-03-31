import { User } from "@model/user.model";
import { Box, Typography, Divider, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FriendButtons } from "./components/FriendButtons";
import { useService } from "@hooks/use-service";
import { Loading } from "@components/shared";
import { useAppSelector } from "@hooks/state";
import { FriendRequestList } from "./components/FriendRequestList";
import { FriendList } from "./components/FriendList/FriendList";

export const Profile = () => {
  const { userService, friendService } = useService();
  const { userId } = useParams();
  const currentUser = useAppSelector((s) => s.user);
  const friendRequests = useAppSelector((s) => s.friendRequests);
  const currentUserfriends = useAppSelector((s) => s.friends);
  const [profile, setProfile] = useState<User>(null);
  const [profileFriends, setProfileFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initProfileInfo();
  }, [userId]);

  const initProfileInfo = async () => {
    setLoading(true);

    try {
      const user = await userService.get(userId);
      setProfile(user);
    } catch (error) {
      console.error(error);
      return;
    }

    try {
      const friends = await friendService.getUserFriends(userId);
      setProfileFriends(friends);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const formatedFriendRequests = 
    currentUser._id === userId
      ? [...friendRequests]
          .filter((fr) => fr.to === currentUser._id && !fr.declined)
          .splice(-3)
      : [];

  const friends =
    currentUser._id === userId ? currentUserfriends : profileFriends;

  return (
    <Loading loading={loading}>
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
        <Box sx={{ display: "flex", columnGap: "1rem" }}>
          <FriendButtons user={profile} />
        </Box>
        {profile?._id !== currentUser._id && !!friends.length && (
          <Divider sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
        )}
        {!!formatedFriendRequests.length && (
          <FriendRequestList friendRequests={formatedFriendRequests} />
        )}
        {!!friends.length && !!formatedFriendRequests.length && (
          <Divider sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
        )}
        {!!friends.length && <FriendList friends={friends} profile={profile} />}
      </Box>
    </Loading>
  );
};
