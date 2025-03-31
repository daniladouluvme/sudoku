import { Box } from "@mui/material";
import { FriendListItem } from "./components/FriendListItem";
import { Friend } from "@model/friend.modle";
import { User } from "@model/user.model";

interface Props {
  friends: Friend[];
  profile: User;
}

export const FriendList = ({ friends, profile }: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0.5rem" }}>
      {friends.map((f) => (
        <FriendListItem key={f._id} friend={f} profile={profile} />
      ))}
    </Box>
  );
};
