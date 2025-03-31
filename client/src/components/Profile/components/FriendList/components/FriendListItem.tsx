import { useService } from "@hooks/use-service";
import { User } from "@model/user.model";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { UserInfo } from "../../UserInfo";
import { useAppSelector } from "@hooks/state";
import { DeleteFriendButton } from "../../FriendButtons/components/DeleteFriendButton";
import { Friend } from "@model/friend.modle";

interface Props {
  friend: Friend;
  profile: User;
}

export const FriendListItem = ({ friend, profile }: Props) => {
  const { userService } = useService();
  const currentUser = useAppSelector((s) => s.user);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    userService
      .get(
        friend.friendOne === profile._id ? friend.friendTwo : friend.friendOne
      )
      .then(setUser)
      .catch(console.error);
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center", columnGap: "1rem" }}>
      <UserInfo user={user} />
      {currentUser._id === profile._id && (
        <DeleteFriendButton sx={{ marginLeft: "auto" }} friend={friend} />
      )}
    </Box>
  );
};
