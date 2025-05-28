import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { FriendRequest } from "@model/friend-request.model";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { useFriend } from "@hooks";
import { useTranslation } from "react-i18next";

interface Props {
  friendRequest: FriendRequest;
}

export const AddFriendButton = (props: Props & IconButtonProps) => {
  const { acceptFriendRequest } = useFriend();
  const { t } = useTranslation();

  const handleClick = () => acceptFriendRequest(props.friendRequest);

  return (
    <Tooltip title={t("friend.accept")}>
      <IconButton sx={props.sx} size="medium" onClick={handleClick}>
        <PersonAddIcon />
      </IconButton>
    </Tooltip>
  );
};
