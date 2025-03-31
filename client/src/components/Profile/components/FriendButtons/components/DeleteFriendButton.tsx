import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { Friend } from "@model/friend.modle";
import { useFriend } from "@hooks/use-friend";

interface Props {
  friend: Friend;
}

export const DeleteFriendButton = (props: Props & IconButtonProps) => {
  const { deleteFriend } = useFriend();

  const handleClick = () => deleteFriend(props.friend);

  return (
    <Tooltip title="Delete friend">
      <IconButton sx={props.sx} size="medium" onClick={handleClick}>
        <PersonRemoveIcon />
      </IconButton>
    </Tooltip>
  );
};
