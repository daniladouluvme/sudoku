import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { FriendRequest } from "@model/friend-request.model";
import { IconButton, Tooltip } from "@mui/material";
import { useFriend } from "@hooks/use-friend";

interface Props {
  friendRequest: FriendRequest;
}

export const AddFriendButton = ({ friendRequest }: Props) => {
  const { acceptFriendRequest } = useFriend();

  const handleClick = () => acceptFriendRequest(friendRequest);

  return (
    <Tooltip title="Accept friend request">
      <IconButton size="medium" onClick={handleClick}>
        <PersonAddIcon />
      </IconButton>
    </Tooltip>
  );
};
