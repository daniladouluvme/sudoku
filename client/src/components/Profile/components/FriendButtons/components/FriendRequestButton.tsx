import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { User } from "@model/user.model";
import { IconButton, Tooltip } from "@mui/material";
import { useFriend } from "@hooks/use-friend";

interface Props {
  user: User;
  currentUser: User;
}

export const FriendRequestButton = ({ user, currentUser }: Props) => {
  const { friendRequest } = useFriend();

  const handleClick = () => friendRequest(user, currentUser);

  return (
    <Tooltip title="Friend request">
      <IconButton size="medium" onClick={handleClick}>
        <PersonAddIcon />
      </IconButton>
    </Tooltip>
  );
};
