import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { Friend } from "@model/friend.model";
import { useFriend } from "@hooks";
import { useTranslation } from "react-i18next";

interface Props {
  friend: Friend;
}

export const DeleteFriendButton = (props: Props & IconButtonProps) => {
  const { deleteFriend } = useFriend();
  const { t } = useTranslation();

  const handleClick = () => deleteFriend(props.friend);

  return (
    <Tooltip title={t("friend.delete")}>
      <IconButton sx={props.sx} size="medium" onClick={handleClick}>
        <PersonRemoveIcon />
      </IconButton>
    </Tooltip>
  );
};
