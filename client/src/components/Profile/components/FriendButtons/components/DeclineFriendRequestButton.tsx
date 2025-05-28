import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { FriendRequest } from "@model/friend-request.model";
import { IconButton, Tooltip } from "@mui/material";
import { useFriend } from "@hooks";
import { useTranslation } from "react-i18next";

interface Props {
  friendRequest: FriendRequest;
}

export const DeclineFriendRequestButton = ({ friendRequest }: Props) => {
  const { declineFriendRequest } = useFriend();
  const { t } = useTranslation();

  const handleClick = () => declineFriendRequest(friendRequest);

  return (
    <Tooltip title={t("friend.decline")}>
      <IconButton size="medium" onClick={handleClick}>
        <PersonRemoveIcon />
      </IconButton>
    </Tooltip>
  );
};
