import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { FriendRequest } from "@model/friend-request.model";
import { IconButton, Tooltip } from "@mui/material";
import { useFriend } from "@hooks/use-friend";

interface Props {
  friendRequest: FriendRequest;
}

export const CancelFriendRequestButton = ({ friendRequest }: Props) => {
  const { cancelFriendRequest } = useFriend();

  const handleClick = () => cancelFriendRequest(friendRequest);

  return (
    <Tooltip title="Cancel friend request">
      <IconButton size="medium" onClick={handleClick}>
        <PersonRemoveIcon />
      </IconButton>
    </Tooltip>
  );
};
