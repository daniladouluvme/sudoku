import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { FriendRequest } from "@model/friend-request.model";
import { IconButton, Tooltip } from "@mui/material";
import { useFriend } from "@hooks";
import { useTranslation } from "react-i18next";

interface Props {
  friendRequest: FriendRequest;
}

export const CancelFriendRequestButton = ({ friendRequest }: Props) => {
  const { cancelFriendRequest } = useFriend();
  const { t } = useTranslation();

  const handleClick = () => cancelFriendRequest(friendRequest);

  return (
    <Tooltip title={t("friend.cancel")}>
      <IconButton size="medium" onClick={handleClick}>
        <PersonRemoveIcon />
      </IconButton>
    </Tooltip>
  );
};
