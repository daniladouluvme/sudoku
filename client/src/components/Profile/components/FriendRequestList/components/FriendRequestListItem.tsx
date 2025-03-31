import { useService } from "@hooks/use-service";
import { FriendRequest } from "@model/friend-request.model";
import { User } from "@model/user.model";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { AddFriendButton } from "../../FriendButtons/components/AddFriendButton";
import { DeclineFriendRequestButton } from "../../FriendButtons/components/DeclineFriendRequestButton";
import { UserInfo } from "../../UserInfo";

interface Props {
  friendRequest: FriendRequest;
}

export const FriendRequestListItem = ({ friendRequest }: Props) => {
  const { userService } = useService();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    userService.get(friendRequest.from).then(setUser).catch(console.error);
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center", columnGap: "1rem" }}>
      <UserInfo user={user} />
      <AddFriendButton
        sx={{ marginLeft: "auto" }}
        friendRequest={friendRequest}
      />
      <DeclineFriendRequestButton friendRequest={friendRequest} />
    </Box>
  );
};
