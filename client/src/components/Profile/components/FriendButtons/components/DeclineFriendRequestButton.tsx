import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { FriendRequest } from "@model/friend-request.model";
import { IconButton, Tooltip } from "@mui/material";
import { useFriend } from "@hooks/use-friend";

interface Props {
  friendRequest: FriendRequest;
}

export const DeclineFriendRequestButton = ({ friendRequest }: Props) => {
  const { declineFriendRequest } = useFriend();

  const handleClick = () => declineFriendRequest(friendRequest);

  return (
    <Tooltip title="Decline friend request">
      <IconButton size="medium" onClick={handleClick}>
        <PersonRemoveIcon />
      </IconButton>
    </Tooltip>
  );
};
