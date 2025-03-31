import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { FriendRequest } from "@model/friend-request.model";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { useFriend } from "@hooks/use-friend";

interface Props {
  friendRequest: FriendRequest;
}

export const AddFriendButton = (props: Props & IconButtonProps) => {
  const { acceptFriendRequest } = useFriend();

  const handleClick = () => acceptFriendRequest(props.friendRequest);

  return (
    <Tooltip title="Accept friend request">
      <IconButton sx={props.sx} size="medium" onClick={handleClick}>
        <PersonAddIcon />
      </IconButton>
    </Tooltip>
  );
};
