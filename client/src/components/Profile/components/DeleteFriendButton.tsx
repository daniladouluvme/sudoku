import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useAppDispatch } from "@hooks/state";
import { useService } from "@hooks/use-service";
import { IconButton, Tooltip } from "@mui/material";
import { patchBackdrop, setBackdrop } from "@state/slice/backdrop.slice";
import { Friend } from "@model/friend.modle";
import { deleteFriend } from "@state/slice/friend.slice";

interface Props {
  friend: Friend;
}

export const DeleteFriendButton = ({ friend }: Props) => {
  const { friendService } = useService();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    dispatch(setBackdrop({ loading: true }));

    const id = friend._id;

    try {
      await friendService.delete(id);

      dispatch(deleteFriend(id));
    } catch (error) {
      console.error(error);

      dispatch(
        patchBackdrop({
          error: "An unknown error occurred while deleting a friend",
        })
      );
    }

    dispatch(patchBackdrop({ loading: false }));
  };

  return (
    <Tooltip title="Delete friend">
      <IconButton size="medium" onClick={handleClick}>
        <PersonRemoveIcon />
      </IconButton>
    </Tooltip>
  );
};
