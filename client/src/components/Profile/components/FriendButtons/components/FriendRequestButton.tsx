import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { User } from "@model/user.model";
import { IconButton, Tooltip } from "@mui/material";
import { useFriend } from "@hooks";
import { useTranslation } from "react-i18next";

interface Props {
  user: User;
}

export const FriendRequestButton = ({ user }: Props) => {
  const { friendRequest } = useFriend();
  const { t } = useTranslation();

  const handleClick = () => friendRequest(user);

  return (
    <Tooltip title={t("friend.request")}>
      <IconButton size="medium" onClick={handleClick}>
        <PersonAddIcon />
      </IconButton>
    </Tooltip>
  );
};
