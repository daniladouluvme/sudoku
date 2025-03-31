import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { IconButton, Tooltip } from "@mui/material";
import { Friend } from "@model/friend.modle";
import { useFriend } from "@hooks/use-friend";

interface Props {
  friend: Friend;
}

export const DeleteFriendButton = ({ friend }: Props) => {
  const { deleteFriend } = useFriend();

  const handleClick = () => deleteFriend(friend);

  return (
    <Tooltip title="Delete friend">
      <IconButton size="medium" onClick={handleClick}>
        <PersonRemoveIcon />
      </IconButton>
    </Tooltip>
  );
};
